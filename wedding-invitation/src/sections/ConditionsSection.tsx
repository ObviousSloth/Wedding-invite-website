import { eventConfig } from "@/config/eventConfig";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export default function ConditionsSection() {
  const { suggestionsAndConditions } = eventConfig;

  return (
    <section id="condiciones" className="bg-section-burgundy py-20 md:py-28">
      <Container size="sm">
        <SectionHeading title="Sugerencias y Condiciones" variant="burgundy" />
        <ul className="flex flex-col gap-5 text-center">
          {suggestionsAndConditions.items.map((item, i) => (
            <li key={i} className="flex flex-col items-center gap-2">
              <span className="font-cinzel text-cream/40 text-xs tracking-widest uppercase">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="font-seasons italic text-cream/90 text-base md:text-lg leading-relaxed max-w-md">
                {item}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
