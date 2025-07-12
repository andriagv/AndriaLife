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
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold px-4">{t('aboutMe')}</h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-4 mb-6"></div>
        </div>

        <div className="flex justify-center">
          <div className="w-full lg:w-4/5 px-4">
            <div className="text-sm md:text-base text-muted-foreground mb-6 whitespace-pre-line text-center">
              {storyText}
            </div>
          </div>
        </div>

        {/* Photography contest info (only for photos category) */}
        {category === 'photography' && (
          <div className="flex flex-col md:flex-row items-center gap-8 mt-8">
            <div className="w-full md:w-1/3 flex justify-start">
              <img 
                src="/photos/photography/certificate/phcer.jpeg" 
                alt="Photography Certificate" 
                className="w-full max-w-xs rounded shadow-lg object-cover"
              />
            </div>
            <div className="w-full md:w-2/3 text-center md:text-left">
              <p className="text-lg font-medium">
                {t('photoContestExhibit')}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default About;
