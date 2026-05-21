"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import styles from "./Projects.module.css";

/* ── Datos ──────────────────────────────────────────────────────────── */

interface Project {
  id:          string;
  name:        string;
  tagline:     string;
  description: string;
  stack:       string[];
  href:        string;
  featured?:   boolean;
}

const FEATURED: Project = {
  id:       "01",
  name:     "Omyu",
  tagline:  "Your intelligent life companion",
  featured: true,
  href:     "https://omyu.de",
  description:
    "A multi-functional platform built around the user as a whole. " +
    "Train against an AI for real scenarios — negotiate a raise, handle conflict, close a deal. " +
    "Beyond that: calendar, tasks, music, a personality profile built from a questionnaire, " +
    "a message decoder especially useful for neurodivergent users, a habit garden, " +
    "and an upcoming match system more personal and grounded than any existing platform — " +
    "plus community creation tools.",
  stack: ["Next.js", "TypeScript", "MariaDB", "SiliconFlow API"],
};

const GRID_PROJECTS: Project[] = [
  {
    id:      "02",
    name:    "Study Edu Cout",
    tagline: "English certification platform",
    href:    "https://studyeducout.org",
    description:
      "Landing and course platform for English certification. " +
      "Built specifically for structured learning and exam prep, " +
      "with Gmail SMTP for communication flows.",
    stack: ["Next.js", "React", "JavaScript", "CSS", "SMTP"],
  },
  {
    id:      "03",
    name:    "Study Edu Cout — Portal",
    tagline: "Independent LMS for teachers & students",
    href:    "https://portal.studyeducout.org",
    description:
      "Full intranet alternative to Moodle. Teachers upload content, " +
      "grade assignments, and manage classes. Students access structured " +
      "coursework through role-based access. Built for independence and " +
      "full ownership of the learning infrastructure.",
    stack: ["Next.js", "React", "JavaScript", "MariaDB", "Bcrypt", "SMTP"],
  },
  {
    id:      "04",
    name:    "Fixit Ya",
    tagline: "AI-powered home services",
    href:    "https://fixitya.com",
    description:
      "Chat with an AI bot to request cleaning, plumbing, or any home " +
      "service. Logs all interactions and requests. First project built " +
      "entirely in TypeScript — also my first integration with SiliconFlow.",
    stack: ["Next.js", "TypeScript", "React", "MariaDB", "SiliconFlow API", "SMTP"],
  },
  {
    id:      "05",
    name:    "Cartia",
    tagline: "Restaurant management & delivery platform",
    href:    "https://cartia.com.mx",
    description:
      "Alternative to Rappi and Uber for restaurants. Fully customized " +
      "digital menus, a complete admin panel for managing staff, delivery " +
      "drivers, and revenue — with commission charged only at the end. " +
      "Real-time order flow via WhatsApp API.",
    stack: ["Next.js", "React", "TypeScript", "MariaDB", "WhatsApp API"],
  },
];

/* ── Componente ─────────────────────────────────────────────────────── */

export default function Projects() {
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
        <span ref={tagRef} className={styles.tag}>02</span>
        <div  ref={ruleRef} className={styles.rule} aria-hidden="true" />
      </div>

      {/* ── Heading ─────────────────────────────────────────────── */}
      <div className={styles.headingWrap}>
        <div className={styles.headingMask}>
          <span ref={headRef} className={styles.headingInner}>
            What I&apos;ve built.
          </span>
        </div>
      </div>

      {/* ── Featured: Omyu ──────────────────────────────────────── */}
      <div ref={featuredRef} className={styles.featured}>

        <div className={styles.featuredInfo}>
          <div className={styles.featuredTopRow}>
            <span className={styles.cardNum}>{FEATURED.id}</span>
            <span className={styles.featuredBadge}>Featured</span>
          </div>

          <div className={styles.featuredMeta}>
            <h3 className={styles.featuredName}>{FEATURED.name}</h3>
            <p  className={styles.featuredTagline}>{FEATURED.tagline}</p>
          </div>

          <p className={styles.featuredDesc}>{FEATURED.description}</p>

          <ul className={styles.stack} aria-label="Stack tecnológico">
            {FEATURED.stack.map((t) => (
              <li key={t} className={styles.chip}>{t}</li>
            ))}
          </ul>

          <a
            href={FEATURED.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cta}
            data-cursor-hover
          >
            Visit Omyu
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
        {GRID_PROJECTS.map((p, i) => (
          <a
            key={p.id}
            ref={(el) => { cardRefs.current[i] = el as HTMLDivElement | null; }}
            href={p.href}
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
                {p.stack.map((t) => (
                  <li key={t} className={styles.chip}>{t}</li>
                ))}
              </ul>

            </div>
          </a>
        ))}
      </div>

      {/* ── GitHub callout ──────────────────────────────────────── */}
      <div ref={ghRowRef} className={styles.ghRow}>
        <span className={styles.ghText}>More work on</span>
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