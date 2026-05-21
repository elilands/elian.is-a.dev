/*
  Preloader — versión final con PreloaderContext integrado.

  Cuando la secuencia termina (o el usuario hace skip), llama a setComplete()
  del contexto antes de desmontarse. El Hero escucha isComplete para
  arrancar su timeline de entrada.
  
  Ahora con progreso de carga real: después de que cae la pluma,
  muestra un porcentaje actual basado en recursos cargados.
*/

"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { usePreloaderComplete } from "@/context/PreloaderContext";
import styles from "./Preloader.module.css";

/* ── Tipos ────────────────────────────────────────────────────────────── */

type Phase = "falling" | "impact" | "loading" | "fadeout" | "done";

interface CloudPuff {
  x:       number;
  y:       number;
  rx:      number;
  ry:      number;
  vx:      number;
  vy:      number;
  opacity: number;
  blur:    number;
  growX:   number;
  growY:   number;
}

/* ── Constantes ───────────────────────────────────────────────────────── */

const FALL_DURATION  = 5000;
const IMPACT_Y_RATIO = 0.82;
const START_Y_RATIO  = 0.12;
const DRIFT_AMP      = 65;
const DRIFT_CYCLES   = 2.2;
const IMG_W          = 1312;
const IMG_H          = 3264;
// const PROGRESS_DURATION = 1200; // Duración mínima de la fase de carga (unused)

/* ── Helpers ──────────────────────────────────────────────────────────── */

function getFeatherSize(canvasWidth: number) {
  const targetW = Math.min(canvasWidth * 0.50, 680);
  const scale   = targetW / IMG_H;
  return { drawW: IMG_W * scale, drawH: IMG_H * scale };
}

function easeFeatherFall(t: number): number {
  if (t < 0.08) return (t / 0.08) * (t / 0.08) * 0.08;
  if (t > 0.88) {
    const u = (t - 0.88) / 0.12;
    return 0.88 + u * 0.12 * (2 - u);
  }
  return t;
}

/* ── Nubes base ───────────────────────────────────────────────────────── */

function drawCloudBase() {
  // Removed cloud glow/effect — draw nothing here to avoid any bottom glow
}

/* ── Puffs de impacto ─────────────────────────────────────────────────── */

function spawnCloudPuffs(puffs: CloudPuff[], cx: number, cy: number) {
  const config = [
    { vx: -3.0, vy: -0.5, rx: 55, ry: 28, blur: 12, opacity: 0.88, growX: 1.2, growY: 0.65, delay: 0   },
    { vx:  3.0, vy: -0.5, rx: 55, ry: 28, blur: 12, opacity: 0.88, growX: 1.2, growY: 0.65, delay: 0   },
    { vx: -4.2, vy: -0.2, rx: 40, ry: 20, blur: 10, opacity: 0.80, growX: 0.9, growY: 0.50, delay: 80  },
    { vx:  4.2, vy: -0.2, rx: 40, ry: 20, blur: 10, opacity: 0.80, growX: 0.9, growY: 0.50, delay: 80  },
    { vx: -2.0, vy: -0.8, rx: 35, ry: 22, blur: 14, opacity: 0.72, growX: 0.8, growY: 0.55, delay: 160 },
    { vx:  2.0, vy: -0.8, rx: 35, ry: 22, blur: 14, opacity: 0.72, growX: 0.8, growY: 0.55, delay: 160 },
    { vx: -0.4, vy: -2.0, rx: 48, ry: 30, blur: 16, opacity: 0.85, growX: 0.6, growY: 0.70, delay: 40  },
    { vx:  0.4, vy: -2.0, rx: 48, ry: 30, blur: 16, opacity: 0.85, growX: 0.6, growY: 0.70, delay: 40  },
    { vx:  0.0, vy: -2.6, rx: 38, ry: 24, blur: 18, opacity: 0.78, growX: 0.5, growY: 0.60, delay: 120 },
  ];

  config.forEach(({ vx, vy, rx, ry, blur, opacity, growX, growY, delay }) => {
    setTimeout(() => {
      const jx = (Math.random() - 0.5) * 60;
      const jy = (Math.random() - 0.5) * 20;
      puffs.push({ x: cx + jx, y: cy + jy, rx, ry, vx, vy, opacity, blur, growX, growY });
    }, delay);
  });
}

