import { eventConfig } from "@/config/eventConfig";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export default function AccommodationsSection() {
  const { accommodations } = eventConfig;

  return (
    <section id="acomodaciones" className="bg-section-sage py-20 md:py-28">
      <Container size="md">
        <SectionHeading title="Acomodaciones" variant="burgundy" />
        <p className="font-seasons italic text-cream/90 text-lg leading-relaxed text-center max-w-xl mx-auto">
          {accommodations.text}
        </p>
        {accommodations.hotels && accommodations.hotels.length > 0 && (
          <ul className="mt-8 flex flex-col gap-4">
            {accommodations.hotels.map((hotel) => (
              <li key={hotel.name} className="text-center">
                <a
                  href={hotel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-cinzel text-cream hover:underline text-sm tracking-wide"
                >
                  {hotel.name}
                </a>
                <span className="font-seasons italic text-cream/60 text-sm ml-2">
                  — {hotel.distance}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
