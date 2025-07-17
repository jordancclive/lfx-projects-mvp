import { useState } from 'react';
import { Calendar, Clock, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MeetingCard } from '@/components/meetings/MeetingCard';
import { MeetingFilters } from '@/components/meetings/MeetingFilters';
import type { Meeting } from '@/types/meeting';

interface MeetingsProps {
  isCreateDialogOpen: boolean;
  setIsCreateDialogOpen: (open: boolean) => void;
}

// Mock data for meetings
const mockMeetings: Meeting[] = [
  {
    id: '1',
    title: 'Technical Steering Committee',
    description: 'Monthly technical review and roadmap discussion',
    date: '2024-01-20',
    time: '15:00',
    duration: 60,
    timezone: 'UTC',
    committee: 'Technical Steering Committee',
    organizer: 'Jane Smith',
    attendees: 12,
    videoLink: 'https://zoom.us/j/123456789',
    location: 'Virtual',
    recurring: 'Monthly',
    status: 'upcoming' as const
  },
  {
    id: '2',
    title: 'Project Planning Session',
    description: 'Q1 planning and goal setting for the upcoming release',
    date: '2024-01-25',
    time: '14:00',
    duration: 90,
    timezone: 'UTC',
    committee: 'Core Team',
    organizer: 'Mike Johnson',
    attendees: 8,
    videoLink: 'https://meet.google.com/abc-defg-hij',
    location: 'Virtual',
    recurring: null,
    status: 'upcoming' as const
  },
  {
    id: '3',
    title: 'Community Outreach Meeting',
    description: 'Discussing community engagement strategies and upcoming events',
    date: '2024-01-15',
    time: '16:00',
    duration: 45,
    timezone: 'UTC',
    committee: 'Outreach Working Group',
    organizer: 'Sarah Wilson',
    attendees: 15,
    videoLink: 'https://teams.microsoft.com/l/meetup-join/xyz',
    location: 'Virtual',
    recurring: 'Bi-weekly',
    status: 'past' as const
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

  // Filter meetings based on search and filters
  const filteredMeetings = mockMeetings.filter(meeting => {
    const matchesSearch = meeting.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         meeting.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCommittee = !selectedFilters.committee || meeting.committee === selectedFilters.committee;
    const matchesRecurring = !selectedFilters.recurring || meeting.recurring === selectedFilters.recurring;
    const matchesOrganizer = !selectedFilters.organizer || meeting.organizer === selectedFilters.organizer;
    const matchesTab = meeting.status === activeTab;

    return matchesSearch && matchesCommittee && matchesRecurring && matchesOrganizer && matchesTab;
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
                      {mockMeetings.filter(m => m.date.startsWith('2024-01')).length}
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
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <div className="flex items-center justify-between">
                <TabsList className="grid w-full max-w-xs grid-cols-2 bg-transparent p-0 h-auto">
                  <TabsTrigger 
                    value="upcoming" 
                    className="flex items-center gap-2 bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:border-b-2 data-[state=active]:border-primary text-muted-foreground border-b-2 border-transparent rounded-none pb-2"
                  >
                    <Calendar className="h-4 w-4" />
                    Upcoming ({upcomingCount})
                  </TabsTrigger>
                  <TabsTrigger 
                    value="past" 
                    className="flex items-center gap-2 bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:border-b-2 data-[state=active]:border-primary text-muted-foreground border-b-2 border-transparent rounded-none pb-2"
                  >
                    <Clock className="h-4 w-4" />
                    Past ({pastCount})
                  </TabsTrigger>
                </TabsList>

              </div>

              <TabsContent value="upcoming" className="space-y-4">
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
              </TabsContent>

              <TabsContent value="past" className="space-y-4">
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
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Meetings;