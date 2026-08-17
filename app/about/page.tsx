import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { ArrowDownToLine } from "lucide-react";
import { withBasePath } from "@/lib/site";
import styles from "./page.module.css";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description: "Xuyang Zhao 的个人介绍、研究方向、教育经历与联系方式。",
};

const resumeHref = withBasePath("/resume/xuyang-zhao-resume.pdf");
const resumeExists = fs.existsSync(
  path.join(process.cwd(), "public", "resume", "xuyang-zhao-resume.pdf"),
);

const profileMetadata = [
  { label: "Research", value: "多模态目标检测" },
  { label: "Based in", value: "北京市" },
];

const education = [
  {
    school: "中国科学院大学",
    schoolEn: "University of Chinese Academy of Sciences",
    degree: "硕士",
    degreeEn: "Master",
    department: "电子电气与通信工程学院 / 空天信息创新研究院",
    courses: [
      "计算机视觉",
      "图像处理",
      "模式识别与机器学习",
      "深度学习",
      "遥感影像处理",
      "光纤通信新技术",
    ],
  },
  {
    school: "中国地质大学（北京）",
    schoolEn: "China University of Geosciences, Beijing",
    degree: "本科",
    degreeEn: "Bachelor",
    department: "地球物理与信息技术学院",
    courses: [
      "重力勘探",
      "电法勘探",
      "磁法勘探",
      "地震勘探",
      "核物理勘探",
      "MATLAB 应用",
      "数字信号处理",
      "C 语言程序设计",
      "线性代数",
      "电子电工技术",
    ],
  },
];

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <section
        className={`container ${styles.hero}`}
        aria-labelledby="about-title"
      >
        <div className={styles.heroGrid}>
          <header className={styles.identity}>
            <span className={styles.kicker}>About</span>
            <h1 id="about-title">Xuyang Zhao</h1>
            <p>多模态目标检测研究者</p>
          </header>

          <div className={styles.portrait}>
            <Image
              src={withBasePath("/images/xuyang-zhao.webp")}
              alt="Xuyang Zhao"
              fill
              priority
              sizes="(max-width: 768px) calc(100vw - 40px), (max-width: 1024px) 42vw, 32vw"
              className={styles.portraitImage}
            />
          </div>
        </div>

        <div className={styles.profileGrid}>
          <div className={styles.philosophy}>
            <span className={styles.profileLabel}>Personal principle</span>
            <blockquote>
              Life is <em>True.</em>
            </blockquote>
            <p>
              我关注多模态目标检测，研究不同模态如何在复杂场景中共同提升目标感知的可靠性。
            </p>
          </div>

          <div className={styles.metadata}>
            <h2>Profile Metadata</h2>
            <dl>
              {profileMetadata.map((item) => (
                <div key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
              <div>
                <dt>Email</dt>
                <dd>
                  <a href="mailto:18369588966@163.com">18369588966@163.com</a>
                </dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd>
                  <a href="tel:+8618369588966">183 6958 8966</a>
                </dd>
              </div>
              <div>
                <dt>Resume</dt>
                <dd>
                  {resumeExists ? (
                    <a className={styles.resumeLink} href={resumeHref} download>
                      Download PDF
                      <ArrowDownToLine size={14} aria-hidden="true" />
                    </a>
                  ) : (
                    <span className={styles.unavailable}>PDF 待上传</span>
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className={styles.education} aria-labelledby="education-title">
        <div className="container">
          <header className={styles.sectionHeading}>
            <h2 id="education-title">Education</h2>
            <p>教育经历与核心课程</p>
          </header>

          <div className={styles.educationList}>
            {education.map((item) => (
              <article className={styles.educationEntry} key={item.school}>
                <div className={styles.degree}>
                  <span>{item.degreeEn}</span>
                  <small>{item.degree}</small>
                </div>
                <div className={styles.educationContent}>
                  <header>
                    <div>
                      <h3>{item.school}</h3>
                      <p>{item.schoolEn}</p>
                    </div>
                  </header>
                  <p className={styles.program}>{item.department}</p>
                  <div className={styles.courses}>
                    <span>主要课程</span>
                    <p>{item.courses.join("、")}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
