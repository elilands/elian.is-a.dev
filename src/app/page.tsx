// src/app/page.tsx
import React from 'react';

export default function PaginaDemo() {
  return (
    <main className="grid-maestra">
      <header className="demo-header">
        <h1 className="titulo-principal">
          Estratega Logístico <br />
          <span className="acento-terracota">Digital.</span>
        </h1>
      </header>

      <section className="demo-contenido">
        <p className="texto-presentacion">
          Soy Elian. Formado en la Escuela Bancaria y Comercial (EBC), entiendo
          que el código no es solo sintaxis; es la infraestructura que sostiene
          el comercio global. Traduzco estrategias de negocios internacionales en 
          arquitecturas web de alto rendimiento.
        </p>

        <div>
          <h2 style={{ fontFamily: 'var(--font-title)', color: 'var(--text-title)', marginBottom: '1rem', fontSize: '2rem' }}>
            Lógica de Negocios (EBC) x Código
          </h2>
          <div className="caja-codigo">
            <pre>
              <code>
                {`// Optimizando la conexión entre clientes y profesionales (fixitya.com)
const evaluarImpactoComercial = (perfilTecnico: Perfil, necesidadesCliente: string) => {
  if (!perfilTecnico || !necesidadesCliente) {
    throw new Error('Faltan datos para la operación logística.');
  }
  
  // Procesamiento con IA para llenado de formularios
  const matcheoOptimo = `}<span>siliconFlow.analizar</span>{`(perfilTecnico, necesidadesCliente);
  
  return matcheoOptimo;
};`}
              </code>
            </pre>
          </div>
        </div>

        <div>
          <h2 style={{ fontFamily: 'var(--font-title)', color: 'var(--text-title)', marginBottom: '1rem', fontSize: '2rem' }}>
            Órbita Comercial: Análisis de Color
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>Pasa el cursor sobre los nodos de color.</p>
          <div className="contenedor-paleta">
            <div className="color-swatch" style={{ backgroundColor: 'var(--bg-deep)' }} title="Deep Space"></div>
            <div className="color-swatch" style={{ backgroundColor: 'var(--bg-basalt)' }} title="Basalt"></div>
            <div className="color-swatch" style={{ backgroundColor: 'var(--surface-earth)' }} title="Earth"></div>
            <div className="color-swatch" style={{ backgroundColor: 'var(--border-taupe)' }} title="Taupe"></div>
            <div className="color-swatch" style={{ backgroundColor: 'var(--text-muted)' }} title="Muted"></div>
            <div className="color-swatch" style={{ backgroundColor: 'var(--text-body)' }} title="Body Text"></div>
            <div className="color-swatch" style={{ backgroundColor: 'var(--text-title)' }} title="Title Text"></div>
            <div className="color-swatch" style={{ backgroundColor: 'var(--accent-terra)' }} title="Terracotta Accent"></div>
            <div className="color-swatch" style={{ backgroundColor: 'var(--accent-hover)' }} title="Hover Accent"></div>
            <div className="color-swatch" style={{ backgroundColor: 'var(--accent-data)' }} title="Data Blue"></div>
          </div>
        </div>
      </section>
    </main>
  );
}