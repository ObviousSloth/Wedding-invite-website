# Wedding Invitation Website — Jessika & Randy
## 📋 Master Project Breakdown (Updated after Phase 4 + RSVP Meal & Allergy Update)

---

## 🎯 Project Goal

Build a modular, responsive, single-page wedding invitation website for **Jessika & Randy** getting married **Saturday, December 19, 2026** in Madrid, Spain.

- **Hosting:** Vercel
- **Repo location:** `C:\Users\jhoof\Desktop\Projects\Wedding-invite-website\wedding-invitation`
- **Run commands always from:** `wedding-invitation\` (the Next.js project root)

---

## 🤝 Working Rules (NON-NEGOTIABLE)

These rules apply to every single phase without exception:

**At the START of each phase:**
- Ask 5–12 clarifying questions specific to that phase
- Each question must have 2–5 answer options (plus "Other: ____")
- Provide recommended answers in a bullet list at the end
- WAIT for answers before generating any code

**At the END of each phase:**
- List exactly what was implemented
- Give exact run steps (commands + env vars)
- Provide a short verification checklist
- WAIT for explicit approval ("approved" or similar) before starting the next phase

**General rules:**
- Never skip the Q&A step — even if the answer seems obvious
- Never start the next phase until the user explicitly approves
- All content must be driven from `src/config/eventConfig.ts` — never hardcode content in components
- Mobile-first, accessible, smooth-scrolling at all times
- TypeScript strictly enforced throughout
- User is on Windows — PowerShell commands only

---

## 🏗️ Tech Stack (Locked In — Do Not Change)

| Decision | Choice |
|---|---|
| Framework | Next.js 16.1.6 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | Supabase (Postgres) |
| Hosting | Vercel |
| UI Language | Spanish only |
| Timezone | Europe/Madrid |
| Node version | v22.2.0 |

---

## ⚠️ Critical Tailwind v4 Rules

- No `tailwind.config.ts` — deleted. All theme config lives in `globals.css` under `@theme {}`
- PostCSS plugin is `@tailwindcss/postcss` (NOT `tailwindcss`)
- `postcss.config.mjs` uses ES module syntax (`export default {}`)
- Google Fonts `@import url(...)` must be the absolute first line of `globals.css`, before `@import "tailwindcss"`
- Custom colors: `--color-burgundy`, `--color-cream`, etc. defined in `@theme` block — Tailwind auto-generates utility classes (`bg-burgundy`, `text-cream`, etc.)
- `@keyframes` go inside the `@theme {}` block
- Any component using `onClick`, `useState`, `useEffect`, `useRef`, `forwardRef`, or browser APIs needs `"use client"` as its first line

---

## 🎨 CSS Architecture (Locked In)

**Pattern:** CSS Modules per component + `@theme {}` fluid vars for typography

- Fluid font sizes → defined once in `globals.css @theme {}` as `--text-*` variables → Tailwind auto-generates utility classes
- Complex transitions, transform chains, layout → go in the component's `.module.css` file
- Dynamic values (hex colors from config, per-item positional data) → inline `style={}` is acceptable and must include a comment explaining why
- Never put complex transitions or layout rules as inline styles

**Fluid type vars defined in `@theme {}`:**

| CSS Var | Tailwind Class | Value | Used In |
|---|---|---|---|
| `--text-couple-name` | `text-couple-name` | `clamp(3.2rem, 11vw, 7.5rem)` | HeroSection |
| `--text-hero-amp` | `text-hero-amp` | `clamp(1.4rem, 4vw, 2.8rem)` | HeroSection |
| `--text-section-title` | `text-section-title` | `clamp(2.4rem, 7vw, 4.5rem)` | All SectionHeadings |
| `--text-date-number` | `text-date-number` | `clamp(4.5rem, 18vw, 9rem)` | DateSection |
| `--text-story-body` | `text-story-body` | `clamp(1rem, 2.5vw, 1.2rem)` | StorySection, GiftsSection, AccommodationsSection, ConditionsSection |
| `--text-venue-name` | `text-venue-name` | `clamp(1rem, 2.8vw, 1.35rem)` | InfoSection |
| `--text-thankyou-title` | `text-thankyou-title` | `clamp(3.5rem, 12vw, 8rem)` | ThankYouSection |

---

## 🎨 Design System (Locked In)

**Colors:**

| Token | Hex | Usage |
|---|---|---|
| `burgundy` | `#5e0813` | Primary color, section backgrounds, text |
| `burgundy-light` | `#7a1020` | Hover states |
| `burgundy-dark` | `#3d0509` | Dark section background (ThankYou) |
| `cream` | `#f4f2eb` | Background, light sections |
| `cream-dark` | `#e8e4d9` | Subtle contrast |
| `cream-light` | `#faf9f5` | Lightest background |
| `sage` | `#8a9a5b` | Accent sections |
| `sage-light` | `#a8b878` | Hover states |
| `sage-dark` | `#6b7845` | Dark sage |

