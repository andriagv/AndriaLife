
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";

const Skills: React.FC = () => {
  const { t } = useLanguage();
  
  const technicalSkills = [
    { name: "Swift", level: 95 },
    { name: "UIKit", level: 90 },
    { name: "SwiftUI", level: 85 },
    { name: "Core Data", level: 75 },
    { name: "Firebase", level: 70 },
  ];

  const softSkills = [
    "Communication",
    "Problem-solving",
    "Teamwork",
    "Time management",
    "Adaptability",
    "Leadership",
    "Creativity",
    "Critical thinking",
  ];

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-2xl font-semibold mb-6">{t('technicalSkills')}</h3>
            <div className="space-y-6">
              {technicalSkills.map((skill, index) => (
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

          <div>
            <h3 className="text-2xl font-semibold mb-6">{t('softSkills')}</h3>
            <div className="grid grid-cols-2 gap-4">
              {softSkills.map((skill, index) => (
                <Card key={index}>
                  <CardContent className="p-4 flex items-center justify-center">
                    <span className="text-center">{skill}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
