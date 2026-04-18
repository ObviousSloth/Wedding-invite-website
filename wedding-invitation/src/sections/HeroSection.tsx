"use client";

import { useState } from "react";
import { eventConfig } from "@/config/eventConfig";

export default function HeroSection() {
  const [videoError, setVideoError] = useState(false);
  const { couple, hero } = eventConfig;

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

      {/* ── Top + bottom fade gradient (not a full wash) ─────── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          // inline style: complex multi-stop gradient not expressible as a single Tailwind class
          background:
            "linear-gradient(to bottom, rgba(61,5,9,0.65) 0%, transparent 35%, transparent 65%, rgba(61,5,9,0.55) 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── Hero content ───────────────────────────────────────── */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-6 py-32 gap-3">

        {/* Tagline above names */}
        <p className="font-cinzel text-cream/80 text-[10px] sm:text-xs tracking-[0.4em] uppercase">
          {hero.tagline}
        </p>

        {/* Decorative thin line */}
        <div className="w-px h-8 bg-cream/25 my-1" aria-hidden="true" />

        {/* Partner 1 name */}
        <h1 className="font-slight text-cream text-couple-name leading-none tracking-wide">
          {couple.partner1}
        </h1>

        {/* Ampersand divider */}
        <p
          className="font-slight italic text-cream/60 text-hero-amp leading-none"
          aria-hidden="true"
        >
          &amp;
        </p>

        {/* Partner 2 name */}
        <h1 className="font-slight text-cream text-couple-name leading-none tracking-wide">
          {couple.partner2}
        </h1>

        {/* Sub-tagline */}
        <div className="w-px h-8 bg-cream/25 my-1" aria-hidden="true" />
        <p className="font-seasons italic text-cream/70 text-sm sm:text-base">
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
          text-cream/40 hover:text-cream/80 active:text-cream
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
