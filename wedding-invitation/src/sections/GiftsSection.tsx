"use client";

import { useState } from "react";
import { eventConfig } from "@/config/eventConfig";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";
import styles from "./GiftsSection.module.css";

const bank = {
  accountHolder: process.env.NEXT_PUBLIC_BANK_HOLDER ?? "",
  name:          process.env.NEXT_PUBLIC_BANK_NAME  ?? "",
  iban:          process.env.NEXT_PUBLIC_BANK_IBAN  ?? "",
  bic:           process.env.NEXT_PUBLIC_BANK_BIC   ?? "",
};

export default function GiftsSection() {
  const { gifts } = eventConfig;
  const [showBank, setShowBank] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyIban = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = bank.iban;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback for browsers without Clipboard API
      const el = document.createElement("textarea");
      el.value = text;
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.focus();
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const rows = [
    { label: "Titular",     value: bank.accountHolder },
    { label: "Banco",       value: bank.name },
    { label: "BIC / SWIFT", value: bank.bic },
  ];

  return (
    // Background inherited from the bg-section-cream wrapper in page.tsx
    <section id="regalo" className="py-24 sm:py-32">
      <Container className="flex flex-col items-center text-center">

        {/* Gift SVG */}
        <ScrollReveal>
          <img
            src="/svgs/decorative/gift.svg"
            alt=""
            aria-hidden="true"
            className="w-24 md:w-32 object-contain opacity-90 mb-6 pointer-events-none"
          />
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <SectionHeading variant="dark">Sugerencia de Regalo</SectionHeading>
        </ScrollReveal>

        {/* Intro message */}
        <ScrollReveal delay={160}>
          <p className="font-cinzel italic text-burgundy/80 text-story-body leading-relaxed max-w-lg mt-6 mb-10">
            {gifts.message}
          </p>
        </ScrollReveal>

        {/* Bank details disclosure */}
        <ScrollReveal delay={240}>
          <div className={styles.bankDisclosure}>
            <button
              type="button"
              onClick={() => setShowBank((v) => !v)}
              aria-expanded={showBank}
              className="
                font-cinzel text-[10px] tracking-[0.3em] uppercase text-burgundy
                border border-burgundy/40 rounded-full
                px-6 py-3 min-h-[44px]
                hover:bg-burgundy/8 hover:border-burgundy/70
                active:scale-95
                transition-all duration-200
              "
            >
              {showBank ? "Ocultar datos bancarios" : "¿Prefieres transferencia? Ver datos bancarios"}
            </button>

            {showBank && (
              <div className={styles.bankCard}>
                <p className="font-cinzel text-burgundy/35 text-[10px] tracking-[0.5em] uppercase mb-5">
                  Datos Bancarios
                </p>

                {rows.map(({ label, value }) => (
                  <div key={label} className={styles.row}>
                    <span className="font-cinzel text-burgundy/40 text-[0.65rem] tracking-[0.18em] uppercase flex-shrink-0">
                      {label}
                    </span>
                    <span className="font-cinzel text-burgundy/85 text-[0.8rem] text-right">
                      {value}
                    </span>
                  </div>
                ))}

                {/* IBAN row — copyable */}
                <div className={styles.row}>
                  <span className="font-cinzel text-burgundy/40 text-[0.65rem] tracking-[0.18em] uppercase flex-shrink-0">
                    IBAN
                  </span>
                  <div className={styles.ibanValue}>
                    <span className="font-cinzel text-burgundy/85 text-[0.8rem] tracking-wider">
                      {bank.iban}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyIban}
                      aria-label="Copiar IBAN al portapapeles"
                      className={`
                        ${styles.copyBtn}
                        font-cinzel text-[0.58rem] tracking-[0.15em] uppercase
                        ${copied ? styles.copyBtnConfirmed : styles.copyBtnIdle}
                      `}
                    >
                      {copied ? "✓ Copiado" : "Copiar"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollReveal>

      </Container>
    </section>
  );
}
