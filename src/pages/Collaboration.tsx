import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CreateMeetingDialog } from '@/components/meetings/CreateMeetingDialog';
import Meetings from './Meetings';
import MailingLists from '../components/MailingLists';
import Footer from '../components/Footer';

const Collaboration = () => {
  const [activeTab, setActiveTab] = useState('meetings');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isCreateMailingListOpen, setIsCreateMailingListOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background">
        <div className="container mx-auto px-6 pt-6 pb-8">
          <div className="animate-fade-in">
            <h1 className="text-3xl font-bold text-foreground font-heading">Collaboration</h1>
            <p className="text-muted-foreground mt-1">
              Manage meetings and communication channels for your project
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="grid w-full max-w-md grid-cols-2 bg-transparent p-0 h-auto">
              <TabsTrigger 
                value="meetings" 
                className="flex items-center gap-2 bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:border-b-2 data-[state=active]:border-primary text-muted-foreground border-b-2 border-transparent rounded-none pb-2 font-semibold text-sm"
              >
                <FontAwesomeIcon icon="calendar-days" className="h-4 w-4" />
                Meetings
              </TabsTrigger>
              <TabsTrigger 
                value="mailing-lists" 
                className="flex items-center gap-2 bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:border-b-2 data-[state=active]:border-primary text-muted-foreground border-b-2 border-transparent rounded-none pb-2 font-semibold text-sm"
              >
                <FontAwesomeIcon icon="envelope" className="h-4 w-4" />
                Mailing Lists
              </TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-4">
              {activeTab === 'meetings' && (
                <Button 
                  onClick={() => setIsCreateDialogOpen(true)}
                  className="bg-gradient-primary hover:bg-primary-hover shadow-medium transition-all duration-200 hover:shadow-strong"
                >
                  <FontAwesomeIcon icon="plus" className="h-4 w-4 mr-2" />
                  Create Meeting
                </Button>
              )}
              
              {activeTab === 'mailing-lists' && (
                <Button 
                  onClick={() => setIsCreateMailingListOpen(true)}
                  className="bg-gradient-primary hover:bg-primary-hover shadow-medium transition-all duration-200 hover:shadow-strong"
                >
                  <FontAwesomeIcon icon="plus" className="h-4 w-4 mr-2" />
                  Create Mailing List
                </Button>
              )}
            </div>
          </div>

          <TabsContent value="meetings" className="space-y-4">
            <Meetings isCreateDialogOpen={isCreateDialogOpen} setIsCreateDialogOpen={setIsCreateDialogOpen} />
          </TabsContent>

          <TabsContent value="mailing-lists" className="space-y-4">
            <MailingLists 
              isCreateDialogOpen={isCreateMailingListOpen} 
              setIsCreateDialogOpen={setIsCreateMailingListOpen} 
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Create Meeting Dialog */}
      <CreateMeetingDialog 
        open={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen}
      />
      
      <Footer />
    </div>
  );
};

export default Collaboration;