**Section Background Pattern (scroll order):**

`burgundy overlay → cream → sage → burgundy → cream → sage → cream → sage → burgundy → cream → burgundy-dark`

**Typography (5 font roles — locked in):**

| CSS Var | Google Font | Used For |
|---|---|---|
| `--font-slight` | Great Vibes | Section titles, "¡Muchas Gracias!", decorative headings |
| `--font-cinzel` | Cinzel | Body text, labels, nav, buttons, uppercase tracking |
| `--font-seasons` | Cormorant Garamond | Italic prose, story text, times |
| `--font-icon` | Dancing Script | Couple names, large "19", monogram |
| `--font-oldstandard` | Old Standard TT | Location names, venue addresses |

**UI Decisions (Locked In):**
- Buttons: Fully rounded pill shape
- Animations: Moderate — sections fade/slide in on scroll via `ScrollReveal` component
- Navigation: Fixed top navbar, transparent → cream on scroll, hamburger on mobile
- Hero: Looping video (`public/videos/hero.mp4`) with dark burgundy overlay; gradient fallback if video fails
- Envelope landing: Full-screen overlay on first visit (session-gated via `sessionStorage`)
- SVG assets: User provides their own SVGs for timeline icons and envelope/wax seal

---

## 🎁 Envelope Landing Page (Phase 2 — Complete)

A full-screen envelope intro plays once per session before the main site is shown.

**Behavior:**
- Page loads → full-screen cream overlay with floating burgundy envelope + JR wax seal
- "Toca para abrir" hint text shown below
- User clicks → envelope shakes → wax seal breaks + spins away → 3 polaroid photos burst out
- After ~2.4s → entire overlay fades out → main website visible
- `sessionStorage` key `jr-envelope-seen` prevents replay in same session

**Assets needed:**
- `public/svgs/envelope.svg` — user's own SVG
- `public/svgs/wax-seal.svg` — user's own SVG (also used as watermark in ThankYouSection)
- Polaroid photos: currently placeholder gradient — **TODO: replace with real couple photos**

---

## 📁 Current File Structure (After Phase 4 + RSVP Meal & Allergy Update)

