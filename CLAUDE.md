# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Andrea Cotes' personal portfolio website built with Next.js 16 using the App Router. It's a single-page application showcasing academic and personal information.

## Technology Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript 5.8
- **Styling**: Tailwind CSS 4.3
- **UI Components**: shadcn/ui (Radix UI primitives) — components in `src/components/ui/`
- **Icons**: lucide-react
- **Theming**: next-themes (light / dark / system)
- **Package Manager**: pnpm

## Development Commands

```bash
pnpm dev      # Start development server on http://localhost:3000
pnpm build    # Build for production
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

## Project Architecture

The codebase follows Next.js App Router structure:

```
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

## Key Considerations

1. **No Testing Framework**: The project currently has no testing setup
2. **Styling**: Uses Tailwind CSS with utility classes
3. **TypeScript**: Strict mode is enabled in tsconfig.json
4. **Linting**: Uses Next.js ESLint configuration (next/core-web-vitals)
5. **Git**: The repository tracks changes, avoid committing unless explicitly requested