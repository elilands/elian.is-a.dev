<div align="center">

.・゜゜・　　・゜゜・．

<pre>
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│   ✦ E L I A N   M E J I A   G A L L A R D O ✦                          │
│   Full-stack product engineer & frontend developer                     │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
</pre>

<img src="https://avatars.githubusercontent.com/u/200657788?v=4" width="130" style="border-radius:100%; border: 1px solid #F0EEE9; margin-bottom: 15px;" alt="Elian Mejia Gallardo" />

# elian.is-a.dev
**Frontend & product engineering portfolio** ⋆｡˚ ☁︎ ˚｡⋆

[![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=000000)](https://gsap.com/)
[![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=threedotjs&logoColor=white)](https://threejs.org/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![Location](https://img.shields.io/badge/Mexico_City-F0EEE9?style=for-the-badge&logo=googlemaps&logoColor=black)](#)

[ **Visit the live site ↗** ](https://elian.is-a.dev)

.・゜゜・　　・゜゜・．

</div>

## ✦ About this repository

This repository houses the production source code for my personal portfolio website at [elian.is-a.dev](https://elian.is-a.dev). It is not designed as a template, a starter pack, or a boilerplate for public distribution. It is a highly tailored, custom-built environment built to showcase my capabilities as a professional full-stack software developer and product engineer. 

The visibility of this project serves to offer absolute transparency into my coding standards, architectural decisions, and to reinforce the SEO and indexing of my personal domain. The core objective is to guide visitors toward the live interactive experience, rather than encouraging forks or code replication.

> ⚠️ **License notice:** This source code is published exclusively for public inspection and technical reference. Copying, modifying, redistributing, or adapting this software for other deployment environments without explicit written consent from the author is strictly prohibited. Detailed terms can be found in the `LICENSE` file.

<br>
⸻
<br>

## ✧ Who I am and my approach

Hi, I am Elian Mejia Gallardo, a full-stack product engineer based in Mexico City. ☕︎

My professional identity exists at the precise intersection of advanced frontend development, robust system architecture, and international business strategy. Currently pursuing a degree in International Commerce and Business at the Escuela Bancaria y Comercial (EBC), I approach product development with a deep, systemic understanding of global logistics, supply chain constraints, real-world market dynamics, and operational margins.

I build tech products rooted in business logic, critical reasoning, and execution discipline. I specialize in bridging the communication gap between core engineering teams and non-technical stakeholders, actively owning product trade-offs, architecture decisions, and lifecycle ownership. I prioritize high-end minimalist digital aesthetics, ensuring every interface is both highly functional and visually deliberate.

<br>
⸻
<br>

## ⚙︎ Tech stack and engineering focus

The application is engineered leveraging a modern, performance-critical stack optimized for exceptional core web vitals, strict type safety, and fluid interactions.

| Layer | Technology & Focus |
| :--- | :--- |
| **Framework** ⌗ | Next.js 16 (App Router, Turbopack compilation) |
| **Language** ⌗ | TypeScript (Strict compilation mode) |
| **UI Core** ⌗ | React, component-driven modular architecture |
| **Motion** ⌗ | GSAP, ScrollTrigger, SplitText, Framer Motion |
| **Scroll** ⌗ | Lenis (Unified singleton wrapper for programmatic control) |
| **3D / WebGL** ⌗ | Three.js, @react-three/fiber custom canvas abstractions |
| **Media** ⌗ | `next/image` pipelines, AVIF/WebP rendering, `sharp` optimization |
| **Infrastructure** ⌗ | Vercel deployment, Dockerized standalone builds, GitHub version control |
| **Data layers** ⌗ | MySQL / MariaDB relational integrations (broader ecosystem) |

<br>
⸻
<br>

## ✢ Architecture and motion system

The codebase prioritizes separation of concerns, ensuring high performance alongside heavy visual aesthetics. The design system incorporates elements like custom cursors and relies on precise color palettes, including the Pantone color Cloud Dancer (#F0EEE9), to achieve a cohesive, high-end minimalist digital aesthetic.

*   **↳ Centralized motion hooks:** GSAP configurations and ScrollTrigger bindings are localized to client-side modules, avoiding redundant initialization cycles.
*   **↳ Decoupled viewport listeners:** The custom Lenis orchestration layer allows disparate components to broadcast scroll commands without prop-drilling.
*   **↳ Lifecycle memory management:** All animation sequences are wrapped tightly inside localized React contexts or lifecycle hooks to ensure clean teardown phases.
*   **↳ Isomorphic rendering safety:** Interactive canvas and custom mouse vectors utilize explicit lazy loading strategies (`ssr: false`) to safeguard server-side structural hydration.

<br>
⸻
<br>

## 🗂 Project structure

```text
╭─ src/
│  ├─ app/
│  │  ├─ layout.tsx          ✧ App shell & global SEO metadata
│  │  └─ page.tsx            ✧ Composition matrix
│  │
│  ├─ components/
│  │  ├─ layout/             ✧ Navbar & ClientProviders (ssr: false)
│  │  ├─ sections/           ✧ Hero, About, Projects, Skills, Process
│  │  └─ canvas/             ✧ ParticleCanvas & 3D environments
│  │
│  └─ lib/
│     ├─ gsap.ts             ✧ Centralized animation plugins
│     └─ lenisInstance.ts    ✧ Single-instance viewport scroll
╰─────────────────────────────────────────────────────────────

```

## ✦ Highlighted projects

**Omyu — your intelligent life companion** ⋆

A productivity and wellness ecosystem integrating AI-driven journaling and habit tracking. The platform utilizes cognitive behavioral frameworks and specialized AI roleplay nodes, allowing users to train for scenarios like salary negotiations or conflict resolution. Engineered with TypeScript and MariaDB, it features automated personality graphing, task vectors, and an asynchronous linguistic decoder built specifically for neurodivergent accessibility.

**Study Edu Cout — English certification platform & portal** ⋆

A high-conversion marketing architecture and educational management portal optimized for standardized language examinations. The system integrates programmatic SMTP relays for direct student communication. The independent LMS module acts as a proprietary alternative to platforms like Moodle, introducing granular role-based access control and centralized grade books.

**Fixit Ya — AI-powered home services** ⋆

A chat-to-service orchestration platform allowing users to book residential repairs, electrical, and plumbing services through a highly specialized conversational interface. The engine records geographic routing and interfaces directly with high-performance LLM APIs via SiliconFlow abstraction layers.

**Cartia — restaurant management and delivery platform** ⋆

An independent logistics and digital ordering ecosystem built to circumvent aggressive third-party delivery service fees. Incorporates stateful, dynamic web menus alongside a comprehensive back-office dashboard monitoring automated order fulfillment triggered exclusively via WhatsApp API vectors.

## ✧ Certifications and continuous learning

To back the technical implementation with standardized industry knowledge, I maintain an active focus on professional cloud and architecture certifications:

* **↳ Oracle Cloud Infrastructure (OCI):** OCI AI Foundations, OCI DevOps Professional.
* **↳ Enterprise systems:** HCM Process, ERP Process.
* **↳ Languages:** Oxford Test of English (B2/C1 proficiency standards).

## ✦ Files of interest

To rapidly audit my development practices, explore the following architectural entry points:

| File path | Functional overview |
| --- | --- |
| `next.config.ts` | Edge optimization rules, asset handling, headers, standalone compilation flags |
| `src/app/layout.tsx` | Metadata injection, semantic tag organization, global font optimization mappings |
| `src/app/page.tsx` | Main application layout compiling individual structural components |
| `src/components/sections/Hero/Hero.tsx` | Entry timeline orchestration, lifecycle hooks, and viewports |
| `src/components/sections/About/About.tsx` | Viewport-bound text transformations and strategic values presentation |
| `src/components/sections/Projects/Projects.tsx` | Data models and stagger configurations for complex portfolio grids |
| `src/components/canvas/ParticleCanvas/ParticleCanvas.tsx` | Custom high-performance math models mapping hardware cursor vectors |

⋆｡°✩ ⋆｡°✩ ⋆｡°✩

This repository documents the technical implementation of [elian.is-a.dev](https://elian.is-a.dev).

To experience the visual and motion systems as intended, visit the live web application.

Designed and developed by **Elian Mejia Gallardo** · Mexico City

© 2025–2026 Elian Mejia Gallardo. All rights reserved. See `LICENSE`.