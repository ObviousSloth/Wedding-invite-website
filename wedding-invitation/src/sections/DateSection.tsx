"use client";

import { eventConfig } from "@/config/eventConfig";
import Container from "@/components/ui/Container";
import AdaptiveCountdown from "@/components/countdown/AdaptiveCountdown";

export default function DateSection() {
  return (
    <section id="fecha" className="bg-section-cream py-20 md:py-28">
      <Container size="md">
        <div className="text-center flex flex-col items-center gap-8">

          {/* Sub heading */}
          <p className="font-slight text-burgundy/70 text-2xl md:text-3xl">
            Acompáñanos este día especial
          </p>

          {/* Date display */}
          <div className="flex flex-col items-center gap-2">
            <p className="font-cinzel text-burgundy/60 tracking-[0.4em] uppercase text-sm">
              {eventConfig.date.displayMonth}
            </p>
            <div className="flex items-center gap-6 md:gap-10">
              <span className="font-cinzel text-burgundy/50 tracking-[0.3em] uppercase text-sm">
                {eventConfig.date.displayDayOfWeek}
              </span>
              <span className="font-icon text-burgundy text-8xl md:text-[10rem] leading-none">
                {eventConfig.date.displayDay}
              </span>
              <span className="font-cinzel text-burgundy/50 tracking-[0.3em] uppercase text-sm">
                {eventConfig.date.displayYear}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="divider text-burgundy" />

          {/* Countdown */}
          <AdaptiveCountdown targetDate={eventConfig.date.iso} />

        </div>
      </Container>
    </section>
  );
}
