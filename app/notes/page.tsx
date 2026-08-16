import type { Metadata } from "next";
import { Search } from "lucide-react";
import { getAllContent } from "@/lib/content";
import { EmptyState, NoteCard, PageIntro } from "@/components/ui";
export const metadata: Metadata = { title: "Notes", description: "A growing collection of learning notes and observations." };
export default function NotesPage() { const items = getAllContent("notes"); return <><PageIntro index="02" title="Notes">学习、阅读与研究过程中留下的可连接知识。新增一篇笔记，只需要增加一个 MDX 文件。</PageIntro><section className="container archive-section"><div className="search-shell"><Search size={17} /><input aria-label="搜索笔记" placeholder="Search notes, tags, or categories…" /><span>⌘ K</span></div><div className="filter-bar">{["All", "AI", "Computer Vision", "Engineering", "Reading", "Other"].map((x, i) => <button className={i === 0 ? "active" : ""} key={x}>{x}</button>)}</div>{items.length ? <div className="notes-grid">{items.map((item) => <NoteCard key={item.slug} item={item} />)}</div> : <EmptyState label="Notes will grow here." />}</section></>; }
