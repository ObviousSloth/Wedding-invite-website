import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export default function RSVPSection() {
  return (
    <section id="rsvp" className="bg-section-cream py-20 md:py-28">
      <Container size="sm">
        <SectionHeading title="Confirma tu Presencia" variant="cream" />
        <div className="text-center">
          <div className="inline-block border border-burgundy/30 rounded-3xl px-10 py-10">
            <p className="font-seasons italic text-burgundy/60 text-lg">
              El sistema de confirmación llegará en la próxima actualización.
            </p>
            <p className="font-cinzel text-burgundy/40 text-xs tracking-widest uppercase mt-3">
              Próximamente
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
