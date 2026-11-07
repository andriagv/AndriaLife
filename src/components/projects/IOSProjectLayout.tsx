import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Gitlab } from "lucide-react";
import { Project } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import Magnet from "@/components/common/Magnet";
import OptimizedImage from "@/components/ui/OptimizedImage";
import styles from './IOSProjectLayout.module.css';

interface IOSProjectLayoutProps {
  projects: Project[];
  filter: string;
}

const IOSProjectLayout: React.FC<IOSProjectLayoutProps> = ({ projects, filter }) => {
  const { t } = useLanguage();
  
  const iosWork = projects.filter(p => p.subcategory === 'work');
  const iosApps = projects.filter(p => p.subcategory === 'app');
  const iosCertificates = projects.filter(p => p.subcategory === 'certificate');

  const showWork = filter === 'all' || filter === 'work';
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
      {/* Work experience Section */}
      {showWork && iosWork.length > 0 && (
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">{t('work')}</h3>
          <div className="mx-auto max-w-4xl space-y-6">
            {iosWork.map((job) => (
              <div
                key={job.id}
                className={`${styles['glass-card']} flex flex-col md:flex-row items-center gap-6 text-center md:text-left`}
              >
                {/* Company logo on its own tile, so dark and light logos both stay readable */}
                {job.imageUrl && (
                  <div
                    className={`flex h-24 w-24 shrink-0 items-center justify-center rounded-xl p-3 shadow-sm ring-1 ring-black/5 ${
                      job.imageTone === 'dark' ? 'bg-neutral-900' : 'bg-white'
                    }`}
                  >
                    <img
                      src={job.imageUrl}
                      alt={job.title}
                      loading="lazy"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-3">
                    <h3 className="text-2xl font-bold">{job.title}</h3>
                    {job.period && (
                      <span className="text-primary font-medium whitespace-nowrap">{job.period}</span>
                    )}
                  </div>
                  <p className="text-muted-foreground">{job.description}</p>
                  {job.tags && job.tags.length > 0 && (
                    <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
                      {job.tags.map(tag => (
                        <span key={tag} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects Section */}
      {showApps && iosApps.length > 0 && (
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">{t('myProjects')}</h3>
          <div className="space-y-12">
            {visibleApps.map((project) => (
              <div
                key={project.id}
                className={`${styles['glass-card']} flex flex-col md:flex-row items-center gap-8`}
                onMouseEnter={() => {
                  document.body.classList.add('splash-cursor-faded');
                }}
                onMouseLeave={() => {
                  document.body.classList.remove('splash-cursor-faded');
                }}
              >
                {/* Image */}
                <div className="w-full md:w-1/6">
                  <OptimizedImage
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
                <Button onClick={() => setShowAllApps(true)} 
                  className="filter-btn">
                  {t('seeMore')}
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
                  <OptimizedImage
                    src={cert.imageUrl}
                    alt={cert.title}
                    className={`w-full h-auto object-contain rounded-md ${styles['certificate-image-shadow']}`}
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
                <Button onClick={() => setShowAllCerts(true)} 
                  className="filter-btn">
                  {t('seeMore')}
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