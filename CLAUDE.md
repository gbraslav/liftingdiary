# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a Next.js 16 app (App Router) located in the `my-app/` subdirectory.

All development work happens inside `my-app/`.

## Commands

Run from `my-app/`:

```bash
npm run dev      # Start dev server on localhost:3000
npm run build    # Production build
npm start        # Start production server
npm run lint     # Run ESLint
```

## Architecture

- **Framework:** Next.js 16 with App Router
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v4 (uses `@import` syntax, not `@tailwind` directives)
- **Path alias:** `@/*` maps to `src/*`

**Source layout:**
```
my-app/src/app/
├── layout.tsx    # Root layout (fonts, metadata)
├── page.tsx      # Home route "/"
└── globals.css   # Global styles + Tailwind import
```

Add new routes as folders under `src/app/` following Next.js App Router conventions (e.g., `src/app/workouts/page.tsx` for `/workouts`).
