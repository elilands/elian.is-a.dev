"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { PreloaderProvider } from "@/context/PreloaderContext";
import Navbar from "@/components/layout/Navbar/Navbar";

const SmoothScrollProvider = dynamic(
  () => import("@/components/ui/SmoothScrollProvider/SmoothScrollProvider"),
  { ssr: false }
);

const CustomCursor = dynamic(
  () => import("@/components/ui/CustomCursor/CustomCursor"),
  { ssr: false }
);

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    // PreloaderProvider envuelve todo — cualquier componente puede leer isComplete
    <PreloaderProvider>
      <SmoothScrollProvider>
        <Navbar />
        {children}
        <CustomCursor />
      </SmoothScrollProvider>
    </PreloaderProvider>
  );
}