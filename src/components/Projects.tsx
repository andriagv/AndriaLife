
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

const Projects: React.FC = () => {
  const [filter, setFilter] = useState("all");
  
  const projects = [
    {
      id: 1,
      title: "Project One",
      category: "web",
      description: "A short description of the project highlighting key features and technologies used.",
      imageUrl: "https://placehold.co/600x400?text=Project+One",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: 2,
      title: "Project Two",
      category: "app",
      description: "A short description of the project highlighting key features and technologies used.",
      imageUrl: "https://placehold.co/600x400?text=Project+Two",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: 3,
      title: "Project Three",
      category: "design",
      description: "A short description of the project highlighting key features and technologies used.",
      imageUrl: "https://placehold.co/600x400?text=Project+Three",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: 4,
      title: "Project Four",
      category: "web",
      description: "A short description of the project highlighting key features and technologies used.",
      imageUrl: "https://placehold.co/600x400?text=Project+Four",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: 5,
      title: "Project Five",
      category: "app",
      description: "A short description of the project highlighting key features and technologies used.",
      imageUrl: "https://placehold.co/600x400?text=Project+Five",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: 6,
      title: "Project Six",
      category: "design",
      description: "A short description of the project highlighting key features and technologies used.",
      imageUrl: "https://placehold.co/600x400?text=Project+Six",
      liveUrl: "#",
      githubUrl: "#",
    },
  ];

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <section id="projects" className="bg-secondary/30 section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">My Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-4 mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Check out some of my recent work
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <Button 
            variant={filter === "all" ? "default" : "outline"} 
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          <Button 
            variant={filter === "web" ? "default" : "outline"} 
            onClick={() => setFilter("web")}
          >
            Web
          </Button>
          <Button 
            variant={filter === "app" ? "default" : "outline"} 
            onClick={() => setFilter("app")}
          >
            App
          </Button>
          <Button 
            variant={filter === "design" ? "default" : "outline"} 
            onClick={() => setFilter("design")}
          >
            Design
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
                    href={project.liveUrl}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm flex items-center text-primary hover:underline"
                  >
                    Live preview <ExternalLink className="ml-1" size={14} />
                  </a>
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
