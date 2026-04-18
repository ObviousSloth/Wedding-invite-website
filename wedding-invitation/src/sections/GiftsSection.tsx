"use client";

import { useState } from "react";
import { eventConfig } from "@/config/eventConfig";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import styles from "./GiftsSection.module.css";

export default function GiftsSection() {
  const { gifts } = eventConfig;
  const [showBank, setShowBank] = useState(false);
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
    { label: "Titular",     value: gifts.bankDetails.accountHolder },
    { label: "Banco",       value: gifts.bankDetails.bank },
    { label: "BIC / SWIFT", value: gifts.bankDetails.bic },
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
          <p className="font-Cinzel italic text-burgundy/80 text-story-body leading-relaxed max-w-lg mt-6 mb-10">
            {gifts.message}
          </p>
        </ScrollReveal>

        {/* Primary CTA: Wishlist */}
        <ScrollReveal delay={240}>
          <a
            href={gifts.wishlistUrl ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
            aria-label="Ver lista de deseos"
          >
            <Button variant="primary" size="lg" className="min-h-[44px] min-w-[10rem]">
              Wishlist
            </Button>
          </a>
        </ScrollReveal>

        {/* Secondary: bank details disclosure */}
        <ScrollReveal delay={320}>
          <div className={styles.bankDisclosure}>
            <button
              type="button"
              onClick={() => setShowBank((v) => !v)}
              aria-expanded={showBank}
              className="
                font-cinzel text-[10px] tracking-[0.3em] uppercase text-burgundy/50
                hover:text-burgundy active:text-burgundy
                underline underline-offset-4 decoration-dotted
                transition-colors duration-200 mt-8 min-h-[44px]
              "
            >
              {showBank ? "Ocultar datos bancarios" : "Ver datos bancarios"}
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
                      {gifts.bankDetails.iban}
                    </span>
                    <button
                      onClick={handleCopyIban}
                      aria-label="Copiar IBAN al portapapeles"
                      className={`
                        ${styles.copyBtn}
                        font-cinzel text-[0.58rem] tracking-[0.15em] uppercase
                        ${copied ? `${styles.copyBtnConfirmed} text-sage-light` : "text-burgundy/45"}
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
