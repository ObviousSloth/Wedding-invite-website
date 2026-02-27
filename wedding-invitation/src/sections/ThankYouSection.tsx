import { eventConfig } from "@/config/eventConfig";
import ScrollReveal from "@/components/ScrollReveal";
import Container from "@/components/ui/Container";
import styles from "./ThankYouSection.module.css";

export default function ThankYouSection() {
  const { couple, date } = eventConfig;

  return (
    <section id="gracias" className="relative overflow-hidden bg-section-burgundy py-28 sm:py-40">
      {/* ── Decorative monogram watermark ──────────────────────── */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
            aria-hidden="true"
          >
            <span className="font-icon text-cream/5 leading-none"
              style={{ fontSize: "clamp(25rem, 80vw, 40rem)" }}
            >
              {couple.monogram}
            </span>
          </div>

      <Container className="flex flex-col items-center text-center">

        {/* ── Main thank you heading ──────────────────────────── */}
        <ScrollReveal>
          <h2
            className="
              font-slight text-thankyou-title text-cream
              leading-tight tracking-wide
            "
          >
            ¡Muchas Gracias!
          </h2>
        </ScrollReveal>

        {/* ── Sub message ─────────────────────────────────────── */}
        <ScrollReveal delay={150}>
          <p className="font-seasons italic text-cream/60 text-base sm:text-xl mt-5 max-w-sm">
            Esperamos contar con tu presencia
          </p>
        </ScrollReveal>

        {/* ── Couple names + rules ────────────────────────────── */}
        <ScrollReveal delay={250}>
          <div className="flex items-center gap-5 mt-10 mb-1 w-full max-w-xs sm:max-w-sm">
            <div className={styles.rule} aria-hidden="true" />
            <span className="font-icon text-cream/55 text-2xl sm:text-3xl whitespace-nowrap select-none">
              {couple.partner1} &amp; {couple.partner2}
            </span>
            <div className={styles.rule} aria-hidden="true" />
          </div>
        </ScrollReveal>

        {/* ── Date chip ───────────────────────────────────────── */}
        <ScrollReveal delay={330}>
          <div className={styles.dateChip}>
            <span className="font-cinzel text-cream/30 text-[0.6rem] tracking-[0.35em] uppercase">
              {date.displayDayOfWeek}
            </span>
            <span className="text-cream/20 text-[0.5rem]" aria-hidden="true">◆</span>
            <span className="font-cinzel text-cream/30 text-[0.6rem] tracking-[0.25em] uppercase">
              {date.displayDay}&nbsp;{date.displayMonth}&nbsp;{date.displayYear}
            </span>
          </div>
        </ScrollReveal>

      </Container>
    </section>
  );
}
