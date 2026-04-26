// Floral SVG decorations — fine line vintage stationery style

interface FloralVineProps {
  size?: number;
  color?: string;
  opacity?: number;
}

export const FloralVine = ({ size = 240, color = "currentColor", opacity = 1 }: FloralVineProps) => (
  <svg width={size} height={size} viewBox="0 0 240 240" style={{ opacity }} fill="none" stroke={color} strokeWidth="1" strokeLinecap="round">
    {/* Main curving stem */}
    <path d="M 10 10 Q 60 40, 50 90 T 90 160 Q 110 190, 140 200" />
    {/* Secondary stem */}
    <path d="M 10 10 Q 40 30, 30 70 Q 25 100, 50 130" opacity="0.7" />
    {/* Leaves along main stem */}
    <g>
      <path d="M 35 35 Q 50 30, 60 40 Q 55 50, 40 50 Z" />
      <path d="M 35 35 L 60 40" strokeWidth="0.5" />
    </g>
    <g transform="rotate(30 55 75)">
      <path d="M 50 70 Q 70 65, 80 78 Q 72 90, 55 88 Z" />
      <path d="M 50 70 L 80 78" strokeWidth="0.5" />
    </g>
    <g transform="rotate(-20 70 110)">
      <path d="M 60 100 Q 85 95, 95 112 Q 85 125, 65 120 Z" />
      <path d="M 60 100 L 95 112" strokeWidth="0.5" />
    </g>
    <g transform="rotate(45 95 145)">
      <path d="M 85 138 Q 110 132, 120 150 Q 108 165, 88 158 Z" />
      <path d="M 85 138 L 120 150" strokeWidth="0.5" />
    </g>
    {/* Small flowers — 5 petals */}
    <g transform="translate(70 30)">
      <circle cx="0" cy="0" r="3" />
      <ellipse cx="0" cy="-7" rx="3" ry="5" />
      <ellipse cx="6" cy="-3" rx="3" ry="5" transform="rotate(72 6 -3)" />
      <ellipse cx="4" cy="6" rx="3" ry="5" transform="rotate(144 4 6)" />
      <ellipse cx="-4" cy="6" rx="3" ry="5" transform="rotate(-144 -4 6)" />
      <ellipse cx="-6" cy="-3" rx="3" ry="5" transform="rotate(-72 -6 -3)" />
    </g>
    <g transform="translate(115 95)">
      <circle cx="0" cy="0" r="2.5" />
      <ellipse cx="0" cy="-6" rx="2.5" ry="4" />
      <ellipse cx="5" cy="-2" rx="2.5" ry="4" transform="rotate(72 5 -2)" />
      <ellipse cx="3" cy="5" rx="2.5" ry="4" transform="rotate(144 3 5)" />
      <ellipse cx="-3" cy="5" rx="2.5" ry="4" transform="rotate(-144 -3 5)" />
      <ellipse cx="-5" cy="-2" rx="2.5" ry="4" transform="rotate(-72 -5 -2)" />
    </g>
    <g transform="translate(150 195)">
      <circle cx="0" cy="0" r="3" />
      <ellipse cx="0" cy="-7" rx="3" ry="5" />
      <ellipse cx="6" cy="-3" rx="3" ry="5" transform="rotate(72 6 -3)" />
      <ellipse cx="4" cy="6" rx="3" ry="5" transform="rotate(144 4 6)" />
      <ellipse cx="-4" cy="6" rx="3" ry="5" transform="rotate(-144 -4 6)" />
      <ellipse cx="-6" cy="-3" rx="3" ry="5" transform="rotate(-72 -6 -3)" />
    </g>
    {/* Tiny buds */}
    <circle cx="25" cy="55" r="1.5" />
    <circle cx="40" cy="115" r="1.5" />
    <circle cx="80" cy="170" r="1.5" />
  </svg>
);

interface FloralSprayProps {
  width?: number;
  color?: string;
  opacity?: number;
}

