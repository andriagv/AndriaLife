export interface ISkillsService {
  getSkillsForCategory(category: string, t: (key: string) => string): Skill[];
  shouldDisplaySkillsForCategory(category: string): boolean;
  getSkillsViewData(category: string, t: (key: string) => string): SkillsViewData;
}

export interface Skill {
  name: string;
  level: number;
}

export interface SkillsViewData {
  skills: Skill[];
  shouldDisplay: boolean;
  title: string;
  description: string;
}