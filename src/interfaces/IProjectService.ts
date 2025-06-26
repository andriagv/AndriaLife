import { Project } from "@/types";
import { TranslationKey } from "@/utils/translations";

export interface IProjectService {
  getAllProjects(t: (key: TranslationKey) => string, language: 'en' | 'ka'): Project[];
  getProjectsByCategory(category: string, t: (key: TranslationKey) => string, language: 'en' | 'ka'): Project[];
  getProjectById(id: number, t: (key: TranslationKey) => string, language: 'en' | 'ka'): Project | undefined;
  getFilterOptionsForCategory(category: string, t: (key: TranslationKey) => string): FilterOption[];
}

export interface FilterOption {
  id: string;
  label: string;
}

// Data Transfer Objects
export interface ProjectFilter {
  category: string;
  subcategory?: string;
}

export interface ProjectsViewData {
  projects: Project[];
  filterOptions: FilterOption[];
  sectionTitle: string;
  sectionDescription: string;
}