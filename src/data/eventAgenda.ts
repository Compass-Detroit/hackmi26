/**
 * Three-day event agenda. Edit copy and times as the program is finalized.
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
    id: 'day-1',
    tabLabel: 'Thu · May 15',
    dayTitle: 'Day 1 — Arrival & kickoff',
    slots: [
      { time: '2:00 PM', title: 'Check-in & Registration', detail: 'Check-in, badges, coffee' },
      { time: '3:00 PM', title: 'Opening keynote', detail: 'Welcome and theme' },
      { time: '4:00 PM', title: 'Team formation & hacking begins' },
		{ time: '6:00 PM', title: 'Dinner' },
		{ time: '7:00 PM', title: 'Hacking begins' },
      { time: '8:00 PM', title: 'Late-night hacking', detail: 'Venue open TBD' },
    ],
  },
  {
    id: 'day-2',
    tabLabel: 'Fri · May 16',
    dayTitle: 'Day 2 — Build',
    slots: [
      { time: '8:00 AM', title: 'Morning Mindfulness & Meditative Yoga' },
      { time: '8:00 AM', title: 'Breakfast & Networking' },
      { time: '9:00 AM', title: 'How to Win a Hackathon' },
      { time: '10:00 AM', title: 'Build with AI Workshops' },
      { time: '1:00 PM', title: 'Lunch Break & Networking' },
      { time: '2:00 PM', title: 'Workshops Office Hours' },
      { time: '6:00 PM', title: 'Happy Hour & Networking' },
      { time: '8:00 PM', title: 'Hacking Continues' },
    ],
  },
  {
    id: 'day-3',
    tabLabel: 'Sat · May 17',
    dayTitle: 'Day 3 — Ship & celebrate',
    slots: [
      { time: '8:00 AM', title: 'Morning Mindfulness & Meditative Yoga' },
      { time: '8:00 AM', title: 'Breakfast & Networking' },
      { time: '10:00 AM', title: 'Code Freeze' },
      { time: '11:00 AM', title: 'Finish Presentations' },
      { time: '12:00 PM', title: 'Project Submission Due' },
      { time: '12:00 PM', title: 'Lunch Break & Networking' },
      { time: '1:00 PM', title: 'Practice Demos' },
      { time: '2:00 PM', title: 'Judging & Awards'},
    ],
  },
];
