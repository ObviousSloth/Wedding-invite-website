import { eventConfig } from "@/config/eventConfig";
import type { Venue, CalendarEvent } from "@/types";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";
import CalendarButton from "@/components/ui/CalendarButton";
import styles from "./InfoSection.module.css";

// ── Reusable venue card ──────────────────────────────────────────────────────
function VenueCard({
  venue,
  label,
  calendarEvent,
  icsFilename,
}: {
  venue: Venue;
  label: string;
  calendarEvent: CalendarEvent;
  icsFilename: string;
}) {
  return (
    <div className="border border-cream/20 rounded-2xl p-8 sm:p-10 flex flex-col items-center gap-4 text-center h-full">

      {/* Label */}
      <p className="font-cinzel text-cream/45 text-[10px] tracking-[0.5em] uppercase">
        {label}
      </p>

      {/* Venue name */}
      <p className="font-cinzel text-cream text-venue-name font-medium leading-snug tracking-wide">
        {venue.name}
      </p>

      {/* Time */}
      <p className="font-seasons italic text-cream/70 text-xl">
        {venue.time}
      </p>

      {/* Thin rule */}
      <div className="h-px w-10 bg-cream/20" aria-hidden="true" />

      {/* Address */}
      <p className="font-oldstandard text-cream/55 text-sm leading-relaxed">
        {venue.address}
      </p>

      {/* Button row */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-2">

        {/* Maps link — unchanged from your original */}
        <a
          href={venue.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Ver ubicación de ${venue.name} en Google Maps`}
          className="
            inline-flex items-center gap-2
            px-6 py-2 rounded-full
            border border-cream/35
            font-cinzel text-cream/80 text-[10px] tracking-[0.3em] uppercase
            hover:bg-cream/10 hover:text-cream
            transition-colors duration-200
          "
        >
          <svg
            className="w-3 h-3 flex-shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
          Ver Ubicación
        </a>

        {/* Calendar button — Phase 4 addition */}
        <CalendarButton
          event={calendarEvent}
          icsFilename={icsFilename}
          label="Calendario"
          variant="light"
        />

      </div>
    </div>
  );
}

// ── Section ──────────────────────────────────────────────────────────────────
export default function InfoSection() {
  const { ceremony, reception, dressCode, calendar } = eventConfig;

  return (
    <section id="info" className="bg-section-burgundy py-24 sm:py-32">
      <Container className="flex flex-col items-center text-center">

        {/* ── Venue heading ───────────────────────────────────── */}
        <ScrollReveal>
          <SectionHeading variant="light">El Gran Día</SectionHeading>
        </ScrollReveal>

        {/* ── Venue cards ─────────────────────────────────────── */}
        <div className={styles.venueGrid}>
          <ScrollReveal delay={0}>
            <VenueCard
              venue={ceremony}
              label="Ceremonia Religiosa"
              calendarEvent={calendar.ceremony}
              icsFilename="ceremonia-jessika-randy.ics"
            />
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <VenueCard
              venue={reception}
              label="Recepción"
              calendarEvent={calendar.reception}
              icsFilename="recepcion-jessika-randy.ics"
            />
          </ScrollReveal>
        </div>

        {/* ── Divider ─────────────────────────────────────────── */}
        <div className={`${styles.sectionDivider} bg-cream`} aria-hidden="true" />

        {/* ── Dress code heading ──────────────────────────────── */}
        <ScrollReveal>
          <SectionHeading variant="light">Código de Vestimenta</SectionHeading>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <p className="font-cinzel text-cream text-xl sm:text-2xl tracking-[0.35em] uppercase mt-5 mb-3">
            {dressCode.code}
          </p>
          <p className="font-seasons italic text-cream/60 text-base sm:text-lg max-w-md mx-auto">
            {dressCode.note}
          </p>
        </ScrollReveal>

        {/* ── Color swatches ──────────────────────────────────── */}
        <ScrollReveal delay={200}>
          <div
            className={styles.swatches}
            role="list"
            aria-label="Colores sugeridos para el código de vestimenta"
          >
            {dressCode.suggestedColors.map((color) => (
              <div key={color.name} className={styles.swatch} role="listitem">
                <div
                  className={styles.swatchCircle}
                  style={{ backgroundColor: color.hex }}
                  /*
                    ↑ Inline style intentional: backgroundColor is a dynamic
                    hex value from eventConfig — cannot be a static Tailwind class.
                  */
                  aria-label={color.name}
                />
                <span className={`${styles.swatchLabel} font-cinzel text-cream`}>
                  {color.name}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>

      </Container>
    </section>
  );
}
