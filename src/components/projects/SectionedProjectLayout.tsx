import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Bot, Brain, ExternalLink, Github, Gitlab, Mic, Newspaper, Workflow, type LucideIcon } from "lucide-react";
import { Project } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import Magnet from "@/components/common/Magnet";
import OptimizedImage from "@/components/ui/OptimizedImage";
import styles from "./SectionedProjectLayout.module.css";

/**
 * How a section looks:
 * - work: a row per job with the company logo on a tile
 * - cards: big glass cards (picture or icon on the left, text and buttons on the right)
 * - certificates: picture and text without a card
 */
export type SectionVariant = "work" | "cards" | "certificates";

export interface ProjectSection {
  /** Matches `Project.subcategory` and the id of the matching filter button */
  id: string;
  title: string;
  variant: SectionVariant;
}

interface SectionedProjectLayoutProps {
  projects: Project[];
  filter: string;
  sections: ProjectSection[];
}

/** Icons for `Project.icon`, used when a card has no picture yet */
const ICONS: Record<string, LucideIcon> = {
  mic: Mic,
  bot: Bot,
  brain: Brain,
  newspaper: Newspaper,
  workflow: Workflow,
};

/** Cards and certificates show this many before "See more" */
const VISIBLE_COUNT = 4;

const TagList: React.FC<{ tags?: string[]; className?: string }> = ({ tags, className = "" }) =>
  tags && tags.length > 0 ? (
    <div className={`flex flex-wrap justify-center md:justify-start gap-2 ${className}`}>
      {tags.map((tag) => (
        <span key={tag} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
          {tag}
        </span>
      ))}
    </div>
  ) : null;

const WorkRow: React.FC<{ job: Project }> = ({ job }) => (
  <div className={`${styles["glass-card"]} flex flex-col md:flex-row items-center gap-6 text-center md:text-left`}>
    {/* Company logo on its own tile, so dark and light logos both stay readable */}
    {job.imageUrl && (
      <div
        className={`flex h-24 w-24 shrink-0 items-center justify-center rounded-xl p-3 shadow-sm ring-1 ring-black/5 ${
          job.imageTone === "dark" ? "bg-neutral-900" : "bg-white"
        }`}
      >
        <img src={job.imageUrl} alt={job.title} loading="lazy" className="max-h-full max-w-full object-contain" />
      </div>
    )}
    <div className="min-w-0 flex-1">
      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-3">
        <h3 className="text-2xl font-bold">{job.title}</h3>
        {job.period && <span className="text-primary font-medium whitespace-nowrap">{job.period}</span>}
      </div>
      <p className="text-muted-foreground">{job.description}</p>
      <TagList tags={job.tags} className="mt-4" />
    </div>
  </div>
);

