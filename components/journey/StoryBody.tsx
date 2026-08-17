import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { resolveJourneyImage } from "@/lib/journey";
import styles from "./StoryBody.module.css";

interface StoryImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  variant?: "auto" | "body" | "wide" | "portrait";
  caption?: string;
}

function StoryImage({
  src,
  alt,
  width = 1600,
  height = 1067,
  variant = "auto",
  caption,
}: StoryImageProps) {
  const resolvedVariant =
    variant === "auto" ? (height > width ? "portrait" : "body") : variant;
  const variantClassName = {
    body: styles.body,
    wide: styles.wide,
    portrait: styles.portrait,
  }[resolvedVariant];
  const sizes = {
    body: "(max-width: 768px) calc(100vw - 40px), 45rem",
    wide: "(max-width: 768px) calc(100vw - 40px), 60rem",
    portrait: "(max-width: 768px) calc(100vw - 40px), 30rem",
  }[resolvedVariant];

  return (
    <figure className={`${styles.figure} ${variantClassName}`}>
      <div className={styles.frame}>
        <Image
          src={resolveJourneyImage(src)}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
        />
      </div>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}

export function StoryBody({ source }: { source: string }) {
  return <MDXRemote source={source} components={{ StoryImage }} />;
}
