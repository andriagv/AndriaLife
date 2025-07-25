import React from "react";
import { ScrollTimeline } from "@/components/ScrollTimeline";
import { Lens } from "@/components/common/Lens";
import { useLanguage } from "@/contexts/LanguageContext";

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
  
  const academicAchievements = getAcademicAchievements(t);
  const events = academicAchievements.map((achievement) => ({
    year: achievement.year,
    title: achievement.title,
    subtitle: achievement.subtitle,
    description: achievement.description,
    image: achievement.image,
  }));
  
  return (
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
      dateFormat="badge"
      cardEffect="shadow"
      className="my-12"
      renderImage={img => (
        <Lens onHoverChange={setShowSplashCursor}>
          <img src={img} alt="Academic Achievement" className="w-full max-w-[300px] mx-auto mb-4 rounded-xl shadow-[0_4px_24px_rgba(168,85,247,0.18),0_1.5px_8px_rgba(0,0,0,0.10)] object-cover" />
        </Lens>
      )}
    />
  );
};

export default AcademicAchievementsTimeline; 