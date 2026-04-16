import Navbar from "./components/Navbar";
import AttractionsSection from "./components/sections/AttractionsSection";
import ExperienceSection from "./components/sections/ExperienceSection";
import FooterSection from "./components/sections/FooterSection";
import HeroSection from "./components/sections/HeroSection";
import MapSection from "./components/sections/MapSection";
import StoriesSection from "./components/sections/StoriesSection";
import TicketsSection from "./components/sections/TicketsSection";
import VisitSection from "./components/sections/VisitSection";

export default function App() {
  return (
    <div
      className="min-h-screen"
      style={{ background: "#FAFAF5", color: "#1C1C2E" }}
    >
      <Navbar />
      <main>
        <section id="hero">
          <HeroSection />
        </section>
        <section id="attractions">
          <AttractionsSection />
        </section>
        <section id="map">
          <MapSection />
        </section>
        <section id="experience">
          <ExperienceSection />
        </section>
        <section id="pricing">
          <TicketsSection />
        </section>
        <section id="stories">
          <StoriesSection />
        </section>
        <section id="visit">
          <VisitSection />
        </section>
        <FooterSection />
      </main>
    </div>
  );
}
