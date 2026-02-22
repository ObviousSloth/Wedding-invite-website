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

export default function Home() {
  return (
    <>
      <LandingController />
      <Navbar />
      <main>
        <HeroSection />
        <ScrollReveal>
          <DateSection />
        </ScrollReveal>
        <ScrollReveal>
          <StorySection />
        </ScrollReveal>
        <ScrollReveal>
          <InfoSection />
        </ScrollReveal>
        <ScrollReveal>
          <TimelineSection />
        </ScrollReveal>
        <ScrollReveal>
          <GiftsSection />
        </ScrollReveal>
        <ScrollReveal>
          <RSVPSection />
        </ScrollReveal>
        <ScrollReveal>
          <AccommodationsSection />
        </ScrollReveal>
        <ScrollReveal>
          <ConditionsSection />
        </ScrollReveal>
        <ThankYouSection />
      </main>
    </>
  );
}
