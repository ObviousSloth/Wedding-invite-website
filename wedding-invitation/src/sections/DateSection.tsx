"use client";

import { useState } from "react";
import Image from "next/image";
import { eventConfig } from "@/config/eventConfig";
import AdaptiveCountdown from "@/components/countdown/AdaptiveCountdown";
import ScrollReveal from "@/components/ScrollReveal";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import styles from "./DateSection.module.css";

export default function DateSection() {
  const { date } = eventConfig;
  const [showCountdown, setShowCountdown] = useState(false);

  return (
    // Background inherited from the bg-section-cream wrapper in page.tsx
    <section id="fecha" className="py-24 sm:py-32">
      <Container className="flex flex-col items-center text-center">

        {/* Cursive subtitle */}
        {date.heading && (
          <ScrollReveal>
            <p className="font-slight text-burgundy text-section-title leading-tight mb-10">
              {date.heading}
            </p>
          </ScrollReveal>
        )}

        {/* Photo frame placeholder
            TODO: swap placeholder border for ornate-frame SVG once provided by user */}
        <ScrollReveal delay={100}>
          <div className={styles.photoFrame}>
            <Image
              src="/images/hero.jpg"
              alt="Jessika & Randy"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 80vw, 28rem"
              priority
            />
          </div>
        </ScrollReveal>

        {/* Date block: month / Sábado ─ 19 ─ 2026 */}
        <ScrollReveal delay={200}>
          <div className={styles.dateBlock}>

            {/* Month */}
            <p className="font-cinzel text-burgundy/60 text-xs sm:text-sm tracking-[0.45em] uppercase mb-2">
              {date.displayMonth}
            </p>

            {/* Sábado — 19 — 2026 row */}
            <div className={styles.dateRow}>
              <span className="font-cinzel text-burgundy/50 text-xs sm:text-sm tracking-[0.3em] uppercase text-right">
                {date.displayDayOfWeek}
              </span>
              <span className="font-icon text-burgundy text-date-number leading-none select-none">
                {date.displayDay}
              </span>
              <span className="font-cinzel text-burgundy/50 text-xs sm:text-sm tracking-[0.3em] uppercase text-left">
                {date.displayYear}
              </span>
            </div>

          </div>
        </ScrollReveal>

        {/* Countdown toggle pill + collapsible countdown */}
        <ScrollReveal delay={320}>
          <div className="flex flex-col items-center gap-6 w-full max-w-xs md:max-w-sm mx-auto">
            <Button
              variant="primary"
              size="lg"
              onClick={() => setShowCountdown((v) => !v)}
              className="w-full"
              aria-expanded={showCountdown}
            >
              {showCountdown ? "Cerrar Cuenta Regresiva" : "Cuenta Regresiva"}
            </Button>
            {showCountdown && <AdaptiveCountdown targetDate={date.iso} />}
          </div>
        </ScrollReveal>

      </Container>
    </section>
  );
}
