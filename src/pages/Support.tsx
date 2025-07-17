import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Mail, Phone, Clock, CheckCircle } from "lucide-react";

const Support = () => {
  const supportChannels = [
    {
      title: "Live Chat",
      description: "Get instant help from our support team",
      icon: MessageCircle,
      status: "Online",
      availability: "24/7"
    },
    {
      title: "Email Support",
      description: "Send us a detailed message",
      icon: Mail,
      status: "Available",
      availability: "Response within 4 hours"
    },
    {
      title: "Phone Support",
      description: "Speak directly with a support agent",
      icon: Phone,
      status: "Business Hours",
      availability: "Mon-Fri 9AM-6PM EST"
    }
  ];

  const faqItems = [
    {
      question: "How do I create a new committee?",
      category: "Committees"
    },
    {
      question: "How to manage member permissions?",
      category: "Permissions"
    },
    {
      question: "What are the meeting scheduling options?",
      category: "Meetings"
    },
    {
      question: "How to export committee data?",
      category: "Data"
    }
  ];

  return (
    <div className="bg-background">
      <div className="container mx-auto px-6 pt-6 pb-8">
        <div className="animate-fade-in">
          <h1 className="text-2xl font-bold text-foreground font-heading">Support</h1>
          <p className="text-muted-foreground mt-1">
            Get help when you need it most
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {supportChannels.map((channel, index) => (
            <Card key={index} className="animate-fade-in hover-scale" style={{ animationDelay: `${index * 100}ms` }}>
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <channel.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{channel.title}</CardTitle>
                <div className="flex items-center justify-center gap-2">
                  <Badge variant={channel.status === "Online" ? "default" : "secondary"}>
                    {channel.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">{channel.description}</p>
                <p className="text-sm text-muted-foreground mb-4">
                  <Clock className="h-4 w-4 inline mr-1" />
                  {channel.availability}
                </p>
                <Button className="w-full">
                  Contact Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Submit a Support Request</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Subject</label>
                <Input placeholder="Brief description of your issue" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Category</label>
                <select className="w-full mt-1 p-2 border border-border rounded-md bg-background">
                  <option>Technical Issue</option>
                  <option>Account Question</option>
                  <option>Feature Request</option>
                  <option>General Inquiry</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Description</label>
                <Textarea 
                  placeholder="Please provide detailed information about your issue..."
                  className="mt-1 min-h-[120px]"
                />
              </div>
              <Button className="w-full">
                Submit Request
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <div key={index} className="border-b border-border pb-3 last:border-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{item.question}</p>
                        <Badge variant="outline" className="mt-1 text-xs">
                          {item.category}
                        </Badge>
                      </div>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All FAQs
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Support;