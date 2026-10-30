"use client";

import { useEffect } from "react";

/**
 * Robust hook to safeguard the DOM against rogue browser extension injections
 * (e.g. CareerFlow, Copilot scrapers) that inject unwanted HTML or cause bottom empty space.
 */
export function useExtensionShield() {
  useEffect(() => {
    const ROGUE_KEYWORDS = [
      "careerflow",
      "careercopilot",
      "career copilot",
      "iamyourcareercopilot",
      "savejobtotracker",
      "viewjobtracker",
      "aicoverlettergenerator",
      "summarizejobdescription",
      "ailinkedinpostgenerator",
      "linkedinoptimization",
      "supersearch",
      "seewholshiring",
      "seewhoishiring",
      "savejob",
      "jobtracker",
    ];

    // Inject high-priority global CSS shield once
    if (!document.getElementById("anti-careerflow-shield")) {
      const style = document.createElement("style");
      style.id = "anti-careerflow-shield";
      style.textContent = `
        careerflow-extension,
        cf-extension,
        #careerflow-root,
        #careerflow-sidebar,
        [id*="careerflow" i],
        [class*="careerflow" i],
        [data-careerflow],
        [id*="copilot" i],
        [class*="copilot" i],
        [id*="job-tracker" i],
        [class*="job-tracker" i],
        [id*="jobtracker" i],
        [class*="jobtracker" i],
        div[id*="iAmYourCareerCopilot" i],
        div[class*="iAmYourCareerCopilot" i],
        div[id*="SaveJobtoTracker" i],
        div[id*="ViewJobTracker" i],
        div[id*="AICoverLetterGenerator" i],
        body > iframe,
        #app-root ~ * {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
          position: fixed !important;
          top: -99999px !important;
          left: -99999px !important;
          width: 0px !important;
          height: 0px !important;
          max-width: 0px !important;
          max-height: 0px !important;
          margin: 0px !important;
          padding: 0px !important;
          z-index: -999999 !important;
        }
        html, body {
          margin-bottom: 0px !important;
          padding-bottom: 0px !important;
          overflow-x: hidden !important;
        }
      `;
      document.head.appendChild(style);
    }

    const purgeElement = (el: HTMLElement) => {
      try {
        el.style.setProperty("display", "none", "important");
        el.style.setProperty("visibility", "hidden", "important");
        el.style.setProperty("opacity", "0", "important");
        el.style.setProperty("pointer-events", "none", "important");
        el.style.setProperty("height", "0px", "important");
        el.style.setProperty("max-height", "0px", "important");
        el.style.setProperty("margin", "0px", "important");
        el.style.setProperty("padding", "0px", "important");
        el.style.setProperty("overflow", "hidden", "important");
        el.style.setProperty("position", "fixed", "important");
        el.style.setProperty("left", "-99999px", "important");
        el.style.setProperty("top", "-99999px", "important");
        el.remove();
      } catch {
        // Element might be locked in shadow root
      }
    };

    const cleanupRogueExtensions = () => {
      // 1. Reset body and html extra margins/paddings forced by extensions
      try {
        if (document.body) {
          document.body.style.setProperty("margin-bottom", "0px", "important");
          document.body.style.setProperty("padding-bottom", "0px", "important");
        }
        if (document.documentElement) {
          document.documentElement.style.setProperty("margin-bottom", "0px", "important");
          document.documentElement.style.setProperty("padding-bottom", "0px", "important");
        }
      } catch {}

      // 2. Remove ANY sibling element that appears after #app-root in body
      const appRoot = document.getElementById("app-root");
      if (appRoot) {
        let sibling = appRoot.nextElementSibling;
        while (sibling) {
          const next = sibling.nextElementSibling;
          const tag = sibling.tagName.toLowerCase();
          if (tag !== "script" && tag !== "style" && tag !== "next-route-announcer") {
            purgeElement(sibling as HTMLElement);
          }
          sibling = next;
        }
      }

      // 3. Purge all iframes outside #app-root (our app has 0 iframes)
      try {
        document.querySelectorAll("iframe").forEach((frame) => {
          purgeElement(frame as HTMLElement);
        });
      } catch {}

      // 4. Search and purge ANY elements containing rogue keywords outside #app-root
      try {
        const allCandidates = document.querySelectorAll(
          '[id*="careerflow" i], [class*="careerflow" i], [id*="copilot" i], [class*="copilot" i], [id*="jobtracker" i], [class*="jobtracker" i], [id*="job-tracker" i], [class*="job-tracker" i], careerflow-extension, cf-extension, #careerflow-root, #careerflow-sidebar, img[alt*="hello" i], img[alt*="careerflow" i], img[src*="careerflow" i]'
        );
        allCandidates.forEach((el) => {
          if (el instanceof HTMLElement && !el.closest("#app-root")) {
            purgeElement(el);
          }
        });
      } catch {}

      // 5. Inspect shadow roots and custom elements outside #app-root
      try {
        document.querySelectorAll("*").forEach((el) => {
          if (el instanceof HTMLElement && el.closest("#app-root")) return;
          if (el.shadowRoot) {
            const shadowText = (el.shadowRoot.innerHTML || "").toLowerCase();
            if (ROGUE_KEYWORDS.some((kw) => shadowText.includes(kw))) {
              purgeElement(el as HTMLElement);
            }
          }
          const tag = el.tagName.toLowerCase();
          if (tag.includes("career") || tag.includes("copilot")) {
            purgeElement(el as HTMLElement);
          }
        });
      } catch {}

      // 6. Universal text-content scan across all body elements to catch unclassed rogue nodes
      try {
        const textElements = document.querySelectorAll("div, section, aside, span, p, img");
        textElements.forEach((node) => {
          if (
            node instanceof HTMLElement &&
            node.id !== "app-root" &&
            !node.closest("#app-root")
          ) {
            const tag = node.tagName.toLowerCase();
            if (tag === "script" || tag === "style" || tag === "next-route-announcer") return;

            const text = (node.textContent || "").toLowerCase();
            const outer = (node.outerHTML || "").toLowerCase();

            const isRogue = ROGUE_KEYWORDS.some((kw) => text.includes(kw) || outer.includes(kw));
            if (isRogue) {
              let target: HTMLElement = node;
              while (
                target.parentElement &&
                target.parentElement !== document.body &&
                target.parentElement.id !== "app-root" &&
                !target.parentElement.closest("#app-root")
              ) {
                const parentText = (target.parentElement.textContent || "").toLowerCase();
                if (ROGUE_KEYWORDS.some((kw) => parentText.includes(kw))) {
                  target = target.parentElement;
                } else {
                  break;
                }
              }
              purgeElement(target);
            }
          }
        });
      } catch {}
    };

    // Execute immediately
    cleanupRogueExtensions();

    // Listen only to direct children added to document.body (outside #app-root)
    const observer = new MutationObserver((mutations) => {
      const hasExternalChange = mutations.some(
        (m) =>
          m.target === document.body ||
          m.target === document.documentElement ||
          (m.target instanceof HTMLElement && !m.target.closest("#app-root"))
      );
      if (hasExternalChange) {
        cleanupRogueExtensions();
      }
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });

    // Run a few initial checks on startup only
    const interval = setInterval(cleanupRogueExtensions, 1000);
    const timeout = setTimeout(() => clearInterval(interval), 5000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);
}
