/*
  Navbar — Elian Mejia

  Scroll suave: intercepta todos los clicks en hrefs internos (#section)
  y usa scrollToTarget() del singleton de Lenis en lugar del
  comportamiento nativo del browser (que "teletransporta").

  El offset de -1 en scrollTo garantiza que el nav no tape el heading.
*/

"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "@/lib/gsap";
import { scrollToTarget } from "@/lib/lenisInstance";
import styles from "./Navbar.module.css";

/* ── Config ─────────────────────────────────────────────────────────── */

const NAV_LINKS = [
  { href: "#about",          label: "About",          num: "01" },
  { href: "#projects",       label: "Projects",       num: "02" },
  { href: "#skills",         label: "Skills",         num: "03" },
  { href: "#certifications", label: "Certifications", num: "04" },
  { href: "#process",        label: "Process",        num: "05" },
  { href: "#contact",        label: "Contact",        num: "06" },
];

// Sections can opt into a "light" theme by adding `data-light="true"`
// to their <section> element. Navbar will read that attribute on
// intersection and toggle the light styles accordingly.

// Section order used for progress calculation — stable module-scope
const SECTION_ORDER = ["hero", "about", "projects", "skills", "certifications", "process", "contact"];
const TOTAL_SECTIONS = SECTION_ORDER.length;

/* ── Hook: scroll suave a anchor ────────────────────────────────────── */

function useSmoothAnchor() {
  /*
    Devuelve un handler que:
    1. Previene el salto nativo del browser.
    2. Llama scrollToTarget() con la duración cinematográfica.
    3. Actualiza la URL sin recargar (history.pushState).
  */
  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();

      const selector = href; // ej. "#about"
      const target   = document.querySelector(selector);

      if (!target) return;

      // Offset: altura del nav (64-72px) + 4px de holgura
      const navHeight = 68;

      scrollToTarget(selector, {
        duration: 1.55,
        offset:   -navHeight,
      });

      // Actualiza la URL sin salto
      if (typeof window !== "undefined") {
        window.history.pushState(null, "", href);
      }
    },
    []
  );

  return handleAnchorClick;
}

/* ── Componente ─────────────────────────────────────────────────────── */

