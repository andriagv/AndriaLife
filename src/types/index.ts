export interface Project {
  id: number;
  title: string;
  category: string;
  subcategory: string;
  description: string;
  imageUrl: string;
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