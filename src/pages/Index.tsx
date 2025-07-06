import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import CategorySelection from "@/components/CategorySelection";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import { CategoryProvider } from "@/contexts/CategoryContext";

const Index: React.FC = () => {
  return (
    <CategoryProvider>
      <div className="min-h-screen">
        <Navbar />
        <main>
          <Hero />
          <CategorySelection />
          <About />
          {/* <Skills /> */}
          <Projects />
        </main>
        <Footer />
      </div>
    </CategoryProvider>
  );
};

export default Index;
