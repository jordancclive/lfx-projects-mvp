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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search } from 'lucide-react';

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
    selectedCommittees: [] as string[],
    selectedIndividuals: [] as string[],
    isRecurring: false,
    recurringPattern: 'weekly',
    showInPublicCalendar: true,
    restrictToInvitedUsers: true,
    allowEarlyJoin: true,
    recordMeeting: true,
    generateTranscripts: true,
    uploadToYoutube: true,
    enableZoomAI: true,
    reviewAISummary: true
  });

  const [committeeSearchTerm, setCommitteeSearchTerm] = useState('');
  const [individualSearchTerm, setIndividualSearchTerm] = useState('');
  const [committeeDropdownOpen, setCommitteeDropdownOpen] = useState(false);
  const [individualDropdownOpen, setIndividualDropdownOpen] = useState(false);

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
      selectedCommittees: [],
      selectedIndividuals: [],
      isRecurring: false,
      recurringPattern: 'weekly',
      showInPublicCalendar: true,
      restrictToInvitedUsers: true,
      allowEarlyJoin: true,
      recordMeeting: true,
      generateTranscripts: true,
      uploadToYoutube: true,
      enableZoomAI: true,
      reviewAISummary: true
    });
    setCommitteeSearchTerm('');
    setIndividualSearchTerm('');
  };

  const updateFormData = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const filteredCommittees = committees.filter(committee =>
    committee.toLowerCase().includes(committeeSearchTerm.toLowerCase())
  );

  const filteredIndividuals = individuals.filter(individual =>
    individual.toLowerCase().includes(individualSearchTerm.toLowerCase())
  );

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
                <Label>Committees</Label>
                <Popover open={committeeDropdownOpen} onOpenChange={setCommitteeDropdownOpen}>
                  <PopoverTrigger asChild>
                    <div className="relative">
                      <Input
                        placeholder="Search committees..."
                        value={committeeSearchTerm}
                        onChange={(e) => setCommitteeSearchTerm(e.target.value)}
                        onFocus={() => setCommitteeDropdownOpen(true)}
                        className="pr-8"
                      />
                      <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                    <ScrollArea className="max-h-48">
                      <div className="p-2 space-y-2">
                        {filteredCommittees.map(committee => (
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
                            <Label htmlFor={`committee-${committee}`} className="text-sm cursor-pointer">
                              {committee}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </PopoverContent>
                </Popover>
                {formData.selectedCommittees.length > 0 && (
                  <div className="text-sm text-muted-foreground">
                    Selected: {formData.selectedCommittees.join(', ')}
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <Label>Individuals</Label>
                <Popover open={individualDropdownOpen} onOpenChange={setIndividualDropdownOpen}>
                  <PopoverTrigger asChild>
                    <div className="relative">
                      <Input
                        placeholder="Search individuals..."
                        value={individualSearchTerm}
                        onChange={(e) => setIndividualSearchTerm(e.target.value)}
                        onFocus={() => setIndividualDropdownOpen(true)}
                        className="pr-8"
                      />
                      <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                    <ScrollArea className="max-h-48">
                      <div className="p-2 space-y-2">
                        {filteredIndividuals.map(individual => (
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
                            <Label htmlFor={`individual-${individual}`} className="text-sm cursor-pointer">
                              {individual}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </PopoverContent>
                </Popover>
                {formData.selectedIndividuals.length > 0 && (
                  <div className="text-sm text-muted-foreground">
                    Selected: {formData.selectedIndividuals.join(', ')}
                  </div>
                )}
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


          {/* Meeting Settings */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <FontAwesomeIcon icon="cog" className="h-4 w-4" />
                Meeting Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="showInPublicCalendar">Show in Public Calendar</Label>
                  <Switch
                    id="showInPublicCalendar"
                    checked={formData.showInPublicCalendar}
                    onCheckedChange={(value) => updateFormData('showInPublicCalendar', value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="restrictToInvitedUsers">Restrict to invited users</Label>
                  <Switch
                    id="restrictToInvitedUsers"
                    checked={formData.restrictToInvitedUsers}
                    onCheckedChange={(value) => updateFormData('restrictToInvitedUsers', value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="allowEarlyJoin">Let users join 10 min early</Label>
                  <Switch
                    id="allowEarlyJoin"
                    checked={formData.allowEarlyJoin}
                    onCheckedChange={(value) => updateFormData('allowEarlyJoin', value)}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="recordMeeting">Record Meeting</Label>
                    <Switch
                      id="recordMeeting"
                      checked={formData.recordMeeting}
                      onCheckedChange={(value) => updateFormData('recordMeeting', value)}
                    />
                  </div>
                  {formData.recordMeeting && (
                    <div className="ml-6 space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="generateTranscripts" className="text-sm">Generate Transcripts</Label>
                        <Switch
                          id="generateTranscripts"
                          checked={formData.generateTranscripts}
                          onCheckedChange={(value) => updateFormData('generateTranscripts', value)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="uploadToYoutube" className="text-sm">Upload to YouTube</Label>
                        <Switch
                          id="uploadToYoutube"
                          checked={formData.uploadToYoutube}
                          onCheckedChange={(value) => updateFormData('uploadToYoutube', value)}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="enableZoomAI">Enable Zoom AI</Label>
                    <Switch
                      id="enableZoomAI"
                      checked={formData.enableZoomAI}
                      onCheckedChange={(value) => updateFormData('enableZoomAI', value)}
                    />
                  </div>
                  {formData.enableZoomAI && (
                    <div className="ml-6">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="reviewAISummary" className="text-sm">Review AI Summary before sharing?</Label>
                        <Switch
                          id="reviewAISummary"
                          checked={formData.reviewAISummary}
                          onCheckedChange={(value) => updateFormData('reviewAISummary', value)}
                        />
                      </div>
                    </div>
                  )}
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