"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import TypeRemixPreloader from "@/components/ui/type-remix-preloader";
import { usePreloaderComplete } from "@/context/PreloaderContext";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Preloader.module.css";

export default function Preloader() {
  const [phase, setPhase] = useState<"loading" | "fadeout" | "done">("loading");
  const { setComplete } = usePreloaderComplete();
  const { t } = useLanguage();
  const finishedRef = useRef(false);

  const handleFinish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setPhase("fadeout");
    setTimeout(() => {
      setComplete();
      setPhase("done");
    }, 800);
  }, [setComplete]);

  const handleSkip = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setComplete();
    setPhase("done");
  }, [setComplete]);

  // Lock scroll while active
  useEffect(() => {
    if (phase !== "done") {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      className={`${styles.preloaderWrapper} ${phase === "fadeout" ? styles.fadeout : ""}`}
      role="status"
      aria-label={t?.preloader?.ariaLoading || "Loading"}
    >
      <button
        type="button"
        className={styles.skip}
        onClick={(e) => {
          e.stopPropagation();
          handleSkip();
        }}
        aria-label={t?.preloader?.skipAria || "Skip"}
      >
        {t?.preloader?.skip || "skip"}
      </button>

      <TypeRemixPreloader
        loop={false}
        durationMs={7200}
        word="ELIAN MEJIA"
        name="Elian Mejia"
        discipline="Full-Stack Product Engineer"
        year="2026"
        period="Portfolio • 2026"
        handle="elian.is-a.dev"
        roles={["Next.js", "TypeScript", "React", "AI Integrations"]}
        kicker="Portfolio"
        tagline="Full-Stack Engineer"
        motto="clean code & precision"
        moodboard={true}
        stickers={true}
        hud={true}
        height="100vh"
        onComplete={handleFinish}
      />
    </div>
  );
}