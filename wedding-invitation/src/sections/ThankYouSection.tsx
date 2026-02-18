import { eventConfig } from "@/config/eventConfig";
import Container from "@/components/ui/Container";

export default function ThankYouSection() {
  return (
    <section
      id="gracias"
      className="relative bg-section-burgundy py-28 md:py-40 overflow-hidden"
    >
      {/* Decorative monogram watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span className="font-icon text-cream/5 text-[20rem] leading-none">
          {eventConfig.couple.monogram}
        </span>
      </div>

      <Container size="sm">
        <div className="relative z-10 text-center flex flex-col items-center gap-6">
          <h2 className="font-slight text-cream text-6xl md:text-7xl">
            ¡Muchas Gracias!
          </h2>
          <div className="divider text-cream" />
          <p className="font-cinzel tracking-[0.35em] uppercase text-cream/60 text-xs md:text-sm">
            Esperamos contar con tu presencia
          </p>
          <p className="font-icon text-cream/40 text-4xl mt-4">
            {eventConfig.couple.partner1} &amp; {eventConfig.couple.partner2}
          </p>
        </div>
      </Container>
    </section>
  );
}
