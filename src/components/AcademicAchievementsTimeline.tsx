import React, { useState } from "react";
import { ScrollTimeline } from "@/components/ScrollTimeline";
import { Lens } from "@/components/common/Lens";
import { useLanguage } from "@/contexts/LanguageContext";
import OptimizedImage from "@/components/ui/OptimizedImage";

const getAcademicAchievements = (t: (key: string) => string) => [
  {
    image: "/photos/academic-achievements/KIUAmbassador.jpeg",
    year: "2024",
    title: t('kiuAmbassadorTitle'),
    subtitle: t('kiuAmbassadorSubtitle'),
    description: t('kiuAmbassadorDescription')
  },
  {
    image: "/photos/academic-achievements/spaceappchallenge.jpg",
    year: "2023",
    title: t('nasaSpaceAppsTitle'),
    subtitle: t('nasaSpaceAppsSubtitle'),
    description: t('nasaSpaceAppsDescription')
  },
  {
    image: "/photos/academic-achievements/architectureTutor.png",
    year: "2023",
    title: t('architectureTutorTitle'),
    subtitle: t('architectureTutorSubtitle'),
    description: t('architectureTutorDescription')
  },
  {
    image: "/photos/academic-achievements/labTutor.jpeg",
    year: "2023",
    title: t('laboratoryTutorTitle'),
    subtitle: t('laboratoryTutorSubtitle'),
    description: t('laboratoryTutorDescription')
  },
  {
    image: "/photos/academic-achievements/campside.jpg",
    year: "2022",
    title: t('campLeadershipTitle'),
    subtitle: t('campLeadershipSubtitle'),
    description: t('campLeadershipDescription')
  },
  {
    image: "/photos/academic-achievements/komcer.jpeg",
    year: "2022",
    title: t('academicCertificateTitle'),
    subtitle: t('academicCertificateSubtitle'),
    description: t('academicCertificateDescription')
  }
];

interface AcademicAchievementsTimelineProps {
  setShowSplashCursor?: (v: boolean) => void;
}

const AcademicAchievementsTimeline: React.FC<AcademicAchievementsTimelineProps> = ({ setShowSplashCursor }) => {
  const { t } = useLanguage();
  const [showImages, setShowImages] = useState(false);
  
  const academicAchievements = getAcademicAchievements(t);
  const events = academicAchievements.map((achievement) => ({
    year: achievement.year,
    title: achievement.title,
    subtitle: achievement.subtitle,
    description: achievement.description,
    image: showImages ? achievement.image : undefined, // Only include image if showImages is true
  }));
  
  return (
    <div>
      <div className="text-center mb-8">
        <button
          onClick={() => setShowImages(!showImages)}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          {showImages ? "ფოტოების დამალვა" : "ფოტოების ნახვა"}
        </button>
      </div>
      
      <ScrollTimeline
        events={events}
        title={t('academicAchievementsTitle')}
        subtitle={t('academicAchievementsSubtitle')}
        revealAnimation="fade"
        cardAlignment="alternating"
        cardVariant="elevated"
        progressIndicator={true}
        connectorStyle="line"
        parallaxIntensity={0.1}
        progressLineWidth={3}
        dateFormat="none"
        cardEffect="shadow"
        className="my-12"
        renderImage={img => (
          <Lens onHoverChange={setShowSplashCursor}>
            <OptimizedImage 
              src={img} 
              alt="Academic Achievement" 
              className="w-full max-w-[300px] mx-auto mb-4 rounded-xl shadow-[0_4px_24px_rgba(168,85,247,0.18),0_1.5px_8px_rgba(0,0,0,0.10)] object-cover" 
              placeholder={"/placeholder.svg"}
            />
          </Lens>
        )}
      />
    </div>
  );
};

export default AcademicAchievementsTimeline; 