```
Wedding-invite-website/
└── wedding-invitation/                    ← Next.js project root (ALL commands run here)
    ├── public/
    │   ├── images/
    │   │   ├── hero.jpg                   ← TODO: place couple hero photo (video fallback)
    │   │   └── story.jpg                  ← TODO: place couple story photo
    │   ├── svgs/
    │   │   ├── envelope.svg               ← User's own SVG
    │   │   ├── wax-seal.svg               ← User's own SVG (also used in ThankYouSection)
    │   │   └── timeline/
    │   │       ├── church.svg
    │   │       ├── car.svg
    │   │       ├── drinks.svg
    │   │       ├── swans.svg
    │   │       ├── menu.svg
    │   │       ├── cake.svg
    │   │       ├── disco.svg
    │   │       └── clock.svg
    │   └── videos/
    │       └── hero.mp4                   ← TODO: place looping couple video here
    ├── src/
    │   ├── app/
    │   │   ├── api/
    │   │   │   ├── contact/
    │   │   │   │   └── route.ts           ← ✅ Phase 5 stub (returns 501)
    │   │   │   └── rsvp/
    │   │   │       ├── lookup/
    │   │   │       │   └── route.ts       ← ✅ Complete (Phase 3)
    │   │   │       └── submit/
    │   │   │           └── route.ts       ← ✅ Complete (Phase 3 + meal/allergy update)
    │   │   ├── favicon.ico
    │   │   ├── globals.css                ← ✅ Tailwind v4 theme + fluid vars + keyframes
    │   │   ├── layout.tsx                 ← ✅ Complete
    │   │   └── page.tsx                   ← ✅ Complete — clean Server Component, no "use client"
    │   ├── components/
    │   │   ├── countdown/
    │   │   │   └── AdaptiveCountdown.tsx  ← ✅ Complete ("use client")
    │   │   ├── envelope/
    │   │   │   ├── EnvelopeLanding.tsx    ← ✅ Complete ("use client")
    │   │   │   └── EnvelopeLanding.module.css
    │   │   ├── timeline/
    │   │   │   └── TimelineIcon.tsx       ← ✅ Complete ("use client" — onError handler)
    │   │   ├── ui/
    │   │   │   ├── Button.tsx             ← ✅ Complete
    │   │   │   ├── CalendarButton.tsx     ← ✅ Complete (Phase 4 — "use client", dropdown)
    │   │   │   ├── Card.tsx               ← ✅ Complete
    │   │   │   ├── Container.tsx          ← ✅ Complete
    │   │   │   ├── Input.tsx              ← ✅ Complete (suppressHydrationWarning on <input>)
    │   │   │   ├── Modal.tsx              ← ✅ Complete
    │   │   │   ├── SectionHeading.tsx     ← ✅ Complete (variant: "dark" | "light")
    │   │   │   ├── Textarea.tsx           ← ✅ Complete
    │   │   │   └── Toast.tsx              ← ✅ Complete
    │   │   ├── LandingController.tsx      ← ✅ Complete ("use client" — sessionStorage)
    │   │   ├── Navbar.tsx                 ← ✅ Complete
    │   │   └── ScrollReveal.tsx           ← ✅ Complete (accepts delay?: number prop)
    │   ├── config/
    │   │   └── eventConfig.ts             ← ✅ Complete (see full state below)
    │   ├── lib/
    │   │   ├── calendar.ts                ← ✅ Complete (Phase 4)
    │   │   ├── mailer.ts                  ← ✅ Updated — shows meal choice next to attendee names
    │   │   ├── maps.ts                    ← ✅ Complete (Phase 4)
    │   │   ├── supabase.ts                ← ✅ Complete (Phase 3)
    │   │   ├── utils.ts                   ← ✅ Complete (cn(), scrollToSection())
    │   │   └── validation.ts              ← ✅ Updated — meal enum + allergies required field
    │   ├── sections/
    │   │   ├── AccommodationsSection.tsx        ← ✅ Complete
    │   │   ├── AccommodationsSection.module.css ← ✅ Complete
    │   │   ├── ConditionsSection.tsx            ← ✅ Complete
    │   │   ├── ConditionsSection.module.css     ← ✅ Complete
    │   │   ├── ContactSection.tsx               ← ✅ Complete (email display only)
    │   │   ├── DateSection.tsx                  ← ✅ Complete
    │   │   ├── DateSection.module.css           ← ✅ Complete
    │   │   ├── GiftsSection.tsx                 ← ✅ Complete ("use client" — clipboard)
    │   │   ├── GiftsSection.module.css          ← ✅ Complete
    │   │   ├── HeroSection.tsx                  ← ✅ Complete ("use client" — video error state)
    │   │   ├── InfoSection.tsx                  ← ✅ Complete (Phase 4 — map + calendar buttons)
    │   │   ├── InfoSection.module.css           ← ✅ Complete
    │   │   ├── RSVPSection.tsx                  ← ✅ Updated — meal pills + allergies field
    │   │   ├── RSVPSection.module.css           ← ✅ Updated — .mealRow, .mealBtn, .mealBtnActive
    │   │   ├── StorySection.tsx                 ← ✅ Complete
    │   │   ├── StorySection.module.css          ← ✅ Complete
    │   │   ├── ThankYouSection.tsx              ← ✅ Complete
    │   │   ├── ThankYouSection.module.css       ← ✅ Complete
    │   │   ├── TimelineSection.tsx              ← ✅ Complete
    │   │   └── TimelineSection.module.css       ← ✅ Complete
    │   └── types/
    │       └── index.ts                         ← ✅ Updated — MealChoice type, meal on Attendee, allergies on Rsvp
    ├── .env.example                        ← ✅ Complete
    ├── .env.local                          ← ✅ Complete (Supabase vars filled in)
    ├── .gitignore                          ← ✅ Complete
    ├── eslint.config.mjs                   ← Auto-generated, untouched
    ├── next-env.d.ts                       ← Auto-generated, untouched
    ├── next.config.ts                      ← Minimal empty config
    ├── package.json                        ← ✅ Complete (includes zod)
    ├── postcss.config.mjs                  ← ✅ Fixed for Tailwind v4
    ├── README.md                           ← ✅ Complete
    └── tsconfig.json                       ← ✅ Complete (@/* → ./src/*)
```

