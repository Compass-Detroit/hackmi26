/**
 * External campaign URLs (IBM Agentic / HackMI).
 * Update when final links are published.
 */
export const EXTERNAL_URLS = {
  HACKER_REGISTRATION: 'https://ibm.biz/hack-michigan',
  SPONSOR_INQUIRY: 'whatupdoe@compass-detroit.com',
} as const;

export const EVENT_DETAILS = {
  NAME: 'Hack Michigan',
  DATE: 'May 2026',
  LOCATION: 'Detroit, Michigan',
  MISSION:
    'Hack Michigan is a technical-first hackathon focused on engineering excellence and the future of the Detroit tech corridor.',
} as const;

/** @deprecated Use EXTERNAL_URLS.HACKER_REGISTRATION */
export const HACKER_REGISTRATION_URL = EXTERNAL_URLS.HACKER_REGISTRATION;
/** @deprecated Use EXTERNAL_URLS.SPONSOR_INQUIRY */
export const SPONSOR_INQUIRY_URL = EXTERNAL_URLS.SPONSOR_INQUIRY;
/** Bottom-of-page CTAs to the primary registration destination. */
export const IBM_AGENTIC_CAMPAIGN_URL = EXTERNAL_URLS.HACKER_REGISTRATION;
