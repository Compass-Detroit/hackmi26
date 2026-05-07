/**
 * Three-day event agenda
 */
export type AgendaSlot = {
  time: string;
  title: string;
  detail?: string;
};

export type AgendaDay = {
  /** Stable id for tab inputs, e.g. `day-1` */
  id: string;
  /** Short tab label, e.g. "Thu · May 15" */
  tabLabel: string;
  /** Optional subtitle under the tab row */
  dayTitle?: string;
  slots: AgendaSlot[];
};

export const EVENT_AGENDA: AgendaDay[] = [
  {
    id: "day-1",
    tabLabel: "Friday · May 15",
    dayTitle: "Day 1 — Arrival & kickoff",
    slots: [
      {
        time: "2:00 PM",
        title: "Check-In & Registration",
        detail: "Check-in, badges, coffee",
      },
      {
        time: "3:00 PM",
        title: "Hackathon Welcome",
        detail: "Welcome and theme",
      },
      { time: "4:00 PM", title: "Design for AI Workshop" },
      { time: "6:00 PM", title: "Dinner Break & Networking" },
      { time: "7:00 PM", title: "Tools and Provisioning Workshop" },
      { time: "8:00 PM", title: "Hacking Begins" },
    ],
  },
  {
    id: "day-2",
    tabLabel: "Saturday · May 16",
    dayTitle: "Day 2 — Build",
    slots: [
      { time: "8:00 AM", title: "Morning Mindfulness & Meditative Yoga" },
      { time: "8:00 AM", title: "Breakfast & Networking" },
      { time: "9:00 AM", title: "How to Win a Hackathon" },
      { time: "10:00 AM", title: "Build with AI Workshops" },
      { time: "1:00 PM", title: "Lunch Break & Networking" },
      { time: "2:00 PM", title: "Workshops Office Hours" },
      { time: "6:00 PM", title: "Happy Hour & Networking" },
      { time: "8:00 PM", title: "Hacking Continues" },
    ],
  },
  {
    id: "day-3",
    tabLabel: "Sunday · May 17",
    dayTitle: "Day 3 — Ship & celebrate",
    slots: [
      { time: "8:00 AM", title: "Morning Mindfulness & Meditative Yoga" },
      { time: "8:00 AM", title: "Breakfast & Networking" },
      { time: "10:00 AM", title: "Code Freeze" },
      { time: "11:00 AM", title: "Finish Presentations" },
      { time: "12:00 PM", title: "Project Submission Due" },
      { time: "12:00 PM", title: "Lunch Break & Networking" },
      { time: "1:00 PM", title: "Practice Demos" },
      {
        time: "2:00 PM",
        title: "Judging & Awards",
        detail:
          "Top teams invited to present & demo at Michigan Tech Week · May 19–21",
      },
    ],
  },
];
