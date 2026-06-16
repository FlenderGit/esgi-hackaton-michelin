import HeroSection from "@/components/landing/HeroSection";
import TimelineSection from "@/components/landing/TimelineSection";
import InnovationSection from "@/components/landing/InnovationSection";
import ChampionsSection from "@/components/landing/ChampionsSection";
import CtaSection from "@/components/landing/CtaSection";
import FullpageWrapper from "@/components/landing/FullpageWrapper";

export default function Home() {
  return (
    <FullpageWrapper>
      <HeroSection />
      <TimelineSection />
      <ChampionsSection />
      <InnovationSection />
      <CtaSection />
    </FullpageWrapper>
  );
}
