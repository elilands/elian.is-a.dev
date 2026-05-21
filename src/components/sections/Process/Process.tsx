/*
  Process — Elian Mejia
  Color escala: #232038 (Skills final) → #34304E

  Layout:
  · Heading curtain reveal (consistencia con todas las secciones)
  · 4 pasos: número + línea vertical + título + descripción
  · La línea vertical de cada paso se dibuja con scaleY 0→1
  · Fila inferior: atributos de trabajo ("working style")

  Animaciones:
  · gsap.context() limpio
  · Heading: yPercent 115→0
  · Pasos: stagger — línea scaleY + contenido opacity+x
  · Working style: opacity+y
*/

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import styles from "./Process.module.css";

/* ── Datos ──────────────────────────────────────────────────────────── */

const STEPS = [
  {
    num:   "01",
    title: "Discovery",
    body:  "You explain the problem. I ask the right questions. " +
           "The schema design starts here — never in the middle of the build.",
  },
  {
    num:   "02",
    title: "Architecture",
    body:  "DB → API → UI. In that order, always. " +
           "Decisions made early prevent rewrites made late.",
  },
  {
    num:   "03",
    title: "Build",
    body:  "Fast iterations with real previews. " +
           "You see progress, not promises. " +
           "I ship working software — not perfect software.",
  },
  {
    num:   "04",
    title: "Ship",
    body:  "Deployed, monitored, documented. " +
           "Then we look at what's next.",
  },
];

const TRAITS = [
  "Async-friendly",
  "Ships on time",
  "Direct communication",
  "CST — Mexico City",
];

/* ── Componente ─────────────────────────────────────────────────────── */

interface StepRefs {
  line:    HTMLDivElement | null;
  content: HTMLDivElement | null;
}

export default function Process() {
  const sectionRef  = useRef<HTMLElement>(null);
  const tagRef      = useRef<HTMLSpanElement>(null);
  const ruleRef     = useRef<HTMLDivElement>(null);
  const headRef     = useRef<HTMLSpanElement>(null);
  const stepsRef    = useRef<HTMLDivElement>(null);
  const traitsRef   = useRef<HTMLDivElement>(null);

  // Refs por paso: línea + contenido
  const stepRefs = useRef<StepRefs[]>(
    STEPS.map(() => ({ line: null, content: null }))
  );

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── Estado inicial ─────────────────────────────────────── */
      gsap.set(tagRef.current,  { opacity: 0, y: 14, force3D: true });
      gsap.set(ruleRef.current, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(headRef.current, { yPercent: 115, force3D: true });

      const lines    = stepRefs.current.map((r) => r.line).filter(Boolean);
      const contents = stepRefs.current.map((r) => r.content).filter(Boolean);

      gsap.set(lines,    { scaleY: 0, transformOrigin: "top center" });
      gsap.set(contents, { opacity: 0, x: -20, force3D: true });

      gsap.set(traitsRef.current, { opacity: 0, y: 18, force3D: true });

      /* ── Timeline principal ─────────────────────────────────── */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger:       sectionRef.current,
          start:         "top 78%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out", force3D: true },
      });

      tl
        .to(tagRef.current,  { opacity: 1, y: 0, duration: 0.72 })
        .to(ruleRef.current, { scaleX: 1, duration: 1.10, ease: "power2.inOut" }, "-=0.38")
        .to(headRef.current, { yPercent: 0, duration: 1.55, ease: "power4.out" }, "-=0.75")

        /*
          Pasos: línea y contenido se animan en pares staggered.
          La línea aparece primero (scaleY), luego el contenido
          al lado — como si se "construyera" el paso de arriba abajo.
        */
        .to(lines, {
          scaleY:   1,
          duration: 0.90,
          stagger:  0.18,
          ease:     "power2.inOut",
        }, "-=0.60")

        .to(contents, {
          opacity: 1,
          x:       0,
          duration: 0.75,
          stagger:  0.18,
        }, "-=0.85")

        // Working style: al final
        .to(traitsRef.current, {
          opacity: 1,
          y:       0,
          duration: 0.80,
        }, "-=0.40");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.process}
      id="process"
      data-theme="process"
      aria-label="How I work"
    >

      {/* ── Orbe de fondo único — más intenso que Skills ─────────── */}
      <div className={styles.bgOrb} aria-hidden="true" />

      {/* ── Header ──────────────────────────────────────────────── */}
      <div className={styles.header}>
        <span ref={tagRef} className={styles.tag}>05</span>
        <div  ref={ruleRef} className={styles.rule} aria-hidden="true" />
      </div>

      {/* ── Heading ─────────────────────────────────────────────── */}
      <div className={styles.headingWrap}>
        <div className={styles.headingMask}>
          <span ref={headRef} className={styles.headingInner}>
            How I work.
          </span>
        </div>
      </div>

      {/* ── Pasos ───────────────────────────────────────────────── */}
      <div ref={stepsRef} className={styles.steps}>
        {STEPS.map((step, i) => (
          <div key={step.num} className={styles.step}>

            {/* Número */}
            <span className={styles.stepNum}>{step.num}</span>

            {/* Línea vertical animada */}
            <div
              ref={(el) => { stepRefs.current[i].line = el; }}
              className={styles.stepLine}
              aria-hidden="true"
            />

            {/* Contenido */}
            <div
              ref={(el) => { stepRefs.current[i].content = el; }}
              className={styles.stepContent}
            >
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p  className={styles.stepBody}>{step.body}</p>
            </div>

          </div>
        ))}
      </div>

      {/* ── Working style ───────────────────────────────────────── */}
      <div ref={traitsRef} className={styles.traits}>
        {TRAITS.map((trait, i) => (
          <span key={trait} className={styles.traitItem}>
            {i > 0 && <span className={styles.traitSep} aria-hidden="true">·</span>}
            {trait}
          </span>
        ))}
      </div>

    </section>
  );
}