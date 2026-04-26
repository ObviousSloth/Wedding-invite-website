# Jessika & Randy — Wedding Invitation Website
### Project Overview & Documentation

---

## What This Is

A fully custom digital wedding invitation for **Jessika & Randy**, getting married on **Saturday, 19 December 2026** in Madrid, Spain. Guests receive a personal RSVP code and visit [bodaayubidefaria.eu](https://bodaayubidefaria.eu) to confirm their attendance, view all event details, and get everything they need for the day.

The site is entirely in Spanish, targeting a Latin/Spanish-speaking audience. It is built from scratch — no Wix, no templates — and deployed to production on Vercel.

---

## Guest Experience (The Story)

1. **Envelope landing** — The guest lands on a full-screen animated red envelope. They click or tap to "open" the invitation, triggering a reveal animation before the main site appears. This user gesture also unlocks browser audio playback.

2. **Hero** — A crossfading black-and-white photo carousel of the couple cycles automatically. Soft background music begins and fades in. The couple's names are shown in large script with a subtle dark gradient over the photos.

3. **Date & Countdown** — The wedding date displayed elegantly with a live countdown timer that auto-switches between days, hours, minutes, and seconds as the date approaches.

4. **Our Story** — Two short story blocks (Curaçao, where they met, and a second milestone) with decorative icons and floral corner accents.

5. **Ceremony & Reception** — Venue names, times, and Google Maps links for both the church (Basílica Virgen Milagrosa, 6:00pm) and the reception (Complejo La Cigüeña, 8:00pm–2:00am). Guests can also add events directly to their Google Calendar or download `.ics` files.

6. **Dress code** — "Elegante" with a 9-color visual palette grid and a note that part of the reception is outdoors.

7. **Timeline / Itinerary** — A horizontal scrolling carousel with 8 events of the day (church → departure → cocktail → first dance → dinner → cake → party → end), each illustrated with a hand-drawn-style SVG icon.

8. **Gift suggestions** — A Wishlist button as the primary action, plus a collapsible section revealing bank transfer (IBAN) details for monetary gifts.

9. **RSVP** — Guests enter their unique personal code to unlock the form. They confirm attendance (Sí/No), number of guests, meal choices per person, and allergy information. A confirmation email is sent automatically on submit.

10. **Accommodations** — Hotel recommendations near the venue (to be populated closer to the date).

11. **Conditions & suggestions** — Practical event notes for guests.

12. **Contact** — A message form that emails the couple.

13. **Thank You** — Full-bleed photo of the couple with a closing message.

Throughout the scroll, soft background music fades out when the hero section leaves view and fades back in when the guest scrolls back up.

---

## Design

### Color Palette

| Role | Color | Hex |
|---|---|---|
| Primary | Burgundy | `#5e0813` |
| Background | Cream | `#f4f2eb` |
| Accent | Sage | `#8a9a5b` |

Sections alternate between **cream** and **burgundy** backgrounds as the page scrolls, creating visual rhythm. Floral vine SVGs and decorative icons (rings, champagne toast, gift box, dress code couple) accent individual sections.

### Typography

| Font | Role |
|---|---|
| Slight (script) | Section titles, couple names, decorative headings |
| Cinzel | Body text, labels, nav, buttons, uppercase caps |
| The Seasons | Italic prose, story text |
| New Icon Script | Decorative glyphs |
| Old Standard | Venue names, addresses |

All font sizes use fluid `clamp()` values — they scale smoothly from 375px mobile to 1280px desktop without abrupt jumps.

### Layout Pattern (scroll order)

```
Envelope overlay → Hero (photo carousel) → Date (cream) → Story (sage) →
Venues + Dress Code (burgundy) → Timeline (cream) → Gifts (sage) →
RSVP (cream) → Accommodations (sage) → Conditions (burgundy) →
Contact (cream) → Thank You (photo bg)
```

### Key Design Decisions

- **No video in hero** — replaced with a crossfading black-and-white photo carousel (14 couple photos, easy to add/remove)
- **Monogram SVG as logo** — the JR monogram (`/svgs/monogram.svg`) appears as both the navbar logo and the browser tab favicon. It recolors automatically: white over photos, black over cream backgrounds.
- **Floral decorations** — vine and flower SVGs placed as absolutely-positioned corner accents on Story, Info, and Timeline sections
- **Pill-shaped buttons** throughout — fully rounded, consistent with the elegant aesthetic
- **Scroll reveal animations** — sections fade/slide in as the user scrolls via IntersectionObserver

---

## Features

### Envelope Landing
- Full-screen animated envelope plays once per session
- Guest clicks to open → wax seal breaks, 3 polaroid photos burst out, overlay fades away
- `sessionStorage` prevents replaying the animation on refresh
- The click also unlocks browser audio (bypasses autoplay restriction)

### Hero Carousel
- 14 couple photos cycle automatically every 4.5 seconds
- All photos rendered in black and white (`filter: grayscale(100%)`)
- Crossfade transition between images (1s ease)
- Dark overlay + burgundy-to-transparent gradient for text legibility
- To add/remove photos: edit the `CAROUSEL_IMAGES` array in `HeroSection.tsx`

### Background Music
- Song file: place at `public/audio/song.mp3`
- Starts playing as soon as the guest clicks the envelope
- Fades in smoothly when the hero section is on screen
- Fades out to silence when the guest scrolls away from the hero
- Fades back in when scrolling back up to the hero
- Volume fade: 1200ms over 40 steps via `setInterval`
- Implementation: `src/hooks/useHeroAudio.ts` + `src/context/AudioContext.tsx`

### Live Countdown
- Counts down to the exact wedding datetime (`2026-12-19T18:00:00+01:00`, Europe/Madrid)
- Automatically switches units: shows days when far, then hours, then minutes, then seconds as the date approaches

### RSVP System (code-based, no login)
- Each invited party receives a unique code (e.g. `JHOOF`)
- Guest enters code → API validates against `invitations` table in Supabase
- On match: form unlocks, pre-filled with their name and any existing RSVP
- Guest selects Sí/No, fills attendee names (up to their allowed seat count), chooses meal per person (Carne / Pescado / Vegetariano), and enters allergy information
- If fewer names than allowed seats: a confirmation modal fires ("¿Solo X of Y?")
- On submit: row upserted to `rsvps` table (idempotent — re-submitting is safe), confirmation email sent
- After the RSVP deadline (`2026-11-30`): form closes and shows a contact link instead

### Calendar Integration
- Each venue card has a "Calendario" pill button
- Dropdown offers: Google Calendar deep link + download `.ics` file
- Works for both ceremony and reception events
- `.ics` files use `TZID=Europe/Madrid` for correct timezone handling

### Google Maps Integration
- "Ver Ubicación" pill button on each venue card opens Google Maps in a new tab
- Direct links to exact venue locations

### Contact Form
- Message form sends directly to the couple's email
- Messages also stored in Supabase `messages` table as a backup record

### Email Confirmations
- Nodemailer via Gmail SMTP
- Confirmation email sent to guest after RSVP submission
- Email shows list of attendees with their meal choices
- Cron route available for sending reminder emails to guests who haven't responded

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS v4 — all tokens in `globals.css`, no config file |
| CSS Modules | Per-component `.module.css` for complex or animated styles |
| Images | `next/image` (optimized, lazy-loaded) |
| Database | Supabase (Postgres) |
| Email | Nodemailer via Gmail SMTP |
| Hosting | Vercel (auto-deploy on push to `main`) |
| Domain | [bodaayubidefaria.eu](https://bodaayubidefaria.eu) |

---

## Project Structure

```
wedding-invitation/
├── public/
│   ├── audio/              ← Place song.mp3 here
│   ├── fonts/              ← 5 local fonts (Slight, Cinzel, The Seasons, New Icon Script, Old Standard)
│   ├── images/
│   │   └── Hero/           ← 14 couple photos for the hero carousel
│   └── svgs/
│       ├── monogram.svg    ← JR monogram (navbar logo + browser tab favicon)
│       ├── decorative/     ← rings, toast, gift, dresscode, vine, flower SVGs
│       └── timeline/       ← church, car, drinks, swans, menu, cake, disco, clock SVGs
└── src/
    ├── app/
    │   ├── layout.tsx      ← Root layout: fonts, metadata, AudioProvider wrapper
    │   ├── page.tsx        ← Composes all sections in scroll order
    │   ├── globals.css     ← Tailwind v4 theme tokens (colors, fonts, fluid type sizes)
    │   └── api/
    │       ├── rsvp/       ← lookup (code validation) + submit (upsert + email)
    │       ├── contact/    ← contact form handler
    │       └── cron/       ← reminder email scheduler
    ├── config/
    │   └── eventConfig.ts  ← Single source of truth for ALL wedding content
    ├── components/
    │   ├── Navbar.tsx
    │   ├── LandingController.tsx   ← Manages envelope → main site transition + audio unlock
    │   ├── envelope/               ← Envelope animation component
    │   ├── countdown/              ← AdaptiveCountdown timer
    │   ├── timeline/               ← TimelineIcon SVG renderer
    │   └── ui/                     ← Design system: Button, Input, Textarea, Modal, Toast, Card, etc.
    ├── context/
    │   └── AudioContext.tsx        ← Shares audio-enabled state across the component tree
    ├── hooks/
    │   └── useHeroAudio.ts         ← Hero music: fade in/out on scroll via IntersectionObserver
    ├── sections/                   ← One file per page section
    │   ├── HeroSection.tsx + .module.css
    │   ├── DateSection.tsx + .module.css
    │   ├── StorySection.tsx + .module.css
    │   ├── InfoSection.tsx + .module.css
    │   ├── TimelineSection.tsx + .module.css
    │   ├── GiftsSection.tsx + .module.css
    │   ├── RSVPSection.tsx + .module.css
    │   ├── AccommodationsSection.tsx + .module.css
    │   ├── ConditionsSection.tsx + .module.css
    │   ├── ContactSection.tsx
    │   └── ThankYouSection.tsx + .module.css
    └── types/index.ts              ← All TypeScript interfaces
```

---

## Content Management

**All wedding content lives in one file: `src/config/eventConfig.ts`**

This includes couple names, wedding date/time, venue names/addresses/coordinates, ceremony and reception times, dress code and color palette, timeline events and icons, story text blocks, gifts message and IBAN and wishlist URL, accommodations text, RSVP deadline, and contact email.

To update anything on the site — change a venue name, update a time, add a hotel, fix bank details — edit only `eventConfig.ts`. No other files need to change.

---

## Database

**Supabase (Postgres) — three tables:**

```
invitations   — one row per invited party (rsvp_code, display_name, allowed_seats, primary_email)
rsvps         — one row per submitted RSVP (attending, attendees JSONB, allergies, attendee_count)
messages      — contact form submissions
```

RSVP rules:
- One RSVP per invitation (upsert model — re-submitting edits the existing response)
- `attendees` is a JSONB array with `{ firstName, lastName, meal }` per person
- `allergies` is a single shared text field for the whole party
- `meal` must be one of: `carne`, `pescado`, `vegetariano`
- Invitations are managed manually via the Supabase dashboard

---

## Deployment

- **Repository:** GitHub (`ObviousSloth/Wedding-invite-website`)
- **Hosting:** Vercel
- **Auto-deploy:** Push to `main` → Vercel builds and deploys automatically
- **Domain:** `bodaayubidefaria.eu`

**Environment variables required in Vercel:**

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_WEDDING_DATE        (2026-12-19T18:00:00+01:00)
NEXT_PUBLIC_TIMEZONE            (Europe/Madrid)
GMAIL_USER
GMAIL_APP_PASSWORD              (16-char Gmail app password)
GMAIL_NOTIFICATION_EMAIL
```

---

## Running Locally

```bash
# From the Next.js project root:
cd wedding-invitation

npm run dev     # → http://localhost:3000
npm run build   # Production build check
npm run lint    # ESLint
```

---

## Pending / TODOs Before Launch

| Item | Status |
|---|---|
| Place `song.mp3` in `public/audio/` | Waiting on song choice |
| Real wishlist URL in `eventConfig.gifts.wishlistUrl` | Placeholder `#` |
| Real bank IBAN + BIC in `eventConfig.gifts.bankDetails` | Placeholder |
| Hotel recommendations in `eventConfig.accommodations.hotels` | Empty array |
| Suggestions/conditions in `eventConfig.suggestionsAndConditions.items` | Placeholder |
| Timeline times (currently `XX:XX`) | Partially filled — confirm real times |
| Proposal/beach photo for ThankYou section (`/images/thankyou.jpg`) | Needs photo |
| Ornate frame SVG for DateSection couple photo | Design pending |
| Confirm RSVP end-to-end with real Supabase codes | Before launch |
| Confirm contact email is active | Before launch |

---

## Visual Design Plan (In Progress)

The site is being visually aligned with a Canva mockup (burgundy/cream + cursive/Cinzel aesthetic, heavy floral vine decorations, hand-drawn SVG icons). The alignment work covers every section and includes:

- Replacing the full burgundy overlay on the hero with top/bottom fade gradients only
- Adding decorative SVG corner florals (vine1, vine2, pinkflower, greenflower) to Story, Info, Timeline
- Cream-bg Gift section with a gift SVG and IBAN hidden behind a disclosure toggle
- Burgundy-bg RSVP section with translucent-cream form fields
- Full-bleed proposal photo as the ThankYou background
- Two story blocks with Curaçao and Paris SVG icons instead of a single large photo

See `VISUAL_ALIGNMENT.md` in this folder for the complete section-by-section visual diff and change list.
