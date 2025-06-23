import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCategory } from "@/contexts/CategoryContext";

const About: React.FC = () => {
  const { t } = useLanguage();
  const { category } = useCategory();
  
  const storyKey = `${category}Story` as const;
  const storyText = t(storyKey);

  return (
    <section id="about" className="bg-secondary/30 section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">{t('aboutMe')}</h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-4 mb-6"></div>
        </div>

        <div className="flex justify-center">
          <div className="w-full lg:w-4/5">
            <div className="text-muted-foreground mb-6 whitespace-pre-line text-center">
              {storyText}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
