import React from "react";
import { Project } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import ProjectCard from "./ProjectCard";

interface ProjectGridProps {
  projects: Project[];
  onProjectClick?: (projectId: number) => void;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects, onProjectClick }) => {
  const { t } = useLanguage();

  if (projects.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-muted-foreground">{t('noProjectsFound')}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard 
          key={project.id} 
          project={project} 
          onCardClick={onProjectClick}
        />
      ))}
    </div>
  );
};

export default ProjectGrid;