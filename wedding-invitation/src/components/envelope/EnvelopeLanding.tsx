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

// ── Continuous volcano eruption: 1 focal + 17 fan cards ─────────────
// Index 0 = FOCAL (hovers mid-air; camera rushes to it).
// Index 1–17 = eruption stream; delay = (i-1) * 90ms → 0–1440ms,
// creating a continuous ~2.1s volcanic burst.
interface SkeletonConfig { tx: string; ty: string; rot: string; w: string; h: string }

const SKELETONS: SkeletonConfig[] = [
  // 0 — focal
  { tx:    "0px", ty: "-255px", rot:  "-4deg", w: "115px", h: "155px" },
  // 1–4 inner column
  { tx:  "-55px", ty: "-740px", rot:  "-8deg", w:  "96px", h: "126px" },
  { tx:   "65px", ty: "-730px", rot:   "8deg", w:  "96px", h: "126px" },
  { tx: "-125px", ty: "-695px", rot: "-15deg", w: "102px", h: "132px" },
  { tx:  "135px", ty: "-685px", rot:  "13deg", w: "102px", h: "132px" },
  // 5–8 mid arc
  { tx: "-205px", ty: "-648px", rot: "-21deg", w:  "92px", h: "120px" },
  { tx:  "215px", ty: "-638px", rot:  "20deg", w:  "92px", h: "120px" },
  { tx: "-288px", ty: "-578px", rot: "-29deg", w:  "86px", h: "114px" },
  { tx:  "298px", ty: "-568px", rot:  "27deg", w:  "86px", h: "114px" },
  // 9–12 outer arc
  { tx: "-375px", ty: "-492px", rot: "-37deg", w:  "79px", h: "106px" },
  { tx:  "385px", ty: "-482px", rot:  "35deg", w:  "79px", h: "106px" },
  { tx: "-455px", ty: "-388px", rot: "-45deg", w:  "73px", h:  "98px" },
  { tx:  "465px", ty: "-378px", rot:  "42deg", w:  "73px", h:  "98px" },
  // 13–17 second dense wave (fills gaps between first-wave cards)
  { tx:  "-88px", ty: "-718px", rot: "-11deg", w:  "93px", h: "123px" },
  { tx:   "98px", ty: "-708px", rot:  "10deg", w:  "93px", h: "123px" },
  { tx: "-170px", ty: "-668px", rot: "-18deg", w:  "89px", h: "117px" },
  { tx:  "180px", ty: "-658px", rot:  "16deg", w:  "89px", h: "117px" },
  { tx: "-342px", ty: "-538px", rot: "-33deg", w:  "82px", h: "110px" },
];

const ENVELOPE_PHOTOS = [
  "/images/Envelope/1-envelope.png",
  "/images/Envelope/2-envelope.png",
  "/images/Envelope/3-envelope.png",
];

// Sync with .polaroidStrip animation-duration in the CSS module (3.5s)
const SCROLL_DURATION_MS = 3500;

// Horizontal offsets + rotations for each polaroid card
const POLAROID_STYLES = [
  { dx: "-5vw",  rot: "-4deg" },
  { dx:  "6vw",  rot:  "5deg" },
  { dx: "-3vw",  rot: "-2deg" },
];

interface Props {
  onComplete: () => void;
}

