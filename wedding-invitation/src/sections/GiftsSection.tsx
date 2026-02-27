"use client";

import { useState } from "react";
import { eventConfig } from "@/config/eventConfig";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";
import styles from "./GiftsSection.module.css";

export default function GiftsSection() {
  const { gifts } = eventConfig;
  const [copied, setCopied] = useState(false);

  const handleCopyIban = async () => {
    try {
      await navigator.clipboard.writeText(gifts.bankDetails.iban);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard API unavailable — silently ignore
    }
  };

  const rows = [
    { label: "Titular",    value: gifts.bankDetails.accountHolder, copyable: false },
    { label: "Banco",      value: gifts.bankDetails.bank,          copyable: false },
    { label: "BIC / SWIFT",value: gifts.bankDetails.bic,           copyable: false },
  ];

  return (
    <section id="regalo" className="bg-section-burgundy py-24 sm:py-32">
      <Container className="flex flex-col items-center text-center">

        <ScrollReveal>
          <SectionHeading variant="light">Sugerencia de Regalo</SectionHeading>
        </ScrollReveal>

        {/* Intro message */}
        <ScrollReveal delay={150}>
          <p className="font-seasons italic text-cream/80 text-story-body leading-relaxed max-w-lg mt-6 mb-10">
            {gifts.message}
          </p>
        </ScrollReveal>

        {/* Bank details card */}
        <ScrollReveal delay={280}>
          <div className={styles.bankCard}>

            <p className="font-cinzel text-cream/35 text-[10px] tracking-[0.5em] uppercase mb-5">
              Datos Bancarios
            </p>

            {/* Static rows */}
            {rows.map(({ label, value }) => (
              <div key={label} className={styles.row}>
                <span className="font-cinzel text-cream/40 text-[0.65rem] tracking-[0.18em] uppercase flex-shrink-0">
                  {label}
                </span>
                <span className="font-cinzel text-cream/85 text-[0.8rem] text-right">
                  {value}
                </span>
              </div>
            ))}

            {/* IBAN row — copyable */}
            <div className={styles.row}>
              <span className="font-cinzel text-cream/40 text-[0.65rem] tracking-[0.18em] uppercase flex-shrink-0">
                IBAN
              </span>
              <div className={styles.ibanValue}>
                <span className="font-cinzel text-cream/85 text-[0.8rem] tracking-wider">
                  {gifts.bankDetails.iban}
                </span>
                <button
                  onClick={handleCopyIban}
                  aria-label="Copiar IBAN al portapapeles"
                  className={`
                    ${styles.copyBtn}
                    font-cinzel text-[0.58rem] tracking-[0.15em] uppercase
                    ${copied ? `${styles.copyBtnConfirmed} text-sage-light` : "text-cream/45"}
                  `}
                >
                  {copied ? "✓ Copiado" : "Copiar"}
                </button>
              </div>
            </div>

          </div>
        </ScrollReveal>

      </Container>
    </section>
  );
}
