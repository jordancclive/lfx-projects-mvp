import { useState } from 'react';
import { Calendar, Clock, Filter, Search, List, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MeetingCard } from '@/components/meetings/MeetingCard';
import { MeetingCalendar } from '@/components/meetings/MeetingCalendar';
import { MeetingFilters } from '@/components/meetings/MeetingFilters';
import { useProject } from '@/components/AppSidebar';
import type { Meeting } from '@/types/meeting';

interface MeetingsProps {
  isCreateDialogOpen: boolean;
  setIsCreateDialogOpen: (open: boolean) => void;
}

// Mock data for meetings
const mockMeetings: Meeting[] = [
  // Live meeting starting in 10 minutes
  {
    id: '0',
    title: 'Security Working Group Standup',
    description: 'Weekly security team sync and vulnerability review',
    date: '2025-07-17',
    time: '10:10',
    duration: 30,
    timezone: 'UTC',
    committees: ['Security Working Group', 'Technical Steering Committee'],
    organizer: 'Alex Chen',
    attendees: 8,
    attendeesList: [
      { name: 'Alex Chen', role: 'Organizer' },
      { name: 'Sarah Wilson', role: 'Member' },
      { name: 'Mike Johnson', role: 'Member' },
      { name: 'Lisa Wang', role: 'Member' },
      { name: 'David Miller', role: 'Member' },
      { name: 'Emma Davis', role: 'Member' },
      { name: 'Robert Taylor', role: 'Member' },
      { name: 'Jane Smith', role: 'Member' }
    ],
    videoLink: 'https://zoom.us/j/security123',
    location: 'Virtual',
    recurring: 'Weekly',
    status: 'upcoming' as const,
    project: 'CNCF',
    isLiveNow: true
  },
  // Upcoming meetings in August 2025
  {
    id: '1',
    title: 'Technical Steering Committee',
    description: 'Monthly technical review and roadmap discussion',
    date: '2025-08-05',
    time: '15:00',
    duration: 60,
    timezone: 'UTC',
    committees: ['Technical Steering Committee'],
    organizer: 'Jane Smith',
    attendees: 12,
    attendeesList: [
      { name: 'Jane Smith', role: 'Organizer' },
      { name: 'Alex Chen', role: 'Member' },
      { name: 'Mike Johnson', role: 'Member' },
      { name: 'Lisa Wang', role: 'Member' },
      { name: 'David Miller', role: 'Member' },
      { name: 'Emma Davis', role: 'Member' },
      { name: 'Robert Taylor', role: 'Member' },
      { name: 'Sarah Wilson', role: 'Member' },
      { name: 'Tom Anderson', role: 'Member' },
      { name: 'Maria Garcia', role: 'Member' },
      { name: 'James Wilson', role: 'Member' },
      { name: 'Amy Chen', role: 'Member' }
    ],
    videoLink: 'https://zoom.us/j/123456789',
    location: 'Virtual',
    recurring: 'Monthly',
    status: 'upcoming' as const,
    project: 'Kubernetes'
  },
  {
    id: '2',
    title: 'Weekly Team Standup',
    description: 'Weekly progress updates and sprint planning',
    date: '2025-08-19',
    time: '09:00',
    duration: 30,
    timezone: 'UTC',
    committees: ['Core Team', 'Documentation Team'],
    organizer: 'Emma Davis',
    attendees: 10,
    attendeesList: [
      { name: 'Emma Davis', role: 'Organizer' },
      { name: 'Alex Chen', role: 'Member' },
      { name: 'Mike Johnson', role: 'Member' },
      { name: 'Lisa Wang', role: 'Member' },
      { name: 'David Miller', role: 'Member' },
      { name: 'Sarah Wilson', role: 'Member' },
      { name: 'Robert Taylor', role: 'Member' },
      { name: 'Jane Smith', role: 'Member' },
      { name: 'Tom Anderson', role: 'Member' },
      { name: 'Maria Garcia', role: 'Member' }
    ],
    videoLink: 'https://teams.microsoft.com/l/meetup-join/abc',
    location: 'Virtual',
    recurring: 'Weekly',
    status: 'upcoming' as const,
    project: 'OpenJS Foundation'
  },
  {
    id: '3',
    title: 'Q3 Planning Session',
    description: 'Q3 goal setting and resource planning for upcoming initiatives',
    date: '2025-08-12',
    time: '14:00',
    duration: 120,
    timezone: 'UTC',
    committees: ['Core Team'],
    organizer: 'Mike Johnson',
    attendees: 15,
    attendeesList: [
      { name: 'Mike Johnson', role: 'Organizer' },
      { name: 'Alex Chen', role: 'Member' },
      { name: 'Lisa Wang', role: 'Member' },
      { name: 'David Miller', role: 'Member' },
      { name: 'Emma Davis', role: 'Member' },
      { name: 'Sarah Wilson', role: 'Member' },
      { name: 'Robert Taylor', role: 'Member' },
      { name: 'Jane Smith', role: 'Member' },
      { name: 'Tom Anderson', role: 'Member' },
      { name: 'Maria Garcia', role: 'Member' },
      { name: 'James Wilson', role: 'Member' },
      { name: 'Amy Chen', role: 'Member' },
      { name: 'Chris Brown', role: 'Member' },
      { name: 'Pat Wilson', role: 'Member' },
      { name: 'Sam Davis', role: 'Member' }
    ],
    videoLink: 'https://meet.google.com/abc-defg-hij',
    location: 'Virtual',
    recurring: null,
    status: 'upcoming' as const,
    project: 'Hyperledger'
  },
  {
    id: '4',
    title: 'Security Audit Review',
    description: 'Monthly security assessment and vulnerability review',
    date: '2025-08-08',
    time: '10:00',
    duration: 90,
    timezone: 'UTC',
    committees: ['Security Working Group'],
    organizer: 'Alex Chen',
    attendees: 6,
    attendeesList: [
      { name: 'Alex Chen', role: 'Organizer' },
      { name: 'Sarah Wilson', role: 'Member' },
      { name: 'Mike Johnson', role: 'Member' },
      { name: 'Lisa Wang', role: 'Member' },
      { name: 'David Miller', role: 'Member' },
      { name: 'Emma Davis', role: 'Member' }
    ],
    videoLink: 'https://zoom.us/j/987654321',
    location: 'Virtual',
    recurring: 'Monthly',
    status: 'upcoming' as const,
    project: 'SPDX'
  },
  {
    id: '5',
    title: 'Community Outreach Planning',
    description: 'Planning upcoming community events and engagement strategies',
    date: '2025-08-22',
    time: '16:00',
    duration: 60,
    timezone: 'UTC',
    committees: ['Outreach Working Group'],
    organizer: 'Sarah Wilson',
    attendees: 12,
    attendeesList: [
      { name: 'Sarah Wilson', role: 'Organizer' },
      { name: 'Alex Chen', role: 'Member' },
      { name: 'Mike Johnson', role: 'Member' },
      { name: 'Lisa Wang', role: 'Member' },
      { name: 'David Miller', role: 'Member' },
      { name: 'Emma Davis', role: 'Member' },
      { name: 'Robert Taylor', role: 'Member' },
      { name: 'Jane Smith', role: 'Member' },
      { name: 'Tom Anderson', role: 'Member' },
      { name: 'Maria Garcia', role: 'Member' },
      { name: 'James Wilson', role: 'Member' },
      { name: 'Amy Chen', role: 'Member' }
    ],
    videoLink: 'https://teams.microsoft.com/l/meetup-join/xyz',
    location: 'Virtual',
    recurring: 'Bi-weekly',
    status: 'upcoming' as const,
    project: 'TODO Group'
  },
  {
    id: '6',
    title: 'Board Meeting',
    description: 'Quarterly board meeting to discuss strategic initiatives',
    date: '2025-08-30',
    time: '13:00',
    duration: 180,
    timezone: 'UTC',
    committees: ['Governing Board'],
    organizer: 'Robert Taylor',
    attendees: 8,
    attendeesList: [
      { name: 'Robert Taylor', role: 'Organizer' },
      { name: 'Jane Smith', role: 'Member' },
      { name: 'Alex Chen', role: 'Member' },
      { name: 'Mike Johnson', role: 'Member' },
      { name: 'Lisa Wang', role: 'Member' },
      { name: 'David Miller', role: 'Member' },
      { name: 'Emma Davis', role: 'Member' },
      { name: 'Sarah Wilson', role: 'Member' }
    ],
    videoLink: 'https://zoom.us/j/456789123',
    location: 'Virtual',
    recurring: 'Quarterly',
    status: 'upcoming' as const,
    project: 'Linux Foundation'
  },
  {
    id: '7',
    title: 'Architecture Review',
    description: 'Review proposed architecture changes and design decisions',
    date: '2025-08-15',
    time: '11:00',
    duration: 90,
    timezone: 'UTC',
    committees: ['Technical Steering Committee'],
    organizer: 'Lisa Wang',
    attendees: 8,
    attendeesList: [
      { name: 'Lisa Wang', role: 'Organizer' },
      { name: 'Alex Chen', role: 'Member' },
      { name: 'Mike Johnson', role: 'Member' },
      { name: 'Jane Smith', role: 'Member' },
      { name: 'David Miller', role: 'Member' },
      { name: 'Emma Davis', role: 'Member' },
      { name: 'Sarah Wilson', role: 'Member' },
      { name: 'Robert Taylor', role: 'Member' }
    ],
    videoLink: 'https://meet.google.com/def-ghij-klm',
    location: 'Virtual',
    recurring: null,
    status: 'upcoming' as const,
    project: 'CNCF'
  },
  // Past meetings from July 2025
  {
    id: '8',
    title: 'Release Planning Workshop',
    description: 'Planning for the next major release and feature prioritization',
    date: '2025-07-10',
    time: '14:30',
    duration: 120,
    timezone: 'UTC',
    committees: ['Core Team'],
    organizer: 'David Miller',
    attendees: 12,
    attendeesList: [
      { name: 'David Miller', role: 'Organizer' },
      { name: 'Alex Chen', role: 'Member' },
      { name: 'Mike Johnson', role: 'Member' },
      { name: 'Lisa Wang', role: 'Member' },
      { name: 'Emma Davis', role: 'Member' },
      { name: 'Sarah Wilson', role: 'Member' },
      { name: 'Robert Taylor', role: 'Member' },
      { name: 'Jane Smith', role: 'Member' },
      { name: 'Tom Anderson', role: 'Member' },
      { name: 'Maria Garcia', role: 'Member' },
      { name: 'James Wilson', role: 'Member' },
      { name: 'Amy Chen', role: 'Member' }
    ],
    videoLink: 'https://zoom.us/j/789123456',
    location: 'Virtual',
    recurring: null,
    status: 'past' as const,
    project: 'Kubernetes'
  },
  {
    id: '9',
    title: 'Mid-Year Review',
    description: 'Review of H1 achievements and H2 planning',
    date: '2025-07-05',
    time: '10:00',
    duration: 180,
    timezone: 'UTC',
    committees: ['Governing Board'],
    organizer: 'Robert Taylor',
    attendees: 10,
    attendeesList: [
      { name: 'Robert Taylor', role: 'Organizer' },
      { name: 'Jane Smith', role: 'Member' },
      { name: 'Alex Chen', role: 'Member' },
      { name: 'Mike Johnson', role: 'Member' },
      { name: 'Lisa Wang', role: 'Member' },
      { name: 'David Miller', role: 'Member' },
      { name: 'Emma Davis', role: 'Member' },
      { name: 'Sarah Wilson', role: 'Member' },
      { name: 'Tom Anderson', role: 'Member' },
      { name: 'Maria Garcia', role: 'Member' }
    ],
    videoLink: 'https://zoom.us/j/456789123',
    location: 'Virtual',
    recurring: null,
    status: 'past' as const,
    project: 'Linux Foundation'
  },
  {
    id: '10',
    title: 'Security Incident Response Training',
    description: 'Training session on incident response procedures',
    date: '2025-07-08',
    time: '15:00',
    duration: 90,
    timezone: 'UTC',
    committees: ['Security Working Group'],
    organizer: 'Alex Chen',
    attendees: 15,
    attendeesList: [
      { name: 'Alex Chen', role: 'Organizer' },
      { name: 'Sarah Wilson', role: 'Member' },
      { name: 'Mike Johnson', role: 'Member' },
      { name: 'Lisa Wang', role: 'Member' },
      { name: 'David Miller', role: 'Member' },
      { name: 'Emma Davis', role: 'Member' },
      { name: 'Robert Taylor', role: 'Member' },
      { name: 'Jane Smith', role: 'Member' },
      { name: 'Tom Anderson', role: 'Member' },
      { name: 'Maria Garcia', role: 'Member' },
      { name: 'James Wilson', role: 'Member' },
      { name: 'Amy Chen', role: 'Member' },
      { name: 'Chris Brown', role: 'Member' },
      { name: 'Pat Wilson', role: 'Member' },
      { name: 'Sam Davis', role: 'Member' }
    ],
    videoLink: 'https://teams.microsoft.com/l/meetup-join/sec',
    location: 'Virtual',
    recurring: null,
    status: 'past' as const,
    project: 'Hyperledger'
  }
];

