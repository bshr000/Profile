import type { Metadata } from "next";
import { getAllContent } from "@/lib/content";
import { EmptyState, PageIntro, Tag } from "@/components/ui";
export const metadata: Metadata = { title: "Journey", description: "A timeline of stages, changes, and things learned along the way." };
export default function JourneyPage() { const items = getAllContent("journey"); return <><PageIntro index="04" title="Journey">不是一份简历，而是一条可以慢慢补全的人生故事线。此处仅保留结构化占位节点。</PageIntro><section className="container archive-section">{items.length ? <div className="timeline">{items.map((item) => <article key={item.slug}><time>{item.year}</time><div className="timeline-dot" /><div className="timeline-content"><span>{item.location}</span><h2>{item.title}</h2><p>{item.description}</p><div className="tag-row">{item.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}</div></div></article>)}</div> : <EmptyState label="The story is still unfolding." />}</section></>; }
