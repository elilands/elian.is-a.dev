/*
  Contact — Elian Mejia
  La sección de mayor contraste del sitio.

  El fondo viene de #3D3860 (Process final) y asciende hasta #FAF8F4.
  Cuando el heading es visible, el mundo ya es claro — el texto es oscuro.

  Animaciones:
  · El halo crece desde el centro con ScrollTrigger scrub
    (sincronizado con el scroll, no un timeline de disparo único)
  · Heading: curtain reveal en cuanto entra en viewport
  · Tagline: fade + y
  · Email: aparece con un pequeño scale
  · Socials: stagger opacity
*/

"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import styles from "./Contact.module.css";

export default function Contact() {
  const sectionRef  = useRef<HTMLElement>(null);
  const haloRef     = useRef<HTMLDivElement>(null);
  const headRef     = useRef<HTMLSpanElement>(null);
  const taglineRef  = useRef<HTMLParagraphElement>(null);
  const emailRef    = useRef<HTMLAnchorElement>(null);
  const socialsRef  = useRef<HTMLDivElement>(null);
  const ruleRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── Estado inicial ─────────────────────────────────────── */
      gsap.set(headRef.current,    { yPercent: 115, force3D: true });
      gsap.set(taglineRef.current, { opacity: 0, y: 20, force3D: true });
      gsap.set(emailRef.current,   { opacity: 0, scale: 0.94, force3D: true });
      gsap.set(socialsRef.current, { opacity: 0, y: 12, force3D: true });
      gsap.set(ruleRef.current,    { scaleX: 0, transformOrigin: "center center" });
      gsap.set(haloRef.current,    { opacity: 0, scale: 0.72, force3D: true });

      /* ── Halo: scrub con el scroll ──────────────────────────── */
      /*
        El halo crece a medida que el usuario scrollea hacia el Contact.
        Empieza antes del heading — da sensación de que la luz "llama"
        al usuario antes de que llegue al contenido.
      */
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start:   "top bottom",
        end:     "40% center",
        scrub:   2.5,
        onUpdate: (self) => {
          gsap.set(haloRef.current, {
            opacity: self.progress * 0.88,
            scale:   0.72 + self.progress * 0.44,
            force3D: true,
          });
        },
      });

      /* ── Contenido: timeline al entrar en viewport ──────────── */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger:       sectionRef.current,
          start:         "top 62%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out", force3D: true },
      });

      tl
        // Regla central — se expande desde el centro
        .to(ruleRef.current, {
          scaleX: 1, duration: 0.70, ease: "power2.inOut",
        })

        // Heading: el clásico curtain reveal
        .to(headRef.current, {
          yPercent: 0, duration: 0.85, ease: "power4.out",
        }, "-=0.40")

        // Tagline
        .to(taglineRef.current, {
          opacity: 1, y: 0, duration: 0.55,
        }, "-=0.30")

        // Email CTA
        .to(emailRef.current, {
          opacity: 1, scale: 1, duration: 0.55, ease: "back.out(1.4)",
        }, "-=0.20")

        // Socials
        .to(socialsRef.current, {
          opacity: 1, y: 0, duration: 0.48,
        }, "-=0.16");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.contact}
      data-light="true"
      data-theme="contact"
      aria-label="Contact"
    >

      {/* ── Halo central — crece con scroll ─────────────────────── */}
      <div ref={haloRef} className={styles.halo} aria-hidden="true" />

      {/* ── Contenido ───────────────────────────────────────────── */}
      <div className={styles.inner}>

        {/* Regla central */}
        <div ref={ruleRef} className={styles.rule} aria-hidden="true" />

        {/* Heading */}
        <div className={styles.headingMask}>
          <span ref={headRef} className={styles.headingInner}>
            Let&apos;s make<br />something.
          </span>
        </div>

        {/* Tagline */}
        <p ref={taglineRef} className={styles.tagline}>
          If you have something to build, I&apos;m listening.
        </p>

        {/* Email CTA */}
        <a
          ref={emailRef}
          href="mailto:elian.mejiag@gmail.com"
          className={styles.emailCta}
          data-cursor-hover
          aria-label="Send email to Elian Mejia"
        >
          <span className={styles.emailLabel}>elian.mejiag@gmail.com</span>
          <span className={styles.emailArrow} aria-hidden="true">↗</span>
        </a>

        {/* Socials + separador */}
        <div ref={socialsRef} className={styles.socials}>
          <a
            href="https://github.com/elilands"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            data-cursor-hover
          >
            GitHub
          </a>
          <span className={styles.socialDot} aria-hidden="true" />
          <a
            href="https://www.linkedin.com/in/elianisadev/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            data-cursor-hover
          >
            LinkedIn
          </a>
          <span className={styles.socialDot} aria-hidden="true" />
          <a
            href="https://omyu.de"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            data-cursor-hover
          >
            Omyu
          </a>
        </div>

      </div>

    </section>
  );
}