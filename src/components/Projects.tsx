import React, { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCategory } from "@/contexts/CategoryContext";
import { useProjectService } from "@/services/ServiceContainer";
import ProjectsHeader from "./projects/ProjectsHeader";
import ProjectFilters from "./projects/ProjectFilters";
import ProjectGrid from "./projects/ProjectGrid";
import IOSProjectLayout from "./projects/IOSProjectLayout";
import PhotographyLayout from "./projects/PhotographyLayout";
import ProjectModal from "./projects/ProjectModal";

const Projects: React.FC = () => {
  const { t, language } = useLanguage();
  const { category } = useCategory();
  const projectService = useProjectService();
  const [filter, setFilter] = useState("all");
  const [activeModalId, setActiveModalId] = useState<number | null>(null);
  
  // Reset filter when category changes
  useEffect(() => {
    setFilter("all");
  }, [category]);

  // Get projects view data using the service
  const viewData = projectService.getProjectsViewData(category, filter, t, language);
  const modalProject = activeModalId ? projectService.getProjectById(activeModalId, t, language) : undefined;

  const handleModalClose = () => {
    setActiveModalId(null);
  };

  const handleProjectClick = (projectId: number) => {
    setActiveModalId(projectId);
  };

  return (
    <section id="projects" className="bg-secondary/30 section-padding">
      <div className="container mx-auto">
        <ProjectsHeader 
          title={viewData.sectionTitle}
          description={viewData.sectionDescription}
        />

        <ProjectFilters 
          filters={viewData.filterOptions}
          activeFilter={filter}
          onFilterChange={setFilter}
        />

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
          <ProjectGrid 
            projects={viewData.projects}
            onProjectClick={handleProjectClick}
          />
        )}
      </div>

      <ProjectModal 
        project={modalProject}
        isOpen={activeModalId !== null}
        onClose={handleModalClose}
      />
    </section>
  );
};

export default Projects;