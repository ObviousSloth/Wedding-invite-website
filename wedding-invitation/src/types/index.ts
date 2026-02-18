// ─── Invitation & RSVP Types ───────────────────────────────────────────────

export interface Invitation {
  id: string;
  displayName: string;
  allowedSeats: number;
  primaryEmail?: string;
  createdAt: string;
}

export interface Attendee {
  name: string;
}

export interface Rsvp {
  id: string;
  invitationId: string;
  attending: boolean;
  attendees: Attendee[];
  phone?: string;
  notes?: string;
  updatedAt: string;
}

export interface InvitationWithRsvp extends Invitation {
  rsvp: Rsvp | null;
}

// ─── API Response Types ────────────────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface LookupResponse {
  invitation: InvitationWithRsvp;
}

// ─── Event Config Types ────────────────────────────────────────────────────

export interface Venue {
  name: string;
  time: string;
  location: string;
  address: string;
  coordinates?: { lat: number; lng: number };
  mapsUrl?: string;
}

export interface TimelineItem {
  time: string;
  event: string;
  icon: string;
}

export interface ColorSwatch {
  name: string;
  hex: string;
}

export interface CalendarEvent {
  title: string;
  location: string;
  startTime: string;
  endTime: string;
  description: string;
}

export interface EventConfig {
  couple: {
    partner1: string;
    partner2: string;
    monogram: string;
  };
  date: {
    iso: string;
    displayFull: string;
    displayDay: string;
    displayMonth: string;
    displayYear: string;
    displayDayOfWeek: string;
  };
  hero: {
    tagline: string;
    subTagline: string;
  };
  story: {
    text: string;
    imageUrl?: string;
  };
  ceremony: Venue;
  reception: Venue;
  dressCode: {
    code: string;
    note: string;
    suggestedColors: ColorSwatch[];
  };
  timeline: TimelineItem[];
  gifts: {
    message: string;
    bankDetails: {
      accountHolder: string;
      bank: string;
      iban: string;
      bic: string;
    } | null;
  };
  accommodations: {
    text: string;
    hotels?: { name: string; url: string; distance: string }[];
  };
  suggestionsAndConditions: {
    items: string[];
  };
  contact: {
    message: string;
    email: string;
  };
  calendar: {
    ceremony: CalendarEvent;
    reception?: CalendarEvent;
  };
}
