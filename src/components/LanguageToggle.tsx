
import React from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageToggle: React.FC = () => {
  const { language, changeLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => changeLanguage(language === "en" ? "ka" : "en")}
      className="text-sm font-medium font-sans leading-none"
    >
      {language === "en" ? "GE ქართ." : "EN ENG"}
    </Button>
  );
};

export default LanguageToggle;
