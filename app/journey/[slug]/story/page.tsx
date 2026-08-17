import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import {
  getJourneyEntry,
  getJourneyGallery,
  getJourneyReadingTime,
  getJourneySlugs,
  getJourneyStory,
} from "@/lib/journey";
import { StoryBody } from "@/components/journey/StoryBody";
import styles from "./page.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return getJourneySlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getJourneyEntry(slug);
  const story = getJourneyStory(slug);

  if (!item || !story) return {};

  return {
    title: story.title ?? item.title,
    description: story.description ?? item.description,
    alternates: { canonical: `/journey/${slug}/story` },
  };
}

export default async function JourneyStoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getJourneyEntry(slug);
  const story = getJourneyStory(slug);

  if (!item || !story) notFound();

  const gallery = getJourneyGallery(slug);
  const date = item.date ?? item.year ?? "";

  return (
    <div className={`container ${styles.page}`}>
      <nav className={styles.pageNav} aria-label="Journey pages">
        <Link href="/journey" className={styles.backLink}>
          <ArrowLeft size={15} aria-hidden="true" />
          Journey
        </Link>
        {gallery && (
          <Link href={`/journey/${slug}/gallery`} className={styles.relatedLink}>
            View album
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        )}
      </nav>

      <header className={styles.header}>
        <div className={styles.meta}>
          {date && <time dateTime={item.sortDate}>{date}</time>}
          {item.location && <span>{item.location}</span>}
          <span>{getJourneyReadingTime(story.body)}</span>
        </div>
        <h1>{story.title ?? item.title}</h1>
        {(story.description ?? item.description) && (
          <p>{story.description ?? item.description}</p>
        )}
      </header>

      <article className={styles.storyBody}>
        <StoryBody source={story.body} />
      </article>
    </div>
  );
}
