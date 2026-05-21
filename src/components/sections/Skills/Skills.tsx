"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import styles from "./Skills.module.css";

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

const PROFILE_POINTS = [
  {
    label: "Major",
    value: "International Commerce and Business at Escuela Bancaria y Comercial",
  },
  {
    label: "Base",
    value: "Mexico City, working with CST and international context in mind",
  },
  {
    label: "Focus",
    value: "Technical execution that respects business logic, clarity, and people",
  },
];

const CORE_BLOOMS = [
  {
    title: "Core Stack",
    subtitle: "Frontend, backend, and data",
    description:
      "I build with a full product view. I can move comfortably between UI detail, API structure, and database decisions, which helps me keep implementation aligned with the bigger picture.",
    metric: "Build depth",
    metricValue: "Advanced",
  },
  {
    title: "Business & Communication",
    subtitle: "How I work with people",
    description:
      "My strongest differentiator is how I collaborate: I ask good questions, reduce friction, and translate complexity into language that technical and non-technical people can use.",
    metric: "Operating style",
    metricValue: "Advanced",
  },
  {
    title: "Cloud & Delivery",
    subtitle: "Shipping with control",
    description:
      "I am comfortable thinking about deployment, hosting, performance, and maintenance. I like systems that are stable, understandable, and easy to hand off or improve later.",
    metric: "Delivery maturity",
    metricValue: "Intermediate",
  },
  {
    title: "AI, Data & Integrations",
    subtitle: "Useful automation, not hype",
    description:
      "I use AI and integrations when they support real workflows. The goal is to make products more efficient, more responsive, and more practical for the people using them.",
    metric: "Exploration",
    metricValue: "Intermediate",
  },
];

const CATEGORIES: SkillCategory[] = [
  {
    index: "01",
    title: "Frontend Systems",
    eyebrow: "Interface + motion + product logic",
    description:
      "I can build responsive interfaces that feel polished and intentional. I care about flow, visual hierarchy, and interaction details that help users understand what is happening without effort.",
    accent: "Advanced",
    items: [
      { name: "Next.js", level: "Advanced", note: "App structure, routing, server/client boundaries, and performance-minded composition." },
      { name: "React", level: "Advanced", note: "Component architecture, state organization, and reusable UI systems." },
      { name: "Vue", level: "Advanced", note: "Progressive UI frameworks and pragmatic component composition." },
      { name: "TypeScript", level: "Advanced", note: "Typed interfaces that keep larger projects readable and safer to evolve." },
      { name: "Tailwind", level: "Advanced", note: "Utility-first styling for fast, consistent UI development." },
      { name: "Framer Motion", level: "Intermediate", note: "Declarative motion for UI transitions and micro-interactions." },
      { name: "GSAP", level: "Intermediate", note: "Narrative motion, scroll choreography, and controlled reveals." },
      { name: "Lenis", level: "Intermediate", note: "Smooth scroll behavior that supports cinematic, editorial-feeling sections." },
    ],
  },
  {
    index: "02",
    title: "Backend & Data",
    eyebrow: "APIs, persistence, and structure",
    description:
      "I like building systems that are easy to reason about. Clear schemas, predictable APIs, and thoughtful data handling matter because they reduce friction later in the lifecycle.",
    accent: "Advanced",
    items: [
      { name: "Node.js", level: "Advanced", note: "Backend logic, service orchestration, and practical API behavior." },
      { name: "Python", level: "Advanced", note: "Scripting, backend services, and data work for practical product needs." },
      { name: "Django", level: "Intermediate", note: "Fast, structured web apps and admin-driven workflows." },
      { name: "Java", level: "Learning", note: "Fundamentals of a strongly typed backend ecosystem (beginner)." },
      { name: "Go", level: "Intermediate", note: "Concurrent services and efficient APIs for production workloads." },
      { name: "PHP", level: "Intermediate", note: "Pragmatic web backends and integration with existing ecosystems." },
      { name: "REST APIs", level: "Advanced", note: "Simple, dependable endpoints designed with clear contracts." },
      { name: "PostgreSQL", level: "Advanced", note: "Strong relational foundations for scalable product work." },
      { name: "Redis", level: "Intermediate", note: "Caching, ephemeral storage, and fast coordination between services." },
    ],
  },
  {
    index: "03",
    title: "Cloud & Infrastructure",
    eyebrow: "Deployment and operational thinking",
    description:
      "Infrastructure is part of the product experience. I focus on practical deployment, dependable environments, and hosting choices that make maintenance easier for real teams.",
    accent: "Intermediate",
    items: [
      { name: "Docker", level: "Intermediate", note: "Portable environments and cleaner handoffs between development stages." },
      { name: "AWS", level: "Advanced", note: "Core cloud services for production-grade systems." },
      { name: "Vercel", level: "Intermediate", note: "Optimized hosting for modern frontends and serverless flows." },
      { name: "OCI", level: "Intermediate", note: "Enterprise cloud and data services for production workloads." },
      { name: "Redis", level: "Intermediate", note: "Managed caching and fast in-memory services in cloud environments." },
    ],
  },
  {
    index: "04",
    title: "AI, Integrations & Automation",
    eyebrow: "Making products more useful",
    description:
      "I use integrations to make workflows smoother, not more complicated. That includes messaging, email, AI services, and product utilities that support actual user needs.",
    accent: "Intermediate",
    items: [
      { name: "WhatsApp API", level: "Intermediate", note: "Operational communication and real-time product interactions." },
      { name: "Postman", level: "Intermediate", note: "API testing and integration workflows." },
      { name: "Stripe API", level: "Intermediate", note: "Payment flows and practical monetization integrations." },
      { name: "Zapier", level: "Intermediate", note: "Low-code automation for product and business workflows." },
      { name: "OCI Data Science", level: "Learning", note: "Data science tooling and managed experimentation on OCI." },
      { name: "OCI Forecasting", level: "Learning", note: "Practical forecasting and business planning services." },
      { name: "Vector Search", level: "Learning", note: "Exploring semantic retrieval and search-oriented workflows." },
      { name: "RAG Systems", level: "Learning", note: "Studying retrieval-backed assistants and structured knowledge flow." },
    ],
  },
  {
    index: "05",
    title: "Business & Soft Skills",
    eyebrow: "Where the technical side becomes valuable",
    description:
      "This is the layer that gives the section more weight: communication, critical thinking, and international business context. I do not approach work as a pure technician; I approach it as someone trained to understand operations, people, and decisions.",
    accent: "Advanced",
    items: [
      { name: "International Commerce", level: "Advanced", note: "A commercial and global perspective that shapes how I read requirements and constraints." },
      { name: "Product Thinking", level: "Advanced", note: "Designing features with a clear value and measurable outcomes." },
      { name: "Requirements Analysis", level: "Advanced", note: "Translating fuzzy needs into clear acceptance criteria and scope." },
      { name: "Financial Awareness", level: "Advanced", note: "Understanding unit economics, cost drivers and commercial viability." },
      { name: "Leadership", level: "Advanced", note: "Guiding teams, decision-making and accountability." },
      { name: "Continuous Learning", level: "Advanced", note: "A habit of improving systems, skills and product thinking." },
      { name: "Time Management", level: "Advanced", note: "Prioritization and delivery with predictable cadence." },
      { name: "Emotional Intelligence", level: "Advanced", note: "Practical empathy for teammates and stakeholders." },
    ],
  },
  {
    index: "06",
    title: "Currently Exploring",
    eyebrow: "What I want to sharpen next",
    description:
      "I keep a learning lane open for ideas that can improve product quality or deepen my technical range. I like exploring tools that can make systems more expressive or more intelligent.",
    accent: "Learning",
    items: [
      { name: "Rust", level: "Learning", note: "A stronger systems-level foundation and performance-oriented thinking." },
      { name: "Three.js", level: "Learning", note: "More expressive visual and 3D experiences for the web." },
      { name: "llama.cpp", level: "Learning", note: "Local AI workflows and smaller-model experimentation." },
      { name: "Model Fine-tuning", level: "Learning", note: "Improving how I adapt model behavior to specific use cases." },
      { name: "Workflow Design", level: "Learning", note: "Bringing business and product context closer to implementation choices." },
    ],
  },
];

