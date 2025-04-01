
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCategory } from "@/contexts/CategoryContext";

const About: React.FC = () => {
  const { t } = useLanguage();
  const { category } = useCategory();
  
  // Category-specific stats
  const categoryStats = {
    ios: [
      { value: "1+", label: t("experience") },
      { value: "5+", label: t("projectsCompleted") },
      { value: "3", label: t("happyClients") },
      { value: "2", label: t("awardsWon") },
    ],
    camps: [
      { value: "8+", label: t("yearsExperience") }, // Since 2016
      { value: "10", label: t("campsAttended") },
      { value: "0", label: t("campsLed") }
    ],
    robotics: [
      { value: "2+", label: t("experience") },
      { value: "5+", label: t("projectsCompleted") },
      { value: "10+", label: t("happyClients") },
      { value: "2", label: t("awardsWon") },
    ],
    startups: [
      { value: "2+", label: t("experience") },
      { value: "5+", label: t("projectsCompleted") },
      { value: "10+", label: t("happyClients") },
      { value: "2", label: t("awardsWon") },
    ],
  };

  return (
    <section id="about" className="bg-secondary/30 section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">{t('aboutMe')}</h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-4 mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('aboutDescription')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-2xl font-semibold mb-4">{t('myStory')}</h3>
            <p className="text-muted-foreground mb-6">
              {t(`${category}Story`)}
            </p>
            <Button variant="outline" className="flex items-center gap-2">
              <Download size={16} />
              {t('downloadResume')}
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {categoryStats[category]?.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6 flex flex-col items-center justify-center">
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <p className="text-muted-foreground text-center">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
