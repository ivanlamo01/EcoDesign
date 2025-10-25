"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export default function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 8);
  });

  return (
    <motion.header
      variants={{
        transparent: {
          backgroundColor: "rgba(23,23,23,0)",
        },
        solid: {
          backgroundColor: "rgba(23,23,23,0.45)",
        },
      }}
      initial="transparent"
      animate={scrolled ? "solid" : "transparent"}
      transition={{ type: "tween", duration: 0.25 }}
      className={`sticky top-0 z-50 border ${
        scrolled ? "border-white/10 backdrop-blur-sm" : "border-transparent backdrop-blur-0"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          {/* Logo en /public (usa logo.svg por defecto) */}
          <img
            src="/logo.jpg"
            alt="EcoDesign PVC"
            width={120}
            height={56}
            className="h-12 md:h-14 w-auto"
          />
          <span className="sr-only">EcoDesign PVC</span>
        </div>

        <nav className="hidden md:flex space-x-6">
          {/* Anchor links kept for navigation; sections no longer rely on ids for JS behavior */}
          <a href="#diferenciales" className="text-white hover:text-[#004D40]">
            Diferenciales
          </a>
          <a href="#configurador" className="text-white hover:text-[#004D40]">
            Proyecto
          </a>
          <a href="#obras" className="text-white hover:text-[#004D40]">
            Obras
          </a>
          <a href="#contacto" className="text-white hover:text-[#004D40]">
            Contacto
          </a>
        </nav>

        <a
          href="#configurador"
          className="px-4 py-2 rounded-lg font-semibold bg-[#004D40] text-white hover:bg-[#00382d] transition-colors"
        >
          Iniciar Proyecto
        </a>
      </div>
    </motion.header>
  );
}
