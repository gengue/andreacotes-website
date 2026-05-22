# Modernize Andrea Cotes Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade portfolio site to Next.js 16 + React 19.2 + Tailwind 4.3, rename all component files to kebab-case, refactor all components onto shadcn primitives with light visual polish.

**Architecture:** Staged migration on a feature branch (`modernize/next16-shadcn`). One commit per phase: deps → codemods → rename → shadcn install → component-by-component refactor → polish → cleanup → docs sync. Each phase verified with `pnpm build && pnpm lint` before moving on.

**Tech Stack:** Next.js 16, React 19.2, TypeScript 5.8, Tailwind CSS 4.3, shadcn/ui (CLI 4.8), Radix UI primitives, lucide-react icons, next-themes.

**Spec:** `docs/superpowers/specs/2026-05-22-modernize-nextjs-shadcn-design.md`

**Testing note:** Project has no testing framework (out of scope per spec). Verification = `pnpm build`, `pnpm lint`, manual browser smoke test at the end of each task.

---

## Task 1: Create feature branch + record baseline

**Files:**
- No files modified; this is a git operation

- [ ] **Step 1: Confirm clean working tree**

Run: `git status`
Expected: `nothing to commit, working tree clean` (the spec commit is already on main)

- [ ] **Step 2: Create feature branch**

Run: `git checkout -b modernize/next16-shadcn`
Expected: `Switched to a new branch 'modernize/next16-shadcn'`

- [ ] **Step 3: Run baseline build & lint to confirm starting state is green**

Run: `pnpm install && pnpm lint && pnpm build`
Expected: install completes; lint passes; build completes with all routes (`/`, `/dio`) compiled.

If build fails, stop and investigate — fix or document the pre-existing failure before continuing.

- [ ] **Step 4: Snapshot the dev server visually**

Run: `pnpm dev` (in another terminal)
Open `http://localhost:3000` and `http://localhost:3000/dio`.
Manually confirm both render without errors. Note in the PR description: "Baseline: both routes render, light + dark theme work."

Stop the dev server.

---

## Task 2: Upgrade Next.js, React, Tailwind, and related deps

**Files:**
- Modify: `package.json`
- Regenerated: `pnpm-lock.yaml`

- [ ] **Step 1: Apply Next.js 16 official upgrade codemod**

This codemod bumps `next`, `react`, `react-dom`, `eslint-config-next` and applies any code transforms.

Run: `pnpm dlx @next/codemod@canary upgrade latest`

When prompted, accept the latest stable Next 16 version. Accept the codemod's react/react-dom bump suggestion.

