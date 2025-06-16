# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Andrea Cotes' personal portfolio website built with Next.js 13.3 using the experimental App Router. It's a single-page application showcasing academic and personal information.

## Technology Stack

- **Framework**: Next.js 15.3.3 with App Router
- **Language**: TypeScript 5.8.3
- **Styling**: Tailwind CSS 4.1.10
- **UI Components**: Headless UI, React Icons
- **Package Manager**: pnpm (pnpm-lock.yaml present)

## Development Commands

```bash
pnpm dev      # Start development server on http://localhost:3000
pnpm build    # Build for production
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

## Project Architecture

The codebase follows Next.js 13 App Router structure:

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Homepage
│   └── dio/page.tsx       # Subpage route
└── components/            # Reusable React components
    ├── AboutMe.tsx        # About section
    ├── ContactList.tsx    # Contact information
    ├── EducationList.tsx  # Education history
    ├── InterestList.tsx   # Personal interests
    ├── Nav.tsx            # Navigation
    ├── ProfileCard.tsx    # Profile display
    └── PublicationList.tsx # Academic publications
```

## Key Considerations

1. **No Testing Framework**: The project currently has no testing setup
2. **Styling**: Uses Tailwind CSS with utility classes
3. **TypeScript**: Strict mode is enabled in tsconfig.json
4. **Linting**: Uses Next.js ESLint configuration (next/core-web-vitals)
5. **Git**: The repository tracks changes, avoid committing unless explicitly requested