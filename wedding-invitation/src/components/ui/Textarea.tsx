"use client";

import { cn } from "@/lib/utils";
import { TextareaHTMLAttributes, forwardRef } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={id}
            className="font-cinzel text-xs tracking-widest uppercase text-current opacity-80"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          className={cn(
            "w-full px-4 py-3 rounded-2xl border font-cinzel text-sm resize-none",
            "bg-cream/30 border-current/30 text-current placeholder:opacity-40",
            "focus:outline-none focus:ring-2 focus:ring-current/40 focus:border-current",
            "transition-all duration-150",
            error && "border-red-400 focus:ring-red-300",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-red-400 text-xs font-cinzel">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
export default Textarea;
