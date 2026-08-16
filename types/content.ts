export type ContentKind = "works" | "notes" | "life" | "journey";

export interface BaseContent {
  slug: string;
  title: string;
  description: string;
  date?: string;
  updated?: string;
  year?: string;
  category?: string;
  tags: string[];
  cover?: string;
  draft?: boolean;
  featured?: boolean;
  location?: string;
  photos?: string[];
  github?: string;
  paper?: string;
  demo?: string;
  relatedProjects?: string[];
  body: string;
}
