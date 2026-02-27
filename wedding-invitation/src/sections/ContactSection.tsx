import { eventConfig } from "@/config/eventConfig";
import ScrollReveal from "@/components/ScrollReveal";
import Container from "@/components/ui/Container";

export default function ContactSection() {
  const { contact } = eventConfig;

  return (
    <section id="contacto" className="bg-section-cream py-16 sm:py-20">
      <Container className="flex flex-col items-center text-center">

        <ScrollReveal>
          <div className="flex flex-col items-center gap-3">

            {/* Message */}
            <p className="font-seasons italic text-burgundy/60 text-base sm:text-lg">
              {contact.message}
            </p>

            {/* Thin rule */}
            <div className="w-8 h-px bg-burgundy/15 my-1" aria-hidden="true" />

            {/* Email link */}
            <a
              href={`mailto:${contact.email}`}
              className="
                font-cinzel text-burgundy/70 text-[0.78rem] sm:text-sm
                tracking-[0.2em] uppercase
                border-b border-burgundy/20 pb-px
                hover:text-burgundy hover:border-burgundy/50
                transition-colors duration-200
              "
            >
              {contact.email}
            </a>

          </div>
        </ScrollReveal>

      </Container>
    </section>
  );
}
