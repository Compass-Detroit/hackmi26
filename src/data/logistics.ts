/**
 * Logistics cards rendered in `LogisticsSection` (rules, prizes, judges,
 * judging criteria).
 */
import { EVENT } from "./event";

export interface LogisticsRow {
  readonly label?: string;
  readonly text: string;
}

export interface LogisticsCard {
  readonly id: string;
  readonly title: string;
  readonly preamble?: string;
  readonly rows: readonly LogisticsRow[];
}

export const LOGISTICS_CARDS: readonly LogisticsCard[] = [
  {
    id: "rules",
    title: "Rules",
    rows: [
      {
        label: "Team Size:",
        text: ` Participate individually or in teams of up to ${EVENT.teamSizeMax} people.`,
      },
      {
        label: "Eligibility:",
        text: " Must be 18 years or older (or age of emancipation in your jurisdiction).",
      },
      {
        label: "Technology Requirement:",
        text: " All submissions must use IBM watsonx technology (watsonx.ai, watsonx.data, or IBM Granite models) or other AI and Open Source technologies.",
      },
      {
        label: "Originality:",
        text: " Projects must be original work created during the hackathon period (May 15-17, 2026).",
      },
      {
        label: "Deliverables:",
        text: " Each submission must include a video demonstration, written problem/solution statements, a statement on technology utilized, and optionally a working code repository.",
      },
      {
        text: "Our goal is a fair, inclusive, and safe event for everyone. Full code of conduct and detailed rules available in the official rules document.",
      },
    ],
  },
  {
    id: "prizes",
    title: "Prizes",
    rows: [
      {
        text: "Top teams will receive cash prizes, IBM and partner swag, mentorship opportunities with Michigan tech leaders, and exclusive access to IBM watsonx resources to continue developing their solutions.",
      },
      {
        text: "Winners will also be featured in Hack Michigan media and invited to present at future Michigan innovation events.",
      },
      {
        text: "Full prize details and tiers will be announced at the opening ceremony on May 15, 2026.",
      },
    ],
  },
  {
    id: "judges",
    title: "Judges",
    rows: [
      {
        text: "Judges from industry and academia will join us in Detroit. Names and backgrounds will be listed once the panel is confirmed.",
      },
    ],
  },
  {
    id: "judging-criteria",
    title: "Judging criteria",
    preamble:
      "Each submission will be scored on the following criteria (maximum 25 points total):",
    rows: [
      {
        label: "Completeness and Feasibility (5 points)",
        text: " -- Is the solution complete and realistic?",
      },
      {
        label: "Effectiveness and Efficiency (5 points)",
        text: " -- Does it solve the problem well?",
      },
      {
        label: "Design and Usability (5 points)",
        text: " -- Is it well-designed and user-friendly?",
      },
      {
        label: "Creativity and Innovation (5 points)",
        text: " -- Is it innovative and creative?",
      },
      {
        label: "Michigan Impact (5 points)",
        text: " -- Does it keep value, jobs, and opportunity in Michigan?",
      },
      {
        label: "Your solution should also demonstrate:",
        text: " practical application solving a real Michigan challenge, clear business value, implementability as a working proof-of-concept, and strong storytelling that positions Michigan as a technology innovator.",
      },
      {
        label: "Final scores",
        text: " will be the average of judges' scores based on your submitted deliverables.",
      },
    ],
  },
] as const;
