import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getAllContent } from "@/lib/content";
import { withBasePath } from "@/lib/site";
import type { BaseContent } from "@/types/content";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Life",
  description: "收藏那些塑造我的事物。关于山、摄影、行走、地方与家人的私人主题馆。",
  alternates: { canonical: "/life" },
};

type LifeCollection = BaseContent & { cover: string };

export default function LifePage() {
  const collections = getAllContent("life").filter(
    (item): item is LifeCollection => Boolean(item.cover),
  );

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <h1>Life</h1>
          <p className={styles.statement}>收藏那些塑造我的事物。</p>
          <p className={styles.english}>
            Things I love.<br />
            Places I remember.<br />
            Moments I keep.
          </p>
        </div>
      </header>

      <section
        className={`container ${styles.collections}`}
        aria-labelledby="life-collections-title"
      >
        <div className={styles.collectionsHeader}>
          <h2 id="life-collections-title">Collections</h2>
          <p>五个持续生长的主题馆</p>
        </div>

        {collections.length ? (
          <div className={styles.collectionGrid}>
            {collections.map((item, index) => (
              <article
                className={`${styles.collection} ${
                  index === 0 ? styles.featured : ""
                }`}
                key={item.slug}
              >
                <Link
                  href={`/life/${item.slug}`}
                  className={styles.collectionLink}
                  aria-label={`进入 ${item.title} 主题馆`}
                >
                  <div className={styles.cover}>
                    <Image
                      src={withBasePath(item.cover)}
                      alt={item.coverAlt ?? `${item.title} 主题馆封面`}
                      fill
                      priority={index === 0}
                      sizes={
                        index === 0
                          ? "(max-width: 768px) calc(100vw - 40px), 80rem"
                          : "(max-width: 768px) calc(100vw - 40px), 39rem"
                      }
                    />
                  </div>

                  <div className={styles.collectionInfo}>
                    <span className={styles.collectionIndex}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className={styles.collectionCopy}>
                      <div className={styles.titleRow}>
                        <h3>{item.title}</h3>
                        <ArrowUpRight size={20} aria-hidden="true" />
                      </div>
                      {item.subtitle && (
                        <p className={styles.subtitle}>{item.subtitle}</p>
                      )}
                      <p className={styles.description}>{item.description}</p>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <p className={styles.empty}>主题馆正在整理中。</p>
        )}
      </section>
    </div>
  );
}
