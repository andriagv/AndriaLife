import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Github, Gitlab, Award, Facebook, Linkedin } from "lucide-react";
import { Project } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

interface ProjectCardProps {
  project: Project;
  onCardClick?: (projectId: number) => void;
  index?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onCardClick, index = 0 }) => {
  const { t } = useLanguage();

  const mainLink = project.facebookUrl || project.linkedinUrl || project.githubUrl || project.gitlabUrl || project.liveUrl;

  const handleCardClick = () => {
    if (onCardClick && (project.id === 4 || project.id === 5 || project.modal)) {
      onCardClick(project.id);
    }
  };

  // Glassmorphism + Gradient Border + Hover effect only for camps
  const isCamps = project.category === "camps";

  const cardContent = (
    <Card
      className={
        `overflow-hidden group transition-all duration-300 cursor-pointer h-full ` +
        (isCamps ? "glass-card gradient-border-camps" : "hover:shadow-lg")
      }
    >
      <div className="overflow-hidden h-48 relative">
        <motion.img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 group-hover:rotate-1"
          whileHover={isCamps ? { scale: 1.08, rotate: 2 } : {}}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
        {/* Overlay on hover for camps */}
        {isCamps && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-blue-400/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end justify-center"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <button className="mb-4 px-4 py-2 bg-white/80 rounded-lg font-semibold shadow-lg hover:bg-white">
              View Details
            </button>
          </motion.div>
        )}
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
      <motion.div
        onClick={handleCardClick}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", delay: index * 0.12 }}
      >
        {cardContent}
      </motion.div>
    );
  }

  // Default behavior for projects with external links
  if (mainLink) {
    return (
      <motion.a
        href={mainLink}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
        style={{ textDecoration: 'none', color: 'inherit' }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", delay: index * 0.12 }}
      >
        {cardContent}
      </motion.a>
    );
  }
  
  // Fallback for cards with no link
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", delay: index * 0.12 }}
    >
      {cardContent}
    </motion.div>
  );
};

export default ProjectCard;