function updateAndDrawCloudPuffs(ctx: CanvasRenderingContext2D, puffs: CloudPuff[]) {
  for (let i = puffs.length - 1; i >= 0; i--) {
    const p = puffs[i];
    ctx.save();
    ctx.filter      = `blur(${Math.round(p.blur)}px)`;
    ctx.globalAlpha = Math.max(0, p.opacity);

    ctx.beginPath();
    ctx.ellipse(p.x, p.y, Math.max(1, p.rx), Math.max(1, p.ry), 0, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(248, 244, 255, 1)";
    ctx.fill();

    if (p.vy < -1.5) {
      ctx.beginPath();
      ctx.ellipse(p.x, p.y, Math.max(1, p.rx * 0.6), Math.max(1, p.ry * 0.6), 0, 0, Math.PI * 2);
      // Mantener puffs en tonos neutros — no glow/color específico
      ctx.fillStyle = "rgba(248, 244, 255, 0.85)";
      ctx.fill();
    }

    ctx.restore();

    p.x       += p.vx;
    p.y       += p.vy;
    p.rx      += p.growX;
    p.ry      += p.growY;
    p.blur    += 0.25;
    p.opacity -= 0.0018;

    if (p.opacity <= 0) puffs.splice(i, 1);
  }
}

/* ── Pluma PNG ────────────────────────────────────────────────────────── */

/* ── Resplandor sutil de la pluma (solo aquí) ───────────────────────── */
function drawFeatherGlow(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number,
  drawW: number, drawH: number,
  rockAngle: number, opacity: number
) {
  // Resplandor muy sutil: gradiente radial y blur que no afecta otros elementos
  if (opacity <= 0.02) return;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(Math.PI / 2 + rockAngle);

  const glowRadius = Math.max(drawW, drawH) * 0.55;
  const grad = ctx.createRadialGradient(0, 0, glowRadius * 0.12, 0, 0, glowRadius);
  grad.addColorStop(0.0, `rgba(240, 237, 232, ${Math.min(0.6, opacity * 0.6)})`);
  grad.addColorStop(0.36, `rgba(240, 237, 232, ${Math.min(0.28, opacity * 0.28)})`);
  grad.addColorStop(1.0, `rgba(240, 237, 232, 0)`);

  ctx.filter = "blur(18px)";
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.ellipse(0, 0, glowRadius, glowRadius * 0.62, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawFeatherImage(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cx: number, cy: number,
  drawW: number, drawH: number,
  rockAngle: number, opacity: number
) {
  ctx.save();
  ctx.globalAlpha = Math.max(0, Math.min(1, opacity));
  ctx.translate(cx, cy);
  ctx.rotate(Math.PI / 2 + rockAngle);
  ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
  ctx.restore();
}

/* ── Componente ───────────────────────────────────────────────────────── */

export default function Preloader() {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const imgRef      = useRef<HTMLImageElement | null>(null);
  const imgReadyRef = useRef(false);
  const puffsRef    = useRef<CloudPuff[]>([]);
  const rafRef      = useRef<number>(0);
  const pageReadyRef = useRef(false);
  const phaseRef    = useRef<Phase>("falling");
  const finishRequestedRef = useRef(false);
  const cycleIndexRef = useRef(-1);

  const [phase, setPhase] = useState<Phase>("falling");
  const [displayProgress, setDisplayProgress] = useState(0);
  const reducedMotion     = useReducedMotion();
  const { setComplete }   = usePreloaderComplete();

  /* ── Calcular progreso real de carga ───────────────────── */
  
  const getLoadProgress = () => {
    if (pageReadyRef.current) return 100;
    
    const readyState = document.readyState;
    if (readyState === "complete") {
      pageReadyRef.current = true;
      return 100;
    }
    
    let baseProgress = readyState === "interactive" ? 65 : 10;
    
    if ("PerformanceResourceTiming" in window) {
      try {
        const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
        const processed = Math.min(resources.length * 1.6, 24);
        baseProgress += processed;
      } catch {
        // Ignorar errores
      }
    }
    
    return Math.min(Math.max(baseProgress, 0), 99);
  };

  /* ── Función de finalización ────────────────────────────────
     Centraliza el disparo del contexto + el desmonte.
     Se llama tanto desde skip() como cuando se completa la carga.
     ─────────────────────────────────────────────────────────── */
  const finish = () => {
    if (finishRequestedRef.current) return;
    finishRequestedRef.current = true;
    setPhase("fadeout");
    setTimeout(() => {
      setComplete();
      setPhase("done");
    }, 1200);
  };

  /* ── Skip ─────────────────────────────────────────────────── */

  const skip = () => {
    cancelAnimationFrame(rafRef.current);
    setComplete();
    setPhase("done");
  };

  /* ── Reduced motion: salta inmediatamente ─────────────────── */

  useEffect(() => {
    if (reducedMotion) {
      // defer state changes to avoid synchronous setState within effect
      Promise.resolve().then(() => {
        setComplete();
        setPhase("done");
      });
    }
  }, [reducedMotion, setComplete]);

  /* ── Scroll lock ──────────────────────────────────────────── */

  useEffect(() => {
    document.documentElement.style.overflow = phase !== "done" ? "hidden" : "";
    phaseRef.current = phase;
    return () => { document.documentElement.style.overflow = ""; };
  }, [phase]);

  /* ── Carga del PNG ────────────────────────────────────────── */

  useEffect(() => {
    if (reducedMotion) return;
    const img  = new Image();
    img.src    = "/textures/feather-preloader.png";
    img.onload = () => { imgRef.current = img; imgReadyRef.current = true; };
  }, [reducedMotion]);

  /* ── Listener de carga de documento ───────────────────── */
  
  useEffect(() => {
    const handleLoad = () => {
      pageReadyRef.current = true;
    };
    
    window.addEventListener("load", handleLoad);
    
    if (document.readyState === "complete") {
      pageReadyRef.current = true;
    }
    
    return () => window.removeEventListener("load", handleLoad);
  }, []);

  /* ── Loop de animación ────────────────────────────────────── */

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;

      const elapsed  = timestamp - startTime;
      const cycleIndex = Math.floor(elapsed / FALL_DURATION);
      const loopElapsed = elapsed % FALL_DURATION;
      const progress = Math.min(loopElapsed / FALL_DURATION, 1);
      const eased    = easeFeatherFall(progress);

      const W       = canvas.width;
      const H       = canvas.height;
      const cx      = W / 2;
      const impactY = H * IMPACT_Y_RATIO;
      const currentLoadProgress = Math.round(getLoadProgress());

      if (currentLoadProgress !== displayProgress) {
        setDisplayProgress(currentLoadProgress);
      }

      if (cycleIndex !== cycleIndexRef.current) {
        cycleIndexRef.current = cycleIndex;
        if (!finishRequestedRef.current) {
          spawnCloudPuffs(puffsRef.current, cx, impactY);
          setPhase("impact");
        }
      }

      ctx.clearRect(0, 0, W, H);

      /* Nubes base — solo durante caída e impacto */
      if (phaseRef.current !== "loading" && phaseRef.current !== "fadeout") {
        const cloudAlpha = Math.min(Math.max(progress - 0.10, 0) / 0.50, 1);
        if (cloudAlpha > 0) {
          drawCloudBase();
        }
      }

      /* Pluma */
      if (progress < 1 && imgReadyRef.current && imgRef.current) {
        const { drawW, drawH } = getFeatherSize(W);

        const startCY  = H * START_Y_RATIO;
        const targetCY = impactY - drawW * 0.5;
        const featherY = startCY + eased * (targetCY - startCY);

        const damping   = progress < 0.80 ? 1 : 1 - ((progress - 0.80) / 0.20) * 0.7;
        const driftX    = Math.sin(progress * Math.PI * DRIFT_CYCLES) * DRIFT_AMP * damping;
        const featherX  = cx + driftX;

        const driftVel  = Math.cos(progress * Math.PI * DRIFT_CYCLES) * DRIFT_CYCLES * Math.PI * damping;
        const rockAngle = (driftVel / (DRIFT_CYCLES * Math.PI)) * 0.13;

        const fadeIn    = Math.min(progress / 0.05, 1);
        const cloudFade = progress > 0.82 ? 1 - ((progress - 0.82) / 0.18) * 0.70 : 1;
        const opacity   = fadeIn * cloudFade;

        // Dibujar resplandor SÓLO alrededor de la pluma, luego la pluma
        drawFeatherGlow(ctx, featherX, featherY, drawW, drawH, rockAngle, opacity);
        drawFeatherImage(ctx, imgRef.current, featherX, featherY, drawW, drawH, rockAngle, opacity);
      }

      /* Puffs */
      if (puffsRef.current.length > 0) {
        updateAndDrawCloudPuffs(ctx, puffsRef.current);
      }

      /* Fase de carga: terminar cuando realmente llega al final */
      if (currentLoadProgress === 100) {
        finish();
      }

      const active = progress < 1 || puffsRef.current.length > 0 || phaseRef.current === "loading";
      if (active) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [reducedMotion]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Render ───────────────────────────────────────────────── */

  if (phase === "done") return null;

  return (
    <div
      className={`${styles.preloader} ${phase === "fadeout" ? styles.fadeout : ""}`}
      onClick={skip}
      role="status"
      aria-label="Loading"
    >
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />

      <div className={styles.progress} aria-hidden="true">
        <span className={styles.progressValue}>{Math.round(displayProgress)}%</span>
      </div>

      <button
        className={styles.skip}
        onClick={(e) => { e.stopPropagation(); skip(); }}
        aria-label="Skip intro"
      >
        skip
      </button>
    </div>
  );
}