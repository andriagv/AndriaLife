import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCategory } from "@/contexts/CategoryContext";
import ScrollFloat from "./common/ScrollFloat";
import PhotoFrame from "./common/PhotoFrame";
import { getAllProjects } from "@/data/projects";

const About: React.FC = () => {
  const { t, language } = useLanguage();
  const { category } = useCategory();

  const storyKey = `${category}Story` as const;
  const storyText = t(storyKey);

  const allProjects = getAllProjects(t, language);
  const photographyImages = allProjects
    .filter(p => p.category === 'photography' && p.imageUrl)
    .map(p => p.imageUrl);

  const aboutContent = (
    <div className="text-center">
      <div className="text-center mb-8 md:mb-12">
        <ScrollFloat>
          {t('aboutMe')}
        </ScrollFloat>
        <div className="w-20 h-1 bg-primary mx-auto mt-4 mb-6"></div>
      </div>

      <div className="flex justify-center">
        <div className="w-full lg:w-4/5 px-4">
          <div className="text-sm md:text-base text-muted-foreground mb-6 whitespace-pre-line text-center">
            <ScrollFloat>
              {storyText}
            </ScrollFloat>
          </div>
        </div>
      </div>

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
              <ScrollFloat>
                {t('photoContestExhibit')}
              </ScrollFloat>
            </p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <section id="about" className="section-padding">
      <div className="container mx-auto">
        {category === 'photography' ? (
          <PhotoFrame images={photographyImages}>
            {aboutContent}
          </PhotoFrame>
        ) : (
          aboutContent
        )}
      </div>
    </section>
  );
};

export default About;
