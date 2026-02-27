interface Props {
  children: React.ReactNode;
  /**
   * "dark"  → text-burgundy  (use on cream / sage backgrounds)
   * "light" → text-cream     (use on burgundy backgrounds)
   */
  variant?: "dark" | "light";
  className?: string;
}

export default function SectionHeading({
  children,
  variant = "dark",
  className = "",
}: Props) {
  const color = variant === "light" ? "text-cream" : "text-burgundy";

  return (
    <h2
      className={`
        font-slight text-section-title leading-tight tracking-wide
        ${color} ${className}
      `}
    >
      {children}
    </h2>
  );
}
