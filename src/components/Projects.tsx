import React, { useState } from "react";
import { useProjects } from "@/hooks/useProjects";
import { useCategory } from "@/contexts/CategoryContext";
import { useLanguage } from "@/contexts/LanguageContext";

import ProjectFilters from "./projects/ProjectFilters";
import GroupedProjectGrid from "./projects/GroupedProjectGrid";

import ProjectCard from "./projects/ProjectCard";
import PaginatedProjectGrid from "./projects/PaginatedProjectGrid";
import SectionedProjectLayout, { type ProjectSection } from "./projects/SectionedProjectLayout";
import PhotographyLayout from "./projects/PhotographyLayout";
import ProjectModal from "./projects/ProjectModal";
import LoadingSpinner from "./common/LoadingSpinner";
import ErrorBoundary from "./ErrorBoundary";

const Projects: React.FC = () => {
  const { category } = useCategory();
  const { t } = useLanguage();
  const { viewData, filter, setFilter, isLoading, error, getProjectById } = useProjects();
  const [activeModalId, setActiveModalId] = useState<number | null>(null);

  // iOS and AI share one look: work experience rows, then big project cards (section ids match the project
  // subcategories and the filter buttons)
  const sectionsByCategory: Record<string, ProjectSection[]> = {
    ios: [
      { id: "work", title: t("work"), variant: "work" },
      { id: "app", title: t("myProjects"), variant: "cards" },
      { id: "certificate", title: t("certificatesSectionTitle"), variant: "certificates" },
    ],
    ai: [
      { id: "work", title: t("work"), variant: "work" },
      { id: "voice", title: t("aiVoiceAssistants"), variant: "cards" },
      { id: "agents", title: t("aiAgentsAutomation"), variant: "cards" },
    ],
  };
  const sections = sectionsByCategory[category];

  // Other categories whose cards are split into titled sections
  const groupsByCategory: Record<string, { id: string; title: string }[]> = {
    hackathons: [
      { id: "participation", title: t("hackathonParticipation") },
      { id: "organizing", title: t("hackathonOrganizing") },
    ],
  };
  const groups = groupsByCategory[category];

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
      <section id="projects" className="section-padding">
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
              
              {/* iOS and AI: work experience rows and big project cards */}
              {sections && (
                <SectionedProjectLayout
                  projects={viewData.projects}
                  filter={filter}
                  sections={sections}
                />
              )}

              {/* Camps category - show all projects without pagination */}
              {category === 'camps' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                  {viewData.projects.map((project, idx) => (
                    <ProjectCard key={project.id} project={project} onCardClick={handleProjectClick} index={idx} />
                  ))}
                </div>
              )}

              {/* Hackathons: cards split into titled sections */}
              {groups && (
                <GroupedProjectGrid
                  projects={viewData.projects}
                  groups={groups}
                  filter={filter}
                  onProjectClick={handleProjectClick}
                />
              )}

              {/* Default grid layout for other categories */}
              {category !== 'photography' && category !== 'camps' && !sections && !groups && (
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