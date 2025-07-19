import React, { useState } from "react";
import { Home, Info, Folder, Mail } from "lucide-react";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { id: "home", label: "Home", href: "#hero", icon: <Home className="w-5 h-5" /> },
  { id: "about", label: "About", href: "#about", icon: <Info className="w-5 h-5" /> },
  { id: "projects", label: "Projects", href: "#projects", icon: <Folder className="w-5 h-5" /> },
];

const ModernNavbar: React.FC = () => {
  const [active, setActive] = useState("home");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-customBg/80 backdrop-blur-md shadow-md">
      <nav className="container mx-auto px-3 md:px-6 flex justify-between items-center h-14 md:h-16">
        {/* Logo */}
        <a href="#hero" className="text-lg md:text-2xl font-bold tracking-tight" style={{color: '#444343'}}>
          Portfolio<span className="text-accent">.</span>
        </a>
        {/* Navigation Links */}
        <ul className="flex gap-1 md:gap-4 items-center">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                onClick={() => setActive(link.id)}
                className={`flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1.5 md:py-2 rounded-lg transition-all duration-200
                  ${active === link.id
                    ? "bg-primary/20 text-primary shadow-[0_0_8px_2px_rgba(59,130,246,0.3)]"
                    : "hover:bg-primary/10 hover:text-primary/90 text-foreground/80"}
                `}
                style={{ boxShadow: active === link.id ? "0 0 12px 2px rgba(59,130,246,0.25)" : undefined }}
              >
                <span className="w-4 h-4 md:w-5 md:h-5">{link.icon}</span>
                <span className="hidden sm:inline text-sm md:text-base font-medium">{link.label}</span>
              </a>
            </li>
          ))}
        </ul>
        {/* Toggles */}
        <div className="flex items-center gap-1 md:gap-2 ml-1 md:ml-2">
          <LanguageToggle />
        </div>
      </nav>
    </header>
  );
};

export default ModernNavbar; 