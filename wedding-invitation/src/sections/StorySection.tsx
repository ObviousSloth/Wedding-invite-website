import Image from "next/image";
import { eventConfig } from "@/config/eventConfig";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";
import styles from "./StorySection.module.css";

export default function StorySection() {
  const { story, couple } = eventConfig;

  return (
    <section id="historia" className=" py-24 sm:py-32">
      <Container>

        {/* ── Section heading ─────────────────────────────────── */}
        <ScrollReveal className="flex justify-center mb-14">
          <SectionHeading variant="dark">Nuestra Historia</SectionHeading>
        </ScrollReveal>

        <div className={styles.layout}>

          {/* ── Couple photo ──────────────────────────────────── */}
          <ScrollReveal>
            <div className={styles.imageFrame}>

                <Image
                  src={story.imageUrl}
                  alt={`${couple.partner1} & ${couple.partner2}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
             
              <div className={`${styles.imagePlaceholder} bg-cream-dark/30`}>
                <span className="text-5xl opacity-25" aria-hidden="true">📷</span>
                <p className="font-cinzel text-cream/35 text-[10px] tracking-[0.25em] uppercase">
                  Foto por añadir
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* ── Story text ──────────────────────────────────── */}
          <ScrollReveal delay={200}>
            <div className="flex flex-col gap-6">

              {/* Decorative opening quote mark */}
              <span
                className="font-slight text-burgundy/20 leading-none select-none"
                style={{ fontSize: "5rem", lineHeight: 1 }}
                aria-hidden="true"
              >
                "
              </span>

              <p className="font-seasons italic text-burgundy/90 text-story-body leading-relaxed -mt-8">
                {story.text}
              </p>

              {/* Monogram divider */}
              <div className="flex items-center gap-4 mt-2" aria-hidden="true">
                <div className="h-px flex-1 bg-cream/20" />
                <span className="font-icon text-burgundy/30 text-2xl select-none">
                  {couple.monogram}
                </span>
                <div className="h-px flex-1 bg-cream/20" />
              </div>

            </div>
          </ScrollReveal>

        </div>

      </Container>
    </section>
  );
}