Expected: `package.json` updated; the codemod prints a summary of transforms applied (likely 0 or 1 since the codebase doesn't use `params`/`searchParams`).

- [ ] **Step 2: Bump Tailwind to 4.3.x**

Edit `package.json` — change these dependency lines:
- `"tailwindcss": "4.1.10"` → `"tailwindcss": "^4.3.0"`
- `"@tailwindcss/postcss": "^4.1.10"` → `"@tailwindcss/postcss": "^4.3.0"`

- [ ] **Step 3: Bump types and dev tooling**

Edit `package.json` — bump these to latest matching versions (use `^` ranges):
- `"@types/node": "24.0.3"` → `"@types/node": "^24.0.3"` (let pnpm resolve to current latest)
- `"@types/react": "19.1.8"` → `"@types/react": "^19.2.0"`
- `"@types/react-dom": "19.1.6"` → `"@types/react-dom": "^19.2.0"`
- `"eslint": "9.29.0"` → `"eslint": "^9.29.0"`

- [ ] **Step 4: Install with new versions**

Run: `pnpm install`
Expected: lockfile updates, no peer-dep errors. Mild warnings about deprecated transitives are acceptable.

- [ ] **Step 5: Verify lint passes**

Run: `pnpm lint`
Expected: PASS (no errors). If new Next 16 rules surface warnings, fix only those that are real bugs; suppress noise via `// eslint-disable-next-line` is NOT acceptable — fix the code.

- [ ] **Step 6: Verify build succeeds**

Run: `pnpm build`
Expected: build succeeds. Both routes (`/`, `/dio`) listed in the route table.

If build fails because of an async `params` change in `src/app/dio/page.tsx`, apply this fix:

```tsx
// src/app/dio/page.tsx
import Image from "next/image";

export default async function KonoDioDa() {
  return (
    <Image
      src="/andrea_dio.jpg"
      fill
      alt="Kono Dio Da - Andrea Cotes"
    />
  );
}
```

Note: the existing file already uses the deprecated `layout="fill"` prop; replace with `fill`. This is a Next 13+ change but worth catching now.

- [ ] **Step 7: Smoke test in browser**

Run: `pnpm dev` and verify `/` and `/dio` both render.

- [ ] **Step 8: Commit**

```bash
git add package.json pnpm-lock.yaml src/app/dio/page.tsx
git commit -m "chore(deps): upgrade to Next 16, React 19.2, Tailwind 4.3"
```

---

## Task 3: Rename component files to kebab-case

**Files:**
- Rename (via `git mv`): all 10 files in `src/components/` from PascalCase to kebab-case
- Modify: `src/app/page.tsx`, `src/app/layout.tsx`

- [ ] **Step 1: Rename component files using git mv**

Run each command in order:

```bash
git mv src/components/AboutMe.tsx src/components/about-me.tsx
git mv src/components/BirthdayCelebration.tsx src/components/birthday-celebration.tsx
git mv src/components/ContactList.tsx src/components/contact-list.tsx
git mv src/components/EducationList.tsx src/components/education-list.tsx
git mv src/components/InterestList.tsx src/components/interest-list.tsx
git mv src/components/Nav.tsx src/components/nav.tsx
git mv src/components/ProfileCard.tsx src/components/profile-card.tsx
git mv src/components/PublicationList.tsx src/components/publication-list.tsx
git mv src/components/ThemeProvider.tsx src/components/theme-provider.tsx
git mv src/components/ThemeToggle.tsx src/components/theme-toggle.tsx
```

Note for case-insensitive filesystems (macOS default): `git mv` handles the case-only rename correctly. Verify with `ls src/components/`.

- [ ] **Step 2: Update internal cross-component import in nav**

Open `src/components/nav.tsx`. Find the import:

```tsx
import { ThemeToggle } from "./ThemeToggle";
```

Replace with:

```tsx
import { ThemeToggle } from "./theme-toggle";
```

- [ ] **Step 3: Update src/app/page.tsx imports to use @/ alias**

Replace the existing imports at the top of `src/app/page.tsx`:

```tsx
import BirthdayCelebration from "./../components/BirthdayCelebration";
import Nav from "./../components/Nav";
import EducationList from "./../components/EducationList";
import PublicationList from "./../components/PublicationList";
import ProfileCard from "./../components/ProfileCard";
import InterestList from "./../components/InterestList";
import ContactList from "./../components/ContactList";
import AboutMe from "./../components/AboutMe";
```

with:

```tsx
import BirthdayCelebration from "@/components/birthday-celebration";
import Nav from "@/components/nav";
import EducationList from "@/components/education-list";
import PublicationList from "@/components/publication-list";
import ProfileCard from "@/components/profile-card";
import InterestList from "@/components/interest-list";
import ContactList from "@/components/contact-list";
import AboutMe from "@/components/about-me";
```

- [ ] **Step 4: Update src/app/layout.tsx import**

In `src/app/layout.tsx`, replace:

```tsx
import { ThemeProvider } from "../components/ThemeProvider";
```

with:

```tsx
import { ThemeProvider } from "@/components/theme-provider";
```

- [ ] **Step 5: Verify no stale PascalCase imports remain**

Run: `grep -rn "components/[A-Z]" src/`
Expected: no output (empty result). If any line is shown, fix that import.

Also: `grep -rn "\\.\\./components" src/ ; grep -rn "\\./\\.\\.\\/components" src/`
Expected: no output.

- [ ] **Step 6: Verify lint + build**

Run: `pnpm lint && pnpm build`
Expected: both PASS, build completes, both routes compile.

- [ ] **Step 7: Smoke test**

Run: `pnpm dev` and verify `/` and `/dio` still render.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "refactor: rename components to kebab-case + use @/ alias"
```

---

## Task 4: Install shadcn primitives

**Files:**
- Create: `src/components/ui/avatar.tsx`
- Create: `src/components/ui/badge.tsx`
- Create: `src/components/ui/card.tsx`
- Create: `src/components/ui/separator.tsx`
- Create: `src/components/ui/dropdown-menu.tsx`
- Create: `src/components/ui/sheet.tsx`
- Modify: `src/components/ui/button.tsx` (potentially, if CLI generates a newer version)
- Modify: `package.json` (Radix UI deps added)

- [ ] **Step 1: Install primitives via shadcn CLI**

Run: `pnpm dlx shadcn@latest add card avatar badge separator dropdown-menu sheet`

When prompted:
- Overwrite existing `button.tsx`? **No** (unless the CLI flags it as outdated)
- Use existing `components.json` config? **Yes** (it's already set)

Expected: 6 new files in `src/components/ui/`; new Radix UI deps in `package.json` (`@radix-ui/react-avatar`, `@radix-ui/react-dialog` for sheet, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-separator`, possibly `vaul` for sheet).

