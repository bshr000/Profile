import type { MetadataRoute } from "next";
import { getAllContent } from "@/lib/content";
import { getJourneyGallery, getJourneyStory } from "@/lib/journey";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const generatedAt = new Date();
  const staticRoutes = ["", "/works", "/notes", "/life", "/journey", "/about"];
  const contentRoutes = (["works", "notes", "life"] as const).flatMap((kind) =>
    getAllContent(kind).map((item) => ({
      url: `${base}/${kind}/${item.slug}`,
      lastModified: item.updated ?? item.date ?? generatedAt,
    })),
  );
  const journeyRoutes = getAllContent("journey").flatMap((item) => {
    const lastModified = item.updated ?? item.date ?? generatedAt;

    return [
      ...(getJourneyGallery(item.slug)
        ? [{ url: `${base}/journey/${item.slug}/gallery`, lastModified }]
        : []),
      ...(getJourneyStory(item.slug)
        ? [{ url: `${base}/journey/${item.slug}/story`, lastModified }]
        : []),
    ];
  });

  return [
    ...staticRoutes.map((route) => ({
      url: `${base}${route}`,
      lastModified: generatedAt,
    })),
    ...contentRoutes,
    ...journeyRoutes,
  ];
}
