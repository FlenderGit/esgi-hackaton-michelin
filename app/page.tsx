import HeroSection from "@/components/landing/HeroSection";
import ChampionsSection from "@/components/landing/ChampionsSection";
import CtaSection from "@/components/landing/CtaSection";
import FullpageWrapper from "@/components/landing/FullpageWrapper";

export default function Home() {
  return (
    <FullpageWrapper>
      <HeroSection />
      <ChampionsSection />
      <CtaSection />
    </FullpageWrapper>
  );
}
