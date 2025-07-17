export interface CommitteeMember {
  id: string;
  name: string;
  email: string;
  role: 'chair' | 'secretary' | 'member' | 'voting-member';
  joinDate: string;
  isVoting: boolean;
  avatar?: string;
}

export interface Committee {
  id: string;
  name: string;
  description: string;
  type: 'technical' | 'governance' | 'outreach' | 'finance';
  isEditable: boolean; // false for LF staff-managed committees
  members: CommitteeMember[];
  createdAt: string;
  meetingSchedule?: string;
}

export interface AddMemberRequest {
  committeeId: string;
  email: string;
  role: CommitteeMember['role'];
  isVoting: boolean;
}

export interface RemoveMemberRequest {
  committeeId: string;
  memberId: string;
  reason: string;
  effectiveDate: string;
}

export interface ChangeRoleRequest {
  committeeId: string;
  memberId: string;
  newRole: CommitteeMember['role'];
  isVoting: boolean;
}