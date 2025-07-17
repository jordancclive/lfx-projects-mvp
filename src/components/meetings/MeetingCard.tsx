import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { MoreVertical, Edit, Trash2, Users, Calendar, Video, Copy, ChevronDown, ChevronUp } from 'lucide-react';
import { ProjectTag } from '@/components/ui/project-tag';
import type { Meeting } from '@/types/meeting';

interface MeetingCardProps {
  meeting: Meeting;
}

export const MeetingCard = ({ meeting }: MeetingCardProps) => {
  const [showAttendees, setShowAttendees] = useState(false);
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (time: string, duration: number) => {
    const startTime = new Date(`2000-01-01T${time}:00`);
    const endTime = new Date(startTime.getTime() + duration * 60000);
    
    return `${startTime.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })} - ${endTime.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })}`;
  };

  const getTimeDisplay = () => {
    if (meeting.isLiveNow) {
      return 'in 10 minutes';
    }
    return formatTime(meeting.time, meeting.duration);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const isPast = meeting.status === 'past';
  const isLiveNow = meeting.isLiveNow;

  const handleMenuAction = (action: string) => {
    console.log(`${action} action for meeting:`, meeting.id);
    // TODO: Implement actual actions
  };

  return (
    <Card className={`group hover:shadow-medium transition-all duration-200 ${isPast ? 'opacity-75' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-foreground truncate">
                {meeting.title}
              </h3>
              <ProjectTag projectName={meeting.project} />
              {meeting.recurring && (
                <Badge variant="outline" className="text-xs">
                  {meeting.recurring}
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {meeting.description}
            </p>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {!isPast && (
                <>
                  <DropdownMenuItem onClick={() => handleMenuAction('Edit meeting')}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Meeting
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleMenuAction('Copy meeting link')}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Meeting Link
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              )}
              <DropdownMenuItem onClick={() => handleMenuAction('View attendees')}>
                <Users className="h-4 w-4 mr-2" />
                View Attendees
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleMenuAction('Add to calendar')}>
                <Calendar className="h-4 w-4 mr-2" />
                Add to Calendar
              </DropdownMenuItem>
              {!isPast && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => handleMenuAction('Cancel meeting')}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Cancel Meeting
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Date and Time */}
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon="calendar-days" className="h-4 w-4 text-primary" />
            <span className="font-medium">{formatDate(meeting.date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon="clock" className="h-4 w-4 text-primary" />
            <span>{getTimeDisplay()} {meeting.timezone}</span>
          </div>
        </div>

        {/* Committees */}
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon="users" className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">{meeting.committees.join(', ')}</span>
          </div>
        </div>

        {/* Organizer and Attendees */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-xs">
                {getInitials(meeting.organizer)}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">
              Organized by <span className="font-medium text-foreground">{meeting.organizer}</span>
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAttendees(!showAttendees)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <FontAwesomeIcon icon="users" className="h-4 w-4" />
            <span>{meeting.attendees} attendees</span>
            {showAttendees ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>

        {/* Expandable Attendees List */}
        {showAttendees && (
          <div className="mt-4 pt-4 border-t border-border animate-fade-in">
            <h4 className="text-sm font-medium mb-3">Attendees ({meeting.attendees})</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {meeting.attendeesList.map((attendee, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <Avatar className="h-5 w-5">
                    <AvatarFallback className="text-xs">
                      {getInitials(attendee.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-foreground">{attendee.name}</span>
                  {attendee.role === 'Organizer' && (
                    <Badge variant="secondary" className="text-xs">Organizer</Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        {isPast ? (
          <div className="flex items-center gap-2 pt-2">
            <Button variant="secondary" size="sm" className="flex-1">
              <FontAwesomeIcon icon="video" className="h-4 w-4 mr-2" />
              View Recording
            </Button>
          </div>
        ) : isLiveNow ? (
          <div className="flex items-center gap-2 pt-2">
            <Button variant="default" size="sm" className="flex-1 bg-success hover:bg-success/90 text-success-foreground">
              <FontAwesomeIcon icon="video" className="h-4 w-4 mr-2" />
              Join Meeting
            </Button>
          </div>
        ) : (
          // For upcoming meetings (not live), don't show Join Meeting button
          null
        )}
      </CardContent>
    </Card>
  );
};
