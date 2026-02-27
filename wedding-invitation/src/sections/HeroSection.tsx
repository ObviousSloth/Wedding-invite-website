"use client";

import { useState } from "react";
import { eventConfig } from "@/config/eventConfig";

export default function HeroSection() {
  const [videoError, setVideoError] = useState(false);
  const { couple, date, hero } = eventConfig;

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-label="Sección principal"
    >

      {/* ── Background: video → gradient fallback ──────────────── */}
      {!videoError ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={hero.fallbackImageUrl}
          onError={() => setVideoError(true)}
          className="absolute inset-0 w-full h-full object-cover z-0"
          aria-hidden="true"
        >
          <source src={hero.videoUrl} type="video/mp4" />
        </video>
      ) : (
        <div
          className="absolute inset-0 bg-gradient-to-b from-burgundy-dark via-burgundy to-burgundy-dark z-0"
          aria-hidden="true"
        />
      )}

      {/* ── Burgundy overlay ───────────────────────────────────── */}
      <div
        className="absolute inset-0 bg-burgundy/65 z-10"
        aria-hidden="true"
      />

      {/* ── Hero content ───────────────────────────────────────── */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-6 py-32 gap-0">

        {/* Top date line */}
        <p className="font-cinzel text-cream/70 text-[10px] sm:text-xs tracking-[0.4em] uppercase mb-6">
          {date.displayDayOfWeek}&nbsp;&nbsp;·&nbsp;&nbsp;
          {date.displayDay}&nbsp;de&nbsp;{date.displayMonth}&nbsp;del&nbsp;{date.displayYear}
        </p>

        {/* Decorative thin line */}
        <div className="w-px h-10 bg-cream/25 mb-8" aria-hidden="true" />

        {/* Couple names — fluid size from @theme --text-couple-name */}
        <h1 className="font-icon text-cream text-couple-name leading-none tracking-wide">
          {couple.partner1}
        </h1>

        {/* Ampersand divider — fluid size from @theme --text-hero-amp */}
        <p
          className="font-seasons italic text-cream/50 text-hero-amp my-1 sm:my-2"
          aria-hidden="true"
        >
          &amp;
        </p>

        <h1 className="font-icon text-cream text-couple-name leading-none tracking-wide">
          {couple.partner2}
        </h1>

        {/* Monogram + horizontal rules */}
        <div className="flex items-center gap-4 sm:gap-6 my-8 sm:my-10" aria-hidden="true">
          {/* <div className="h-px w-14 sm:w-24 bg-cream/30" /> */}
          {/* <span className="font-icon text-cream/40 text-2xl sm:text-3xl select-none">
            {couple.monogram}
          </span> */}
          {/* <div className="h-px w-14 sm:w-24 bg-cream/30" /> */}
        </div>

        {/* Tagline */}
        <p className="font-cinzel text-cream/90 text-[11px] sm:text-sm tracking-[0.55em] uppercase mb-3">
          {hero.tagline}
        </p>

        {/* Sub-tagline */}
        <p className="font-seasons italic text-cream/60 text-base sm:text-xl">
          {hero.subTagline}
        </p>

      </div>

      {/* ── Scroll-down indicator ──────────────────────────────── */}
      <a
        href="#fecha"
        aria-label="Desplazarse a la siguiente sección"
        className="
          absolute bottom-8 left-1/2 -translate-x-1/2 z-20
          flex flex-col items-center gap-2
          text-cream/40 hover:text-cream/80
          transition-colors duration-300
        "
      >
        <span className="font-cinzel text-[9px] tracking-[0.35em] uppercase">
          Descubrir
        </span>
        <svg
          className="w-[18px] h-[18px] animate-bounce"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </a>

    </section>
  );
}
