import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import "./RoboticsComingSoon.css";

const RoboticsComingSoon: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="robotics-coming-soon" className="section-padding flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="mb-8">
          <svg className="pl mx-auto mb-6" width="240" height="240" viewBox="0 0 240 240">
            <circle className="pl__ring pl__ring--a" cx="120" cy="120" r="105" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 660" strokeDashoffset="-330" strokeLinecap="round"></circle>
            <circle className="pl__ring pl__ring--b" cx="120" cy="120" r="35" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 220" strokeDashoffset="-110" strokeLinecap="round"></circle>
            <circle className="pl__ring pl__ring--c" cx="85" cy="120" r="70" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 440" strokeLinecap="round"></circle>
            <circle className="pl__ring pl__ring--d" cx="155" cy="120" r="70" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 440" strokeLinecap="round"></circle>
          </svg>
        </div>
        
        <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
          {t("robotics")}
        </h2>
        <h3 className="text-2xl md:text-4xl font-semibold text-primary">
          {t("comingSoon")}
        </h3>
      </div>
    </section>
  );
};

export default RoboticsComingSoon; 