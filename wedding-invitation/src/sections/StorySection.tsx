import { eventConfig } from "@/config/eventConfig";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";
import styles from "./StorySection.module.css";

export default function StorySection() {
  const { story, couple } = eventConfig;

  return (
    <section id="historia" className="relative py-24 sm:py-32 overflow-hidden">


      <Container size="lg">

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
                <p className="font-oldstandard italic text-burgundy/90 text-story-body leading-relaxed">
                  {block.text}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>


      </Container>
    </section>
  );
}
