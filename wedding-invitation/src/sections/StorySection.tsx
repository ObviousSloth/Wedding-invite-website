import { eventConfig } from "@/config/eventConfig";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export default function StorySection() {
  return (
    <section id="historia" className="bg-section-sage py-20 md:py-28">
      <Container size="md">
        <SectionHeading
          title="Nuestra Historia"
          variant="burgundy"
        />
        <div className="flex flex-col md:flex-row gap-10 items-center">
          {/* Story text */}
          <div className="flex-1 text-center md:text-left">
            <p className="font-seasons italic text-cream text-lg md:text-xl leading-relaxed">
              {eventConfig.story.text}
            </p>
          </div>
          {/* Placeholder image */}
          {eventConfig.story.imageUrl && (
            <div className="flex-1">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-sage-dark/40 flex items-center justify-center max-w-xs mx-auto">
                {/* Replace with Next.js <Image> when real photo is provided */}
                <p className="font-cinzel text-cream/50 text-sm text-center px-4">
                  Foto de la pareja
                </p>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
