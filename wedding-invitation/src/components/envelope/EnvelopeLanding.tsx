"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./EnvelopeLanding.module.css";

type Phase = "idle" | "shaking" | "burst" | "fading";

interface PolaroidConfig {
  tx:    string;
  ty:    string;
  rot:   string;
  delay: string;
}

const POLAROIDS: PolaroidConfig[] = [
  { tx: "-175px", ty: "-135px", rot: "-14deg", delay: "0ms"   },
  { tx: "5px",    ty: "-210px", rot: "2deg",   delay: "80ms"  },
  { tx: "180px",  ty: "-115px", rot: "12deg",  delay: "160ms" },
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
      setTimeout(() => setPhase("burst"),  400),
      setTimeout(() => setPhase("fading"), 1700),
      setTimeout(() => onComplete(),        2450),
    ];
  };

  useEffect(() => {
    return () => timers.current.forEach(clearTimeout);
  }, []);

  const isBurst = phase === "burst" || phase === "fading";

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

      {/* ── Envelope + polaroids container ─────────────────────── */}
      <div
        className={`
          relative flex items-center justify-center will-change-transform
          ${phase === "idle"    ? "animate-envelope-float" : ""}
          ${phase === "shaking" ? "animate-envelope-shake" : ""}
        `}
      >

        {/* ── Polaroid cards (burst on click) ────────────────────
            CSS custom props (--tx, --ty, --rot, --delay) carry
            the per-card positional data; all transitions live
            in EnvelopeLanding.module.css
        ─────────────────────────────────────────────────────── */}
        {POLAROIDS.map((p, i) => (
          <div
            key={i}
            className={`
              absolute top-1/2 left-1/2
              w-[115px] sm:w-[135px] bg-white shadow-2xl z-30
              ${styles.polaroid}
              ${isBurst ? styles.polaroidBurst : styles.polaroidIdle}
            `}
            style={{
              "--tx":    p.tx,
              "--ty":    p.ty,
              "--rot":   p.rot,
              "--delay": p.delay,
            } as React.CSSProperties}
          >
            {/* TODO: replace gradient with real couple photo via Next.js <Image> */}
            <div className="m-[6px] mb-0 h-[95px] sm:h-[110px] bg-gradient-to-br from-burgundy/10 to-cream-dark flex items-center justify-center overflow-hidden">
              <span className="text-3xl opacity-20" aria-hidden="true">📷</span>
            </div>
            {/* Polaroid white bottom strip */}
            <div className="h-[28px]" />
          </div>
        ))}

        {/* ── Envelope SVG ───────────────────────────────────────
            Place file at: public/svgs/envelope.svg
            Remove hardcoded width/height from <svg> root — keep viewBox only
        ─────────────────────────────────────────────────────── */}
        <div
          className={`
            relative z-20 transition-transform duration-300
            ${phase !== "idle" ? "scale-[1.05]" : "scale-100"}
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

        {/* ── Wax Seal SVG ───────────────────────────────────────
            Place file at: public/svgs/wax-seal.svg
            Positioned over envelope flap center
        ─────────────────────────────────────────────────────── */}
        <div className="absolute inset-0 flex items-end justify-center z-40 pb-[14%]">
          <Image
            src="/svgs/wax-seal.svg"
            alt="Sello de cera JR"
            width={80}
            height={80}
            className={`
              w-[62px] sm:w-[78px] h-auto drop-shadow-md
              ${styles.waxSeal}
              ${phase === "idle" ? styles.waxSealVisible : styles.waxSealHidden}
            `}
          />
        </div>

      </div>

      {/* ── "Toca para abrir" hint ─────────────────────────────── */}
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
