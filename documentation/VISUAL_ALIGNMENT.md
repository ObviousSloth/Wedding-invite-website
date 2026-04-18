# Visual Alignment — Jessika & Randy Wedding Invitation

## Context

The website (Next.js 16 + Tailwind v4) was functional but visually generic. This pass aligns every section with a Canva mockup featuring a burgundy/cream palette, Great Vibes cursive headings, Cinzel labels, hand-drawn SVG icons, and floral vine decorations. Mobile-first at 375px, expanding cleanly to ≥1280px.

---

## Design Reference Images

| File | Viewport | Section |
|---|---|---|
| `Mobile/M2.png` | Mobile | HeroSection |
| `Mobile/m4.png` | Mobile | StorySection |
| `Mobile/m5.png` | Mobile | InfoSection — Venues |
| `Mobile/m6.png` | Mobile | InfoSection — Dress Code |
| `Mobile/m7.png` | Mobile | TimelineSection |
| `Mobile/m8.png` | Mobile | GiftsSection |
| `Mobile/m9.png` | Mobile | RSVPSection |
| `Mobile/m10.png` | Mobile | ThankYouSection |
| `desktop/2.png` | Desktop | Full-page composite |
| `desktop/3.png` | Desktop | DateSection |

**Missing PNGs:** mobile Date/Countdown (desktop 3.png only), and m1/m3 not provided.

---

## Key Design Decisions

