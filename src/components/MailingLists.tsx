import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Mail, Plus, Settings, Users, Globe, Lock, MoreVertical, Search, Clock } from 'lucide-react';
import { ProjectTag } from '@/components/ui/project-tag';
import { useProject } from '@/components/AppSidebar';
import { toast } from '@/hooks/use-toast';

// Mock data for existing mailing lists
const mockMailingLists = [
  {
    id: '1',
    name: 'dev@project.org',
    description: 'Development discussions and code reviews',
    isPublic: true,
    subscriberCount: 145,
    status: 'active',
    moderators: ['john@example.com', 'sarah@example.com'],
    committee: 'Core Development',
    committees: ['Core Development', 'Technical Steering Committee'],
    created: '2023-06-15',
    project: 'Kubernetes'
  },
  {
    id: '2',
    name: 'announce@project.org',
    description: 'Important project announcements and releases',
    isPublic: true,
    subscriberCount: 320,
    status: 'active',
    moderators: ['admin@example.com'],
    committee: 'Leadership',
    created: '2023-01-10',
    project: 'CNCF'
  },
  {
    id: '3',
    name: 'security@project.org',
    description: 'Security-related discussions and vulnerability reports',
    isPublic: false,
    subscriberCount: 28,
    status: 'active',
    moderators: ['security@example.com', 'lead@example.com'],
    committee: 'Security Working Group',
    committees: ['Security Working Group', 'Compliance Working Group'],
    created: '2023-03-22',
    project: 'Hyperledger'
  },
  {
    id: '4',
    name: 'user-feedback@project.org',
    description: 'User feedback and feature requests',
    isPublic: true,
    subscriberCount: 89,
    status: 'pending',
    moderators: ['product@example.com'],
    committee: 'Product Team',
    created: '2024-01-15',
    project: 'OpenJS Foundation'
  },
  {
    id: '5',
    name: 'community@project.org',
    description: 'Community discussions and event planning',
    isPublic: true,
    subscriberCount: 156,
    status: 'active',
    moderators: ['community@example.com'],
    committee: 'Community Outreach',
    committees: ['Community Outreach', 'Events Team'],
    created: '2023-09-12',
    project: 'TODO Group'
  },
  {
    id: '6',
    name: 'licensing@project.org',
    description: 'Software licensing discussions and compliance',
    isPublic: false,
    subscriberCount: 42,
    status: 'active',
    moderators: ['legal@example.com', 'compliance@example.com'],
    committee: 'Legal Working Group',
    created: '2023-04-18',
    project: 'SPDX'
  }
];

// Mock committees for dropdown
const committees = [
  'Core Development',
  'Leadership',
  'Security Working Group',
  'Product Team',
  'Documentation',
  'Community Outreach'
];

interface MailingListsProps {
  isCreateDialogOpen: boolean;
  setIsCreateDialogOpen: (open: boolean) => void;
}

