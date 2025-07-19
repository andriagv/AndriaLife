import React, { useEffect, useRef } from "react";
import { Github, Linkedin, Mail, Facebook } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import MediumIcon from "@/components/icons/MediumIcon";
import Spline from '@splinetool/react-spline';
import ScrambledText from "./ScrambledText";
import GradientText from "./GradientText";
import WoofyHoverImage from "@/components/ui/WoofyHoverImage";
import FuzzyText from "@/components/FuzzyText";
import { useTheme } from "@/contexts/ThemeContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  showParticles: boolean;
  setShowParticles: (value: boolean) => void;
  showSplashCursor: boolean;
  setShowSplashCursor: (value: boolean) => void;
}

const Hero: React.FC<HeroProps> = ({ showParticles, setShowParticles, showSplashCursor, setShowSplashCursor }) => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);
  
  let bgClass = (!showParticles && !showSplashCursor)
    ? "bg-[#e8e7e7] dark:bg-background"
    : "bg-transparent dark:bg-transparent";

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current, subtitleRef.current, descriptionRef.current, socialRef.current], {
        y: 100,
        opacity: 0,
        scale: 0.9,
      });

      gsap.set(imageRef.current, {
        x: 50,
        y: 50,
        opacity: 0,
        scale: 0.8,
      });

      gsap.set(splineRef.current, {
        scale: 1.2,
        opacity: 0.7,
      });

      // Create scroll-triggered animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          refreshPriority: -1,
        }
      });

      // Main content animations
      tl.to(titleRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out",
      }, 0)
      .to(subtitleRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out",
      }, 0.1)
      .to(descriptionRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out",
      }, 0.2)
      .to(socialRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out",
      }, 0.3)
      .to(imageRef.current, {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
      }, 0.2)
      .to(splineRef.current, {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
      }, 0);

      // Parallax effect on scroll down
      gsap.to(titleRef.current, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        }
      });

      gsap.to(imageRef.current, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        }
      });

      gsap.to(splineRef.current, {
        yPercent: -20,
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        }
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className={`min-h-[200vh] flex items-center justify-center relative overflow-hidden ${bgClass}`}
    >
      {/* Spline 3D Background with parallax */}
      <div 
        ref={splineRef}
        className="absolute inset-0 z-0 hidden md:block will-change-transform" 
        style={{ transform: 'translateX(140px)' }}
      >
        <Spline
          scene="https://prod.spline.design/3AEnkRbooqoiSfQS/scene.splinecode"
        />
      </div>
      
      {/* Content overlay */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 min-h-screen flex items-center">
        <div className="flex flex-col md:flex-row items-center w-full">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            {/* Title with scroll animation */}
            <div ref={titleRef} className="will-change-transform">
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
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-left leading-tight">
                <div className="flex justify-start items-start w-full transform -translate-x-4 md:-translate-x-14">
                  <FuzzyText baseIntensity={0.08} hoverIntensity={0.5} enableHover={true} color={theme === 'dark' ? '#fff' : '#000'}>
                    {t('name')}
                  </FuzzyText>
                </div>
              </h1>
            </div>

            {/* Subtitle with scroll animation */}
            <div ref={subtitleRef} className="will-change-transform">
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
            </div>

            {/* Description with scroll animation */}
            <div ref={descriptionRef} className="will-change-transform">
              <ScrambledText 
                className="text-base md:text-lg text-muted-foreground max-w-lg ml-[1px] mb-8" 
                text={t('heroDescription')} 
                key={t('heroDescription')} 
              />
            </div>
            
            {/* Social links with scroll animation */}
            <div ref={socialRef} className="flex items-center gap-3 md:gap-4 mt-8 will-change-transform">
              <a 
                href="https://github.com/andriagv" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 border border-border rounded-full hover:text-primary hover:border-primary transition-all duration-300 hover:scale-110 hover:shadow-lg"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 border border-border rounded-full hover:text-primary hover:border-primary transition-all duration-300 hover:scale-110 hover:shadow-lg"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="mailto:gvaramiaandria1@gmail.com" 
                className="p-2 border border-border rounded-full hover:text-primary hover:border-primary transition-all duration-300 hover:scale-110 hover:shadow-lg"
              >
                <Mail size={20} />
              </a>
              <a 
                href="https://www.facebook.com/andria361791/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 border border-border rounded-full hover:text-primary hover:border-primary transition-all duration-300 hover:scale-110 hover:shadow-lg"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://medium.com/@gvaramiaandria1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 border border-border rounded-full hover:text-primary hover:border-primary transition-all duration-300 hover:scale-110 hover:shadow-lg"
              >
                <MediumIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Image with scroll animation */}
          <div ref={imageRef} className="w-full md:w-1/2 flex justify-center md:justify-end md:-mt-20 will-change-transform">
            <WoofyHoverImage
              src="/photos/me.PNG"
              alt="Andria profile"
              className="w-48 md:w-[60%] h-auto object-cover rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