| Topic | Decision |
|---|---|
| Timeline layout | Keep horizontal auto-scroll carousel (user's choice) — restyle only |
| Gifts section | Wishlist as primary CTA; IBAN kept behind a "Ver datos bancarios" disclosure |
| Unshown sections | Light restyle (AccommodationsSection, ConditionsSection, ContactSection) |
| Date section frame | Simple CSS oval border placeholder; ornate-frame SVG pending from user |
| ThankYou photo | Uses `/images/hero.jpg` as placeholder; real proposal photo pending |

---

## Breakpoints Policy

- `sm:` 640px — typography/spacing tweaks
- `md:` 768px — primary mobile → desktop layout switch
- `lg:` 1024px — wide-only adjustments (timeline icon sizes)
- No `xl:` usage
- All font sizes use existing fluid `clamp()` tokens from `globals.css @theme {}`
- All interactive elements: `min-h-[44px]` touch targets

---

## Changes per Section

### HeroSection — `src/sections/HeroSection.tsx`

**Before:** Full `bg-burgundy/65` overlay washed over the video. Names on one implied line. No `active:` states.

**After:**
- Gradient overlay: `from-burgundy-dark/65 → transparent → burgundy-dark/55` (top + bottom fade only, photo shows through the middle)
- Names stacked as three separate elements: `Jessika` / `&` / `Randy`, all in `font-slight` (Great Vibes)
- Removed the date line from Hero (it lives in DateSection)
- Added `active:` state to scroll-down indicator
- Removed commented-out monogram block

---

### DateSection — `src/sections/DateSection.tsx` + `DateSection.module.css`

**Before:** Burgundy background, no photo, stacked `dow / 19 / divider / month·year`, countdown always visible.

**After:**
- Cream background (inherits from `bg-section-cream` wrapper in `page.tsx`)
- Cursive heading from `eventConfig.date.heading` ("Acompáñanos este día especial")
- Oval photo frame placeholder (`border-radius: 50% / 35%`) around `/images/hero.jpg`
  - **TODO:** swap for ornate-frame SVG once provided
- Date row restructured: `Diciembre` above · `Sábado — 19 — 2026` in a 3-column grid
- Countdown hidden behind a "Cuenta Regresiva" toggle pill (`Button variant="primary"`)

---

### StorySection — `src/sections/StorySection.tsx` + `StorySection.module.css`

**Before:** Single large photo + italic paragraph + monogram divider.

**After:**
- No photo — two icon-text blocks (Curaçao map + Paris/Eiffel)
- Corner florals: `vine1.svg` (top-left), `greenflower1.svg` (top-right), `pinkflower.svg` (bottom-left), `vine2.svg` (bottom-right)
- Each block: icon (5rem mobile / 7rem md) beside italic story text
- Mobile: stacked column. `md:` (768px): icon beside text
- Data moved to `eventConfig.story.blocks[{ text, icon }]` — type `StoryBlock` added

---

### InfoSection — `src/sections/InfoSection.tsx` + `InfoSection.module.css`

**Before:** Venue cards with inline map-pin SVG; dress code with labelled swatches in flex-wrap; no decorative SVGs.

**After:**
- `rings.svg` above "Ceremonia Religiosa", `toast.svg` above "Recepción" (new `iconName` prop on `VenueCard`)
- Venue label uses `font-slight` cursive; time, location in Cinzel / Seasons
- Map-pin SVG removed from "Ver Ubicación" pill (matches mockup)
- `dresscode.svg` rendered below color palette
- Swatch grid: `grid-template-columns: repeat(3, 1fr)` — 3×3, no labels
- `vine1.svg` / `vine2.svg` as absolute side columns (left + right) — `pointer-events-none aria-hidden="true"`

---

### TimelineSection — `src/sections/TimelineSection.tsx` + `TimelineSection.module.css`

**Before:** Heading "Itinerario", icon wrap 4rem/5rem/6rem.

**After:**
- Heading → "Itinerario de actividades" (inline, no new config field)
- Icon wrap bumped: 5rem / 6rem / 7rem at mobile/sm/lg
- `vine1.svg` / `vine2.svg` side accents added to section
- Auto-scroll carousel behavior unchanged

---

### GiftsSection — `src/sections/GiftsSection.tsx` + `GiftsSection.module.css`

**Before:** Burgundy background, prominent IBAN-copy card.

**After:**
- Cream background (from `bg-section-cream` wrapper)
- `gift.svg` at top (`w-24 md:w-32`)
- "Wishlist" as primary `Button variant="primary"` → links to `eventConfig.gifts.wishlistUrl`
- IBAN card toggled by "Ver datos bancarios" button (disclosure pattern)
- Bank card restyled for cream bg: burgundy borders at `rgba(94,8,19,0.15)`
- New field: `eventConfig.gifts.wishlistUrl` (default `"#"`)

---

### RSVPSection — `src/sections/RSVPSection.tsx` + `RSVPSection.module.css`

**Before:** Cream background, white `.familyCard`, burgundy-tinted inputs, burgundy Sí/No pills.

**After:**
- Burgundy background (`bg-section-burgundy`)
- Deadline line shown: "Hasta el 30 de noviembre de 2026" (from `eventConfig.rsvp.deadline`)
- `.familyCard` → transparent (no white card, form sits on texture)
- All `Input` + `Textarea` use `tone="dark"` → translucent cream fill, cream labels/text
- Sí/No attendance pills → cream-outlined, active = cream fill + burgundy text
- Meal pills → same cream-outlined treatment on burgundy
- "Buscar" / "Confirmar asistencia" buttons → `variant="cream"`
- "Volver" button → custom `border-cream/40 text-cream` outline
- Error boxes → cream-bordered on burgundy
- Confirmation card → `background: var(--color-cream)` (pops against burgundy)
- Closed card → cream text/border on burgundy

---

### ThankYouSection — `src/sections/ThankYouSection.tsx` + `ThankYouSection.module.css`

**Before:** Burgundy background with giant watermark monogram.

**After:**
- Full-bleed `next/image` background (currently `/images/hero.jpg` — **TODO:** replace with proposal photo)
- Gradient overlay same pattern as Hero
- Watermark monogram removed
- Names shown as `font-slight` cursive (no flanking rules)
- `.dateChip` pill kept but `hidden md:inline-flex` (desktop only)

---

### ConditionsSection — `src/sections/ConditionsSection.tsx`

**Light restyle only:** small `vine1.svg` accent added at top-right corner (`opacity-20`). No layout or content changes.

---

## Global / Shared Changes

### `src/app/page.tsx` — wrapper regrouping

```
HeroSection               (standalone)
bg-section-cream:
  DateSection
  StorySection
  TimelineSection
  GiftsSection
InfoSection               (standalone burgundy)
RSVPSection               (standalone burgundy)
bg-section-burgundy:
  AccommodationsSection
  ConditionsSection
bg-section-cream:
  ContactSection
ThankYouSection           (standalone photo bg)
```

### `src/types/index.ts`
- Added `StoryBlock { text: string; icon?: string }`
- Updated `Story` → `{ blocks: StoryBlock[]; text?: string; imageUrl?: string }`
- Added `Gifts.wishlistUrl?: string`
- Added `DateInfo.heading?: string`

### `src/config/eventConfig.ts`
- `story.blocks`: two entries (Curaçao + Paris)
- `gifts.wishlistUrl`: `"#"` (TODO: real URL)
- `date.heading`: `"Acompáñanos este día especial"`

### `src/components/ui/Button.tsx`
- Added `cream` variant: `bg-cream text-burgundy hover:bg-cream-dark` — for use on burgundy backgrounds

### `src/components/ui/Input.tsx` + `Textarea.tsx`
- Added `tone?: "light" | "dark"` prop
- `dark` tone: `bg-cream/15 border-cream/30 text-cream placeholder:text-cream/40 focus:ring-cream/40`

---

## What Was NOT Changed

- `src/app/layout.tsx` — unchanged (Server Component)
- `src/app/globals.css` — no new tokens
- `src/app/api/**` — no API changes
- Supabase schema — no migrations
- RSVP flow logic — 3-step state machine intact
- Countdown logic — `AdaptiveCountdown.tsx` untouched
- Timeline carousel behavior — auto-scroll intact
- Navbar / LandingController / envelope animation — unchanged
- Font tokens — existing 5 fonts only
- Color tokens — `burgundy*`, `cream*`, `sage*` only

---

## Pending Items (from user)

1. **Ornate-frame SVG** for `DateSection` photo (currently simple oval CSS border)
2. **Proposal/beach photo** for `ThankYouSection` — add as `/images/thankyou.jpg` and update the `src` in `ThankYouSection.tsx`
3. **Real wishlist URL** — update `eventConfig.gifts.wishlistUrl`
4. **Optional:** confirm/update `hero.tagline` copy ("NOS CASAMOS" → matches your preference)

---

## Verification Checklist

Run from `wedding-invitation/` in PowerShell:

```powershell
npx tsc --noEmit    # TypeScript — must pass clean
npm run dev         # open http://localhost:3000
```

At **375px** viewport:
- [ ] Hero: names stack 3 lines, gradient fades only top/bottom
- [ ] Date: cream bg, oval photo, `Sábado — 19 — 2026` row, countdown behind pill
- [ ] Story: two icon blocks, 4 corner florals visible
- [ ] Info: rings/toast SVGs above venues, dresscode SVG below palette, vine sides
- [ ] Timeline: heading "Itinerario de actividades", larger icons, carousel still scrolls
- [ ] Gifts: cream bg, gift SVG, Wishlist CTA, IBAN toggles open
- [ ] RSVP: burgundy bg, cream inputs, Sí/No cream pills, confirmation card is cream
- [ ] ThankYou: photo bg with gradient, no monogram watermark

At **1280px** viewport:
- [ ] Venues side-by-side (2-col grid)
- [ ] Story blocks: icon beside text
- [ ] DateSection photo frame wider
- [ ] Date chip visible in ThankYou

Touch targets (Chrome DevTools mobile):
- [ ] All buttons/pills ≥ 44×44px
