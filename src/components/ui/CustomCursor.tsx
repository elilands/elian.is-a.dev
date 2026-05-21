'use client';

import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  // particlesRef removed — not used

  useEffect(() => {
    // Respeta prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Si el usuario prefiere movimiento reducido, usa el cursor nativo
      if (containerRef.current) {
        containerRef.current.style.display = 'none';
      }
      document.body.style.cursor = 'auto';
      return;
    }

    const container = containerRef.current;
    const main = mainRef.current;
    const core = coreRef.current;
    const ring = ringRef.current;
    const trail = trailRef.current;
    const outer = outerRef.current;
    if (!container || !main || !core || !ring || !trail || !outer) return;

    let mouseX = 0;
    let mouseY = 0;
    let trailX = 0;
    let trailY = 0;
    let outerX = 0;
    let outerY = 0;
    let velocityX = 0;
    let velocityY = 0;
    let scale = 1;
    let isMoving = false;

    const onMove = (e: MouseEvent) => {
      isMoving = true;
      velocityX = e.clientX - mouseX;
      velocityY = e.clientY - mouseY;
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Main cursor sigue instantáneamente
      main.style.left = mouseX + 'px';
      main.style.top = mouseY + 'px';

      // Core sigue con poca lag
      core.style.left = mouseX + 'px';
      core.style.top = mouseY + 'px';

      // Ring with rotation based on movement
      const angle = Math.atan2(velocityY, velocityX);
      ring.style.left = mouseX + 'px';
      ring.style.top = mouseY + 'px';
      ring.style.transform = `translate(-50%, -50%) rotate(${angle}rad)`;
    };

    const onMouseEnter = () => {
      if (container) container.style.opacity = '1';
    };

    const onMouseLeave = () => {
      if (container) container.style.opacity = '0';
      isMoving = false;
    };

    // Trail & outer animation loop
    const animationLoop = () => {
      trailX += (mouseX - trailX) * 0.14;
      trailY += (mouseY - trailY) * 0.14;
      outerX += (mouseX - outerX) * 0.06;
      outerY += (mouseY - outerY) * 0.06;

      trail.style.left = trailX + 'px';
      trail.style.top = trailY + 'px';
      outer.style.left = outerX + 'px';
      outer.style.top = outerY + 'px';

      // Velocidad para escala dinámica
      const speed = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
      scale = 1 + Math.min(speed / 50, 0.4);
      main.style.transform = `translate(-50%, -50%) scale(${scale})`;

      // Fade velocity
      velocityX *= 0.92;
      velocityY *= 0.92;

      requestAnimationFrame(animationLoop);
    };

    const frameId = requestAnimationFrame(animationLoop);
    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        pointerEvents: 'none',
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        opacity: 0,
        transition: 'opacity 0.3s ease-out',
      }}
      aria-hidden="true"
    >
      {/* Outer massive aura — presencia envolvente */}
      <div
        ref={outerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 300,
          height: 300,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9996,
          background: `
            radial-gradient(circle at 50% 50%,
              rgba(232,196,176,0.15) 0%,
              rgba(201,184,232,0.1) 25%,
              rgba(168,196,216,0.08) 50%,
              transparent 100%
            )
          `,
          filter: 'blur(60px)',
          opacity: 0.6,
          animation: 'cursor-outer-breathe 4s cubic-bezier(0.4, 0.0, 0.2, 1) infinite',
        }}
      />

      {/* Trail glow — lag trail muy visible */}
      <div
        ref={trailRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 140,
          height: 140,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9998,
          background: `
            radial-gradient(circle at 45% 45%,
              rgba(201,184,232,0.75) 0%,
              rgba(168,196,216,0.45) 20%,
              rgba(232,213,163,0.25) 40%,
              rgba(232,196,176,0.1) 60%,
              transparent 85%
            )
          `,
          filter: 'blur(24px)',
          opacity: 0.75,
          animation: 'cursor-trail-glow 1.8s ease-in-out infinite',
        }}
      />

      {/* Ring/Orbit — elemental visual structure */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 60,
          height: 60,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9999,
          border: '2px solid rgba(201,184,232,0.4)',
          borderRadius: '50%',
          boxShadow: `
            inset 0 0 20px rgba(201,184,232,0.3),
            0 0 30px rgba(201,184,232,0.2),
            0 0 60px rgba(168,196,216,0.15)
          `,
          animation: 'cursor-ring-rotate 8s linear infinite',
        }}
      />

      {/* Core luminoso — corazón del cursor */}
      <div
        ref={coreRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9999,
          background: `
            radial-gradient(circle at 40% 40%,
              rgba(255,251,240,1) 0%,
              rgba(232,213,163,0.8) 25%,
              rgba(201,184,232,0.6) 50%,
              transparent 100%
            )
          `,
          filter: 'blur(2px)',
          opacity: 0.95,
          boxShadow: `
            0 0 12px rgba(255,251,240,0.9),
            0 0 24px rgba(201,184,232,0.6),
            0 0 36px rgba(168,196,216,0.4),
            0 0 48px rgba(232,213,163,0.2),
            inset 0 0 12px rgba(255,251,240,0.5)
          `,
          animation: 'cursor-core-breathe 2.5s cubic-bezier(0.4, 0.0, 0.2, 1) infinite',
        }}
      />

      {/* Main cursor — sigue velocidad, escala dinámica */}
      <div
        ref={mainRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 24,
          height: 24,
          transform: 'translate(-50%, -50%) scale(1)',
          pointerEvents: 'none',
          zIndex: 10000,
          background: `
            radial-gradient(circle at 35% 35%,
              rgba(232,213,163,0.95) 0%,
              rgba(201,184,232,0.85) 30%,
              rgba(168,196,216,0.5) 60%,
              transparent 100%
            )
          `,
          filter: 'blur(4px)',
          opacity: 1,
          willChange: 'transform, opacity',
          boxShadow: `
            0 0 8px rgba(255,251,240,1),
            0 0 16px rgba(201,184,232,0.8),
            0 0 24px rgba(232,213,163,0.6),
            0 0 32px rgba(168,196,216,0.4),
            inset 0 0 6px rgba(255,251,240,0.6)
          `,
        }}
      />

      <style>{`
        @keyframes cursor-outer-breathe {
          0%, 100% {
            opacity: 0.5;
            filter: blur(50px) brightness(0.95);
          }
          25% {
            opacity: 0.75;
            filter: blur(65px) brightness(1.05);
          }
          50% {
            opacity: 0.6;
            filter: blur(55px) brightness(1);
          }
          75% {
            opacity: 0.7;
            filter: blur(60px) brightness(1.02);
          }
        }

        @keyframes cursor-trail-glow {
          0%, 100% {
            opacity: 0.6;
            filter: blur(20px);
          }
          50% {
            opacity: 0.9;
            filter: blur(30px);
          }
        }

        @keyframes cursor-ring-rotate {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        @keyframes cursor-core-breathe {
          0%, 100% {
            opacity: 0.9;
            filter: blur(2px) brightness(1);
            box-shadow: 
              0 0 12px rgba(255,251,240,0.9),
              0 0 24px rgba(201,184,232,0.6),
              0 0 36px rgba(168,196,216,0.4),
              0 0 48px rgba(232,213,163,0.2),
              inset 0 0 12px rgba(255,251,240,0.5);
          }
          50% {
            opacity: 1;
            filter: blur(3px) brightness(1.15);
            box-shadow: 
              0 0 16px rgba(255,251,240,1),
              0 0 32px rgba(201,184,232,0.8),
              0 0 48px rgba(168,196,216,0.6),
              0 0 64px rgba(232,213,163,0.3),
              inset 0 0 16px rgba(255,251,240,0.7);
          }
        }
      `}</style>
    </div>
  );
}