export default function Navbar() {
  const navRef     = useRef<HTMLElement>(null);
  const drawerRef  = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [scrolled,   setScrolled]   = useState(false);
  const [isLight,    setIsLight]    = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [activeLink, setActiveLink] = useState<string>("");
  const [progress,   setProgress]   = useState(0);

  const handleAnchorClick = useSmoothAnchor();

  /* ── Mapeo de secciones para progreso ──────────────────────────── */

  /* ── Scroll: frosted glass ─────────────────────────────────────── */

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── IntersectionObserver: sección activa + tema + progreso ────────── */

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          setActiveLink(`#${id}`);
          const attr = (entry.target as HTMLElement).getAttribute("data-light");
          setIsLight(attr === "true");

          // Apply a section theme identifier on the document element so
          // global styles can react to the active section.
          const theme = (entry.target as HTMLElement).getAttribute("data-theme") || id;
          try {
            document.documentElement.setAttribute("data-section-theme", theme);
          } catch {
            // ignore server-side or security errors
          }

          /* ── Calcular progreso basado en sección activa ──────────── */
          const sectionIndex = SECTION_ORDER.indexOf(id);
          if (sectionIndex !== -1) {
            const progressPercent = ((sectionIndex + 1) / TOTAL_SECTIONS) * 100;
            setProgress(progressPercent);
          }
        });
      },
      { rootMargin: "-64px 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));

    /* ── Detectar sección inicial si no hay scroll ──────────────────────── */
    if (window.scrollY < 100 && sections.length > 0) {
      // Avoid calling setState synchronously in the effect body — defer
      // to the next tick so we don't trigger cascading renders.
      setTimeout(() => {
        const firstSection = sections[0];
        const id = firstSection.id;
        setActiveLink(`#${id}`);
        const attr = (firstSection as HTMLElement).getAttribute("data-light");
        setIsLight(attr === "true");
        const theme = (firstSection as HTMLElement).getAttribute("data-theme") || id;
        try {
          document.documentElement.setAttribute("data-section-theme", theme);
        } catch {}
        const sectionIndex = SECTION_ORDER.indexOf(id);
        if (sectionIndex !== -1) {
          const progressPercent = ((sectionIndex + 1) / TOTAL_SECTIONS) * 100;
          setProgress(progressPercent);
        }
      }, 0);
    }

    return () => observer.disconnect();
  }, []);

  /* ── GSAP: entrada del nav ─────────────────────────────────────── */

  useEffect(() => {
    if (!navRef.current) return;

    gsap.set(navRef.current, { opacity: 0, y: -18, force3D: true });

    gsap.to(navRef.current, {
      opacity:  1,
      y:        0,
      duration: 0.90,
      ease:     "power3.out",
      delay:    3.2,
      force3D:  true,
    });
  }, []);

  /* ── Menú mobile ───────────────────────────────────────────────── */

  const openMenu = useCallback(() => {
    setMenuOpen(true);
    document.body.style.overflow = "hidden";

    // Defer animations until after the DOM updates so refs are populated.
    requestAnimationFrame(() => {
      const overlay = overlayRef.current;
      const drawer = drawerRef.current;
      const drawerLinks = drawer?.querySelectorAll("a");

      if (overlay) gsap.set(overlay, { opacity: 0 });
      if (drawer)  gsap.set(drawer,  { x: "100%" });
      if (drawerLinks) gsap.set(drawerLinks, { x: 24, opacity: 0 });

      if (overlay) gsap.to(overlay, { opacity: 1, duration: 0.35, ease: "power2.out" });
      if (drawer)  gsap.to(drawer,  { x: "0%", duration: 0.55, ease: "power4.out", force3D: true });

      if (drawerLinks) {
        gsap.to(drawerLinks, {
          x: 0, opacity: 1,
          duration: 0.55,
          stagger:  0.07,
          ease:     "power3.out",
          delay:    0.18,
          force3D:  true,
        });
      }
    });
  }, []);

  const closeMenu = useCallback(() => {
    const overlay = overlayRef.current;
    const drawer = drawerRef.current;

    if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.28, ease: "power2.in" });

    if (drawer) {
      gsap.to(drawer,  {
        x:        "100%",
        duration: 0.42,
        ease:     "power4.in",
        force3D:  true,
        onComplete: () => {
          setMenuOpen(false);
          document.body.style.overflow = "";
        },
      });
    } else {
      // Fallback: ensure state is reset even if ref is missing
      setMenuOpen(false);
      document.body.style.overflow = "";
    }
  }, []);

  /* ── Handler unificado para links ──────────────────────────────── */

  /*
    handleNavLink: usado tanto en desktop como en el drawer mobile.
    Cierra el drawer si está abierto, luego hace el scroll suave.
    El setTimeout(0) deja que closeMenu anime antes de scrollear.
  */
  const handleNavLink = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (menuOpen) {
        e.preventDefault();
        closeMenu();
        // Espera a que el drawer cierre (420ms) y luego scrollea
        setTimeout(() => {
          const target = document.querySelector(href);
          if (!target) return;
          scrollToTarget(href, { duration: 1.1, offset: -68 });
          window.history.pushState(null, "", href);
        }, 440);
        return;
      }

      handleAnchorClick(e, href);
    },
    [menuOpen, closeMenu, handleAnchorClick]
  );

  /* ── Render ────────────────────────────────────────────────────── */

  return (
    <>
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className={styles.skipLink}
        onClick={(e) => {
          e.preventDefault();
          const mainContent = document.getElementById("main-content");
          mainContent?.focus();
        }}
      >
        Skip to main content
      </a>

      <nav
        ref={navRef}
        className={[
          styles.nav,
          scrolled ? styles.navScrolled : "",
          isLight  ? styles.navLight    : "",
        ].join(" ")}
        aria-label="Main navigation"
        role="navigation"
      >

        {/* Logo */}
        <a
          href="#hero"
          className={styles.logo}
          onClick={(e) => handleNavLink(e, "#hero")}
          aria-label="Elian Mejia — Home"
          data-cursor-hover
        >
          EM
        </a>

        {/* Links desktop */}
        <ul className={styles.links} role="list" aria-label="Navigation links">
          {NAV_LINKS.map(({ href, label, num }) => (
            <li key={href}>
              <a
                href={href}
                onClick={(e) => handleNavLink(e, href)}
                className={[
                  styles.link,
                  activeLink === href ? styles.linkActive : "",
                ].join(" ")}
                data-cursor-hover
                aria-current={activeLink === href ? "page" : undefined}
              >
                <span className={styles.linkNum} aria-hidden="true">{num}</span>
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA desktop */}
        <a
          href="mailto:elian.mejiag@gmail.com"
          className={styles.cta}
          data-cursor-hover
          aria-label="Contact via email: elian.mejiag@gmail.com"
          title="Send email to elian.mejiag@gmail.com"
        >
          Get in touch
        </a>

        {/* Burger mobile */}
        <button
          className={[styles.burger, menuOpen ? styles.burgerOpen : ""].join(" ")}
          onClick={menuOpen ? closeMenu : openMenu}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          aria-controls="mobile-drawer"
        >
          <span className={styles.burgerLine} aria-hidden="true" />
          <span className={styles.burgerLine} aria-hidden="true" />
        </button>

      </nav>

      {/* Barra de progreso — muestra progreso en las secciones */}
      <div
        ref={progressRef}
        className={styles.progressBar}
        style={{
          width: `${progress}%`,
          opacity: progress > 0 ? 1 : 0,
        }}
        aria-hidden="true"
      />

      {/* Overlay mobile */}
      {menuOpen && (
        <div
          ref={overlayRef}
          className={styles.overlay}
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Drawer mobile */}
      <div
        ref={drawerRef}
        id="mobile-drawer"
        className={[styles.drawer, menuOpen ? styles.drawerVisible : ""].join(" ")}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        inert={!menuOpen ? true : undefined}
      >
        <div className={styles.drawerInner}>

          <div className={styles.drawerHeader}>
            <span className={styles.drawerLogo}>EM</span>
            <button
              className={styles.drawerClose}
              onClick={closeMenu}
              aria-label="Cerrar menú"
            >
              ✕
            </button>
          </div>

          <ul className={styles.drawerLinks} role="list">
            {NAV_LINKS.map(({ href, label, num }) => (
              <li key={href}>
                <a
                  href={href}
                  className={styles.drawerLink}
                  onClick={(e) => handleNavLink(e, href)}
                >
                  <span className={styles.drawerNum}>{num}</span>
                  <span className={styles.drawerLabel}>{label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.drawerFooter}>
            <a href="mailto:elian.mejiag@gmail.com" className={styles.drawerCta}>
              elian.mejiag@gmail.com ↗
            </a>
          </div>

        </div>
      </div>
    </>
  );
}