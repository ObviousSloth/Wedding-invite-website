import { eventConfig } from "@/config/eventConfig";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const iconMap: Record<string, string> = {
  church:   "⛪",
  car:      "🚗",
  cocktail: "🥂",
  dance:    "💃",
  menu:     "🍽",
  cake:     "🎂",
  disco:    "🪩",
  clock:    "🕐",
};

export default function TimelineSection() {
  return (
    <section id="itinerario" className="bg-section-cream py-20 md:py-28">
      <Container size="sm">
        <SectionHeading
          title="Itinerario de Actividades"
          variant="cream"
        />

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-burgundy/20" />

          <div className="flex flex-col gap-0">
            {eventConfig.timeline.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div
                  key={index}
                  className={`flex items-center gap-6 md:gap-10 py-6 ${
                    isLeft ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${isLeft ? "text-right" : "text-left"}`}>
                    <p className="font-seasons italic text-burgundy/60 text-sm mb-1">
                      {item.time}
                    </p>
                    <p className="font-cinzel text-burgundy tracking-widest uppercase text-xs md:text-sm">
                      {item.event}
                    </p>
                  </div>

                  {/* Center dot + icon */}
                  <div className="relative flex-shrink-0 w-10 h-10 rounded-full bg-cream border-2 border-burgundy/30 flex items-center justify-center z-10 text-base">
                    {iconMap[item.icon] ?? "◆"}
                  </div>

                  {/* Empty opposite side */}
                  <div className="flex-1" />
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