- [ ] **Step 2: Verify primitives exist**

Run: `ls src/components/ui/`
Expected output includes: `avatar.tsx`, `badge.tsx`, `button.tsx`, `card.tsx`, `dropdown-menu.tsx`, `separator.tsx`, `sheet.tsx`.

- [ ] **Step 3: Verify build still succeeds (unused primitives are fine)**

Run: `pnpm build`
Expected: PASS. Tree-shaking will remove unused primitives from the final bundle.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/ package.json pnpm-lock.yaml
git commit -m "feat: install shadcn primitives (card, avatar, badge, separator, dropdown-menu, sheet)"
```

---

## Task 5: Refactor profile-card to use Card + Avatar

**Files:**
- Modify: `src/components/profile-card.tsx`

- [ ] **Step 1: Rewrite profile-card.tsx**

Replace the entire contents of `src/components/profile-card.tsx` with:

```tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

export default function ProfileCard() {
  return (
    <Card className="border-0 bg-transparent shadow-none">
      <CardContent className="flex flex-col items-center px-2">
        <Avatar className="size-[230px]">
          <AvatarImage
            src="/andrea.jpeg"
            alt="Andrea Cotes Perdomo"
            className="object-cover"
          />
          <AvatarFallback>AC</AvatarFallback>
        </Avatar>
        <div className="mt-4 text-2xl font-bold text-primary">
          Andrea Cotes Perdomo
        </div>
        <div className="text-lg text-muted-foreground">
          PhD Candidate in Ecology
        </div>
        <div className="text-lg text-muted-foreground">
          University of South-Eastern, Norway
        </div>
      </CardContent>
    </Card>
  );
}
```

Notes:
- `Avatar` provides the rounded clipping and accessible fallback (`AC` initials shown if the image fails).
- `Card` is left visually transparent here because `ProfileCard` is rendered inside the homepage's flex row alongside `AboutMe`. Surrounding `Card` framing happens at `AboutMe`.
- `text-foreground/80` → `text-muted-foreground` is the semantic-token replacement called out in the spec.
- `next/image` is intentionally dropped for this single hero image — `AvatarImage` is a plain `img` and Radix doesn't support `asChild` for an `Image` substitute cleanly. The minor loss of next/image's optimization is acceptable for one 230×230 portrait.

- [ ] **Step 2: Verify lint + build**

Run: `pnpm lint && pnpm build`
Expected: PASS.

- [ ] **Step 3: Browser smoke test**

Run: `pnpm dev` and verify `ProfileCard` renders the avatar + name + titles in both light and dark mode.

- [ ] **Step 4: Commit**

```bash
git add src/components/profile-card.tsx
git commit -m "refactor(profile-card): use shadcn Card + Avatar primitives"
```

---

## Task 6: Refactor about-me to use Card

**Files:**
- Modify: `src/components/about-me.tsx`

- [ ] **Step 1: Rewrite about-me.tsx**

Replace the entire contents of `src/components/about-me.tsx` with:

```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutMe() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl text-center">About me</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="leading-relaxed">
          I&apos;m Andrea, a Colombian biologist currently based in Norway. My
          research focuses on analyzing the relationship between pathogenic
          microorganisms transmitted by ticks and seasonal variation to
          understand potential outcomes under climate change influence.
        </p>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Background & Expertise</h3>
          <p className="leading-relaxed">
            My work began with tick-borne diseases in Colombia, studying ticks
            from reptiles, amphibians, cattle, and poultry. I continue
            researching the systematics of the Amblyomma genus and their
            associated bacteria, with broad interests in the evolution and
            ectoparasites and vector-borne pathogens.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
