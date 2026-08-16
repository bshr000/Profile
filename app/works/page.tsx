import type { Metadata } from "next";
import { getAllContent } from "@/lib/content";
import { EmptyState, PageIntro, ProjectCard } from "@/components/ui";
export const metadata: Metadata = { title: "Works", description: "Research, engineering, experiments, and selected projects." };
export default function WorksPage() { const items = getAllContent("works"); const categories = ["All", ...new Set(items.map((i) => i.category ?? "Other"))]; return <><PageIntro index="01" title="Works">科研、工程与创作实验的长期归档。这里的结构已经准备好，内容会随项目逐步生长。</PageIntro><section className="container archive-section"><div className="filter-bar">{categories.map((x, i) => <button className={i === 0 ? "active" : ""} key={x}>{x}</button>)}</div>{items.length ? <div className="project-grid">{items.map((item, i) => <ProjectCard key={item.slug} item={item} index={i + 1} />)}</div> : <EmptyState label="More projects coming soon." />}</section></>; }
