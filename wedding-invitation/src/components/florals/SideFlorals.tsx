"use client";

import { useRef, useState, useEffect } from "react";

const TILE_W = 80;
const TILE_H = 320;

interface VineTileProps {
  color: string;
  strokeWidth?: number;
}

const VineTile = ({ color, strokeWidth = 0.9 }: VineTileProps) => (
  <g fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    {/* Main stem */}
    <path d="M 14 0 C 22 30, 8 60, 22 95 S 36 150, 18 185 S 8 245, 24 280 S 14 315, 14 320" />
    {/* Secondary thinner stems */}
    <path d="M 14 0 C 6 20, 18 45, 10 70" opacity="0.55" strokeWidth={strokeWidth * 0.7} />
    <path d="M 22 95 C 32 110, 28 130, 36 145" opacity="0.55" strokeWidth={strokeWidth * 0.7} />
    <path d="M 18 185 C 6 200, 14 220, 4 235" opacity="0.55" strokeWidth={strokeWidth * 0.7} />
    <path d="M 24 280 C 36 295, 28 308, 38 318" opacity="0.55" strokeWidth={strokeWidth * 0.7} />

    {/* Leaves — alternating sides */}
    <g transform="translate(14 22) rotate(-35)">
      <path d="M 0 0 Q 10 -3, 18 0 Q 10 3, 0 0 Z" />
      <path d="M 0 0 L 18 0" strokeWidth={strokeWidth * 0.5} opacity="0.7" />
    </g>
    <g transform="translate(18 55) rotate(35)">
      <path d="M 0 0 Q 12 -3, 22 0 Q 12 3, 0 0 Z" />
      <path d="M 0 0 L 22 0" strokeWidth={strokeWidth * 0.5} opacity="0.7" />
    </g>
    <g transform="translate(20 110) rotate(-30)">
      <path d="M 0 0 Q 11 -3, 20 0 Q 11 3, 0 0 Z" />
      <path d="M 0 0 L 20 0" strokeWidth={strokeWidth * 0.5} opacity="0.7" />
    </g>
    <g transform="translate(28 165) rotate(40)">
      <path d="M 0 0 Q 14 -4, 24 0 Q 14 4, 0 0 Z" />
      <path d="M 0 0 L 24 0" strokeWidth={strokeWidth * 0.5} opacity="0.7" />
    </g>
    <g transform="translate(14 215) rotate(-40)">
      <path d="M 0 0 Q 12 -3, 22 0 Q 12 3, 0 0 Z" />
      <path d="M 0 0 L 22 0" strokeWidth={strokeWidth * 0.5} opacity="0.7" />
    </g>
    <g transform="translate(22 260) rotate(30)">
      <path d="M 0 0 Q 10 -3, 18 0 Q 10 3, 0 0 Z" />
      <path d="M 0 0 L 18 0" strokeWidth={strokeWidth * 0.5} opacity="0.7" />
    </g>
    <g transform="translate(18 300) rotate(-25)">
      <path d="M 0 0 Q 9 -2, 16 0 Q 9 2, 0 0 Z" />
      <path d="M 0 0 L 16 0" strokeWidth={strokeWidth * 0.5} opacity="0.7" />
    </g>

    {/* 5-petal flowers at vine inflection points */}
    {[
      { x: 36, y: 30,  s: 1.0  },
      { x: 50, y: 130, s: 1.15 },
      { x: 30, y: 200, s: 0.9  },
      { x: 50, y: 295, s: 1.05 },
    ].map((f, i) => (
      <g key={i} transform={`translate(${f.x} ${f.y}) scale(${f.s})`}>
        <circle r="2.2" fill={color} stroke="none" />
        <circle r="4" />
        <ellipse cy="-7" rx="3" ry="5" />
        <ellipse cx="6.6"  cy="-2.2" rx="3" ry="5" transform="rotate(72 6.6 -2.2)"   />
        <ellipse cx="4.1"  cy="5.6"  rx="3" ry="5" transform="rotate(144 4.1 5.6)"   />
        <ellipse cx="-4.1" cy="5.6"  rx="3" ry="5" transform="rotate(-144 -4.1 5.6)" />
        <ellipse cx="-6.6" cy="-2.2" rx="3" ry="5" transform="rotate(-72 -6.6 -2.2)" />
      </g>
    ))}

    {/* Small bud dots */}
    {[
      { x: 8,  y: 75  },
      { x: 42, y: 175 },
      { x: 6,  y: 245 },
      { x: 44, y: 75  },
    ].map((b, i) => (
      <circle key={`b${i}`} cx={b.x} cy={b.y} r="1.4" fill={color} stroke="none" />
    ))}
  </g>
);

