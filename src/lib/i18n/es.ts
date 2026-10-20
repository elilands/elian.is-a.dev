import type { Translations } from "./en";

export const es: Translations = {
  nav: {
    about: "Sobre mí",
    projects: "Proyectos",
    skills: "Habilidades",
    certifications: "Certificaciones",
    process: "Proceso",
    contact: "Contacto",
    getInTouch: "Hablemos",
    skipToContent: "Saltar al contenido principal",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    navigationMenu: "Menú de navegación",
    langToggleAria: "Cambiar idioma",
  },
  hero: {
    nameFirst: "Elian",
    nameLast: "Mejia",
    tagline1: "Desarrollador.",
    tagline2: "Constructor.",
    tagline3: "Ciudad de México.",
    stack: "Next.js · TypeScript · MySQL · MariaDB · JavaScript",
    seeMyWork: "Ver mi trabajo",
    featuredProject: "Omyu — Entrenador de escenarios IA",
    featuredProjectAria: "Ver proyecto Omyu — Entrenador de escenarios IA",
    sectionAria: "Sección de inicio que presenta a Elian Mejia, desarrollador full-stack de la Ciudad de México",
  },
  about: {
    tag: "01",
    sectionAria: "Sección Sobre mí: Quién es Elian Mejia y su filosofía de trabajo",
    statementAria: "Declaración profesional sobre productos digitales",
    statement: [
      "Diseño sistemas",
      "con contexto de negocio,",
      "pensamiento crítico,",
      "y disciplina de ejecución.",
    ],
    intro:
      "Soy un ingeniero de producto full-stack basado en la Ciudad de México, y mi perfil une tecnología con rigor empresarial. " +
      "Estudio Comercio y Negocios Internacionales en la Escuela Bancaria y Comercial (EBC), " +
      "lo que me dio una visión más sólida para cadenas de suministro, operaciones globales y toma de decisiones bajo restricciones reales del mercado. " +
      "Esa formación define mi forma de trabajar con las personas: escuchar primero, estructurar la complejidad y hacer avanzar a los equipos con claridad, empatía y responsabilidad.",
    acts: [
      {
        id: "01",
        title: "Perspectiva primero",
        body:
          "Leo el contexto antes de reaccionar. Hago mejores preguntas, identifico qué está bloqueando realmente el progreso y alineo a los equipos en torno a decisiones realistas, compartidas y con visión de negocio.",
      },
      {
        id: "02",
        title: "Comunicación que reduce fricción",
        body:
          "Me comunico de forma directa y tranquila, especialmente bajo presión. Traduzco la complejidad en prioridades claras para que perfiles técnicos y no técnicos avancen juntos entre operaciones, producto y liderazgo.",
      },
      {
        id: "03",
        title: "Ejecución con confianza",
        body:
          "Soy constante con los compromisos, transparente con las compensaciones y asumo la responsabilidad de los resultados. Se puede confiar en mí para mantener el ritmo sin perder calidad, dirección estratégica ni respeto por el equipo.",
      },
    ],
    profilePoints: [
      ["Enfoque académico", "Comercio y Negocios Internacionales (EBC)"],
      ["Ubicación", "Ciudad de México (CST)"],
      ["Estilo de trabajo", "Con visión de negocio, centrado en las personas, orientado a la ejecución"],
    ],
    signalRows: [
      ["Comercio internacional", "Razonamiento de negocio", "Pensamiento crítico", "Escucha activa", "Claridad en decisiones"],
      ["Responsabilidad", "Adaptabilidad", "Resolución de conflictos", "Comunicación transversal", "Perspectiva global"],
    ],
    evidence: [
      {
        title: "Fundamento académico",
        detail:
          "En la EBC, mi carrera en Comercio y Negocios Internacionales fortaleció mi visión sobre operaciones, negociación y dinámicas de negocio globales.",
      },
      {
        title: "Pensamiento crítico",
        detail:
          "Descompongo situaciones complejas en pasos claros y priorizo con base en el impacto real, no en el ruido.",
      },
      {
        title: "Empatía y escucha activa",
        detail:
          "Presto atención a lo que las personas necesitan, no solo a lo que piden, acelerando la colaboración efectiva.",
      },
      {
        title: "Adaptabilidad",
        detail:
          "Me adapto rápido a prioridades cambiantes manteniendo la estructura, la calidad y una comunicación serena.",
      },
      {
        title: "Mentalidad internacional",
        detail:
          "Trabajo con perspectiva multicultural, equilibrando distintos estilos de comunicación y expectativas.",
      },
    ],
    values: [
      "Comunicación clara antes que suposiciones",
      "Contexto de negocio y mercado en cada decisión",
      "Razonamiento estructurado bajo presión",
      "Colaboración respetuosa entre diferentes roles",
      "Compromiso con consistencia y seguimiento",
    ],
  },
  projects: {
    tag: "02",
    heading: "Lo que he construido.",
    featuredBadge: "Destacado",
    visitFeatured: "Visitar Omyu",
    moreWorkOn: "Más proyectos en",
    featured: {
      id: "01",
      name: "Omyu",
      tagline: "Tu compañero de vida inteligente",
      description:
        "Una plataforma multifuncional diseñada en torno al usuario de forma integral. " +
        "Entrena frente a una IA en escenarios reales: negociar un aumento, gestionar conflictos o cerrar un trato. " +
        "Además: calendario, tareas, música, perfil de personalidad creado a partir de un cuestionario, " +
        "decodificador de mensajes especialmente útil para usuarios neurodivergentes, jardín de hábitos, " +
        "un sistema de compatibilidad más cercano y fundamentado que el de cualquier plataforma actual, " +
        "y herramientas de creación de comunidad.",
    },
    items: [
      {
        id: "02",
        name: "Study Edu Cout",
        tagline: "Plataforma de certificación de inglés",
        description:
          "Landing page y plataforma de cursos para certificación de inglés. " +
          "Diseñada específicamente para aprendizaje estructurado y preparación para exámenes, " +
          "con integración SMTP de Gmail para flujos de comunicación.",
      },
      {
        id: "03",
        name: "Study Edu Cout — Portal",
        tagline: "LMS independiente para docentes y alumnos",
        description:
          "Alternativa completa a Moodle como intranet. Los profesores suben material, " +
          "califican tareas y administran grupos. Los alumnos acceden a planes de estudio " +
          "estructurados con control de acceso por roles. Creado para la independencia y soberanía técnica.",
      },
      {
        id: "04",
        name: "Fixit Ya",
        tagline: "Servicios del hogar con IA",
        description:
          "Chatea con un asistente IA para solicitar limpieza, fontanería o cualquier " +
          "servicio para el hogar. Registra todas las interacciones y peticiones. Primer proyecto creado " +
          "completamente en TypeScript y mi primera integración con la API de SiliconFlow.",
      },
      {
        id: "05",
        name: "Cartia",
        tagline: "Gestión restaurantera y plataforma de delivery",
        description:
          "Alternativa a Rappi y Uber Eats para restaurantes. Menús digitales " +
          "100% personalizados, panel de administración integral para personal, repartidores " +
          "y facturación — cobrando comisión únicamente al final. Pedidos en tiempo real vía WhatsApp API.",
      },
    ],
  },
  skills: {
    tag: "03",
    title: "Lo que aporto al equipo.",
    lead: "En Habilidades convergen la parte técnica y la visión comercial. Desarrollo productos digitales con una comprensión práctica del negocio, las operaciones y las personas, para que el resultado sea genuinamente útil y no solo estético.",
    profileHeading: "Perfil profesional",
    profilePoints: [
      {
        label: "Carrera",
        value: "Comercio y Negocios Internacionales en la Escuela Bancaria y Comercial",
      },
      {
        label: "Base",
        value: "Ciudad de México, trabajando en horario CST y con contexto global",
      },
      {
        label: "Enfoque",
        value: "Ejecución técnica que respeta la lógica de negocio, la claridad y a las personas",
      },
    ],
    lensHeading: "Enfoque de trabajo",
    lensBody: "Mi mayor fortaleza es conectar un objetivo de negocio con una solución técnica. Ahí es donde Comercio y Negocios Internacionales agrega valor a mi manera de pensar, comunicar y ejecutar.",
    blooms: [
      {
        title: "Stack Principal",
        subtitle: "Frontend, backend y datos",
        description:
          "Construyo con una visión completa del producto. Me muevo con fluidez entre el detalle visual de la UI, la estructura de las APIs y las decisiones de base de datos para mantener el código alineado con el objetivo general.",
        metric: "Profundidad técnica",
        metricValue: "Avanzado",
      },
      {
        title: "Negocios y Comunicación",
        subtitle: "Cómo trabajo con personas",
        description:
          "Mi mayor diferenciador es cómo colaboro: hago preguntas acertadas, reduzco fricciones y traduzco la complejidad técnica al lenguaje que necesitan tanto perfiles técnicos como directivos.",
        metric: "Estilo operativo",
        metricValue: "Avanzado",
      },
      {
        title: "Nube y Despliegue",
        subtitle: "Lanzamiento con control",
        description:
          "Diseño pensando en despliegue, infraestructura, rendimiento y mantenimiento. Prefiero sistemas estables, comprensibles y fáciles de escalar o delegar en el futuro.",
        metric: "Madurez de entrega",
        metricValue: "Intermedio",
      },
      {
        title: "IA, Datos e Integraciones",
        subtitle: "Automatización útil, sin hype",
        description:
          "Implemento IA e integraciones cuando resuelven flujos reales. La meta es hacer productos más eficientes, ágiles y prácticos para los usuarios que dependen de ellos.",
        metric: "Exploración",
        metricValue: "Intermedio",
      },
    ],
    categoryIntroTag: "Mapa de habilidades",
    categoryIntroTitle: "Una vista detallada de las herramientas y capacidades que domino.",
    categories: [
      {
        index: "01",
        title: "Sistemas Frontend",
        eyebrow: "Interfaz + animación + lógica de producto",
        description:
          "Construyo interfaces responsivas que se sienten pulidas y fluidas. Cuido el ritmo visual, la jerarquía y los detalles de interacción para que los usuarios comprendan lo que ocurre sin esfuerzo.",
        accent: "Avanzado",
        items: [
          { name: "Next.js", level: "Advanced", note: "Estructura de aplicaciones, enrutamiento, límites servidor/cliente y optimización de rendimiento." },
          { name: "React", level: "Advanced", note: "Arquitectura de componentes, manejo de estado y sistemas de diseño reutilizables." },
          { name: "Vue", level: "Advanced", note: "Frameworks progresivos y composición modular de componentes." },
          { name: "TypeScript", level: "Advanced", note: "Interfaces tipadas que mantienen el código legible, predecible y seguro al escalar." },
          { name: "Tailwind", level: "Advanced", note: "Estilos orientados a utilidades para desarrollo de UI ágil y consistente." },
          { name: "Framer Motion", level: "Intermediate", note: "Animaciones declarativas para transiciones y microinteracciones." },
          { name: "GSAP", level: "Intermediate", note: "Animaciones narrativas, coreografía de scroll y revelaciones controladas." },
          { name: "Lenis", level: "Intermediate", note: "Scroll suave que otorga una sensación cinemática y editorial al sitio." },
        ],
      },
      {
        index: "02",
        title: "Backend y Datos",
        eyebrow: "APIs, persistencia y estructura",
        description:
          "Me gusta construir sistemas sencillos de razonar. Esquemas limpios, APIs predecibles y un manejo prudente de datos evitan fricciones costosas más adelante.",
        accent: "Avanzado",
        items: [
          { name: "Node.js", level: "Advanced", note: "Lógica de servidor, orquestación de servicios y comportamiento robusto de APIs." },
          { name: "Python", level: "Advanced", note: "Scripts de automatización, servicios backend y procesamiento de datos para productos reales." },
          { name: "Django", level: "Intermediate", note: "Aplicaciones web estructuradas y flujos de trabajo con panel administrativo." },
          { name: "Java", level: "Learning", note: "Fundamentos de un ecosistema backend fuertemente tipado (nivel inicial)." },
          { name: "Go", level: "Intermediate", note: "Servicios concurrentes y APIs de alto rendimiento para cargas de producción." },
          { name: "PHP", level: "Intermediate", note: "Backends web pragmáticos e integración con ecosistemas existentes." },
          { name: "REST APIs", level: "Advanced", note: "Endpoints confiables diseñados con contratos de interfaz claros." },
          { name: "PostgreSQL", level: "Advanced", note: "Bases de datos relacionales sólidas para proyectos escalables." },
          { name: "Redis", level: "Intermediate", note: "Caché, almacenamiento efímero y coordinación rápida entre microservicios." },
        ],
      },
      {
        index: "03",
        title: "Nube e Infraestructura",
        eyebrow: "Despliegue y pensamiento operacional",
        description:
          "La infraestructura es parte de la experiencia de producto. Me concentro en despliegues confiables y arquitecturas de hosting que facilitan el mantenimiento para equipos reales.",
        accent: "Intermedio",
        items: [
          { name: "Docker", level: "Intermediate", note: "Entornos portátiles y transiciones limpias entre etapas de desarrollo." },
          { name: "AWS", level: "Advanced", note: "Servicios principales en la nube para sistemas de nivel productivo." },
          { name: "Vercel", level: "Intermediate", note: "Hosting optimizado para frontends modernos y arquitectura serverless." },
          { name: "OCI", level: "Intermediate", note: "Servicios empresariales de nube y datos para entornos de producción." },
          { name: "Redis", level: "Intermediate", note: "Caché administrada y servicios ultrarrápidos en memoria en la nube." },
        ],
      },
      {
        index: "04",
        title: "IA, Integraciones y Automatización",
        eyebrow: "Potenciando la utilidad del producto",
        description:
          "Uso integraciones para simplificar flujos de trabajo, no para hacerlos más complejos. Incluye mensajería, correo, modelos de IA y herramientas para necesidades reales del usuario.",
        accent: "Intermedio",
        items: [
          { name: "WhatsApp API", level: "Intermediate", note: "Comunicación operacional y gestión de transacciones en tiempo real." },
          { name: "Postman", level: "Intermediate", note: "Pruebas de endpoints y documentación de flujos de integración." },
          { name: "Stripe API", level: "Intermediate", note: "Flujos de cobro e integración de modelos de monetización." },
          { name: "Zapier", level: "Intermediate", note: "Automatizaciones low-code para vincular procesos de negocio y producto." },
          { name: "OCI Data Science", level: "Learning", note: "Herramientas de ciencia de datos y experimentación administrada en OCI." },
          { name: "OCI Forecasting", level: "Learning", note: "Servicios de predicción y planificación comercial." },
          { name: "Vector Search", level: "Learning", note: "Exploración de recuperación semántica y flujos de búsqueda avanzada." },
          { name: "RAG Systems", level: "Learning", note: "Estudio de asistentes respaldados por recuperación de conocimiento estructurado." },
        ],
      },
      {
        index: "05",
        title: "Negocios y Habilidades Blandas",
        eyebrow: "Donde el aspecto técnico se vuelve valioso",
        description:
          "Esta es la capa que da mayor solidez a mi perfil: comunicación, pensamiento crítico y contexto comercial global. No abordo el desarrollo como un técnico aislado, sino entendiendo la operación, las personas y los objetivos de negocio.",
        accent: "Avanzado",
        items: [
          { name: "Comercio Internacional", level: "Advanced", note: "Perspectiva comercial y global que influye en cómo analizo requerimientos y restricciones." },
          { name: "Pensamiento de Producto", level: "Advanced", note: "Diseño de funcionalidades con valor claro y resultados medibles." },
          { name: "Análisis de Requerimientos", level: "Advanced", note: "Traducción de ideas abstractas a criterios de aceptación y alcance concreto." },
          { name: "Conciencia Financiera", level: "Advanced", note: "Comprensión de costos unitarios, margen y viabilidad comercial." },
          { name: "Liderazgo", level: "Advanced", note: "Orientación a equipos, toma de decisiones y rendición de cuentas." },
          { name: "Aprendizaje Continuo", level: "Advanced", note: "Hábito constante de perfeccionar sistemas, habilidades y criterio de producto." },
          { name: "Gestión del Tiempo", level: "Advanced", note: "Priorización rigurosa y entregas con cadencia predecible." },
          { name: "Inteligencia Emocional", level: "Advanced", note: "Empatía práctica hacia compañeros de equipo y partes interesadas." },
        ],
      },
      {
        index: "06",
        title: "Explorando Actualmente",
        eyebrow: "Lo que busco profundizar a continuación",
        description:
          "Mantengo un carril de aprendizaje activo para herramientas que elevan la calidad técnica o amplían mi rango creativo. Me interesa experimentar con tecnologías que aportan expresividad e inteligencia a los sistemas.",
        accent: "Aprendiendo",
        items: [
          { name: "Rust", level: "Learning", note: "Fundamentos más profundos a nivel de sistemas y pensamiento orientado a alto rendimiento." },
          { name: "Three.js", level: "Learning", note: "Experiencias 3D y visuales interactivas más expresivas en la web." },
          { name: "llama.cpp", level: "Learning", note: "Flujos de IA locales y experimentación con modelos compactos." },
          { name: "Ajuste Fino de Modelos", level: "Learning", note: "Adaptación de modelos de lenguaje a casos de uso y contextos específicos." },
          { name: "Diseño de Flujos", level: "Learning", note: "Acercamiento entre el contexto comercial de producto y las decisiones técnicas." },
        ],
      },
    ],
  },
  certifications: {
    tag: "04",
    heading: "Certificaciones Profesionales.",
    oracleTitle: "Certificaciones Oracle",
    awsTitle: "Certificaciones AWS (En progreso)",
    credlyText: "Verifica todas las certificaciones e insignias digitales en Credly:",
    credlyButton: "Ver todas las insignias",
  },
  process: {
    tag: "05",
    heading: "Cómo trabajo.",
    steps: [
      {
        num: "01",
        title: "Descubrimiento",
        body: "Explicas el problema. Yo hago las preguntas indicadas. El diseño del esquema de datos inicia aquí, nunca a mitad del desarrollo.",
      },
      {
        num: "02",
        title: "Arquitectura",
        body: "BD → API → UI. En ese orden, siempre. Las decisiones tempranas evitan reescrituras tardías.",
      },
      {
        num: "03",
        title: "Construcción",
        body: "Iteraciones rápidas con vistas previas reales. Ves progreso, no promesas. Entrego software funcional, no solo especificaciones.",
      },
      {
        num: "04",
        title: "Lanzamiento",
        body: "Desplegado, monitoreado y documentado. A partir de ahí, trazamos los siguientes pasos.",
      },
    ],
    traits: [
      "Comunicación asíncrona",
      "Entregas a tiempo",
      "Comunicación directa",
      "CST — Ciudad de México",
    ],
  },
  contact: {
    headingLine1: "Hagamos algo",
    headingLine2: "juntos.",
    tagline: "Si tienes algo que construir, te escucho.",
    emailLabel: "elian.mejiag@gmail.com",
    emailAria: "Enviar correo a Elian Mejia",
  },
  footer: {
    name: "Elian Mejia",
    copy: "© 2026",
  },
  preloader: {
    skip: "saltar",
    ariaLoading: "Cargando",
    skipAria: "Saltar introducción",
  },
};
