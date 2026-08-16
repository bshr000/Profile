import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getAllContent } from "@/lib/content";
import styles from "./page.module.css";

export default function Home() {
  const works = getAllContent("works").slice(0, 3);
  const notes = getAllContent("notes").slice(0, 2);
  const recentLife = getAllContent("life")[0];
  const currentJourney = getAllContent("journey")[0];
  const [featuredWork, ...supportingWorks] = works;

  return (
    <div className={styles.home}>
      <section className={`${styles.hero} container`} aria-labelledby="home-title">
        <div className={styles.heroMain}>
          <p className={styles.kicker}>Xuyang Zhao / Research portfolio</p>
          <h1 id="home-title">让多模态信息，成为更可靠的目标感知。</h1>
          <p className={styles.heroLead}>
            我关注多模态目标检测，探索不同模态之间的互补关系，以及它们在复杂场景中提升检测可靠性的方式。
          </p>
          <div className={styles.heroActions}>
            <Link className={styles.primaryAction} href="/works">
              查看项目 <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
            <Link className={styles.secondaryAction} href="/about">
              关于我
            </Link>
          </div>
        </div>

        <dl className={styles.profileFacts}>
          <div>
            <dt>Research</dt>
            <dd>多模态目标检测</dd>
          </div>
          <div>
            <dt>Affiliation</dt>
            <dd>中国科学院大学 / 空天信息创新研究院</dd>
          </div>
          <div>
            <dt>Based in</dt>
            <dd>北京市</dd>
          </div>
        </dl>
      </section>

      <section className={`${styles.section} container`} id="works" aria-labelledby="selected-work-title">
        <header className={styles.sectionHeader}>
          <div>
            <p className={styles.sectionKicker}>Selected work</p>
            <h2 id="selected-work-title">研究、工程与持续实验。</h2>
          </div>
          <Link className={styles.sectionLink} href="/works">
            全部项目 <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </header>

        {featuredWork ? (
          <div className={styles.workLayout}>
            <Link className={styles.featuredWork} href={`/works/${featuredWork.slug}`}>
              <div className={styles.workMeta}>
                <span>{featuredWork.category}</span>
                <span>{featuredWork.year}</span>
              </div>
              <h3>{featuredWork.title}</h3>
              <p>{featuredWork.description}</p>
              <span className={styles.inlineAction}>
                查看案例 <ArrowUpRight size={15} aria-hidden="true" />
              </span>
            </Link>

            <div className={styles.supportingWorks}>
              {supportingWorks.map((item) => (
                <Link className={styles.supportingWork} href={`/works/${item.slug}`} key={item.slug}>
                  <div className={styles.workMeta}>
                    <span>{item.category}</span>
                    <span>{item.year}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <p className={styles.emptyMessage}>项目内容正在整理中。</p>
        )}
      </section>

      <section className={styles.researchSection} aria-labelledby="research-focus-title">
        <div className={`${styles.researchInner} container`}>
          <div className={styles.researchStatement}>
            <p className={styles.sectionKicker}>Research focus</p>
            <h2 id="research-focus-title">从互补模态中提取稳定证据。</h2>
            <p>
              我的研究兴趣连接计算机视觉、图像处理与机器学习，重点关注复杂场景中的多模态感知与目标检测。
            </p>
            <Link className={styles.inlineAction} href="/about">
              了解研究背景 <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>

          <dl className={styles.researchDetails}>
            <div>
              <dt>Methods</dt>
              <dd>Computer vision<br />Image processing<br />Machine learning</dd>
            </div>
            <div>
              <dt>Background</dt>
              <dd>UCAS<br />CUGB</dd>
            </div>
            <div>
              <dt>Current question</dt>
              <dd>复杂场景中的可靠检测</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className={`${styles.section} container`} aria-labelledby="recent-notes-title">
        <header className={styles.sectionHeader}>
          <div>
            <p className={styles.sectionKicker}>Recent notes</p>
            <h2 id="recent-notes-title">记录问题，也记录理解的变化。</h2>
          </div>
          <Link className={styles.sectionLink} href="/notes">
            全部笔记 <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </header>

        <div className={styles.noteIndex}>
          {notes.map((item) => (
            <Link className={styles.noteEntry} href={`/notes/${item.slug}`} key={item.slug}>
              <div className={styles.noteMeta}>
                <span>{item.category}</span>
                <time dateTime={item.date}>{item.date}</time>
              </div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <ArrowUpRight className={styles.entryArrow} size={17} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      <section className={`${styles.archiveSection} container`} aria-labelledby="archive-title">
        <header className={styles.sectionHeader}>
          <div>
            <p className={styles.sectionKicker}>Personal archive</p>
            <h2 id="archive-title">研究之外，仍然认真生活。</h2>
          </div>
        </header>

        <div className={styles.archiveIndex}>
          <Link className={styles.archiveEntry} href="/life">
            <span>Life</span>
            <div>
              <h3>{recentLife?.title ?? "旅行、摄影与日常片段"}</h3>
              <p>{recentLife?.description ?? "保存那些值得回看的地方与时刻。"}</p>
            </div>
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
          <Link className={styles.archiveEntry} href="/journey">
            <span>Journey</span>
            <div>
              <h3>{currentJourney?.title ?? "学习与成长的长期记录"}</h3>
              <p>{currentJourney?.description ?? "记录阶段、选择与逐渐形成的方法。"}</p>
            </div>
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
