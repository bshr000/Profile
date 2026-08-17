export type ContentKind = "works" | "notes" | "life" | "journey";

export type JourneyGalleryLayout = "wide" | "left" | "right" | "offset";

export interface JourneyGalleryImage {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  layout?: JourneyGalleryLayout;
}

export interface JourneyGallerySection {
  title?: string;
  images: JourneyGalleryImage[];
}

export interface JourneyGallery {
  slug: string;
  sections: JourneyGallerySection[];
  images: JourneyGalleryImage[];
}

export interface JourneyStory {
  slug: string;
  title?: string;
  description?: string;
  body: string;
}

export interface BaseContent {
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  date?: string;
  sortDate?: string;
  updated?: string;
  year?: string;
  category?: string;
  tags: string[];
  cover?: string;
  coverAlt?: string;
  draft?: boolean;
  featured?: boolean;
  location?: string;
  photos?: string[];
  images?: string[];
  previewImages?: string[];
  order?: number | string;
  github?: string;
  paper?: string;
  demo?: string;
  relatedProjects?: string[];
  body: string;
}
