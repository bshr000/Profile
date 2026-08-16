# Portfolio Design System

Status: design specification only. This document does not authorize code changes.

## 1. Design read

This is a research-oriented personal portfolio for recruiters, academic peers, and potential collaborators. The visual language should feel precise, calm, technical, and editorial. It should combine the clarity of OpenAI Research, the visual storytelling of Google DeepMind Research, and the product discipline of Linear and Vercel.

The site is not a decorative personal diary. It is a structured record of research, projects, writing, and professional development.

### Design dials

| Dial | Value | Meaning |
| --- | ---: | --- |
| Design variance | 5 / 10 | Ordered layouts with occasional asymmetry |
| Motion intensity | 3 / 10 | Mostly static, with quiet interaction feedback |
| Visual density | 4 / 10 | Scannable and information-rich without feeling crowded |

### Core principles

1. Research comes first.
2. Typography carries the hierarchy.
3. Real work replaces decorative graphics.
4. Every element aligns to a grid or text baseline.
5. Color is used for meaning, not atmosphere.
6. Motion provides feedback, not spectacle.
7. Light and dark themes must communicate the same hierarchy.

## 2. Current project audit

### Technical foundation

- Next.js App Router with TypeScript.
- Static export for GitHub Pages.
- Tailwind CSS v4 is available, but most styling lives in one global CSS file.
- MDX content drives Works, Notes, Life, and Journey.
- Shared components include navigation, footer, page introductions, content cards, tags, and MDX rendering.
- Theme preference is stored locally and applied through semantic CSS variables.

### Information architecture today

- Home
- Works
- Notes
- Life
- Journey
- About

### What should be preserved

- The static, content-first architecture.
- MDX as the publishing workflow.
- Stable route slugs and detail pages.
- The max-width container concept.
- The light and dark theme token approach.
- The clear separation between projects, notes, personal records, and biography.
- Existing semantic HTML and metadata where they are already correct.

### What should be retired or redesigned

- Warm cream and brick-red styling as the dominant identity. It reads as a generic digital garden rather than a contemporary research portfolio.
- Serif type for nearly every headline and long-form block. It weakens the technical character and creates uneven Chinese and Latin typography.
- Numbered eyebrows such as `01 / Selected` and `05 / Archive`. They repeat too often and feel templated.
- The homepage scroll instruction. Scrolling is already understood.
- Fake project covers made from CSS circles and rectangles.
- Placeholder gradients used instead of real project figures, diagrams, screenshots, or photographs.
- Three equal project cards as the default featured-work layout.
- Excessive tags. Tags should help filtering, not fill empty space.
- Search and filter controls that appear interactive before their behavior exists.
- Mixed component treatments: bordered project cards, line-only notes, photographic life cards, and timeline nodes currently feel like separate design systems.
- Heavy reliance on Lucide icons. Use fewer icons overall, then standardize one precise family if the icon system is changed later.
- A single global stylesheet containing unrelated page and component rules. Future implementation should split tokens, primitives, shared components, and page-level styles.

### Current design reading

| Dial | Current estimate | Main issue |
| --- | ---: | --- |
| Design variance | 6 / 10 | Several layout styles exist, but they do not share one visual logic |
| Motion intensity | 2 / 10 | Basic hover movement only |
| Visual density | 5 / 10 | Repeated metadata and tags create noise without adding meaning |

## 3. Reference interpretation

The references are inspiration, not templates to copy.

### Google DeepMind Research

Borrow:

- Clear separation between breakthroughs, news, publications, and broader research themes.
- Strong visual assets that make abstract research understandable.
- Modular layouts that allow different research outputs to have different visual weight.

Avoid:

- The volume of corporate navigation and product promotion.
- Using many bright colors without a personal brand reason.

### OpenAI Research

Borrow:

- A mission-led opening with direct language.
- Strong black-and-white hierarchy.
- Research areas presented before the full index.
- Article metadata that supports scanning without competing with titles.

Avoid:

- Reproducing a corporate newsroom structure for a one-person portfolio.

### Linear

Borrow:

- Calm density and consistent alignment.
- Real interface imagery rather than abstract placeholders.
- Restrained color with high-contrast focal points.
- Clear hierarchy between active, secondary, and muted information.
- Concise labels and predictable component behavior.

Avoid:

- Product-dashboard density on editorial or biography pages.
- Decorative product mockups unrelated to real work.

### Vercel

Borrow:

