import { eventConfig } from "@/config/eventConfig";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";
import styles from "./StorySection.module.css";

export default function StorySection() {
  const { story, couple } = eventConfig;

  return (
    <section id="historia" className="relative py-24 sm:py-32 overflow-hidden">

      {/* ── Corner floral decorations ──────────────────────── */}
      <img
        src="/svgs/decorative/vine1.svg"
        alt=""
        aria-hidden="true"
        className={`${styles.corner} ${styles.cornerTopLeft}`}
      />
      <img
        src="/svgs/decorative/greenflower1.svg"
        alt=""
        aria-hidden="true"
        className={`${styles.corner} ${styles.cornerTopRight}`}
      />
      <img
        src="/svgs/decorative/pinkflower.svg"
        alt=""
        aria-hidden="true"
        className={`${styles.corner} ${styles.cornerBottomLeft}`}
      />
      <img
        src="/svgs/decorative/vine2.svg"
        alt=""
        aria-hidden="true"
        className={`${styles.corner} ${styles.cornerBottomRight}`}
      />

      <Container>

        {/* ── Section heading ─────────────────────────────────── */}
        <ScrollReveal className="flex justify-center mb-14">
          <SectionHeading variant="dark" className="text-center">Nuestra Historia</SectionHeading>
        </ScrollReveal>

        {/* ── Story blocks ────────────────────────────────────── */}
        <div className={styles.layout}>
          {story.blocks.map((block, i) => (
            <ScrollReveal key={i} delay={i * 150}>
              <article className={styles.block}>
                {block.icon && (
                  <img
                    src={`/svgs/decorative/${block.icon}.svg`}
                    alt=""
                    aria-hidden="true"
                    className={styles.blockIcon}
                  />
                )}
                <p className="font-seasons italic text-burgundy/90 text-story-body leading-relaxed">
                  {block.text}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>

        {/* ── Monogram divider ────────────────────────────────── */}
        <div className="flex items-center gap-4 mt-14" aria-hidden="true">
          <div className="h-px flex-1 bg-burgundy/15" />
          <span className="font-icon text-burgundy/30 text-2xl select-none">
            {couple.monogram}
          </span>
          <div className="h-px flex-1 bg-burgundy/15" />
        </div>

      </Container>
    </section>
  );
}
