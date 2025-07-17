import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

interface CreateMeetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateMeetingDialog = ({ open, onOpenChange }: CreateMeetingDialogProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    duration: 60,
    timezone: 'UTC',
    committee: '',
    selectedCommittees: [] as string[],
    selectedIndividuals: [] as string[],
    videoLink: '',
    location: 'Virtual',
    isRecurring: false,
    recurringPattern: 'weekly'
  });

  const committees = [
    'Technical Steering Committee',
    'Core Team',
    'Outreach Working Group',
    'Security Working Group',
    'Documentation Team'
  ];

  const individuals = [
    'Alex Chen',
    'Sarah Wilson',
    'Mike Johnson',
    'Lisa Wang',
    'David Miller',
    'Emma Davis',
    'Robert Taylor',
    'Jane Smith',
    'Tom Anderson',
    'Maria Garcia',
    'James Wilson',
    'Amy Chen'
  ];

  const timezones = [
    'UTC',
    'EST (UTC-5)',
    'PST (UTC-8)',
    'CET (UTC+1)',
    'JST (UTC+9)'
  ];

  const recurringPatterns = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'biweekly', label: 'Other Cadence' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating meeting:', formData);
    // Here you would typically send the data to your backend
    onOpenChange(false);
    // Reset form
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      duration: 60,
      timezone: 'UTC',
      committee: '',
      selectedCommittees: [],
      selectedIndividuals: [],
      videoLink: '',
      location: 'Virtual',
      isRecurring: false,
      recurringPattern: 'weekly'
    });
  };

  const updateFormData = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FontAwesomeIcon icon="plus" className="h-5 w-5" />
            Create New Meeting
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Meeting Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => updateFormData('title', e.target.value)}
                  placeholder="Enter meeting title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => updateFormData('description', e.target.value)}
                  placeholder="Meeting agenda and description"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="committee">Primary Committee *</Label>
                <Select value={formData.committee} onValueChange={(value) => updateFormData('committee', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select primary committee" />
                  </SelectTrigger>
                  <SelectContent>
                    {committees.map(committee => (
                      <SelectItem key={committee} value={committee}>
                        {committee}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Participants */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <FontAwesomeIcon icon="users" className="h-4 w-4" />
                Participants
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Label>Additional Committees</Label>
                <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto">
                  {committees.map(committee => (
                    <div key={committee} className="flex items-center space-x-2">
                      <Checkbox
                        id={`committee-${committee}`}
                        checked={formData.selectedCommittees.includes(committee)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            updateFormData('selectedCommittees', [...formData.selectedCommittees, committee]);
                          } else {
                            updateFormData('selectedCommittees', formData.selectedCommittees.filter(c => c !== committee));
                          }
                        }}
                      />
                      <Label htmlFor={`committee-${committee}`} className="text-sm">
                        {committee}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label>Individual Participants</Label>
                <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
                  {individuals.map(individual => (
                    <div key={individual} className="flex items-center space-x-2">
                      <Checkbox
                        id={`individual-${individual}`}
                        checked={formData.selectedIndividuals.includes(individual)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            updateFormData('selectedIndividuals', [...formData.selectedIndividuals, individual]);
                          } else {
                            updateFormData('selectedIndividuals', formData.selectedIndividuals.filter(i => i !== individual));
                          }
                        }}
                      />
                      <Label htmlFor={`individual-${individual}`} className="text-sm">
                        {individual}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Date and Time */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <FontAwesomeIcon icon="calendar-days" className="h-4 w-4" />
                Date & Time
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => updateFormData('date', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Time *</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => updateFormData('time', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Select 
                    value={formData.duration.toString()} 
                    onValueChange={(value) => updateFormData('duration', parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="90">1.5 hours</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={formData.timezone} onValueChange={(value) => updateFormData('timezone', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timezones.map(tz => (
                        <SelectItem key={tz} value={tz}>{tz}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>


          {/* Recurring Settings */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <FontAwesomeIcon icon="clock" className="h-4 w-4" />
                Recurring Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="isRecurring"
                  checked={formData.isRecurring}
                  onCheckedChange={(value) => updateFormData('isRecurring', value)}
                />
                <Label htmlFor="isRecurring">This is a recurring meeting</Label>
              </div>

              {formData.isRecurring && (
                <div className="space-y-2">
                  <Label htmlFor="recurringPattern">Recurrence Pattern</Label>
                  <Select 
                    value={formData.recurringPattern} 
                    onValueChange={(value) => updateFormData('recurringPattern', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {recurringPatterns.map(pattern => (
                        <SelectItem key={pattern.value} value={pattern.value}>
                          {pattern.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-primary hover:bg-primary-hover">
              Create Meeting
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};