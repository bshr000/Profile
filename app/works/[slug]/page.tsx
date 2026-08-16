import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { getAllContent, getContent } from "@/lib/content";
import { ContentRenderer } from "@/components/ContentRenderer";
import { Tag } from "@/components/ui";
export function generateStaticParams() { return getAllContent("works").map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const item = getContent("works", (await params).slug); return { title: item?.title, description: item?.description, alternates: { canonical: `/works/${item?.slug}` } }; }
export default async function WorkDetail({ params }: { params: Promise<{ slug: string }> }) { const item = getContent("works", (await params).slug); if (!item) notFound(); return <div className="container detail-page"><Link href="/works" className="back"><ArrowLeft size={15} /> Back to works</Link><header><span className="eyebrow">{item.category} · {item.year}</span><h1>{item.title}</h1><p>{item.description}</p><div className="tag-row">{item.tags.map((t) => <Tag key={t}>{t}</Tag>)}</div><div className="detail-links">{item.github && <a href={item.github}>GitHub <ArrowUpRight size={14} /></a>}{item.paper && <a href={item.paper}>Paper <ArrowUpRight size={14} /></a>}{item.demo && <a href={item.demo}>Demo <ArrowUpRight size={14} /></a>}</div></header><div className="detail-cover cover cover-1"><span>PROJECT / PLACEHOLDER</span><div className="cover-shape" /></div><ContentRenderer source={item.body} /></div>; }
