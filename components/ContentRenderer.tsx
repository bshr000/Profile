import { MDXRemote } from "next-mdx-remote/rsc";

export function ContentRenderer({ source }: { source: string }) {
  return <article className="prose"><MDXRemote source={source} /></article>;
}
