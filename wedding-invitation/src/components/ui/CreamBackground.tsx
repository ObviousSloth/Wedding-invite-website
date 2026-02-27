interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function CreamBackground({ children, className = "" }: Props) {
  return (
    <div className={`bg-section-cream ${className}`}>

      {/* ── Decorative SVG — fills section, object-contain keeps proportions ── */}
        <img
        src="/svgs/bg-cream.svg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-fill select-none pointer-events-none"
        />

      {/* ── Content sits above the SVG ── */}
      <div className="relative z-10">
        {children}
      </div>

    </div>
  );
}

