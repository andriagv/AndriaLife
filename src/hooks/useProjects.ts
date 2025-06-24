import { useState, useEffect, useMemo } from "react";
import { useProjectService } from "@/services/ServiceContainer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCategory } from "@/contexts/CategoryContext";
import { ProjectsViewData } from "@/interfaces/IProjectService";

export const useProjects = () => {
  const { t, language } = useLanguage();
  const { category } = useCategory();
  const projectService = useProjectService();
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset filter when category changes
  useEffect(() => {
    setFilter("all");
  }, [category]);

  // Memoize the projects view data to prevent unnecessary recalculations
  const viewData: ProjectsViewData = useMemo(() => {
    try {
      setIsLoading(true);
      setError(null);
      const data = projectService.getProjectsViewData(category, filter, t, language);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while loading projects');
      return {
        projects: [],
        filterOptions: [],
        sectionTitle: '',
        sectionDescription: ''
      };
    } finally {
      setIsLoading(false);
    }
  }, [category, filter, t, language, projectService]);

  const getProjectById = (id: number) => {
    try {
      return projectService.getProjectById(id, t, language);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while loading project');
      return undefined;
    }
  };

  return {
    viewData,
    filter,
    setFilter,
    isLoading,
    error,
    getProjectById
  };
};