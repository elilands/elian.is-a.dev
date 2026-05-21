/*
  CustomCursor — Cursor personalizado en dos capas:

  · inner: punto sólido que sigue el mouse sin lag (instantáneo)
  · outer: orbe difuminado que sigue con lerp (lag intencional)

  En hover de links/buttons: outer se expande con glow etéreo.
  En touch devices (hover: none): el componente no se monta.
  MutationObserver: re-enlaza listeners cuando el DOM cambia.

  CRÍTICO: "use client" obligatorio. No hay lógica de servidor aquí.
  Sin acceso a window/document fuera de useEffect.
*/

"use client";

import { useEffect, useRef } from "react";
import styles from "./CustomCursor.module.css";

export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  // Refs en lugar de state para evitar re-renders en el RAF loop
  const mouseRef  = useRef({ x: -300, y: -300 });
  const outerRef2 = useRef({ x: -300, y: -300 }); // posición lerpeada
  const rafRef    = useRef<number>(0);
  const visibleRef = useRef(false);

  useEffect(() => {
    // No mostrar en dispositivos táctiles
    if (window.matchMedia("(hover: none)").matches) return;

    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    /* ── Movimiento ──────────────────────────────────────────── */

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      // Aparece suavemente en el primer movimiento
      if (!visibleRef.current) {
        visibleRef.current = true;
        outer.style.opacity = "1";
        inner.style.opacity = "1";
      }
    };

    /* ── Hover en elementos interactivos ─────────────────────── */

    const onEnter = () => outer.classList.add(styles.outerHover);
    const onLeave = () => outer.classList.remove(styles.outerHover);

    const bindInteractives = () => {
      document
        .querySelectorAll<HTMLElement>("a, button, [data-cursor-hover]")
        .forEach((el) => {
          // Evitar duplicados
          el.removeEventListener("mouseenter", onEnter);
          el.removeEventListener("mouseleave", onLeave);
          el.addEventListener("mouseenter", onEnter);
          el.addEventListener("mouseleave", onLeave);
        });
    };

    bindInteractives();

    // Re-enlazar cuando el DOM cambie (secciones lazy-loaded, etc.)
    const observer = new MutationObserver(bindInteractives);
    observer.observe(document.body, { childList: true, subtree: true });

    /* ── RAF loop ────────────────────────────────────────────── */

    const tick = () => {
      const { x: mx, y: my } = mouseRef.current;
      let   { x: ox, y: oy } = outerRef2.current;

      // Inner: posición exacta, sin lag
      inner.style.transform = `translate(${mx}px, ${my}px)`;

      // Outer: lerp hacia el mouse (0.11 ≈ 60fps smooth lag)
      ox += (mx - ox) * 0.11;
      oy += (my - oy) * 0.11;
      outerRef2.current = { x: ox, y: oy };
      outer.style.transform = `translate(${ox}px, ${oy}px)`;

      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={outerRef} className={styles.outer} aria-hidden="true" />
      <div ref={innerRef} className={styles.inner} aria-hidden="true" />
    </>
  );
}