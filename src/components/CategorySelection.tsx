import React from "react";
import { GlowingCard, GlowingCards } from "@/components/GlowingCards";
import { useCategory } from "@/contexts/CategoryContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Smartphone, Tent, GraduationCap, Figma, Camera, Bot, Sigma, Trophy } from "lucide-react";
import ScrollFloat from "./common/ScrollFloat";
import ScrollVelocity from "./ScrollVelocity";
import SplitText from "./SplitText";
import TargetCursor from "./TargetCursor";
import { useIsMobile } from "@/hooks/use-mobile";

interface CategorySelectionProps {
  showTargetCursor: boolean;
  setShowTargetCursor: (v: boolean) => void;
}
const CategorySelection: React.FC<CategorySelectionProps> = ({ showTargetCursor }) => {
  const { category, setCategory } = useCategory();
  const { t, language } = useLanguage();
  const isMobile = useIsMobile();

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
    <section id="category-selection" className="pt-8 pb-20 px-4 sm:px-6 md:px-12 lg:px-24">
      {!isMobile && showTargetCursor && (
        <TargetCursor 
          targetSelector=".cursor-target"
          spinDuration={2}
          hideDefaultCursor={false}
        />
      )}
      <div className="container mx-auto">
        <div className="text-center mb-8 md:mb-10">
          <SplitText
            key={language}
            text={t("selectCategory")}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground"
            delay={170}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
          />
          <div className="w-20 h-1 bg-primary mx-auto mt-4 mb-6"></div>
          <div className="mb-6">
            <ScrollVelocity
              texts={language === 'en' ? ['Choose an area ⋆', 'Explore projects ⋆'] : ['აირჩიეთ სფერო ⋆', 'გაეცანით პროექტებს ⋆']}
              velocity={50}
              className="text-muted-foreground"
            />
          </div>
        </div>

        <GlowingCards
          enableGlow={!isMobile}
          glowRadius={25}
          glowOpacity={1}
          animationDuration={400}
          gap="1.5rem"
          maxWidth="75rem"
          padding="2rem 1rem"
          borderRadius="1rem"
          responsive={true}
        >
          {categories.map((cat) => (
            <GlowingCard
              key={cat.id}
              className={`cursor-pointer cursor-target transition-all hover:shadow-lg ${category === cat.id ? "ring-2 ring-primary" : ""}`}
              glowColor="#3b82f6"
              hoverEffect={true}
            >
              <div
                className="flex flex-col items-center text-center h-full justify-center"
                onClick={() => setCategory(cat.id as any)}
              >
                <div className={`text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-1 sm:mb-2 md:mb-4 ${category === cat.id ? "text-primary" : ""}`}>
                  {cat.icon}
                </div>
                <h3 className="text-xs sm:text-sm md:text-lg lg:text-xl font-medium text-center leading-tight px-1">{cat.name}</h3>
              </div>
            </GlowingCard>
          ))}
        </GlowingCards>
      </div>
    </section>
  );
};

export default CategorySelection;