---

## 📄 `eventConfig.ts` — Current State

```typescript
eventConfig = {
  siteUrl: 'https://jessikarandy.com',   // ← TODO: confirm real domain before launch

  couple:    { partner1: "Jessika", partner2: "Randy", monogram: "JR" },

  date: {
    iso: "2026-12-19T18:00:00+01:00",
    displayFull: "19 de diciembre del 2026",
    displayDay: "19", displayMonth: "Diciembre",
    displayYear: "2026", displayDayOfWeek: "Sábado"
  },

  hero: {
    tagline: "NOS CASAMOS",
    subTagline: "Acompáñanos en este día tan especial",
    videoUrl: "/videos/hero.mp4",
    fallbackImageUrl: "/images/hero.jpg"
  },

  story: { text: "← polished Spanish placeholder", imageUrl: "/images/story.jpg" },
  // TODO: Replace placeholder story text + place story.jpg

  ceremony: {
    name: "Basílica parroquia Virgen Milagrosa",
    time: "6:00 pm",
    location: "Madrid, España",
    address: "García de Paredes, 45, 28010 Madrid",
    coordinates: { lat: 40.4356, lng: -3.6944 },
    mapsUrl: "https://maps.google.com/?q=Basílica+parroquia+Virgen+Milagrosa,+García+de+Paredes+45,+28010+Madrid"
  },

  reception: {
    name: "Complejos La Cigüeña",
    time: "8:00 pm",
    endTime: "2:00 am",                  // ← used for calendar event end time
    location: "Arganda del Rey, Madrid",
    address: "Ctra. de Arganda a Chinchón Km 2,5, Arganda del Rey",
    coordinates: { lat: 40.3039, lng: -3.4459 },
    mapsUrl: "https://maps.google.com/?q=Complejos+La+Cigüeña,+Ctra+de+Arganda+a+Chinchón+Km+2.5,+Arganda+del+Rey+Madrid"
  },

  dressCode: {
    code: "Elegante",
    note: "La recepción tendrá una parte al aire libre, ¡abrígate!",
    suggestedColors: [
      { name: "Rosa",         hex: "#F4A7B9" },
      { name: "Lavanda",      hex: "#B9A9D4" },
      { name: "Púrpura",      hex: "#7B4F9E" },
      { name: "Verde oscuro", hex: "#2D5A3D" },
      { name: "Verde oliva",  hex: "#708238" },
      { name: "Borgoña",      hex: "#5e0813" },
      { name: "Azul marino",  hex: "#1B2A4A" },
      { name: "Negro",        hex: "#1A1A1A" },
    ]
  },

  timeline: [
    // ⚠️ icon = filename stem → public/svgs/timeline/{icon}.svg
    // ⚠️ iconSize = optional desktop SVG size override
    { time: "6:00 pm",  event: "Iglesia",               icon: "church",  iconSize: "7rem"  },
    { time: "XX:XX pm", event: "Partida al Salón",       icon: "car",     iconSize: "6.5rem"},
    { time: "XX:XX pm", event: "Cóctel de Bienvenida",   icon: "drinks",  iconSize: "9rem"  },
    { time: "XX:XX pm", event: "Primer Baile y Brindis", icon: "swans",   iconSize: "10rem" },
    { time: "XX:XX pm", event: "Cena",                   icon: "menu",    iconSize: "7rem"  },
    { time: "XX:XX pm", event: "Picar Torta",            icon: "cake",    iconSize: "7rem"  },
    { time: "XX:XX pm", event: "Fiesta",                 icon: "disco",   iconSize: "7rem"  },
    { time: "XX:XX pm", event: "Fin",                    icon: "clock",   iconSize: "7rem"  },
  ],
  // TODO: Replace 7x "XX:XX pm" with real times

  gifts: {
    message: "El mejor regalo es tu presencia...",
    bankDetails: {
      accountHolder: "Jessika & Randy",
      bank: "Nombre del Banco",              // ← TODO: real bank
      iban: "ES00 0000 0000 0000 0000 0000", // ← TODO: real IBAN
      bic:  "XXXXXXXX"                       // ← TODO: real BIC
    }
  },

  accommodations: {
    text: "← placeholder paragraph",
    hotels: []                               // ← TODO: add real hotels
  },

  suggestionsAndConditions: {
    items: ["← placeholder"]                // ← TODO: real items
  },

  contact: {
    message: "¿Tienes alguna pregunta? No dudes en escribirnos.",
    email: "hola@jessikarandy.com"           // ← TODO: confirm real email
  },

  calendar: {
    ceremony: {
      title:       "💒 Boda de Jessika & Randy — Ceremonia",
      start:       "2026-12-19T18:00:00+01:00",
      end:         "2026-12-19T20:00:00+01:00",
      location:    "Basílica parroquia Virgen Milagrosa, García de Paredes 45, 28010 Madrid",
      description: "¡La boda de Jessika & Randy! ... https://jessikarandy.com"
    },
    reception: {
      title:       "🥂 Boda de Jessika & Randy — Recepción",
      start:       "2026-12-19T20:00:00+01:00",
      end:         "2026-12-20T02:00:00+01:00",
      location:    "Complejos La Cigüeña, Ctra. de Arganda a Chinchón Km 2,5, Arganda del Rey",
      description: "¡La boda de Jessika & Randy! ... https://jessikarandy.com"
    }
  },

  rsvp: {
    deadline:      "2026-11-30T23:59:59+01:00",
    closedMessage: "El plazo para confirmar asistencia ha cerrado. Si tienes alguna pregunta, contáctanos por correo."
  }
}
```

