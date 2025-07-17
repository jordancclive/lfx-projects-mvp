import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Search, ExternalLink, FileText } from "lucide-react";

const Documentation = () => {
  const docCategories = [
    {
      title: "Getting Started",
      description: "Learn the basics of LFX platform",
      articles: 8,
      badge: "Essential"
    },
    {
      title: "Committee Management",
      description: "How to create and manage committees",
      articles: 12,
      badge: "Popular"
    },
    {
      title: "Collaboration Tools",
      description: "Make the most of collaboration features",
      articles: 6,
      badge: "New"
    },
    {
      title: "API Reference",
      description: "Technical documentation for developers",
      articles: 15,
      badge: "Technical"
    }
  ];

  const recentDocs = [
    "Setting up your first committee",
    "Managing member permissions",
    "Scheduling and conducting meetings",
    "Using collaboration tools effectively"
  ];

  return (
    <div className="bg-background">
      <div className="container mx-auto px-6 pt-6 pb-8">
        <div className="animate-fade-in">
          <h1 className="text-2xl font-bold text-foreground font-heading">Documentation</h1>
          <p className="text-muted-foreground mt-1">
            Find guides, tutorials, and technical references
          </p>
        </div>

        <div className="mt-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search documentation..."
              className="pl-10 w-full max-w-md"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {docCategories.map((category, index) => (
            <Card key={index} className="animate-fade-in hover-scale" style={{ animationDelay: `${index * 100}ms` }}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      {category.title}
                    </CardTitle>
                    <Badge variant="secondary">{category.badge}</Badge>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {category.articles} articles
                  </span>
                  <Button variant="outline" size="sm">
                    Browse
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Recently Updated
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentDocs.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <span className="text-foreground">{doc}</span>
                    <Button variant="ghost" size="sm" className="text-primary">
                      Read
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Documentation;