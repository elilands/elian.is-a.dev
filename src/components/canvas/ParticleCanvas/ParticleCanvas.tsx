"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import styles from "./ParticleCanvas.module.css";

interface Particle {
  x:       number;
  y:       number;
  vx:      number;
  vy:      number;
  size:    number;
  len:     number;
  angle:   number;
  opacity: number;
  opBase:  number;
  opPhase: number;
  color:   string;
}

const COLORS_LIGHT = [
  "201, 184, 232",
  "168, 196, 216",
  "232, 213, 163",
  "255, 251, 240",
  "232, 196, 176",
];

const COLORS_DARK = [
  "220, 205, 248",  // lavender claro — visible en oscuro
  "185, 210, 232",  // glacier claro
  "248, 230, 180",  // gold claro
  "255, 255, 255",  // blanco puro
  "240, 215, 200",  // rose-gold claro
];

function createParticle(
  W: number,
  H: number,
  offscreen = false,
  dark = false
): Particle {
  const colors = dark ? COLORS_DARK : COLORS_LIGHT;
  return {
    x:       Math.random() * W,
    y:       offscreen ? H + 20 : Math.random() * H,
    vx:      (Math.random() - 0.5) * 0.22,
    vy:      -(0.18 + Math.random() * 0.28),
    size:    1.2 + Math.random() * 1.8,
    len:     5   + Math.random() * 12,
    angle:   Math.random() * Math.PI,
    opacity: 0,
    opBase:  dark
      ? 0.32 + Math.random() * 0.44   // más visibles en oscuro
      : 0.16 + Math.random() * 0.28,
    opPhase: Math.random() * Math.PI * 2,
    color:   colors[Math.floor(Math.random() * colors.length)],
  };
}

function drawParticle(ctx: CanvasRenderingContext2D, p: Particle) {
  ctx.save();
  ctx.globalAlpha = p.opacity;
  ctx.translate(p.x, p.y);
  ctx.rotate(p.angle);

  const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.len);
  grad.addColorStop(0,    `rgba(${p.color}, 0.95)`);
  grad.addColorStop(0.45, `rgba(${p.color}, 0.50)`);
  grad.addColorStop(1,    `rgba(${p.color}, 0)`);

  ctx.beginPath();
  ctx.ellipse(0, 0, p.len, p.size, 0, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();

  ctx.restore();
}

interface ParticleCanvasProps {
  className?: string;
  dark?: boolean;
}

export default function ParticleCanvas({ className, dark = false }: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef({ x: -999, y: -999 });
  const rafRef    = useRef<number>(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect   = canvas.parentElement?.getBoundingClientRect();
      canvas.width  = rect?.width  ?? window.innerWidth;
      canvas.height = rect?.height ?? window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const count     = window.innerWidth < 768 ? 16 : 42;
    const particles = Array.from({ length: count }, () =>
      createParticle(canvas.width, canvas.height, false, dark)
    );

    let frame = 0;
    const REPEL = 100;

    const animate = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      frame++;

      particles.forEach((p) => {
        p.opacity = p.opBase * (0.55 + 0.45 * Math.sin(frame * 0.018 + p.opPhase));

        const dx   = p.x - mouseRef.current.x;
        const dy   = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL && dist > 0) {
          const force = ((REPEL - dist) / REPEL) * 0.18;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        p.vx *= 0.980;
        p.vy *= 0.985;
        p.angle += 0.002 * (p.vx > 0 ? 1 : -1);
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < -20) Object.assign(p, createParticle(W, H, true, dark));
        if (p.x < -30) p.x = W + 20;
        if (p.x > W + 30) p.x = -20;

        drawParticle(ctx, p);
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [reducedMotion, dark]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`${styles.canvas} ${className ?? ""}`}
      aria-hidden="true"
    />
  );
}