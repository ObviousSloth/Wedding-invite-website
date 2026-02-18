"use client";

import { eventConfig } from "@/config/eventConfig";
import { scrollToSection } from "@/lib/utils";
import Button from "@/components/ui/Button";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video / Fallback background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      >
        {/* Replace /videos/hero.mp4 with your actual uploaded video */}
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 video-overlay" />

      {/* Wax seal — top right decorative element */}
      <div className="absolute top-24 right-8 md:right-16 opacity-30 hidden md:block">
        <div className="w-16 h-16 rounded-full border-2 border-cream flex items-center justify-center">
          <span className="font-icon text-cream text-xl">{eventConfig.couple.monogram}</span>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 flex flex-col items-center gap-6">
        {/* Tagline */}
        <p className="font-cinzel text-cream/80 tracking-[0.35em] uppercase text-xs md:text-sm">
          {eventConfig.hero.tagline}
        </p>

        {/* Names */}
        <h1 className="font-icon text-cream text-7xl md:text-9xl leading-tight">
          {eventConfig.couple.partner1}
          <span className="block font-seasons italic text-cream/70 text-3xl md:text-4xl my-1">&amp;</span>
          {eventConfig.couple.partner2}
        </h1>

        {/* Date */}
        <p className="font-seasons italic text-cream/80 text-xl md:text-2xl tracking-wide">
          {eventConfig.date.displayFull}
        </p>

        {/* Divider */}
        <div className="w-16 h-px bg-cream/40" />

        {/* CTA */}
        <Button
          variant="secondary"
          size="lg"
          onClick={() => scrollToSection("rsvp")}
          className="mt-2"
        >
          {eventConfig.hero.subTagline}
        </Button>

        {/* Scroll indicator */}
        <button
          onClick={() => scrollToSection("fecha")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/50 hover:text-cream transition-colors animate-float"
          aria-label="Desplazarse hacia abajo"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
