import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { ArrowDownToLine, ArrowUpRight } from "lucide-react";
import { PageIntro, SectionHeader } from "@/components/ui";
import { withBasePath } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "Xuyang Zhao 的个人介绍、研究方向、教育经历与联系方式。",
};

const resumeHref = withBasePath("/resume/xuyang-zhao-resume.pdf");
const resumeExists = fs.existsSync(
  path.join(process.cwd(), "public", "resume", "xuyang-zhao-resume.pdf"),
);

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
    <>
      <PageIntro index="05" title="About">
        赵旭阳 · Xuyang Zhao
      </PageIntro>

      <section
        className="container about-editorial"
        aria-labelledby="profile-title"
      >
        <div className="about-statement">
          <span>01 / Profile</span>
          <blockquote>
            Life is <em>True.</em>
          </blockquote>
        </div>

        <div className="about-profile-grid">
          <div className="about-bio">
            <span className="eyebrow">Xuyang Zhao</span>
            <h2 id="profile-title">在多模态信息中，寻找更可靠的目标感知。</h2>
            <p>
              我目前主要关注多模态目标检测，探索不同模态之间的互补关系，以及它们在复杂场景中提升目标检测能力的方式。
            </p>
            <div className="about-contact-links" aria-label="联系方式与简历">
              <a href="mailto:18369588966@163.com">
                Email <ArrowUpRight size={14} aria-hidden="true" />
              </a>
              <a href="tel:+8618369588966">
                Phone <ArrowUpRight size={14} aria-hidden="true" />
              </a>
              {resumeExists ? (
                <a href={resumeHref} download>
                  Résumé <ArrowDownToLine size={14} aria-hidden="true" />
                </a>
              ) : (
                <span title="将 PDF 上传至 public/resume/xuyang-zhao-resume.pdf">
                  Résumé · 待上传
                </span>
              )}
            </div>
          </div>

          <dl className="about-meta">
            <div>
              <dt>Research</dt>
              <dd>多模态目标检测</dd>
            </div>
            <div>
              <dt>Based in</dt>
              <dd>北京市</dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>
                <a href="tel:+8618369588966">183 6958 8966</a>
              </dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>
                <a href="mailto:18369588966@163.com">18369588966@163.com</a>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section
        className="about-education ruled-section"
        aria-labelledby="education-title"
      >
        <div className="container">
          <SectionHeader eyebrow="02 / Background" title="Education" />

          <div className="education-list">
            {education.map((item, index) => (
              <article className="education-entry" key={item.school}>
                <div className="education-index">
                  <span>0{index + 1}</span>
                  <small>{item.degreeEn}</small>
                </div>
                <div className="education-content">
                  <header>
                    <div>
                      <h3>{item.school}</h3>
                      <p>{item.schoolEn}</p>
                    </div>
                    <span>{item.degree}</span>
                  </header>
                  <p className="education-program">{item.department}</p>
                  <div className="education-course-line">
                    <span>主要课程</span>
                    <p>{item.courses.join("、")}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
