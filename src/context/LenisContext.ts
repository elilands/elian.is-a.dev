/*
  LenisContext — Expone la instancia de Lenis a cualquier componente.
  Permite scroll programático: lenis?.scrollTo('#contact', { duration: 2 })
*/

import { createContext, useContext } from "react";
import type Lenis from "lenis";

export const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}