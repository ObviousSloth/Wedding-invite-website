import Navbar from "@/components/Navbar";
import HeroSection from "@/sections/HeroSection";
import DateSection from "@/sections/DateSection";
import StorySection from "@/sections/StorySection";
import InfoSection from "@/sections/InfoSection";
import TimelineSection from "@/sections/TimelineSection";
import GiftsSection from "@/sections/GiftsSection";
import RSVPSection from "@/sections/RSVPSection";
import AccommodationsSection from "@/sections/AccommodationsSection";
import ConditionsSection from "@/sections/ConditionsSection";
import ThankYouSection from "@/sections/ThankYouSection";
import LandingController from "@/components/LandingController";
import ContactSection from "@/sections/ContactSection";
import SideFlorals from "@/components/florals/SideFlorals";

export default function Home() {
  return (
    <>
      <LandingController />
      <Navbar />
      <main>
        <HeroSection />

        {/*
          Single relative wrapper for all middle sections.
          SideFlorals is placed last so it paints on top of backgrounds
          but stays invisible to pointer events (pointer-events: none is
          set inside SideFlorals). Opacity keeps it purely decorative.
        */}
        <div className="relative">
          <div className="bg-section-cream">
            <DateSection />
            <StorySection />
            <TimelineSection />
            <GiftsSection />
          </div>

          <InfoSection />
          <RSVPSection />

          <div className="bg-section-burgundy">
            <AccommodationsSection />
            <ConditionsSection />
          </div>

          <div className="bg-section-cream">
            <ContactSection />
          </div>

          {/* Burgundy vine — visible on cream sections */}
          <SideFlorals color="var(--color-burgundy)" opacity={0.18} width={72} zIndex={10} />
          {/* Cream vine — visible on burgundy sections */}
          <SideFlorals color="var(--color-cream)"    opacity={0.25} width={72} zIndex={10} />
        </div>

        <ThankYouSection />
      </main>
    </>
  );
}
