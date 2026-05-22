# Andrea Cotes portfolio — redesign

**Date:** 2026-05-22
**Status:** Design — awaiting review

## Overview

The current site (`src/app/page.tsx` + components) is a generic shadcn portfolio: green-and-cream palette, card-wrapped sections, symmetric centered layout, Montserrat throughout. It functions, but reads as undifferentiated AI-template work — exactly what the user wanted to move away from.

This redesign keeps the site as a **single long-scroll page** but commits hard to one aesthetic: a **modern field notebook**. The conceit is that the site reads like Andrea's research journal — page edges of faded graph paper, handwritten name and section headings, a polaroid portrait taped at a slight angle, and selective margin notes throughout. Body copy stays in a well-set serif so it remains CV-credible for academic peers, who are the primary audience.

Easter eggs (June 19 birthday confetti, the `/dio` JoJo meme page, the "made by my handsome husband Genesis Guerrero" footer) are preserved as the strongest personality signals already on the site.

## Goals

- Replace the generic shadcn aesthetic with a distinctive **field-notebook** visual language.
- Keep the page CV-credible for academic search committees, postdoc applications, and collaborators (the primary audience).
- Surface the subject matter (ticks, parasites, Colombia → Norway fieldwork) as a design hook, not just content.
- Preserve all current functionality: ORCID-fed publications, theme toggle, mobile nav, Easter eggs.

## Non-goals

- Not a multi-page site. The homepage is one long scroll; `/dio` stays as-is.
- Not a CMS. Content lives in TypeScript modules as it does today.
- Not adding a blog, news feed, or talks/press section. Out of scope.
- Not changing the publications data source (ORCID) or the fallback strategy.
- Not restyling the birthday Easter egg (kept as-is — the OTT pink/bouncy effect is part of the joke).

## Design decisions (path summary)

For traceability:

