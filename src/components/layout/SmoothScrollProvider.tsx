/*
  SmoothScrollProvider.tsx — Client Component.

  · Inicializa Lenis con GSAP ticker para sincronización perfecta.
  · Registra la instancia en el singleton (lenisInstance.ts).
  · Expone ScrollTrigger.refresh() cuando Lenis termina de calcular.
  · dynamic({ ssr: false }) en ClientProviders — aquí no hace falta.
*/

"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenisInstance } from "@/lib/lenisInstance";

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export default function SmoothScrollProvider({
  children,
}: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    /*
      Lenis config:
      · duration: 1.05 — suave, pero más rápido al cambiar de sección
      · easing: ease-in-out cúbico — idéntico al que usamos en GSAP
      · orientation: vertical (default)
      · smoothWheel: true
      · syncTouch: false — en mobile usamos el scroll nativo de iOS/Android,
        más rápido y con mejor inercia táctil
    */
    const lenis = new Lenis({
      duration:    1.05,
      easing:      (t) => t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2,
      orientation:  "vertical",
      smoothWheel:  true,
      syncTouch:    false,
      touchMultiplier: 2.0,
    });

    lenisRef.current = lenis;

    // Registrar en el singleton — Navbar y cualquier otro componente
    // pueden llamar scrollToTarget() sin necesitar contexto.
    setLenisInstance(lenis);

    /*
      GSAP ticker: Lenis usa requestAnimationFrame interno,
      pero si también usamos GSAP ticker evitamos frames dobles.
      La forma correcta: conectar Lenis al ticker de GSAP.
    */
    const rafHandler = (time: number) => {
      lenis.raf(time * 1000); // GSAP pasa segundos, Lenis espera ms
    };

    gsap.ticker.add(rafHandler);
    gsap.ticker.lagSmoothing(0); // evita saltos tras pestañas inactivas

    /*
      ScrollTrigger: necesita saber cuándo Lenis scrollea
      para recalcular el progreso.
    */
    lenis.on("scroll", ScrollTrigger.update);

    /*
      Refresh inicial: después de que Lenis calculó el tamaño real
      de la página, refrescamos ScrollTrigger para que los
      triggers estén en posiciones correctas.
    */
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(refreshTimeout);
      gsap.ticker.remove(rafHandler);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}