import React, { useState } from "react";
import { Project } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import ProjectCard from "./ProjectCard";
import { Button } from "@/components/ui/button";
import Magnet from "@/components/common/Magnet";

interface PaginatedProjectGridProps {
  projects: Project[];
  onProjectClick?: (projectId: number) => void;
  itemsPerPage?: number;
}

const PaginatedProjectGrid: React.FC<PaginatedProjectGridProps> = ({ 
  projects, 
  onProjectClick, 
  itemsPerPage = 4 
}) => {
  const { t } = useLanguage();
  const [showAll, setShowAll] = useState(false);

  if (projects.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-muted-foreground">{t('noProjectsFound')}</p>
      </div>
    );
  }

  const displayedProjects = showAll ? projects : projects.slice(0, itemsPerPage);
  const hasMore = projects.length > itemsPerPage;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedProjects.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            onCardClick={onProjectClick}
          />
        ))}
      </div>
      
      {hasMore && !showAll && (
        <div className="text-center mt-8">
          <Magnet padding={90} magnetStrength={15}>
            <Button 
              className="filter-btn px-8 py-2"
              onClick={() => setShowAll(true)}
            >
              See More ({projects.length - itemsPerPage} more)
            </Button>
          </Magnet>
        </div>
      )}
    </div>
  );
};

export default PaginatedProjectGrid;