export interface Meeting {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: number;
  timezone: string;
  committee: string;
  organizer: string;
  attendees: number;
  videoLink: string;
  location: string;
  recurring: string | null;
  status: 'upcoming' | 'past';
}

export interface MeetingFilters {
  committee: string;
  recurring: string;
  organizer: string;
}