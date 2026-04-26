"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { eventConfig } from "@/config/eventConfig";
import styles from "./HeroSection.module.css";
import { useAudio } from "@/context/AudioContext";
import { useHeroAudio } from "@/hooks/useHeroAudio";

const CAROUSEL_IMAGES = [
  "/images/Hero/9B1EC8BB-77AF-4D72-AA90-375398ABCECC.png",
  "/images/Hero/BC305A12-0D80-45CD-9C5F-BA817E143B03.png",
  "/images/Hero/E6C35C48-DA40-4EE0-8856-C9F6D88C4207.png",
  "/images/Hero/E6C3442D-92AA-4211-A0BB-D11C3DC89F32.png",
  "/images/Hero/IMG_8332.png",
  "/images/Hero/IMG_8335.png",
  "/images/Hero/IMG_8337.png",
  "/images/Hero/IMG_8374.png",
  "/images/Hero/IMG_8375.png",
  "/images/Hero/IMG_8377.png",
  "/images/Hero/IMG_8423.png",
  "/images/Hero/IMG_8430.png",
  "/images/Hero/IMG_8433.png",
  "/images/Hero/IMG_8440.png",
];

const INTERVAL_MS = 4500;

export default function HeroSection() {
  const { couple, hero } = eventConfig;
  const [current, setCurrent] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const { enabled } = useAudio();
  useHeroAudio(enabled, heroRef);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % CAROUSEL_IMAGES.length);
  }, []);

  useEffect(() => {
    const id = setInterval(next, INTERVAL_MS);
    return () => clearInterval(id);
  }, [next]);

  return (
    <section
      id="inicio"
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-label="Sección principal"
    >

      {/* ── Carousel images ────────────────────────────────────── */}
      {CAROUSEL_IMAGES.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          aria-hidden="true"
          fill
          priority={i === 0}
          className={`${styles.slide} ${i === current ? styles.slideVisible : styles.slideHidden}`}
          sizes="100vw"
        />
      ))}

      {/* ── Gray overlay for text legibility ──────────────────── */}
      <div className={styles.overlay} aria-hidden="true" />

      {/* ── Top + bottom fade gradient ─────────────────────────── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
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
