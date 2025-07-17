import { Badge } from '@/components/ui/badge';
import { useProject } from '@/components/AppSidebar';

interface ProjectTagProps {
  projectName?: string;
  className?: string;
}

export const ProjectTag = ({ projectName, className }: ProjectTagProps) => {
  const { selectedProject } = useProject();
  
  // Only show project tag when "All Projects" is selected
  if (selectedProject !== 'All Projects') {
    return null;
  }

  // Mock project assignment for demo purposes
  const mockProject = projectName || 'Kubernetes';
  
  return (
    <Badge variant="outline" className={`text-xs bg-primary/10 text-primary border-primary/20 ${className}`}>
      {mockProject}
    </Badge>
  );
};