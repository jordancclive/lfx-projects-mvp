import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, createContext, useContext } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const navigationItems = [
  {
    title: 'Home',
    url: '/',
    icon: 'home' as const,
    isExternal: false,
  },
  {
    title: 'Collaboration',
    url: '/collaboration',
    icon: 'users' as const,
    isExternal: false,
  },
  {
    title: 'Committees',
    url: '/committees',
    icon: 'user-group' as const,
    isExternal: false,
  },
  {
    title: 'Analytics',
    url: '/analytics',
    icon: 'chart-line' as const,
    isExternal: false,
  },
];

const bottomMenuItems = [
  {
    title: 'Documentation',
    url: 'https://docs.linuxfoundation.org/lfx',
    icon: 'book' as const,
    isExternal: true,
  },
  {
    title: 'Support',
    url: 'https://jira.linuxfoundation.org/plugins/servlet/desk/portal/4/create/358',
    icon: 'circle-question' as const,
    isExternal: true,
  },
  {
    title: 'John Smith',
    url: '/profile',
    icon: 'user' as const,
    isExternal: false,
  },
];

// Mock projects data
const projects = [
  'All Projects',
  'Kubernetes',
  'CNCF',
  'Linux Foundation',
  'OpenJS Foundation',
  'Hyperledger',
  'SPDX',
  'TODO Group'
];

// Global context for selected project
const ProjectContext = createContext<{
  selectedProject: string;
  setSelectedProject: (project: string) => void;
}>({
  selectedProject: 'All Projects',
  setSelectedProject: () => {},
});

export const useProject = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedProject, setSelectedProject] = useState('All Projects');
  
  return (
    <ProjectContext.Provider value={{ selectedProject, setSelectedProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

export function AppSidebar() {
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
  const { selectedProject, setSelectedProject } = useProject();

  return (
    <Sidebar className="w-60 border-none shadow-medium">
      <SidebarContent>
        <div className="pt-8 px-6 pb-6">
          <div className="flex items-center justify-start">
            <img src="/lfx-logo.svg" alt="LFX" className="h-5 w-auto" />
          </div>
          
          {/* Product Switcher - Aligned with menu items below */}
          <div className="flex items-center justify-between mt-4 pl-3 pr-4 py-3 rounded-lg bg-muted/30">
            <div className="flex items-center gap-3">
              <FontAwesomeIcon icon="laptop-code" className="h-4 w-4 text-primary" />
              <span className="text-base font-semibold text-foreground">Projects</span>
            </div>
            
            <DropdownMenu open={isProductMenuOpen} onOpenChange={setIsProductMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <FontAwesomeIcon icon="grip-vertical" className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" side="right" sideOffset={8} className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground">Community</DropdownMenuLabel>
                  <DropdownMenuItem>Crowdfunding</DropdownMenuItem>
                  <DropdownMenuItem>Drive</DropdownMenuItem>
                  <DropdownMenuItem>Individual Dashboard</DropdownMenuItem>
                  <DropdownMenuItem>Insights</DropdownMenuItem>
                  <DropdownMenuItem>Mentorship</DropdownMenuItem>
                </DropdownMenuGroup>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground">Organizations</DropdownMenuLabel>
                  <DropdownMenuItem>Organization Dashboard</DropdownMenuItem>
                </DropdownMenuGroup>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground">Projects</DropdownMenuLabel>
                  <DropdownMenuItem>Community Data</DropdownMenuItem>
                  <DropdownMenuItem>EasyCLA</DropdownMenuItem>
                  <DropdownMenuItem>Project Control Center</DropdownMenuItem>
                  <DropdownMenuItem>Security</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Project Picker Dropdown */}
          <div className="mt-4">
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a project" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project} value={project}>
                    {project}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                    >
                      {({ isActive }) => (
                        <div className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                          isActive 
                            ? 'bg-[#ECF4FF] text-foreground shadow-medium font-semibold border-l-4 border-primary w-full' 
                            : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground hover:shadow-soft w-full'
                        }`}>
                          <FontAwesomeIcon icon={item.icon} className={`h-4 w-4 ${isActive ? 'text-foreground' : ''}`} />
                          <span>{item.title}</span>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        {/* Bottom Menu */}
        <div className="mt-auto">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {bottomMenuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      {item.isExternal ? (
                        <a 
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-muted/50 text-muted-foreground hover:text-foreground hover:shadow-soft w-full"
                        >
                          <FontAwesomeIcon icon={item.icon} className="h-4 w-4" />
                          <span>{item.title}</span>
                        </a>
                      ) : (
                        <NavLink 
                          to={item.url} 
                        >
                          {({ isActive }) => (
                            <div className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                              isActive 
                                ? 'bg-[#ECF4FF] text-foreground shadow-medium font-semibold border-l-4 border-primary w-full' 
                                : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground hover:shadow-soft w-full'
                            }`}>
                              <FontAwesomeIcon icon={item.icon} className={`h-4 w-4 ${isActive ? 'text-foreground' : ''}`} />
                              <span>{item.title}</span>
                            </div>
                          )}
                        </NavLink>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}