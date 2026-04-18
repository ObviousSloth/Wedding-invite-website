import { eventConfig } from "@/config/eventConfig";
import type { Venue, CalendarEvent } from "@/types";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";
import CalendarButton from "@/components/ui/CalendarButton";
import styles from "./InfoSection.module.css";

// ── Venue card ────────────────────────────────────────────────────────────────
function VenueCard({
  venue,
  label,
  calendarEvent,
  icsFilename,
  iconName,
}: {
  venue: Venue;
  label: string;
  calendarEvent: CalendarEvent;
  icsFilename: string;
  iconName?: string; // stem of /svgs/decorative/{iconName}.svg
}) {
  return (
    <div className="border border-cream/20 rounded-2xl p-8 sm:p-10 flex flex-col items-center gap-4 text-center h-full">

      {/* Decorative icon above venue heading */}
      {iconName && (
        <img
          src={`/svgs/decorative/${iconName}.svg`}
          alt=""
          aria-hidden="true"
          className="w-16 md:w-24 object-contain opacity-90 pointer-events-none"
        />
      )}

      {/* Label */}
      <p className="font-slight text-cream text-3xl sm:text-4xl leading-tight">
        {label}
      </p>

      {/* Time */}
      <p className="font-cinzel text-cream/70 text-lg sm:text-xl tracking-widest">
        {venue.time}
      </p>

      {/* Thin rule */}
      <div className="h-px w-10 bg-cream/20" aria-hidden="true" />

      {/* Venue name */}
      <p className="font-cinzel text-cream text-venue-name font-medium leading-snug tracking-wide">
        {venue.name}
      </p>

      {/* Location */}
      <p className="font-seasons italic text-cream/55 text-sm leading-relaxed">
        {venue.location}
      </p>

      {/* Button row */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
        <a
          href={venue.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Ver ubicación de ${venue.name} en Google Maps`}
          className="
            inline-flex items-center gap-2
            px-6 py-3 min-h-[44px] rounded-full
            border border-cream/35
            font-cinzel text-cream/80 text-[10px] tracking-[0.3em] uppercase
            hover:bg-cream/10 hover:text-cream active:bg-cream/20
            transition-colors duration-200
          "
        >
          Ver Ubicación
        </a>

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

// ── Section ───────────────────────────────────────────────────────────────────
export default function InfoSection() {
  const { ceremony, reception, dressCode, calendar } = eventConfig;

  return (
    <section id="info" className="bg-section-burgundy py-24 sm:py-32 relative overflow-hidden">

      {/* ── Vine side decorations ────────────────────────────── */}
      <img
        src="/svgs/decorative/vine1.svg"
        alt=""
        aria-hidden="true"
        className="absolute top-0 left-0 h-full w-16 md:w-24 object-cover object-left pointer-events-none opacity-30"
      />
      <img
        src="/svgs/decorative/vine2.svg"
        alt=""
        aria-hidden="true"
        className="absolute top-0 right-0 h-full w-16 md:w-24 object-cover object-right pointer-events-none opacity-30 scale-x-[-1]"
      />

      <Container className="flex flex-col items-center text-center">

        {/* ── Ceremony + Reception heading ─────────────────────── */}
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
              iconName="rings"
            />
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <VenueCard
              venue={reception}
              label="Recepción"
              calendarEvent={calendar.reception}
              icsFilename="recepcion-jessika-randy.ics"
              iconName="toast"
            />
          </ScrollReveal>
        </div>

        {/* ── Divider ─────────────────────────────────────────── */}
        <div className={`${styles.sectionDivider} bg-cream`} aria-hidden="true" />

        {/* ── Dress code ──────────────────────────────────────── */}
        <ScrollReveal>
          <SectionHeading variant="light">Código de Vestimenta</SectionHeading>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <p className="font-cinzel text-cream text-xl sm:text-2xl tracking-[0.35em] uppercase mt-5 mb-3">
            {dressCode.code}
          </p>
          <p className="font-seasons italic text-cream/60 text-base sm:text-lg max-w-md mx-auto mb-6">
            {dressCode.note}
          </p>
        </ScrollReveal>

        {/* ── Color swatches — 3×3 grid, no labels ────────────── */}
        <ScrollReveal delay={200}>
          <div
            className={styles.swatches}
            role="list"
            aria-label="Colores sugeridos para el código de vestimenta"
          >
            {dressCode.suggestedColors.map((color) => (
              <div
                key={color.name}
                className={styles.swatchCircle}
                role="listitem"
                style={{ backgroundColor: color.hex }}
                /*
                  ↑ Inline style intentional: backgroundColor is a dynamic
                  hex value from eventConfig — cannot be a static Tailwind class.
                */
                aria-label={color.name}
              />
            ))}
          </div>
        </ScrollReveal>

        {/* ── Dresscode illustration ───────────────────────────── */}
        <ScrollReveal delay={280}>
          <img
            src="/svgs/decorative/dresscode.svg"
            alt=""
            aria-hidden="true"
            className="w-28 md:w-36 object-contain opacity-80 mt-8 pointer-events-none"
          />
        </ScrollReveal>

      </Container>
    </section>
  );
}
