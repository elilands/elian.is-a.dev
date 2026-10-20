"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { PreloaderProvider } from "@/context/PreloaderContext";
import { LanguageProvider } from "@/context/LanguageContext";
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
    // LanguageProvider y PreloaderProvider envuelven todo
    <LanguageProvider>
      <PreloaderProvider>
        <SmoothScrollProvider>
          <Navbar />
          {children}
          <CustomCursor />
        </SmoothScrollProvider>
      </PreloaderProvider>
    </LanguageProvider>
  );
}