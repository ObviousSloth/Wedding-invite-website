import Navbar from "@/components/Navbar";
import HeroSection from "@/sections/HeroSection";
import DateSection from "@/sections/DateSection";
import StorySection from "@/sections/StorySection";
import InfoSection from "@/sections/InfoSection";
import TimelineSection from "@/sections/TimelineSection";
import GiftsSection from "@/sections/GiftsSection";
import RSVPSection from "@/sections/RSVPSection";
import TransportSection from "@/sections/TransportSection";
import AccommodationsSection from "@/sections/AccommodationsSection";
import ConditionsSection from "@/sections/ConditionsSection";
import ThankYouSection from "@/sections/ThankYouSection";
import LandingController from "@/components/LandingController";
import ContactSection from "@/sections/ContactSection";
import SideFlorals from "@/components/florals/SideFlorals";
import SectionDivider from "@/components/SectionDivider";

export default function Home() {
  return (
    <>
      <LandingController />
      <Navbar />
      <main>
        <HeroSection />

        <div className="relative">
          <div className="bg-section-cream">
            <DateSection />
            <SectionDivider tone="cream" />
            <StorySection />
            <SectionDivider tone="cream" />
            <TimelineSection />
            <SectionDivider tone="cream" />
            <GiftsSection />
          </div>
          <div className="bg-section-burgundy">
          <InfoSection />
          </div>
          <TransportSection />
          <div className="bg-section-burgundy">
            <RSVPSection />
             <SectionDivider tone="burgundy" />
            <AccommodationsSection />
           </div>
          <div className="bg-section-cream">
            <ConditionsSection />
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