const ProjectCardRow: React.FC<{ project: Project }> = ({ project }) => {
  const { t } = useLanguage();
  const Icon = project.icon ? ICONS[project.icon] : undefined;
  const wide = project.imageLayout === "wide" && !!project.imageUrl;

  return (
    <div
      className={`${styles["glass-card"]} flex flex-col md:flex-row items-center gap-8`}
      onMouseEnter={() => {
        document.body.classList.add("splash-cursor-faded");
      }}
      onMouseLeave={() => {
        document.body.classList.remove("splash-cursor-faded");
      }}
    >
      {/* Picture, or an icon until there is one */}
      <div className={`w-full flex justify-center ${wide ? "md:w-2/5" : "md:w-1/6"}`}>
        {wide ? (
          // A landscape picture (e.g. a diagram) is too small to read in the card: click to see it full size
          <Dialog>
            <DialogTrigger asChild>
              <button type="button" aria-label={`${t("enlargeImage")}: ${project.title}`} className="w-full cursor-zoom-in">
                <OptimizedImage
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-auto object-contain rounded-lg shadow-md ring-1 ring-black/10"
                />
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-5xl border-0 bg-transparent p-0 shadow-none [&>button]:text-white [&>button]:opacity-90">
              <DialogTitle className="sr-only">{project.title}</DialogTitle>
              <img src={project.imageUrl} alt={project.title} className="max-h-[85vh] w-full rounded-lg object-contain" />
            </DialogContent>
          </Dialog>
        ) : project.imageUrl ? (
          <OptimizedImage src={project.imageUrl} alt={project.title} className="w-full h-auto object-contain rounded-md" />
        ) : (
          Icon && (
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/60 text-primary-foreground shadow-md">
              <Icon className="h-11 w-11" aria-hidden="true" />
            </div>
          )
        )}
      </div>
      {/* Content */}
      <div className={`w-full text-center md:text-left ${wide ? "md:w-3/5" : "md:w-5/6"}`}>
        {project.period && <p className="text-primary font-medium mb-2">{project.period}</p>}
        <h3 className="text-2xl md:text-3xl font-bold mb-4">{project.title}</h3>
        <p className="text-muted-foreground mb-6">{project.description}</p>
        <TagList tags={project.tags} className="mb-6" />
        <div className="flex flex-wrap justify-center md:justify-start gap-4">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="default" size="lg">
                GitHub <Github className="ml-2" size={18} />
              </Button>
            </a>
          )}
          {project.gitlabUrl && (
            <a href={project.gitlabUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="default" size="lg">
                GitLab <Gitlab className="ml-2" size={18} />
              </Button>
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg">
                {t("livePreview")} <ExternalLink className="ml-2" size={18} />
              </Button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const CertificateRow: React.FC<{ cert: Project }> = ({ cert }) => (
  <div className="flex flex-col md:flex-row items-center gap-8">
    <div className="w-full md:w-1/4">
      <OptimizedImage
        src={cert.imageUrl}
        alt={cert.title}
        className={`w-full h-auto object-contain rounded-md ${styles["certificate-image-shadow"]}`}
      />
    </div>
    <div className="w-full md:w-3/4 text-center md:text-left">
      <h3 className="text-2xl font-bold mb-4">{cert.title}</h3>
      <p className="text-muted-foreground">{cert.description}</p>
    </div>
  </div>
);

const SectionedProjectLayout: React.FC<SectionedProjectLayoutProps> = ({ projects, filter, sections }) => {
  const { t } = useLanguage();
  // Sections that were expanded with "See more"
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  if (projects.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-muted-foreground">{t("noProjectsFound")}</p>
      </div>
    );
  }

  const shown = sections
    .filter((section) => filter === "all" || filter === section.id)
    .map((section) => ({ ...section, items: projects.filter((p) => p.subcategory === section.id) }))
    .filter((section) => section.items.length > 0);

  return (
    <div>
      {shown.map((section, index) => {
        const isLast = index === shown.length - 1;
        const collapsible = section.variant !== "work";
        const isExpanded = !!expanded[section.id];
        const visible = collapsible && !isExpanded ? section.items.slice(0, VISIBLE_COUNT) : section.items;

        return (
          <div key={section.id} className={isLast ? "" : "mb-16"}>
            <h3 className="text-3xl font-bold text-center mb-12">{section.title}</h3>

            {section.variant === "work" && (
              <div className="mx-auto max-w-4xl space-y-6">
                {visible.map((job) => (
                  <WorkRow key={job.id} job={job} />
                ))}
              </div>
            )}

            {section.variant === "cards" && (
              <div className="space-y-12">
                {visible.map((project) => (
                  <ProjectCardRow key={project.id} project={project} />
                ))}
              </div>
            )}

            {section.variant === "certificates" && (
              <div className="space-y-12">
                {visible.map((cert) => (
                  <CertificateRow key={cert.id} cert={cert} />
                ))}
              </div>
            )}

            {collapsible && !isExpanded && section.items.length > VISIBLE_COUNT && (
              <div className="flex justify-center mt-8">
                <Magnet padding={90} magnetStrength={15}>
                  <Button onClick={() => setExpanded((prev) => ({ ...prev, [section.id]: true }))} className="filter-btn">
                    {t("seeMore")}
                  </Button>
                </Magnet>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SectionedProjectLayout;