1. **Audience: academic peers & opportunities.** Site is CV-plus.
2. **Direction: "modern field notebook"** (vs. vintage taxonomy plate, editorial profile, indie-web quiet).
3. **Casualness dial: hybrid** — Fraunces serif body + Caveat handwriting reserved for accents (name, section headers, margin notes, top tag). Faded graph paper background. (Rejected: full hand-drawn body; rejected: clean modern with only a wink of notebook.)
4. **Page structure: 8 sections** including a new "Field sites" section.
5. **Field sites: map + summary** — stylized SVG outlines of Colombia & Norway with marked sample sites and a dashed arc representing the 2023 move.
6. **Publications: year-grouped citations with selective handwritten margin notes** (1–4 papers get a one-line Caveat note pointing out what's special about them).
7. **Dark mode: leather notebook** — the site keeps its notebook character in dark mode by becoming a warm brown leather journal with cream text and amber accents.

## Visual system

### Color palette

**Light (paper):**

| Token              | Value     | Use                                                     |
| ------------------ | --------- | ------------------------------------------------------- |
| `--bg`             | `#fbf8f0` | Cream paper background                                  |
| `--ink`            | `#1f1c18` | Body text                                               |
| `--ink-soft`       | `#2a2620` | Paragraph body alternate                                |
| `--ink-mute`       | `#5a544a` | Secondary text, degree lines                            |
| `--label`          | `#8a6a2a` | Tan — small all-caps labels, year tags                  |
| `--accent`         | `#8a3a1a` | Rust — section dividers, margin notes, hover states     |
| `--accent-soft`    | `#c8941a` | Amber — used sparingly for ★ highlights                 |
| `--rule-soft`      | `rgba(120,90,40,0.12)` | Faint horizontal rules                         |
| `--grid`           | `rgba(80,80,120,0.08)` | Graph-paper grid lines                         |
| `--photo-frame`    | `#ffffff` | Polaroid border                                         |

**Dark (leather):**

| Token              | Value     | Use                                                     |
| ------------------ | --------- | ------------------------------------------------------- |
| `--bg`             | `#2a1f17` | Warm brown leather                                      |
| `--ink`            | `#f5ecd6` | Cream headlines                                         |
| `--ink-soft`       | `#ede1c6` | Paragraph body                                          |
| `--ink-mute`       | `#b8a890` | Secondary text                                          |
| `--label`          | `#c8a868` | Amber-gold labels                                       |
| `--accent`         | `#e8a070` | Soft amber-orange for accents/margin notes              |
| `--accent-soft`    | `#d4a85a` | Gold (top tag, alt labels)                              |
| `--rule-soft`      | `rgba(220,180,120,0.12)` | Faint rules                                  |
| `--grid`           | `rgba(220,180,120,0.07)` | Graph grid                                   |
| `--photo-frame`    | `#f5ecd6` | Polaroid border (cream, not pure white)                 |

Replace the existing palette in `src/app/globals.css` entirely. Drop the green/forest tokens.

### Typography

Three fonts loaded via `next/font/google` in `src/app/layout.tsx`:

| Font     | Weights        | Use                                                                   |
| -------- | -------------- | --------------------------------------------------------------------- |
| Fraunces | 400, 500, 600  | Body copy, paragraph, institution names, publication titles           |
| Caveat   | 400, 700       | Name (hero), section headers, margin notes, "fieldwork log" tag       |
| Inter    | 400, 500       | Small all-caps labels, year tags, journal metadata, country codes     |

Size scale (light & dark identical):

- Name hero: Caveat 700, 64px / 1.0 line-height
- Section header: Caveat 700, 36px / 1.0
- Body paragraph: Fraunces 400, 17px / 1.6
- Institution / publication title: Fraunces 500, 16px / 1.35
- Degree / journal: Inter 400 (or Fraunces italic), 13px
- Small all-caps label: Inter 500, 11–12px, letter-spacing 0.16em, uppercase
- Year tag: Inter 400, 12px, letter-spacing 0.05em
- Margin note: Caveat 700, 15–17px

The existing Montserrat usage in `page.tsx` is removed. The existing Caveat usage in `nav.tsx` is reused but expanded across the site.

### Layout primitives

- **Container:** `max-w-3xl` (~768px) centered. Tighter than the current `max-w-4xl` to read more like a single notebook page.
- **Section padding:** ~40–48px vertical inside each section.
- **Graph-paper background:** Applied to `<main>` (or `<body>`) at low opacity (`rgba(80,80,120,0.08)` lines on 24px grid) so it's a watermark, not a screaming grid.
- **Section divider:** A 64px × 2px bar in `--accent` at the top-left of each section header. This is the single recurring decorative element across sections.
- **Faint horizontal rules:** `1px solid rgba(120,90,40,0.12)` between rows in lists (education, publications).
- **Polaroid frame:** `border: 6px solid var(--photo-frame); transform: rotate(-1.8deg); box-shadow: 0 4px 10px rgba(0,0,0,0.12);`. Photo is otherwise unfiltered.

## Sections

### 1. Nav

Small change from current. Sticky top, transparent over the cream background.

- **Logo (left):** "Andrea Cotes" in Caveat (already there). Hover: rust color.
- **Links (right, desktop):** About · Fieldwork · Publications · Contact. Sentence-case, Inter, no buttons — just text links with rust hover underline.
- **Theme toggle:** small icon, far right.
- **Mobile:** existing `Sheet` drawer pattern. Drawer styled to match the new palette.

`src/components/nav.tsx`: restyle, plus add "Fieldwork" to the section list. Section IDs the nav links to: `#about` (hero), `#fieldwork`, `#publications`, `#contact`.

### 2. Hero (title page)

The locked v4 mockup. Two-column on desktop (160px photo | flexible text), stacked on mobile.

- **Top running head:** Caveat 18px, color `--label`. Text: `— fieldwork log · entry no. 042`. *Static for now. See open questions.*
- **Photo:** `/andrea.jpeg`, rendered through `next/image` at 150×184, with polaroid treatment (white border + slight rotation + shadow).
- **Name:** "Andrea Cotes Perdomo" in Caveat 700, 64px, one ink color (no accent split).
- **Role tag:** Inter all-caps, 13px, `--ink-mute`. Text: `PhD ecology · ticks & climate · Colombia → Norway`.
- **Intro paragraph:** Fraunces 17px. Approx 2–3 sentences from her current about-me (lightly rewritten to a more first-person voice). Ends with **one** Caveat margin note span ("↙ that's the whole thesis" or similar — content in Andrea's voice, to be confirmed).

The existing `ProfileCard` and `AboutMe` components merge into a single `Hero` component. The existing two cards go away.

### 3. Education

The locked timeline format. Three rows from `src/components/education-list.tsx`.

- **Header:** Caveat 36 "Education", 64×2 rust divider above.
- **Each row:** `grid-template-columns: 120px 1fr; gap: 18px;`
  - **Year column:** Inter 12px, color `--label`, `white-space: nowrap`. Format `2023 — 2026`.
  - **Right column:** institution name (Fraunces 500, 16px) on the top line, degree (Inter 13px, `--ink-mute`) below.
- **Row divider:** `1px solid var(--rule-soft)`, no divider after last row.

### 4. Field sites *(new)*

The biggest new section. Two-column on desktop, stacked on mobile.

- **Header:** Caveat 36 "Field sites", subtitle Inter all-caps `where the ticks come from`.
- **Left (1.4fr):** A custom SVG **map canvas** showing stylized outlines of Colombia (lower left) and Norway (upper right), connected by a dashed amber arc labeled "2023 →".
  - Country shapes are hand-shaped SVG paths (not GeoJSON) — evocative, not navigational. Country fill at very low opacity, dashed stroke at 1.2px in the relevant accent color.
  - **Marked sites in Colombia:** Tayrona, Magdalena/Caribbean, San Juan de Carare.
  - **Marked sites in Norway:** Telemark, Agder, "N. Norway →" (for the taiga tick paper).
  - Each site: small filled dot (`--accent`), label in Caveat 11px.
  - "~ not to scale ~" caption in the bottom-right of the canvas in Caveat 14px, very subtle.
- **Right (1fr):** A summary log: 3 rows, each `60px 1fr` grid. Columns: year span + place; place row has a second line of Inter italic metadata (taxa sampled).

Data lives in a new TypeScript file. *Exact site list and labels to be confirmed with Andrea — see open questions.*

New component: `src/components/field-sites.tsx`. SVG is inline.

### 5. Publications

Year-grouped, with selective margin notes. Data continues to come from ORCID via the existing `fetchPublications` function in `src/components/publication-list.tsx`. Fallback snapshot is kept.

- **Header:** Caveat 36 "Publications", subtitle (Inter all-caps): something like `14 papers · open access where possible`. Count is dynamic.
- **Year labels:** Inter 11px all-caps, `--label`, with a 1px dashed bottom rule across the section width. Repeats for each year group.
- **Pub row layout:** `grid-template-columns: 1fr 200px; gap: 24px` on desktop. Single column on mobile (margin note drops below).
  - **Left (1fr):** Title (Fraunces 500, 15px, links to DOI on click — opens in new tab). Below: journal (Fraunces italic 13px, `--ink-mute`). Below: meta line (Inter 10px tracked, `--label`): formatted date + "DOI →".
  - **Right (200px):** Optional margin note. Caveat 15px, `--accent`. May start with a glyph (`←`, `↙`, `★`).
- **Margin note data:** A new `publications-highlights.ts` module maps ORCID `put-code` → highlight text. Example:
  ```ts
  export const HIGHLIGHTS: Record<number, string> = {
    215138519: "← the thesis chapter, basically",
    186605685: "★ first sighting in Norway",
    172611258: "↙ named for home",
  };
  ```
  The publication renderer looks up by put-code and shows the note if present. **Highlights are content Andrea writes** — the spec ships with 2–3 placeholder examples she edits.

### 6. Interests & off-the-clock

Demoted from the current cards-equal layout to a small footer-y block.

- **Header:** Caveat 28 "Off the clock" (renamed from "Interests" to be less generic).
- **Body:** A single line in Fraunces 14px, with the interest list inlined as a sentence-style enumeration ("Parasitology, ticks & tick-borne disease, molecular biology, dogs (heavy emphasis on dogs), yoga.") — *not* a row of badges. Source array from `src/components/interest-list.tsx` is reused; the rendering changes.

### 7. Contact

- **Header:** Caveat 36 "Get in touch".
- **Prompt:** Fraunces 16px, 1–2 sentences. Lightly rewritten from the current "I would love to hear from you..." in a more first-person voice.
- **Links:** Three icon buttons — LinkedIn, Twitter, ResearchGate — in a horizontal row. Icons in `--ink`, hover to `--accent`. Buttons are subtle (no card background); use `lucide-react` for LinkedIn and Twitter (note: the icons are deprecated in lucide; replace with `Linkedin` and `Twitter` is fine for now, or swap to current `LinkedinIcon`/`TwitterIcon` names per current lucide-react). ResearchGate keeps the existing `next/image` logo.

`src/components/contact-list.tsx` is restyled; the underlying data array stays.

### 8. Footer

- Caveat 18px, centered, `--ink-mute`.
- Text: `Made with ♥ by my handsome husband Genesis Guerrero` — link styled with `--accent` underline. The heart stays.

## Implementation notes

### File changes

| File                                       | Change                                                                              |
| ------------------------------------------ | ----------------------------------------------------------------------------------- |
| `src/app/globals.css`                      | Rewrite palette (drop green tokens). Add notebook tokens (see palette table).       |
| `src/app/layout.tsx`                       | Replace any `Montserrat` references; load Fraunces, Caveat, Inter via `next/font/google` and apply via CSS variables. |
| `src/app/page.tsx`                         | Replace section composition. Drop `max-w-4xl`/centered-flex layout. Use `max-w-3xl` notebook layout with 8 sections in declared order. Remove direct font import. |
| `src/components/nav.tsx`                   | Minor restyle. Add "Fieldwork" to sections array. Switch desktop links from `Button variant=ghost` to plain text links with rust hover. |
| `src/components/profile-card.tsx`          | **Removed.** Merged into a new `hero.tsx`.                                          |
| `src/components/about-me.tsx`              | **Removed.** Merged into `hero.tsx`.                                                |
| `src/components/hero.tsx` *(new)*          | Composes the title page: running head, polaroid photo, name, role tag, intro paragraph with one margin-note span. |
| `src/components/education-list.tsx`        | Restyled to the timeline format. Drop `Card`/`Separator` wrappers. Keep data array. |
| `src/components/field-sites.tsx` *(new)*   | New section. Inline SVG map + summary log. Site data array exported from same file. |
| `src/components/publication-list.tsx`      | Restyle to year-grouped citations with optional margin-note column. Group helper added. ORCID fetch logic unchanged. |
| `src/lib/publications-highlights.ts` *(new)* | Map of `put-code` → margin note string. Ships with 2–3 placeholder entries.       |
| `src/components/interest-list.tsx`         | Restyle from `Badge` row to an inline sentence. Keep data array.                    |
| `src/components/contact-list.tsx`          | Restyle (no cards, just icon links with hover color). Keep data array.              |
| `src/components/theme-toggle.tsx`          | Unchanged behavior; visual restyle to match.                                        |
| `src/components/birthday-celebration.tsx`  | Unchanged.                                                                          |
| `src/components/ui/*`                      | Most stay; some (Card, Avatar, Separator) become unused — leave them in `components/ui` for now, do not delete preemptively. |
| `src/app/dio/page.tsx`                     | Unchanged.                                                                          |

### Polaroid component / utility

Either a small `Polaroid` wrapper component or a `.polaroid` Tailwind class composition. Inline class composition is fine — used in one place (hero).

### SVG map authoring

The map shapes are authored by hand as SVG paths (not GeoJSON). They are evocative, not accurate. The "~ not to scale ~" caption is part of the design. Goal: <8KB inline SVG total.

### Responsive

- ≥768px (md): two-column hero (photo | text), two-column field sites (map | log), two-column publications (citation | margin note).
- <768px: single column. Photo above name. Margin notes drop below the citation they annotate (still in Caveat color, marked as marginal).

### Theme

`next-themes` already wired. The CSS variables above are defined in `:root` (light) and `.dark` (dark). No JS change needed beyond what already exists.

### Accessibility

- All decorative SVG (map shapes, dividers) marked `aria-hidden="true"`.
- Margin notes in Caveat are not critical reading; they should be readable but missing them shouldn't lose information. Confirmed: each margin note repeats or summarizes context already present in the citation — they're flair, not data.
- Color contrast: light mode `--ink` (#1f1c18) on `--bg` (#fbf8f0) is ~17:1. Dark mode `--ink` (#f5ecd6) on `--bg` (#2a1f17) is ~13:1. Both well over AAA.
- Caveat at <14px is hard to read — never used below 15px in the spec.

## Out of scope / future

- A "talks & press" or "news" section.
- A blog or notes section.
- Per-publication abstract preview / "read more".
- A genuine geographic map (Leaflet, Mapbox). The hand-shaped SVG is the design choice.
- Restyling the birthday Easter egg.
- Animation on scroll (fade-ins, parallax). The page is deliberately static.

## Open questions

These need Andrea (or user) input before/during implementation; they don't block writing the implementation plan.

1. **Portrait photo.** Is `/andrea.jpeg` (the current one) the right photo for the new polaroid treatment, or does Andrea want to supply a fresh one? The current photo's aspect ratio and crop may need tweaking for the 150×184 polaroid frame.
2. **Hero intro paragraph.** The current "About me" text is two formal paragraphs. The new design uses one shorter, more first-person paragraph. **The spec ships with a draft (e.g. the "started with ticks on lizards in Magdalena…" line from the mockup) and Andrea edits.**
3. **Field sites — exact list.** Spec uses sites inferred from her publications. Andrea should confirm: which Colombian regions to mark, whether to mark Valencia (MSc), whether the Norway sites should be Telemark + Agder + "N. Norway" or different.
4. **Publication margin notes.** Spec ships with 2–3 placeholder examples. Andrea writes the real ones — one per truly-favorite paper. **It's OK if no margin notes ship initially; the column simply stays empty.**
5. **"Entry no. 042" running head.** Static placeholder. Could become: (a) static and decorative, (b) computed from `git rev-list --count` or post date, (c) just removed. *Decision: keep static and decorative for now. Easy to change later.*
6. **Contact additions.** Should ORCID and/or an email be added to the contact icons? Currently: LinkedIn, Twitter, ResearchGate. ORCID is a natural fit for an academic site.
