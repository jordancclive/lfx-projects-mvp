import { useState } from 'react';
import { Users, Plus, Filter, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Committee, CommitteeMember } from '@/types/committee';
import { CommitteeCard } from '@/components/committees/CommitteeCard';
import { useToast } from '@/hooks/use-toast';
import Footer from '../components/Footer';

// Mock data - in real app this would come from API
const mockCommittees: Committee[] = [
  {
    id: '1',
    name: 'Technical Steering Committee',
    description: 'Provides technical leadership and guidance for the project, reviewing architectural decisions and technical roadmap.',
    type: 'technical',
    isEditable: true,
    meetingSchedule: 'Every Tuesday at 2 PM UTC',
    createdAt: '2024-01-15',
    members: [
      {
        id: '1',
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        role: 'chair',
        joinDate: '2024-01-15',
        isVoting: true,
        avatar: undefined,
      },
      {
        id: '2',
        name: 'Bob Smith',
        email: 'bob.smith@example.com',
        role: 'secretary',
        joinDate: '2024-01-20',
        isVoting: true,
        avatar: undefined,
      },
      {
        id: '3',
        name: 'Carol Davis',
        email: 'carol.davis@example.com',
        role: 'voting-member',
        joinDate: '2024-02-01',
        isVoting: true,
        avatar: undefined,
      },
      {
        id: '4',
        name: 'David Wilson',
        email: 'david.wilson@example.com',
        role: 'voting-member',
        joinDate: '2024-01-25',
        isVoting: true,
        avatar: undefined,
      },
      {
        id: '5',
        name: 'Eva Brown',
        email: 'eva.brown@example.com',
        role: 'member',
        joinDate: '2024-02-05',
        isVoting: false,
        avatar: undefined,
      },
      {
        id: '6',
        name: 'Frank Miller',
        email: 'frank.miller@example.com',
        role: 'voting-member',
        joinDate: '2024-02-10',
        isVoting: true,
        avatar: undefined,
      },
      {
        id: '7',
        name: 'Grace Lee',
        email: 'grace.lee@example.com',
        role: 'member',
        joinDate: '2024-02-15',
        isVoting: false,
        avatar: undefined,
      },
      {
        id: '8',
        name: 'Henry Chen',
        email: 'henry.chen@example.com',
        role: 'voting-member',
        joinDate: '2024-02-20',
        isVoting: true,
        avatar: undefined,
      },
      {
        id: '9',
        name: 'Iris Martinez',
        email: 'iris.martinez@example.com',
        role: 'member',
        joinDate: '2024-02-25',
        isVoting: false,
        avatar: undefined,
      },
      {
        id: '10',
        name: 'Jack Thompson',
        email: 'jack.thompson@example.com',
        role: 'voting-member',
        joinDate: '2024-03-01',
        isVoting: true,
        avatar: undefined,
      },
      {
        id: '11',
        name: 'Kate Anderson',
        email: 'kate.anderson@example.com',
        role: 'member',
        joinDate: '2024-03-05',
        isVoting: false,
        avatar: undefined,
      },
      {
        id: '12',
        name: 'Liam Roberts',
        email: 'liam.roberts@example.com',
        role: 'voting-member',
        joinDate: '2024-03-10',
        isVoting: true,
        avatar: undefined,
      },
    ],
  },
  {
    id: '2',
    name: 'Outreach Working Group',
    description: 'Focuses on community engagement, marketing initiatives, and external communications.',
    type: 'outreach',
    isEditable: true,
    meetingSchedule: 'Monthly on the first Friday',
    createdAt: '2024-02-01',
    members: [
      {
        id: '4',
        name: 'David Wilson',
        email: 'david.wilson@example.com',
        role: 'chair',
        joinDate: '2024-02-01',
        isVoting: true,
        avatar: undefined,
      },
      {
        id: '5',
        name: 'Eva Brown',
        email: 'eva.brown@example.com',
        role: 'member',
        joinDate: '2024-02-15',
        isVoting: false,
        avatar: undefined,
      },
      {
        id: '13',
        name: 'Michael Chen',
        email: 'michael.chen@example.com',
        role: 'voting-member',
        joinDate: '2024-02-20',
        isVoting: true,
        avatar: undefined,
      },
      {
        id: '14',
        name: 'Sarah Wilson',
        email: 'sarah.wilson@example.com',
        role: 'member',
        joinDate: '2024-02-25',
        isVoting: false,
        avatar: undefined,
      },
      {
        id: '15',
        name: 'Tom Rodriguez',
        email: 'tom.rodriguez@example.com',
        role: 'voting-member',
        joinDate: '2024-03-01',
        isVoting: true,
        avatar: undefined,
      },
      {
        id: '16',
        name: 'Jennifer Lee',
        email: 'jennifer.lee@example.com',
        role: 'member',
        joinDate: '2024-03-05',
        isVoting: false,
        avatar: undefined,
      },
      {
        id: '17',
        name: 'Robert Kim',
        email: 'robert.kim@example.com',
        role: 'secretary',
        joinDate: '2024-03-10',
        isVoting: true,
        avatar: undefined,
      },
      {
        id: '18',
        name: 'Lisa Zhang',
        email: 'lisa.zhang@example.com',
        role: 'voting-member',
        joinDate: '2024-03-15',
        isVoting: true,
        avatar: undefined,
      },
      {
        id: '19',
        name: 'Mark Taylor',
        email: 'mark.taylor@example.com',
        role: 'member',
        joinDate: '2024-03-20',
        isVoting: false,
        avatar: undefined,
      },
      {
        id: '20',
        name: 'Amy Johnson',
        email: 'amy.johnson@example.com',
        role: 'voting-member',
        joinDate: '2024-03-25',
        isVoting: true,
        avatar: undefined,
      },
    ],
  },
  {
    id: '3',
    name: 'Governing Board',
    description: 'Strategic oversight and governance of the project, including financial decisions and partnership approvals.',
    type: 'governance',
    isEditable: false, // Staff managed
    meetingSchedule: 'Quarterly',
    createdAt: '2024-01-01',
    members: [
      {
        id: '6',
        name: 'Frank Miller',
        email: 'frank.miller@linuxfoundation.org',
        role: 'chair',
        joinDate: '2024-01-01',
        isVoting: true,
        avatar: undefined,
      },
      {
        id: '7',
        name: 'Grace Lee',
        email: 'grace.lee@partner.com',
        role: 'voting-member',
        joinDate: '2024-01-01',
        isVoting: true,
        avatar: undefined,
      },
      {
        id: '21',
        name: 'James Smith',
        email: 'james.smith@corp.com',
        role: 'voting-member',
        joinDate: '2024-01-05',
        isVoting: true,
        avatar: undefined,
      },
      {
        id: '22',
        name: 'Maria Garcia',
        email: 'maria.garcia@enterprise.com',
        role: 'voting-member',
        joinDate: '2024-01-10',
        isVoting: true,
        avatar: undefined,
      },
      {
        id: '23',
        name: 'Alex Turner',
        email: 'alex.turner@foundation.org',
        role: 'secretary',
        joinDate: '2024-01-15',
        isVoting: true,
        avatar: undefined,
      },
      {
        id: '24',
        name: 'Rachel Davis',
        email: 'rachel.davis@company.com',
        role: 'voting-member',
        joinDate: '2024-01-20',
        isVoting: true,
        avatar: undefined,
      },
      {
        id: '25',
        name: 'Kevin Brown',
        email: 'kevin.brown@partner.org',
        role: 'voting-member',
        joinDate: '2024-01-25',
        isVoting: true,
        avatar: undefined,
      },
      {
        id: '26',
        name: 'Sophia Wang',
        email: 'sophia.wang@tech.com',
        role: 'voting-member',
        joinDate: '2024-01-30',
        isVoting: true,
        avatar: undefined,
      },
      {
        id: '27',
        name: 'Daniel Martinez',
        email: 'daniel.martinez@solutions.com',
        role: 'voting-member',
        joinDate: '2024-02-05',
        isVoting: true,
        avatar: undefined,
      },
    ],
  },
  {
    id: '4',
    name: 'Security Working Group',
    description: 'Responsible for security policies, vulnerability management, and security best practices.',
    type: 'technical',
    isEditable: true,
    meetingSchedule: 'Bi-weekly on Thursdays',
    createdAt: '2024-03-01',
    members: [
      {
        id: '28',
        name: 'Emma Thompson',
        email: 'emma.thompson@security.com',
        role: 'chair',
        joinDate: '2024-03-01',
        isVoting: true,
        avatar: undefined,
      },
      {
        id: '29',
        name: 'Noah Williams',
        email: 'noah.williams@infosec.org',
        role: 'secretary',
        joinDate: '2024-03-05',
        isVoting: true,
        avatar: undefined,
      },
      {
        id: '30',
        name: 'Olivia Johnson',
        email: 'olivia.johnson@cybersec.com',
        role: 'voting-member',
        joinDate: '2024-03-10',
        isVoting: true,
        avatar: undefined,
      },
      {
        id: '31',
        name: 'Lucas Davis',
        email: 'lucas.davis@securityfirm.com',
        role: 'voting-member',
        joinDate: '2024-03-15',
        isVoting: true,
        avatar: undefined,
      },
      {
        id: '32',
        name: 'Ava Miller',
        email: 'ava.miller@pentest.org',
        role: 'member',
        joinDate: '2024-03-20',
        isVoting: false,
        avatar: undefined,
      },
      {
        id: '33',
        name: 'Mason Wilson',
        email: 'mason.wilson@compliance.com',
        role: 'voting-member',
        joinDate: '2024-03-25',
        isVoting: true,
        avatar: undefined,
      },
      {
        id: '34',
        name: 'Isabella Garcia',
        email: 'isabella.garcia@audit.org',
        role: 'member',
        joinDate: '2024-03-30',
        isVoting: false,
        avatar: undefined,
      },
      {
        id: '35',
        name: 'Ethan Brown',
        email: 'ethan.brown@riskassess.com',
        role: 'voting-member',
        joinDate: '2024-04-01',
        isVoting: true,
        avatar: undefined,
      },
    ],
  },
];

