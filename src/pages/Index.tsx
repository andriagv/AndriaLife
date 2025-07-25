import React from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import CategorySelection from "@/components/CategorySelection";
import MathematicsTimeline from "@/components/MathematicsTimeline";
import AcademicAchievementsTimeline from "@/components/AcademicAchievementsTimeline";
import RoboticsComingSoon from "@/components/RoboticsComingSoon";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import Particles from "@/components/Particles";
import { useTheme } from "@/contexts/ThemeContext";
import { useCategory } from "@/contexts/CategoryContext";
import { useAppState } from "@/contexts/AppStateContext";

interface IndexProps {
  showParticles: boolean;
  setShowParticles: (value: boolean) => void;
  showSplashCursor: boolean;
  setShowSplashCursor: (value: boolean) => void;
  backgroundMode: 'none' | '3d' | 'reflect';
  showHeroAnimation: boolean;
}

const IndexContent: React.FC<IndexProps> = ({ showParticles, setShowParticles, showSplashCursor, setShowSplashCursor, backgroundMode, showHeroAnimation }) => {
  const { theme } = useTheme();
  const { category } = useCategory();
  const { reduceMotion } = useAppState();
  return (
      <div className="min-h-screen">
        {showParticles && !reduceMotion && (
          <Particles
            particleColors={[theme === "dark" ? "#ffffff" : "#000000"]}
            particleCount={reduceMotion ? 50 : 200}
            particleSpread={10}
            speed={reduceMotion ? 0.05 : 0.1}
            particleBaseSize={100}
            moveParticlesOnHover={!reduceMotion}
            alphaParticles={false}
            disableRotation={reduceMotion}
          />
        )}
        <main>
          <Hero showParticles={showParticles} setShowParticles={setShowParticles} showSplashCursor={showSplashCursor} setShowSplashCursor={setShowSplashCursor} backgroundMode={backgroundMode} showHeroAnimation={showHeroAnimation} />
          <CategorySelection />
          {category !== 'robotics' && <About />}
          {/* <Skills /> */}
          {category === 'mathematics' && (
            <MathematicsTimeline setShowSplashCursor={(hovering) => setShowSplashCursor(!hovering)} />
          )}
          {category === 'academic' && (
            <AcademicAchievementsTimeline setShowSplashCursor={(hovering) => setShowSplashCursor(!hovering)} />
          )}
          {category === 'robotics' && (
            <RoboticsComingSoon />
          )}
          {category !== 'robotics' && category !== 'academic' && category !== 'mathematics' && <Projects />}
        </main>
        <Footer />
      </div>
  );
};

const Index: React.FC<IndexProps> = (props) => {
  return <IndexContent {...props} />;
};

export default Index;
