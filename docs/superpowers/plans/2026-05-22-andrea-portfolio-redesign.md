# Andrea Cotes Portfolio Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the generic shadcn portfolio aesthetic with a "modern field-notebook" design — handwritten name and section headers in Caveat, Fraunces body, faded graph paper, polaroid portrait, and a new Field sites SVG map — while preserving Easter eggs and ORCID publication fetching.

**Architecture:** Three new components (`hero.tsx`, `field-sites.tsx`, plus a `lib/publications-highlights.ts` data module). Five components restyled (nav, education-list, publication-list, interest-list, contact-list). Two components removed (`profile-card.tsx`, `about-me.tsx`, merged into `hero.tsx`). Palette and typography are driven entirely through CSS variables in `globals.css` and `next/font/google` Tailwind 4 tokens declared in `layout.tsx` — components reference them via Tailwind utility classes (`bg-paper`, `text-ink`, `font-display`).

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript 5.8, Tailwind CSS 4 (CSS-first config in `globals.css`), `next/font/google` for Fraunces / Caveat / Inter, `next-themes` for light/dark, `lucide-react` for icons. No test framework — verification is `pnpm lint`, `pnpm build`, and manual review in `pnpm dev`.

**Spec:** `docs/superpowers/specs/2026-05-22-andrea-portfolio-redesign-design.md`

---

## File map

**Create:**
- `src/components/hero.tsx` — title page block (replaces ProfileCard + AboutMe)
- `src/components/field-sites.tsx` — new section with SVG map + summary log
- `src/lib/publications-highlights.ts` — put-code → margin-note map

**Modify:**
- `src/app/layout.tsx` — load Fraunces, Caveat, Inter via next/font/google
- `src/app/globals.css` — full palette + typography token rewrite (drop green)
- `src/app/page.tsx` — compose new section order, drop wrapper layout
- `src/components/nav.tsx` — restyle, add Fieldwork link, drop Button wrappers
- `src/components/education-list.tsx` — timeline restyle, drop Card
- `src/components/publication-list.tsx` — year grouping + margin notes
- `src/components/interest-list.tsx` — inline sentence (no badges)
- `src/components/contact-list.tsx` — bare icon links, no card wrappers

**Delete:**
- `src/components/profile-card.tsx`
- `src/components/about-me.tsx`

**Unchanged:**
- `src/components/theme-provider.tsx`, `src/components/theme-toggle.tsx`
- `src/components/birthday-celebration.tsx`
- `src/app/dio/page.tsx`
- `src/components/ui/*` (shadcn primitives — most become unused; keep on disk for now)

---

## Verification approach

