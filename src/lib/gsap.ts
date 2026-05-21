/*
  lib/gsap.ts — Registro centralizado de plugins GSAP.

  Importar GSAP y sus plugins SIEMPRE desde aquí, nunca directamente
  desde "gsap" en los componentes. Esto garantiza que los plugins
  se registren una sola vez y solo en el cliente.
*/

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

export { gsap, ScrollTrigger, SplitText };