```

- [ ] **Step 2: Verify lint + build**

Run: `pnpm lint && pnpm build`
Expected: PASS.

- [ ] **Step 3: Browser smoke test**

Run: `pnpm dev` and verify `About me` section renders inside a card with the header + body.

- [ ] **Step 4: Commit**

```bash
git add src/components/about-me.tsx
git commit -m "refactor(about-me): wrap in shadcn Card"
```

---

## Task 7: Refactor interest-list to use Badges

**Files:**
- Modify: `src/components/interest-list.tsx`

- [ ] **Step 1: Rewrite interest-list.tsx**

Replace the entire contents of `src/components/interest-list.tsx` with:

```tsx
import { Badge } from "@/components/ui/badge";

const interests = [
  "Parasitology",
  "Ticks and Tick-borne Diseases",
  "Molecular biology",
  "I love dogs 🐶",
  "Yoga",
];

export default function InterestList() {
  return (
    <div className="w-full">
      <h3 className="text-xl">Interests</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {interests.map((interest) => (
          <Badge key={interest} variant="secondary" className="text-sm">
            {interest}
          </Badge>
        ))}
      </div>
    </div>
  );
}
```

Notes:
- The bullet list becomes a wrap of pill-shaped badges. Same content, more modern presentation, no layout reflow (still sits inside the same flex container in `page.tsx`).

- [ ] **Step 2: Verify lint + build**

Run: `pnpm lint && pnpm build`
Expected: PASS.

- [ ] **Step 3: Browser smoke test**

Run: `pnpm dev` and verify interests appear as badges in both themes.

- [ ] **Step 4: Commit**

```bash
git add src/components/interest-list.tsx
git commit -m "refactor(interest-list): use shadcn Badge primitives"
```

---

## Task 8: Refactor education-list to use Card + Separator

**Files:**
- Modify: `src/components/education-list.tsx`

- [ ] **Step 1: Rewrite education-list.tsx**

Replace the entire contents of `src/components/education-list.tsx` with:

```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const education = [
  {
    id: 1,
    institution: "University of South-Eastern Norway",
    title: "Doctor of Philosophy in Ecology",
    startYear: 2023,
    endYear: null,
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

export default function EducationList() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Education</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {education.map((item, index) => (
          <div key={item.id}>
            <div className="text-lg font-semibold text-primary">
              {item.institution}
            </div>
            <div className="text-base text-muted-foreground">{item.title}</div>
            <div className="text-sm text-muted-foreground/70">
              {item.startYear} - {item.endYear ?? "Present"}
            </div>
            {index < education.length - 1 && <Separator className="mt-4" />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
```

Notes:
- The render-the-separator-only-between-items pattern (`index < length - 1`) avoids a trailing separator.
- `text-foreground/80` → `text-muted-foreground`; `text-foreground/50` → `text-muted-foreground/70`.

- [ ] **Step 2: Verify lint + build**

Run: `pnpm lint && pnpm build`
Expected: PASS.

- [ ] **Step 3: Browser smoke test**

Run: `pnpm dev` and verify education renders inside a card with separators between entries.

- [ ] **Step 4: Commit**

```bash
git add src/components/education-list.tsx
git commit -m "refactor(education-list): use shadcn Card + Separator"
```

---

## Task 9: Refactor publication-list to use Card per entry

**Files:**
- Modify: `src/components/publication-list.tsx`

- [ ] **Step 1: Rewrite publication-list.tsx**

Replace the entire contents of `src/components/publication-list.tsx` with:

```tsx
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const formatDate = (date: Date) => {
  const config: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("en-GB", config);
};

const publications = [
  {
    id: 293,
    title:
      "New insights into the molecular phylogeny, biogeographical history, and diversification of Amblyomma ticks (Acari: Ixodidae) based on mitogenomes and nuclear sequences",
    subtitle: "Parasites and Vectors",
    date: new Date(2024, 2, 18),
    url: "https://parasitesandvectors.biomedcentral.com/articles/10.1186/s13071-024-06131-w",
  },
  {
    id: 666,
    title:
      "New insights into the systematics of the afrotropical Amblyomma marmoreum complex (Acari: Ixodidae) and the genome of a novel Rickettsia africae strain using morphological and metagenomic approaches",
    subtitle: "Ticks and Tick-borne Diseases",
    date: new Date(2024, 4, 1),
    url: "https://www.sciencedirect.com/science/article/pii/S1877959X24000165",
  },
  {
    id: 1,
    title:
      "Phylogenetic relationships of the Amblyomma cajennense complex (Acari: Ixodidae) at mitogenomic resolution",
    subtitle: "Ticks and Tick-borne Diseases",
    date: new Date(2023, 0, 25),
    url: "https://www.sciencedirect.com/science/article/pii/S1877959X23000079?via%3Dihub",
  },
  {
    id: 2,
    title:
      "Molecular detection of Candidatus Rickettsia colombianensi in ticks (Acari, Ixodidae) collected from herpetofauna in San Juan de Carare, Colombia",
    subtitle: "International journal for parasitology parasites and wildlife",
    date: new Date(2022, 11, 10),
    url: "https://www.sciencedirect.com/science/article/pii/S221322442200075X?via%3Dihub",
  },
  {
    id: 3,
    title:
      "Molecular detection of pathogens in ticks associated with domestic animals from the Colombian Caribbean region",
    subtitle: "Experimental and Applied Acarology",
    date: new Date(2020, 8, 18),
    url: "https://link.springer.com/article/10.1007/s10493-020-00531-0",
  },
  {
    id: 4,
    title:
      "Molecular detection of Rickettsia spp., Anaplasma platys and Theileria equi in ticks collected from horses in Tayrona National Park, Colombia",
    subtitle: "Experimental and Applied Acarology",
    date: new Date(2019, 0, 1),
    url: "https://link.springer.com/article/10.1007/s10493-019-00354-8",
  },
  {
    id: 5,
    title:
      "Hemogregarine and Rickettsial infection in ticks of toads from northeastern Colombia",
    subtitle: "International Journal for Parasitology: Parasites and Wildlife",
    date: new Date(2018, 5, 25),
    url: "https://www.sciencedirect.com/science/article/pii/S2213224418300397",
  },
  {
    id: 6,
    title:
      "Rickettsial infection in ticks (Acari: Ixodidae) from reptiles in the Colombian Caribbean",
    subtitle: "Ticks and Tick-borne Diseases",
    date: new Date(2018, 2, 15),
    url: "https://www.sciencedirect.com/science/article/abs/pii/S1877959X1730208X",
  },
];

export default function PublicationList() {
  return (
    <div className="flex flex-col gap-3">
      {publications.map((publication) => (
        <Card
          key={publication.id}
          className="transition-shadow hover:shadow-md"
        >
          <CardContent className="p-4">
            <Link
              href={publication.url}
              target="_blank"
              referrerPolicy="no-referrer"
              className="text-xl font-medium text-primary hover:underline hover:underline-offset-2"
            >
              {publication.title}
            </Link>
            <p className="mt-1 text-lg text-muted-foreground">
              {publication.subtitle}
            </p>
            <div className="mt-2">
              <Badge variant="outline" className="text-xs">
                {formatDate(publication.date)}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
```

Notes:
- Each publication is its own `Card` (replaces the `divide-y` list pattern).
- Publication date becomes a `Badge` for stronger visual treatment.
- Hardcoded color leftovers replaced with semantic tokens (`text-muted-foreground`).

- [ ] **Step 2: Verify lint + build**

Run: `pnpm lint && pnpm build`
Expected: PASS.

- [ ] **Step 3: Browser smoke test**

Run: `pnpm dev` and verify publications render as cards with hover shadow in both themes.

- [ ] **Step 4: Commit**

```bash
git add src/components/publication-list.tsx
git commit -m "refactor(publication-list): one Card per publication + Badge for date"
```

---

## Task 10: Refactor contact-list — Button + lucide icons

**Files:**
- Modify: `src/components/contact-list.tsx`

- [ ] **Step 1: Rewrite contact-list.tsx**

Replace the entire contents of `src/components/contact-list.tsx` with:

```tsx
import Image from "next/image";
import Link from "next/link";
import { Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

const contactLinks = [
  {
    id: "linkedin",
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/andrea-paola-cotes-perdomo-5a65a259/",
    icon: <Linkedin className="size-6" />,
  },
  {
    id: "twitter",
    name: "Twitter",
    url: "https://twitter.com/andreacotes1",
    icon: <Twitter className="size-6" />,
  },
  {
    id: "researchgate",
    name: "Research Gate",
    url: "https://www.researchgate.net/profile/Andrea-Cotes-Perdomo",
    icon: (
      <Image
        src="/research_gate_logo.png"
        alt="Research Gate logo"
        width={24}
        height={24}
      />
    ),
  },
];

export default function ContactList() {
  return (
    <div className="mt-4 flex items-center justify-center gap-3">
      {contactLinks.map((link) => (
        <Button
          key={link.id}
          asChild
          variant="outline"
          size="icon"
          aria-label={link.name}
        >
          <Link
            href={link.url}
            target="_blank"
            referrerPolicy="no-referrer"
            title={link.name}
          >
            {link.icon}
          </Link>
        </Button>
      ))}
    </div>
  );
}
```

Notes:
- `react-icons` swap → `lucide-react` (`Linkedin`, `Twitter`). Research Gate logo stays as `Image` because there's no lucide equivalent.
- `Button asChild` lets the `Link` be the actual anchor while inheriting button styling.

- [ ] **Step 2: Verify lint + build**

Run: `pnpm lint && pnpm build`
Expected: PASS.

- [ ] **Step 3: Browser smoke test**

Run: `pnpm dev` and verify the three contact buttons render and link out correctly.

- [ ] **Step 4: Commit**

```bash
git add src/components/contact-list.tsx
git commit -m "refactor(contact-list): use shadcn Button + lucide-react icons"
```

---

## Task 11: Refactor theme-toggle to DropdownMenu (Light/Dark/System)

**Files:**
- Modify: `src/components/theme-toggle.tsx`
- Modify: `src/app/layout.tsx` (enable system theme)

- [ ] **Step 1: Rewrite theme-toggle.tsx**

Replace the entire contents of `src/components/theme-toggle.tsx` with:

```tsx
"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" aria-label="Toggle theme">
        <Sun className="size-5" />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Toggle theme">
          <Sun className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

- [ ] **Step 2: Enable system theme in the provider**

In `src/app/layout.tsx`, change:

```tsx
<ThemeProvider
  attribute="class"
  defaultTheme="dark"
  enableSystem={false}
>
```

to:

```tsx
<ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
>
```

- [ ] **Step 3: Verify lint + build**

Run: `pnpm lint && pnpm build`
Expected: PASS.

- [ ] **Step 4: Browser smoke test**

Run: `pnpm dev`. Click the theme toggle in the header. Light/Dark/System options should appear. Switching them must update the page.

- [ ] **Step 5: Commit**

```bash
git add src/components/theme-toggle.tsx src/app/layout.tsx
git commit -m "refactor(theme-toggle): use DropdownMenu with Light/Dark/System"
```

---

## Task 12: Refactor nav — Button (ghost) + Sheet for mobile menu

**Files:**
- Modify: `src/components/nav.tsx`

- [ ] **Step 1: Rewrite nav.tsx**

Replace the entire contents of `src/components/nav.tsx` with:

```tsx
"use client";

import * as React from "react";
import { Menu } from "lucide-react";
import { Caveat } from "next/font/google";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";

const caveat = Caveat({
  weight: ["600"],
  style: ["normal"],
  subsets: ["latin"],
});

const sections = [
  { id: "about", name: "About me" },
  { id: "publications", name: "Publications" },
  { id: "contact", name: "Contact" },
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <header>
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="#about" className={`${caveat.className} -m-1.5 p-1.5`}>
            <span className="text-4xl font-bold text-primary">Andrea Cotes</span>
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open main menu">
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-sm">
              <SheetHeader>
                <SheetTitle className="text-xl text-primary">Andrea Cotes</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-1 px-4">
                {sections.map((section) => (
                  <Button
                    key={section.id}
                    asChild
                    variant="ghost"
                    className="justify-start"
                    onClick={() => setMobileOpen(false)}
                  >
                    <a href={`#${section.id}`}>{section.name}</a>
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="hidden lg:flex lg:items-center lg:gap-x-2">
          {sections.map((section) => (
            <Button key={section.id} asChild variant="ghost">
              <a href={`#${section.id}`}>{section.name}</a>
            </Button>
          ))}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
```

Notes:
- The `@headlessui/react` `Dialog` + `Popover` are gone — replaced by shadcn `Sheet`. Removing the headless-ui dep happens in the cleanup task (Task 14).
- The two `MenuIcon`/`CloseIcon` from `react-icons` are gone — replaced by `lucide-react` `Menu`. (The Sheet provides its own close button, so no `X` icon import needed.)
- Component export renamed from `Header` to `Nav` to match its filename — the import in `page.tsx` already uses default export, so the name only matters in dev tools.

- [ ] **Step 2: Verify lint + build**

Run: `pnpm lint && pnpm build`
Expected: PASS.

- [ ] **Step 3: Browser smoke test**

Run: `pnpm dev`. On desktop width, the three nav buttons should render with the theme toggle. On mobile width (resize browser), the menu icon should open the Sheet with the same links.

Click each nav link; verify section anchors `#about`, `#publications`, `#contact` scroll into view.

- [ ] **Step 4: Commit**

```bash
git add src/components/nav.tsx
git commit -m "refactor(nav): use shadcn Button + Sheet for mobile menu"
```

---

## Task 13: Light polish — typography rhythm + section spacing

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Rewrite page.tsx with normalized spacing + headings**

Replace the entire contents of `src/app/page.tsx` with:

```tsx
import { Montserrat } from "next/font/google";
import Link from "next/link";

import AboutMe from "@/components/about-me";
import BirthdayCelebration from "@/components/birthday-celebration";
import ContactList from "@/components/contact-list";
import EducationList from "@/components/education-list";
import InterestList from "@/components/interest-list";
import Nav from "@/components/nav";
import ProfileCard from "@/components/profile-card";
import PublicationList from "@/components/publication-list";

const font = Montserrat({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={font.className}>
      <BirthdayCelebration />
      <Nav />

      <section
        id="about"
        className="container mx-auto max-w-4xl px-4 py-12"
      >
        <div className="flex flex-col items-center justify-center md:flex-row">
          <div className="basis-2/5">
            <ProfileCard />
          </div>
          <div className="basis-3/5 p-4">
            <AboutMe />
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-6 md:mt-12 md:flex-row md:gap-8">
          <EducationList />
          <InterestList />
        </div>
      </section>

      <section
        id="publications"
        className="container mx-auto max-w-4xl px-4 py-12"
      >
        <h2 className="mb-8 text-center text-3xl font-bold tracking-tight">
          Publications
        </h2>
        <PublicationList />
      </section>

      <section
        id="contact"
        className="container mx-auto min-h-[12rem] px-4 py-12"
      >
        <h2 className="mb-4 text-center text-3xl font-bold tracking-tight">
          Get in touch
        </h2>
        <p className="text-center text-lg text-muted-foreground">
          I would love to hear from you if you would like to collaborate or have
          questions!
        </p>
        <ContactList />
      </section>

      <footer className="my-8 text-center text-muted-foreground">
        Made with ❤ by my handsome husband{" "}
        <Link
          className="underline transition-colors hover:text-primary"
          href="https://www.genesisguerrero.com/"
          target="_blank"
          referrerPolicy="no-referrer"
        >
          Genesis Guerrero
        </Link>
      </footer>
    </main>
  );
}
```

Notes:
- Single section vertical rhythm: `py-12` everywhere (replaces the `my-4 mb-8 mt-4` mix).
- Section heading style normalized: `text-3xl font-bold tracking-tight`. Removed ad-hoc `my-8 w-full` padding shimming.
- Hardcoded `text-slate-700 dark:text-slate-400` and `hover:text-emerald-700 dark:hover:text-emerald-400` → semantic `text-muted-foreground` and `hover:text-primary`.
- Imports re-ordered alphabetically for consistency.

- [ ] **Step 2: Verify lint + build**

Run: `pnpm lint && pnpm build`
Expected: PASS.

- [ ] **Step 3: Browser smoke test**

Run: `pnpm dev`. Verify:
- All three sections render with consistent vertical breathing room
- Section headings look the same size
- Footer link styles correctly in both themes
- Anchor links (clicking nav items) still scroll to sections

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "polish: normalize section spacing + use semantic color tokens"
```

---

## Task 14: Remove unused dependencies

**Files:**
- Modify: `package.json`
- Regenerated: `pnpm-lock.yaml`

- [ ] **Step 1: Confirm react-icons has no remaining usage**

Run: `grep -rn "react-icons" src/`
Expected: no output.

If any line is shown, fix it (likely a missed component) before continuing.

- [ ] **Step 2: Confirm @headlessui/react has no remaining usage**

Run: `grep -rn "@headlessui/react" src/`
Expected: no output.

- [ ] **Step 3: Remove the unused deps**

Run: `pnpm remove react-icons @headlessui/react`

Expected: both packages removed from `package.json`; lockfile updated.

- [ ] **Step 4: Verify build still passes after removal**

Run: `pnpm install && pnpm lint && pnpm build`
Expected: all PASS.

- [ ] **Step 5: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: drop unused deps (react-icons, @headlessui/react)"
```

---

## Task 15: Update CLAUDE.md to reflect new stack

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Update the Technology Stack section**

In `CLAUDE.md`, find this block:

```markdown
## Technology Stack

- **Framework**: Next.js 15.3.3 with App Router
- **Language**: TypeScript 5.8.3
- **Styling**: Tailwind CSS 4.1.10
- **UI Components**: Headless UI, React Icons
- **Package Manager**: pnpm (pnpm-lock.yaml present)
```

Replace with:

```markdown
## Technology Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript 5.8
- **Styling**: Tailwind CSS 4.3
- **UI Components**: shadcn/ui (Radix UI primitives) — components in `src/components/ui/`
- **Icons**: lucide-react
- **Theming**: next-themes (light / dark / system)
- **Package Manager**: pnpm
```

- [ ] **Step 2: Update the Project Overview line**

Find the line:

```markdown
This is Andrea Cotes' personal portfolio website built with Next.js 13.3 using the experimental App Router.
```

Replace with:

```markdown
This is Andrea Cotes' personal portfolio website built with Next.js 16 using the App Router.
```

- [ ] **Step 3: Update the Project Architecture section**

Find the `src/` tree under "Project Architecture" and replace the components listing to reflect kebab-case + the new `ui/` subdir:

```markdown
src/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout, ThemeProvider
│   ├── page.tsx                # Homepage
│   ├── globals.css             # Tailwind + theme tokens
│   └── dio/page.tsx            # Subpage
├── components/                 # Feature components (kebab-case)
│   ├── about-me.tsx
│   ├── birthday-celebration.tsx
│   ├── contact-list.tsx
│   ├── education-list.tsx
│   ├── interest-list.tsx
│   ├── nav.tsx
│   ├── profile-card.tsx
│   ├── publication-list.tsx
│   ├── theme-provider.tsx
│   ├── theme-toggle.tsx
│   └── ui/                     # shadcn primitives
└── lib/utils.ts                # cn() helper
```

- [ ] **Step 4: Verify rendering of CLAUDE.md (visual only — no command)**

Open `CLAUDE.md` in any markdown viewer or just `Read` it to confirm the sections look right.

- [ ] **Step 5: Final build + lint check on the whole branch**

Run: `pnpm lint && pnpm build`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: sync CLAUDE.md with Next 16 + shadcn stack"
```

---

## Task 16: Final QA + branch ready for merge

**Files:**
- No file changes — verification only

- [ ] **Step 1: Run all gates one last time**

```bash
pnpm install
pnpm lint
pnpm build
```

All three must PASS.

- [ ] **Step 2: Full browser smoke**

Run: `pnpm dev`

Manually check:
- `/` — all sections render: hero (profile + about-me cards), education + interests row, publications cards, contact buttons, footer
- `/dio` — image renders
- Theme toggle — switch Light → Dark → System; verify all components respond correctly
- Mobile width — open the nav Sheet via the menu icon; click a link; sheet closes; section scrolls
- Section anchors — clicking each nav link scrolls to the right section
- Birthday celebration — verify it renders only on June 19 (the existing logic in `birthday-celebration.tsx` is untouched; if today's date matches, confetti should appear)

- [ ] **Step 3: Verify no stale references in code**

```bash
grep -rn "components/[A-Z]" src/
grep -rn "react-icons" src/
grep -rn "@headlessui/react" src/
grep -rn "\\.\\./components" src/
```

All four must produce empty output.

- [ ] **Step 4: Show diff summary against main**

Run: `git log --oneline main..HEAD`
Expected: a clean sequence of commits — one per task above.

- [ ] **Step 5: Hand off**

The branch `modernize/next16-shadcn` is ready. The user decides whether to:
- Open a PR (`gh pr create`)
- Merge directly to main (`git checkout main && git merge --no-ff modernize/next16-shadcn`)

Do NOT push or create a PR without explicit user confirmation.

---

## Self-Review checklist (already performed)

- All spec sections covered: file layout (Task 3), Phase 1 deps (Task 2), Phase 2 rename (Task 3), Phase 3 shadcn install (Task 4), Phase 4 component refactor (Tasks 5–12), Phase 5 polish + docs (Tasks 13, 15), dep cleanup (Task 14), final QA (Task 16).
- No placeholders. Every code block is complete.
- Type/component names consistent: `ThemeToggle` (named export), `Nav`/`ProfileCard`/etc. (default exports) match across imports.
- `Sheet` added to shadcn install list (not in original spec) because nav refactor drops `@headlessui/react` Dialog — flagged in Task 12 notes.
