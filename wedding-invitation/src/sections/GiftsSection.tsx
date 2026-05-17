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

const zelle = {
  holder: process.env.NEXT_PUBLIC_ZELLE_HOLDER ?? "",
  email:  process.env.NEXT_PUBLIC_ZELLE_EMAIL  ?? "",
};

export default function GiftsSection() {
  const { gifts } = eventConfig;
  const [showBank, setShowBank] = useState(false);
  const [copiedIban, setCopiedIban] = useState(false);
  const [copiedZelle, setCopiedZelle] = useState(false);

  async function copyToClipboard(text: string, onDone: () => void) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
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
    onDone();
  }

  const handleCopyIban = (e: React.MouseEvent) => {
    e.stopPropagation();
    copyToClipboard(bank.iban, () => {
      setCopiedIban(true);
      setTimeout(() => setCopiedIban(false), 2500);
    });
  };

  const handleCopyZelle = (e: React.MouseEvent) => {
    e.stopPropagation();
    copyToClipboard(zelle.email, () => {
      setCopiedZelle(true);
      setTimeout(() => setCopiedZelle(false), 2500);
    });
  };

  const bankRows = [
    { label: "Titular",     value: bank.accountHolder },
    { label: "Banco",       value: bank.name },
    { label: "BIC / SWIFT", value: bank.bic },
  ];

  const zelleRows = [
    { label: "Titular", value: zelle.holder },
  ];

  return (
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

        <ScrollReveal delay={160}>
          <p className="font-cinzel italic text-burgundy/80 text-story-body leading-relaxed max-w-lg mt-6 mb-10">
            {gifts.message}
          </p>
        </ScrollReveal>

        {/* Transfer disclosure — opens both cards */}
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
              {showBank ? "Ocultar datos de transferencia" : "¿Prefieres transferencia? Ver opciones"}
            </button>

            {showBank && (
              <div className={styles.cardsRow}>

                {/* Bank transfer card */}
                <div className={styles.bankCard}>
                  <p className="font-cinzel text-burgundy/35 text-[10px] tracking-[0.5em] uppercase mb-5">
                    Transferencia Bancaria
                  </p>

                  {bankRows.map(({ label, value }) => (
                    <div key={label} className={styles.row}>
                      <span className="font-cinzel text-burgundy/40 text-[0.65rem] tracking-[0.18em] uppercase flex-shrink-0">
                        {label}
                      </span>
                      <span className="font-cinzel text-burgundy/85 text-[0.8rem] text-right">
                        {value}
                      </span>
                    </div>
                  ))}

                  {/* IBAN — copyable */}
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
                          ${copiedIban ? styles.copyBtnConfirmed : styles.copyBtnIdle}
                        `}
                      >
                        {copiedIban ? "✓ Copiado" : "Copiar"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Zelle card */}
                <div className={styles.bankCard}>
                  <p className="font-cinzel text-burgundy/35 text-[10px] tracking-[0.5em] uppercase mb-5">
                    Zelle
                  </p>

                  {zelleRows.map(({ label, value }) => (
                    <div key={label} className={styles.row}>
                      <span className="font-cinzel text-burgundy/40 text-[0.65rem] tracking-[0.18em] uppercase flex-shrink-0">
                        {label}
                      </span>
                      <span className="font-cinzel text-burgundy/85 text-[0.8rem] text-right">
                        {value}
                      </span>
                    </div>
                  ))}

                  {/* Email — copyable */}
                  <div className={styles.row}>
                    <span className="font-cinzel text-burgundy/40 text-[0.65rem] tracking-[0.18em] uppercase flex-shrink-0">
                      Email
                    </span>
                    <div className={styles.ibanValue}>
                      <span className="font-cinzel text-burgundy/85 text-[0.8rem] tracking-wider">
                        {zelle.email}
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyZelle}
                        aria-label="Copiar email de Zelle al portapapeles"
                        className={`
                          ${styles.copyBtn}
                          font-cinzel text-[0.58rem] tracking-[0.15em] uppercase
                          ${copiedZelle ? styles.copyBtnConfirmed : styles.copyBtnIdle}
                        `}
                      >
                        {copiedZelle ? "✓ Copiado" : "Copiar"}
                      </button>
                    </div>
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
