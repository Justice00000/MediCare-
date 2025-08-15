import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Video, Phone, MessageSquare, Search, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import CallSystem from './CallSystem';

interface Patient {
  id: string;
  name: string;
  condition: string;
  lastVisit: string;
  priority: 'low' | 'medium' | 'high';
  status: 'online' | 'offline';
}

const PatientCallList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [patients] = useState<Patient[]>(defaultPatients);
  const { toast } = useToast();
  const callSystemRef = useRef<any>(null);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStartCall = (patient: Patient, type: 'video' | 'audio' | 'chat') => {
    if (patient.status === 'offline') {
      toast({
        title: "Patient Unavailable",
        description: `${patient.name} is currently offline.`,
        variant: "destructive"
      });
      return;
    }

    if (type === 'chat') {
      toast({
        title: "Chat Started",
        description: `Started chat with ${patient.name}`,
      });
      return;
    }

    // Start video/audio call
    if (callSystemRef.current) {
      callSystemRef.current.startCall(patient.id, patient.name);
      toast({
        title: "Call Initiated",
        description: `${type === 'video' ? 'Video' : 'Audio'} call started with ${patient.name}`,
      });
    }
  };

  const getPriorityBadge = (priority: string) => {
    const styles = {
      high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
    };
    return <Badge className={styles[priority as keyof typeof styles]}>{priority}</Badge>;
  };

  const getStatusIndicator = (status: string) => (
    <div className={`w-3 h-3 rounded-full ${
      status === 'online' ? 'bg-green-500' : 'bg-gray-400'
    }`} />
  );

  return (
    <>
      <CallSystem ref={callSystemRef} />
      
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg font-semibold">Patient Consultations</h3>
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredPatients.map((patient) => (
            <Card key={patient.id} className="hover-scale">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg" alt={patient.name} />
                      <AvatarFallback>
                        {patient.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1">
                      {getStatusIndicator(patient.status)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{patient.name}</h4>
                    <p className="text-sm text-muted-foreground">{patient.condition}</p>
                  </div>
                  {getPriorityBadge(patient.priority)}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>Last visit: {patient.lastVisit}</span>
                </div>

                {patient.status === 'online' ? (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleStartCall(patient, 'video')}
                      className="flex-1"
                    >
                      <Video className="w-4 h-4 mr-1" />
                      Video
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleStartCall(patient, 'audio')}
                      className="flex-1"
                    >
                      <Phone className="w-4 h-4 mr-1" />
                      Audio
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleStartCall(patient, 'chat')}
                    >
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <Button variant="outline" className="w-full" disabled>
                    Patient Offline
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPatients.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No patients found matching your search.</p>
          </div>
        )}
      </section>
    </>
  );
};

const defaultPatients: Patient[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    condition: 'Hypertension Follow-up',
    lastVisit: '2 days ago',
    priority: 'medium',
    status: 'online'
  },
  {
    id: '2',
    name: 'Robert Smith',
    condition: 'Diabetes Management',
    lastVisit: '1 week ago',
    priority: 'high',
    status: 'online'
  },
  {
    id: '3',
    name: 'Maria Garcia',
    condition: 'Annual Check-up',
    lastVisit: '3 days ago',
    priority: 'low',
    status: 'offline'
  },
  {
    id: '4',
    name: 'David Brown',
    condition: 'Chronic Pain Management',
    lastVisit: '5 days ago',
    priority: 'high',
    status: 'online'
  },
  {
    id: '5',
    name: 'Jennifer Wilson',
    condition: 'Pregnancy Check-up',
    lastVisit: '1 day ago',
    priority: 'medium',
    status: 'online'
  }
];

export default PatientCallList;