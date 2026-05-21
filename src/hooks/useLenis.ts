"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Inicializa Lenis con lerp deliberadamente bajo (0.055) para esa
 * sensación de flotar, no deslizarse.
 *
 * Integración con GSAP:
 * - gsap.ticker maneja el único RAF del sitio
 * - lenis.on("scroll") mantiene ScrollTrigger sincronizado
 *
 * Llamar una sola vez desde el componente Providers de nivel raíz.
 *
 * Nota: si instalas lenis@2.x el constructor cambia — usa duration en
 * lugar de lerp. Con lenis@1.x (recomendado) funciona tal cual.
 */
export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.055,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 2.0,
    });

    lenisRef.current = lenis;

    // ScrollTrigger se actualiza en cada evento de scroll de Lenis
    lenis.on("scroll", ScrollTrigger.update);

    // Un único RAF para todo el sitio via GSAP ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Sin lag smoothing para mantener sincronía exacta con ScrollTrigger
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
}