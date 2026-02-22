"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Phase = "idle" | "shaking" | "burst" | "fading";

interface PolaroidConfig {
  translateX: string;
  translateY: string;
  rotate: string;
  delay: string;
}

const POLAROIDS: PolaroidConfig[] = [
  { translateX: "-175px", translateY: "-135px", rotate: "-14deg", delay: "0ms"   },
  { translateX: "5px",    translateY: "-210px", rotate: "2deg",   delay: "80ms"  },
  { translateX: "180px",  translateY: "-115px", rotate: "12deg",  delay: "160ms" },
];

interface Props {
  onComplete: () => void;
}

export default function EnvelopeLanding({ onComplete }: Props) {
  const [phase, setPhase] = useState<Phase>("idle");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const handleOpen = () => {
    if (phase !== "idle") return;

    setPhase("shaking");

    timers.current = [
      setTimeout(() => setPhase("burst"),   400),
      setTimeout(() => setPhase("fading"),  1700),
      setTimeout(() => onComplete(),         2450),
    ];
  };

  useEffect(() => {
    return () => timers.current.forEach(clearTimeout);
  }, []);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Abrir invitación de boda"
      onClick={handleOpen}
      onKeyDown={(e) => e.key === "Enter" && handleOpen()}
      className={`
        fixed inset-0 z-[100] flex flex-col items-center justify-center
        cursor-pointer select-none bg-cream
        transition-opacity duration-700 ease-in-out
        ${phase === "fading" ? "opacity-0 pointer-events-none" : "opacity-100"}
      `}
    >
      {/* ── Envelope + polaroids container ───────────────────────── */}
      <div
        className={`
          relative flex items-center justify-center will-change-transform
          ${phase === "idle"    ? "animate-envelope-float" : ""}
          ${phase === "shaking" ? "animate-envelope-shake" : ""}
        `}
      >
        {/* ── Polaroid cards (burst on click) ──────────────────────── */}
        {POLAROIDS.map((p, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-[115px] sm:w-[135px] bg-white shadow-2xl z-30"
            style={{
              transform:
                phase === "burst" || phase === "fading"
                  ? `translate(calc(-50% + ${p.translateX}), calc(-50% + ${p.translateY})) rotate(${p.rotate}) scale(1)`
                  : `translate(-50%, -50%) rotate(0deg) scale(0)`,
              opacity: phase === "burst" || phase === "fading" ? 1 : 0,
              transition: `
                transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${p.delay},
                opacity   0.25s ease ${p.delay}
              `,
            }}
          >
            {/* Photo area — TODO: replace gradient with real couple photo via Next.js <Image> */}
            <div className="m-[6px] mb-0 h-[95px] sm:h-[110px] bg-gradient-to-br from-burgundy/10 to-cream-dark flex items-center justify-center overflow-hidden">
              <span className="text-3xl opacity-20" aria-hidden>📷</span>
            </div>
            {/* Polaroid bottom white strip */}
            <div className="h-[28px]" />
          </div>
        ))}

        {/* ── Envelope SVG ─────────────────────────────────────────── */}
        {/*
            Place your SVG at: public/svgs/envelope.svg
            Recommended: keep original viewBox, remove fixed width/height attrs
        */}
        <div
          className={`
            relative z-20 transition-transform duration-300
            ${phase === "shaking" || phase === "burst" || phase === "fading"
              ? "scale-[1.05]"
              : "scale-100"}
          `}
        >
          <Image
            src="/svgs/envelope.svg"
            alt="Sobre de invitación de boda Jessika &amp; Randy"
            width={320}
            height={230}
            className="w-[250px] sm:w-[320px] h-auto drop-shadow-xl"
            priority
          />
        </div>

        {/* ── Wax Seal SVG (breaks on click) ───────────────────────── */}
        {/*
            Place your SVG at: public/svgs/wax-seal.svg
            It will be positioned over the envelope flap center
        */}
        <div className="absolute inset-0 flex items-end justify-center z-40 pb-[14%]">
          <Image
            src="/svgs/wax-seal.svg"
            alt="Sello de cera JR"
            width={80}
            height={80}
            className="w-[62px] sm:w-[78px] h-auto drop-shadow-md"
            style={{
              transform:
                phase !== "idle"
                  ? "scale(0) rotate(65deg)"
                  : "scale(1) rotate(0deg)",
              opacity:   phase !== "idle" ? 0 : 1,
              transition:
                "transform 0.28s cubic-bezier(0.55, 0, 1, 0.45), opacity 0.22s ease",
            }}
          />
        </div>
      </div>

      {/* ── "Toca para abrir" hint ───────────────────────────────── */}
      <p
        className={`
          absolute bottom-12 font-cinzel text-[11px] tracking-[0.28em] uppercase
          text-burgundy/45 transition-opacity duration-300
          ${phase !== "idle" ? "opacity-0" : "opacity-100"}
        `}
      >
        Toca para abrir
      </p>
    </div>
  );
}