- Geist-led typography and precise spacing.
- Deliberate optical alignment.
- Strong focus, hover, and active states.
- Compact, action-oriented copy.
- Performance and accessibility as part of the design system.

Avoid:

- Copying the black-and-white brand so closely that the portfolio loses its own identity.

Reference links:

- [Google DeepMind Research](https://deepmind.google/research/)
- [OpenAI Research](https://openai.com/research/)
- [Linear](https://linear.app/homepage)
- [Vercel Web Interface Guidelines](https://vercel.com/design/guidelines)

## 4. Typography

### Font system

Use one modern sans-serif family as the primary voice. Avoid a serif-led interface.

| Role | Preferred font | Fallback |
| --- | --- | --- |
| Latin display and UI | Geist Sans | system-ui, sans-serif |
| Simplified Chinese | Noto Sans SC | PingFang SC, Microsoft YaHei, sans-serif |
| Code and technical metadata | Geist Mono | SFMono-Regular, Consolas, monospace |

Implementation note for later: load fonts through `next/font` or self-hosted variable font files. Do not rely on a font name that is not actually delivered to the browser.

### Weight system

- 400: body text and long descriptions.
- 500: navigation, labels, links, and emphasized text.
- 600: compact headings and primary actions.
- Avoid 700 unless a specific display moment needs it.

### Type scale

| Token | Desktop | Mobile | Line height | Use |
| --- | --- | --- | --- | --- |
| Display | `clamp(3.5rem, 7vw, 6rem)` | `2.75rem` minimum | 0.98-1.04 | Homepage statement only |
| H1 | `clamp(3rem, 5vw, 4.5rem)` | `2.5rem` | 1.02-1.08 | Page title |
| H2 | `clamp(2rem, 3.5vw, 3rem)` | `2rem` | 1.1-1.18 | Major section |
| H3 | `1.5rem` | `1.25rem` | 1.25 | Card and article title |
| Lead | `1.25rem` | `1.125rem` | 1.55 | Page summary |
| Body | `1rem` | `1rem` | 1.7 | General reading |
| Small | `0.875rem` | `0.875rem` | 1.55 | Metadata and supporting text |
| Meta | `0.75rem` | `0.75rem` | 1.4 | Dates, categories, venues |
| Code | `0.8125rem` | `0.8125rem` | 1.6 | Code and identifiers |

### Typographic rules

- Limit body copy to 60-68 characters per line.
- Use `text-wrap: balance` for display headings and `text-wrap: pretty` for descriptions.
- Large type uses negative tracking from `-0.02em` to `-0.045em`.
- Metadata may use positive tracking up to `0.04em`.
- Do not use uppercase labels above every section. Maximum: 1 eyebrow for every 3 sections.
- Do not use section numbers as decoration.
- Keep Chinese and English on a shared baseline. Avoid forcing English-style letter spacing onto Chinese text.
- Use tabular figures for dates, years, metrics, and publication numbers.
- Use a serif only inside a future long-form essay template, and only if the entire article reading system is deliberately editorial.

## 5. Color system

### Direction

Use a cool neutral foundation with one research-blue accent. This separates the portfolio from the current warm digital-garden palette while retaining a calm, professional tone.

Color is scarce. The accent is reserved for links, focus, selected states, and important research markers.

### Light theme

| Token | Value | Use |
| --- | --- | --- |
| `canvas` | `#F7F8FA` | Page background |
| `surface` | `#FFFFFF` | Cards and raised content |
| `surface-subtle` | `#F0F2F5` | Secondary bands and code blocks |
| `text-primary` | `#14161A` | Main text |
| `text-secondary` | `#5D6470` | Supporting copy |
| `text-tertiary` | `#858C98` | Metadata and inactive states |
| `border` | `rgba(20, 22, 26, 0.10)` | Hairlines and component edges |
| `border-strong` | `rgba(20, 22, 26, 0.18)` | Hover and active edges |
| `accent` | `#3157D5` | Links, focus, active state |
| `accent-soft` | `#E8EDFF` | Selected background |
| `danger` | `#B42318` | Errors only |
| `success` | `#237A57` | Confirmed status only |

### Dark theme

| Token | Value | Use |
| --- | --- | --- |
| `canvas` | `#0B0D10` | Page background |
| `surface` | `#111419` | Cards and raised content |
| `surface-subtle` | `#171B22` | Secondary bands and code blocks |
| `text-primary` | `#F2F4F7` | Main text |
| `text-secondary` | `#A5ACB8` | Supporting copy |
| `text-tertiary` | `#747D8C` | Metadata and inactive states |
| `border` | `rgba(242, 244, 247, 0.10)` | Hairlines and component edges |
| `border-strong` | `rgba(242, 244, 247, 0.20)` | Hover and active edges |
| `accent` | `#8CA8FF` | Links, focus, active state |
| `accent-soft` | `#1B284F` | Selected background |
| `danger` | `#FF8A80` | Errors only |
| `success` | `#72D2A5` | Confirmed status only |

### Color rules

- Never introduce a second decorative accent.
- Do not use gradients as a default section background.
- Do not alternate light and dark sections on one page.
- Use photographs and research figures for visual variety instead of color blocks.
- Check all text and interactive states against WCAG AA, with AAA as the body-text target.
- Increase contrast on hover, focus, and active states.
- Tags use neutral surfaces unless they convey a real semantic category.

## 6. Spacing and layout

### Base spacing scale

Use a 4 px base unit.

| Token | Value | Typical use |
| --- | ---: | --- |
| `space-1` | 4 px | Optical adjustment |
| `space-2` | 8 px | Icon gap, compact metadata |
| `space-3` | 12 px | Small internal gap |
| `space-4` | 16 px | Control padding, mobile gap |
| `space-6` | 24 px | Standard component gap |
| `space-8` | 32 px | Card padding |
| `space-12` | 48 px | Section internal break |
| `space-16` | 64 px | Large content separation |
| `space-24` | 96 px | Standard section padding |
| `space-32` | 128 px | Major desktop section break |

### Layout grid

- Maximum page width: 1280 px.
- Reading width: 720 px maximum.
- Main content grid: 12 columns.
- Desktop gutter: 48-64 px.
- Tablet gutter: 32 px.
- Mobile gutter: 20 px.
- Standard grid gap: 24 px.
- Large editorial gap: 40-48 px.
- Breakpoints: 640, 768, 1024, 1280, and 1536 px.

### Vertical rhythm

- Navigation height: 68-72 px.
- Hero top padding: no more than 96 px.
- Standard section padding: 96 px top and 112 px bottom.
- Major narrative section: up to 128 px top and bottom.
- Page introduction to first content block: 64-80 px.
- Card internal padding: 24 px compact, 32 px standard.
- Mobile section padding: 64-80 px.

### Alignment rules

- Every title, media edge, metadata row, and action aligns to the 12-column grid.
- Use CSS Grid for page structure.
- Avoid complex percentage calculations in flex layouts.
- Allow asymmetry only when a featured item has higher content priority.
- Use optical corrections of 1-2 px when icons and text do not appear aligned.
- Multi-column layouts collapse to one column below 768 px unless a two-column layout remains clearly readable.

## 7. Shape, border, and depth

### Shape system

- Content and media surfaces: 10 px radius.
- Controls and buttons: 6 px radius.
- Code blocks: 8 px radius.
- Tags and status labels: pill shape is allowed only because they are small taxonomy or state elements.
- Editorial lists and publication rows: no container radius.

### Borders

- Use 1 px semi-transparent borders.
- Prefer one group border plus internal spacing over a border around every row.
- Increase border contrast slightly on hover or focus.
- Do not use decorative grid lines or crosshairs.

### Shadows

- Default cards have no shadow.
- Use shadow only when elevation communicates a real layer, such as a menu or dialog.
- Light theme overlay shadow: `0 16px 48px rgba(22, 29, 45, 0.10)`.
- Dark theme overlay shadow: `0 20px 56px rgba(0, 0, 0, 0.36)`.
- Never use a heavy shadow and a strong border on the same component.

## 8. Component style

### Navigation

- One line on desktop, 72 px maximum height.
- Wordmark at left, primary destinations at center or right, theme control last.
- Use no decorative dot in the wordmark unless it becomes a defined brand asset.
- Active state uses stronger text plus a 1 px underline or bottom indicator.
- Sticky background may use subtle blur, but it must remain readable without blur.
- Keyboard focus is always visible.
- Mobile navigation uses a simple full-width disclosure below the header, not a cinematic overlay.

### Buttons and links

- Primary button: dark neutral fill in light mode, light neutral fill in dark mode.
- Secondary action: border or plain text link, not another filled button.
- Button height: 40-44 px desktop, at least 44 px touch target on mobile.
- Button label stays on one line and uses no more than 3 words where possible.
- External links may use one consistent arrow icon.
- Inline links use color plus underline on hover and focus, not color alone.
- Disabled actions remain legible and explain why they are unavailable.

### Section headers

- Stack title and optional summary vertically.
- Use no automatic section number.
- Use an eyebrow only when it adds a real category, such as `Research` or `Selected work`.
- Summary copy stays under 25 words and under 65 characters per line.
- `View all` sits near the heading or at the end of the content group, not floating in an unrelated corner.

### Project cards

- A project card represents a real case study, not a generic content tile.
- Use real project media: result figure, system diagram, interface screenshot, experiment image, or documented artifact.
- Default layout: media above content on compact cards.
- Featured project: asymmetric 7/5 or 8/4 grid with larger media.
- Show title, one-sentence outcome, role, and year.
- Show no more than 3 tags.
- Hover uses a small media scale or title contrast change, never a large vertical jump.
- Avoid 3 equal cards across the page. Prefer 1 featured item plus 2 supporting items.

### Research and publication items

- Use a structured list, not generic cards.
- Primary line: publication or paper title.
- Secondary line: authorship role, venue, status, and year.
- Optional trailing actions: paper, code, project, citation.
- Use a featured treatment only for the most important 1-3 outputs.
- Group long lists by type or year instead of drawing a line under every record.

### Note cards

- Notes should feel closer to an editorial index than project cards.
- Use title, description, topic, and date.
- Featured note may include one real image or diagram.
- Standard notes use text only.
- Avoid turning every topic into a pill.

### Tags

- 12 px text maximum.
- Neutral background by default.
- Maximum 3 visible per card.
- Use title case or sentence case, not all uppercase.
- Tags are interactive only when filtering actually works.

### Search and filters

- Do not show them until they are functional.
- Search uses a real label, visible focus state, and 16 px input text on mobile.
- Filter selection must be reflected in URL or component state.
- Empty results explain what was searched and provide a reset action.

### Article layout

- Reading column: 680-720 px.
- Body size: 17-18 px with 1.75-1.85 line height.
- Figures may break out to 960-1120 px.
- Captions are functional and identify the figure or source.
- Code blocks use the mono font and visible horizontal overflow.
- Headings support anchored links and `scroll-margin-top`.
- References and citations receive a dedicated end section.

### Empty states

- Use plain language describing what belongs in the section.
- Provide one next action when relevant.
- No decorative sparkles or emoji.
- Empty states should not imitate finished content.

### Footer

- Keep it compact.
- Include name, email, GitHub, resume, and essential navigation only.
- Do not use build numbers, weather, city-time strips, or decorative slogans.

## 9. Imagery and data visualization

### Portfolio imagery

- Every featured project needs one real visual asset.
- Preferred assets: model diagram, detection result, ablation chart, annotated dataset sample, research poster detail, or working software screenshot.
- Use consistent aspect ratios: 16:10 for featured work, 4:3 for supporting work, and 1:1 only when the source demands it.
- Reserve image dimensions to avoid layout shift.
- Avoid stock photography in research sections.
- Life and travel pages may use photography, but those images should not define the primary portfolio identity.

### Charts and figures

- Use neutral axes and labels with the research-blue accent for the primary series.
- Use a color-blind-safe secondary palette only when multiple series are necessary.
- Provide text alternatives and descriptive captions.
- Do not invent metrics for visual effect.
- Tables should show only the comparisons needed to support the project story.

## 10. Motion and interaction

- Default transition duration: 160-240 ms.
- Default easing: `cubic-bezier(0.16, 1, 0.3, 1)`.
- Animate only opacity and transform.
- Cards may move by no more than 2 px on hover.
- Media may scale to no more than 1.02.
- Page-entry motion is optional. If used, fade from 8-12 px over 350-450 ms.
- Do not use scroll hijacking, parallax, cursor effects, marquees, or perpetual decorative animation.
- Respect `prefers-reduced-motion` and remove all nonessential movement.
- Focus states must be at least as clear as hover states.
- Active controls may use `transform: scale(0.98)` for tactile feedback.

## 11. Page hierarchy

The portfolio goal requires a clearer distinction between primary professional content and secondary personal archives.

### Target primary navigation

1. Home
2. Work
3. Research
4. Notes
5. About

Life and Journey remain valid content, but they should move under an Archive destination or appear as secondary links in About and the footer. Existing URLs should remain stable unless a later migration is explicitly approved.

### Home

Purpose: explain who Xuyang Zhao is, what he studies, and why the work matters within one viewport.

Recommended order:

1. Identity and research focus.
2. Selected work, maximum 3 projects.
3. Research highlights: papers, patents, or current research.
4. Recent note, maximum 2 items.
5. Short biography and resume link.
6. Contact and footer.

The hero should contain no more than: name or role, one clear statement, one short supporting sentence, and up to 2 actions.

### Work index

Purpose: demonstrate problem-solving and delivery.

Recommended hierarchy:

1. Page title and one-sentence scope.
2. Featured case study.
3. Supporting projects grouped by Research, Engineering, Competition, or Experiment.
4. Archive link if the list grows beyond 8-10 projects.

### Work detail

Purpose: prove contribution, not only participation.

Recommended order:

1. Project title, one-line outcome, role, year, and links.
2. Hero result or real project visual.
3. Context and problem.
4. Personal contribution.
5. Method and technical decisions.
6. Results with evidence.
7. Reflection and next steps.
8. Related research, notes, or projects.

### Research index

Purpose: present academic credibility in one scannable destination.

Recommended groups:

1. Research focus.
2. Selected publications.
3. Patents.
4. Current and past projects.
5. Awards and competitions.
6. Talks, posters, datasets, or open-source work when available.

### Notes

Purpose: demonstrate ongoing thinking and technical depth.

Recommended hierarchy:

1. Page title and topic scope.
2. Featured note or research log.
3. Topic filters after they are functional.
4. Chronological note index.

### About

Purpose: provide context and a professional contact path.

Recommended order:

1. Short profile and research direction.
2. Education.
3. Selected honors.
4. Skills and research methods.
5. Resume, email, GitHub, and phone if public visibility is intentional.
6. Optional personal archive links.

The signature `Life is True.` may appear once as a quiet supporting line. It should not compete with the name or research focus.

### Archive

Purpose: preserve Life and Journey without distracting from the professional portfolio.

- Journey: meaningful milestones and transitions.
- Life: travel, photography, games, and personal observations.
- These pages may be more expressive, but they still use the same typography, color tokens, navigation, and spacing system.

## 12. Content hierarchy inside every page

1. Global navigation.
2. Page title and concise purpose.
3. Primary content or evidence.
4. Supporting context.
5. Related content or next destination.
6. Footer.

Every page must answer these questions quickly:

- Where am I?
- What is most important here?
- What did Xuyang Zhao personally contribute?
- Where can I see evidence?
- What should I open next?

## 13. Accessibility and performance requirements

- Provide a skip link and visible `:focus-visible` treatment.
- Maintain semantic heading order.
- Give icon-only controls accessible names.
- Make all desktop controls at least 24 px and mobile controls at least 44 px hit targets.
- Use native elements before ARIA.
- Set explicit image dimensions.
- Preload only the critical font and above-the-fold media.
- Subset Chinese and Latin font files where practical.
- Avoid layout shifts from fonts, media, or dynamic filters.
- Target LCP below 2.5 s, INP below 200 ms, and CLS below 0.1.
- Test keyboard use, reduced motion, light theme, dark theme, 375 px mobile, laptop, and ultra-wide layouts.

## 14. Implementation priority for a later phase

No implementation is included now. When code changes are approved, use this order:

1. Introduce real font loading and semantic design tokens.
2. Replace the warm palette with the neutral research palette.
3. Normalize container, spacing, type scale, radii, and focus states.
4. Simplify navigation, page introductions, and section headers.
5. Replace fake project covers with real assets.
6. Rebuild project, publication, note, and article patterns.
7. Recompose the homepage around the portfolio hierarchy.
8. Update About and secondary archive pages.
9. Verify responsive layouts, both themes, accessibility, and performance.

## 15. Design acceptance checklist

- The first viewport states the name and research focus clearly.
- Professional content has higher priority than Life and Journey.
- One sans-serif system handles both Latin and Chinese reliably.
- One accent color is used consistently.
- Section numbering and repeated eyebrows are gone.
- Featured projects use real evidence, not decorative placeholders.
- No page defaults to 3 equal cards.
- Cards exist only when they communicate hierarchy.
- Search and filters are functional or absent.
- Light and dark themes preserve equal contrast and hierarchy.
- Focus, hover, active, empty, and disabled states are defined.
- Mobile layouts are intentional, not compressed desktop layouts.
- The site feels like one research portfolio, not several unrelated templates.
