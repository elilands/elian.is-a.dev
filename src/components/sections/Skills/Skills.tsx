"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Skills.module.css";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type SkillLevel = "Advanced" | "Intermediate" | "Learning";

type SkillItem = {
  name: string;
  level: SkillLevel;
  note: string;
};

type SkillCategory = {
  index: string;
  title: string;
  eyebrow: string;
  description: string;
  accent: string;
  items: SkillItem[];
};

const SKILL_RIBBON = [
  "Next.js",
  "TypeScript",
  "React",
  "Vue",
  "Tailwind",
  "Framer Motion",
  "Node.js",
  "Python",
  "Go",
  "Docker",
  "PostgreSQL",
  "Redis",
  "AWS",
  "Vercel",
  "OCI",
  "Postman",
  "Stripe API",
  "Zapier",
  "EBC Business Lens",
];

export default function Skills() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);
  const leadRef = useRef<HTMLParagraphElement>(null);
  const ribbonRef = useRef<HTMLDivElement>(null);
  const bloomRefs = useRef<(HTMLElement | null)[]>([]);
  const categoryRefs = useRef<(HTMLElement | null)[]>([]);
  const skillListRefs = useRef<(HTMLDivElement | null)[]>([]);
  const profileRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Track the currently open index in real-time to avoid async state delays
  const openRef = useRef<number | null>(null);
  // openSet holds which category index is open; start with all collapsed
  const [openSet, setOpenSet] = useState<Set<number>>(() => new Set());
  const prefersReducedMotion = useReducedMotion();
  const [lowPerf, setLowPerf] = useState<boolean>(false);
  const shouldReduce = prefersReducedMotion || lowPerf;

  useEffect(() => {
    // Detect lower-end devices (best-effort): low device memory, few CPU cores, or Save-Data
    try {
      const mem = (navigator as any).deviceMemory;
      const hw = (navigator as any).hardwareConcurrency;
      const conn = (navigator as any).connection;
      const saveData = conn && conn.saveData;
      if ((mem && mem <= 2) || (hw && hw <= 2) || saveData) setLowPerf(true);
    } catch (e) {
      // ignore if not available
    }

    const ctx = gsap.context(() => {
      const blooms = bloomRefs.current.filter(Boolean) as HTMLElement[];
      const categories = categoryRefs.current.filter(Boolean) as HTMLElement[];
      const profileItems = profileRefs.current.filter(Boolean) as HTMLDivElement[];

      // Initial states. Keep transforms/opacity only for smooth GPU compositing when possible.
      gsap.set(tagRef.current, { opacity: 0, y: 14, force3D: true });
      gsap.set(ruleRef.current, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(titleRef.current, { yPercent: 115, force3D: true });
      gsap.set(leadRef.current, { opacity: 0, y: 18, force3D: true });
      gsap.set(ribbonRef.current, { opacity: 0 });
      gsap.set(blooms, { opacity: 0, y: 18, force3D: true });
      gsap.set(categories, { opacity: 0, y: 22, force3D: true });
      // ensure all skill lists are hidden initially, except default open
      skillListRefs.current.forEach((el, i) => {
        if (!el) return;
        const rows = Array.from(el.querySelectorAll(`.${styles.skillRow}`)) as HTMLElement[];
        if (openRef.current !== null && openRef.current === i) {
          const natural = el.scrollHeight;
          if (shouldReduce) {
            // avoid animating maxHeight (layout) on low-perf devices
            gsap.set(el, { maxHeight: 'none', opacity: 1, overflow: 'visible', force3D: true });
            gsap.set(rows, { opacity: 1, y: 0, force3D: true });
          } else {
            gsap.set(el, { maxHeight: natural, opacity: 1, overflow: 'hidden', force3D: true });
            gsap.set(rows, { opacity: 1, y: 0, force3D: true });
          }
        } else {
          if (shouldReduce) {
            gsap.set(el, { maxHeight: 0, opacity: 0, overflow: 'hidden', force3D: true });
            gsap.set(rows, { opacity: 0, y: 0, force3D: true });
          } else {
            gsap.set(el, { maxHeight: 0, opacity: 0, overflow: 'hidden', force3D: true });
            gsap.set(rows, { opacity: 0, y: 8, force3D: true });
          }
        }
      });
      gsap.set(profileItems, { opacity: 0, y: 14, force3D: true });

      if (shouldReduce) {
        // For reduced / low-perf devices, apply final states without elaborate timelines
        gsap.set(tagRef.current, { opacity: 1, y: 0 });
        gsap.set(ruleRef.current, { scaleX: 1 });
        gsap.set(titleRef.current, { yPercent: 0 });
        gsap.set(leadRef.current, { opacity: 1, y: 0 });
        gsap.set(ribbonRef.current, { opacity: 1 });
        gsap.set(blooms, { opacity: 1, y: 0 });
        gsap.set(categories, { opacity: 1, y: 0 });
        gsap.set(profileItems, { opacity: 1, y: 0 });
      } else {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            toggleActions: "play none none none",
          },
          defaults: { ease: "power3.out", force3D: true },
        });

        tl
          .to(tagRef.current, { opacity: 1, y: 0, duration: 0.45 })
          .to(ruleRef.current, { scaleX: 1, duration: 0.7, ease: "power2.inOut" }, "-=0.28")
          .to(titleRef.current, { yPercent: 0, duration: 0.85, ease: "power4.out" }, "-=0.4")
          .to(leadRef.current, { opacity: 1, y: 0, duration: 0.55 }, "-=0.32")
          .to(ribbonRef.current, { opacity: 1, duration: 0.55 }, "-=0.22")
          .to(blooms, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 }, "-=0.18")
          .to(categories, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 }, "-=0.18")
          .to(profileItems, { opacity: 1, y: 0, duration: 0.45, stagger: 0.05 }, "-=0.22");
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  function toggleCategory(i: number) {
    const current = skillListRefs.current[i];
    if (!current) return;

    // Use ref for real-time state tracking during animations
    const isOpen = openRef.current === i;
    const rows = Array.from(current.querySelectorAll(`.${styles.skillRow}`)) as HTMLElement[];
    
    if (shouldReduce) {
      // Instant toggle for reduced-motion / low-perf devices to avoid layout-heavy animations
      if (isOpen) {
        gsap.set(rows, { opacity: 0, y: 0 });
        gsap.set(current, { maxHeight: 0, opacity: 0, overflow: 'hidden' });
        openRef.current = null;
        setOpenSet(new Set());
        requestAnimationFrame(() => ScrollTrigger.refresh());
        return;
      }

      // close others
      const currentlyOpen = openRef.current;
      if (currentlyOpen !== null && currentlyOpen !== i) {
        const openEl = skillListRefs.current[currentlyOpen];
        if (openEl) {
          const openRows = Array.from(openEl.querySelectorAll(`.${styles.skillRow}`)) as HTMLElement[];
          gsap.set(openRows, { opacity: 0, y: 0 });
          gsap.set(openEl, { maxHeight: 0, opacity: 0, overflow: 'hidden' });
        }
      }

      // open current instantly
      gsap.set(current, { maxHeight: 'none', opacity: 1, overflow: 'visible' });
      gsap.set(rows, { opacity: 1, y: 0 });
      openRef.current = i;
      setOpenSet(new Set([i]));
      requestAnimationFrame(() => ScrollTrigger.refresh());
      return;
    }

    if (isOpen) {
      // Closing current
      gsap.set(current, { maxHeight: current.scrollHeight, opacity: 1, overflow: 'hidden' });
      const tl = gsap.timeline();
      tl
        .to(rows, { opacity: 0, y: 8, duration: 0.32, stagger: 0.04, ease: 'power2.in' })
        .to(current, { maxHeight: 0, opacity: 0, duration: 0.45, ease: 'power2.inOut' }, '-=0.18');
      tl.eventCallback('onComplete', () => {
        openRef.current = null;
        setOpenSet(new Set());
        requestAnimationFrame(() => ScrollTrigger.refresh());
      });
    } else {
      // Close all others first, then open this one
      const currentlyOpen = openRef.current;
      
      if (currentlyOpen !== null && currentlyOpen !== i) {
        // Close the currently open one
        const openEl = skillListRefs.current[currentlyOpen];
        if (openEl) {
          const openRows = Array.from(openEl.querySelectorAll(`.${styles.skillRow}`)) as HTMLElement[];
          gsap.set(openEl, { maxHeight: openEl.scrollHeight, opacity: 1, overflow: 'hidden' });
          const closeTl = gsap.timeline();
          closeTl
            .to(openRows, { opacity: 0, y: 8, duration: 0.32, stagger: 0.04, ease: 'power2.in' })
            .to(openEl, { maxHeight: 0, opacity: 0, duration: 0.45, ease: 'power2.inOut' }, '-=0.18');
        }
      }
      
      // Update ref immediately for next toggle detection
      openRef.current = i;
      
      // Open the new one
      gsap.set(current, { maxHeight: 0, opacity: 0, overflow: 'hidden' });
      const tl = gsap.timeline();
      const natural = current.scrollHeight;
      tl
        .to(current, { maxHeight: natural, opacity: 1, duration: 0.6, ease: 'power3.out' }, currentlyOpen !== null ? 0.2 : 0)
        .to(rows, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power3.out' }, '-=0.42');
      tl.eventCallback('onComplete', () => {
        gsap.set(current, { maxHeight: 'none', overflow: 'visible' });
        setOpenSet(new Set([i]));
        requestAnimationFrame(() => ScrollTrigger.refresh());
      });
    }
  }

  return (
    <section ref={sectionRef} className={styles.skills} id="skills" aria-label="Skills">
      <div className={styles.bgOrbs} aria-hidden="true">
        <div className={`${styles.orb} ${styles.orb1}`} />
        <div className={`${styles.orb} ${styles.orb2}`} />
        <div className={`${styles.orb} ${styles.orb3}`} />
      </div>

      <div className={styles.headerRow}>
        <span ref={tagRef} className={styles.tag}>{t.skills.tag}</span>
        <div ref={ruleRef} className={styles.rule} aria-hidden="true" />
      </div>

      <div className={styles.heroBlock}>
        <div className={styles.heroCopy}>
          <div className={styles.titleMask}>
            <span ref={titleRef} className={styles.title}>{t.skills.title}</span>
          </div>

          <p ref={leadRef} className={styles.lead}>
            {t.skills.lead}
          </p>

          <div ref={ribbonRef} className={styles.ribbon} aria-hidden="true">
            <div className={styles.ribbonTrack}>
              {[...SKILL_RIBBON, ...SKILL_RIBBON].map((item, index) => (
                <span key={`${item}-${index}`} className={styles.ribbonItem}>
                  <span className={styles.ribbonDot} aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <aside className={styles.heroAside}>
          <div className={styles.profileCard}>
            <p className={styles.profileHeading}>{t.skills.profileHeading}</p>
            <div className={styles.profileList}>
              {t.skills.profilePoints.map((point, index) => (
                <div
                  key={point.label}
                  ref={(el) => { profileRefs.current[index] = el; }}
                  className={styles.profileItem}
                >
                  <span className={styles.profileLabel}>{point.label}</span>
                  <span className={styles.profileValue}>{point.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.lensCard}>
            <p className={styles.lensHeading}>{t.skills.lensHeading}</p>
            <p className={styles.lensBody}>
              {t.skills.lensBody}
            </p>
          </div>
        </aside>
      </div>

      <div className={styles.gridWrap}>
        {t.skills.blooms.map((block, index) => (
          <article
            key={block.title}
            ref={(el) => { bloomRefs.current[index] = el; }}
            className={`${styles.bloomCard} ${index === 1 ? styles.bloomCardWide : ""}`}
          >
            <div className={styles.bloomTop}>
              <span className={styles.bloomIndex}>0{index + 1}</span>
              <span className={styles.bloomMetric}>{block.metricValue}</span>
            </div>
            <div className={styles.bloomTitleBlock}>
              <h3 className={styles.bloomTitle}>{block.title}</h3>
              <p className={styles.bloomSubtitle}>{block.subtitle}</p>
            </div>
            <p className={styles.bloomBody}>{block.description}</p>
          </article>
        ))}
      </div>

      <div className={styles.categoryIntro}>
        <p className={styles.categoryIntroTag}>{t.skills.categoryIntroTag}</p>
        <h2 className={styles.categoryIntroTitle}>{t.skills.categoryIntroTitle}</h2>
      </div>

      <div className={styles.categoryGrid}>
        {t.skills.categories.map((category, index) => {
          const isOpen = openSet.has(index);
          return (
            <article
              key={category.index}
              ref={(el) => { categoryRefs.current[index] = el; }}
              className={`${styles.categoryCard} ${index >= 4 ? styles.categoryCardWide : ""}`}
            >
              <div
                className={styles.categoryHeader}
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                onClick={() => toggleCategory(index)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleCategory(index); } }}
              >
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <span className={styles.categoryIndex}>{category.index}</span>
                  <div>
                    <h3 className={styles.categoryTitle}>{category.title}</h3>
                    <p className={styles.categoryEyebrow}>{category.eyebrow}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span className={styles.categoryAccent}>{category.accent}</span>
                  <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`} aria-hidden="true">›</span>
                </div>
              </div>

              <p className={styles.categoryDescription}>{category.description}</p>

              <div
                ref={(el) => { skillListRefs.current[index] = el; }}
                className={styles.skillList}
                aria-hidden={!isOpen}
              >
                {category.items.map((item) => (
                  <div key={item.name} className={styles.skillRow}>
                    <div className={styles.skillTopRow}>
                      <span className={styles.skillName}>{item.name}</span>
                      <span className={`${styles.skillLevel} ${styles[`skillLevel${item.level}`]}`}>
                        {item.level}
                      </span>
                    </div>
                    <p className={styles.skillNote}>{item.note}</p>
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </div>

      {/* Footer explore strip removed to avoid duplication with category 06 */}
    </section>
  );
}
