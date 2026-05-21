"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { scrollToTarget } from "@/lib/lenisInstance";
import ParticleCanvas from "@/components/canvas/ParticleCanvas/ParticleCanvas";
import styles from "./Hero.module.css";

export default function Hero() {
  const heroRef       = useRef<HTMLElement>(null);
  const contentRef    = useRef<HTMLDivElement>(null);
  const haloRef       = useRef<HTMLDivElement>(null);

  /* Nombre */
  const nameElRef     = useRef<HTMLSpanElement>(null);
  const nameMeRef     = useRef<HTMLSpanElement>(null);
  const ruleRef       = useRef<HTMLDivElement>(null);

  /* Tagline */
  const t1Ref         = useRef<HTMLSpanElement>(null);
  const t2Ref         = useRef<HTMLSpanElement>(null);
  const t3Ref         = useRef<HTMLSpanElement>(null);

  /* Resto */
  const stackRef      = useRef<HTMLParagraphElement>(null);
  const ctaRef        = useRef<HTMLAnchorElement>(null);
  const omyuRef       = useRef<HTMLAnchorElement>(null);
  const socialRef     = useRef<HTMLDivElement>(null);
  const scrollLineRef = useRef<HTMLSpanElement>(null);

  /* ── Handler: scroll suave con Lenis ──────────────────────────────── */

  const handleSmoothScroll = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();

      const navHeight = 68;
      scrollToTarget(href, {
        duration: 1.55,
        offset: -navHeight,
      });

      if (typeof window !== "undefined") {
        window.history.pushState(null, "", href);
      }
    },
    []
  );

  useEffect(() => {
    if (!heroRef.current) return;

    /* ── Estado inicial ─────────────────────────────────────────── */

    gsap.set([nameElRef.current, nameMeRef.current], {
      yPercent: 115, force3D: true,
    });

    gsap.set(ruleRef.current, {
      scaleX: 0, transformOrigin: "left center",
    });

    gsap.set([t1Ref.current, t2Ref.current, t3Ref.current], {
      x: 40, opacity: 0, force3D: true,
    });

    gsap.set([stackRef.current, ctaRef.current], {
      opacity: 0, y: 14, force3D: true,
    });

    gsap.set(omyuRef.current,   { opacity: 0, y: 22, force3D: true });
    gsap.set(socialRef.current, { opacity: 0 });
    gsap.set(haloRef.current,   { opacity: 0, scale: 0.82, force3D: true });
    gsap.set(scrollLineRef.current, {
      scaleY: 0, opacity: 0, transformOrigin: "top center",
    });

    /* ── Timeline de entrada ────────────────────────────────────── */

    const tl = gsap.timeline({
      delay: 0.18,
      defaults: { ease: "power3.out", force3D: true },
    });

    tl
      .to(haloRef.current, {
        opacity: 1, scale: 1, duration: 1.1, ease: "power2.out",
      })
      .to(nameElRef.current, {
        yPercent: 0, duration: 0.85, ease: "power4.out",
      }, "-=0.85")
      .to(nameMeRef.current, {
        yPercent: 0, duration: 0.85, ease: "power4.out",
      }, "-=0.58")
      .to(ruleRef.current, {
        scaleX: 1, duration: 0.70, ease: "power2.inOut",
      }, "-=0.36")
      .to(t1Ref.current, { x: 0, opacity: 1, duration: 0.55 }, "-=0.32")
      .to(t2Ref.current, { x: 0, opacity: 1, duration: 0.55 }, "-=0.22")
      .to(t3Ref.current, { x: 0, opacity: 1, duration: 0.55 }, "-=0.22")
      .to(stackRef.current, { opacity: 1, y: 0, duration: 0.55 }, "-=0.20")
      .to(ctaRef.current,   { opacity: 1, y: 0, duration: 0.50 }, "-=0.18")
      .to(omyuRef.current,  { opacity: 1, y: 0, duration: 0.52 }, "-=0.16")
      .to(socialRef.current,{ opacity: 1, duration: 0.48 },        "-=0.16")
      .to(scrollLineRef.current, {
        scaleY: 1, opacity: 1, duration: 0.70, ease: "power2.inOut",
      }, "-=0.12");

    /* ── ScrollTrigger: contenido asciende y desaparece ─────────── */

    /*
      Solo exit del contenido. Sin heroAngelic — la transición de
      oscuro a luz la maneja el sistema de gradientes progresivos
      de cada sección (About, Projects, etc.).
    */
    const exitSt = ScrollTrigger.create({
      trigger: heroRef.current,
      start:   "top top",
      end:     "50% top",
      scrub:   2.0,
      onUpdate: (self) => {
        const p = self.progress;
        gsap.set(contentRef.current, {
          y:       -p * 80,
          opacity: Math.max(0, 1 - p * 2.2),
          force3D: true,
        });
      },
    });

    return () => {
      tl.kill();
      exitSt.kill();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className={styles.hero}
      id="hero"
      data-theme="hero"
      aria-label="Hero section introducing Elian Mejia, a full-stack developer from Mexico City"
      role="region"
    >
      {/* heroAngelic eliminado — contradecía el sistema de gradientes */}

      <div className={styles.heroGrain} aria-hidden="true" />
      <ParticleCanvas dark className={styles.heroParticles} aria-hidden="true" />
      <div ref={haloRef} className={styles.heroHalo} aria-hidden="true" />

      <div ref={contentRef} className={styles.heroContent}>

        {/* ── Columna izquierda ─────────────────────────────────── */}
        <div className={styles.heroLeft}>

          <div className={styles.heroNameBlock} role="heading" aria-level={1}>
            <div className={styles.nameMask}>
              <span ref={nameElRef} className={styles.nameWord}>Elian</span>
            </div>
            <div className={styles.nameMask}>
              <span ref={nameMeRef} className={styles.nameWord}>Mejia</span>
            </div>
          </div>

          <div ref={ruleRef} className={styles.heroRule} aria-hidden="true" />

          <div className={styles.heroBottomLeft}>
            <a
              ref={omyuRef}
              href="#projects"
              className={styles.heroProject}
              data-cursor-hover
              aria-label="View Omyu project — AI scenario trainer"
              title="View featured project"
              onClick={(e) => handleSmoothScroll(e, "#projects")}
            >
              <span className={styles.projectArrow} aria-hidden="true">↗</span>
              <span className={styles.projectText}>Omyu — AI scenario trainer</span>
            </a>

            <nav ref={socialRef} className={styles.heroSocial} aria-label="Social media links">
              <a
                href="https://github.com/elilands"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="GitHub profile (opens in new window)"
                data-cursor-hover
              >
                GitHub
              </a>
              <span className={styles.socialSep} aria-hidden="true">·</span>
              <a
                href="https://www.linkedin.com/in/elianisadev/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="LinkedIn profile (opens in new window)"
                data-cursor-hover
              >
                LinkedIn
              </a>
            </nav>
          </div>

        </div>

        {/* ── Columna derecha ───────────────────────────────────– */}
        <div className={styles.heroRight}>

          <p className={styles.heroTagline} aria-label="Professional description: Developer, Builder, based in Mexico City">
            <span ref={t1Ref} className={styles.tagLine}>Developer.</span>
            <span ref={t2Ref} className={styles.tagLine}>Builder.</span>
            <span ref={t3Ref} className={styles.tagLine}>Mexico City.</span>
          </p>

          <p ref={stackRef} className={styles.heroStack} aria-label="Technology stack">
            Next.js · TypeScript · MySQL · MariaDB · JavaScript
          </p>

          <a
            ref={ctaRef}
            href="#about"
            className={styles.heroCta}
            data-cursor-hover
            aria-label="See my work — navigate to portfolio section"
            onClick={(e) => handleSmoothScroll(e, "#about")}
          >
            See my work
          </a>

        </div>

      </div>

      <div className={styles.scrollIndicator} aria-hidden="true">
        <span ref={scrollLineRef} className={styles.scrollLine} />
      </div>

    </section>
  );
}