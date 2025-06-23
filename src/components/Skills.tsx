import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCategory } from "@/contexts/CategoryContext";

const Skills: React.FC = () => {
  const { t } = useLanguage();
  const { category } = useCategory();
  
  // Do not render anything for the Design or Photography category
  if (category === 'design' || category === 'photography') return null;
  
  // Category-specific technical skills
  const technicalSkillsByCategory = {
    ios: [
      { name: "Swift", level: 95 },
      { name: "UIKit", level: 90 },
      { name: "SwiftUI", level: 85 },
      { name: "Core Data", level: 75 },
      { name: "Firebase", level: 70 },
    ],
    camps: [
      { name: "Data Analysis", level: 85 },
      { name: "Project Management", level: 80 },
      { name: "Critical Thinking", level: 90 },
      { name: "Presentation Skills", level: 85 },
      { name: "Negotiation Skills", level: 75 },
    ],
    academic: [
      { name: "Python", level: 85 },
      { name: "Arduino", level: 80 },
      { name: "Electronics", level: 75 },
      { name: "3D Printing", level: 70 },
      { name: "Sensor Integration", level: 65 },
    ],
    startups: [
      { name: "Business Planning", level: 85 },
      { name: "Market Research", level: 80 },
      { name: "Fundraising", level: 70 },
      { name: "Pitch Deck Creation", level: 85 },
      { name: "MVP Development", level: 90 },
    ],
    sports: [
      { name: t("football"), level: 100 },
      { name: t("wrestling"), level: 90 },
      { name: t("volleyball"), level: 80 },
      { name: t("skiing"), level: 80 },
      { name: t("karate"), level: 70 },
      { name: t("pingPong"), level: 70 },
      { name: t("tennis"), level: 50 },
      { name: t("basketball"), level: 2 },
    ]
  };

  const currentSkills = technicalSkillsByCategory[category] || [];

  return (
    <section id="skills" className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">{t('mySkills')}</h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-4 mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('skillsDescription')}
          </p>
        </div>

        <div className="flex justify-center">
          <div className="w-full md:w-2/3">
            <h3 className="text-2xl font-semibold mb-6 text-center">{t('technicalSkills')}</h3>
            <div className="space-y-6">
              {currentSkills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-muted-foreground">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
