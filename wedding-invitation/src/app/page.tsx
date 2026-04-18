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

export default function Home() {
  return (
    <>
      <LandingController />
      <Navbar />
      <main>
        <HeroSection />

        {/* Cream: Date, Story, Timeline, Gifts share texture */}
        <div className="bg-section-cream">
          <DateSection />
          <StorySection />
          <TimelineSection />
          <GiftsSection />
        </div>

        {/* Burgundy: Ceremony, Reception, Dress Code */}
        <InfoSection />

        {/* Burgundy: RSVP */}
        <RSVPSection />

        {/* Burgundy: Accommodations + Conditions */}
        <div className="bg-section-burgundy">
          <AccommodationsSection />
          <ConditionsSection />
        </div>

        {/* Cream: Contact */}
        <div className="bg-section-cream">
          <ContactSection />
        </div>

        {/* Photo bg: Thank You */}
        <ThankYouSection />
      </main>
    </>
  );
}