interface VineColumnProps {
  side: "left" | "right";
  color: string;
  width: number;
  inset: number;
  topOffset: number;
  bottom: "auto" | number;
  opacity: number;
  mirror: boolean;
  blendMode?: React.CSSProperties["mixBlendMode"];
  zIndex?: number;
}

const VineColumn = ({ side, color, width, inset, topOffset, bottom, opacity, mirror, blendMode, zIndex }: VineColumnProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [h, setH] = useState(800);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;
    const update = () => {
      setH(parent.getBoundingClientRect().height);
      setIsMobile(window.innerWidth < 768);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(parent);
    window.addEventListener("resize", update);
    return () => { ro.disconnect(); window.removeEventListener("resize", update); };
  }, []);

  const effectiveWidth   = isMobile ? Math.round(width * 0.45) : width;
  const effectiveOpacity = isMobile ? opacity * 0.55 : opacity;

  const scaledTileH = (TILE_H / TILE_W) * effectiveWidth;
  const usableH = Math.max(0, h - topOffset - (bottom === "auto" ? 0 : bottom));
  const tileCount = Math.max(1, Math.ceil(usableH / scaledTileH) + 1);

  const flip = side === "right" && mirror;

  const positionStyle: React.CSSProperties =
    bottom === "auto"
      ? { top: topOffset, bottom: 0 }
      : { top: topOffset, height: `calc(100% - ${topOffset}px - ${bottom}px)` };

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: "absolute",
        ...positionStyle,
        [side === "left" ? "left" : "right"]: inset,
        width: effectiveWidth,
        pointerEvents: "none",
        opacity: effectiveOpacity,
        zIndex: zIndex ?? 0,
        mixBlendMode: blendMode,
        transform: flip ? "scaleX(-1)" : undefined,
        transformOrigin: "center",
        overflow: "hidden",
      }}
    >
      <svg
        width={effectiveWidth}
        height={tileCount * scaledTileH}
        viewBox={`0 0 ${TILE_W} ${tileCount * TILE_H}`}
        style={{ display: "block" }}
      >
        {Array.from({ length: tileCount }).map((_, i) => (
          <g
            key={i}
            transform={`translate(0 ${i * TILE_H}) ${i % 2 === 1 ? `translate(${TILE_W} 0) scale(-1 1)` : ""}`}
          >
            <VineTile color={color} />
          </g>
        ))}
      </svg>
    </div>
  );
};

export interface SideFloralsProps {
  side?: "left" | "right" | "both";
  color?: string;
  opacity?: number;
  width?: number;
  inset?: number;
  topOffset?: number;
  bottom?: "auto" | number;
  density?: number;
  mirror?: boolean;
  blendMode?: React.CSSProperties["mixBlendMode"];
  zIndex?: number;
}

export default function SideFlorals({
  side = "both",
  color = "currentColor",
  opacity = 1,
  width = 64,
  inset = 0,
  topOffset = 0,
  bottom = "auto",
  density = 100,
  mirror = true,
  blendMode,
  zIndex,
}: SideFloralsProps) {
  const finalOpacity = opacity * (density / 100);
  if (finalOpacity <= 0) return null;

  const sides: ("left" | "right")[] = side === "both" ? ["left", "right"] : [side];

  return (
    <>
      {sides.map((s) => (
        <VineColumn
          key={s}
          side={s}
          color={color}
          width={width}
          inset={inset}
          topOffset={topOffset}
          bottom={bottom}
          opacity={finalOpacity}
          mirror={mirror}
          blendMode={blendMode}
          zIndex={zIndex}
        />
      ))}
    </>
  );
}
