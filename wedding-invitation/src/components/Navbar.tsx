"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { scrollToSection } from "@/lib/utils";
import { eventConfig } from "@/config/eventConfig";

const navLinks = [
  { label: "Inicio",      id: "hero" },
  { label: "Nuestra Historia", id: "historia" },
  { label: "Info",        id: "info" },
  { label: "Itinerario",  id: "itinerario" },
  { label: "RSVP",        id: "rsvp" },
  { label: "Contacto",    id: "contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (id: string) => {
    setMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-cream/95 backdrop-blur-sm shadow-sm border-b border-burgundy/10"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto max-w-6xl px-5 sm:px-8 h-16 flex items-center justify-between">
        {/* Monogram */}
        <button
          onClick={() => handleNav("hero")}
          className={cn(
            "font-icon text-2xl transition-colors",
            scrolled ? "text-burgundy" : "text-cream"
          )}
          aria-label="Ir al inicio"
        >
          {eventConfig.couple.monogram}
        </button>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => handleNav(link.id)}
                className={cn(
                  "font-cinzel text-xs tracking-widest uppercase transition-colors",
                  "hover:opacity-70",
                  scrolled ? "text-burgundy" : "text-cream"
                )}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger */}
        <button
          className={cn(
            "md:hidden flex flex-col gap-1.5 p-2 transition-colors",
            scrolled ? "text-burgundy" : "text-cream"
          )}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
        >
          <span className={cn("block h-px w-6 bg-current transition-transform", menuOpen && "rotate-45 translate-y-2")} />
          <span className={cn("block h-px w-6 bg-current transition-opacity", menuOpen && "opacity-0")} />
          <span className={cn("block h-px w-6 bg-current transition-transform", menuOpen && "-rotate-45 -translate-y-2")} />
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-cream/98 backdrop-blur-sm border-t border-burgundy/10 shadow-lg">
          <ul className="flex flex-col py-4">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleNav(link.id)}
                  className="w-full px-8 py-3 text-left font-cinzel text-xs tracking-widest uppercase text-burgundy hover:bg-burgundy/5 transition-colors"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
