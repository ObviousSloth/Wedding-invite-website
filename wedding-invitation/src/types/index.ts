// ─── Couple ────────────────────────────────────────────────────────────────
export interface Couple {
  partner1: string;
  partner2: string;
  monogram: string;
}

// ─── Date ──────────────────────────────────────────────────────────────────
export interface DateInfo {
  iso: string;
  displayFull: string;
  displayDay: string;
  displayMonth: string;
  displayYear: string;
  displayDayOfWeek: string;
}

// ─── Hero ──────────────────────────────────────────────────────────────────
export interface Hero {
  tagline: string;
  subTagline: string;
  videoUrl: string;
  fallbackImageUrl: string;
}

// ─── Story ─────────────────────────────────────────────────────────────────
export interface Story {
  text: string;
  imageUrl: string;
}

// ─── Venue ─────────────────────────────────────────────────────────────────
export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Venue {
  name: string;
  time: string;
  endTime?: string;   // ← ADDED: optional end time (reception uses this)
  location: string;
  address: string;
  coordinates: Coordinates;
  mapsUrl: string;
}

// ─── Dress Code ────────────────────────────────────────────────────────────
export interface SuggestedColor {
  name: string;
  hex: string;
}

export interface DressCode {
  code: string;
  note: string;
  suggestedColors: SuggestedColor[];
}

// ─── Timeline ──────────────────────────────────────────────────────────────
export interface TimelineEvent {
  time: string;
  event: string;
  icon: string;
  iconSize?: string;
}

// ─── Gifts ─────────────────────────────────────────────────────────────────
export interface BankDetails {
  accountHolder: string;
  bank: string;
  iban: string;
  bic: string;
}

export interface Gifts {
  message: string;
  bankDetails: BankDetails;
}

// ─── Accommodations ────────────────────────────────────────────────────────
export interface Hotel {
  name: string;
  address?: string;
  url?: string;
  priceRange?: string;
}

export interface Accommodations {
  text: string;
  hotels: Hotel[];
}

// ─── Suggestions & Conditions ──────────────────────────────────────────────
export interface SuggestionsAndConditions {
  items: string[];
}

// ─── Contact ───────────────────────────────────────────────────────────────
export interface Contact {
  message: string;
  email: string;
}

// ─── Calendar ──────────────────────────────────────────────────────────────
export interface CalendarEvent {
  title: string;
  start: string;   // ← your actual field name
  end: string;     // ← your actual field name
  location: string;
  description: string;
}

// ─── RSVP / Database ──────────────────────────────────────────────────────────
export interface Attendee {
  firstName: string;
  lastName: string;
}

export interface Invitation {
  id: string;
  display_name: string;
  rsvp_code: string;
  primary_email: string | null;
  allowed_seats: number;
  created_at: string;
}

export interface Rsvp {
  id: string;
  invitation_id: string;
  attending: boolean;
  attendees: Attendee[];
  attendee_count: number;
  phone: string | null;
  notes: string | null;
  updated_at: string;
}

export interface RsvpLookupResponse {
  invitation: Invitation;
  rsvp: Rsvp | null;
}

// ─── Root Config ───────────────────────────────────────────────────────────
export interface EventConfig {
  siteUrl: string;   // ← ADDED: used in calendar event descriptions
  couple: Couple;
  date: DateInfo;
  hero: Hero;
  story: Story;
  ceremony: Venue;
  reception: Venue;
  dressCode: DressCode;
  timeline: TimelineEvent[];
  gifts: Gifts;
  accommodations: Accommodations;
  suggestionsAndConditions: SuggestionsAndConditions;
  contact: Contact;
  calendar: {
    ceremony: CalendarEvent;
    reception: CalendarEvent;
  };
  rsvp: {
    deadline: string;
    closedMessage: string;
  };
}

// ─── API Responses ────────────────────────────────────────────────────────────
export interface ApiSuccess<T> {
  success: true;
  data: T;
}

export interface ApiError {
  success: false;
  error: string;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;
