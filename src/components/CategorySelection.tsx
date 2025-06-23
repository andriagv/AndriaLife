import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useCategory } from "@/contexts/CategoryContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Smartphone, Tent, GraduationCap, Figma, Camera, Bot, Sigma, Trophy } from "lucide-react";

const CategorySelection: React.FC = () => {
  const { category, setCategory } = useCategory();
  const { t } = useLanguage();

  const categories = [
    {
      id: "ios",
      name: t("iosDeveloper"),
      icon: <Smartphone className="h-10 w-10" />,
    },
    {
      id: "camps",
      name: t("camps"),
      icon: <Tent className="h-10 w-10" />,
    },
    {
      id: "academic",
      name: t("academic"),
      icon: <GraduationCap className="h-10 w-10" />,
    },
    {
      id: "design",
      name: t("design"),
      icon: <Figma className="h-10 w-10" />,
    },
    {
      id: "photography",
      name: t("photography"),
      icon: <Camera className="h-10 w-10" />,
    },
    {
      id: "robotics",
      name: t("robotics"),
      icon: <Bot className="h-10 w-10" />,
    },
    {
      id: "mathematics",
      name: t("mathematics"),
      icon: <Sigma className="h-10 w-10" />,
    },
    {
      id: "sports",
      name: t("sports"),
      icon: <Trophy className="h-10 w-10" />,
    },
  ];

  return (
    <section id="category-selection" className="bg-background section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold">{t("selectCategory")}</h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-4 mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("categoryDescription")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
          {categories.map((cat) => (
            <Card
              key={cat.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                category === cat.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setCategory(cat.id as any)}
            >
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className={`text-4xl mb-4 ${category === cat.id ? "text-primary" : ""}`}>
                  {cat.icon}
                </div>
                <h3 className="text-xl font-medium">{cat.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySelection;
