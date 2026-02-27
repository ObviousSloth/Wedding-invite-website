import { eventConfig } from "@/config/eventConfig";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";
import styles from "./AccommodationsSection.module.css";

export default function AccommodationsSection() {
  const { accommodations } = eventConfig;
  const hasHotels = accommodations.hotels.length > 0;

  return (
    <section id="alojamiento" className="bg-section-burgundy py-24 sm:py-32">
      <Container className="flex flex-col items-center text-center">

        <ScrollReveal>
          <SectionHeading variant="light">Alojamientos</SectionHeading>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <p className="font-seasons italic text-cream/75 text-story-body leading-relaxed max-w-xl mt-6">
            {accommodations.text}
          </p>
        </ScrollReveal>

        {/* ── Hotel cards (shown once hotels are added to eventConfig) ── */}
        {hasHotels ? (
          <div className={styles.hotelsGrid}>
            {accommodations.hotels.map((hotel, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className={styles.hotelCard}>
                  <p className="font-cinzel text-cream/90 text-sm font-medium tracking-wide">
                    {hotel.name}
                  </p>
                  {hotel.address && (
                    <p className="font-oldstandard text-cream/50 text-[0.8rem] leading-relaxed">
                      {hotel.address}
                    </p>
                  )}
                  {hotel.priceRange && (
                    <p className="font-cinzel text-cream/35 text-[0.65rem] tracking-[0.2em] uppercase mt-1">
                      {hotel.priceRange}
                    </p>
                  )}
                  {hotel.url && (
                    <a
                      href={hotel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Ver ${hotel.name}`}
                      className="
                        mt-2 self-start
                        font-cinzel text-cream/55 text-[0.62rem] tracking-[0.2em] uppercase
                        border-b border-cream/25 pb-px
                        hover:text-cream/90 hover:border-cream/60
                        transition-colors duration-200
                      "
                    >
                      Ver hotel →
                    </a>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          /* ── Placeholder shown until hotels are added ── */
          <ScrollReveal delay={250}>
            <div className={styles.placeholder}>
              <p className="font-cinzel text-cream/30 text-[0.7rem] tracking-[0.3em] uppercase">
                Próximamente
              </p>
              <p className="font-seasons italic text-cream/45 text-sm mt-2">
                Añadiremos hoteles recomendados en breve
              </p>
            </div>
          </ScrollReveal>
        )}

      </Container>
    </section>
  );
}
