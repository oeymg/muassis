export interface EventPartner {
  name: string;
}

export interface EventHighlight {
  title: string;
  description: string;
}

export interface EventEntry {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  dateLabel: string;
  timeLabel: string;
  location: string;
  registrationUrl: string;
  startDate: string;
  endDate: string;
  highlights: EventHighlight[];
  partners: EventPartner[];
  hosts?: string;
  ticketPrice?: string;
  contactEmail?: string;
}

const events: EventEntry[] = [
  {
    slug: 'build-sprint',
    title: 'Build Sprint – Mu’assis & Awqaf Australia',
    tagline: 'A day to create, collaborate, and bring ideas to life with mentors and the Mu’assis network.',
    summary:
      'We’re partnering with Awqaf Australia for our first Build Sprint: arrive with an idea or curiosity, leave with new collaborators, momentum, and feedback from the Mu’assis community.',
    dateLabel: 'Saturday 26 October',
    timeLabel: '10:00am – 3:00pm AEST',
    location: 'The University of Queensland, Saint Lucia, Queensland',
    registrationUrl: 'https://luma.com/2e6a5qgh',
    startDate: '2024-10-26T10:00:00+10:00',
    endDate: '2024-10-26T15:00:00+10:00',
    highlights: [
      {
        title: 'Meet & Align',
        description: 'Kick off with introductions, mentor matching, and a sense-check of community needs.'
      },
      {
        title: 'Lunch & Network',
        description: 'Reset over lunch while connecting with founders, students, and community partners.'
      },
      {
        title: 'Build & Pitch',
        description: 'Collaborate for three hours, then present your progress for feedback and next steps.'
      }
    ],
    partners: [
      { name: 'Muslim Founders Australia' },
      { name: 'UQ Muslim Students Association' },
      { name: 'Awqaf Australia' }
    ],
    hosts: 'Hosted by Mu\'assis – Muslim Founders Australia & Awqaf Australia',
    ticketPrice: 'A$10.00 (includes lunch & materials)',
    contactEmail: 'contact@muassis.org'
  }
];

function sortByStartDate(list: EventEntry[]): EventEntry[] {
  return [...list].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
}

function isUpcoming(event: EventEntry, referenceDate = new Date()): boolean {
  const end = new Date(event.endDate);

  if (Number.isNaN(end.getTime())) {
    return true;
  }

  return end.getTime() >= referenceDate.getTime();
}

export async function getUpcomingEvents(referenceDate = new Date()): Promise<EventEntry[]> {
  const ordered = sortByStartDate(events);
  return ordered.filter((event) => isUpcoming(event, referenceDate));
}

export async function getEventBySlug(slug: string): Promise<EventEntry | undefined> {
  return events.find((event) => event.slug === slug);
}
