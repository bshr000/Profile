Journey content guide

Each Journey memory can have three independent parts:

1. Memory: required. The short entry shown on the main timeline.
2. Gallery: optional. A complete editorial photo album.
3. Story: optional. A longer MDX article.

The three files use the same slug. For example, 2025-hongkong connects:

content/journey/2025-hongkong.mdx
content/journey/galleries/2025-hongkong.json
content/journey/stories/2025-hongkong.mdx


1. Create the timeline memory

Create one MDX file directly inside content/journey. The filename becomes the entry slug.

Example frontmatter:

---
date: "2025.06"
sortDate: "2025-06-01"
year: "2025"
location: Hong Kong
title: A summer going south.
description: A short fallback summary.
previewImages:
  - /images/journey/2025-hongkong/01.jpg
  - /images/journey/2025-hongkong/02.jpg
tags: [Memory]
---

Write the short memory below the frontmatter. Keep it to roughly two to five lines.

previewImages is a manually selected timeline preview. Add at most six photographs and arrange them in the intended viewing order. If more than six are listed, only the first six appear on the timeline.

The older images, photos, and cover fields remain supported as a fallback, but new memories should use previewImages.

Journey entries always appear from newest to oldest. Use date for the text shown on the page; it may be written freely, such as "SUMMER 2025". Use sortDate only for sorting and write it as an ISO date: YYYY-MM-DD.

If sortDate is omitted, the loader tries date and then year. An entry with no sortable date is placed last and reported in the development log. Filenames, file creation order, image directories, and the order field do not control sorting.


2. Add a Gallery when needed

Create content/journey/galleries/SLUG.json only when the memory needs a full album. The Album link and photo count appear automatically.

Simple example:

{
  "images": [
    "/images/journey/2025-hongkong/01.jpg",
    {
      "src": "/images/journey/2025-hongkong/02.jpg",
      "alt": "Harbour at dusk",
      "width": 1600,
      "height": 1067,
      "layout": "wide"
    }
  ]
}

Grouped example:

{
  "sections": [
    {
      "title": "Arrival",
      "images": [
        "/images/journey/2025-hongkong/01.jpg",
        "/images/journey/2025-hongkong/02.jpg"
      ]
    },
    {
      "title": "After dark",
      "images": [
        "/images/journey/2025-hongkong/03.jpg"
      ]
    }
  ]
}

An image may be a path string or an object. width, height, alt, and layout are optional. Supported layout values are wide, left, right, and offset. Supplying the real width and height is recommended because it reserves the correct space before an image loads.

Do not write the album count manually. It is calculated from the JSON file.


3. Add a Story when needed

Create content/journey/stories/SLUG.mdx only when the memory needs a longer article. The Story link and reading time appear automatically.

Example:

---
title: Notes from Hong Kong
description: Optional description used in page metadata.
---

Long-form text can be written here with normal MDX headings, paragraphs, lists, links, and quotations.

For an inline story photograph, use:

<StoryImage
  src="/images/journey/2025-hongkong/04.jpg"
  alt="A street after rain"
  width={1600}
  height={1067}
/>

Do not write the reading time manually. It is calculated from the Story body.


4. Store the photographs

Keep each memory's files in its own directory:

public/images/journey/2025-hongkong/01.jpg
public/images/journey/2025-hongkong/02.jpg
public/images/journey/2025-hongkong/03.jpg


Recommended workflow

1. Add the timeline memory MDX file.
2. Add its photographs under public/images/journey.
3. Select up to six previewImages for the main timeline.
4. Add a matching Gallery JSON file if a full album is needed.
5. Add a matching Story MDX file if a long article is needed.
6. Run the project build before publishing.
