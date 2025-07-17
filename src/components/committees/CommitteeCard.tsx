import { useState } from 'react';
import { Users, Crown, FileText, UserPlus, UserMinus, Settings, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ProjectTag } from '@/components/ui/project-tag';
import { Committee, CommitteeMember } from '@/types/committee';
import { AddMemberDialog } from './AddMemberDialog';
import { RemoveMemberDialog } from './RemoveMemberDialog';
import { ChangeRoleDialog } from './ChangeRoleDialog';

interface CommitteeCardProps {
  committee: Committee;
  onAddMember: (committeeId: string, email: string, role: CommitteeMember['role'], isVoting: boolean) => void;
  onRemoveMember: (committeeId: string, memberId: string, reason: string, effectiveDate: string) => void;
  onChangeRole: (committeeId: string, memberId: string, newRole: CommitteeMember['role'], isVoting: boolean) => void;
}

export function CommitteeCard({ committee, onAddMember, onRemoveMember, onChangeRole }: CommitteeCardProps) {
  const [addMemberOpen, setAddMemberOpen] = useState(false);
  const [removeMemberOpen, setRemoveMemberOpen] = useState(false);
  const [changeRoleOpen, setChangeRoleOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<CommitteeMember | null>(null);

  const getRoleBadgeVariant = (role: CommitteeMember['role']) => {
    switch (role) {
      case 'chair': return 'default';
      case 'secretary': return 'secondary';
      case 'voting-member': return 'outline';
      case 'member': return 'outline';
      default: return 'outline';
    }
  };

  const getRoleIcon = (role: CommitteeMember['role']) => {
    switch (role) {
      case 'chair': return <Crown className="h-3 w-3" />;
      case 'secretary': return <FileText className="h-3 w-3" />;
      default: return <Users className="h-3 w-3" />;
    }
  };

  const getTypeColor = (type: Committee['type']) => {
    switch (type) {
      case 'technical': return 'bg-blue-500/10 text-blue-700 border-blue-200';
      case 'governance': return 'bg-purple-500/10 text-purple-700 border-purple-200';
      case 'outreach': return 'bg-green-500/10 text-green-700 border-green-200';
      case 'finance': return 'bg-orange-500/10 text-orange-700 border-orange-200';
      default: return 'bg-gray-500/10 text-gray-700 border-gray-200';
    }
  };

  return (
    <>
      <Card className="h-full">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-lg">{committee.name}</CardTitle>
              <div className="flex items-center gap-2">
                <ProjectTag />
                <Badge className={`w-fit ${getTypeColor(committee.type)}`}>
                  {committee.type.charAt(0).toUpperCase() + committee.type.slice(1)}
                </Badge>
              </div>
            </div>
            {committee.isEditable && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAddMemberOpen(true)}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Add Member
              </Button>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{committee.description}</p>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-sm">Members ({committee.members.length})</h4>
              {!committee.isEditable && (
                <Badge variant="secondary" className="text-xs">
                  Staff Managed
                </Badge>
              )}
            </div>
            
            <div className="max-h-64 overflow-y-auto space-y-2">
              {committee.members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-3 rounded-lg border bg-muted/30"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="text-xs">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm">{member.name}</div>
                      <div className="text-xs text-muted-foreground">{member.email}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {!(member.role === 'voting-member' && member.isVoting) && (
                      <Badge 
                        variant={getRoleBadgeVariant(member.role)}
                        className="text-xs flex items-center gap-1 font-normal"
                      >
                        {getRoleIcon(member.role)}
                        {member.role.replace('-', ' ')}
                      </Badge>
                    )}
                    
                    {member.isVoting && (
                      <Badge variant="outline" className="text-xs font-normal">
                        Voting
                      </Badge>
                    )}
                    
                    {committee.isEditable && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedMember(member);
                              setChangeRoleOpen(true);
                            }}
                          >
                            <Settings className="h-4 w-4 mr-2" />
                            Change Role
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedMember(member);
                              setRemoveMemberOpen(true);
                            }}
                            className="text-destructive"
                          >
                            <UserMinus className="h-4 w-4 mr-2" />
                            Remove Member
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </div>
              ))}
              
              {committee.members.length === 0 && (
                <div className="text-center py-6 text-muted-foreground">
                  <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No members yet</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <AddMemberDialog
        open={addMemberOpen}
        onOpenChange={setAddMemberOpen}
        committee={committee}
        onAddMember={onAddMember}
      />

      {selectedMember && (
        <>
          <RemoveMemberDialog
            open={removeMemberOpen}
            onOpenChange={setRemoveMemberOpen}
            committee={committee}
            member={selectedMember}
            onRemoveMember={onRemoveMember}
          />

          <ChangeRoleDialog
            open={changeRoleOpen}
            onOpenChange={setChangeRoleOpen}
            committee={committee}
            member={selectedMember}
            onChangeRole={onChangeRole}
          />
        </>
      )}
    </>
  );
}