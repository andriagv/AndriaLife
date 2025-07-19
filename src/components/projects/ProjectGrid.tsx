import React, { useState } from "react";
import { Project } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import ProjectCard from "./ProjectCard";

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {visibleProjects.map((project) => (
          <ProjectCard key={project.id} project={project} onCardClick={onProjectClick} />
        ))}
      </div>
      {!showAll && projects.length > 4 && (
        <div className="flex justify-center mt-8">
          <button
            className="px-6 py-2 bg-primary text-white rounded hover:bg-primary/90 transition"
            onClick={() => setShowAll(true)}
          >
            See more
          </button>
        </div>
      )}
    </>
  );
};

export default ProjectGrid;