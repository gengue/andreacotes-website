# Modernize Andrea Cotes Portfolio — Next.js 16 + shadcn migration

**Date:** 2026-05-22
**Branch (target):** `modernize/next16-shadcn`
**Scope:** Tech stack upgrade + kebab-case rename + full shadcn primitive migration with light visual polish. No content changes, no layout reflow, no new sections.

## Goal

Bring the portfolio up to current versions of Next.js, React, Tailwind, and shadcn; standardize file naming to kebab-case; refactor existing components onto shadcn primitives so future work has a consistent foundation.

## Current state (2026-05-22)

- Next.js 15.3.3, React 19.1.0, Tailwind 4.1.10
- shadcn partially configured: `components.json` present, only `button.tsx` installed
- Component files in PascalCase, imports use `./../components/...`
- `react-icons` and `lucide-react` both present (overlap)
- `CLAUDE.md` says "Next.js 13.3" — stale, needs sync

## Target state

- Next.js 16.x, React 19.2.x, Tailwind 4.3.x, shadcn CLI 4.8.x
- All component files in kebab-case under `src/components/`; exports remain PascalCase
- shadcn primitives: `button`, `card`, `avatar`, `badge`, `separator`, `dropdown-menu` — all under `src/components/ui/`
- Custom components refactored to use shadcn primitives consistently
- Imports use `@/components/...` alias
- `react-icons` removed (replaced by `lucide-react`) unless grep finds non-migratable usage

## Final file layout

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── favicon.ico
│   └── dio/
│       └── page.tsx
├── components/
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
│   └── ui/
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── dropdown-menu.tsx
│       └── separator.tsx
└── lib/
    └── utils.ts
```

App Router folder names (`app/`, `dio/`) remain unchanged — they map to URL segments.

## Migration phases

Each phase = one commit on `modernize/next16-shadcn`. Verification gate (`pnpm build && pnpm lint`) must pass before next phase.

### Phase 1 — Dependency upgrade

- Bump `next` 15.3.3 → 16.x
- Bump `react`, `react-dom` 19.1 → 19.2
- Bump `tailwindcss` 4.1 → 4.3; bump `@tailwindcss/postcss` to match
- Bump `eslint-config-next` to match Next 16
- Bump `@types/node`, `@types/react`, `@types/react-dom` to latest
- Run `npx @next/codemod@canary upgrade latest` for Next 16 codemods (async `params`/`searchParams`, etc.)
- Audit `react-icons` usage — only `contact-list.tsx` should reference it; if so, defer removal to Phase 4 swap
- Verify: `pnpm build`, `pnpm lint`, dev server renders `/` and `/dio`

### Phase 2 — kebab-case rename

- `git mv` each component file from PascalCase to kebab-case (preserves history)
- Update all imports in `src/app/page.tsx`, `src/app/dio/page.tsx`, `src/app/layout.tsx`, and any cross-component imports
- Convert relative imports (`./../components/Foo`) → alias imports (`@/components/foo`)
- Component **exports** stay PascalCase (`AboutMe`, `ProfileCard`, etc.)
- Verify: `pnpm build` + browser smoke test

### Phase 3 — shadcn primitives install

- `pnpm dlx shadcn@latest add card avatar badge separator dropdown-menu`
- Re-run `pnpm dlx shadcn@latest add button` if the existing `button.tsx` is stale relative to CLI 4.8
- Verify: `pnpm build` clean (no unused-import warnings from un-wired primitives is fine)

### Phase 4 — Component refactor

Order: leaf components first, then composite, then theme/nav.

| File | Refactor |
|---|---|
| `profile-card.tsx` | Wrap in `Card`; replace headshot with `Avatar` + `AvatarImage` + `AvatarFallback` |
| `about-me.tsx` | Wrap in `Card` with `CardHeader` + `CardContent` |
| `interest-list.tsx` | Each interest → `<Badge variant="secondary">` |
| `education-list.tsx` | Single `Card`; entries separated by `Separator` |
| `publication-list.tsx` | Each publication → `Card` with title, authors, `Badge` for venue/year |
| `contact-list.tsx` | Swap `react-icons` → `lucide-react`; each contact → `<Button variant="outline">` link |
| `nav.tsx` | Section nav links → `<Button variant="ghost">`; keep custom layout |
| `theme-toggle.tsx` | Standard shadcn pattern: `Button` + `DropdownMenu` with Light/Dark/System |
| `birthday-celebration.tsx` | Rename only, no logic change |
| `theme-provider.tsx` | Rename only |

After all components are migrated, remove `react-icons` from `package.json` if grep confirms zero remaining usage.

### Phase 5 — Light polish + docs sync

- Standardize section heading sizes (currently ad-hoc `text-3xl`). Define one heading scale and apply to all three `<section>` headings.
- Unify section spacing — pick a single vertical rhythm (e.g. `py-12`) and replace the mix of `my-4`/`my-8`/`mb-8`.
- Replace hardcoded color classes (`text-slate-700`, `hover:text-emerald-700`, etc.) with shadcn semantic tokens (`text-muted-foreground`, `text-primary`) where appropriate.
- Verify dark mode for every refactored component.
- Section anchors (`#about`, `#publications`, `#contact`) MUST keep working — nav links scroll to them.
- Update `CLAUDE.md`: fix "Next.js 13.3" → current version, mention shadcn setup, mention `lucide-react` as the icon library.

## Verification

**Per-phase gates:**
- `pnpm install` clean (no new peer-dep warnings)
- `pnpm lint` passes
- `pnpm build` passes
- `pnpm dev` — manual smoke: `/` renders, `/dio` renders, theme toggle works, section anchors scroll

**Final acceptance:**
- All `src/components/` files are kebab-case
- Zero imports use `./../components/...`
- `react-icons` removed from `package.json` (unless deliberately kept)
- `next`, `react`, `tailwindcss` at Phase 1 target versions
- Light + dark themes both render correctly
- Lighthouse performance on `/` not worse than baseline (quick before/after)

## Rollback

Phases are separate commits → `git revert <hash>` if any phase regresses. Work on `modernize/next16-shadcn`; merge to `main` only after manual QA.

## Out of scope

- No testing framework added
- No SEO/metadata rework
- No analytics
- No content edits (publications, about-me text, interests)
- No new pages or sections
- No hero/layout redesign
- No motion/animation library
- No font change (Montserrat stays)

## Open risks

- **Next 16 async `params`:** `/dio/page.tsx` may need updating if it reads `params`. Codemod should handle it; manual check after Phase 1.
- **Tailwind 4.3 minor:** unlikely to break, but watch for changes in CSS variable defaults that could affect shadcn theming.
- **shadcn CLI 4.8 button drift:** existing `button.tsx` may not match what `shadcn@latest add button` produces. Compare and re-install if needed.
