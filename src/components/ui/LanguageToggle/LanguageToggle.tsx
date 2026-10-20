"use client";

import { useLanguage } from "@/context/LanguageContext";
import styles from "./LanguageToggle.module.css";

interface LanguageToggleProps {
  variant?: "default" | "drawer";
  className?: string;
}

export default function LanguageToggle({ variant = "default", className = "" }: LanguageToggleProps) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div
      className={`${styles.toggleGroup} ${variant === "drawer" ? styles.drawerVariant : ""} ${className}`}
      role="group"
      aria-label={t.nav.langToggleAria}
    >
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`${styles.toggleBtn} ${language === "en" ? styles.toggleBtnActive : ""}`}
        aria-pressed={language === "en"}
        aria-label="English"
        data-cursor-hover
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage("es")}
        className={`${styles.toggleBtn} ${language === "es" ? styles.toggleBtnActive : ""}`}
        aria-pressed={language === "es"}
        aria-label="Español"
        data-cursor-hover
      >
        ES
      </button>
    </div>
  );
}
