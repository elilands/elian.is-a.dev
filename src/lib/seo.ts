export const siteUrl = "https://elian.is-a.dev";
export const siteName = "Elian Mejia";
export const siteTitle = "Elian Mejia — Full-Stack Product Engineer";
export const siteDescription =
  "Portfolio of Elian Mejia, a Mexico City full-stack product engineer building Next.js, React and TypeScript apps, AI-powered tools, certifications, and business-aware web systems.";

export const siteKeywords = [
  "Elian Mejia",
  "full-stack product engineer",
  "portfolio",
  "Next.js",
  "React",
  "TypeScript",
  "Mexico City",
  "AI-powered tools",
  "Omyu",
  "Study Edu Cout",
  "Cartia",
  "Fixit Ya",
  "MariaDB",
  "PostgreSQL",
  "AWS",
  "Docker",
  "accessible web apps",
  "international commerce",
];

export const socialLinks = [
  "https://github.com/elilands",
  "https://www.linkedin.com/in/elianisadev/",
  "https://omyu.de",
];

export const skillsHighlights = [
  "Next.js",
  "React",
  "TypeScript",
  "Vue",
  "Node.js",
  "Python",
  "GSAP",
  "Lenis",
  "MariaDB",
  "PostgreSQL",
  "AWS",
  "Docker",
  "AI integrations",
  "business analysis",
  "accessible UX",
];

export const featuredProjects = [
  {
    name: "Omyu",
    url: "https://omyu.de",
    description:
      "An AI scenario trainer and life companion with calendar, tasks, habit tools, messaging support, and community features.",
    stack: ["Next.js", "TypeScript", "MariaDB", "SiliconFlow API"],
  },
  {
    name: "Study Edu Cout",
    url: "https://studyeducout.org",
    description:
      "An English certification platform built for structured learning, exam prep, and communication flows.",
    stack: ["Next.js", "React", "JavaScript", "CSS", "SMTP"],
  },
  {
    name: "Study Edu Cout Portal",
    url: "https://portal.studyeducout.org",
    description:
      "A role-based LMS for teachers and students with coursework, grading, and full ownership of the learning stack.",
    stack: ["Next.js", "React", "JavaScript", "MariaDB", "Bcrypt", "SMTP"],
  },
  {
    name: "Fixit Ya",
    url: "https://fixitya.com",
    description:
      "An AI-powered home services platform for cleaning, plumbing, and service requests with interaction logging.",
    stack: ["Next.js", "TypeScript", "React", "MariaDB", "SiliconFlow API", "SMTP"],
  },
  {
    name: "Cartia",
    url: "https://cartia.com.mx",
    description:
      "A restaurant management and delivery platform with digital menus, staff management, and WhatsApp ordering.",
    stack: ["Next.js", "React", "TypeScript", "MariaDB", "WhatsApp API"],
  },
];

export const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    description: siteDescription,
    inLanguage: "en-US",
    author: {
      "@type": "Person",
      name: siteName,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: siteTitle,
    url: siteUrl,
    description: siteDescription,
    mainEntity: {
      "@type": "Person",
      name: siteName,
      givenName: "Elian",
      familyName: "Mejia",
      jobTitle: "Full-Stack Product Engineer",
      url: siteUrl,
      image: `${siteUrl}/opengraph-image`,
      sameAs: socialLinks,
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Escuela Bancaria y Comercial (EBC)",
      },
      homeLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Mexico City",
          addressCountry: "MX",
        },
      },
      knowsAbout: skillsHighlights,
      subjectOf: featuredProjects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: project.name,
          url: project.url,
          description: project.description,
          keywords: project.stack.join(", "),
        },
      })),
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Featured portfolio projects",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: featuredProjects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: project.name,
        url: project.url,
        description: project.description,
        keywords: project.stack.join(", "),
      },
    })),
  },
];