const Committees = () => {
  const [committees, setCommittees] = useState<Committee[]>(mockCommittees);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const { toast } = useToast();

  const handleAddMember = (committeeId: string, email: string, role: CommitteeMember['role'], isVoting: boolean) => {
    setCommittees(prev => prev.map(committee => {
      if (committee.id === committeeId) {
        const newMember: CommitteeMember = {
          id: Date.now().toString(),
          name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          email,
          role,
          joinDate: new Date().toISOString().split('T')[0],
          isVoting,
          avatar: undefined,
        };
        return {
          ...committee,
          members: [...committee.members, newMember],
        };
      }
      return committee;
    }));
  };

  const handleRemoveMember = (committeeId: string, memberId: string, reason: string, effectiveDate: string) => {
    setCommittees(prev => prev.map(committee => {
      if (committee.id === committeeId) {
        return {
          ...committee,
          members: committee.members.filter(member => member.id !== memberId),
        };
      }
      return committee;
    }));
    
    // In real app, this would also log the removal with reason and effective date
    console.log('Member removal logged:', { committeeId, memberId, reason, effectiveDate });
  };

  const handleChangeRole = (committeeId: string, memberId: string, newRole: CommitteeMember['role'], isVoting: boolean) => {
    setCommittees(prev => prev.map(committee => {
      if (committee.id === committeeId) {
        return {
          ...committee,
          members: committee.members.map(member => 
            member.id === memberId 
              ? { ...member, role: newRole, isVoting }
              : member
          ),
        };
      }
      return committee;
    }));
  };

  const filteredCommittees = committees.filter(committee => {
    const matchesSearch = committee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         committee.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || committee.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const totalMembers = committees.reduce((sum, committee) => sum + committee.members.length, 0);
  const editableCommittees = committees.filter(c => c.isEditable).length;
  const activeCommittees = committees.filter(c => c.members.length > 0).length;
  const votingMembers = committees.reduce((sum, committee) => 
    sum + committee.members.filter(m => m.isVoting).length, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background">
        <div className="container mx-auto px-6 pt-6 pb-8">
          <div className="animate-fade-in">
            <h1 className="text-3xl font-bold text-foreground font-heading">Committees</h1>
            <p className="text-muted-foreground mt-1">
              Manage committee members, roles, and organizational structure
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Search, Filters, and Stats */}
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
                      placeholder="Search committees..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Filters */}
              <Card className="shadow-soft">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Filters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-2 block">
                      Committee Type
                    </label>
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="technical">Technical</SelectItem>
                        <SelectItem value="governance">Governance</SelectItem>
                        <SelectItem value="outreach">Outreach</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {(searchTerm || filterType !== 'all') && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSearchTerm('');
                        setFilterType('all');
                      }}
                      className="w-full"
                    >
                      Clear Filters
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Overview Stats */}
              <Card className="shadow-soft">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Overview Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Committees</span>
                    <Badge variant="secondary">{committees.length}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Members</span>
                    <Badge variant="secondary">{totalMembers}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Active Committees</span>
                    <Badge variant="secondary">{activeCommittees}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Voting Members</span>
                    <Badge variant="secondary">{votingMembers}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Editable</span>
                    <Badge variant="secondary">{editableCommittees}</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Committees Grid */}
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
              {filteredCommittees.map((committee, index) => (
                <div 
                  key={committee.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CommitteeCard
                    committee={committee}
                    onAddMember={handleAddMember}
                    onRemoveMember={handleRemoveMember}
                    onChangeRole={handleChangeRole}
                  />
                </div>
              ))}
            </div>

            {filteredCommittees.length === 0 && (
              <Card className="shadow-soft">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Users className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No committees found</h3>
                  <p className="text-muted-foreground text-center">
                    {searchTerm || filterType !== 'all' 
                      ? 'No committees match your current search or filters.'
                      : 'There are no committees set up yet.'}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Committees;