export const FloralSpray = ({ width = 320, color = "currentColor", opacity = 1 }: FloralSprayProps) => (
  <svg width={width} height={width * 0.4} viewBox="0 0 320 130" style={{ opacity }} fill="none" stroke={color} strokeWidth="1" strokeLinecap="round">
    <path d="M 20 65 Q 80 30, 160 65 T 300 65" />
    <path d="M 20 65 Q 80 100, 160 65 T 300 65" opacity="0.6" />
    {/* Center rose */}
    <g transform="translate(160 65)">
      <circle r="10" />
      <circle r="6" />
      <circle r="3" />
      <path d="M -10 0 Q -7 -8, 0 -10 Q 7 -8, 10 0 Q 7 8, 0 10 Q -7 8, -10 0" />
    </g>
    {/* Side leaves */}
    {[60, 100, 220, 260].map((x, i) => (
      <g key={i} transform={`translate(${x} 65) rotate(${i % 2 === 0 ? -25 : 25})`}>
        <path d="M 0 0 Q 12 -4, 22 0 Q 12 4, 0 0 Z" />
        <path d="M 0 0 L 22 0" strokeWidth="0.5" />
      </g>
    ))}
    {/* Side flowers */}
    {[40, 280].map((x, i) => (
      <g key={i} transform={`translate(${x} ${i === 0 ? 50 : 80})`}>
        <circle cx="0" cy="0" r="2" />
        <ellipse cx="0" cy="-5" rx="2" ry="3.5" />
        <ellipse cx="4" cy="-1.5" rx="2" ry="3.5" transform="rotate(72 4 -1.5)" />
        <ellipse cx="2.5" cy="4" rx="2" ry="3.5" transform="rotate(144 2.5 4)" />
        <ellipse cx="-2.5" cy="4" rx="2" ry="3.5" transform="rotate(-144 -2.5 4)" />
        <ellipse cx="-4" cy="-1.5" rx="2" ry="3.5" transform="rotate(-72 -4 -1.5)" />
      </g>
    ))}
    {/* Tiny buds */}
    {([[80, 50], [120, 80], [200, 50], [240, 80]] as [number, number][]).map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r="1.5" />
    ))}
  </svg>
);

interface MonogramProps {
  size?: number;
  color?: string;
}

export const Monogram = ({ size = 80, color = "currentColor" }: MonogramProps) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round">
    <circle cx="50" cy="50" r="44" strokeWidth="0.8" />
    <circle cx="50" cy="50" r="40" strokeWidth="0.4" opacity="0.5" />
    <text x="50" y="58" textAnchor="middle" fontFamily="Pinyon Script, cursive" fontSize="38" fill={color} stroke="none">J</text>
    <text x="50" y="70" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="6" letterSpacing="2" fill={color} stroke="none">&amp;</text>
    <text x="50" y="82" textAnchor="middle" fontFamily="Pinyon Script, cursive" fontSize="20" fill={color} stroke="none">R</text>
  </svg>
);

interface DividerOrnamentProps {
  color?: string;
}

export const DividerOrnament = ({ color = "currentColor" }: DividerOrnamentProps) => (
  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", color }}>
    <span style={{ flex: 1, height: "1px", background: "currentColor", opacity: 0.35 }} />
    <svg width="44" height="14" viewBox="0 0 44 14" fill="none" stroke={color} strokeWidth="0.8">
      <circle cx="22" cy="7" r="3" />
      <circle cx="22" cy="7" r="1" fill={color} />
      <path d="M 4 7 Q 12 3, 19 7" />
      <path d="M 25 7 Q 32 3, 40 7" />
      <circle cx="4" cy="7" r="1" fill={color} />
      <circle cx="40" cy="7" r="1" fill={color} />
    </svg>
    <span style={{ flex: 1, height: "1px", background: "currentColor", opacity: 0.35 }} />
  </div>
);

type Corner = "tl" | "tr" | "bl" | "br";

