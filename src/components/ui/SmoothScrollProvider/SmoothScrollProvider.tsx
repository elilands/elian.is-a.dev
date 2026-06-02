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
import { usePreloaderComplete } from "@/context/PreloaderContext";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const { isComplete } = usePreloaderComplete();

  useEffect(() => {
    if (!isComplete) return; // wait until preloader finished

    // detect low-perf devices (best-effort)
    let lowPerfLocal = false;
    try {
      const mem = (navigator as any).deviceMemory;
      const hw = (navigator as any).hardwareConcurrency;
      const conn = (navigator as any).connection;
      const saveData = conn && conn.saveData;
      if ((mem && mem <= 2) || (hw && hw <= 2) || saveData) lowPerfLocal = true;
    } catch {}

    const instance = new Lenis({
      // Make the scroll very soft on capable devices
      lerp: lowPerfLocal ? 0.06 : 0.03,
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: lowPerfLocal ? 1.0 : 1.6,
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
  }, [isComplete]);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}