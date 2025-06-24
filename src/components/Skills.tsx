import React from "react";
import { Progress } from "@/components/ui/progress";
import { useSkills } from "@/hooks/useSkills";
import { useLanguage } from "@/contexts/LanguageContext";
import ErrorBoundary from "./ErrorBoundary";

const Skills: React.FC = () => {
  const { t } = useLanguage();
  const { viewData } = useSkills();
  
  // Do not render anything if skills should not be displayed for this category
  if (!viewData.shouldDisplay) return null;

  return (
    <ErrorBoundary>
      <section id="skills" className="section-padding">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">{viewData.title}</h2>
            <div className="w-20 h-1 bg-primary mx-auto mt-4 mb-6"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {viewData.description}
            </p>
          </div>

          <div className="flex justify-center">
            <div className="w-full md:w-2/3">
              <h3 className="text-2xl font-semibold mb-6 text-center">{t('technicalSkills')}</h3>
              <div className="space-y-6">
                {viewData.skills.map((skill, index) => (
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
    </ErrorBoundary>
  );
};

export default Skills;
