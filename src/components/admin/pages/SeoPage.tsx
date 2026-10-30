"use client";

import React from "react";
import { Globe, Radio, ExternalLink, CheckCircle2, Compass, ShieldCheck } from "lucide-react";

interface SeoPageProps {
  seoStatus: any;
  isPinging: boolean;
  pingResult: any;
  onPingSearchEngines: () => void;
}

const BROWSER_ECOSYSTEMS = [
  {
    key: "google",
    name: "Google Search & Chrome",
    browsers: "Google Chrome, Android WebView, Safari Default, Firefox Default",
    protocol: "XML Sitemap Ping + Schema.org JSON-LD",
  },
  {
    key: "bing",
    name: "Microsoft Bing & Edge",
    browsers: "Microsoft Edge, Windows Copilot, MSN",
    protocol: "Bing Webmaster Sitemap Ping",
  },
  {
    key: "indexnow",
    name: "IndexNow Global Protocol",
    browsers: "Edge, Opera, Vivaldi, Firefox, Arc",
    protocol: "Real-Time IndexNow API Push",
  },
  {
    key: "duckduckgo",
    name: "DuckDuckGo Search & Browser",
    browsers: "DuckDuckGo Privacy Browser, Tor, Safari Option",
    protocol: "IndexNow / Syndicated Crawl Notice",
  },
  {
    key: "brave",
    name: "Brave Search & Brave Browser",
    browsers: "Brave Desktop & Android Browser",
    protocol: "Web Discovery & Sitemap Ping",
  },
  {
    key: "yahoo",
    name: "Yahoo! Search Network",
    browsers: "Yahoo Search, Altaba, Partner Browsers",
    protocol: "Syndicated Sitemap Indexation",
  },
  {
    key: "yandex",
    name: "Yandex Search & Browser",
    browsers: "Yandex Browser (Desktop & Mobile)",
    protocol: "Yandex Webmaster Sitemap Ping",
  },
  {
    key: "naver",
    name: "Naver Search & Whale",
    browsers: "Naver Whale Browser & Search Advisor",
    protocol: "IndexNow Instant Notification",
  },
  {
    key: "seznam",
    name: "Seznam.cz Search & Browser",
    browsers: "Seznam Browser (EU Regional)",
    protocol: "IndexNow Instant Notification",
  },
];

  export function SeoPage({
    seoStatus,
    isPinging,
    pingResult,
    onPingSearchEngines,
  }: SeoPageProps) {
  return (
    <div className="py-8 space-y-6">
      <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>Multi-Browser &amp; Global Search Engine Indexing</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Broadcast your live sitemap and structured metadata across all major browsers and search engines simultaneously.
            </p>
          </div>

          <button
            type="button"
            onClick={onPingSearchEngines}
            disabled={isPinging}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 transition shadow-lg shadow-emerald-600/20 disabled:opacity-50 cursor-pointer"
          >
            {isPinging ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Radio className="w-4 h-4" />
            )}
            <span>
              {isPinging
                ? "Broadcasting to All Browsers & Engines..."
                : "Ping All Search Engines & Browsers (9 Networks)"}
            </span>
          </button>
        </div>

        {/* URLs & Endpoints Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
            <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
              XML Sitemap Endpoint
            </div>
            <div className="text-xs font-mono text-emerald-400 truncate">
              {seoStatus?.sitemapUrl ?? "/sitemap.xml"}
            </div>
            <a
              href={seoStatus?.sitemapUrl ?? "/sitemap.xml"}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-zinc-400 hover:text-white transition"
            >
              <span>Inspect XML Output</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
            <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
              Robots.txt Crawler Directives
            </div>
            <div className="text-xs font-mono text-cyan-400 truncate">
              {seoStatus?.robotsUrl ?? "/robots.txt"}
            </div>
            <a
              href={seoStatus?.robotsUrl ?? "/robots.txt"}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-zinc-400 hover:text-white transition"
            >
              <span>Inspect Directives</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Supported Browsers & Search Networks Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              <span>Supported Browsers &amp; Crawler Networks ({BROWSER_ECOSYSTEMS.length})</span>
            </h3>
            {pingResult?.timestamp && (
              <span className="text-[11px] font-mono text-emerald-400">
                Last Broadcast: {new Date(pingResult.timestamp).toLocaleTimeString()}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {BROWSER_ECOSYSTEMS.map((engine) => {
              const liveStatus = pingResult?.results?.[engine.key];
              return (
                <div
                  key={engine.key}
                  className={`p-3.5 rounded-xl border transition-all space-y-1.5 ${liveStatus
                      ? "bg-emerald-950/20 border-emerald-500/30"
                      : "bg-zinc-950/80 border-zinc-800/80"
                    }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-white">{engine.name}</span>
                    {liveStatus ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-mono font-semibold">
                        <CheckCircle2 className="w-3 h-3" />
                        Pinged
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-zinc-900 text-zinc-400 text-[10px] font-mono">
                        <ShieldCheck className="w-3 h-3 text-emerald-500" />
                        Ready
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-snug">
                    <strong className="text-zinc-300">Browsers:</strong> {engine.browsers}
                  </p>
                  <p className="text-[10px] font-mono text-zinc-500">
                    {liveStatus ? liveStatus : engine.protocol}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
