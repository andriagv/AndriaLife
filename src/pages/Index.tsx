import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import CategorySelection from "@/components/CategorySelection";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import Particles from "@/components/Particles";
import { CategoryProvider } from "@/contexts/CategoryContext";
import { useTheme } from "@/contexts/ThemeContext";
import MathematicsTimeline from "@/components/MathematicsTimeline";
import { useCategory } from "@/contexts/CategoryContext";

interface IndexProps {
  showParticles: boolean;
  setShowParticles: (value: boolean) => void;
  showSplashCursor: boolean;
  setShowSplashCursor: (value: boolean) => void;
}

const IndexContent: React.FC<IndexProps> = ({ showParticles, setShowParticles, showSplashCursor, setShowSplashCursor }) => {
  const { theme } = useTheme();
  const { category } = useCategory();
  return (
      <div className="min-h-screen">
        {showParticles && (
          <Particles
            particleColors={[theme === "dark" ? "#ffffff" : "#000000"]}
            particleCount={200}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
          />
        )}
        <Navbar
          showParticles={showParticles}
          setShowParticles={setShowParticles}
          showSplashCursor={showSplashCursor}
          setShowSplashCursor={setShowSplashCursor}
        />
        <main>
          <Hero showParticles={showParticles} setShowParticles={setShowParticles} showSplashCursor={showSplashCursor} setShowSplashCursor={setShowSplashCursor} />
          <CategorySelection />
          <About />
          {/* <Skills /> */}
          {category === 'mathematics' && (
            <MathematicsTimeline setShowSplashCursor={(hovering) => setShowSplashCursor(!hovering)} />
          )}
          <Projects />
        </main>
        <Footer />
      </div>
  );
};

const Index: React.FC<IndexProps> = (props) => {
  return (
    <CategoryProvider>
      <IndexContent {...props} />
    </CategoryProvider>
  );
};

export default Index;
