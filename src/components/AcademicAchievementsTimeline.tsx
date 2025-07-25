import React from "react";
import { ScrollTimeline } from "@/components/ScrollTimeline";
import { Lens } from "@/components/common/Lens";

const academicAchievements = [
  {
    image: "/photos/academic-achievements/KIUAmbassador.jpeg",
    year: "2024",
    title: "KIU Ambassador",
    subtitle: "Kutaisi International University",
    description: "Selected as an official ambassador representing KIU and promoting university values and programs."
  },
  {
    image: "/photos/academic-achievements/spaceappchallenge.jpg",
    year: "2023",
    title: "NASA Space Apps Challenge",
    subtitle: "NASA International Competition",
    description: "Participated in the global NASA Space Apps Challenge, developing innovative solutions for space exploration challenges."
  },
  {
    image: "/photos/academic-achievements/architectureTutor.png",
    year: "2023",
    title: "Architecture Tutor",
    subtitle: "Academic Teaching Role",
    description: "Served as a tutor in architecture, helping students understand design principles and architectural concepts."
  },
  {
    image: "/photos/academic-achievements/labTutor.jpeg",
    year: "2023",
    title: "Laboratory Tutor",
    subtitle: "Computer Science Department",
    description: "Assisted students in computer science laboratory sessions, providing guidance on programming and technical projects."
  },
  {
    image: "/photos/academic-achievements/campside.jpg",
    year: "2022",
    title: "Camp Leadership",
    subtitle: "Educational Program",
    description: "Led educational activities and mentored students in various academic and personal development programs."
  },
  {
    image: "/photos/academic-achievements/komcer.jpeg",
    year: "2022",
    title: "Academic Certificate",
    subtitle: "Recognition of Excellence",
    description: "Received academic recognition for outstanding performance and contribution to the educational community."
  }
];

const events = academicAchievements.map((achievement) => ({
  year: achievement.year,
  title: achievement.title,
  subtitle: achievement.subtitle,
  description: achievement.description,
  image: achievement.image,
}));

interface AcademicAchievementsTimelineProps {
  setShowSplashCursor?: (v: boolean) => void;
}

const AcademicAchievementsTimeline: React.FC<AcademicAchievementsTimelineProps> = ({ setShowSplashCursor }) => {
  return (
    <ScrollTimeline
      events={events}
      title="Academic Achievements"
      subtitle="Journey of Learning and Leadership"
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