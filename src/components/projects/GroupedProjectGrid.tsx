import React from "react";
import { Project } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import ProjectCard from "./ProjectCard";

export interface ProjectGroup {
  /** Matches `Project.subcategory` */
  id: string;
  title: string;
}

interface GroupedProjectGridProps {
  projects: Project[];
  groups: ProjectGroup[];
  filter: string;
  onProjectClick: (projectId: number) => void;
}

/** Cards split into titled sections by subcategory (e.g. hackathons: participation / organizing). */
const GroupedProjectGrid: React.FC<GroupedProjectGridProps> = ({ projects, groups, filter, onProjectClick }) => {
  const { t } = useLanguage();

  const visible = groups
    .filter((group) => filter === "all" || filter === group.id)
    .map((group) => ({ ...group, items: projects.filter((p) => p.subcategory === group.id) }))
    .filter((group) => group.items.length > 0);

  if (visible.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-muted-foreground">{t("noProjectsFound")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {visible.map((group) => (
        <div key={group.id}>
          <h3 className="text-3xl font-bold text-center mb-12">{group.title}</h3>
          {/* Flex rather than grid so that a group with one or two cards stays centered */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
            {group.items.map((project, idx) => (
              <div key={project.id} className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1.4rem)]">
                <ProjectCard project={project} onCardClick={onProjectClick} index={idx} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GroupedProjectGrid;
