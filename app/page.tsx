import FadeInSection from "@/components/FadeInSection";
import Hero from "@/sections/Hero";
import WhyUs from "@/sections/WhyUs";
import Experiences from "@/sections/Experiences";
import Testimonials from "@/sections/Testimonials";
import Footer from "@/sections/Footer";
import ExperienceSelector from "@/components/ExperienceSelector";


export default function Home() {
  return (
    <>
      <Hero />
      <ExperienceSelector />
      <WhyUs />
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
