import React from "react";
import { Github, Linkedin, Mail, Facebook } from "lucide-react";

import { useLanguage } from "@/contexts/LanguageContext";
import MediumIcon from "@/components/icons/MediumIcon";

import ScrambledText from "./ScrambledText";
import GradientText from "./GradientText";
import VoiceAvatar from "./VoiceAvatar";

import FuzzyText from "@/components/FuzzyText";


const Hero: React.FC = () => {
  const { t } = useLanguage();

  
  let bgClass = "bg-transparent";

  return (
    <section
      id="hero"
      className={`min-h-[100vh] flex items-center pt-16 sm:pt-20 md:pt-28 px-4 sm:px-6 md:px-12 lg:px-24 py-12 sm:py-16 md:py-20 relative overflow-hidden ${bgClass}`}
    >
      {/* Content overlay */}
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-8 md:mb-0 text-center md:text-left">
            <div className="text-primary font-medium mb-4">
              <GradientText
                colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                animationSpeed={3}
                showBorder={false}
                className="highlight text-left"
              >
                {t('hello')}
              </GradientText>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6">
              {/* The visible name is drawn on a canvas, so keep real text for search engines and screen readers */}
              <span className="sr-only">Andria Gvaramia - iOS Developer &amp; Mathematician</span>
              <div aria-hidden="true" className="flex justify-center md:justify-start items-start w-full transform -translate-x-0 md:-translate-x-4 lg:-translate-x-14">
                <FuzzyText baseIntensity={0.08} hoverIntensity={0.5} enableHover={true} color="#222">
                  {t('name')}
                </FuzzyText>
              </div>
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-[11px]">
              <GradientText
                colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                animationSpeed={3}
                showBorder={false}
                className="highlight"
              >
                {t('role')}
              </GradientText>
            </h2>
            <ScrambledText className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-lg mx-auto md:mx-0 mb-8" text={t('heroDescription')} key={t('heroDescription')} />
            {/* No button here anymore */}
            
            <div className="flex items-center justify-center md:justify-start gap-3 md:gap-4 mt-8">
              <a 
                href="https://github.com/andriagv" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 sm:p-3 border border-border rounded-full hover:text-primary hover:border-primary transition-colors"
              >
                <Github size={18} className="sm:w-5 sm:h-5" />
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
          
          {/* Voice assistant (hosted separately; floats in the corner once the hero scrolls away) */}
          <div className="w-full md:w-1/2 md:pl-6 flex justify-center md:justify-end">
            <VoiceAvatar />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
