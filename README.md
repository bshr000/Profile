# Personal Digital Garden

A restrained, content-first personal website built with Next.js, TypeScript, Tailwind CSS, and MDX. It is designed for GitHub Pages static export and long-term growth.

## Content workflow

Add or duplicate an `.mdx` file in one of these folders:

- `content/works/`
- `content/notes/`
- `content/life/`
- `content/journey/`

Lists, detail routes, metadata, sitemap entries, filters, and home-page previews are generated from frontmatter. You do not need to edit React pages when publishing new content.

## Local development

```bash
npm install
npm run dev
```

## Static build

```bash
npm run build
```

The exported site is written to `out/`.

## GitHub Pages

Push the repository to GitHub, keep the default branch named `main`, and choose **GitHub Actions** under repository Settings → Pages → Build and deployment. The included workflow detects repository sites and applies the correct base path.

Before publishing, update `lib/site.ts`, the navigation mark in `components/Navbar.tsx`, footer links, favicon, and placeholder content.
