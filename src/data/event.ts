/**
 * Event metadata for Hack Michigan 2026.
 *
 * Single source of truth for event metadata and external URLs.
 */

export const EVENT = {
  name: "Hack Michigan",
  tagline: "Building the future of Michigan's tech corridor.",
  mission:
    "Hack Michigan is a technical-first hackathon focused on engineering excellence and the future of the Detroit tech corridor.",
  date: "May 15-17 2026",
  dateIso: "2026-05-15",
  time: "2:00 PM - 2:00 PM (EDT)",
  location: "TechTown Detroit, 440 Burroughs Street, Detroit, 48202",
  locationUrl:
    "https://www.google.com/maps/dir//TechTown%20Detroit%20440%20Burroughs%20Street%20Detroit%2048202",
  locationMapEmbedUrl:
    "https://maps.google.com/maps?q=440+Burroughs+St%2C+Detroit%2C+MI+48202&output=embed&z=16",
  teamSizeMax: 5,
} as const;

export const EVENT_URLS = {
  hackerRegistration: "https://ibm.biz/hack-michigan",
  sponsorInquiry: "mailto:whatupdoe@compass-detroit.com",
} as const;

export type EventUrlKey = keyof typeof EVENT_URLS;

/** Access code shown to registrants on the IBM Agentic platform. */
export const ACCESS_CODE = "HACKMI";
