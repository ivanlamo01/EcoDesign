"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="  my-8 mx-4 md:mx-8 h-screen">
      <div className="container mx-auto px-6 py-20 md:py-32 text-center">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight text-white">
          ¿Buscás aberturas que marquen la diferencia?
        </h2>
        <p className="mt-6 text-lg max-w-3xl mx-auto text-gray-200">
          Desde el corazón de San Martín de los Andes, combinamos ingeniería,
          diseño y eficiencia energética para elevar la calidad de cada obra.
          Soluciones sustentables para construcciones inteligentes.
        </p>
        <div className="mt-10">
          <a
            href="#configurador"
            className="px-8 py-4 rounded-lg font-bold text-lg bg-[#004D40] text-white hover:bg-[#00382d] transition-colors"
          >
            Comenzar a Configurar mi Proyecto
          </a>
        </div>
      {/* Flecha animada hacia la siguiente sección */}
      <motion.a
        href="#diferenciales"
        className="mt-32 inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/30 text-white/90 hover:text-white hover:border-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
        aria-label="Ir a la siguiente sección"
        initial={{ y: 0, opacity: 0.85 }}
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Simple chevron */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.a>
      </div>
    </section>
  );
}
