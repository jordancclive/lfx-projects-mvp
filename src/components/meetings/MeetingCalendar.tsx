import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { Meeting } from '@/types/meeting';

interface MeetingCalendarProps {
  meetings: Meeting[];
}

export const MeetingCalendar = ({ meetings }: MeetingCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const getMeetingsForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return meetings.filter(meeting => meeting.date === dateStr);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const renderMeetingPopover = (meetings: Meeting[], day: number) => {
    if (meetings.length === 0) return null;

    return (
      <Popover>
        <PopoverTrigger asChild>
          <div className="space-y-1 cursor-pointer">
            {meetings.slice(0, 2).map((meeting, index) => (
              <div
                key={meeting.id}
                className={`text-xs px-1 py-0.5 rounded truncate text-white ${
                  meeting.status === 'upcoming' 
                    ? 'bg-primary hover:bg-primary/80' 
                    : 'bg-muted-foreground hover:bg-muted-foreground/80'
                }`}
              >
                {meeting.title}
              </div>
            ))}
            {meetings.length > 2 && (
              <div className="text-xs text-center text-muted-foreground">
                +{meetings.length - 2} more
              </div>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="start">
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">
              Meetings on {day} {formatMonthYear(currentDate).split(' ')[0]}
            </h4>
            <div className="space-y-2">
              {meetings.map((meeting) => (
                <div key={meeting.id} className="p-2 border rounded-sm space-y-1">
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium text-sm truncate">{meeting.title}</h5>
                    <Badge variant={meeting.status === 'upcoming' ? 'default' : 'secondary'} className="text-xs">
                      {meeting.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <FontAwesomeIcon icon="clock" className="h-3 w-3" />
                      {meeting.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <FontAwesomeIcon icon="users" className="h-3 w-3" />
                      {meeting.committee}
                    </div>
                  </div>
                  {meeting.description && (
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {meeting.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);
  const totalCells = Math.ceil((daysInMonth + firstDayOfMonth) / 7) * 7;

  return (
    <Card className="shadow-soft">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            {formatMonthYear(currentDate)}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={goToToday}
              className="text-xs"
            >
              Today
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth('prev')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth('next')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: totalCells }, (_, index) => {
            const dayNumber = index - firstDayOfMonth + 1;
            const isValidDay = dayNumber > 0 && dayNumber <= daysInMonth;
            const dayMeetings = isValidDay ? getMeetingsForDate(dayNumber) : [];
            const today = isToday(dayNumber);

            return (
              <div
                key={index}
                className={`min-h-[100px] p-1 border rounded-sm ${
                  isValidDay 
                    ? 'bg-background hover:bg-muted/50' 
                    : 'bg-muted/20'
                } ${today ? 'ring-2 ring-primary' : ''}`}
              >
                {isValidDay && (
                  <>
                    <div className={`text-sm font-medium mb-1 ${today ? 'text-primary' : 'text-foreground'}`}>
                      {dayNumber}
                    </div>
                    {renderMeetingPopover(dayMeetings, dayNumber)}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}; 