import type { MetadataRoute } from "next";
import { getAllContent } from "@/lib/content";
import { siteConfig } from "@/lib/site";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap { const base = siteConfig.url; const staticRoutes = ["", "/works", "/notes", "/life", "/journey", "/about"]; const dynamic = (["works", "notes", "life"] as const).flatMap((kind) => getAllContent(kind).map((i) => ({ url: `${base}/${kind}/${i.slug}`, lastModified: i.updated ?? i.date ?? new Date().toISOString() }))); return [...staticRoutes.map((route) => ({ url: `${base}${route}`, lastModified: new Date() })), ...dynamic]; }
