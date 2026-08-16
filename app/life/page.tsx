import type { Metadata } from "next";
import { getAllContent } from "@/lib/content";
import { EmptyState, LifeCard, PageIntro } from "@/components/ui";
import { Callout } from "@/components/Callout";
export const metadata: Metadata = {
  title: "Life",
  description: "A visual archive of places, photographs, and everyday moments.",
};
export default function LifePage() {
  const items = getAllContent("life");
  return (
    <>
      <PageIntro index="03" title="Life">
        旅行、摄影、城市与日常片段。一个更视觉化、也更松弛的数字生活相册。
      </PageIntro>

      <section className="container archive-section">
        {items.length ? (
          <div className="masonry">
            {items.map((item, i) => (
              <LifeCard key={item.slug} item={item} index={(i % 3) + 1} />
            ))}
          </div>
        ) : (
          <EmptyState label="More moments coming soon." />
        )}
      </section>
    </>
  );
}
