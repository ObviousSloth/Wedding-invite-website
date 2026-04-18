"use client";

import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  tone?: "light" | "dark"; // "dark" for use on burgundy backgrounds
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, tone = "light", ...props }, ref) => {
    const isDark = tone === "dark";
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={id}
            className={cn(
              "font-cinzel text-xs tracking-widest uppercase",
              isDark ? "text-cream/70" : "text-current opacity-80"
            )}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "w-full px-4 py-3 rounded-full border font-cinzel text-sm",
            isDark
              ? "bg-cream/15 border-cream/30 text-cream placeholder:text-cream/40 focus:ring-cream/40 focus:border-cream"
              : "bg-cream/30 border-current/30 text-current placeholder:opacity-40 focus:ring-current/40 focus:border-current",
            "focus:outline-none focus:ring-2",
            "transition-all duration-150",
            error && "border-red-400 focus:ring-red-300",
            className
          )}
          suppressHydrationWarning
          {...props}
        />
        {error && (
          <p className="text-red-400 text-xs font-cinzel">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
