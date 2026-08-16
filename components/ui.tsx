import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { BaseContent } from "@/types/content";

export function Tag({ children }: { children: React.ReactNode }) { return <span className="tag">{children}</span>; }
export function SectionHeader({ eyebrow, title, href }: { eyebrow: string; title: string; href?: string }) { return <div className="section-header"><div><span>{eyebrow}</span><h2>{title}</h2></div>{href && <Link href={href}>View all <ArrowUpRight size={15} /></Link>}</div>; }
export function EmptyState({ label = "Still building." }: { label?: string }) { return <div className="empty-state"><span>✦</span><p>{label}</p><small>New entries will appear here as the archive grows.</small></div>; }
export function PageIntro({ index, title, children }: { index: string; title: string; children: React.ReactNode }) { return <section className="page-intro container"><span className="eyebrow">{index} / Archive</span><h1>{title}</h1><p>{children}</p></section>; }

export function ProjectCard({ item, index = 1 }: { item: BaseContent; index?: number }) { return <Link href={`/works/${item.slug}`} className="project-card"><div className={`cover cover-${index}`}><span>{String(index).padStart(2, "0")}</span><div className="cover-shape" /></div><div className="card-body"><div className="card-meta"><span>{item.category}</span><span>{item.year}</span></div><h3>{item.title}</h3><p>{item.description}</p><div className="tag-row">{item.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}</div></div></Link>; }
export function NoteCard({ item }: { item: BaseContent }) { return <Link href={`/notes/${item.slug}`} className="note-card"><div className="card-meta"><span>{item.category}</span><time>{item.date}</time></div><h3>{item.title}</h3><p>{item.description}</p><div className="tag-row">{item.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}</div></Link>; }
export function LifeCard({ item, index = 1 }: { item: BaseContent; index?: number }) { return <Link href={`/life/${item.slug}`} className={`life-card life-${index}`}><div className="life-visual"><div className="sun-orb" /></div><div className="life-overlay"><span>{item.location} · {item.date}</span><h3>{item.title}</h3><p>{item.description}</p></div></Link>; }
