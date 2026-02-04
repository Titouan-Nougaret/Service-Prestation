"use client";

import { useEffect } from "react";
import { useAppSelector } from "@/store/hooks";
import { selectTheme } from "@/store/selectors/user-preferences-selector";

export default function ThemeInitializer() {
  const theme = useAppSelector(selectTheme);

  useEffect(() => {
    const root = window.document.documentElement;

    const applyTheme = (currentTheme: string) => {
      root.classList.remove("light", "dark");

      if (currentTheme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? "dark"
          : "light";
        root.classList.add(systemTheme);
      } else {
        root.classList.add(currentTheme);
      }
    };

    applyTheme(theme);

    // Écouter les changements de préférence système si le thème est sur "system"
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => applyTheme("system");

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme]);

  return null;
}
