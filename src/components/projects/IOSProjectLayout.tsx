import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Gitlab } from "lucide-react";
import { Project } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import Magnet from "@/components/common/Magnet";

interface IOSProjectLayoutProps {
  projects: Project[];
  filter: string;
}

const IOSProjectLayout: React.FC<IOSProjectLayoutProps> = ({ projects, filter }) => {
  const { t } = useLanguage();
  
  const iosApps = projects.filter(p => p.subcategory === 'app');
  const iosCertificates = projects.filter(p => p.subcategory === 'certificate');

  const showApps = filter === 'all' || filter === 'app';
  const showCerts = filter === 'all' || filter === 'certificate';

  if (projects.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-muted-foreground">{t('noProjectsFound')}</p>
      </div>
    );
  }

  const [showAllApps, setShowAllApps] = useState(false);
  const [showAllCerts, setShowAllCerts] = useState(false);
  const visibleApps = showAllApps ? iosApps : iosApps.slice(0, 4);
  const visibleCerts = showAllCerts ? iosCertificates : iosCertificates.slice(0, 4);

  return (
    <div>
      {/* Projects Section */}
      {showApps && iosApps.length > 0 && (
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">{t('myProjects')}</h3>
          <div className="space-y-12">
            {visibleApps.map((project) => (
              <div key={project.id} className="flex flex-col md:flex-row items-center gap-8">
                {/* Image */}
                <div className="w-full md:w-1/6">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="w-full h-auto object-contain rounded-md"
                  />
                </div>
                {/* Content */}
                <div className="w-full md:w-5/6 text-center md:text-left">
                  <h3 className="text-3xl font-bold mb-4">{project.title}</h3>
                  <p className="text-muted-foreground mb-6">{project.description}</p>
                  {/* Tags */}
                  <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
                    {project.tags?.map(tag => (
                      <span key={tag} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {/* Buttons */}
                  <div className="flex justify-center md:justify-start gap-4">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="default" size="lg">GitHub <Github className="ml-2" size={18} /></Button>
                      </a>
                    )}
                    {project.gitlabUrl && (
                      <a href={project.gitlabUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="default" size="lg">GitLab <Gitlab className="ml-2" size={18} /></Button>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="lg">{t('livePreview')} <ExternalLink className="ml-2" size={18} /></Button>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {!showAllApps && iosApps.length > 4 && (
            <div className="flex justify-center mt-8">
              <Magnet padding={90} magnetStrength={15}>
                <Button onClick={() => setShowAllApps(true)} variant="outline">
                  See more
                </Button>
              </Magnet>
            </div>
          )}
        </div>
      )}

      {/* Certificates Section */}
      {showCerts && iosCertificates.length > 0 && (
        <div>
          <h3 className="text-3xl font-bold text-center mb-12">{t('certificatesSectionTitle')}</h3>
          <div className="space-y-12">
            {visibleCerts.map((cert) => (
              <div key={cert.id} className="flex flex-col md:flex-row items-center gap-8">
                {/* Image */}
                <div className="w-full md:w-1/4">
                  <img 
                    src={cert.imageUrl} 
                    alt={cert.title}
                    className="w-full h-auto object-contain rounded-md shadow-lg"
                  />
                </div>
                {/* Content */}
                <div className="w-full md:w-3/4 text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-4">{cert.title}</h3>
                  <p className="text-muted-foreground">{cert.description}</p>
                </div>
              </div>
            ))}
          </div>
          {!showAllCerts && iosCertificates.length > 4 && (
            <div className="flex justify-center mt-8">
              <Magnet padding={90} magnetStrength={15}>
                <Button onClick={() => setShowAllCerts(true)} variant="outline">
                  See more
                </Button>
              </Magnet>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default IOSProjectLayout;