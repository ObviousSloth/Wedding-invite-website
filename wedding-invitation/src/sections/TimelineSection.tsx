import { eventConfig } from "@/config/eventConfig";
import type { TimelineEvent } from "@/types";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";
import TimelineIcon from "@/components/timeline/TimelineIcon";
import styles from "./TimelineSection.module.css";

// ── Card sub-component ───────────────────────────────────────────────────────
function TimelineCard({ item }: { item: TimelineEvent }) {
  return (
    <div className={styles.card}>
      <p className="font-cinzel text-burgundy/45 text-[10px] tracking-[0.4em] uppercase mb-[3px]">
        {item.time}
      </p>
      <p className="font-cinzel text-burgundy text-[0.82rem] sm:text-[0.9rem] tracking-wide font-medium leading-snug">
        {item.event}
      </p>
    </div>
  );
}

// ── Section ──────────────────────────────────────────────────────────────────
export default function TimelineSection() {
  const { timeline } = eventConfig;

  return (
    <section id="itinerario" className="py-24 sm:py-32">
      <Container className="flex flex-col items-center">

        <ScrollReveal>
          <SectionHeading>Itinerario</SectionHeading>
        </ScrollReveal>

        <div className={styles.wrapper}>

          {/* Center vertical line */}
          <div className={styles.vertLine} aria-hidden="true" />

          {timeline.map((item, i) => {
            const isEven = i % 2 === 0;
            const isLast = i === timeline.length - 1;

            return (
              <ScrollReveal key={i} delay={i * 75}>
                <div
                  className={`
                    ${styles.item}
                    ${isEven ? styles.itemEven : styles.itemOdd}
                  `}
                >

                  {/* ── Desktop SVG (hidden on mobile) ───────────────
                      Even  → renders in LEFT  column
                      Odd   → renders in RIGHT column
                      CSS grid-column placement handles this — DOM
                      order doesn't matter for desktop. ✓
                  ──────────────────────────────────────────────────── */}
                  <div className={styles.svgSlot}>
                    <TimelineIcon
                      icon={item.icon}
                      className={styles.svgIcon}
                      size={item.iconSize}
                    />
                  </div>

                  {/* ── Dot (center line marker) ─────────────────── */}
                  <div className={styles.dotSlot}>
                    <div className={styles.dot} />
                  </div>

                  {/* ── Event card ───────────────────────────────── */}
                  <div className={styles.cardSlot}>
                    <TimelineCard item={item} />
                  </div>

                  {/* ── Mobile SVG connector (hidden on desktop) ───
                      Appears in row 2, between this item's card and
                      the next item's dot. Not shown after last item.
                  ──────────────────────────────────────────────────── */}
                  {!isLast && (
                    <div className={styles.mobileSvgRow}>
                      <TimelineIcon
                        icon={item.icon}
                        className={styles.svgIconMobile}
                        size={item.iconSize}
                      />
                    </div>
                  )}

                </div>
              </ScrollReveal>
            );
          })}

        </div>

      </Container>
    </section>
  );
}
