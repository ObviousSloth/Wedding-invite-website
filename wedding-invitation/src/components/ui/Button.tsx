"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, children, disabled, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center font-cinzel tracking-widest uppercase transition-all duration-200 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-burgundy disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "bg-burgundy text-cream hover:bg-burgundy-light active:scale-95 focus:ring-offset-cream",
      secondary:
        "bg-cream text-burgundy hover:bg-cream-dark active:scale-95 focus:ring-offset-burgundy",
      outline:
        "border border-current text-burgundy hover:bg-burgundy hover:text-cream active:scale-95",
      ghost:
        "text-burgundy hover:bg-burgundy/10 active:scale-95",
    };

    const sizes = {
      sm:  "px-5 py-2 text-xs",
      md:  "px-8 py-3 text-xs",
      lg:  "px-10 py-4 text-sm",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Cargando...
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