export default function Skills() {
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      const blooms = bloomRefs.current.filter(Boolean) as HTMLElement[];
      const categories = categoryRefs.current.filter(Boolean) as HTMLElement[];
      const profileItems = profileRefs.current.filter(Boolean) as HTMLDivElement[];

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
          gsap.set(el, { maxHeight: natural, opacity: 1, overflow: 'hidden', force3D: true });
          gsap.set(rows, { opacity: 1, y: 0, force3D: true });
        } else {
          gsap.set(el, { maxHeight: 0, opacity: 0, overflow: 'hidden', force3D: true });
          gsap.set(rows, { opacity: 0, y: 8, force3D: true });
        }
      });
      gsap.set(profileItems, { opacity: 0, y: 14, force3D: true });

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  function toggleCategory(i: number) {
    const current = skillListRefs.current[i];
    if (!current) return;

    // Use ref for real-time state tracking during animations
    const isOpen = openRef.current === i;
    const rows = Array.from(current.querySelectorAll(`.${styles.skillRow}`)) as HTMLElement[];
    
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
        <span ref={tagRef} className={styles.tag}>03</span>
        <div ref={ruleRef} className={styles.rule} aria-hidden="true" />
      </div>

      <div className={styles.heroBlock}>
        <div className={styles.heroCopy}>
          <div className={styles.titleMask}>
            <span ref={titleRef} className={styles.title}>What I bring to the table.</span>
          </div>

          <p ref={leadRef} className={styles.lead}>
            Skills is where the technical side and the commercial side meet. I build digital products with a practical understanding of business, operations, and people, so the work feels useful instead of just polished.
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
            <p className={styles.profileHeading}>Professional profile</p>
            <div className={styles.profileList}>
              {PROFILE_POINTS.map((point, index) => (
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
            <p className={styles.lensHeading}>Working lens</p>
            <p className={styles.lensBody}>
              I am strongest when I have to connect a business goal with a technical solution. That is where International Commerce and Business adds value to the way I think, communicate, and execute.
            </p>
          </div>
        </aside>
      </div>

      <div className={styles.gridWrap}>
        {CORE_BLOOMS.map((block, index) => (
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
        <p className={styles.categoryIntroTag}>Skill map</p>
        <h2 className={styles.categoryIntroTitle}>A more detailed view of the tools and abilities I use.</h2>
      </div>

      <div className={styles.categoryGrid}>
        {CATEGORIES.map((category, index) => {
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