There is no test framework in this project. Each task verifies via:
1. **`pnpm lint`** — catches TypeScript / ESLint issues
2. **`pnpm build`** — catches type errors and build-time issues. Run at the end of each task that changes code shape.
3. **Manual visual review** in `pnpm dev` (http://localhost:3000) at the end of each task that produces visible UI.

Where a step says "visual check," the executor opens the dev server and confirms the section matches the spec. If running in a non-interactive subagent, the executor saves a screenshot or reports the rendered HTML.

---

## Task 1: New palette + new fonts

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Load Fraunces, Caveat, Inter in `layout.tsx`**

Replace `src/app/layout.tsx` entirely with:

```tsx
import type { Metadata } from "next";
import { Fraunces, Caveat, Inter } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-fraunces",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-caveat",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Andrea Cotes",
  description: "Biologist & dog lover. Based in Norway",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${fraunces.variable} ${caveat.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Rewrite `globals.css` palette**

Replace `src/app/globals.css` entirely with:

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

:root {
  /* Paper (light mode) */
  --paper: #fbf8f0;
  --ink: #1f1c18;
  --ink-soft: #2a2620;
  --ink-mute: #5a544a;
  --label: #8a6a2a;
  --accent: #8a3a1a;
  --accent-soft: #c8941a;
  --rule: rgba(120, 90, 40, 0.12);
  --grid: rgba(80, 80, 120, 0.08);
  --photo-frame: #ffffff;

  /* Mapped to shadcn tokens (used by remaining ui/* primitives) */
  --background: var(--paper);
  --foreground: var(--ink);
  --card: var(--paper);
  --card-foreground: var(--ink);
  --popover: var(--paper);
  --popover-foreground: var(--ink);
  --primary: var(--accent);
  --primary-foreground: #ffffff;
  --secondary: rgba(138, 58, 26, 0.08);
  --secondary-foreground: var(--accent);
  --muted: rgba(120, 90, 40, 0.08);
  --muted-foreground: var(--ink-mute);
  --accent-foreground: #ffffff;
  --destructive: #c62828;
  --destructive-foreground: #ffffff;
  --border: var(--rule);
  --input: var(--rule);
  --ring: var(--accent);

  --radius: 0.25rem;
}

.dark {
  /* Leather (dark mode) */
  --paper: #2a1f17;
  --ink: #f5ecd6;
  --ink-soft: #ede1c6;
  --ink-mute: #b8a890;
  --label: #c8a868;
  --accent: #e8a070;
  --accent-soft: #d4a85a;
  --rule: rgba(220, 180, 120, 0.12);
  --grid: rgba(220, 180, 120, 0.07);
  --photo-frame: #f5ecd6;

  --background: var(--paper);
  --foreground: var(--ink);
  --card: var(--paper);
  --card-foreground: var(--ink);
  --popover: var(--paper);
  --popover-foreground: var(--ink);
  --primary: var(--accent);
  --primary-foreground: var(--paper);
  --secondary: rgba(232, 160, 112, 0.10);
  --secondary-foreground: var(--accent);
  --muted: rgba(220, 180, 120, 0.08);
  --muted-foreground: var(--ink-mute);
  --accent-foreground: var(--paper);
  --destructive: #c62828;
  --destructive-foreground: var(--ink);
  --border: var(--rule);
  --input: var(--rule);
  --ring: var(--accent);
}

@theme inline {
  --color-paper: var(--paper);
  --color-ink: var(--ink);
  --color-ink-soft: var(--ink-soft);
  --color-ink-mute: var(--ink-mute);
  --color-label: var(--label);
  --color-accent: var(--accent);
  --color-accent-soft: var(--accent-soft);
  --color-rule: var(--rule);
  --color-photo-frame: var(--photo-frame);

  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);

  --font-serif: var(--font-fraunces), Georgia, serif;
  --font-display: var(--font-caveat), cursive;
  --font-sans: var(--font-inter), system-ui, sans-serif;

  --radius-sm: calc(var(--radius));
  --radius-md: calc(var(--radius) + 2px);
  --radius-lg: calc(var(--radius) + 4px);
  --radius-xl: calc(var(--radius) + 8px);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }

  html {
    background: var(--paper);
  }

  body {
    background:
      linear-gradient(0deg, transparent 23px, var(--grid) 24px),
      linear-gradient(90deg, transparent 23px, var(--grid) 24px),
      var(--paper);
    background-size: 24px 24px;
    color: var(--ink);
    font-family: var(--font-serif);
    font-size: 17px;
    line-height: 1.6;
  }
}
```

- [ ] **Step 3: Verify lint passes**

Run: `pnpm lint`
Expected: no errors (warnings about deprecated lucide icons in `contact-list.tsx` are fine — addressed in Task 7).

- [ ] **Step 4: Verify build passes**

Run: `pnpm build`
Expected: build completes; no type errors. The site will look badly broken at this point because `page.tsx` still imports Montserrat — that's fixed in Task 9. The build itself must succeed.

- [ ] **Step 5: Commit**

```bash
git add src/app/layout.tsx src/app/globals.css
git commit -m "redesign: swap palette and fonts to field-notebook system"
```

---

## Task 2: `Hero` component (replaces ProfileCard + AboutMe)

**Files:**
- Create: `src/components/hero.tsx`

- [ ] **Step 1: Create `src/components/hero.tsx`**

```tsx
import Image from "next/image";

export default function Hero() {
  return (
    <section id="about" className="py-12 md:py-16">
      <p className="font-display text-lg text-label">
        — fieldwork log · entry no. 042
      </p>

      <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-[160px_1fr] md:gap-9">
        <div className="-rotate-[1.8deg] inline-block border-[6px] border-photo-frame shadow-[0_4px_10px_rgba(0,0,0,0.12)] w-fit">
          <Image
            src="/andrea.jpeg"
            alt="Andrea Cotes Perdomo"
            width={150}
            height={184}
            className="block object-cover h-[184px] w-[150px]"
            priority
          />
        </div>

        <div>
          <h1 className="font-display text-6xl md:text-[64px] leading-none text-ink">
            Andrea Cotes Perdomo
          </h1>
          <p className="mt-3 font-sans text-xs uppercase tracking-[0.16em] text-ink-mute">
            PhD ecology · ticks &amp; climate · Colombia → Norway
          </p>
          <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
            Started with ticks on lizards in Magdalena. Now: how do seasons
            shift the bugs — and the bacteria they carry — as the Nordic spring
            keeps arriving earlier?{" "}
            <span className="font-display text-[17px] text-accent">
              ↙ that&apos;s the whole thesis
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify lint passes**

Run: `pnpm lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/hero.tsx
git commit -m "redesign: add Hero component (polaroid + handwritten name)"
```

(Visual review of Hero happens in Task 9 when `page.tsx` is composed.)

---

## Task 3: `EducationList` restyle (timeline)

**Files:**
- Modify: `src/components/education-list.tsx`

- [ ] **Step 1: Replace `src/components/education-list.tsx` entirely**

```tsx
type Education = {
  id: number;
  institution: string;
  title: string;
  startYear: number;
  endYear: number | null;
};

const education: Education[] = [
  {
    id: 1,
    institution: "University of South-Eastern Norway",
    title: "Doctor of Philosophy in Ecology",
    startYear: 2023,
    endYear: 2026,
  },
  {
    id: 2,
    institution: "University of Valencia",
    title:
      "MSc Tropical Parasitic Diseases, Biological and Biomedical Sciences",
    startYear: 2020,
    endYear: 2021,
  },
  {
    id: 3,
    institution: "University of Magdalena",
    title: "Bachelor of Science in Biology",
    startYear: 2013,
    endYear: 2018,
  },
];

function formatRange(start: number, end: number | null): string {
  return `${start} — ${end ?? "Present"}`;
}

export default function EducationList() {
  return (
    <section id="education" className="py-10 md:py-12">
      <div className="relative pt-5">
        <span className="absolute left-0 top-0 h-0.5 w-16 bg-accent" />
        <h2 className="font-display text-[36px] leading-none text-ink">
          Education
        </h2>
      </div>

      <div className="mt-5">
        {education.map((item, index) => (
          <div
            key={item.id}
            className={`grid grid-cols-[120px_1fr] gap-4 py-2.5 ${
              index < education.length - 1
                ? "border-b border-rule"
                : ""
            }`}
          >
            <span className="whitespace-nowrap font-sans text-xs tracking-wider text-label pt-1">
              {formatRange(item.startYear, item.endYear)}
            </span>
            <div>
              <div className="font-serif font-medium text-base text-ink">
                {item.institution}
              </div>
              <div className="font-sans text-[13px] text-ink-mute mt-0.5">
                {item.title}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify lint passes**

Run: `pnpm lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/education-list.tsx
git commit -m "redesign: restyle EducationList as timeline"
```

---

## Task 4: `FieldSites` component (new section with SVG map)

**Files:**
- Create: `src/components/field-sites.tsx`

- [ ] **Step 1: Create `src/components/field-sites.tsx`**

```tsx
type FieldSite = {
  yearLabel: string;
  place: string;
  detail: string;
};

const summary: FieldSite[] = [
  {
    yearLabel: "2018 — 22",
    place: "Colombia",
    detail: "reptiles, horses, herpetofauna",
  },
  {
    yearLabel: "2023 →",
    place: "Southern Norway",
    detail: "Ixodes ricinus, TBEV, Borrelia",
  },
  {
    yearLabel: "2025",
    place: "Northern Norway",
    detail: "first Ixodes persulcatus report",
  },
];

export default function FieldSites() {
  return (
    <section id="fieldwork" className="py-10 md:py-12">
      <div className="relative pt-5">
        <span className="absolute left-0 top-0 h-0.5 w-16 bg-accent" />
        <h2 className="font-display text-[36px] leading-none text-ink">
          Field sites
        </h2>
        <p className="mt-1.5 font-sans text-xs uppercase tracking-[0.16em] text-label">
          where the ticks come from
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-7 md:grid-cols-[1.4fr_1fr]">
        <div className="relative border border-dashed border-rule p-4">
          <FieldMap />
          <span className="absolute bottom-1.5 right-2.5 font-display text-sm text-label -rotate-[1.5deg]">
            ~ not to scale ~
          </span>
        </div>

        <div>
          {summary.map((row, i) => (
            <div
              key={row.yearLabel}
              className={`grid grid-cols-[60px_1fr] items-baseline gap-3 py-2 ${
                i < summary.length - 1 ? "border-b border-rule" : ""
              }`}
            >
              <span className="whitespace-nowrap font-sans text-[11px] tracking-wider text-label">
                {row.yearLabel}
              </span>
              <div>
                <div className="font-serif text-sm text-ink">{row.place}</div>
                <div className="mt-0.5 font-sans text-[10px] italic text-ink-mute">
                  {row.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FieldMap() {
  return (
    <svg
      viewBox="0 0 400 280"
      role="img"
      aria-label="Map of field sites in Colombia and Norway"
      className="block h-auto w-full"
    >
      {/* Colombia */}
      <g transform="translate(40, 60)">
        <path
          d="M 40 0 Q 80 -5 110 10 L 125 30 Q 140 60 130 90 L 110 130 Q 95 160 75 165 L 50 160 L 35 140 Q 20 110 25 80 L 30 50 Q 30 20 40 0 Z"
          fill="rgba(180,140,80,0.08)"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeDasharray="2 1.5"
          className="text-label"
        />
        <text
          x="78"
          y="100"
          fontFamily="var(--font-caveat)"
          fontSize="14"
          fontStyle="italic"
          className="fill-label"
        >
          Colombia
        </text>

        <circle cx="55" cy="25" r="4" className="fill-accent" />
        <text x="62" y="28" fontFamily="var(--font-caveat)" fontSize="11" className="fill-ink">
          Tayrona
        </text>

        <circle cx="68" cy="42" r="4" className="fill-accent" />
        <text x="75" y="45" fontFamily="var(--font-caveat)" fontSize="11" className="fill-ink">
          Magdalena
        </text>

        <circle cx="80" cy="75" r="4" className="fill-accent" />
        <text x="87" y="78" fontFamily="var(--font-caveat)" fontSize="11" className="fill-ink">
          San Juan de C.
        </text>
      </g>

      {/* Norway */}
      <g transform="translate(260, 10)">
        <path
          d="M 50 0 L 70 10 L 75 40 L 60 70 L 55 100 L 50 140 L 45 175 L 35 200 L 25 215 L 20 205 L 30 180 L 35 140 L 40 100 L 42 70 L 38 40 L 45 15 Z"
          fill="rgba(140,160,200,0.08)"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeDasharray="2 1.5"
          className="text-label"
        />
        <text
          x="55"
          y="80"
          fontFamily="var(--font-caveat)"
          fontSize="14"
          fontStyle="italic"
          className="fill-label"
        >
          Norway
        </text>

        <circle cx="48" cy="160" r="4" className="fill-accent" />
        <text x="56" y="163" fontFamily="var(--font-caveat)" fontSize="11" className="fill-ink">
          Telemark
        </text>

        <circle cx="50" cy="180" r="4" className="fill-accent" />
        <text x="58" y="183" fontFamily="var(--font-caveat)" fontSize="11" className="fill-ink">
          Agder
        </text>

        <circle cx="35" cy="40" r="4" className="fill-accent" />
        <text x="-22" y="40" fontFamily="var(--font-caveat)" fontSize="11" className="fill-ink">
          N. Norway →
        </text>
      </g>

      {/* Arc Colombia → Norway */}
      <path
        d="M 130 90 Q 220 -30 305 90"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeDasharray="4 3"
        opacity="0.6"
        className="text-accent"
      />
      <text
        x="195"
        y="20"
        fontFamily="var(--font-caveat)"
        fontSize="13"
        fontStyle="italic"
        textAnchor="middle"
        className="fill-accent"
      >
        2023 →
      </text>
    </svg>
  );
}
```

- [ ] **Step 2: Verify lint passes**

Run: `pnpm lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/field-sites.tsx
git commit -m "redesign: add FieldSites component with stylized SVG map"
```

---

## Task 5: Publications — year groups + margin notes

**Files:**
- Create: `src/lib/publications-highlights.ts`
- Modify: `src/components/publication-list.tsx`

- [ ] **Step 1: Create `src/lib/publications-highlights.ts`**

This module maps ORCID `put-code` → margin note text. Ships with three placeholder examples Andrea will edit.

```ts
/**
 * Margin notes shown next to selected publications.
 * Keyed by ORCID `put-code` (numeric). Add or remove entries to surface notes.
 *
 * Glyph conventions used in the spec — feel free to mix:
 *   ←  ↙  ↗   point at the citation
 *   ★          flag of pride
 */
export const PUBLICATION_HIGHLIGHTS: Record<number, string> = {
  // "Seasonality and environmental drivers of TBEV..." (2026)
  215138519: "← the thesis chapter, basically",
  // "First report of the taiga tick Ixodes persulcatus in Norway" (2025)
  186605685: "★ first sighting in Norway",
  // "Molecular detection of Candidatus Rickettsia colombianensi..." (2022)
  172611258: "↙ named for home",
};
```

- [ ] **Step 2: Replace `src/components/publication-list.tsx` entirely**

```tsx
import Link from "next/link";

import { PUBLICATION_HIGHLIGHTS } from "@/lib/publications-highlights";

const ORCID_ID = "0000-0003-2605-9302";
const ONE_WEEK_SECONDS = 60 * 60 * 24 * 7;

type Publication = {
  id: number;
  title: string;
  subtitle: string;
  year: number;
  month: number | null;
  url: string;
};

type WorkSummary = {
  "put-code": number;
  title: { title: { value: string } | null } | null;
  "journal-title": { value: string } | null;
  "publication-date": {
    year: { value: string } | null;
    month: { value: string } | null;
  } | null;
  url: { value: string } | null;
  "external-ids": {
    "external-id": Array<{
      "external-id-type": string;
      "external-id-value": string;
      "external-id-url": { value: string } | null;
    }>;
  } | null;
};

type WorksResponse = { group: Array<{ "work-summary": WorkSummary[] }> };

function toPublication(w: WorkSummary): Publication | null {
  const title = w.title?.title?.value;
  const yearStr = w["publication-date"]?.year?.value;
  if (!title || !yearStr) return null;

  const monthStr = w["publication-date"]?.month?.value;
  const doi = w["external-ids"]?.["external-id"].find(
    (e) => e["external-id-type"] === "doi",
  );
  const url =
    doi?.["external-id-url"]?.value ??
    (doi ? `https://doi.org/${doi["external-id-value"]}` : null) ??
    w.url?.value ??
    "#";

  return {
    id: w["put-code"],
    title,
    subtitle: w["journal-title"]?.value ?? "",
    year: Number(yearStr),
    month: monthStr ? Number(monthStr) : null,
    url,
  };
}

function sortPublications(a: Publication, b: Publication): number {
  if (b.year !== a.year) return b.year - a.year;
  return (b.month ?? 0) - (a.month ?? 0);
}

function groupByYear(pubs: Publication[]): Array<[number, Publication[]]> {
  const map = new Map<number, Publication[]>();
  for (const p of pubs) {
    const list = map.get(p.year) ?? [];
    list.push(p);
    map.set(p.year, list);
  }
  return Array.from(map.entries()).sort((a, b) => b[0] - a[0]);
}

async function fetchPublications(): Promise<Publication[]> {
  try {
    const res = await fetch(`https://pub.orcid.org/v3.0/${ORCID_ID}/works`, {
      headers: { Accept: "application/json" },
      next: { revalidate: ONE_WEEK_SECONDS },
    });
    if (!res.ok) return FALLBACK_PUBLICATIONS;
    const data: WorksResponse = await res.json();
    const pubs = data.group
      .map((g) => g["work-summary"][0])
      .map(toPublication)
      .filter((p): p is Publication => p !== null)
      .sort(sortPublications);
    return pubs.length > 0 ? pubs : FALLBACK_PUBLICATIONS;
  } catch {
    return FALLBACK_PUBLICATIONS;
  }
}

function formatDate({ year, month }: Publication): string {
  if (month === null) return String(year);
  return new Date(year, month - 1).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
  });
}

export default async function PublicationList() {
  const publications = await fetchPublications();
  const groups = groupByYear(publications);

  return (
    <section id="publications" className="py-10 md:py-12">
      <div className="relative pt-5">
        <span className="absolute left-0 top-0 h-0.5 w-16 bg-accent" />
        <h2 className="font-display text-[36px] leading-none text-ink">
          Publications
        </h2>
        <p className="mt-1.5 font-sans text-xs uppercase tracking-[0.16em] text-label">
          {publications.length} papers · open access where possible
        </p>
      </div>

      <div className="mt-6">
        {groups.map(([year, pubs]) => (
          <div key={year}>
            <div className="mt-5 pb-1 border-b border-dashed border-rule font-sans text-[11px] uppercase tracking-[0.18em] text-label first:mt-0">
              {year}
            </div>
            {pubs.map((p) => {
              const note = PUBLICATION_HIGHLIGHTS[p.id];
              return (
                <div
                  key={p.id}
                  className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-2 md:gap-6 py-2.5 border-b border-rule last:border-b-0"
                >
                  <div>
                    <Link
                      href={p.url}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      className="font-serif font-medium text-[15px] leading-snug text-ink hover:text-accent hover:underline decoration-accent/40"
                    >
                      {p.title}
                    </Link>
                    <div className="font-serif italic text-[13px] text-ink-mute mt-1">
                      {p.subtitle}
                    </div>
                    <div className="mt-1 font-sans text-[10px] tracking-wider text-label">
                      {formatDate(p)} · DOI →
                    </div>
                  </div>
                  {note ? (
                    <div className="font-display text-[15px] leading-snug text-accent pt-1">
                      {note}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}

// Snapshot of ORCID works as of 2026-05-22, used if the ORCID API is unreachable.
const FALLBACK_PUBLICATIONS: Publication[] = [
  {
    id: 215138519,
    title:
      "Seasonality and environmental drivers of tick-borne encephalitis virus prevalence in Ixodes ricinus ticks from Southern Norway",
    subtitle: "Ticks and Tick-borne Diseases",
    year: 2026,
    month: 5,
    url: "https://doi.org/10.1016/j.ttbdis.2026.102658",
  },
  {
    id: 211773382,
    title:
      "Seasonal variation in prevalence of Borrelia burgdorferi sensu lato and Neoehrlichia mikurensis in Ixodes ricinus nymphs in southern Norway",
    subtitle: "Acta Veterinaria Scandinavica",
    year: 2026,
    month: 4,
    url: "https://doi.org/10.1186/s13028-026-00860-x",
  },
  {
    id: 186605685,
    title: "First report of the taiga tick Ixodes persulcatus in Norway",
    subtitle: "Ticks and Tick-borne Diseases",
    year: 2025,
    month: 7,
    url: "https://doi.org/10.1016/j.ttbdis.2025.102508",
  },
  {
    id: 185017767,
    title:
      "Making the best of a bad sample: Comparison of DNA extraction and quantification methods using sub-optimally stored Ixodes ricinus ticks",
    subtitle: "PLOS One",
    year: 2025,
    month: 5,
    url: "https://doi.org/10.1371/journal.pone.0323251",
  },
  {
    id: 172611255,
    title:
      "New insights into the molecular phylogeny, biogeographical history, and diversification of Amblyomma ticks (Acari: Ixodidae) based on mitogenomes and nuclear sequences",
    subtitle: "Parasites and Vectors",
    year: 2024,
    month: null,
    url: "https://doi.org/10.1186/s13071-024-06131-w",
  },
  {
    id: 172611256,
    title:
      "New insights into the systematics of the afrotropical Amblyomma marmoreum complex (Acari: Ixodidae) and the genome of a novel Rickettsia africae strain using morphological and metagenomic approaches",
    subtitle: "Ticks and Tick-borne Diseases",
    year: 2024,
    month: null,
    url: "https://doi.org/10.1016/j.ttbdis.2024.102323",
  },
  {
    id: 172611254,
    title:
      "New insights into the systematics of the Afrotropical Amblyomma marmoreum complex (Acari, Ixodidae) and a novel Rickettsia africae strain using morphological and metagenomic approaches",
    subtitle: "bioRxiv",
    year: 2023,
    month: null,
    url: "https://doi.org/10.1101/2023.08.18.553479",
  },
  {
    id: 172611257,
    title:
      "Phylogenetic relationships of the Amblyomma cajennense complex (Acari: Ixodidae) at mitogenomic resolution",
    subtitle: "Ticks and Tick-borne Diseases",
    year: 2023,
    month: null,
    url: "https://doi.org/10.1016/j.ttbdis.2023.102125",
  },
  {
    id: 172611249,
    title: "Phylogeny and origin of diversification of Amblyomma (Acari: Ixodidae)",
    subtitle: "Research Square",
    year: 2023,
    month: null,
    url: "https://doi.org/10.21203/rs.3.rs-3404165/v1",
  },
  {
    id: 172611258,
    title:
      "Molecular detection of Candidatus Rickettsia colombianensi in ticks (Acari, Ixodidae) collected from herpetofauna in San Juan de Carare, Colombia",
    subtitle: "International Journal for Parasitology: Parasites and Wildlife",
    year: 2022,
    month: null,
    url: "https://doi.org/10.1016/j.ijppaw.2022.08.004",
  },
  {
    id: 172611250,
    title:
      "Molecular detection of pathogens in ticks associated with domestic animals from the Colombian Caribbean region",
    subtitle: "Experimental and Applied Acarology",
    year: 2020,
    month: null,
    url: "https://doi.org/10.1007/s10493-020-00531-0",
  },
  {
    id: 172611253,
    title:
      "Molecular detection of Rickettsia spp., Anaplasma platys and Theileria equi in ticks collected from horses in Tayrona National Park, Colombia",
    subtitle: "Experimental and Applied Acarology",
    year: 2019,
    month: null,
    url: "https://doi.org/10.1007/s10493-019-00354-8",
  },
  {
    id: 172611252,
    title:
      "Hemogregarine and Rickettsial infection in ticks of toads from northeastern Colombia",
    subtitle: "International Journal for Parasitology: Parasites and Wildlife",
    year: 2018,
    month: null,
    url: "https://doi.org/10.1016/j.ijppaw.2018.06.003",
  },
  {
    id: 172611251,
    title:
      "Rickettsial infection in ticks (Acari: Ixodidae) from reptiles in the Colombian Caribbean",
    subtitle: "Ticks and Tick-borne Diseases",
    year: 2018,
    month: null,
    url: "https://doi.org/10.1016/j.ttbdis.2018.02.003",
  },
];
```

- [ ] **Step 3: Verify lint passes**

Run: `pnpm lint`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/lib/publications-highlights.ts src/components/publication-list.tsx
git commit -m "redesign: year-group publications and add margin notes"
```

---

## Task 6: `InterestList` restyle (inline sentence)

**Files:**
- Modify: `src/components/interest-list.tsx`

- [ ] **Step 1: Replace `src/components/interest-list.tsx` entirely**

```tsx
const interests = [
  "parasitology",
  "ticks and tick-borne diseases",
  "molecular biology",
  "dogs (heavy emphasis on dogs)",
  "yoga",
];

function joinSentence(parts: string[]): string {
  if (parts.length <= 1) return parts.join("");
  return `${parts.slice(0, -1).join(", ")}, and ${parts[parts.length - 1]}.`;
}

export default function InterestList() {
  return (
    <section id="off-the-clock" className="py-8 md:py-10">
      <div className="relative pt-4">
        <span className="absolute left-0 top-0 h-0.5 w-16 bg-accent" />
        <h2 className="font-display text-[28px] leading-none text-ink">
          Off the clock
        </h2>
      </div>
      <p className="mt-3 font-serif text-[15px] leading-relaxed text-ink-soft">
        Besides ticks: {joinSentence(interests)}
      </p>
    </section>
  );
}
```

- [ ] **Step 2: Verify lint passes**

Run: `pnpm lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/interest-list.tsx
git commit -m "redesign: demote InterestList to inline sentence"
```

---

## Task 7: `ContactList` restyle (bare icon row)

**Files:**
- Modify: `src/components/contact-list.tsx`

- [ ] **Step 1: Replace `src/components/contact-list.tsx` entirely**

Note on lucide-react: the icons `Linkedin` and `Twitter` are valid but show a deprecation hint. Keep using them — the rename is a future cleanup not in scope for this redesign.

```tsx
import Image from "next/image";
import Link from "next/link";
import { Linkedin, Twitter } from "lucide-react";

type ContactLink = {
  id: string;
  name: string;
  url: string;
  icon: React.ReactNode;
};

const contactLinks: ContactLink[] = [
  {
    id: "linkedin",
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/andrea-paola-cotes-perdomo-5a65a259/",
    icon: <Linkedin className="size-5" />,
  },
  {
    id: "twitter",
    name: "Twitter",
    url: "https://twitter.com/andreacotes1",
    icon: <Twitter className="size-5" />,
  },
  {
    id: "researchgate",
    name: "Research Gate",
    url: "https://www.researchgate.net/profile/Andrea-Cotes-Perdomo",
    icon: (
      <Image
        src="/research_gate_logo.png"
        alt=""
        width={20}
        height={20}
        className="opacity-80"
      />
    ),
  },
];

export default function ContactList() {
  return (
    <section id="contact" className="py-10 md:py-12">
      <div className="relative pt-5">
        <span className="absolute left-0 top-0 h-0.5 w-16 bg-accent" />
        <h2 className="font-display text-[36px] leading-none text-ink">
          Get in touch
        </h2>
      </div>

      <p className="mt-3 font-serif text-base text-ink-soft">
        Always glad to hear from collaborators, students, and anyone interested
        in ticks or what they carry.
      </p>

      <div className="mt-5 flex items-center gap-5">
        {contactLinks.map((link) => (
          <Link
            key={link.id}
            href={link.url}
            target="_blank"
            referrerPolicy="no-referrer"
            aria-label={link.name}
            title={link.name}
            className="text-ink hover:text-accent transition-colors"
          >
            {link.icon}
          </Link>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify lint passes**

Run: `pnpm lint`
Expected: no errors (the deprecation hints on `Linkedin`/`Twitter` are info-level and acceptable).

- [ ] **Step 3: Commit**

```bash
git add src/components/contact-list.tsx
git commit -m "redesign: simplify ContactList to bare icon row"
```

---

## Task 8: `Nav` restyle (Fieldwork link, plain text links)

**Files:**
- Modify: `src/components/nav.tsx`

- [ ] **Step 1: Replace `src/components/nav.tsx` entirely**

```tsx
"use client";

import * as React from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";

const sections = [
  { id: "about", name: "About" },
  { id: "fieldwork", name: "Fieldwork" },
  { id: "publications", name: "Publications" },
  { id: "contact", name: "Contact" },
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-20 backdrop-blur-[2px] bg-paper/70">
      <nav
        className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 md:px-0"
        aria-label="Global"
      >
        <a href="#about" className="font-display text-3xl text-ink hover:text-accent transition-colors -m-1.5 p-1.5">
          Andrea Cotes
        </a>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open main menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-sm bg-paper">
              <SheetHeader>
                <SheetTitle className="font-display text-2xl text-ink">
                  Andrea Cotes
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-1 px-4">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    onClick={() => setMobileOpen(false)}
                    className="py-2 font-sans text-base text-ink hover:text-accent transition-colors"
                  >
                    {section.name}
                  </a>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="hidden lg:flex lg:items-center lg:gap-6">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="font-sans text-sm tracking-wide text-ink hover:text-accent transition-colors"
            >
              {section.name}
            </a>
          ))}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
```

- [ ] **Step 2: Verify lint passes**

Run: `pnpm lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/nav.tsx
git commit -m "redesign: simplify Nav, add Fieldwork link"
```

---

## Task 9: Compose final `page.tsx` (uses all new components)

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace `src/app/page.tsx` entirely**

```tsx
import Link from "next/link";

import BirthdayCelebration from "@/components/birthday-celebration";
import ContactList from "@/components/contact-list";
import EducationList from "@/components/education-list";
import FieldSites from "@/components/field-sites";
import Hero from "@/components/hero";
import InterestList from "@/components/interest-list";
import Nav from "@/components/nav";
import PublicationList from "@/components/publication-list";

export default function Home() {
  return (
    <main>
      <BirthdayCelebration />
      <Nav />

      <div className="mx-auto max-w-3xl px-4 md:px-0">
        <Hero />
        <EducationList />
        <FieldSites />
        <PublicationList />
        <InterestList />
        <ContactList />

        <footer className="mt-8 mb-10 py-6 text-center font-display text-lg text-ink-mute">
          Made with <span className="text-accent">♥</span> by my handsome husband{" "}
          <Link
            className="text-ink underline decoration-accent/50 hover:decoration-accent hover:text-accent transition-colors"
            href="https://www.genesisguerrero.com/"
            target="_blank"
            referrerPolicy="no-referrer"
          >
            Genesis Guerrero
          </Link>
        </footer>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Verify lint passes**

Run: `pnpm lint`
Expected: no errors.

- [ ] **Step 3: Verify build passes**

Run: `pnpm build`
Expected: build completes with no errors. ESLint warnings only (e.g., deprecated lucide icons in contact-list).

- [ ] **Step 4: Visual review in dev server**

Run: `pnpm dev` (then open http://localhost:3000)

Confirm against the spec:
- Hero shows handwritten "Andrea Cotes Perdomo" in Caveat, polaroid photo tilted slightly, intro paragraph with rust "↙ that's the whole thesis" margin note, "fieldwork log · entry no. 042" running head.
- Education shows three rows with "2023 — 2026" etc. in tan Inter, institutions in Fraunces, faint horizontal rules.
- Field sites shows two-panel SVG (Colombia + Norway) with dashed arc, three-row summary log on the right.
- Publications grouped by year with year labels in dashed-underlined Inter all-caps. Three papers (215138519, 186605685, 172611258) show Caveat margin notes in rust.
- Off the clock shows a single sentence ("Besides ticks: parasitology, ticks and tick-borne diseases, molecular biology, dogs (heavy emphasis on dogs), and yoga.")
- Contact shows three icon links in a row.
- Footer is centered Caveat with rust heart.
- Toggle between light and dark — light is cream paper, dark is warm brown leather with cream text.
- Background shows a faint graph paper grid in both modes.

Stop the dev server (Ctrl-C) after the visual check.

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx
git commit -m "redesign: compose new page structure with all sections"
```

---

## Task 10: Remove unused components + final build check

**Files:**
- Delete: `src/components/profile-card.tsx`
- Delete: `src/components/about-me.tsx`

- [ ] **Step 1: Delete the merged components**

```bash
rm src/components/profile-card.tsx src/components/about-me.tsx
```

- [ ] **Step 2: Verify nothing imports them**

Run: `grep -rE "profile-card|about-me" src/`
Expected: no matches.

- [ ] **Step 3: Verify lint passes**

Run: `pnpm lint`
Expected: no errors.

- [ ] **Step 4: Verify build passes**

Run: `pnpm build`
Expected: build completes; no missing-module errors.

- [ ] **Step 5: Commit**

```bash
git add -A src/components/profile-card.tsx src/components/about-me.tsx
git commit -m "redesign: remove ProfileCard and AboutMe (merged into Hero)"
```

(Note: `git add -A` is used here on specific paths to stage deletions. The deletions will be staged correctly because each path is named explicitly.)

---

## Self-review checklist (run after all tasks complete)

- [ ] All 7 sections from the spec render: nav, hero, education, field sites, publications, off-the-clock, contact, footer.
- [ ] Light mode matches the cream-paper palette from the spec.
- [ ] Dark mode matches the leather palette from the spec.
- [ ] Theme toggle works without flash of unstyled content.
- [ ] Mobile drawer nav works (resize browser to <1024px width).
- [ ] All publication DOI links open in a new tab.
- [ ] All three highlighted publications show their margin notes.
- [ ] Birthday Easter egg unchanged (will not fire today; spot-check by changing system date or temporarily editing `isTodayBirthday` to return `true`, then revert).
- [ ] `/dio` page still renders the JoJo image full-bleed.
- [ ] Footer link to genesisguerrero.com still works.
- [ ] No console errors in browser devtools on initial page load.
- [ ] `pnpm build` completes with no errors.

---

## Notes for the implementing engineer

- **Tailwind 4 in this repo uses the CSS-first config** (`@theme inline { ... }` in `globals.css`). There is no `tailwind.config.ts`. Color tokens like `bg-paper`, `text-ink`, `border-accent` are declared in `globals.css` and become Tailwind utilities automatically.
- **Font tokens** (`font-display`, `font-serif`, `font-sans`) map to Caveat / Fraunces / Inter respectively. Use them consistently with what the spec says — Caveat for accents, Fraunces for body, Inter for small labels.
- **Don't add `tailwind.config.ts`**. If you find yourself wanting to, you've misread the v4 pattern.
- **`pnpm dev` is the visual verification tool.** There are no tests. Open localhost:3000 and check the relevant section before committing UI-visible changes.
- **Easter eggs are not in scope.** Do not touch `birthday-celebration.tsx` or `app/dio/page.tsx`.
- **The current portrait at `/andrea.jpeg`** is used as-is. If it looks cropped weirdly inside the 150×184 polaroid frame, that's an open question for Andrea — don't replace the asset without checking.
- **Margin notes are content.** The three `PUBLICATION_HIGHLIGHTS` entries ship as placeholders. If you can't decide whether to add/remove notes, leave them as written — Andrea edits this file directly.
