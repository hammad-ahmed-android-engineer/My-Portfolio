"use client";

import { useState, useEffect } from "react";

export function useScrollPosition(threshold = 15): { scrollY: number; isScrolled: boolean } {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const pos = window.scrollY ?? document.documentElement?.scrollTop ?? document.body?.scrollTop ?? 0;
      setScrollY(pos);
      setIsScrolled(pos > threshold);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return { scrollY, isScrolled };
}

