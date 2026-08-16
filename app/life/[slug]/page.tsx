import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin } from "lucide-react";
import Link from "next/link";
import { getAllContent, getContent } from "@/lib/content";
import { ContentRenderer } from "@/components/ContentRenderer";
export function generateStaticParams() { return getAllContent("life").map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const item = getContent("life", (await params).slug); return { title: item?.title, description: item?.description, alternates: { canonical: `/life/${item?.slug}` } }; }
export default async function LifeDetail({ params }: { params: Promise<{ slug: string }> }) { const item = getContent("life", (await params).slug); if (!item) notFound(); return <div className="container detail-page"><Link href="/life" className="back"><ArrowLeft size={15} /> Back to life</Link><header><span className="eyebrow"><MapPin size={13} /> {item.location} · {item.date}</span><h1>{item.title}</h1><p>{item.description}</p></header><div className="life-detail-hero"><div className="sun-orb" /><span>PHOTO / PLACEHOLDER</span></div><ContentRenderer source={item.body} /><div className="photo-grid"><div /><div /><div /></div></div>; }
