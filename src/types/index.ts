export interface Project {
  id: number;
  title: string;
  category: string;
  subcategory: string;
  description: string;
  imageUrl: string;
  /** Name of an icon (see SectionedProjectLayout) shown on a card that has no `imageUrl` yet */
  icon?: string;
  /** Backdrop for a logo shown as `imageUrl`: "dark" for light-colored logos, otherwise white */
  imageTone?: "light" | "dark";
  /** "wide" for landscape pictures such as diagrams: a bigger picture column that opens full size on click */
  imageLayout?: "wide";
  /** Free-form time span shown on work-style entries, e.g. "2025 – Present" */
  period?: string;
  tags?: string[];
  githubUrl?: string;
  gitlabUrl?: string;
  liveUrl?: string;
  certificateUrl?: string;
  facebookUrl?: string;
  linkedinUrl?: string;
  modal?: {
    content: string;
    images?: string[];
  };
} 