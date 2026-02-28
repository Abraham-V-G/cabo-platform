import FadeInSection from "@/components/FadeInSection";
import Hero from "@/sections/Hero";
import Experiences from "@/sections/Experiences";
import Testimonials from "@/sections/Testimonials";
import Footer from "@/sections/Footer";

export default function Home() {
  return (
    <>
      <Hero />

      <FadeInSection>
        <Experiences />
      </FadeInSection>

      <FadeInSection>
        <Testimonials />
      </FadeInSection>

      <FadeInSection>
        <Footer />
      </FadeInSection>
    </>
  );
}
