import React from "react";
import { ArrowRight, Github, Linkedin, Mail, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import MediumIcon from "@/components/icons/MediumIcon";
import Spline from '@splinetool/react-spline';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section id="hero" className="min-h-screen flex items-center pt-16 section-padding bg-transparent dark:bg-transparent relative overflow-hidden">
      {/* Spline 3D Background */}
      <div className="absolute inset-0 z-0" style={{ transform: 'translateX(140px)' }}>
        <Spline
        scene="https://prod.spline.design/3AEnkRbooqoiSfQS/scene.splinecode" 
        />
      </div>
      
      {/* Content overlay */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <p className="text-primary font-medium mb-4">{t('hello')}</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t('name')}
            </h1>
            <h2 className="text-xl md:text-2xl text-muted-foreground mb-6">
              <span className="highlight">{t('role')}</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-lg mb-8">
              {t('heroDescription')}
            </p>
            <div className="flex flex-wrap gap-4">
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
    </section>
  );
};

export default Hero;
