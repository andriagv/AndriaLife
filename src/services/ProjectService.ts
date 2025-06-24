import { IProjectService, FilterOption, ProjectFilter, ProjectsViewData } from "@/interfaces/IProjectService";
import { Project } from "@/types";
import { TranslationKey } from "@/utils/translations";
import { getAllProjects } from "@/data/projects";

export class ProjectService implements IProjectService {
  getAllProjects(t: (key: TranslationKey) => string, language: 'en' | 'ka'): Project[] {
    return getAllProjects(t, language);
  }

  getProjectsByCategory(category: string, t: (key: TranslationKey) => string, language: 'en' | 'ka'): Project[] {
    const allProjects = this.getAllProjects(t, language);
    return allProjects.filter(project => project.category === category);
  }

  getProjectById(id: number, t: (key: TranslationKey) => string, language: 'en' | 'ka'): Project | undefined {
    const allProjects = this.getAllProjects(t, language);
    return allProjects.find(project => project.id === id);
  }

  getFilterOptionsForCategory(category: string, t: (key: TranslationKey) => string): FilterOption[] {
    const filterCategories: Record<string, FilterOption[]> = {
      ios: [
        { id: "all", label: t('all') },
        { id: "app", label: t('myProjects') },
        { id: "certificate", label: t('certificates') }
      ],
      camps: [
        { id: "all", label: t('all') },
        { id: "participation", label: t('campParticipation') },
        { id: "professional", label: t('leader') },
      ],
      academic: [
        { id: "all", label: t('all') },
        { id: "education", label: t('education') }
      ],
      design: [
        { id: "all", label: t('all') },
        { id: "work", label: t('work') },
        { id: "sport", label: t('sport') },
        { id: "camp", label: 'Camp' }
      ],
      photography: [
        { id: "all", label: t('all') },
        { id: "photos", label: t('photos') }
      ],
      robotics: [
        { id: "all", label: t('all') },
        { id: "projects", label: t('myProjects') }
      ],
      mathematics: [
        { id: "all", label: t('all') },
        { id: "topics", label: t('topics') }
      ],
      sports: [
        { id: "all", label: t('all') },
        { id: "achievements", label: t('achievements') }
      ]
    };

    return filterCategories[category] || [];
  }

  getSectionTitle(category: string, t: (key: TranslationKey) => string): string {
    const titleMap: Record<string, TranslationKey> = {
      camps: "campParticipation",
      ios: "iosDeveloper",
      photography: "photography",
      robotics: "robotics",
      mathematics: "mathematics",
      sports: "sports"
    };

    return t(titleMap[category] || "myProjects");
  }

  getSectionDescription(category: string, t: (key: TranslationKey) => string): string {
    const descriptionMap: Record<string, TranslationKey> = {
      camps: 'campsDescription',
      photography: 'photographyDescription',
      robotics: 'roboticsDescription',
      mathematics: 'mathematicsDescription',
      sports: 'sportsDescription'
    };

    return t(descriptionMap[category] || 'projectsDescription');
  }

  getProjectsViewData(
    category: string, 
    filter: string, 
    t: (key: TranslationKey) => string, 
    language: 'en' | 'ka'
  ): ProjectsViewData {
    const categoryProjects = this.getProjectsByCategory(category, t, language);
    const filteredProjects = filter === "all" 
      ? categoryProjects 
      : categoryProjects.filter(project => project.subcategory === filter);

    return {
      projects: filteredProjects,
      filterOptions: this.getFilterOptionsForCategory(category, t),
      sectionTitle: this.getSectionTitle(category, t),
      sectionDescription: this.getSectionDescription(category, t)
    };
  }
}