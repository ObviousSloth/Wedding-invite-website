"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { eventConfig } from "@/config/eventConfig";
import type { TimelineEvent } from "@/types";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";
import TimelineIcon from "@/components/timeline/TimelineIcon";
import styles from "./TimelineSection.module.css";

// ── Single carousel item (icon + event name + time) ─────────────────────────
function CarouselItem({
  item,
  position,
}: {
  item: TimelineEvent;
  position: "above" | "below";
}) {
  return (
    <div
      className={`${styles.item} ${position === "above" ? styles.itemAbove : styles.itemBelow}`}
    >
      {position === "above" ? (
        <>
          <div className={styles.iconWrap}>
            <TimelineIcon
              icon={item.icon}
              className={styles.icon}
              size={item.iconSize}
            />
          </div>
          <p className={styles.eventName}>{item.event}</p>
          <p className={styles.eventTime}>{item.time}</p>
        </>
      ) : (
        <>
          <p className={styles.eventTime}>{item.time}</p>
          <p className={styles.eventName}>{item.event}</p>
          <div className={styles.iconWrap}>
            <TimelineIcon
              icon={item.icon}
              className={styles.icon}
              size={item.iconSize}
            />
          </div>
        </>
      )}
    </div>
  );
}

// ── Carousel ────────────────────────────────────────────────────────────────
export default function TimelineSection() {
  const { timeline } = eventConfig;
  const trackRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const animRef = useRef<number | null>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const directionRef = useRef<1 | -1>(1); // 1 = forward, -1 = backward
  const speedRef = useRef(0.5); // px per frame
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const isInViewRef = useRef(false);

  const isDesktopRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    isDesktopRef.current = mq.matches;
    const handler = (e: MediaQueryListEvent) => {
      isDesktopRef.current = e.matches;
      if (e.matches) {
        // Cancel any running animation when switching to desktop
        if (animRef.current) {
          cancelAnimationFrame(animRef.current);
          animRef.current = null;
        }
        setIsAutoScrolling(false);
        // Clear the JS-set inline width so CSS 100% wins
        if (lineRef.current) lineRef.current.style.width = "";
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Sync line width to match the inner content width (mobile only)
  const lineRef = useRef<HTMLDivElement>(null);
  const syncLineWidth = useCallback(() => {
    if (isDesktopRef.current) return;
    const inner = innerRef.current;
    const line = lineRef.current;
    if (inner && line) {
      line.style.width = `${inner.scrollWidth}px`;
    }
  }, []);

  useEffect(() => {
    syncLineWidth();
    window.addEventListener("resize", syncLineWidth);
    return () => window.removeEventListener("resize", syncLineWidth);
  }, [syncLineWidth]);

  // Auto-scroll logic
  const tick = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const maxScroll = track.scrollWidth - track.clientWidth;

    track.scrollLeft += speedRef.current * directionRef.current;

    if (directionRef.current === 1 && track.scrollLeft >= maxScroll - 1) {
      // Reached the end — reverse direction
      directionRef.current = -1;
    } else if (directionRef.current === -1 && track.scrollLeft <= 0) {
      // Back at the start — go forward again
      directionRef.current = 1;
    }

    animRef.current = requestAnimationFrame(tick);
  }, []);

  // Start auto-scroll when section enters viewport (mobile only)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;
        if (entry.isIntersecting && !isDesktopRef.current) {
          setIsAutoScrolling(true);
        } else {
          setIsAutoScrolling(false);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Run animation loop
  useEffect(() => {
    if (isAutoScrolling) {
      animRef.current = requestAnimationFrame(tick);
    }
    return () => {
      if (animRef.current) {
        cancelAnimationFrame(animRef.current);
        animRef.current = null;
      }
    };
  }, [isAutoScrolling, tick]);

  // Pause on user interaction, resume after 1s of inactivity (mobile only)
  const handleInteractionStart = () => {
    if (isDesktopRef.current) return;
    // Stop the animation
    if (animRef.current) {
      cancelAnimationFrame(animRef.current);
      animRef.current = null;
    }
    setIsAutoScrolling(false);

    // Clear any existing resume timer
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
    }

    // Resume after 1 second if still in viewport
    resumeTimerRef.current = setTimeout(() => {
      if (isInViewRef.current) {
        setIsAutoScrolling(true);
      }
    }, 1000);
  };

  // Cleanup resume timer on unmount
  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  return (
    <section id="itinerario" className="py-24 sm:py-32 relative overflow-hidden" ref={sectionRef}>

      {/* ── Vine side decorations ────────────────────────────── */}
      <img
        src="/svgs/decorative/vine1.svg"
        alt=""
        aria-hidden="true"
        className="absolute top-0 left-0 h-full w-14 md:w-20 object-cover object-left pointer-events-none opacity-25"
      />
      <img
        src="/svgs/decorative/vine2.svg"
        alt=""
        aria-hidden="true"
        className="absolute top-0 right-0 h-full w-14 md:w-20 object-cover object-right pointer-events-none opacity-25 scale-x-[-1]"
      />

      <Container className="flex flex-col items-center">
        <ScrollReveal>
          <SectionHeading>Itinerario de actividades</SectionHeading>
        </ScrollReveal>

        <div className={styles.carousel}>
          <div
            ref={trackRef}
            className={styles.track}
            onPointerDown={handleInteractionStart}
            onWheel={handleInteractionStart}
            onTouchStart={handleInteractionStart}
          >
            <div ref={innerRef} className={styles.inner}>
              {/* Horizontal connecting line — spans full inner width */}
              <div ref={lineRef} className={styles.line} aria-hidden="true" />

              {timeline.map((item, i) => {
                const position = i % 2 === 0 ? "above" : "below";
                return (
                  <div
                    key={i}
                    className={`${styles.stop} ${position === "above" ? styles.stopAbove : styles.stopBelow}`}
                  >
                    <div className={styles.contentAbove}>
                      {position === "above" && (
                        <CarouselItem item={item} position="above" />
                      )}
                    </div>

                    <div className={styles.dotRow}>
                      <div className={styles.dot} />
                    </div>

                    <div className={styles.contentBelow}>
                      {position === "below" && (
                        <CarouselItem item={item} position="below" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
