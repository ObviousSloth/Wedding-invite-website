interface Props {
  tone?: "cream" | "burgundy";
}

// Fixed-size vine cluster — never stretched, scaleX(-1) gives the right arm
const VineCluster = ({ color }: { color: string }) => (
  <svg
    viewBox="0 0 160 44"
    className="w-24 sm:w-36 md:w-40"
    style={{ height: "auto", display: "block", flexShrink: 0 }}
    fill="none"
    stroke={color}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {/* Main stem — flows from outer edge (x=0) toward center (x=160) */}
    <path strokeWidth="0.85"
      d="M 0 22 C 28 18, 58 27, 88 22 S 128 17, 152 22 S 158 23, 160 22"
    />

    {/* Leaves — alternating up/down */}
    <g transform="translate(18 19) rotate(-36)">
      <path strokeWidth="0.8" d="M 0 0 Q 8 -2.5 15 0 Q 8 2.5 0 0 Z" />
      <line x1="0" y1="0" x2="15" y2="0" strokeWidth="0.45" opacity="0.6" />
    </g>
    <g transform="translate(45 26) rotate(30)">
      <path strokeWidth="0.8" d="M 0 0 Q 9 -2.5 16 0 Q 9 2.5 0 0 Z" />
      <line x1="0" y1="0" x2="16" y2="0" strokeWidth="0.45" opacity="0.6" />
    </g>
    <g transform="translate(75 18) rotate(-32)">
      <path strokeWidth="0.8" d="M 0 0 Q 8 -2 14 0 Q 8 2 0 0 Z" />
      <line x1="0" y1="0" x2="14" y2="0" strokeWidth="0.4" opacity="0.6" />
    </g>
    <g transform="translate(108 26) rotate(28)">
      <path strokeWidth="0.75" d="M 0 0 Q 8 -2 13 0 Q 8 2 0 0 Z" />
      <line x1="0" y1="0" x2="13" y2="0" strokeWidth="0.4" opacity="0.6" />
    </g>
    <g transform="translate(138 19) rotate(-24)">
      <path strokeWidth="0.7" d="M 0 0 Q 6 -1.8 11 0 Q 6 1.8 0 0 Z" />
      <line x1="0" y1="0" x2="11" y2="0" strokeWidth="0.38" opacity="0.55" />
    </g>

    {/* 5-petal flowers */}
    {([
      { x: 32,  y: 18, s: 1.0 },
      { x: 95,  y: 27, s: 0.95 },
    ] as { x: number; y: number; s: number }[]).map((f, i) => (
      <g key={i} transform={`translate(${f.x} ${f.y}) scale(${f.s})`}>
        <circle r="1.8" fill={color} stroke="none" />
        <circle r="3.2" strokeWidth="0.75" />
        <ellipse cy="-5.5"  rx="2.1" ry="3.7" strokeWidth="0.7" />
        <ellipse cx="5.2"   cy="-1.8" rx="2.1" ry="3.7" strokeWidth="0.7"
          transform="rotate(72 5.2 -1.8)" />
        <ellipse cx="3.2"   cy="4.5"  rx="2.1" ry="3.7" strokeWidth="0.7"
          transform="rotate(144 3.2 4.5)" />
        <ellipse cx="-3.2"  cy="4.5"  rx="2.1" ry="3.7" strokeWidth="0.7"
          transform="rotate(-144 -3.2 4.5)" />
        <ellipse cx="-5.2"  cy="-1.8" rx="2.1" ry="3.7" strokeWidth="0.7"
          transform="rotate(-72 -5.2 -1.8)" />
      </g>
    ))}

    {/* Bud dots */}
    <circle cx="62"  cy="26" r="1.3" fill={color} stroke="none" />
    <circle cx="125" cy="18" r="1.1" fill={color} stroke="none" />
  </svg>
);

export default function SectionDivider({ tone = "cream" }: Props) {
  const isCream      = tone === "cream";
  const color        = isCream ? "var(--color-burgundy)" : "var(--color-cream)";
  const lineOpacity  = isCream ? "rgba(94,8,19,0.18)"       : "rgba(244,242,235,0.18)";
  const ringColor    = isCream ? "rgba(94,8,19,0.22)"       : "rgba(244,242,235,0.22)";
  const monoFilter   = isCream ? "brightness-0" : "brightness-0 invert";
  const monoOpacity  = isCream ? 0.55 : 0.5;
  const clusterOpacity = isCream ? 0.45 : 0.35;

  return (
    <div
      aria-hidden="true"
      className="flex items-center px-16 sm:px-24 md:px-32 lg:px-40 py-3"
    >
      {/* Left vine cluster */}
      <div style={{ opacity: clusterOpacity }}>
        <VineCluster color={color} />
      </div>

      {/* Line from left cluster to circle */}
      <div className="flex-1" style={{ height: 1, background: lineOpacity }} />

      {/* Monogram in ring */}
      <div
        className="flex-shrink-0 rounded-full flex items-center justify-center"
        style={{
          width: 44,
          height: 44,
          border: `1px solid ${ringColor}`,
          boxShadow: `0 0 0 3px ${lineOpacity}`,
        }}
      >
        <img
          src="/svgs/monogram.svg"
          alt=""
          className={`w-10 h-10 object-contain pointer-events-none select-none ${monoFilter}`}
          style={{ opacity: monoOpacity }}
        />
      </div>

      {/* Line from circle to right cluster */}
      <div className="flex-1" style={{ height: 1, background: lineOpacity }} />

      {/* Right vine cluster — mirrored */}
      <div style={{ opacity: clusterOpacity, transform: "scaleX(-1)" }}>
        <VineCluster color={color} />
      </div>
    </div>
  );
}
