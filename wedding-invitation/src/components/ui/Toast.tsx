"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info";
  message: string;
}

interface ToastProps {
  toast: ToastMessage;
  onDismiss: (id: string) => void;
}

function Toast({ toast, onDismiss }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), 4500);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const styles = {
    success: "bg-sage text-cream border-sage-light/40",
    error:   "bg-burgundy text-cream border-burgundy-light/40",
    info:    "bg-cream text-burgundy border-burgundy/20",
  };

  const icons = {
    success: "✓",
    error:   "✕",
    info:    "ℹ",
  };

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-5 py-3 rounded-full border shadow-lg",
        "font-cinzel text-sm tracking-wide animate-fade-up",
        styles[toast.type]
      )}
    >
      <span className="text-base font-bold">{icons[toast.type]}</span>
      <span>{toast.message}</span>
      <button
        onClick={() => onDismiss(toast.id)}
        className="ml-2 opacity-60 hover:opacity-100 transition-opacity"
        aria-label="Cerrar notificación"
      >
        ✕
      </button>
    </div>
  );
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
      {toasts.map((t) => (
        <Toast key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: ToastMessage["type"], message: string) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const dismiss = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return { toasts, addToast, dismiss };
}
