
import React from "react";
import { ArrowRight, GitHub, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero: React.FC = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center pt-16 section-padding">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <p className="text-primary font-medium mb-4">Hello, I'm</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Your Name
            </h1>
            <h2 className="text-xl md:text-2xl text-muted-foreground mb-6">
              Professional <span className="highlight">Role / Title</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-lg mb-8">
              I design and develop exceptional digital experiences that are simple,
              beautiful, and user-friendly. I'm focused on building accessible,
              human-centered products.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                className="group"
                size="lg"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Contact Me
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              >
                View My Work
              </Button>
            </div>
            
            <div className="flex items-center gap-4 mt-8">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 border border-border rounded-full hover:text-primary hover:border-primary transition-colors"
              >
                <GitHub size={20} />
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
                href="mailto:your.email@example.com" 
                className="p-2 border border-border rounded-full hover:text-primary hover:border-primary transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-primary/10 overflow-hidden">
                {/* You could add a profile picture here */}
                <div className="w-full h-full flex items-center justify-center text-primary/40 text-lg font-medium">
                  Your Photo
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full bg-secondary z-[-1]"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
