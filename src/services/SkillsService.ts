import { ISkillsService, Skill, SkillsViewData } from "@/interfaces/ISkillsService";

export class SkillsService implements ISkillsService {
  private skillsData: Record<string, Skill[]> = {
    ios: [
      { name: "Swift", level: 95 },
      { name: "UIKit", level: 90 },
      { name: "SwiftUI", level: 85 },
      { name: "Core Data", level: 75 },
      { name: "Firebase", level: 70 },
    ],
    camps: [
      { name: "Data Analysis", level: 85 },
      { name: "Project Management", level: 80 },
      { name: "Critical Thinking", level: 90 },
      { name: "Presentation Skills", level: 85 },
      { name: "Negotiation Skills", level: 75 },
    ],
    academic: [
      { name: "Python", level: 85 },
      { name: "Arduino", level: 80 },
      { name: "Electronics", level: 75 },
      { name: "3D Printing", level: 70 },
      { name: "Sensor Integration", level: 65 },
    ],
    startups: [
      { name: "Business Planning", level: 85 },
      { name: "Market Research", level: 80 },
      { name: "Fundraising", level: 70 },
      { name: "Pitch Deck Creation", level: 85 },
      { name: "MVP Development", level: 90 },
    ]
  };

  getSkillsForCategory(category: string, t: (key: string) => string): Skill[] {
    // Handle sports category with translations
    if (category === 'sports') {
      return [
        { name: t("football"), level: 100 },
        { name: t("wrestling"), level: 90 },
        { name: t("volleyball"), level: 80 },
        { name: t("skiing"), level: 80 },
        { name: t("karate"), level: 70 },
        { name: t("pingPong"), level: 70 },
        { name: t("tennis"), level: 50 },
        { name: t("basketball"), level: 2 },
      ];
    }

    return this.skillsData[category] || [];
  }

  shouldDisplaySkillsForCategory(category: string): boolean {
    return category !== 'design' && category !== 'photography';
  }

  getSkillsViewData(category: string, t: (key: string) => string): SkillsViewData {
    return {
      skills: this.getSkillsForCategory(category, t),
      shouldDisplay: this.shouldDisplaySkillsForCategory(category),
      title: t('mySkills'),
      description: t('skillsDescription')
    };
  }
}