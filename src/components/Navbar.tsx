import React, { useState, useEffect } from "react";
import { Menu, X, Settings } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageToggle from "./LanguageToggle";

import {
  DropdownMenu,
  DropdownMenuContent,

  DropdownMenuTrigger,


} from "@/components/ui/dropdown-menu";



import SettingsPanel from "./SettingsPanel";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

const SECTION_IDS = ["hero", "category-selection", "projects"];

interface NavbarProps {
  showParticles: boolean;
  setShowParticles: (v: boolean) => void;
  showSplashCursor: boolean;
  setShowSplashCursor: (v: boolean) => void;
  musicPlaying: boolean;
  onMusicToggle: () => void;
  volume: number;
  onVolumeChange: (v: number) => void;
  backgroundMode: 'none' | '3d' | 'reflect';
  setBackgroundMode: (mode: 'none' | '3d' | 'reflect') => void;
  showHeroAnimation: boolean;
  setShowHeroAnimation: (v: boolean) => void;
  showTargetCursor: boolean;
  setShowTargetCursor: (v: boolean) => void;
  audioLoaded?: boolean;
  isLoadingMusic?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ showParticles, setShowParticles, showSplashCursor, setShowSplashCursor, musicPlaying, onMusicToggle, volume, onVolumeChange, backgroundMode, setBackgroundMode, showHeroAnimation, setShowHeroAnimation, showTargetCursor, setShowTargetCursor, audioLoaded = false, isLoadingMusic = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const { t } = useLanguage();
  const { scrollToSection, scrollToTop } = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      // Scrollspy logic
      if (window.scrollY < 50) {
        setActive("home");
        return;
      }
      let closestId = "home";
      let minDist = Number.POSITIVE_INFINITY;
      SECTION_IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const dist = Math.abs(rect.top - 80); // 80px offset for navbar height
          if (rect.top <= 120 && dist < minDist) {
            minDist = dist;
            closestId = id;
          }
        }
      });
      setActive(closestId);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initialize on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "home", name: t("home"), href: "#hero" },
    { id: "category-selection", name: t("category"), href: "#category-selection" },
    { id: "projects", name: t("projects"), href: "#projects" },
  ];

  return (
    <header
      className={`fixed top-2 sm:top-4 left-1/2 -translate-x-1/2 max-w-7xl w-[96%] sm:w-[95%] z-50 transition-all duration-300 bg-white/30 dark:bg-black/30 backdrop-blur-lg border border-white/20 dark:border-black/20 shadow-xl rounded-full ${
        isScrolled ? "py-1.5 sm:py-2" : "py-2 sm:py-3"
      }`}
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6 flex justify-between items-center">
        <a 
          href="#hero" 
          className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-gray-800 dark:text-gray-200 cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            scrollToTop();
            setActive("home");
          }}
        >
          Portfolio<span className="text-primary">.</span>
        </a>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center">
          <ul className="flex gap-2 md:gap-4 items-center mr-4">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    if (link.id === "home") {
                      scrollToTop();
                    } else {
                      scrollToSection(link.id);
                    }
                    setActive(link.id);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium cursor-pointer
                    ${active === link.id
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5"}
                  `}
                >
                  {/* Only text, no icon */}
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            {/* Settings Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 focus:outline-none text-gray-700 dark:text-gray-300"
                  aria-label="Settings"
                >
                  <Settings size={20} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-transparent border-none shadow-none p-0">
                <SettingsPanel {...{ showParticles, setShowParticles, showSplashCursor, setShowSplashCursor, musicPlaying, onMusicToggle, volume, onVolumeChange, backgroundMode, setBackgroundMode, showHeroAnimation, setShowHeroAnimation, showTargetCursor, setShowTargetCursor, audioLoaded, isLoadingMusic }} />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>
        {/* Mobile Navigation Toggle */}
        <div className="md:hidden flex items-center gap-1 sm:gap-2">
          <LanguageToggle />
          {/* Settings Dropdown for Mobile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 focus:outline-none text-gray-700 dark:text-gray-300"
                aria-label="Settings"
              >
                <Settings size={20} className="sm:w-6 sm:h-6" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-transparent border-none shadow-none p-0">
              <SettingsPanel {...{ showParticles, setShowParticles, showSplashCursor, setShowSplashCursor, musicPlaying, onMusicToggle, volume, onVolumeChange, backgroundMode, setBackgroundMode, showHeroAnimation, setShowHeroAnimation, showTargetCursor, setShowTargetCursor, audioLoaded, isLoadingMusic }} />
            </DropdownMenuContent>
          </DropdownMenu>
          <button
            className="text-gray-700 dark:text-gray-300 p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} className="sm:w-6 sm:h-6" /> : <Menu size={20} className="sm:w-6 sm:h-6" />}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white/80 dark:bg-black/80 backdrop-blur-md border-t border-white/20 dark:border-black/20 animate-fade-in absolute top-full left-0 right-0 mt-2 mx-4 rounded-2xl shadow-lg overflow-hidden">
          <ul className="container mx-auto py-4 px-4 flex flex-col space-y-2">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-base font-medium cursor-pointer
                  ${active === link.id
                    ? "bg-primary text-primary-foreground"
                    : "text-gray-800 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/5"}
                  `}
                  onClick={(e) => {
                    e.preventDefault();
                    if (link.id === "home") {
                      scrollToTop();
                    } else {
                      scrollToSection(link.id);
                    }
                    setActive(link.id);
                    setIsMenuOpen(false);
                  }}
                >
                  {/* Only text, no icon */}
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
