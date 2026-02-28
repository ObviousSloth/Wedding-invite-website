import { Venue } from '@/types'

/**
 * Returns the Google Maps universal URL for a venue.
 * Already stored in eventConfig.mapsUrl — this is a typed helper wrapper.
 */
export function getMapsUrl(venue: Venue): string {
  return venue.mapsUrl
}

/**
 * Builds a fallback Google Maps URL from coordinates if mapsUrl is not set.
 */
export function buildMapsUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps?q=${lat},${lng}`
}
