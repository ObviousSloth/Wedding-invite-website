# 💒 Jessika & Randy — Wedding Invitation

A modular, responsive wedding invitation website built with Next.js 14, TypeScript, Tailwind CSS, and Supabase.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (Postgres)
- **Hosting**: Vercel
- **Timezone**: Europe/Madrid

## Local Development

### 1. Install dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Set up environment variables
\`\`\`bash
cp .env.example .env.local
# Fill in your Supabase URL + keys (Phase 3)
\`\`\`

### 3. Run dev server
\`\`\`bash
npm run dev
# Open http://localhost:3000
\`\`\`

## Assets

Place your video file at:
\`\`\`
public/videos/hero.mp4
\`\`\`

Place couple photos at:
\`\`\`
public/images/story-placeholder.jpg
\`\`\`

## Configuration

All content is in **one file**:
\`\`\`
src/config/eventConfig.ts
\`\`\`

Update names, dates, venues, timeline, colors, and copy there.

## Deployment

1. Push to GitHub
2. Connect repo to [Vercel](https://vercel.com)
3. Add env vars in Vercel dashboard
4. Deploy ✓

## Phases

| Phase | Status | Description |
|-------|--------|-------------|
| 0 | ✅ | Architecture planning |
| 1 | ✅ | Scaffold + design system |
| 2 | ⏳ | Static sections + countdown |
| 3 | ⏳ | Database + RSVP system |
| 4 | ⏳ | Maps + calendar |
| 5 | ⏳ | Contact form |
| 6 | ⏳ | Hardening + production |