const Meetings = ({ isCreateDialogOpen, setIsCreateDialogOpen }: MeetingsProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<{ committee: string; recurring: string; organizer: string }>({
    committee: '',
    recurring: '',
    organizer: ''
  });
  const [activeTab, setActiveTab] = useState('upcoming');
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const { selectedProject } = useProject();

  // Filter meetings based on search, filters, and selected project
  const filteredMeetings = mockMeetings.filter(meeting => {
    const matchesSearch = meeting.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         meeting.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCommittee = !selectedFilters.committee || meeting.committees.includes(selectedFilters.committee);
    const matchesRecurring = !selectedFilters.recurring || meeting.recurring === selectedFilters.recurring;
    const matchesOrganizer = !selectedFilters.organizer || meeting.organizer === selectedFilters.organizer;
    
    // Project filtering
    const matchesProject = selectedProject === 'All Projects' || meeting.project === selectedProject;
    
    // For calendar view, show all meetings; for list view, filter by tab
    const matchesTab = viewMode === 'calendar' || meeting.status === activeTab;

    return matchesSearch && matchesCommittee && matchesRecurring && matchesOrganizer && matchesProject && matchesTab;
  });

  const upcomingCount = mockMeetings.filter(m => m.status === 'upcoming').length;
  const pastCount = mockMeetings.filter(m => m.status === 'past').length;

  return (
    <div className="space-y-6">
      {/* Content */}
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filters */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Search */}
              <Card className="shadow-soft">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Search</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search meetings..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Filters */}
              <MeetingFilters
                filters={selectedFilters}
                onFiltersChange={setSelectedFilters}
                meetings={mockMeetings}
              />

              {/* Overview Stats */}
              <Card className="shadow-soft">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Overview Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Upcoming</span>
                    <Badge variant="secondary">{upcomingCount}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">This Month</span>
                    <Badge variant="secondary">
                      {mockMeetings.filter(m => m.date.startsWith('2025-08')).length}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Attendance</span>
                    <Badge variant="secondary">
                      87%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Recurring</span>
                    <Badge variant="secondary">
                      {mockMeetings.filter(m => m.recurring).length}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              {/* Only show tabs in list view */}
              {viewMode === 'list' ? (
                <div className="flex border-b border-border">
                  <button
                    onClick={() => setActiveTab('upcoming')}
                    className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors text-sm ${
                      activeTab === 'upcoming'
                        ? 'border-primary text-foreground'
                        : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Calendar className="h-4 w-4" />
                    Upcoming ({upcomingCount})
                  </button>
                  <button
                    onClick={() => setActiveTab('past')}
                    className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors text-sm ${
                      activeTab === 'past'
                        ? 'border-primary text-foreground'
                        : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Clock className="h-4 w-4" />
                    Past ({pastCount})
                  </button>
                </div>
              ) : (
                <div></div>
              )}
              
              {/* View Mode Switcher - always on right side */}
              <div className="flex items-center gap-1 bg-muted rounded-lg p-1 ml-auto">
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => {
                    setViewMode('list');
                    setActiveTab('upcoming'); // Default to upcoming when switching to list view
                  }}
                  className="flex items-center gap-2"
                >
                  <List className="h-4 w-4" />
                  List
                </Button>
                <Button
                  variant={viewMode === 'calendar' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('calendar')}
                  className="flex items-center gap-2"
                >
                  <CalendarDays className="h-4 w-4" />
                  Calendar
                </Button>
              </div>
            </div>

            {/* Conditional rendering based on view mode */}
            {viewMode === 'calendar' ? (
              <MeetingCalendar meetings={filteredMeetings} />
            ) : (
              <div className="space-y-6">
                {activeTab === 'upcoming' && (
                  <div className="space-y-4">
                    {filteredMeetings.length > 0 ? (
                      <div className="grid gap-4">
                        {filteredMeetings.map((meeting, index) => (
                          <div 
                            key={meeting.id} 
                            className="animate-slide-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <MeetingCard meeting={meeting} />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <Card className="shadow-soft">
                        <CardContent className="flex flex-col items-center justify-center py-12">
                          <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                          <h3 className="text-lg font-semibold mb-2">No upcoming meetings</h3>
                          <p className="text-muted-foreground text-center">
                            {searchQuery || Object.values(selectedFilters).some(f => f) 
                              ? "No meetings match your current search or filters."
                              : "You don't have any upcoming meetings scheduled."}
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                )}

                {activeTab === 'past' && (
                  <div className="space-y-4">
                    {filteredMeetings.length > 0 ? (
                      <div className="grid gap-4">
                        {filteredMeetings.map((meeting, index) => (
                          <div 
                            key={meeting.id} 
                            className="animate-slide-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <MeetingCard meeting={meeting} />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <Card className="shadow-soft">
                        <CardContent className="flex flex-col items-center justify-center py-12">
                          <Clock className="h-12 w-12 text-muted-foreground mb-4" />
                          <h3 className="text-lg font-semibold mb-2">No past meetings</h3>
                          <p className="text-muted-foreground text-center">
                            {searchQuery || Object.values(selectedFilters).some(f => f) 
                              ? "No meetings match your current search or filters."
                              : "No past meetings found."}
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Meetings;