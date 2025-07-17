import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Committee, CommitteeMember } from '@/types/committee';
import { useToast } from '@/hooks/use-toast';

const changeRoleSchema = z.object({
  role: z.enum(['chair', 'secretary', 'member', 'voting-member']),
  isVoting: z.boolean(),
});

type ChangeRoleForm = z.infer<typeof changeRoleSchema>;

interface ChangeRoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  committee: Committee;
  member: CommitteeMember;
  onChangeRole: (committeeId: string, memberId: string, newRole: CommitteeMember['role'], isVoting: boolean) => void;
}

export function ChangeRoleDialog({ 
  open, 
  onOpenChange, 
  committee, 
  member, 
  onChangeRole 
}: ChangeRoleDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<ChangeRoleForm>({
    resolver: zodResolver(changeRoleSchema),
    defaultValues: {
      role: member.role,
      isVoting: member.isVoting,
    },
  });

  const onSubmit = async (data: ChangeRoleForm) => {
    setIsLoading(true);
    try {
      // Check if there's already a chair and we're trying to assign another chair
      if (data.role === 'chair') {
        const existingChair = committee.members.find(m => m.role === 'chair' && m.id !== member.id);
        if (existingChair) {
          toast({
            title: 'Cannot assign chair role',
            description: `${existingChair.name} is already the chair of this committee. Please change their role first.`,
            variant: 'destructive',
          });
          return;
        }
      }

      onChangeRole(committee.id, member.id, data.role, data.isVoting);
      
      toast({
        title: 'Role updated',
        description: `${member.name}'s role has been updated to ${data.role.replace('-', ' ')}.`,
      });
      
      onOpenChange(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update role. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Role</DialogTitle>
          <DialogDescription>
            Update the role for <strong>{member.name}</strong> in {committee.name}.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Role</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="member">Member</SelectItem>
                      <SelectItem value="voting-member">Voting Member</SelectItem>
                      <SelectItem value="secretary">Secretary</SelectItem>
                      <SelectItem value="chair">Chair</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isVoting"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Voting member
                    </FormLabel>
                    <p className="text-sm text-muted-foreground">
                      This member will have voting rights in committee decisions.
                    </p>
                  </div>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Updating...' : 'Update Role'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}