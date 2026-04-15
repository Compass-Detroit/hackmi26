/**
 * External campaign URLs (IBM Agentic / HackMI).
 * Update when final links are published.
 */
export const EXTERNAL_URLS = {
  HACKER_REGISTRATION: "https://ibm.biz/hack-michigan",
  SPONSOR_INQUIRY: "mailto:whatupdoe@compass-detroit.com",
} as const;

export const EVENT_DETAILS = {
  NAME: "Hack Michigan",
  DATE: "May 15-17 2026",
  TIME: "2:00 PM - 2:00 PM (EDT)",
  LOCATION: "TechTown Detroit, 440 Burroughs Street, Detroit, 48202",
  LOCATION_URL:
    "https://www.google.com/maps/dir//TechTown%20Detroit%20440%20Burroughs%20Street%20Detroit%2048202",
  /** iframe `src` for embedded map. Replace with the “Embed a map” URL from Google Maps → Share for a pinned place. */
  LOCATION_MAP_EMBED_URL:
    "https://maps.google.com/maps?q=440+Burroughs+St%2C+Detroit%2C+MI+48202&output=embed&z=16",
  MISSION:
    "Hack Michigan is a technical-first hackathon focused on engineering excellence and the future of the Detroit tech corridor.",
} as const;

/** @deprecated Use EXTERNAL_URLS.HACKER_REGISTRATION */
export const HACKER_REGISTRATION_URL = EXTERNAL_URLS.HACKER_REGISTRATION;
/** @deprecated Use EXTERNAL_URLS.SPONSOR_INQUIRY */
export const SPONSOR_INQUIRY_URL = EXTERNAL_URLS.SPONSOR_INQUIRY;
/** Bottom-of-page CTAs to the primary registration destination. */
export const IBM_AGENTIC_CAMPAIGN_URL = EXTERNAL_URLS.HACKER_REGISTRATION;
