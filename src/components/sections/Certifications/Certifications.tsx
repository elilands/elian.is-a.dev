"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Certifications.module.css";

/* ── Datos fijos de certificados ────────────────────────────────────── */

const CERT_LISTS = {
  oracle: [
    "Oracle Fusion Cloud Applications CX Process Essentials",
    "Oracle Fusion Cloud Applications SCM Process Essentials",
    "OCI Foundations Associate",
    "OCI AI Foundations Associate",
    "Oracle Data Platform Foundations Associate",
  ],
  aws: [
    "Introduction to Cloud 101",
    "Machine Learning Foundations",
    "Introduction to Generative Artificial Intelligence",
    "Introduction to the AWS Management Console",
    "Working with User Data",
  ],
};

/* ── Componente ─────────────────────────────────────────────────────── */

export default function Certifications() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef     = useRef<HTMLSpanElement>(null);
  const ruleRef    = useRef<HTMLDivElement>(null);
  const headRef    = useRef<HTMLSpanElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);
  const credlyRef  = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(tagRef.current,     { opacity: 0, y: 14, force3D: true });
      gsap.set(ruleRef.current,    { scaleX: 0, transformOrigin: "left center" });
      gsap.set(headRef.current,    { yPercent: 115, force3D: true });
      gsap.set(gridRef.current,    { opacity: 0 });
      gsap.set(credlyRef.current,  { opacity: 0, y: 18, force3D: true });

      const sections = sectionRefs.current.filter(Boolean) as HTMLDivElement[];
      gsap.set(sections, { opacity: 0, y: 22, force3D: true });

      /* ── Timeline principal ──────────────────────────────────────── */
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
        .to(gridRef.current, { opacity: 1, duration: 0.70, ease: "power2.out" }, "-=0.32")

        .to(sections, {
          opacity: 1, y: 0,
          duration: 0.50,
          stagger:  0.06,
          ease:     "power3.out",
        }, "+=0.12")

        .to(credlyRef.current, {
          opacity: 1, y: 0,
          duration: 0.50,
          ease:     "power3.out",
        }, "-=0.16");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.certifications}
      id="certifications"
      aria-label="Certifications"
    >

      {/* ── Orbes de fondo ──────────────────────────────────────────── */}
      <div className={styles.bgOrbs} aria-hidden="true">
        <div className={`${styles.orb} ${styles.orb1}`} />
        <div className={`${styles.orb} ${styles.orb2}`} />
        <div className={`${styles.orb} ${styles.orb3}`} />
      </div>

      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className={styles.header}>
        <span ref={tagRef} className={styles.tag}>{t.certifications.tag}</span>
        <div  ref={ruleRef} className={styles.rule} aria-hidden="true" />
      </div>

      {/* ── Heading ─────────────────────────────────────────────────── */}
      <div className={styles.headingWrap}>
        <div className={styles.headingMask}>
          <span ref={headRef} className={styles.headingInner}>
            {t.certifications.heading}
          </span>
        </div>
      </div>

      {/* ── Grid de certificaciones ─────────────────────────────────── */}
      <div ref={gridRef} className={styles.certGrid}>
        {[
          { key: "oracle", title: t.certifications.oracleTitle, certs: CERT_LISTS.oracle },
          { key: "aws",    title: t.certifications.awsTitle,    certs: CERT_LISTS.aws },
        ].map((data, idx) => (
          <div
            key={data.key}
            ref={(el) => { sectionRefs.current[idx] = el; }}
            className={styles.certSection}
          >
            <h3 className={styles.certTitle}>{data.title}</h3>
            <ul className={styles.certList} aria-label={data.title}>
              {data.certs.map((cert) => (
                <li key={cert} className={styles.certItem}>
                  {cert}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── Credly Badge Link ────────────────────────────────────────── */}
      <div ref={credlyRef} className={styles.credlyLink}>
        <p className={styles.credlyText}>
          {t.certifications.credlyText}
        </p>
        <a
          href="https://www.credly.com/users/elian-mejia-gallardo"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.credlyButton}
        >
          {t.certifications.credlyButton}
        </a>
      </div>

    </section>
  );
}
