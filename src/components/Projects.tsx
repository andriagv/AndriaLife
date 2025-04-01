
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Gitlab } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCategory } from "@/contexts/CategoryContext";

// Define project type
interface Project {
  id: number;
  title: string;
  category: string;
  subcategory: string;
  description: string;
  imageUrl: string;
  githubUrl?: string;
  gitlabUrl?: string;
  liveUrl?: string;
}

const Projects: React.FC = () => {
  const { t } = useLanguage();
  const { category } = useCategory();
  const [filter, setFilter] = useState("all");
  
  // All projects across categories
  const allProjects: Project[] = [
    // iOS Developer projects
    {
      id: 1,
      title: t('campsideTitle'),
      category: "ios",
      subcategory: "app",
      description: t('campsideDescription'),
      imageUrl: "https://placehold.co/600x400?text=Campside",
      githubUrl: "https://github.com/andriagv/TbcIosFinalProject",
    },
    {
      id: 2,
      title: t('instagramCloneTitle'),
      category: "ios",
      subcategory: "app",
      description: t('instagramCloneDescription'),
      imageUrl: "https://placehold.co/600x400?text=Instagram+Clone",
      githubUrl: "https://github.com/Irakli66/InstagramClone",
    },
    {
      id: 3,
      title: t('manageSubscriptionsTitle'),
      category: "ios",
      subcategory: "app",
      description: t('manageSubscriptionsDescription'),
      imageUrl: "https://placehold.co/600x400?text=Manage+Subscriptions",
      gitlabUrl: "https://gitlab.com/techxplore7/manage-subscriptions-ios",
    },
    // Camps projects
    {
      id: 4,
      title: t('youngLeadersTitle'),
      category: "camps",
      subcategory: "participation",
      description: t('youngLeadersDescription'),
      imageUrl: "https://placehold.co/600x400?text=Young+Leaders+School",
    },
    {
      id: 5,
      title: t('anakliaTitle'),
      category: "camps",
      subcategory: "participation",
      description: t('anakliaDescription'),
      imageUrl: "https://placehold.co/600x400?text=Anaklia+Youth+Camp",
    },
    {
      id: 6,
      title: t('gitaTitle'),
      category: "camps",
      subcategory: "participation",
      description: t('gitaDescription'),
      imageUrl: "https://placehold.co/600x400?text=GITA+Camp",
    },
    {
      id: 7,
      title: t('icsuTitle'),
      category: "camps",
      subcategory: "participation",
      description: t('icsuDescription'),
      imageUrl: "https://placehold.co/600x400?text=ICSU+Camp",
    },
    {
      id: 8,
      title: t('kiuAmbassadorTitle'),
      category: "camps",
      subcategory: "professional",
      description: t('kiuAmbassadorDescription'),
      imageUrl: "https://placehold.co/600x400?text=KIU+Ambassador",
    },
    {
      id: 9,
      title: t('kiuAssistantTitle'),
      category: "camps",
      subcategory: "professional",
      description: t('kiuAssistantDescription'),
      imageUrl: "https://placehold.co/600x400?text=KIU+SA",
    },
    // Robotics projects (placeholders)
    {
      id: 10,
      title: t('roboticsProject1Title'),
      category: "robotics",
      subcategory: "web",
      description: t('roboticsProject1Description'),
      imageUrl: "https://placehold.co/600x400?text=Robotics+Project+1",
      githubUrl: "#",
    },
    // Startups projects
    {
      id: 11,
      title: t('subscriptionProjectTitle'),
      category: "startups",
      subcategory: "professional",
      description: t('subscriptionProjectDescription'),
      imageUrl: "https://placehold.co/600x400?text=Subscription+Project",
    },
    {
      id: 12,
      title: t('tbcCrossCollabTitle'),
      category: "startups",
      subcategory: "professional",
      description: t('tbcCrossCollabDescription'),
      imageUrl: "https://placehold.co/600x400?text=TBC+Cross+Collab",
    },
    {
      id: 13,
      title: t('campsideStartupTitle'),
      category: "startups",
      subcategory: "startup",
      description: t('campsideStartupDescription'),
      imageUrl: "https://placehold.co/600x400?text=Campside+Startup",
      githubUrl: "https://github.com/andriagv/TbcIosFinalProject",
    },
    {
      id: 14,
      title: t('nasaSpaceAppsTitle'),
      category: "startups",
      subcategory: "hackathon",
      description: t('nasaSpaceAppsDescription'),
      imageUrl: "https://placehold.co/600x400?text=NASA+Space+Apps",
    },
  ];

  // Category-specific filter buttons
  const filterCategories = {
    ios: [
      { id: "all", label: t('all') },
      { id: "app", label: t('app') },
      { id: "design", label: t('design') }
    ],
    camps: [
      { id: "all", label: t('all') },
      { id: "participation", label: t('campParticipation') },
      { id: "professional", label: t('professional') }
    ],
    robotics: [
      { id: "all", label: t('all') },
      { id: "web", label: t('web') },
      { id: "hardware", label: t('hardware') }
    ],
    startups: [
      { id: "all", label: t('all') },
      { id: "professional", label: t('professional') },
      { id: "startup", label: t('startup') },
      { id: "hackathon", label: t('hackathon') }
    ]
  };

  // Filter projects by current category
  const categoryProjects = allProjects.filter(project => project.category === category);
  
  // Further filter by subcategory if selected
  const filteredProjects = filter === "all" 
    ? categoryProjects 
    : categoryProjects.filter(project => project.subcategory === filter);

  // Get category-specific filters
  const currentFilters = filterCategories[category] || [];

  return (
    <section id="projects" className="bg-secondary/30 section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">{t('myProjects')}</h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-4 mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('projectsDescription')}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {currentFilters.map((filterOption) => (
            <Button 
              key={filterOption.id}
              variant={filter === filterOption.id ? "default" : "outline"} 
              onClick={() => setFilter(filterOption.id)}
            >
              {filterOption.label}
            </Button>
          ))}
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">{t('noProjectsFound')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden group transition-all duration-300 hover:shadow-lg">
                <div className="overflow-hidden h-48">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex gap-3">
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl}
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-sm flex items-center text-primary hover:underline"
                      >
                        GitHub <Github className="ml-1" size={14} />
                      </a>
                    )}
                    {project.gitlabUrl && (
                      <a 
                        href={project.gitlabUrl}
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-sm flex items-center text-primary hover:underline"
                      >
                        GitLab <Gitlab className="ml-1" size={14} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl}
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-sm flex items-center text-primary hover:underline"
                      >
                        {t('livePreview')} <ExternalLink className="ml-1" size={14} />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
