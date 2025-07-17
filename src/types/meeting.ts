export interface Meeting {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: number;
  timezone: string;
  committees: string[];
  organizer: string;
  attendees: number;
  attendeesList: Array<{ name: string; role: string }>;
  videoLink: string;
  location: string;
  recurring: string | null;
  status: 'upcoming' | 'past';
  project: string;
  isLiveNow?: boolean;
}

export interface MeetingFilters {
  committee: string;
  recurring: string;
  organizer: string;
}