import React, { useState } from "react";
import { Project } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import ProjectCard from "./ProjectCard";
import Magnet from "@/components/common/Magnet";

interface ProjectGridProps {
  projects: Project[];
  onProjectClick?: (projectId: number) => void;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects, onProjectClick }) => {
  const [showAll, setShowAll] = useState(false);
  const visibleProjects = showAll ? projects : projects.slice(0, 4);
  const { t } = useLanguage();

  if (projects.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-muted-foreground">{t('noProjectsFound')}</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        {visibleProjects.map((project, idx) => (
          <ProjectCard key={project.id} project={project} onCardClick={onProjectClick} index={idx} />
        ))}
      </div>
      {!showAll && projects.length > 4 && (
        <div className="flex justify-center mt-6 sm:mt-8">
          <Magnet padding={90} magnetStrength={15}>
            <button
              className="filter-btn px-6 py-2"
              onClick={() => setShowAll(true)}
            >
              {t('seeMore')}
            </button>
          </Magnet>
        </div>
      )}
    </>
  );
};

export default ProjectGrid;