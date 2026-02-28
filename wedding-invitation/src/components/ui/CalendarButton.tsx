'use client'

import { useState } from 'react'
import { CalendarEvent } from '@/types'
import { buildGoogleCalendarUrl, downloadIcs } from '@/lib/calendar'

interface CalendarButtonProps {
  event:       CalendarEvent
  icsFilename: string
  label:       string
  variant?:    'light' | 'dark'
}

export default function CalendarButton({
  event,
  icsFilename,
  label,
  variant = 'light',
}: CalendarButtonProps) {
  const [open, setOpen] = useState(false)

  // ── Matches your existing "Ver Ubicación" pill style exactly ──────────────
  const triggerClass = variant === 'light'
    ? `
        inline-flex items-center gap-2
        px-6 py-2 rounded-full
        border border-cream/35
        font-cinzel text-cream/80 text-[10px] tracking-[0.3em] uppercase
        hover:bg-cream/10 hover:text-cream
        transition-colors duration-200
        cursor-pointer bg-transparent
      `
    : `
        inline-flex items-center gap-2
        px-6 py-2 rounded-full
        border border-burgundy/35
        font-cinzel text-burgundy/80 text-[10px] tracking-[0.3em] uppercase
        hover:bg-burgundy/10 hover:text-burgundy
        transition-colors duration-200
        cursor-pointer bg-transparent
      `

  const panelClass = variant === 'light'
    ? 'bg-cream border border-cream-dark'
    : 'bg-burgundy border border-burgundy-light'

  const optionClass = variant === 'light'
    ? 'text-burgundy hover:bg-burgundy/8'
    : 'text-cream hover:bg-cream/10'

  const dividerClass = variant === 'light'
    ? 'bg-burgundy/10'
    : 'bg-cream/15'

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={triggerClass}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {/* Calendar SVG icon — same line style as the pin SVG in VenueCard */}
        <svg
          className="w-3 h-3 flex-shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8"  y1="2" x2="8"  y2="6" />
          <line x1="3"  y1="10" x2="21" y2="10" />
        </svg>
        {label}
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Dropdown panel */}
          <div
            className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-50 rounded-xl shadow-lg overflow-hidden min-w-[14rem] ${panelClass}`}
            role="menu"
          >
            {/* Google Calendar */}
            <a
              href={buildGoogleCalendarUrl(event)}
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              onClick={() => setOpen(false)}
              className={`flex items-center gap-2.5 px-4 py-3 font-cinzel text-xs tracking-wide transition-colors ${optionClass}`}
            >
              <svg
                className="w-3.5 h-3.5 flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8"  y1="2" x2="8"  y2="6" />
                <line x1="3"  y1="10" x2="21" y2="10" />
              </svg>
              Google Calendar
            </a>

            <div className={`h-px mx-3 ${dividerClass}`} />

            {/* .ics download */}
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                downloadIcs(event, icsFilename)
                setOpen(false)
              }}
              className={`flex items-center gap-2.5 w-full px-4 py-3 font-cinzel text-xs tracking-wide transition-colors text-left ${optionClass}`}
            >
              <svg
                className="w-3.5 h-3.5 flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Apple / Outlook (.ics)
            </button>
          </div>
        </>
      )}
    </div>
  )
}