**TODOs remaining in `eventConfig.ts`:**
- Replace 7 timeline `"XX:XX pm"` times with real times
- Replace placeholder IBAN, BIC, bank name
- Add real hotel recommendations to `accommodations.hotels[]`
- Add real suggestions & conditions to `suggestionsAndConditions.items[]`
- Replace placeholder story text + place `story.jpg`
- Confirm real contact email
- Confirm real domain for `siteUrl`

---

## 📄 `src/types/index.ts` — Interface Summary

```typescript
// Key interfaces — all defined and complete:
Couple, DateInfo, Hero, Story
Coordinates, Venue          // Venue has optional endTime?: string
DressCode, SuggestedColor
TimelineEvent               // has optional iconSize?: string
BankDetails, Gifts
Hotel, Accommodations
SuggestionsAndConditions
Contact
CalendarEvent               // fields: title, start, end, location, description

// ── RSVP types (updated after meal & allergy update) ──────────────────────
export type MealChoice = 'carne' | 'pescado' | 'vegetariano'

Attendee                    // { firstName: string; lastName: string; meal?: MealChoice }
Invitation                  // Supabase row
Rsvp                        // Supabase row — includes attendee_count: number, allergies?: string
RsvpLookupResponse
EventConfig                 // includes siteUrl: string
ApiSuccess<T>, ApiError, ApiResponse<T>
```

---

## 🗄️ Database Schema (Supabase — Live)