export default function EnvelopeLanding({ onComplete }: Props) {
  const [phase, setPhase] = useState<Phase>("idle");
  const timers            = useRef<ReturnType<typeof setTimeout>[]>([]);

  const mobileAnimActive     = useRef(false);
  const isMobile             = useRef(false);
  const prefersReducedMotion = useRef(false);

  const [skeletonBursting,    setSkeletonBursting]    = useState(false);
  const [envelopeRecoil,      setEnvelopeRecoil]      = useState(false);
  const [cameraRush,          setCameraRush]          = useState(false);
  const [photoOverlayVisible, setPhotoOverlayVisible] = useState(false);
  const [photoOverlayOpaque,  setPhotoOverlayOpaque]  = useState(false);
  const [photoScrolling,      setPhotoScrolling]      = useState(false);
  const [photoOverlayFading,  setPhotoOverlayFading]  = useState(false);

  useEffect(() => {
    isMobile.current             = window.innerWidth < 1024;
    prefersReducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isMobile.current) {
      ENVELOPE_PHOTOS.forEach((src) => { const img = new window.Image(); img.src = src; });
    }
  }, []);

  const handleOpen = () => {
    if (phase !== "idle") return;
    if (mobileAnimActive.current) return;

    if (isMobile.current) {
      mobileAnimActive.current = true;

      if (!prefersReducedMotion.current) {
        // Stage 1 (0 ms): continuous volcano eruption + envelope recoil
        setSkeletonBursting(true);
        setEnvelopeRecoil(true);

        // Stage 2 (700 ms): camera rushes toward the hovering focal card
        timers.current.push(setTimeout(() => setCameraRush(true), 700));

        // Stage 3 (1 100 ms): black overlay mounts; (1 120 ms) fades to opaque;
        //          (1 700 ms): polaroid strip starts falling top→bottom
        timers.current.push(
          setTimeout(() => setPhotoOverlayVisible(true), 1100),
          setTimeout(() => setPhotoOverlayOpaque(true),  1120),
          setTimeout(() => setPhotoScrolling(true),      1700),
        );

        // Stage 4: after scroll ends, fade out → onComplete
        const scrollEnd = 1700 + SCROLL_DURATION_MS;
        timers.current.push(
          setTimeout(() => setPhotoOverlayFading(true), scrollEnd),
          setTimeout(onComplete,                        scrollEnd + 700),
        );
      } else {
        // Reduced motion: skip burst + camera rush, just show polaroid strip
        setPhotoOverlayVisible(true);
        timers.current.push(
          setTimeout(() => setPhotoOverlayOpaque(true), 20),
          setTimeout(() => setPhotoScrolling(true),     400),
          setTimeout(() => setPhotoOverlayFading(true), 400 + SCROLL_DURATION_MS * 2),
          setTimeout(onComplete,                        400 + SCROLL_DURATION_MS * 2 + 700),
        );
      }
    } else {
      // Desktop: existing polaroid burst
      setPhase("shaking");
      timers.current = [
        setTimeout(() => setPhase("burst"),  400),
        setTimeout(() => setPhase("fading"), 1700),
        setTimeout(onComplete,               2450),
      ];
    }
  };

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const isBurst = phase === "burst" || phase === "fading";

  return (
    <>
      {/* ── Mobile photo overlay ──────────────────────────────────── */}
      {photoOverlayVisible && (
        <div
          aria-hidden="true"
          className={[
            "fixed inset-0 z-[999] overflow-hidden pointer-events-none",
            "transition-opacity duration-500",
            photoOverlayOpaque && !photoOverlayFading ? "opacity-100" : "opacity-0",
          ].join(" ")}
          style={{
            backgroundImage: "url('/images/Envelope/Background/filip-zrnzevic-QsWG0kjPQRY-unsplash.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Polaroid strip — falls from top to bottom */}
          <div
            className={[
              "flex flex-col items-center gap-6 w-full",
              photoScrolling ? styles.polaroidStrip : styles.polaroidStripHidden,
            ].join(" ")}
          >
            {ENVELOPE_PHOTOS.map((src, i) => {
              const ps = POLAROID_STYLES[i % POLAROID_STYLES.length];
              return (
                <div
                  key={i}
                  style={{
                    width: "58vw",
                    flexShrink: 0,
                    background: "#fff",
                    padding: "8px 8px 52px 8px",
                    borderRadius: "3px",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.55)",
                    transform: `translateX(${ps.dx}) rotate(${ps.rot})`,
                  }}
                >
                  <img
                    src={src}
                    alt=""
                    style={{
                      width: "100%",
                      aspectRatio: "3 / 4",
                      objectFit: "cover",
                      objectPosition: "center top",
                      display: "block",
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Envelope screen ───────────────────────────────────────── */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Abrir invitación de boda"
        onClick={handleOpen}
        onKeyDown={(e) => e.key === "Enter" && handleOpen()}
        className={[
          "fixed inset-0 z-[100] flex flex-col items-center justify-center",
          "cursor-pointer select-none",
          "transition-opacity duration-700 ease-in-out",
          cameraRush ? styles.cameraRush : "",
          phase === "fading" || photoOverlayFading ? "opacity-0 pointer-events-none" : "opacity-100",
        ].join(" ")}
        style={{
          backgroundImage: "url('/images/Envelope/Background/filip-zrnzevic-QsWG0kjPQRY-unsplash.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >

        {/* Skeleton volcano burst cards */}
        {SKELETONS.map((s, i) => (
          <div
            key={i}
            aria-hidden="true"
            className={[
              "absolute top-1/2 left-1/2 pointer-events-none",
              styles.skeleton,
              skeletonBursting
                ? (i === 0 ? styles.focalCardBurst : styles.skeletonBurst)
                : styles.skeletonIdle,
            ].join(" ")}
            style={{
              width:     s.w,
              height:    s.h,
              "--tx":    s.tx,
              "--ty":    s.ty,
              "--rot":   s.rot,
              "--delay": i === 0 ? "0ms" : `${(i - 1) * 90}ms`,
            } as React.CSSProperties}
          >
            {i === 0
              ? <img src="/images/Envelope/1-envelope.png" alt="" className={styles.skeletonPhotoFocal} />
              : <div className={styles.skeletonPhoto} />
            }
          </div>
        ))}

        {/* Envelope + polaroids */}
        <div
          className={[
            "relative flex items-center justify-center will-change-transform",
            phase === "idle" && !envelopeRecoil ? "animate-envelope-float" : "",
            phase === "shaking" ? "animate-envelope-shake" : "",
          ].join(" ")}
        >
          {POLAROIDS.map((p, i) => (
            <div
              key={i}
              className={[
                "absolute top-1/2 left-1/2 w-[115px] sm:w-[135px] bg-white shadow-2xl z-30",
                styles.polaroid,
                isBurst ? styles.polaroidBurst : styles.polaroidIdle,
              ].join(" ")}
              style={{
                "--tx":    p.tx,
                "--ty":    p.ty,
                "--rot":   p.rot,
                "--delay": p.delay,
              } as React.CSSProperties}
            >
              <div className="m-[6px] mb-0 h-[95px] sm:h-[110px] overflow-hidden relative">
                <Image
                  src={`/images/Envelope/${i + 1}-envelope.png`}
                  alt=""
                  aria-hidden="true"
                  fill
                  className="object-cover"
                  sizes="135px"
                />
              </div>
              <div className="h-[28px]" />
            </div>
          ))}

          <div
            className={[
              "relative z-20 transition-transform duration-300",
              phase !== "idle" ? "scale-[1.05]" : "scale-100",
              envelopeRecoil ? styles.envelopeRecoil : "",
            ].join(" ")}
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

          <div className="absolute inset-0 flex items-end justify-center z-40 pb-[14%]">
            <Image
              src="/svgs/wax-seal.svg"
              alt="Sello de cera JR"
              width={80}
              height={80}
              className={[
                "w-[62px] sm:w-[78px] h-auto drop-shadow-md",
                styles.waxSeal,
                phase === "idle" && !envelopeRecoil ? styles.waxSealVisible : styles.waxSealHidden,
              ].join(" ")}
            />
          </div>
        </div>

        <p
          className={[
            "absolute bottom-12 font-cinzel text-[11px] tracking-[0.28em] uppercase",
            "text-burgundy/45 transition-opacity duration-300",
            phase !== "idle" || envelopeRecoil ? "opacity-0" : "opacity-100",
          ].join(" ")}
        >
          Toca para abrir
        </p>
      </div>
    </>
  );
}
