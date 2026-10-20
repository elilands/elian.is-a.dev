"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Projects.module.css";

/* ── Metadata fija (stack y URLs) ───────────────────────────────────── */

const FEATURED_META = {
  stack: ["Next.js", "TypeScript", "MariaDB", "SiliconFlow API"],
  href: "https://omyu.de",
};

const GRID_PROJECTS_META = [
  {
    href: "https://studyeducout.org",
    stack: ["Next.js", "React", "JavaScript", "CSS", "SMTP"],
  },
  {
    href: "https://portal.studyeducout.org",
    stack: ["Next.js", "React", "JavaScript", "MariaDB", "Bcrypt", "SMTP"],
  },
  {
    href: "https://fixitya.com",
    stack: ["Next.js", "TypeScript", "React", "MariaDB", "SiliconFlow API", "SMTP"],
  },
  {
    href: "https://cartia.com.mx",
    stack: ["Next.js", "React", "TypeScript", "MariaDB", "WhatsApp API"],
  },
];

/* ── Componente ─────────────────────────────────────────────────────── */

export default function Projects() {
  const { t } = useLanguage();
  const sectionRef   = useRef<HTMLElement>(null);
  const tagRef       = useRef<HTMLSpanElement>(null);
  const ruleRef      = useRef<HTMLDivElement>(null);
  const headRef      = useRef<HTMLSpanElement>(null);
  const featuredRef  = useRef<HTMLDivElement>(null);
  const gridRef      = useRef<HTMLDivElement>(null);
  const ghRowRef     = useRef<HTMLDivElement>(null);
  const cardRefs     = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── Estado inicial ─────────────────────────────────────── */
      gsap.set(tagRef.current,  { opacity: 0, y: 14, force3D: true });
      gsap.set(ruleRef.current, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(headRef.current, { yPercent: 115, force3D: true });
      gsap.set(featuredRef.current, { opacity: 0, y: 50, force3D: true });
      gsap.set(ghRowRef.current, { opacity: 0, y: 18, force3D: true });

      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      gsap.set(cards, { opacity: 0, y: 40, force3D: true });

      /* ── Timeline header + featured ────────────────────────── */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger:       sectionRef.current,
          start:         "top 78%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out", force3D: true },
      });

      tl
        .to(tagRef.current,  { opacity: 1, y: 0, duration: 0.45 })
        .to(ruleRef.current, { scaleX: 1, duration: 0.70, ease: "power2.inOut" }, "-=0.28")
        .to(headRef.current, { yPercent: 0, duration: 0.85, ease: "power4.out" }, "-=0.40")
        .to(featuredRef.current, { opacity: 1, y: 0, duration: 0.70 }, "-=0.40");

      /* ── Grid cards — stagger al entrar en viewport ─────────── */
      ScrollTrigger.create({
        trigger: gridRef.current,
        start:   "top 82%",
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1, y: 0,
            duration: 0.55,
            stagger:  0.06,
            ease:     "power3.out",
            force3D:  true,
          });
        },
      });

      /* ── GitHub row ─────────────────────────────────────────── */
      ScrollTrigger.create({
        trigger: ghRowRef.current,
        start:   "top 90%",
        onEnter: () => {
          gsap.to(ghRowRef.current, {
            opacity: 1, y: 0, duration: 0.50, ease: "power3.out",
          });
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.projects}
      id="projects"
      aria-label="Projects"
    >

      {/* ── Header ──────────────────────────────────────────────── */}
      <div className={styles.header}>
        <span ref={tagRef} className={styles.tag}>{t.projects.tag}</span>
        <div  ref={ruleRef} className={styles.rule} aria-hidden="true" />
      </div>

      {/* ── Heading ─────────────────────────────────────────────── */}
      <div className={styles.headingWrap}>
        <div className={styles.headingMask}>
          <span ref={headRef} className={styles.headingInner}>
            {t.projects.heading}
          </span>
        </div>
      </div>

      {/* ── Featured: Omyu ──────────────────────────────────────── */}
      <div ref={featuredRef} className={styles.featured}>

        <div className={styles.featuredInfo}>
          <div className={styles.featuredTopRow}>
            <span className={styles.cardNum}>{t.projects.featured.id}</span>
            <span className={styles.featuredBadge}>{t.projects.featuredBadge}</span>
          </div>

          <div className={styles.featuredMeta}>
            <h3 className={styles.featuredName}>{t.projects.featured.name}</h3>
            <p  className={styles.featuredTagline}>{t.projects.featured.tagline}</p>
          </div>

          <p className={styles.featuredDesc}>{t.projects.featured.description}</p>

          <ul className={styles.stack} aria-label="Stack tecnológico">
            {FEATURED_META.stack.map((t) => (
              <li key={t} className={styles.chip}>{t}</li>
            ))}
          </ul>

          <a
            href={FEATURED_META.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cta}
            data-cursor-hover
          >
            {t.projects.visitFeatured}
            <span className={styles.ctaArrow} aria-hidden="true">↗</span>
          </a>
        </div>

        {/* Placeholder visual — reemplazar con next/image cuando exista omyu-preview.webp */}
        <div className={styles.featuredVisual} aria-hidden="true">
          <div className={styles.placeholder}>
            <div className={styles.pBar} />
            <div className={styles.pBar} style={{ width: "72%" }} />
            <div className={styles.pRow}>
              <div className={styles.pBlock} />
              <div className={styles.pBlock} style={{ opacity: 0.5 }} />
            </div>
            <div className={styles.pBar} style={{ width: "85%" }} />
            <div className={styles.pBar} style={{ width: "58%" }} />
          </div>
        </div>

      </div>

      {/* ── Grid 2×2 ────────────────────────────────────────────── */}
      <div ref={gridRef} className={styles.grid}>
        {t.projects.items.map((p, i) => {
          const meta = GRID_PROJECTS_META[i] || { href: "#", stack: [] };
          return (
            <a
              key={p.id}
              ref={(el) => { cardRefs.current[i] = el as HTMLDivElement | null; }}
              href={meta.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.gridCard}
              aria-label={`Project: ${p.name}`}
              data-cursor-hover
            >
              <div className={styles.gridCardInner}>

                <div className={styles.gridCardTop}>
                  <span className={styles.cardNum}>{p.id}</span>
                  <span className={styles.gridArrow} aria-hidden="true">↗</span>
                </div>

                <div className={styles.gridCardMeta}>
                  <h3 className={styles.gridName}>{p.name}</h3>
                  <p  className={styles.gridTagline}>{p.tagline}</p>
                </div>

                <p className={styles.gridDesc}>{p.description}</p>

                <ul className={styles.stack} aria-label="Stack">
                  {meta.stack.map((item) => (
                    <li key={item} className={styles.chip}>{item}</li>
                  ))}
                </ul>

              </div>
            </a>
          );
        })}
      </div>

      {/* ── GitHub callout ──────────────────────────────────────── */}
      <div ref={ghRowRef} className={styles.ghRow}>
        <span className={styles.ghText}>{t.projects.moreWorkOn}</span>
        <a
          href="https://github.com/elilands"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ghLink}
          data-cursor-hover
        >
          GitHub ↗
        </a>
      </div>

    </section>
  );
}