import React from "react";
import { ArrowRight, Github, Linkedin, Mail, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import MediumIcon from "@/components/icons/MediumIcon";
import Spline from '@splinetool/react-spline';
import { Switch } from "@/components/ui/switch";
import ScrambledText from "./ScrambledText";

interface HeroProps {
  showParticles: boolean;
  setShowParticles: (value: boolean) => void;
  showSplashCursor: boolean;
  setShowSplashCursor: (value: boolean) => void;
}

const Hero: React.FC<HeroProps> = ({ showParticles, setShowParticles, showSplashCursor, setShowSplashCursor }) => {
  const { t } = useLanguage();
  
  let bgClass = (!showParticles && !showSplashCursor)
    ? "bg-[#e8e7e7] dark:bg-background"
    : "bg-transparent dark:bg-transparent";

  return (
    <section
      id="hero"
      className={`min-h-[100vh] flex items-center pt-16 section-padding relative overflow-hidden ${bgClass}`}
    >
      {/* Spline 3D Background */}
      <div className="absolute inset-0 z-0" style={{ transform: 'translateX(140px)' }}>
        <Spline
          scene="https://prod.spline.design/3AEnkRbooqoiSfQS/scene.splinecode"
        />
      </div>
      {/* Content overlay */}
      <div className="container mx-auto px-6 relative z-10 ">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <p className="text-primary font-medium mb-4">{t('hello')}</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t('name')}
            </h1>
            <h2 className="text-xl md:text-2xl text-muted-foreground mb-[11px]">
              <span className="highlight">{t('role')}</span>
            </h2>
            <ScrambledText className="text-lg text-muted-foreground max-w-lg ml-[1px] mb-8" text={t('heroDescription')} key={t('heroDescription')} />            <div className="flex flex-wrap gap-4">
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              >
                {t('viewWork')}
              </Button>
            </div>
            
            <div className="flex items-center gap-4 mt-8">
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
          
          <div className="md:w-1/2 flex justify-end md:-mt-20">
            <img 
              src="/photos/me.PNG" 
              alt="Andria profile" 
              className="w-[60%] h-auto object-cover" 
            />
          </div>
        </div>
      </div>
      {/* Radio group for background mode at the bottom */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-6 z-10 bg-white/70 dark:bg-black/40 rounded-xl px-6 py-3 shadow-lg">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <span>ვარსკვლავები</span>
          <Switch checked={showParticles} onCheckedChange={setShowParticles} />
        </label>
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <span>SplashCursor</span>
          <Switch checked={showSplashCursor} onCheckedChange={setShowSplashCursor} />
        </label>
      </div>
    </section>
  );
};

export default Hero;
