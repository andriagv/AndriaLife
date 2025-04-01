
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Projects: React.FC = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState("all");
  
  const projects = [
    {
      id: 1,
      title: t('campsideTitle'),
      category: "app",
      description: t('campsideDescription'),
      imageUrl: "https://placehold.co/600x400?text=Campside",
      githubUrl: "https://github.com/andriagv/TbcIosFinalProject",
    },
    {
      id: 2,
      title: t('instagramCloneTitle'),
      category: "app",
      description: t('instagramCloneDescription'),
      imageUrl: "https://placehold.co/600x400?text=Instagram+Clone",
      githubUrl: "https://github.com/Irakli66/InstagramClone",
    },
  ];

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.category === filter);

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
          <Button 
            variant={filter === "all" ? "default" : "outline"} 
            onClick={() => setFilter("all")}
          >
            {t('all')}
          </Button>
          <Button 
            variant={filter === "web" ? "default" : "outline"} 
            onClick={() => setFilter("web")}
          >
            {t('web')}
          </Button>
          <Button 
            variant={filter === "app" ? "default" : "outline"} 
            onClick={() => setFilter("app")}
          >
            {t('app')}
          </Button>
          <Button 
            variant={filter === "design" ? "default" : "outline"} 
            onClick={() => setFilter("design")}
          >
            {t('design')}
          </Button>
        </div>

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
                  <a 
                    href={project.githubUrl}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm flex items-center text-primary hover:underline"
                  >
                    GitHub <Github className="ml-1" size={14} />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