```sql
CREATE TABLE invitations (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  display_name  TEXT NOT NULL,
  rsvp_code     TEXT UNIQUE NOT NULL,   -- short uppercase, e.g. "JHOOF"
  primary_email TEXT,
  allowed_seats INTEGER NOT NULL CHECK (allowed_seats > 0),
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE rsvps (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invitation_id   UUID UNIQUE NOT NULL REFERENCES invitations(id) ON DELETE CASCADE,
  attending       BOOLEAN NOT NULL,
  attendees       JSONB DEFAULT '[]',   -- array of {firstName, lastName, meal} — empty rows stripped
  attendee_count  INTEGER NOT NULL DEFAULT 0,
  phone           TEXT,
  notes           TEXT,
  allergies       TEXT,                 -- ← Added: shared allergy/intolerance field (mandatory when attending)
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Migration run to add allergies column:
-- ALTER TABLE rsvps ADD COLUMN IF NOT EXISTS allergies TEXT;

CREATE TABLE messages (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  message    TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Key RSVP rules:**
- Guest looks up invitation by `rsvp_code` only
- API returns only that family's data — never another family's
- `attendees.length <= allowed_seats` enforced server-side
- Empty attendee rows are stripped server-side before saving
- Each filled attendee must have a `meal` field (`carne` | `pescado` | `vegetariano`)
- `allergies` is mandatory when attending — client and server both validate (min 1 char; guests with no allergies write "Ninguna")
- `allergies` is one shared field for the whole invitation group (not per person)
- Meal choices are stored inside the `attendees` JSONB array per person
- Partial attendance allowed — if fewer names than `allowed_seats`, a confirmation modal fires client-side
- Minimum 1 name required when attending
- One RSVP per invitation (upsert = edit flow)
- Invitations managed manually via Supabase dashboard (no admin UI)

---

## 🔌 API Endpoints

| Method | Path | Status | Purpose |
|---|---|---|---|
| POST | `/api/rsvp/lookup` | ✅ Live | Find invitation by `rsvpCode` → returns invitation + existing RSVP |
| POST | `/api/rsvp/submit` | ✅ Live (updated) | Upsert RSVP, strips empty rows, saves `attendee_count`, saves `allergies`, saves `meal` per attendee |
| POST | `/api/contact` | 🔲 Stub (501) | Phase 5 — Resend email + DB storage |

---

## 📋 Sections (scroll order — all complete after Phase 4 + RSVP update)

| # | Section | Component | Background | Status |
|---|---|---|---|---|
| — | Envelope Landing | `EnvelopeLanding` | Cream overlay | ✅ Complete |
| 1 | Hero | `HeroSection` | Video + burgundy/65% overlay | ✅ Complete |
| 2 | Date + Countdown | `DateSection` | Cream | ✅ Complete |
| 3 | Our Story | `StorySection` | Sage | ✅ Complete |
| 4 | Ceremony + Reception + Dress Code | `InfoSection` | Burgundy | ✅ Complete |
| 5 | Timeline | `TimelineSection` | Cream | ✅ Complete |
| 6 | Gift Suggestion | `GiftsSection` | Sage | ✅ Complete |
| 7 | RSVP | `RSVPSection` | Cream | ✅ Complete (updated — meal + allergies) |
| 8 | Accommodations | `AccommodationsSection` | Sage | ✅ Complete |
| 9 | Suggestions & Conditions | `ConditionsSection` | Burgundy | ✅ Complete |
| 10 | Contact | `ContactSection` | Cream | ✅ Complete |
| 11 | Thank You | `ThankYouSection` | Burgundy-dark | ✅ Complete |

---

## 🔢 Section & Component Implementation Notes

### RSVPSection ("use client") — Updated

- 3-step flow: code entry → form → animated confirmation card
- RSVP code lookup → pre-fills form if editing existing RSVP (including `allergies` and `meal` per attendee)
- Shows "Ya confirmaste" message on re-entry
- Wrong code shows inline error; after 2 failures shows contact email link
- Attendance: "Sí, asistiré" / "No podré ir" pill buttons
- Attending → full name fields (first + last) per seat, up to `allowed_seats`
- **Meal selection pills** appear below each attendee row once a name is typed — three pill buttons: `Carne` / `Pescado` / `Vegetariano`. Required for each filled attendee. Active pill filled with burgundy.
- **Allergies field** — mandatory `<Textarea>` shown only when attending. Label: "Alergias o intolerancias". Placeholder: "Escribe 'Ninguna' si no tienes alergias". Min 1 character, max 500. Pre-filled from existing RSVP on edit.
- Live seat counter: X / Y lugares updates as names are typed
- Partial attendance: submitting with fewer names than `allowed_seats` triggers a modal: "¿Solo X de Y?" — cancel or confirm
- Minimum 1 name required when attending
- Phone field: optional
- Notes field: shown for all guests
- Deadline: after `eventConfig.rsvp.deadline` the form shows a closed message with contact link
- Confirmation card: animated slide-in, shows 🌹 (attending) or 🕊️ (not attending)
- Module: `RSVPSection.module.css` — includes `.modalBackdrop`, `.modalBox`, `.familyCard`, `.attendeeRow`, `.attendeeFields`, `.attendeeNameRow`, `.mealRow`, `.mealBtn`, `.mealBtnActive`, `.confirmationCard`, etc.

### `src/lib/mailer.ts` — Updated

- `attendeeListBlock()` now shows meal choice in text (no emoji) next to each name
- Format: `Ana García — Carne`, `Juan López — Pescado`, etc.
- Meal label rendered in small burgundy text beside the name

### `src/lib/validation.ts` — Updated

- `attendeeSchema` — added `meal: z.enum(['carne', 'pescado', 'vegetariano']).optional()`
- `rsvpSubmitSchema` — added `allergies: z.string().min(1, '...').max(500).transform(v => v.trim())`
- `rsvpLookupSchema` — unchanged
- All schemas enforce strict TypeScript types throughout

### InfoSection

- Each venue card has two pill buttons: "Ver Ubicación" (SVG pin icon, opens Google Maps) + "Calendario" (SVG calendar icon, dropdown)
- CalendarButton dropdown: Google Calendar deep link + `.ics` download
- Both buttons match identical pill style: `border border-cream/35`, `font-cinzel text-[10px] tracking-[0.3em]`
- `CalendarButton` is `"use client"` — dropdown state

### CalendarButton ("use client")

- `variant="light"` → for use on burgundy backgrounds (cream text/border)
- `variant="dark"` → for use on cream/sage backgrounds (burgundy text/border)
- SVG icons (line style, `strokeWidth={2}`) — no emojis
- Clicking outside closes dropdown via fixed backdrop div

### `lib/calendar.ts`

- `buildGoogleCalendarUrl(event)` — Google Calendar deep link
- `buildIcsContent(event)` — RFC 5545 `.ics` string with `TZID=Europe/Madrid`
- `downloadIcs(event, filename)` — browser download trigger (`"use client"` only)
- Uses `event.start` / `event.end` (not `startTime`/`endTime`)

### `lib/maps.ts`

- `getMapsUrl(venue: Venue)` — returns `venue.mapsUrl`
- `buildMapsUrl(lat, lng)` — fallback from coordinates

### `lib/supabase.ts`

- `supabaseClient` — anon key, safe for client components
- `getSupabaseAdmin()` — service role key, server-side API routes only

### `lib/validation.ts` (Zod) — Updated

- `rsvpLookupSchema` — transforms to uppercase, trims
- `rsvpSubmitSchema` — validates submit payload including `allergies` (required) and `meal` per attendee
- `attendeeSchema` — `firstName` + `lastName` (both optional strings, empty rows stripped server-side) + `meal?: MealChoice`

### TimelineSection

- Desktop: 3-col grid — SVG opposite side of card
- Mobile: dot + card side by side, SVG between items
- `TimelineIcon.tsx` is `"use client"` — isolates `onError` handler
- SVG filenames match `icon` field → `public/svgs/timeline/{icon}.svg`
- Current icon stems: `church`, `car`, `drinks`, `swans`, `menu`, `cake`, `disco`, `clock`

### GiftsSection

- IBAN copy button uses `navigator.clipboard` — silent catch for unsupported environments

### ThankYouSection

- JR monogram watermark: absolute, `font-icon`, `text-cream/5`, `clamp(18rem, 80vw, 60rem)`
- Wax seal SVG reused as faint watermark (opacity: 0.25)

### SectionHeading

- `variant="dark"` → `text-burgundy` (cream/sage backgrounds)
- `variant="light"` → `text-cream` (burgundy backgrounds)

### Input.tsx

- Has `suppressHydrationWarning` on the `<input>` element — prevents false hydration errors from password manager browser extensions (NordPass, etc.)

---

## 🌍 Environment Variables

```bash
# .env.local (never commit — already filled in)
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co        ← ✅ filled
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...                     ← ✅ filled
SUPABASE_SERVICE_ROLE_KEY=eyJ...                         ← ✅ filled
NEXT_PUBLIC_WEDDING_DATE=2026-12-19T18:00:00+01:00       ← ✅ filled
NEXT_PUBLIC_TIMEZONE=Europe/Madrid                       ← ✅ filled
# RESEND_API_KEY=                                        ← Phase 5
# NOTIFICATION_EMAIL=                                    ← Phase 5
```

---

## ✅ Phase Status

| Phase | Name | Status |
|---|---|---|
| 0 | Project scaffolding + tech stack setup | ✅ Complete |
| 1 | Core components + UI system + base config | ✅ Complete |
| 2 | Static sections + content + envelope landing | ✅ Complete |
| 3 | Database + RSVP system | ✅ Complete |
| 4 | Maps + Calendar integration | ✅ Complete |
| — | RSVP meal selection + allergy field | ✅ Complete (out-of-phase update) |
| 5 | Contact form (Resend + DB storage) | 🔲 **START HERE** |
| 6 | Hardening + production deployment | 🔲 Pending |

---

## 🔲 PHASE 5 — Contact Form (START HERE)

**Scope:**
- Replace the `POST /api/contact` stub with a working route
- Send email notification via Resend when a message is submitted
- Store message in the `messages` Supabase table as fallback (and for record-keeping)
- Build a working contact form in `ContactSection.tsx` — currently email display only
- Fields: name, email, message
- Show success/error feedback inline

**Before coding Phase 5, the new AI must ask Q&A covering at minimum:**
- Resend account: already set up or needs setup walkthrough?
- Which email address receives the notification (could differ from `hola@jessikarandy.com`)
- Whether to store messages in Supabase regardless of Resend (recommended: yes — dual write)
- Whether to show a character limit on the message field
- Success UX — toast, inline message, or form replacement?
- Whether to add a honeypot or rate limiting for spam protection
- Whether `ContactSection` replaces the current email display or adds a form below it

---

## 🔲 PHASE 6 — Hardening & Production

- Error boundaries on all sections
- Full accessibility audit (WCAG AA)
- Lighthouse score targets (Performance ≥90, Accessibility ≥95)
- Custom domain setup on Vercel
- Analytics (Vercel Analytics or Plausible)
- README finalization
- Remove all `// TODO` placeholder comments
- Confirm all `eventConfig.ts` TODOs are filled in with real data

