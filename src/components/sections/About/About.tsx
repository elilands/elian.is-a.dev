/*
  About — Elian Mejia
  Curtain reveal del statement (mismo mecanismo que el Hero — consistencia).
  ScrollTrigger en el elemento raíz — anima cuando entra en viewport.
  gsap.context() maneja el cleanup completo.
*/

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./About.module.css";

export default function About() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);
  const ruleTopRef = useRef<HTMLDivElement>(null);
  const ruleMidRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const stripRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const actRefs = useRef<(HTMLLIElement | null)[]>([]);
  const evidenceRefs = useRef<(HTMLLIElement | null)[]>([]);
  const valueRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines  = lineRefs.current.filter(Boolean)  as HTMLSpanElement[];
      const strips = stripRefs.current.filter(Boolean) as HTMLDivElement[];
      const actItems = actRefs.current.filter(Boolean) as HTMLLIElement[];
      const evidenceItems = evidenceRefs.current.filter(Boolean) as HTMLLIElement[];
      const values = valueRefs.current.filter(Boolean) as HTMLLIElement[];

      /* ── Estado inicial ─────────────────────────────────────── */

      gsap.set(tagRef.current, { opacity: 0, y: 16, force3D: true });

      gsap.set([ruleTopRef.current, ruleMidRef.current], {
        scaleX: 0,
        transformOrigin: "left center",
      });

      // Mismo curtain reveal que "Elian / Mejia" en el Hero
      gsap.set(lines, { yPercent: 115, force3D: true });

      gsap.set(introRef.current, { opacity: 0, y: 18, force3D: true });

      gsap.set(strips, { opacity: 0, y: 18, force3D: true });
      gsap.set(actItems, { x: 20, opacity: 0, force3D: true });
      gsap.set(evidenceItems, { x: 20, opacity: 0, force3D: true });
      gsap.set(values, { x: 22, opacity: 0, force3D: true });

      /* ── Timeline ───────────────────────────────────────────── */

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start:   "top 78%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out", force3D: true },
      });

      tl
        // Tag "01"
        .to(tagRef.current, { opacity: 1, y: 0, duration: 0.45 })

        // Regla superior: de izq a der
        .to(ruleTopRef.current, {
          scaleX: 1, duration: 0.70, ease: "power2.inOut",
        }, "-=0.28")

        // Statement: línea a línea, stagger
        .to(lines, {
          yPercent: 0,
          duration: 0.80,
          stagger:  0.07,
          ease:     "power4.out",
        }, "-=0.42")

        // Regla media
        .to(ruleMidRef.current, {
          scaleX: 1, duration: 0.70, ease: "power2.inOut",
        }, "-=0.30")

        // Intro
        .to(introRef.current, { opacity: 1, y: 0, duration: 0.55 }, "-=0.35")

        // Signal strips + narrative rows
        .to(strips, { opacity: 1, y: 0, duration: 0.50, stagger: 0.08 }, "-=0.24")
        .to(actItems, {
          x: 0, opacity: 1,
          duration: 0.44,
          stagger: 0.06,
        }, "-=0.22")
        .to(evidenceItems, {
          x: 0, opacity: 1,
          duration: 0.44,
          stagger: 0.06,
        }, "-=0.30")

        // Valores: stagger desde la derecha
        .to(values, {
          x: 0, opacity: 1,
          duration: 0.48,
          stagger:  0.06,
        }, "-=0.30");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.about}
      id="about"
      data-theme="about"
      aria-label={t.about.sectionAria}
      role="region"
    >

      {/* ── Tag + regla superior ──────────────────────────────── */}
      <div className={styles.aboutHeader}>
        <span ref={tagRef} className={styles.aboutTag} aria-hidden="true">{t.about.tag}</span>
        <div ref={ruleTopRef} className={styles.rule} aria-hidden="true" />
      </div>

      {/* ── Statement ─────────────────────────────────────────── */}
      <div
        className={styles.statementBlock}
        role="heading"
        aria-level={2}
        aria-label={t.about.statementAria}
      >
        {t.about.statement.map((line, i) => (
          <div key={i} className={styles.lineMask}>
            <span
              ref={(el) => { lineRefs.current[i] = el; }}
              className={styles.lineInner}
            >
              {line}
            </span>
          </div>
        ))}
      </div>

      {/* ── Regla media ───────────────────────────────────────── */}
      <div ref={ruleMidRef} className={styles.ruleMid} aria-hidden="true" />

      {/* ── Narrative grid ─────────────────────────────────────── */}
      <div className={styles.aboutGrid}>

        <div className={styles.aboutCopy}>
          <p ref={introRef} className={styles.aboutBio}>
            {t.about.intro}
          </p>

          <ul className={styles.signalList} aria-label="Three-act professional narrative">
            {t.about.acts.map((item, i) => (
              <li
                key={item.id}
                ref={(el) => { actRefs.current[i] = el; }}
                className={styles.signalItem}
              >
                <span className={styles.signalLabel}>{item.id}</span>
                <div className={styles.signalContent}>
                  <h3 className={styles.signalTitle}>{item.title}</h3>
                  <p className={styles.signalValue}>{item.body}</p>
                </div>
              </li>
            ))}
          </ul>

          <ul className={styles.profileList} aria-label="Professional profile highlights">
            {t.about.profilePoints.map(([label, value]) => (
              <li key={label} className={styles.profileItem}>
                <span className={styles.profileLabel}>{label}</span>
                <span className={styles.profileValue}>{value}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.aboutAside}>
          <div className={styles.skillsStripWrap}>
            {t.about.signalRows.map((row, rowIdx) => (
              <div
                key={rowIdx}
                ref={(el) => { stripRefs.current[rowIdx] = el; }}
                className={`${styles.skillsStrip} ${rowIdx % 2 === 1 ? styles.skillsStripReverse : ""}`}
                aria-hidden="true"
              >
                <div className={styles.skillsTrack}>
                  {[...row, ...row].map((skill, i) => (
                    <span key={`${skill}-${i}`} className={styles.skillChip}>
                      <span className={styles.skillDot} aria-hidden="true" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <ul className={styles.evidenceList} aria-label="Soft skills and working traits">
            {t.about.evidence.map((item, i) => (
              <li
                key={item.title}
                ref={(el) => { evidenceRefs.current[i] = el; }}
                className={styles.evidenceItem}
              >
                <h3 className={styles.evidenceTitle}>{item.title}</h3>
                <p className={styles.evidenceDetail}>{item.detail}</p>
              </li>
            ))}
          </ul>

          <ul className={styles.valuesList} aria-label="Professional operating principles">
            {t.about.values.map((val, i) => (
              <li
                key={val}
                ref={(el) => { valueRefs.current[i] = el; }}
                className={styles.valueItem}
              >
                <span className={styles.valueIndex}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.valueText}>{val}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

    </section>
  );
}