import { eventConfig } from "@/config/eventConfig";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";
import styles from "./ConditionsSection.module.css";

export default function ConditionsSection() {
  const { suggestionsAndConditions } = eventConfig;

  return (
    <section id="condiciones" className="bg-section-cream py-24 sm:py-32">
      <Container className="flex flex-col items-center text-center">

        <ScrollReveal>
          <SectionHeading variant="dark">
            Sugerencias y Condiciones
          </SectionHeading>
        </ScrollReveal>

        <div
          className={styles.list}
          role="list"
          aria-label="Sugerencias y condiciones del evento"
        >
          {suggestionsAndConditions.items.map((item, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <div className={styles.listItem} role="listitem">

                {/* Number badge */}
                <div className={styles.badge} aria-hidden="true">
                  <span className="font-cinzel text-burgundy/40 text-[0.6rem] tracking-wide">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Item text */}
                <p className="font-seasons italic text-burgundy/75 text-story-body leading-relaxed text-left">
                  {item}
                </p>

              </div>
            </ScrollReveal>
          ))}
        </div>

      </Container>
    </section>
  );
}