---

## 🖥️ Running the Project

```powershell
# Always from project root:
cd C:\Users\jhoof\Desktop\Projects\Wedding-invite-website\wedding-invitation

npm run dev       # → http://localhost:3000
npm run build     # production check — run this after every phase
```

---

## 📌 Critical Notes for the New AI

- User is on Windows — **PowerShell commands only**
- Node v22.2.0, Next.js 16.1.6, Tailwind CSS v4
- Tailwind v4 = no config file — all theme in `globals.css @theme {}`
- `page.tsx` is a clean Server Component — **never add `"use client"` to it**
- `getSupabaseAdmin()` is server-only — **never import in client components**
- `downloadIcs()` in `calendar.ts` uses browser APIs — **never call from Server Components**
- `CalendarEvent` fields are `.start` and `.end` — **not `.startTime` / `.endTime`**
- `Venue` interface is `Venue` — not `VenueInfo`
- `Input.tsx` already has `suppressHydrationWarning` — **do not remove it**
- `MealChoice` is `'carne' | 'pescado' | 'vegetariano'` — import from `@/types`
- `Attendee` now has `meal?: MealChoice` — meal pills appear per person once a name is typed
- `Rsvp` now has `allergies?: string` — one shared field for the whole invitation group
- `allergies` is mandatory when attending — validated both client-side and in `rsvpSubmitSchema`
- The `rsvps` table has an `allergies TEXT` column — SQL migration already run
- Meal data lives inside the `attendees` JSONB array as `meal` field on each object — no extra DB column
- Confirmation email (`mailer.ts`) shows meal next to each name in text format (no emoji)
- All `eventConfig` TODOs (timeline times, IBAN, hotels, story, email) can be filled any time — they don't block any phase
- User has their own SVG files already placed in `public/svgs/`
- `npm run build` must pass clean after every phase before marking approved
- The `messages` table already exists in Supabase — Phase 5 just needs to write to it
- **Never generate code before receiving Phase Q&A answers**
