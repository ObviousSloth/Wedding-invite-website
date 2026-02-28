import { CalendarEvent } from '@/types'

// ─── Google Calendar deep link ────────────────────────────────────────────────

export function buildGoogleCalendarUrl(event: CalendarEvent): string {
  const fmt = (iso: string) =>
    iso.replace(/[-:]/g, '').replace(/\.\d{3}/, '').replace('+01:00', '+0100')

  const params = new URLSearchParams({
    action:   'TEMPLATE',
    text:     event.title,
    dates:    `${fmt(event.start)}/${fmt(event.end)}`,
    details:  event.description,
    location: event.location,
  })

  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

// ─── .ics file generation ─────────────────────────────────────────────────────

export function buildIcsContent(event: CalendarEvent): string {
  const now   = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z/, 'Z')
  const start = formatIcsDate(event.start)
  const end   = formatIcsDate(event.end)

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Jessika & Randy//Wedding//ES',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `DTSTART;${start}`,
    `DTEND;${end}`,
    `DTSTAMP:${now}`,
    `SUMMARY:${escapeIcs(event.title)}`,
    `DESCRIPTION:${escapeIcs(event.description)}`,
    `LOCATION:${escapeIcs(event.location)}`,
    'STATUS:CONFIRMED',
    `UID:${generateUid(event.title)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
}

export function downloadIcs(event: CalendarEvent, filename: string): void {
  const content = buildIcsContent(event)
  const blob    = new Blob([content], { type: 'text/calendar;charset=utf-8' })
  const url     = URL.createObjectURL(blob)
  const link    = document.createElement('a')
  link.href     = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatIcsDate(iso: string): string {
  // "2026-12-19T18:00:00+01:00" → "TZID=Europe/Madrid:20261219T180000"
  const withoutOffset = iso.replace(/[+-]\d{2}:\d{2}$/, '')
  const compact = withoutOffset.replace(/[-:]/g, '')
  return `TZID=Europe/Madrid:${compact}`
}

function escapeIcs(str: string): string {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/;/g,  '\\;')
    .replace(/,/g,  '\\,')
    .replace(/\n/g, '\\n')
}

function generateUid(title: string): string {
  const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  return `${slug}-2026-jessika-randy@jessikarandy.com`
}
