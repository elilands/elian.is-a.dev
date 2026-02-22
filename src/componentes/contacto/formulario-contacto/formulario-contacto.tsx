// src/componentes/contacto/formulario-contacto/formulario-contacto.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Send } from 'lucide-react';
import estilos from './formulario-contacto.module.css';

interface PropsFormulario {
  alCerrar: () => void;
}

export default function FormularioContacto({ alCerrar }: PropsFormulario) {
  const [estadoEnvio, setEstadoEnvio] = useState<'ocioso' | 'enviando' | 'exito'>('ocioso');
  
  const [datos, setDatos] = useState({ nombre: '', email: '', mensaje: '' });
  const [errores, setErrores] = useState({ nombre: '', email: '', mensaje: '', general: '' });

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const manejarEscape = (e: KeyboardEvent) => { if (e.key === 'Escape') alCerrar(); };
    window.addEventListener('keydown', manejarEscape);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', manejarEscape); };
  }, [alCerrar]);

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDatos(prev => ({ ...prev, [name]: value }));
    if (errores[name as keyof typeof errores]) {
      setErrores(prev => ({ ...prev, [name]: '', general: '' }));
    }
  };

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Validación Frontend
    let esValido = true;
    const nuevosErrores = { nombre: '', email: '', mensaje: '', general: '' };

    if (!datos.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es necesario para saber a quién me dirijo.';
      esValido = false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!datos.email.trim()) {
      nuevosErrores.email = 'El correo electrónico es obligatorio para poder responderte.';
      esValido = false;
    } else if (!emailRegex.test(datos.email)) {
      nuevosErrores.email = 'Por favor, ingresa un formato de correo válido.';
      esValido = false;
    }

    if (!datos.mensaje.trim()) {
      nuevosErrores.mensaje = 'Por favor, incluye un mensaje o detalle de tu propuesta.';
      esValido = false;
    }

    setErrores(nuevosErrores);
    if (!esValido) return;

    // 2. Transmisión a la API SMTP
    setEstadoEnvio('enviando');
    
    try {
      const respuesta = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos),
      });

      if (!respuesta.ok) {
        throw new Error('La transmisión fue rechazada por el servidor.');
      }

      setEstadoEnvio('exito');
    } catch (error) {
      console.error('Error de red:', error);
      setErrores(prev => ({ 
        ...prev, 
        general: 'Hubo una interrupción en la red. Por favor, intenta de nuevo o contáctame por LinkedIn.' 
      }));
      setEstadoEnvio('ocioso');
    }
  };

  return (
    <motion.div
      className={estilos['takeover-contacto']}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={estilos['marca-agua']}>CONTACTO</div>

      <div className={estilos['grid-contacto']}>
        {/* Columna Izquierda: Redes */}
        <div className={estilos['columna-enlaces']}>
          <h3 className={estilos['titulo-seccion']}>Redes Profesionales</h3>
          <a href="https://www.linkedin.com/in/elianisadev/" target="_blank" rel="noopener noreferrer" className={estilos['enlace-externo']}>
            <Linkedin size={40} strokeWidth={1} /> LinkedIn
          </a>
          <a href="https://github.com/ellyaisaurus" target="_blank" rel="noopener noreferrer" className={estilos['enlace-externo']}>
            <Github size={40} strokeWidth={1} /> GitHub
          </a>
        </div>

        {/* Columna Derecha: Formulario Conectado */}
        <div className={estilos['columna-formulario']}>
          <h3 className={estilos['titulo-seccion']}>Mensaje Directo</h3>
          
          <AnimatePresence mode="wait">
            {estadoEnvio !== 'exito' ? (
              <motion.form 
                key="formulario"
                onSubmit={manejarEnvio}
                noValidate
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
              >
                <div className={estilos['grupo-input']}>
                  <label className={estilos['etiqueta-input']}>Nombre Completo</label>
                  <input 
                    type="text" name="nombre" value={datos.nombre} onChange={manejarCambio}
                    className={`${estilos['input-terminal']} ${errores.nombre ? estilos['input-error'] : ''}`} 
                    placeholder="Ej. Carlos Mendoza" disabled={estadoEnvio === 'enviando'} 
                  />
                  {errores.nombre && <span className={estilos['texto-error']}>{errores.nombre}</span>}
                </div>
                
                <div className={estilos['grupo-input']}>
                  <label className={estilos['etiqueta-input']}>Correo Electrónico</label>
                  <input 
                    type="email" name="email" value={datos.email} onChange={manejarCambio}
                    className={`${estilos['input-terminal']} ${errores.email ? estilos['input-error'] : ''}`} 
                    placeholder="correo@empresa.com" disabled={estadoEnvio === 'enviando'} 
                  />
                  {errores.email && <span className={estilos['texto-error']}>{errores.email}</span>}
                </div>
                
                <div className={estilos['grupo-input']}>
                  <label className={estilos['etiqueta-input']}>Mensaje o Propuesta</label>
                  <textarea 
                    name="mensaje" value={datos.mensaje} onChange={manejarCambio}
                    className={`${estilos['input-terminal']} ${errores.mensaje ? estilos['input-error'] : ''}`} 
                    placeholder="Detalla brevemente cómo podemos colaborar..." disabled={estadoEnvio === 'enviando'} 
                  />
                  {errores.mensaje && <span className={estilos['texto-error']}>{errores.mensaje}</span>}
                </div>

                {errores.general && (
                  <div style={{ padding: '1rem', border: '1px solid #E11D48', color: '#E11D48', fontFamily: 'var(--font-code)', fontSize: '0.85rem' }}>
                    [ ERROR ]: {errores.general}
                  </div>
                )}

                <div className={estilos['panel-controles']}>
                  <button type="button" onClick={alCerrar} className={estilos['btn-cerrar']}>
                    Cancelar
                  </button>
                  <button type="submit" className={estilos['btn-enviar']} disabled={estadoEnvio === 'enviando'}>
                    {estadoEnvio === 'enviando' ? 'Procesando...' : 'Enviar Mensaje'}
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div 
                key="exito" className={estilos['mensaje-exito']}
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              >
                <Send color="var(--accent-data)" size={64} strokeWidth={1} />
                <h4 className={estilos['texto-exito']}>Mensaje Enviado</h4>
                <p className={estilos['subtexto-exito']}>
                  Gracias por comunicarte. He recibido tu mensaje en mi servidor seguro y me pondré en contacto contigo lo más pronto posible.
                </p>
                <button onClick={alCerrar} className={estilos['btn-enviar']} style={{ marginTop: '2rem' }}>
                  Volver al Inicio
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}