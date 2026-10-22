"use client";

import React, { createContext, useContext, useEffect } from "react";

interface ThemeContextType {
  theme: "dark";
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // The site is dark-only, so make sure the class is always set
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: "dark" }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}