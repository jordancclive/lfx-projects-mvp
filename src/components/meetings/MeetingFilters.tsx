import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import type { Meeting, MeetingFilters as FilterType } from '@/types/meeting';

interface MeetingFiltersProps {
  filters: FilterType;
  onFiltersChange: (filters: FilterType) => void;
  meetings: Meeting[];
}

export const MeetingFilters = ({ filters, onFiltersChange, meetings }: MeetingFiltersProps) => {
  const committees = [...new Set(meetings.map(m => m.committee))];
  const organizers = [...new Set(meetings.map(m => m.organizer))];
  const recurringOptions = [...new Set(meetings.map(m => m.recurring).filter(Boolean))];

  const updateFilter = (key: string, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value === 'all' ? '' : value
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      committee: '',
      recurring: '',
      organizer: ''
    });
  };

  const hasActiveFilters = Object.values(filters).some(f => f);

  return (
    <Card className="shadow-soft">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">Filters</CardTitle>
          {hasActiveFilters && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearFilters}
              className="h-auto p-1 text-xs"
            >
              <X className="h-3 w-3 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Committee Filter */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">Committee</label>
          <Select value={filters.committee || 'all'} onValueChange={(value) => updateFilter('committee', value)}>
            <SelectTrigger className="h-8">
              <SelectValue placeholder="All committees" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All committees</SelectItem>
              {committees.map(committee => (
                <SelectItem key={committee} value={committee}>{committee}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Recurring Filter */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">Recurring</label>
          <Select value={filters.recurring || 'all'} onValueChange={(value) => updateFilter('recurring', value)}>
            <SelectTrigger className="h-8">
              <SelectValue placeholder="All meetings" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All meetings</SelectItem>
              <SelectItem value="none">One-time only</SelectItem>
              {recurringOptions.map(option => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Organizer Filter */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">Organizer</label>
          <Select value={filters.organizer || 'all'} onValueChange={(value) => updateFilter('organizer', value)}>
            <SelectTrigger className="h-8">
              <SelectValue placeholder="All organizers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All organizers</SelectItem>
              {organizers.map(organizer => (
                <SelectItem key={organizer} value={organizer}>{organizer}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};