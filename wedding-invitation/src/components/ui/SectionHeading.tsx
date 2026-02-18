"use client";

import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  variant?: "cream" | "burgundy";
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  variant = "cream",
  className,
}: SectionHeadingProps) {
  const colors = {
    cream: "text-burgundy",
    burgundy: "text-cream",
  };

  return (
    <div className={cn("text-center mb-10 md:mb-14", className)}>
      <h2 className={cn("font-slight text-5xl md:text-6xl mb-3", colors[variant])}>
        {title}
      </h2>
      <div className={cn("divider mb-4", colors[variant])} />
      {subtitle && (
        <p className={cn("font-seasons italic text-base md:text-lg opacity-80", colors[variant])}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
