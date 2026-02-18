"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "cream" | "burgundy" | "sage" | "outline";
}

export default function Card({ className, variant = "cream", children, ...props }: CardProps) {
  const variants = {
    cream:    "bg-cream border border-burgundy/20",
    burgundy: "bg-burgundy text-cream border border-burgundy-light/30",
    sage:     "bg-sage text-cream border border-sage-light/30",
    outline:  "bg-transparent border border-burgundy/40",
  };

  return (
    <div
      className={cn(
        "rounded-2xl p-6 shadow-sm",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
