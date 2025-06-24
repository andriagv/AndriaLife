import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Github, Gitlab, Award, Facebook, Linkedin } from "lucide-react";
import { Project } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProjectCardProps {
  project: Project;
  onCardClick?: (projectId: number) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onCardClick }) => {
  const { t } = useLanguage();

  // Determine the main link for the card (priority: facebook, linkedin, github, gitlab, live)
  const mainLink = project.facebookUrl || project.linkedinUrl || project.githubUrl || project.gitlabUrl || project.liveUrl;

  const handleCardClick = () => {
    if (onCardClick && (project.id === 4 || project.id === 5 || project.modal)) {
      onCardClick(project.id);
    }
  };

  const cardContent = (
    <Card className="overflow-hidden group transition-all duration-300 hover:shadow-lg cursor-pointer h-full">
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
              onClick={e => e.stopPropagation()}
            >
              GitHub
              <Github className="ml-1" size={14} />
            </a>
          )}
          {project.gitlabUrl && (
            <a 
              href={project.gitlabUrl}
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm flex items-center text-primary hover:underline"
              onClick={e => e.stopPropagation()}
            >
              GitLab
              <Gitlab className="ml-1" size={14} />
            </a>
          )}
          {project.facebookUrl && (
            <a 
              href={project.facebookUrl}
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm flex items-center text-primary hover:underline"
              onClick={e => e.stopPropagation()}
            >
              Facebook
              <Facebook className="ml-1" size={14} />
            </a>
          )}
          {project.linkedinUrl && (
            <a 
              href={project.linkedinUrl}
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm flex items-center text-primary hover:underline"
              onClick={e => e.stopPropagation()}
            >
              LinkedIn
              <Linkedin className="ml-1" size={14} />
            </a>
          )}
          {project.liveUrl && (
            <a 
              href={project.liveUrl}
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm flex items-center text-primary hover:underline"
              onClick={e => e.stopPropagation()}
            >
              {t('livePreview')}
              <ExternalLink className="ml-1" size={14} />
            </a>
          )}
          {project.certificateUrl && (
            <a 
              href={project.certificateUrl}
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm flex items-center text-primary hover:underline"
              onClick={e => e.stopPropagation()}
            >
              {t('viewCertificate')}
              <Award className="ml-1" size={14} />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );

  // Special handling for projects that open a modal
  if (project.id === 4 || project.id === 5 || project.modal) {
    return (
      <div onClick={handleCardClick}>
        {cardContent}
      </div>
    );
  }

  // Default behavior for projects with external links
  if (mainLink) {
    return (
      <a
        href={mainLink}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        {cardContent}
      </a>
    );
  }
  
  // Fallback for cards with no link
  return <div>{cardContent}</div>;
};

export default ProjectCard;