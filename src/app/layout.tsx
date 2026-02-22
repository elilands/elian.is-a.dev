/* src/app/globals.css */
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;600;800&family=Overpass+Mono:wght@300;400;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');

/* Nota: Usamos Playfair Display temporalmente desde Google Fonts como sustituto 
  gratuito y rápido de Tiempos Headline para esta demo. 
*/

:root {
  /* Paleta: Órbita Comercial */
  --bg-deep: #0D0C0B;
  --bg-basalt: #171513;
  --surface-earth: #262320;
  --border-taupe: #3A3530;
  --text-muted: #8A7E72;
  --text-body: #BAAFA2;
  --text-title: #F2ECE4;
  --accent-terra: #E05A3D;
  --accent-hover: #F27A61;
  --accent-data: #4A90E2;

  /* Tipografía fluida (Clamp) */
  --font-title: 'Playfair Display', serif;
  --font-body: 'Manrope', sans-serif;
  --font-code: 'Overpass Mono', monospace;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--bg-deep);
  color: var(--text-body);
  font-family: var(--font-body);
  line-height: 1.6;
  overflow-x: hidden;
  /* Suavizado de fuentes para pantallas de alta resolución */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Sistema de Rejilla Base (12 Columnas) */
.grid-maestra {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

@media (min-width: 641px) {
  .grid-maestra {
    grid-template-columns: repeat(8, 1fr);
    padding: 4rem;
  }
}

@media (min-width: 1025px) {
  .grid-maestra {
    grid-template-columns: repeat(12, 1fr);
    padding: 6rem;
  }
}

/* Clases utilitarias para la demo */
.demo-header {
  grid-column: 1 / -1;
  border-bottom: 1px solid var(--border-taupe);
  padding-bottom: 2rem;
  margin-bottom: 2rem;
}

.titulo-principal {
  font-family: var(--font-title);
  font-size: clamp(2.5rem, 6vw, 5.5rem);
  color: var(--text-title);
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.acento-terracota {
  color: var(--accent-terra);
  font-style: italic;
}

.demo-contenido {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

@media (min-width: 1025px) {
  .demo-contenido {
    grid-column: 2 / 12;
  }
}

.texto-presentacion {
  font-size: clamp(1.125rem, 2vw, 1.5rem);
  font-weight: 300;
  max-width: 65ch;
  color: var(--text-body);
}

.caja-codigo {
  background-color: var(--bg-basalt);
  border: 1px solid var(--border-taupe);
  padding: 2rem;
  border-radius: 4px;
  font-family: var(--font-code);
  font-size: 0.9rem;
  color: var(--text-muted);
  overflow-x: auto;
}

.caja-codigo span {
  color: var(--accent-data);
}

/* Paleta de colores visual */
.contenedor-paleta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2rem;
}

.color-swatch {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-taupe);
  transition: transform 0.3s ease;
}

.color-swatch:hover {
  transform: translateY(-10px);
}