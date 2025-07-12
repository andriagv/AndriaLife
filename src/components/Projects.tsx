import React, { useState } from "react";
import { useProjects } from "@/hooks/useProjects";
import { useCategory } from "@/contexts/CategoryContext";
import ProjectsHeader from "./projects/ProjectsHeader";
import ProjectFilters from "./projects/ProjectFilters";
import ProjectGrid from "./projects/ProjectGrid";
import PaginatedProjectGrid from "./projects/PaginatedProjectGrid";
import IOSProjectLayout from "./projects/IOSProjectLayout";
import PhotographyLayout from "./projects/PhotographyLayout";
import ProjectModal from "./projects/ProjectModal";
import LoadingSpinner from "./common/LoadingSpinner";
import ErrorBoundary from "./ErrorBoundary";

const Projects: React.FC = () => {
  const { category } = useCategory();
  const { viewData, filter, setFilter, isLoading, error, getProjectById } = useProjects();
  const [activeModalId, setActiveModalId] = useState<number | null>(null);

  const modalProject = activeModalId ? getProjectById(activeModalId) : undefined;

  const handleModalClose = () => {
    setActiveModalId(null);
  };

  const handleProjectClick = (projectId: number) => {
    setActiveModalId(projectId);
  };

  if (error) {
    return (
      <section id="projects" className="bg-secondary/30 section-padding">
        <div className="container mx-auto text-center">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <ErrorBoundary>
      <section id="projects" className="bg-background section-padding">
        <div className="container mx-auto">
          <ProjectFilters 
            filters={viewData.filterOptions}
            activeFilter={filter}
            onFilterChange={setFilter}
          />

          {isLoading && <LoadingSpinner size="lg" className="my-8" />}

          {!isLoading && (
            <>
              {/* Photography has custom layout */}
              {category === 'photography' && <PhotographyLayout />}
              
              {/* iOS has custom layout */}
              {category === 'ios' && (
                <IOSProjectLayout 
                  projects={viewData.projects}
                  filter={filter}
                />
              )}

              {/* Default grid layout for other categories */}
              {category !== 'ios' && category !== 'photography' && (
                <PaginatedProjectGrid 
                  projects={viewData.projects}
                  onProjectClick={handleProjectClick}
                />
              )}
            </>
          )}
        </div>

        <ProjectModal 
          project={modalProject}
          isOpen={activeModalId !== null}
          onClose={handleModalClose}
        />
      </section>
    </ErrorBoundary>
  );
};

export default Projects;