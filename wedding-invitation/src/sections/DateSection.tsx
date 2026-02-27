import { eventConfig } from "@/config/eventConfig";
import AdaptiveCountdown from "@/components/countdown/AdaptiveCountdown";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";
import styles from "./DateSection.module.css";

export default function DateSection() {
  const { date } = eventConfig;

  return (
    <section id="fecha" className="bg-section-burgundy py-24 sm:py-32">
      <Container className="flex flex-col items-center text-center">

        <ScrollReveal>
          <SectionHeading variant="light">Nos Casamos</SectionHeading>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <div className={styles.dateBlock}>

            {/* Day of week */}
            <p className="font-cinzel text-cream/50 text-[10px] sm:text-[11px] tracking-[0.45em] uppercase">
              {date.displayDayOfWeek}
            </p>

            {/* Large "19" — fluid via @theme --text-date-number */}
            <p className="font-icon text-cream text-date-number leading-none select-none">
              {date.displayDay}
            </p>

            {/* Divider */}
            <div className={`${styles.dateDivider} bg-burgundy`} aria-hidden="true" />

            {/* Month · Year */}
            <p className="font-cinzel text-cream/60 text-xs sm:text-sm tracking-[0.35em] uppercase">
              {date.displayMonth}&nbsp;&nbsp;·&nbsp;&nbsp;{date.displayYear}
            </p>

          </div>
        </ScrollReveal>

        {/* Adaptive countdown — already a "use client" component */}
        <ScrollReveal delay={300}>
          <AdaptiveCountdown targetDate={date.iso} />
        </ScrollReveal>

      </Container>
    </section>
  );
}
