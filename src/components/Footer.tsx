import React from "react";
import { Github, Linkedin, Mail, ArrowUp, Facebook } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import MediumIcon from "@/components/icons/MediumIcon";

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-foreground/5 py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold">
              Portfolio<span className="text-primary">.</span>
            </h3>
            <p className="text-muted-foreground mt-2">
              iOS Developer
            </p>
          </div>
          
          <div className="flex space-x-4">
            <a 
              href="https://github.com/andriagv" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 border border-border rounded-full hover:text-primary hover:border-primary transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 border border-border rounded-full hover:text-primary hover:border-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="mailto:gvaramiaandria1@gmail.com" 
              className="p-2 border border-border rounded-full hover:text-primary hover:border-primary transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
            <a 
              href="https://www.facebook.com/andria361791/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 border border-border rounded-full hover:text-primary hover:border-primary transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a 
              href="https://medium.com/@gvaramiaandria1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 border border-border rounded-full hover:text-primary hover:border-primary transition-colors"
              aria-label="Medium"
            >
              <MediumIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <hr className="my-6 border-border" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            &copy; {currentYear} Andria. {t('rights')}
          </p>
          
          <button 
            onClick={scrollToTop}
            className="mt-4 md:mt-0 flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
            aria-label="Scroll to top"
          >
            {t('backToTop')} <ArrowUp size={16} className="ml-1" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
