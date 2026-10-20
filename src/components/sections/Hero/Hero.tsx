"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { scrollToTarget } from "@/lib/lenisInstance";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Hero.module.css";

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

export default function Hero() {
  const { t } = useLanguage();

  const sectionRef = useRef<HTMLDivElement>(null);
  const skyRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const cloudsRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);

  const [hasStarted, setHasStarted] = useState(false);

  /* ── Smooth scroll con Lenis para CTAs ──────────────────────────────── */
  const handleSmoothScroll = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const navHeight = 68;
      scrollToTarget(href, {
        duration: 1.4,
        offset: -navHeight,
      });
      if (typeof window !== "undefined") {
        window.history.pushState(null, "", href);
      }
    },
    []
  );

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    let rafId = 0;
    let targetProgress = 0;
    let currentProgress = 0;
    let locked = false;
    let touchStartY = 0;

    // Distancia balanceada para respuesta ágil en desktop y mobile
    const scrubDistance = 1800;

    function engageLock() {
      if (locked || typeof document === "undefined") return;
      locked = true;
      window.scrollTo(0, 0);
      const b = document.body.style;
      b.position = "fixed";
      b.top = "0px";
      b.left = "0";
      b.right = "0";
      b.width = "100%";
      b.overflow = "hidden";
    }

    function releaseLock() {
      if (!locked || typeof document === "undefined") return;
      locked = false;
      const b = document.body.style;
      b.position = "";
      b.top = "";
      b.left = "";
      b.right = "";
      b.width = "";
      b.overflow = "";
    }

    engageLock();

    function addDelta(deltaY: number) {
      const next = clamp(targetProgress + deltaY / scrubDistance, 0, 1);
      targetProgress = next;
      if (targetProgress > 0.001) {
        setHasStarted(true);
      }

      // Transición suave: cuando llega al final y el usuario sigue scrolleando hacia abajo,
      // desbloqueamos e iniciamos un scroll suave con Lenis hacia #about sin saltos violentos
      if (next >= 1) {
        releaseLock();
        if (deltaY > 0) {
          scrollToTarget("#about", { duration: 1.2, offset: -68 });
        }
      } else if (!locked) {
        engageLock();
      }
      return true;
    }

    const onWheel = (e: WheelEvent) => {
      if (locked) {
        addDelta(e.deltaY);
        e.preventDefault();
      } else if (window.scrollY <= 10 && e.deltaY < 0) {
        engageLock();
        addDelta(e.deltaY);
        e.preventDefault();
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (locked) {
        const y = e.touches[0]?.clientY ?? touchStartY;
        const deltaY = (touchStartY - y) * 1.5; // Multiplicador para mejor fluidez táctil
        touchStartY = y;
        addDelta(deltaY);
        e.preventDefault();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    function frame() {
      // Lerp rápido (0.28) para eliminar sensación de lag o delay y responder instantáneamente al movimiento
      currentProgress += (targetProgress - currentProgress) * 0.28;

      // 1. Título Intro: desvanece de 0 a 0.28
      if (introRef.current) {
        const t = 1 - clamp(currentProgress / 0.28, 0, 1);
        introRef.current.style.opacity = String(t);
        introRef.current.style.transform = `translateY(${(1 - t) * -22}px) scale(${0.97 + t * 0.03})`;
        introRef.current.style.filter = `blur(${(1 - t) * 8}px)`;
      }

      // 2. Fondo del cielo: zoom cinematográfico suave
      if (skyRef.current) {
        const skyScale = 1.0 + currentProgress * 0.08;
        const skyY = currentProgress * 15;
        skyRef.current.style.transform = `scale(${skyScale}) translateY(${skyY}px)`;
      }

      // 3. Marca Central Celestial: aparece de 0.52 a 0.90 detrás de las nubes
      if (brandRef.current) {
        const t = clamp((currentProgress - 0.50) / (0.88 - 0.50), 0, 1);
        brandRef.current.style.opacity = String(t);
        brandRef.current.style.transform = `translateY(${(1 - t) * 16}px) scale(${0.96 + t * 0.04})`;
        brandRef.current.style.filter = `blur(${(1 - t) * 6}px)`;
        brandRef.current.style.letterSpacing = `${(1 - t) * 0.1}em`;
      }

      // 4. Capa frontal de nubes fotorrealistas: parallax ascendente
      if (cloudsRef.current) {
        const t = clamp((currentProgress - 0.60) / (0.95 - 0.60), 0, 1);
        cloudsRef.current.style.opacity = String(0.85 + t * 0.15);
        cloudsRef.current.style.transform = `translateY(${-currentProgress * 24}px) scale(${1 + currentProgress * 0.03})`;
      }

      // 5. Barra de progreso inferior
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${currentProgress})`;
      }

      // 6. HUD
      if (hudRef.current) {
        const t = 1 - clamp(currentProgress / 0.42, 0, 1);
        hudRef.current.style.opacity = String(t);
      }

      // 7. Hint de scroll
      if (hintRef.current) {
        hintRef.current.style.opacity = currentProgress > 0.05 ? "0" : "1";
      }

      rafId = requestAnimationFrame(frame);
    }

    if (!reduceMotion) {
      rafId = requestAnimationFrame(frame);
    } else {
      if (brandRef.current) brandRef.current.style.opacity = "1";
    }

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      cancelAnimationFrame(rafId);
      releaseLock();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.heroFixed}
      id="hero"
      data-theme="hero"
      aria-label={t.hero.sectionAria}
    >
      {/* Capa 1: Fondo de cielo fotorrealista */}
      <div ref={skyRef} className={styles.skyLayer} aria-hidden="true" />
      <div className={styles.atmosphericGlow} aria-hidden="true" />

      {/* Capa 2: Marca / Nombre monumental revelado detrás de las nubes */}
      <div ref={brandRef} className={styles.brandMarkLayer} aria-hidden="true">
        <span className={styles.brandKicker}>
          {t.hero.tagline2} • {t.hero.tagline1}
        </span>
        <h2 className={styles.brandTitle}>
          ELIAN MEJIA
        </h2>
        <span className={styles.brandSub}>
          Full-Stack Product Engineer • Mexico City
        </span>
      </div>

      {/* Capa 3: Nubes fotorrealistas recortadas al frente */}
      <div ref={cloudsRef} className={styles.cloudsCutoutLayer} aria-hidden="true" />
      <div className={styles.bottomShadowFade} aria-hidden="true" />

      {/* Capa 4: Intro principal perfectamente visible y centrada bajo el Navbar */}
      <div ref={introRef} className={styles.introLayer}>
        <span className={styles.introKicker}>{t.hero.tagline3}</span>
        <h1 className={styles.introMainTitle}>
          {t.hero.nameFirst} {t.hero.nameLast}
        </h1>
        <p className={styles.introTechStack}>{t.hero.stack}</p>
      </div>

      {/* Capa 5: HUD Lateral (Totalmente responsivo en desktop y mobile) */}
      <div ref={hudRef} className={styles.hudLayer}>
        <div className={styles.hudLeft}>
          <a
            href="#projects"
            className={styles.featuredBadge}
            data-cursor-hover
            aria-label={t.hero.featuredProjectAria}
            onClick={(e) => handleSmoothScroll(e, "#projects")}
          >
            <span className={styles.badgeArrow}>↗</span>
            <span>{t.hero.featuredProject}</span>
          </a>

          <div className={styles.socialGroup}>
            <a
              href="https://github.com/elilands"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              data-cursor-hover
            >
              GitHub
            </a>
            <span className={styles.socialDot}>•</span>
            <a
              href="https://www.linkedin.com/in/elianisadev/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              data-cursor-hover
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className={styles.hudRight}>
          <div className={styles.locationPill}>
            Ciudad de México · 2026
          </div>
          <a
            href="#about"
            className={styles.ctaPill}
            data-cursor-hover
            aria-label={t.hero.seeMyWork}
            onClick={(e) => handleSmoothScroll(e, "#about")}
          >
            {t.hero.seeMyWork}
          </a>
        </div>
      </div>

      {/* Capa 6: Sutil & Angelical Scroll Hint */}
      <div ref={hintRef} className={styles.scrollHint} aria-hidden="true">
        <span className={styles.scrollLabel}>desciende</span>
        <div className={styles.angelicLineContainer}>
          <div className={styles.angelicPulse} />
        </div>
      </div>

      {/* Capa 7: Barra de progreso de scrub */}
      <div className={styles.progressBarTrack} aria-hidden="true">
        <div ref={progressBarRef} className={styles.progressBarFill} />
      </div>
    </section>
  );
}