# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Root

The Next.js app lives in `wedding-invitation/`. Run all `npm` commands from there, not the repo root.

## Commands

```bash
cd wedding-invitation

npm run dev        # Start dev server (uses webpack, not turbopack)
npm run build      # Production build
npm run lint       # ESLint
```

No test suite is configured.

## Stack

- **Next.js 16 App Router** + TypeScript 5 (strict)
- **Tailwind CSS v4** — no `tailwind.config.ts`; all theme tokens live in `src/app/globals.css` inside `@theme {}`
- **Supabase** (Postgres) — two tables: `invitations`, `rsvps`
- **Nodemailer** via Gmail SMTP for email confirmations/reminders

## Architecture

`src/config/eventConfig.ts` is the single source of truth for all wedding content (couple info, dates, venues, timeline, bank details, colors). Sections consume it; do not hardcode content elsewhere.

`src/app/page.tsx` composes all full-page sections in order. Each section is a file in `src/sections/`.

`src/components/ui/` holds the design system primitives (Button, Card, Input, Modal, Toast, etc.).

API routes in `src/app/api/`:
- `rsvp/lookup` — validates RSVP code against `invitations` table
- `rsvp/submit` — upserts into `rsvps` table, then sends confirmation email (non-blocking)
- `contact/` — saves contact form, emails notification
- `cron/reminder/` — scheduled email reminders

All API routes follow: Zod validation → Supabase query → email side-effect → `ApiResponse<T>` JSON.

## Key Conventions

**Tailwind v4**: Theme customization goes in `globals.css` `@theme {}`. Defined tokens: `--color-burgundy`, `--color-cream`, `--color-sage`, `--font-cinzel`, `--font-seasons`, etc. Do not add a `tailwind.config.ts`.

**Client vs Server**: Components using `useState`, `useEffect`, or event handlers need `"use client"`. Prefer server components.

**CSS Modules**: Component-specific styles use `.module.css` files alongside the component.

**Fonts**: 5 custom local fonts loaded via `localFont()` in `src/lib/fonts.ts`, served from `public/fonts/`.

**Scroll animations**: `ScrollReveal.tsx` uses Intersection Observer to drive CSS animation classes.

**TypeScript path alias**: `@/*` maps to `./src/*`.

## Environment Variables

Required in `wedding-invitation/.env.local` (see `.env.example`):

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_WEDDING_DATE        # ISO 8601, Europe/Madrid
NEXT_PUBLIC_TIMEZONE
GMAIL_USER
GMAIL_APP_PASSWORD              # 16-char Gmail app password
GMAIL_NOTIFICATION_EMAIL
```

## Deployment

Hosted on Vercel. Production domain: `bodaayubidefaria.eu`. Pushes to `main` auto-deploy.
