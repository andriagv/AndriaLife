import React from "react";
import { ArrowRight, Github, Linkedin, Mail, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import MediumIcon from "@/components/icons/MediumIcon";
import Spline from '@splinetool/react-spline';
import { Switch } from "@/components/ui/switch";
import ScrambledText from "./ScrambledText";
import GradientText from "./GradientText";
import WoofyHoverImage from "@/components/ui/WoofyHoverImage";
import TextPressure from "./TextPressure";
import FuzzyText from "@/components/FuzzyText";
import { useTheme } from "@/contexts/ThemeContext";

interface HeroProps {
  showParticles: boolean;
  setShowParticles: (value: boolean) => void;
  showSplashCursor: boolean;
  setShowSplashCursor: (value: boolean) => void;
}

const Hero: React.FC<HeroProps> = ({ showParticles, setShowParticles, showSplashCursor, setShowSplashCursor }) => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  
  let bgClass = (!showParticles && !showSplashCursor)
    ? "bg-[#e8e7e7] dark:bg-background"
    : "bg-transparent dark:bg-transparent";

  return (
    <section
      id="hero"
      className={`min-h-[100vh] flex items-center pt-8 section-padding relative overflow-hidden ${bgClass}`}
    >
      {/* Spline 3D Background */}
      <div className="absolute inset-0 z-0 hidden md:block" style={{ transform: 'translateX(160px)' }}>
        <Spline
          scene="https://prod.spline.design/3AEnkRbooqoiSfQS/scene.splinecode"
        />
      </div>
      {/* Content overlay */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <p className="text-primary font-medium mb-4">
              <GradientText
                colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                animationSpeed={3}
                showBorder={false}
                className="highlight text-left"
              >
                {t('hello')}
              </GradientText>
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-left">
              <div className="flex justify-start items-start w-full transform -translate-x-4 md:-translate-x-14">
                <FuzzyText baseIntensity={0.08} hoverIntensity={0.5} enableHover={true} color="#222">
                  {t('name')}
                </FuzzyText>
              </div>
            </h1>
            <h2 className="text-xl md:text-2xl text-muted-foreground mb-[11px] text-left">
              <GradientText
                colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                animationSpeed={3}
                showBorder={false}
                className="highlight text-left"
              >
                {t('role')}
              </GradientText>
            </h2>
            <ScrambledText className="text-base md:text-lg text-muted-foreground max-w-lg ml-[1px] mb-8" text={t('heroDescription')} key={t('heroDescription')} />
            {/* No button here anymore */}
            
            <div className="flex items-center gap-3 md:gap-4 mt-8">
              <a 
                href="https://github.com/andriagv" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 border border-border rounded-full hover:text-primary hover:border-primary transition-colors"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 border border-border rounded-full hover:text-primary hover:border-primary transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="mailto:gvaramiaandria1@gmail.com" 
                className="p-2 border border-border rounded-full hover:text-primary hover:border-primary transition-colors"
              >
                <Mail size={20} />
              </a>
              <a 
                href="https://www.facebook.com/andria361791/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 border border-border rounded-full hover:text-primary hover:border-primary transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://medium.com/@gvaramiaandria1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 border border-border rounded-full hover:text-primary hover:border-primary transition-colors"
              >
                <MediumIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 flex justify-center md:justify-end md:-mt-20">
            <WoofyHoverImage
              src="/photos/me.PNG"
              alt="Andria profile"
              className="w-48 md:w-[60%] h-auto object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
