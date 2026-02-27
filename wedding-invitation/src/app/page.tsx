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
import ScrollReveal from "@/components/ScrollReveal";
import LandingController from "@/components/LandingController";
import CreamBackground from "@/components/ui/CreamBackground";
import ContactSection from "@/sections/ContactSection";

export default function Home() {
  return (
    <>
      <LandingController />
      <Navbar />
        <main>
    <HeroSection />

    {/* Shared cream background — no seam */}
    <div className="bg-section-cream">
      <DateSection />
      <StorySection />
    </div>

    <InfoSection />

    <div className="bg-section-cream">
      <TimelineSection />
    </div>

    <GiftsSection />

    <div className="bg-section-cream">
      <RSVPSection />
    </div>

    <div className="bg-section-burgundy">
      <AccommodationsSection />
      <ConditionsSection />
    </div>

    <div className="bg-section-cream">
      <ContactSection />
    </div>

    <ThankYouSection />
  </main>

    </>
  );
}
