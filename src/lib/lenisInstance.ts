/*
  lenisInstance.ts
  Singleton que guarda la instancia de Lenis una vez inicializada.

  Por qué no context:
  · Navbar vive fuera de ClientProviders en el árbol del DOM.
  · Un módulo singleton evita reestructurar el layout y funciona
    en cualquier Client Component sin importar su posición.

  Uso:
  · SmoothScrollProvider llama setLenisInstance(lenis) al crear Lenis.
  · Cualquier componente importa scrollToTarget() y lo llama directamente.
*/

import type Lenis from "lenis";

let instance: Lenis | null = null;

export function setLenisInstance(lenis: Lenis): void {
  instance = lenis;
}

export function getLenisInstance(): Lenis | null {
  return instance;
}

/*
  scrollToTarget — wrapper principal.

  target: selector CSS ("#about"), elemento DOM, o número (posición Y).
  duration: segundos. Por defecto 1.1 — suave, pero más ágil.
  easing: función personalizable. Por defecto ease-in-out suave.
*/
export function scrollToTarget(
  target: string | HTMLElement | number,
  options: {
    duration?: number;
    easing?:  (t: number) => number;
    offset?:  number;
  } = {}
): void {
  if (!instance) {
    // Fallback: scroll nativo suave si Lenis no está listo
    if (typeof target === "string") {
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
    }
    return;
  }

  instance.scrollTo(target, {
    duration: options.duration ?? 1.1,
    easing:   options.easing  ?? ((t) => t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2
    ),
    offset:   options.offset  ?? 0,
  });
}