/*
  PreloaderContext — comunica el fin del preloader al resto del sitio.

  El Hero escucha isComplete para arrancar su timeline de entrada.
  Así la animación del hero no empieza mientras el preloader está activo,
  y tampoco tiene que asumir un delay fijo.
*/

"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface PreloaderContextValue {
  isComplete: boolean;
  setComplete: () => void;
}

const PreloaderContext = createContext<PreloaderContextValue>({
  isComplete:  false,
  setComplete: () => {},
});

export function PreloaderProvider({ children }: { children: ReactNode }) {
  const [isComplete, setIsComplete] = useState(false);

  return (
    <PreloaderContext.Provider
      value={{ isComplete, setComplete: () => setIsComplete(true) }}
    >
      {children}
    </PreloaderContext.Provider>
  );
}

export function usePreloaderComplete() {
  return useContext(PreloaderContext);
}