import { IProjectService } from "@/interfaces/IProjectService";
import { ISkillsService } from "@/interfaces/ISkillsService";
import { ProjectService } from "./ProjectService";
import { SkillsService } from "./SkillsService";

// Dependency Injection Container
export class ServiceContainer {
  private static instance: ServiceContainer;
  private services: Map<string, any> = new Map();

  private constructor() {
    this.registerServices();
  }

  static getInstance(): ServiceContainer {
    if (!ServiceContainer.instance) {
      ServiceContainer.instance = new ServiceContainer();
    }
    return ServiceContainer.instance;
  }

  private registerServices(): void {
    this.services.set('ProjectService', new ProjectService());
    this.services.set('SkillsService', new SkillsService());
  }

  getProjectService(): IProjectService {
    return this.services.get('ProjectService');
  }

  getSkillsService(): ISkillsService {
    return this.services.get('SkillsService');
  }

  // For testing purposes - allows service replacement
  registerService<T>(name: string, service: T): void {
    this.services.set(name, service);
  }
}

// Convenience hooks for dependency injection
export const useProjectService = (): IProjectService => {
  return ServiceContainer.getInstance().getProjectService();
};

export const useSkillsService = (): ISkillsService => {
  return ServiceContainer.getInstance().getSkillsService();
};