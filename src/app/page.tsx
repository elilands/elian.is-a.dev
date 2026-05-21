import Preloader from "@/components/sections/Preloader/Preloader";
import Hero      from "@/components/sections/Hero/Hero";
import About     from "@/components/sections/About/About";
import Projects  from "@/components/sections/Projects/Projects";
import Skills    from "@/components/sections/Skills/Skills";
import Certifications from "@/components/sections/Certifications/Certifications";
import Process   from "@/components/sections/Process/Process";
import Contact   from "@/components/sections/Contact/Contact";
import { structuredData } from "@/lib/seo";
import styles    from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main} id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      <Preloader />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Certifications />
      <Process />
      <section 
        className={styles.contactSection} 
        id="contact"
        aria-label="Contact section background"
      >
        <div className={styles.contactHalo} aria-hidden="true" />
        <Contact />
      </section>

      <footer className={styles.footer}>
        <div className="container">
          <p className={styles.footerName}>Elian Mejia</p>
          <p className={styles.footerCopy}>© 2026</p>
        </div>
      </footer>

    </main>
  );
}