/*
  SmoothScrollProvider — Inicializa Lenis y lo sincroniza con GSAP.

  Patrón correcto según la documentación de Lenis + GSAP:
  - gsap.ticker.add() para el RAF loop (no requestAnimationFrame manual)
  - lenis.on("scroll", ScrollTrigger.update) para sincronía exacta
  - gsap.ticker.lagSmoothing(0) para evitar saltos en tabs en segundo plano

  Expone la instancia via LenisContext para scroll programático externo.
*/

"use client";

import { useEffect, useState, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { LenisContext } from "@/context/LenisContext";
import { setLenisInstance } from "@/lib/lenisInstance";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const instance = new Lenis({
      /*
        lerp 0.06: deliberadamente lento, como flotar.
        El rango 0.04–0.07 es el especificado en el brief.
        Más bajo = más suave pero más laggy; encontrar el punto
        con el diseño final y ajustar aquí.
      */
      lerp: 0.06,
      smoothWheel: true,
      /*
        syncTouch: false — el tacto usa scroll nativo.
        true haría el touch tan lento como el wheel, lo cual en mobile
        se siente antinatural. Se mantiene falso por UX.
      */
      syncTouch: false,
      touchMultiplier: 1.2,
    });

    // Sincronizar ScrollTrigger con cada tick de Lenis
    instance.on("scroll", ScrollTrigger.update);

    // GSAP ticker como fuente de verdad para el RAF loop
    const update = (time: number) => {
      instance.raf(time * 1000);
    };

    gsap.ticker.add(update);
    // Previene saltos de animación cuando el tab vuelve al foco
    gsap.ticker.lagSmoothing(0);

    // Registrar la instancia en el singleton para uso en componentes
    setLenisInstance(instance);

    // Defer setState slightly to avoid triggering synchronous setState inside effect
    Promise.resolve().then(() => setLenis(instance));

    return () => {
      gsap.ticker.remove(update);
      instance.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}