import React from "react";

interface ProjectsHeaderProps {
  title: string;
  description: string;
}

const ProjectsHeader: React.FC<ProjectsHeaderProps> = ({ title, description }) => {
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
      <div className="w-20 h-1 bg-primary mx-auto mt-4 mb-6"></div>
      <p className="text-muted-foreground max-w-2xl mx-auto">
        {description}
      </p>
    </div>
  );
};

export default ProjectsHeader;