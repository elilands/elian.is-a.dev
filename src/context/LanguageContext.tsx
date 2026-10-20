"use client";

import { createContext, useContext, useEffect, useState, useCallback, useMemo, type ReactNode } from "react";
import { translations, type Language, type Translations } from "@/lib/i18n";

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "elian_portfolio_lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  // On mount, check localStorage or browser preference
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
      if (saved === "en" || saved === "es") {
        setLanguageState(saved);
        document.documentElement.lang = saved;
        return;
      }

      // Check browser language
      const browserLang = navigator.language?.toLowerCase();
      if (browserLang && browserLang.startsWith("es")) {
        setLanguageState("es");
        document.documentElement.lang = "es";
      } else {
        document.documentElement.lang = "en";
      }
    } catch {
      // Ignore localStorage errors (e.g. private browsing)
    }
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.lang = lang;
    } catch {
      // Ignore
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => {
      const next: Language = prev === "en" ? "es" : "en";
      try {
        localStorage.setItem(STORAGE_KEY, next);
        document.documentElement.lang = next;
      } catch {
        // Ignore
      }
      return next;
    });
  }, []);

  const value = useMemo<LanguageContextValue>(() => {
    return {
      language,
      setLanguage,
      toggleLanguage,
      t: translations[language],
    };
  }, [language, setLanguage, toggleLanguage]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
