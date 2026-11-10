"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./About.module.css";

export default function About() {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!containerRef.current || reducedMotion) return;

    const sections = Array.from(
      containerRef.current.querySelectorAll<HTMLElement>("[data-flow-section]")
    );
    if (sections.length === 0) return;

    const triggers: ScrollTrigger[] = [];

    sections.forEach((section, i) => {
      gsap.set(section, { zIndex: i + 1 });

      const inner = section.querySelector<HTMLElement>(".flow-art-container");
      if (!inner) return;

      if (i > 0) {
        gsap.set(inner, { rotation: 30, transformOrigin: "bottom left" });
        const tween = gsap.to(inner, {
          rotation: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "top 25%",
            scrub: true,
          },
        });
        if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
      }

      if (i < sections.length - 1) {
        triggers.push(
          ScrollTrigger.create({
            trigger: section,
            start: "bottom bottom",
            end: "bottom top",
            pin: true,
            pinSpacing: false,
          })
        );
      }
    });

    ScrollTrigger.refresh();

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [reducedMotion]);

  const isEs = language === "es";

  return (
    <section
      ref={containerRef}
      className={styles.about}
      id="about"
      data-theme="about"
      aria-label={isEs ? "Sobre mí: Filosofía y trayectoria" : "About me: Philosophy and path"}
    >
      {/* ── Sección 1: Construcción Web ─────────────────────────────── */}
      <article
        data-flow-section
        className={styles.flowSectionWrapper}
        aria-label={isEs ? "Desarrollo y soluciones web" : "Web development and solutions"}
        style={{ backgroundColor: "#08070d", color: "#ffffff" }}
      >
        <div
          data-flow-inner
          className={`flow-art-container ${styles.flowInner}`}
          style={{ transformOrigin: "bottom left" }}
        >
          <div className={styles.sectionMetaRow}>
            <span className={styles.sectionIndexLabel}>
              {isEs ? "Desarrollo web" : "Web development"}
            </span>
            <span className={styles.sectionCategoryLabel}>
              {isEs ? "Enfoque & Herramientas" : "Focus & Tooling"}
            </span>
          </div>

          <hr className={styles.flowDivider} />

          <div className={styles.headlineWrap}>
            <h2 className={styles.headline}>
              {isEs ? (
                <>
                  Crear con <br />
                  <span className={styles.headlineItalic}>propósito.</span>
                </>
              ) : (
                <>
                  Built with <br />
                  <span className={styles.headlineItalic}>purpose.</span>
                </>
              )}
            </h2>
          </div>

          <hr className={styles.flowDivider} />

          <div className={styles.contentGrid}>
            <div>
              <p className={styles.leadText}>
                {isEs
                  ? "Desarrollo aplicaciones y plataformas web desde Ciudad de México, buscando siempre que la técnica sirva al usuario y no al revés. Me enfoco en crear arquitecturas ordenadas, estables y preparadas para evolucionar con el tiempo."
                  : "I build web applications and digital platforms from Mexico City, always making sure technology serves people first. I focus on well-structured, resilient architectures built to scale gracefully over time."}
              </p>
              <p className={styles.leadText} style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)", color: "rgba(255, 255, 255, 0.65)" }}>
                {isEs
                  ? "Trabajo con un stack moderno donde cada pantalla se siente rápida y natural, eliminando cualquier capa de complejidad innecesaria."
                  : "Working with modern tooling where every view feels fast and responsive, shedding any unnecessary layers of complexity."}
              </p>

              <div className={styles.specsRow}>
                <span className={styles.specItem}>
                  <span className={styles.specDash}>—</span> Next.js & React
                </span>
                <span className={styles.specItem}>
                  <span className={styles.specDash}>—</span> Tailwind CSS
                </span>
                <span className={styles.specItem}>
                  <span className={styles.specDash}>—</span> TypeScript
                </span>
                <span className={styles.specItem}>
                  <span className={styles.specDash}>—</span> Bases de datos
                </span>
              </div>
            </div>

            <div className={styles.mediaPanel}>
              <Image
                src="/images/flow-systems.jpg"
                alt={isEs ? "Estructura y desarrollo web" : "Web development structure"}
                fill
                sizes="(max-width: 900px) 100vw, 40vw"
                className={styles.mediaImage}
                priority
              />
              <div className={styles.mediaOverlay} />
            </div>
          </div>

          <hr className={styles.flowDivider} />

          <p className={styles.closingQuote}>
            {isEs
              ? "El mejor software es el que se siente simple por fuera, aunque resuelva algo complejo por dentro."
              : "The best software feels effortless on the surface while reliably solving complexity underneath."}
          </p>
        </div>
      </article>

      {/* ── Sección 2: Automatización & Habilidades Blandas ─────────── */}
      <article
        data-flow-section
        className={styles.flowSectionWrapper}
        aria-label={isEs ? "Automatización y trabajo en equipo" : "Automation and team collaboration"}
        style={{ backgroundColor: "#0c0b14", color: "#ffffff" }}
      >
        <div
          data-flow-inner
          className={`flow-art-container ${styles.flowInner}`}
          style={{ transformOrigin: "bottom left" }}
        >
          <div className={styles.sectionMetaRow}>
            <span className={styles.sectionIndexLabel}>
              {isEs ? "Procesos & Aprendizaje" : "Workflows & Learning"}
            </span>
            <span className={styles.sectionCategoryLabel}>
              {isEs ? "Automatización & Personas" : "Automation & Collaboration"}
            </span>
          </div>

          <hr className={styles.flowDivider} />

          <div className={styles.headlineWrap}>
            <h2 className={styles.headline}>
              {isEs ? (
                <>
                  Procesos & <br />
                  <span className={styles.headlineItalic}>personas.</span>
                </>
              ) : (
                <>
                  Process & <br />
                  <span className={styles.headlineItalic}>clarity.</span>
                </>
              )}
            </h2>
          </div>

          <hr className={styles.flowDivider} />

          <div className={styles.contentGrid}>
            <div>
              <p className={styles.leadText}>
                {isEs
                  ? "A lo largo de mi formación me he centrado en la automatización de procesos iterativos: identificar cuellos de botella y tareas repetitivas para sustituirlas por flujos automáticos que le ahorran tiempo y esfuerzo diario al equipo."
                  : "Throughout my learning path I have focused on automating repetitive iterative workflows: detecting bottlenecks and routine tasks to replace them with seamless automated flows that save real team hours."}
              </p>
              <p className={styles.leadText} style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)", color: "rgba(255, 255, 255, 0.65)" }}>
                {isEs
                  ? "Esta experiencia me demostró que optimizar sistemas no es solo código, sino entender cómo interactúan las personas, alinear expectativas y resolver problemas de forma clara y constructiva."
                  : "This demonstrated that optimizing systems is rarely just about code; it requires understanding human interactions, aligning expectations, and resolving challenges constructively."}
              </p>

              <div className={styles.specsRow}>
                <span className={styles.specItem}>
                  <span className={styles.specDash}>—</span> Automatización iterativa
                </span>
                <span className={styles.specItem}>
                  <span className={styles.specDash}>—</span> Optimización de tareas
                </span>
                <span className={styles.specItem}>
                  <span className={styles.specDash}>—</span> Dinámicas colaborativas
                </span>
              </div>
            </div>

            <div className={styles.mediaPanel}>
              <Image
                src="/images/flow-global.jpg"
                alt={isEs ? "Automatización de flujos" : "Process automation"}
                fill
                sizes="(max-width: 900px) 100vw, 40vw"
                className={styles.mediaImage}
              />
              <div className={styles.mediaOverlay} />
            </div>
          </div>

          <hr className={styles.flowDivider} />

          <div className={styles.footerColumns}>
            <div className={styles.footerColumn}>
              <h3 className={styles.columnHeading}>
                {isEs ? "Escucha activa" : "Active listening"}
              </h3>
              <p className={styles.columnBody}>
                {isEs
                  ? "Comprender la necesidad real de los usuarios y del equipo antes de apresurar cualquier respuesta o implementación técnica."
                  : "Understanding the underlying requirements of users and team members before rushing into code."}
              </p>
            </div>
            <div className={styles.footerColumn}>
              <h3 className={styles.columnHeading}>
                {isEs ? "Pensamiento crítico" : "Critical thinking"}
              </h3>
              <p className={styles.columnBody}>
                {isEs
                  ? "Descomponer situaciones confusas en pasos claros y priorizar siempre las soluciones que aportan valor práctico inmediato."
                  : "Breaking down ambiguous scenarios into clear steps, prioritizing solutions with immediate practical value."}
              </p>
            </div>
            <div className={styles.footerColumn}>
              <h3 className={styles.columnHeading}>
                {isEs ? "Adaptabilidad y calma" : "Adaptability & calm"}
              </h3>
              <p className={styles.columnBody}>
                {isEs
                  ? "Mantener la estructura y la comunicación serena ante prioridades cambiantes, cuidando el ritmo y la confianza colectiva."
                  : "Staying composed and structured when priorities shift, preserving team rhythm and mutual trust."}
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* ── Sección 3: Detalle & Ejecución ──────────────────────────── */}
      <article
        data-flow-section
        className={styles.flowSectionWrapper}
        aria-label={isEs ? "Detalle y acabado" : "Craft and execution"}
        style={{ backgroundColor: "#12101c", color: "#ffffff" }}
      >
        <div
          data-flow-inner
          className={`flow-art-container ${styles.flowInner}`}
          style={{ transformOrigin: "bottom left" }}
        >
          <div className={styles.sectionMetaRow}>
            <span className={styles.sectionIndexLabel}>
              {isEs ? "Detalle & Experiencia" : "Detail & Experience"}
            </span>
            <span className={styles.sectionCategoryLabel}>
              {isEs ? "Estilo & Rendimiento" : "Design & Performance"}
            </span>
          </div>

          <hr className={styles.flowDivider} />

          <div className={styles.headlineWrap}>
            <h2 className={styles.headline}>
              {isEs ? (
                <>
                  Cuidado al <br />
                  <span className={styles.headlineItalic}>detalle.</span>
                </>
              ) : (
                <>
                  Eye for <br />
                  <span className={styles.headlineItalic}>detail.</span>
                </>
              )}
            </h2>
          </div>

          <hr className={styles.flowDivider} />

          <div className={styles.contentGrid}>
            <div>
              <p className={styles.leadText}>
                {isEs
                  ? "Le doy mucha importancia a cómo se siente utilizar cada componente. El diseño visual, la tipografía y el ritmo de las transiciones importan tanto como la velocidad de carga."
                  : "I pay close attention to how each component feels in hand. Visual design, typography, and pacing matter just as much as raw performance."}
              </p>
              <p className={styles.leadText} style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)", color: "rgba(255, 255, 255, 0.65)" }}>
                {isEs
                  ? "Con Tailwind CSS y atención al detalle construyo interfaces consistentes, accesibles y con un acabado pulido sin sobrecargar la experiencia."
                  : "Leveraging Tailwind CSS with meticulous polish, I deliver cohesive, accessible interfaces that feel lightweight and delightful."}
              </p>

              <div className={styles.specsRow}>
                <span className={styles.specItem}>
                  <span className={styles.specDash}>—</span> Tailwind CSS
                </span>
                <span className={styles.specItem}>
                  <span className={styles.specDash}>—</span> Microinteracciones
                </span>
                <span className={styles.specItem}>
                  <span className={styles.specDash}>—</span> Rendimiento & fluidez
                </span>
              </div>
            </div>

            <div className={styles.mediaPanel}>
              <Image
                src="/images/flow-craft.jpg"
                alt={isEs ? "Cuidado en el detalle" : "Attention to detail"}
                fill
                sizes="(max-width: 900px) 100vw, 40vw"
                className={styles.mediaImage}
              />
              <div className={styles.mediaOverlay} />
            </div>
          </div>

          <hr className={styles.flowDivider} />

          <p className={styles.closingQuote}>
            {isEs
              ? "Cuidar cada acabado es lo que convierte una página común en algo verdaderamente memorable."
              : "Refining every finish is what elevates an ordinary page into something truly memorable."}
          </p>
        </div>
      </article>
    </section>
  );
}