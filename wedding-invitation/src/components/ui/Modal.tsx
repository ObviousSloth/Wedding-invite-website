"use client";

import { useEffect, useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
}

export default function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-burgundy-dark/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className={cn(
          "relative bg-cream rounded-3xl shadow-2xl w-full max-w-md",
          "p-8 animate-fade-up max-h-[90vh] overflow-y-auto",
          className
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-burgundy/50 hover:text-burgundy text-xl transition-colors"
          aria-label="Cerrar"
        >
          ✕
        </button>

        {title && (
          <h2
            id="modal-title"
            className="font-slight text-3xl text-burgundy mb-6 text-center"
          >
            {title}
          </h2>
        )}

        {children}
      </div>
    </div>
  );
}