const MailingLists = ({ isCreateDialogOpen, setIsCreateDialogOpen }: MailingListsProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [newListForm, setNewListForm] = useState({
    name: '',
    description: '',
    isPublic: true,
    committee: '',
    moderators: ''
  });
  const { selectedProject } = useProject();

  const filteredLists = mockMailingLists.filter(list => {
    const matchesSearch = list.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      list.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      list.committee.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesProject = selectedProject === 'All Projects' || list.project === selectedProject;
    
    return matchesSearch && matchesProject;
  });

  const handleCreateList = () => {
    // Simulate API call
    toast({
      title: "Mailing List Created",
      description: `${newListForm.name} will be available within 2 hours. You'll receive a confirmation email once it's ready.`,
    });
    
    setIsCreateDialogOpen(false);
    setNewListForm({
      name: '',
      description: '',
      isPublic: true,
      committee: '',
      moderators: ''
    });
  };

  const handleUpdateList = (listId: string, action: string) => {
    toast({
      title: "List Updated",
      description: `${action} action has been processed successfully.`,
    });
  };

  return (
    <div className="space-y-6">
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
                    placeholder="Search mailing lists..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Filters - Placeholder for future */}
            <Card className="shadow-soft">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">All Lists</span>
                  <Badge variant="secondary">{mockMailingLists.length}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Active</span>
                  <Badge variant="secondary">
                    {mockMailingLists.filter(l => l.status === 'active').length}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Pending</span>
                  <Badge variant="secondary">
                    {mockMailingLists.filter(l => l.status === 'pending').length}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Overview Stats */}
            <Card className="shadow-soft">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Overview Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Subscribers</span>
                  <Badge variant="secondary">
                    {mockMailingLists.reduce((sum, list) => sum + list.subscriberCount, 0)}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Public Lists</span>
                  <Badge variant="secondary">
                    {mockMailingLists.filter(list => list.isPublic).length}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Committees</span>
                  <Badge variant="secondary">
                    {new Set(mockMailingLists.map(l => l.committee)).size}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Mailing Lists */}
          <div className="space-y-4">
            {filteredLists.map((list) => (
              <Card key={list.id} className="shadow-soft">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{list.name}</h3>
                        <ProjectTag projectName={list.project} />
                        <Badge variant={list.isPublic ? "secondary" : "outline"}>
                          {list.isPublic ? (
                            <>
                              <Globe className="h-3 w-3 mr-1" />
                              Public
                            </>
                          ) : (
                            <>
                              <Lock className="h-3 w-3 mr-1" />
                              Private
                            </>
                          )}
                        </Badge>
                        {list.status === 'pending' && (
                          <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                            <Clock className="h-3 w-3 mr-1" />
                            Pending
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">{list.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Subscribers</p>
                          <p className="font-medium">{list.subscriberCount}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Committee</p>
                          <div className="flex flex-wrap gap-1">
                            {list.committees ? (
                              list.committees.map((committee, index) => (
                                <Badge key={index} variant="outline" className="text-xs font-normal">
                                  {committee}
                                </Badge>
                              ))
                            ) : (
                              <Badge variant="outline" className="text-xs font-normal">
                                {list.committee}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Moderators</p>
                          <p className="font-medium">{list.moderators.length}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Created</p>
                          <p className="font-medium">{new Date(list.created).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleUpdateList(list.id, 'Edit settings')}>
                          <Settings className="h-4 w-4 mr-2" />
                          Edit Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUpdateList(list.id, 'Manage moderators')}>
                          <Users className="h-4 w-4 mr-2" />
                          Manage Moderators
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUpdateList(list.id, 'View subscribers')}>
                          <Mail className="h-4 w-4 mr-2" />
                          View Subscribers
                        </DropdownMenuItem>
                        {list.status === 'pending' && (
                          <DropdownMenuItem onClick={() => handleUpdateList(list.id, 'Check status')}>
                            <Clock className="h-4 w-4 mr-2" />
                            Check Status
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {filteredLists.length === 0 && (
              <Card className="shadow-soft">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Mail className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No mailing lists found</h3>
                  <p className="text-muted-foreground text-center">
                    {searchQuery 
                      ? "No mailing lists match your search criteria."
                      : "Create your first mailing list to get started with project communication."}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Create Mailing List Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Mailing List</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="list-name">List Name *</Label>
                <Input
                  id="list-name"
                  placeholder="e.g., dev, announce, security"
                  value={newListForm.name}
                  onChange={(e) => setNewListForm({...newListForm, name: e.target.value})}
                />
                <p className="text-xs text-muted-foreground">Will create: {newListForm.name}@project.org</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="committee">Committee/Team</Label>
                <Select value={newListForm.committee} onValueChange={(value) => setNewListForm({...newListForm, committee: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select committee" />
                  </SelectTrigger>
                  <SelectContent>
                    {committees.map((committee) => (
                      <SelectItem key={committee} value={committee}>{committee}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe the purpose of this mailing list"
                value={newListForm.description}
                onChange={(e) => setNewListForm({...newListForm, description: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="moderators">Initial Moderators</Label>
              <Input
                id="moderators"
                placeholder="email1@example.com, email2@example.com"
                value={newListForm.moderators}
                onChange={(e) => setNewListForm({...newListForm, moderators: e.target.value})}
              />
              <p className="text-xs text-muted-foreground">Comma-separated email addresses</p>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>List Visibility</Label>
                <p className="text-xs text-muted-foreground">
                  {newListForm.isPublic ? 'Anyone can subscribe' : 'Subscription requires approval'}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <Switch
                  checked={newListForm.isPublic}
                  onCheckedChange={(checked) => setNewListForm({...newListForm, isPublic: checked})}
                />
                <Globe className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateList} disabled={!newListForm.name || !newListForm.description}>
                Create Mailing List
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MailingLists;