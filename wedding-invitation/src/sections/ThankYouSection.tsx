import Image from "next/image";
import { eventConfig } from "@/config/eventConfig";
import ScrollReveal from "@/components/ScrollReveal";
import Container from "@/components/ui/Container";
import styles from "./ThankYouSection.module.css";

export default function ThankYouSection() {
  const { couple, date } = eventConfig;

  return (
    <section id="gracias" className="relative overflow-hidden py-28 sm:py-40 min-h-[70vh] flex flex-col justify-center">

      {/* ── Full-bleed background photo ─────────────────────────
          TODO: replace /images/hero.jpg with the proposal photo
          once provided by the user */}
      <Image
        src="/images/hero.jpg"
        alt=""
        fill
        className="object-cover z-0"
        aria-hidden="true"
        priority={false}
        sizes="100vw"
      />

      {/* ── Top + bottom gradient for text legibility ────────── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          // inline style: complex multi-stop gradient not expressible as a single Tailwind class
          background:
            "linear-gradient(to bottom, rgba(61,5,9,0.6) 0%, rgba(61,5,9,0.3) 40%, rgba(61,5,9,0.3) 60%, rgba(61,5,9,0.65) 100%)",
        }}
        aria-hidden="true"
      />

      <Container className="relative z-20 flex flex-col items-center text-center">

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
          <p className="font-seasons italic text-cream/75 text-base sm:text-xl mt-5 max-w-sm">
            Esperamos contar con tu presencia
          </p>
        </ScrollReveal>

        {/* ── Couple names ────────────────────────────────────── */}
        <ScrollReveal delay={250}>
          <p className="font-slight text-cream/60 text-2xl sm:text-3xl mt-10 select-none">
            {couple.partner1} &amp; {couple.partner2}
          </p>
        </ScrollReveal>

        {/* ── Date chip — desktop only ─────────────────────────── */}
        <ScrollReveal delay={330}>
          <div className={`${styles.dateChip} hidden md:inline-flex`}>
            <span className="font-cinzel text-cream/40 text-[0.6rem] tracking-[0.35em] uppercase">
              {date.displayDayOfWeek}
            </span>
            <span className="text-cream/30 text-[0.5rem]" aria-hidden="true">◆</span>
            <span className="font-cinzel text-cream/40 text-[0.6rem] tracking-[0.25em] uppercase">
              {date.displayDay}&nbsp;{date.displayMonth}&nbsp;{date.displayYear}
            </span>
          </div>
        </ScrollReveal>

      </Container>
    </section>
  );
}
