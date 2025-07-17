import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users, 
  Calendar,
  GitBranch,
  Clock,
  Shield,
  AlertTriangle,
  CheckCircle,
  Building,
  GraduationCap,
  ArrowUpRight,
  ArrowDownRight,
  ExternalLink
} from "lucide-react";

const Analytics = () => {
  // Mock data for Executive Director Overview
  const contributorStats = {
    active: { value: 487, change: "+15%", trend: "up" },
    newVsReturning: { new: 32, returning: 68 },
    retention: { value: 74, change: "+5%" },
    newInterest: { value: 25, change: "+8%" }
  };

  const organizationStats = {
    participating: { value: 34, change: "+6" },
    topOrgShare: { value: 28, warning: false },
    newOrgs: { value: 7, change: "+3" },
    satisfaction: { value: 8.2, change: "+0.3" }
  };

  const projectStats = {
    prsMonth: { value: 142, change: "+12%" },
    prCycleTime: { value: 3.2, change: "-0.5" },
    testPassRate: { value: 97, change: "+2%" },
    issueResolution: { value: 8, change: "-2" }
  };

  const mentorshipStats = {
    newContributors: { value: 28, retention: 64 },
    activeMentees: { value: 12, completion: 83 },
    newMaintainers: { value: 3, change: "+1" },
    diversity: { value: 35, change: "+8%" }
  };

  const governanceStats = {
    complianceScore: { value: 94, status: "excellent" },
    vulnerabilities: { value: 0, trend: "good" },
    busFactor: { value: 6, status: "healthy" },
    nps: { value: 52, change: "+3" }
  };

  const StatusIndicator = ({ status, value }: { status: "good" | "warning" | "critical", value?: string | number }) => {
    const colors = {
      good: "text-green-600 bg-green-50",
      warning: "text-yellow-600 bg-yellow-50", 
      critical: "text-red-600 bg-red-50"
    };
    
    const icons = {
      good: <CheckCircle className="h-3 w-3" />,
      warning: <AlertTriangle className="h-3 w-3" />,
      critical: <AlertTriangle className="h-3 w-3" />
    };

    return (
      <Badge className={colors[status]} variant="secondary">
        {icons[status]}
        {value && <span className="ml-1">{value}</span>}
      </Badge>
    );
  };

  const TrendIndicator = ({ change, showIcon = true }: { change: string, showIcon?: boolean }) => {
    const isPositive = change.startsWith('+');
    const isNegative = change.startsWith('-');
    
    return (
      <span className={`flex items-center text-xs ${
        isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-muted-foreground'
      }`}>
        {showIcon && isPositive && <ArrowUpRight className="h-3 w-3 mr-1" />}
        {showIcon && isNegative && <ArrowDownRight className="h-3 w-3 mr-1" />}
        {change}
      </span>
    );
  };

  const MetricCard = ({ 
    title, 
    children, 
    drillDown,
    className = ""
  }: { 
    title: string, 
    children: React.ReactNode, 
    drillDown?: string,
    className?: string 
  }) => (
    <Card className={`hover:shadow-md transition-shadow ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          {drillDown && (
            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
              <ExternalLink className="h-3 w-3" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {children}
      </CardContent>
    </Card>
  );

  return (
    <div className="bg-background">
      <div className="container mx-auto px-6 pt-6 pb-8 max-w-7xl">
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground font-heading">Executive Director Overview</h1>
          <p className="text-muted-foreground mt-2">
            Critical insights across project health, community growth, and governance excellence
          </p>
        </div>

        {/* Contributor Growth Rate & Retention */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Contributor Growth Rate & Retention</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard title="Active Contributors (12mo)" drillDown="contributor-health">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-foreground">{contributorStats.active.value}</div>
                <div className="flex items-center justify-between">
                  <TrendIndicator change={contributorStats.active.change} />
                  <span className="text-xs text-muted-foreground">YoY</span>
                </div>
              </div>
            </MetricCard>

            <MetricCard title="New vs Returning Contributors" drillDown="contributor-retention">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>New: {contributorStats.newVsReturning.new}%</span>
                  <span>Returning: {contributorStats.newVsReturning.returning}%</span>
                </div>
                <Progress value={contributorStats.newVsReturning.new} className="h-2" />
              </div>
            </MetricCard>

            <MetricCard title="12-Month Retention Rate" drillDown="retention-analysis">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-foreground">{contributorStats.retention.value}%</div>
                <div className="flex items-center justify-between">
                  <TrendIndicator change={contributorStats.retention.change} />
                  <StatusIndicator status="good" />
                </div>
              </div>
            </MetricCard>

            <MetricCard title="New Contributor Participation" drillDown="newcomer-conversion">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-foreground">{contributorStats.newInterest.value}%</div>
                <div className="flex items-center justify-between">
                  <TrendIndicator change={contributorStats.newInterest.change} />
                  <span className="text-xs text-muted-foreground">of PRs</span>
                </div>
              </div>
            </MetricCard>
          </div>
        </div>

        {/* Member Organization Engagement & Satisfaction */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <Building className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Member Organization Engagement & Satisfaction</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard title="Participating Organizations" drillDown="participating-orgs">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-foreground">{organizationStats.participating.value}</div>
                <div className="flex items-center justify-between">
                  <TrendIndicator change={organizationStats.participating.change} showIcon={false} />
                  <span className="text-xs text-muted-foreground">this quarter</span>
                </div>
              </div>
            </MetricCard>

            <MetricCard title="Top Organization Share" drillDown="contribution-balance">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-foreground">{organizationStats.topOrgShare.value}%</div>
                <div className="flex items-center justify-between">
                  <StatusIndicator status="good" value="Balanced" />
                  <span className="text-xs text-muted-foreground">of commits</span>
                </div>
              </div>
            </MetricCard>

            <MetricCard title="New Organizations (Q1)" drillDown="org-diversity">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-foreground">{organizationStats.newOrgs.value}</div>
                <div className="flex items-center justify-between">
                  <TrendIndicator change={organizationStats.newOrgs.change} showIcon={false} />
                  <span className="text-xs text-muted-foreground">started contributing</span>
                </div>
              </div>
            </MetricCard>

            <MetricCard title="Member Satisfaction" drillDown="community-sentiment">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-foreground">{organizationStats.satisfaction.value}/10</div>
                <div className="flex items-center justify-between">
                  <TrendIndicator change={organizationStats.satisfaction.change} />
                  <StatusIndicator status="good" />
                </div>
              </div>
            </MetricCard>
          </div>
        </div>

        {/* Project Velocity & Quality */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <GitBranch className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Project Velocity & Quality</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard title="PRs Merged (Last Month)" drillDown="activity-trends">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-foreground">{projectStats.prsMonth.value}</div>
                <div className="flex items-center justify-between">
                  <TrendIndicator change={projectStats.prsMonth.change} />
                  <StatusIndicator status="good" />
                </div>
              </div>
            </MetricCard>

            <MetricCard title="PR Cycle Time (Median)" drillDown="pr-cycle-time">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-foreground">{projectStats.prCycleTime.value}d</div>
                <div className="flex items-center justify-between">
                  <TrendIndicator change={`${projectStats.prCycleTime.change}d`} />
                  <span className="text-xs text-muted-foreground">improved</span>
                </div>
              </div>
            </MetricCard>

            <MetricCard title="Test Pass Rate" drillDown="quality-metrics">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-foreground">{projectStats.testPassRate.value}%</div>
                <div className="flex items-center justify-between">
                  <TrendIndicator change={projectStats.testPassRate.change} />
                  <StatusIndicator status="good" />
                </div>
              </div>
            </MetricCard>

            <MetricCard title="Issue Resolution Time" drillDown="issue-management">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-foreground">{projectStats.issueResolution.value}d</div>
                <div className="flex items-center justify-between">
                  <TrendIndicator change={`${projectStats.issueResolution.change}d`} />
                  <span className="text-xs text-muted-foreground">median</span>
                </div>
              </div>
            </MetricCard>
          </div>
        </div>

        {/* Mentorship & Talent Development */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Mentorship & Talent Development</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard title="New Contributors (Q1)" drillDown="newcomer-onboarding">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-foreground">{mentorshipStats.newContributors.value}</div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-green-600">{mentorshipStats.newContributors.retention}% retained</span>
                  <StatusIndicator status="good" />
                </div>
              </div>
            </MetricCard>

            <MetricCard title="Active Mentorship Programs" drillDown="mentorship-tracking">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-foreground">{mentorshipStats.activeMentees.value}</div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-green-600">{mentorshipStats.activeMentees.completion}% completion</span>
                  <span className="text-xs text-muted-foreground">mentees</span>
                </div>
              </div>
            </MetricCard>

            <MetricCard title="New Maintainers (6mo)" drillDown="leadership-pipeline">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-foreground">{mentorshipStats.newMaintainers.value}</div>
                <div className="flex items-center justify-between">
                  <TrendIndicator change={mentorshipStats.newMaintainers.change} showIcon={false} />
                  <span className="text-xs text-muted-foreground">appointed</span>
                </div>
              </div>
            </MetricCard>

            <MetricCard title="Diversity in Pipeline" drillDown="inclusion-metrics">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-foreground">{mentorshipStats.diversity.value}%</div>
                <div className="flex items-center justify-between">
                  <TrendIndicator change={mentorshipStats.diversity.change} />
                  <span className="text-xs text-muted-foreground">underrepresented</span>
                </div>
              </div>
            </MetricCard>
          </div>
        </div>

        {/* Governance & Compliance Excellence */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Governance & Compliance Excellence</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard title="Best Practices Score" drillDown="project-scorecard">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-foreground">{governanceStats.complianceScore.value}%</div>
                <div className="flex items-center justify-between">
                  <StatusIndicator status="good" value="Excellent" />
                  <span className="text-xs text-muted-foreground">OpenSSF</span>
                </div>
              </div>
            </MetricCard>

            <MetricCard title="Security Posture" drillDown="security-overview">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-foreground">{governanceStats.vulnerabilities.value}</div>
                <div className="flex items-center justify-between">
                  <StatusIndicator status="good" value="Clean" />
                  <span className="text-xs text-muted-foreground">open CVEs</span>
                </div>
              </div>
            </MetricCard>

            <MetricCard title="Bus Factor" drillDown="maintainer-diversity">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-foreground">{governanceStats.busFactor.value}</div>
                <div className="flex items-center justify-between">
                  <StatusIndicator status="good" value="Healthy" />
                  <span className="text-xs text-muted-foreground">key contributors</span>
                </div>
              </div>
            </MetricCard>

            <MetricCard title="Community Trust (NPS)" drillDown="community-sentiment">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-foreground">+{governanceStats.nps.value}</div>
                <div className="flex items-center justify-between">
                  <TrendIndicator change={`+${governanceStats.nps.change}`} />
                  <StatusIndicator status="good" />
                </div>
              </div>
            </MetricCard>
          </div>
        </div>

        {/* Quick Action Items */}
        <div className="mt-8">
          <Card className="bg-muted/30">
            <CardHeader>
              <CardTitle className="text-lg">Key Insights & Recommended Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">Strong contributor growth (+15% YoY)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">Excellent security posture (0 open CVEs)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">Balanced organizational participation</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">Consider expanding mentorship programs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">Monitor PR cycle time trends</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">Investigate diversity improvement opportunities</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;