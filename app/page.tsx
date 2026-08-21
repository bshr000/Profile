import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getAllContent } from "@/lib/content";
import { FluidBackground } from "@/components/FluidBackground";
import styles from "./page.module.css";
import Image from "next/image";

export default function Home() {
  const works = getAllContent("works").slice(0, 3);
  const notes = getAllContent("notes").slice(0, 2);
  const recentLife = getAllContent("life")[0];
  const currentJourney = getAllContent("journey")[0];
  const [featuredWork, ...supportingWorks] = works;

  return (
    <div className={styles.home}>
      <FluidBackground />
      <section className={`${styles.hero} container`}>
        <div className={styles.avatarBox}>
          <div className={styles.avatarWrapper}>
            <Image
              src="/images/avatar.png"
              alt="avatar"
              fill
              priority
              className={styles.avatarImage}
            />
          </div>
        </div>

        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            {" "}
            Hello, I am <span>Xuyang</span>{" "}
          </h1>
          <h2 className={styles.heroSubtitle}>拾荒大青年</h2>
          <p className={styles.heroQuote}>克己、慎独、守心、明性。</p>
          <p className={styles.heroQuote}>路漫漫其修远兮，吾将上下而求索。</p>
        </div>
      </section>

      <section className={`${styles.worksection} container`}>
        <header className={styles.sectionHeader}>
          <div>
            <p className={styles.sectionKicker}>Selected project</p>
            <h2>Works</h2>
          </div>

          <Link className={styles.sectionLink} href="/works">
            全部项目
            <ArrowUpRight size={15} />
          </Link>
        </header>

        {featuredWork && (
          <div className={styles.workLayout}>
            <Link
              className={styles.featuredWork}
              href={`/works/${featuredWork.slug}`}
            >
              <h3>{featuredWork.title}</h3>
              <p>{featuredWork.description}</p>
            </Link>

            <div className={styles.supportingWorks}>
              {supportingWorks.map((item) => (
                <Link
                  key={item.slug}
                  className={styles.supportingWork}
                  href={`/works/${item.slug}`}
                >
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className={`${styles.notesection} container`}>
        <header className={styles.sectionHeader}>
          <div>
            <p className={styles.sectionKicker}>Recent notes</p>
            <h2>Notes</h2>
          </div>

          <Link href="/notes">全部笔记</Link>
        </header>

        <div className={styles.noteIndex}>
          {notes.map((item) => (
            <Link
              key={item.slug}
              href={`/notes/${item.slug}`}
              className={styles.noteEntry}
            >
              <h3>{item.title}</h3>

              <p>{item.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className={`${styles.lifeSection} container`}>
        <header className={styles.sectionHeader}>
          <h2>Life</h2>
        </header>

        <div className={styles.archiveIndex}>
          <Link href="/life" className={styles.archiveEntry}>
            <h3>{recentLife?.title ?? "Life"}</h3>
          </Link>

          <Link href="/journey" className={styles.archiveEntry}>
            <h3>{currentJourney?.title ?? "Journey"}</h3>
          </Link>
        </div>
      </section>

      <section className={`${styles.journeySection} container`}>
        <header className={styles.sectionHeader}>
          <h2>Journey</h2>
        </header>

        <div className={styles.archiveIndex}>
          <Link href="/life" className={styles.archiveEntry}>
            <h3>{recentLife?.title ?? "Life"}</h3>
          </Link>

          <Link href="/journey" className={styles.archiveEntry}>
            <h3>{currentJourney?.title ?? "Journey"}</h3>
          </Link>
        </div>
      </section>
    </div>
  );
}