const cornerStyles: Record<Corner, React.CSSProperties> = {
  tl: { position: "absolute", top: 0, left: 0 },
  tr: { position: "absolute", top: 0, right: 0, transform: "scaleX(-1)" },
  bl: { position: "absolute", bottom: 0, left: 0, transform: "scaleY(-1)" },
  br: { position: "absolute", bottom: 0, right: 0, transform: "scale(-1)" },
};

interface SectionFloralsProps {
  density?: number;
  color?: string;
  corners?: Corner[];
}

export const SectionFlorals = ({ density = 70, color = "currentColor", corners = ["tl", "tr", "bl", "br"] }: SectionFloralsProps) => {
  if (density === 0) return null;
  const opacity = Math.min(1, density / 100);
  const size = 180 + (density / 100) * 80;
  return (
    <>
      {corners.map((c) => (
        <div key={c} style={{ ...cornerStyles[c], pointerEvents: "none" }} aria-hidden="true">
          <FloralVine size={size} color={color} opacity={opacity * 0.7} />
        </div>
      ))}
    </>
  );
};

interface SectionDividerProps {
  color?: string;
  bg?: string;
  density?: number;
}

export const SectionDivider = ({ color = "var(--color-burgundy)", bg = "var(--color-cream)", density = 70 }: SectionDividerProps) => {
  if (density === 0) return null;
  const opacity = Math.min(1, density / 100);
  return (
    <div style={{ background: bg, padding: "28px 16px 14px", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
      <svg width="240" height="60" viewBox="0 0 240 60" fill="none" stroke={color} strokeWidth="0.8" strokeLinecap="round" style={{ opacity }}>
        {/* Center rose */}
        <g transform="translate(120 30)">
          <circle r="6" />
          <circle r="3.5" />
          <circle r="1.5" fill={color} stroke="none" />
          <path d="M -6 0 Q -4 -5, 0 -6 Q 4 -5, 6 0 Q 4 5, 0 6 Q -4 5, -6 0" opacity="0.6" />
        </g>
        {/* Curving stems out from center */}
        <path d="M 114 30 Q 90 22, 60 28 Q 40 32, 20 28" />
        <path d="M 114 30 Q 90 38, 60 32 Q 40 28, 20 32" opacity="0.55" />
        <path d="M 126 30 Q 150 22, 180 28 Q 200 32, 220 28" />
        <path d="M 126 30 Q 150 38, 180 32 Q 200 28, 220 32" opacity="0.55" />
        {/* Side leaves */}
        {[40, 80, 160, 200].map((x, i) => (
          <g key={i} transform={`translate(${x} ${i % 2 === 0 ? 26 : 34}) rotate(${i % 2 === 0 ? -22 : 22})`}>
            <path d="M 0 0 Q 8 -3, 16 0 Q 8 3, 0 0 Z" />
            <path d="M 0 0 L 16 0" strokeWidth="0.4" opacity="0.7" />
          </g>
        ))}
        {/* Small flowers */}
        {[60, 180].map((x, i) => (
          <g key={i} transform={`translate(${x} 30)`}>
            <circle r="1.6" fill={color} stroke="none" />
            <ellipse cy="-3.5" rx="1.4" ry="2.6" />
            <ellipse cx="3.2" cy="-1" rx="1.4" ry="2.6" transform="rotate(72 3.2 -1)" />
            <ellipse cx="2" cy="3" rx="1.4" ry="2.6" transform="rotate(144 2 3)" />
            <ellipse cx="-2" cy="3" rx="1.4" ry="2.6" transform="rotate(-144 -2 3)" />
            <ellipse cx="-3.2" cy="-1" rx="1.4" ry="2.6" transform="rotate(-72 -3.2 -1)" />
          </g>
        ))}
        {/* Tiny buds */}
        <circle cx="35" cy="30" r="1.2" fill={color} stroke="none" />
        <circle cx="205" cy="30" r="1.2" fill={color} stroke="none" />
        <circle cx="20" cy="30" r="0.8" fill={color} stroke="none" opacity="0.6" />
        <circle cx="220" cy="30" r="0.8" fill={color} stroke="none" opacity="0.6" />
      </svg>
    </div>
  );
};
