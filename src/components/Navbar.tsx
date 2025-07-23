import React, { useState, useEffect } from "react";
import { Menu, X, Home, Info, Folder, Grid, Settings } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import ElasticSlider from "./ElasticSlider";
import ReflectBackground2 from "@/components/common/ReflectBackground2";
import SettingsPanel from "./SettingsPanel";

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
}

const Navbar: React.FC<NavbarProps> = ({ showParticles, setShowParticles, showSplashCursor, setShowSplashCursor, musicPlaying, onMusicToggle, volume, onVolumeChange, backgroundMode, setBackgroundMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const { t } = useLanguage();

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-customBg/80 backdrop-blur-md shadow-md ${
        isScrolled ? "py-4" : "py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <a href="#hero" className="text-2xl font-bold tracking-tight" style={{color: '#444343'}}>
          Portfolio<span className="text-accent">.</span>
        </a>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center">
          <ul className="flex gap-2 md:gap-4 items-center mr-4">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  onClick={() => setActive(link.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200
                    ${active === link.id
                      ? "bg-primary/20 text-primary shadow-[0_0_8px_2px_rgba(59,130,246,0.3)]"
                      : "hover:bg-primary/10 hover:text-primary/90 text-foreground/80"}
                  `}
                  style={{ boxShadow: active === link.id ? "0 0 12px 2px rgba(59,130,246,0.25)" : undefined }}
                >
                  {/* Only text, no icon */}
                  <span className="text-base font-medium">{link.name}</span>
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
                  className="p-2 rounded-full hover:bg-primary/10 focus:outline-none"
                  aria-label="Settings"
                >
                  <Settings size={20} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <SettingsPanel {...{ showParticles, setShowParticles, showSplashCursor, setShowSplashCursor, musicPlaying, onMusicToggle, volume, onVolumeChange, backgroundMode, setBackgroundMode }} />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>
        {/* Mobile Navigation Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <LanguageToggle />
          <button
            className="text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-customBg border-t border-border animate-fade-in">
          <ul className="container mx-auto py-4 px-4 flex flex-col space-y-3">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200
                    ${active === link.id
                      ? "bg-primary/20 text-primary shadow-[0_0_8px_2px_rgba(59,130,246,0.3)]"
                      : "hover:bg-primary/10 hover:text-primary/90 text-foreground/80"}
                  `}
                  style={{ boxShadow: active === link.id ? "0 0 12px 2px rgba(59,130,246,0.25)" : undefined }}
                  onClick={() => {
                    setActive(link.id);
                    setIsMenuOpen(false);
                  }}
                >
                  {/* Only text, no icon */}
                  <span className="text-base font-medium">{link.name}</span>
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
