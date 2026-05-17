import { eventConfig } from "@/config/eventConfig";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";
import styles from "./TransportSection.module.css";

export default function TransportSection() {
  const { transport } = eventConfig;

  return (
    <section id="transporte" className="bg-section-cream py-24 sm:py-32">
      <Container className="flex flex-col items-center text-center">

        {/* Bus icon */}
        <ScrollReveal>
          <img
            src="/svgs/decorative/bus.svg"
            alt=""
            aria-hidden="true"
            className="w-20 md:w-24 object-contain mb-6 opacity-75 pointer-events-none"
          />
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <SectionHeading variant="dark">Transporte</SectionHeading>
        </ScrollReveal>

        <ScrollReveal delay={160}>
          <p className="font-oldstandard italic text-burgundy/75 text-story-body leading-relaxed max-w-xl mt-6 mb-10">
            {transport.description}
          </p>
        </ScrollReveal>

        {/* Salida + Regreso cards */}
        <ScrollReveal delay={240}>
          <div className={styles.cards}>

            {/* Pickup */}
            <div className={styles.card}>
              <p className="font-cinzel text-burgundy/35 text-[0.62rem] tracking-[0.4em] uppercase mb-2">
                Salida
              </p>
              <p className="font-cinzel text-burgundy text-base font-medium tracking-wide">
                {transport.pickup.location}
              </p>
              <p className="font-oldstandard italic text-burgundy/55 text-sm mt-1 leading-snug">
                {transport.pickup.address}
              </p>
              <p className="font-cinzel text-burgundy/70 text-sm tracking-widest mt-3">
                {transport.pickup.time}
              </p>
            </div>

            <div className={styles.divider} aria-hidden="true" />

            {/* Return — two drop-off stops */}
            <div className={styles.card}>
              <p className="font-cinzel text-burgundy/35 text-[0.62rem] tracking-[0.4em] uppercase mb-3">
                Regreso
              </p>
              <p className="font-cinzel text-burgundy/70 text-sm tracking-widest mb-4">
                {transport.returnTime}
              </p>

              <ol className={styles.stopsList}>
                {transport.returnStops.map((stop, i) => (
                  <li key={i} className={styles.stop}>
                    <span className={styles.stopNumber}>{i + 1}</span>
                    <div className={styles.stopInfo}>
                      <p className="font-cinzel text-burgundy text-sm font-medium tracking-wide">
                        {stop.location}
                      </p>
                      {stop.address && (
                        <p className="font-oldstandard italic text-burgundy/55 text-[0.8rem] mt-0.5 leading-snug">
                          {stop.address}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>

          </div>
        </ScrollReveal>

        <ScrollReveal delay={320}>
          <p className="font-cinzel text-burgundy/40 text-[0.68rem] tracking-[0.2em] uppercase mt-10 max-w-sm">
            {transport.note}
          </p>
        </ScrollReveal>

      </Container>
    </section>
  );
}
