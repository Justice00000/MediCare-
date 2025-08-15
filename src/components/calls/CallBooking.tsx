import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar, Video, Phone, MessageSquare, Star, MapPin, Clock } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import CallSystem from './CallSystem';

interface MedicalProfessional {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  distance?: number;
  status: 'available' | 'busy' | 'offline';
  nextAvailable?: string;
}

interface CallBookingProps {
  professionals?: MedicalProfessional[];
  showNearby?: boolean;
}

const CallBooking: React.FC<CallBookingProps> = ({ 
  professionals = defaultProfessionals, 
  showNearby = true 
}) => {
  const [selectedProfessional, setSelectedProfessional] = useState<MedicalProfessional | null>(null);
  const [callType, setCallType] = useState<'video' | 'audio' | 'chat'>('video');
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const { toast } = useToast();
  const callSystemRef = useRef<any>(null);

  const handleStartCall = (professional: MedicalProfessional, type: 'video' | 'audio' | 'chat') => {
    if (professional.status === 'offline') {
      toast({
        title: "Professional Unavailable",
        description: `${professional.name} is currently offline. Next available: ${professional.nextAvailable}`,
        variant: "destructive"
      });
      return;
    }

    if (type === 'chat') {
      toast({
        title: "Chat Started",
        description: `Started chat consultation with ${professional.name}`,
      });
      return;
    }

    // Start video/audio call
    if (callSystemRef.current) {
      callSystemRef.current.startCall(professional.id, professional.name);
      toast({
        title: "Call Initiated",
        description: `${type === 'video' ? 'Video' : 'Audio'} call started with ${professional.name}`,
      });
    }
  };

  const handleBookAppointment = () => {
    if (!selectedProfessional) return;
    
    toast({
      title: "Appointment Booked",
      description: `Your ${callType} consultation with ${selectedProfessional.name} has been scheduled.`,
    });
    setIsBookingDialogOpen(false);
    setSelectedProfessional(null);
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      available: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      busy: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      offline: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    };
    return <Badge className={styles[status as keyof typeof styles]}>{status}</Badge>;
  };

  return (
    <>
      <CallSystem ref={callSystemRef} />
      
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            {showNearby ? 'Available Medical Professionals' : 'Your Patients'}
          </h3>
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            View Schedule
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {professionals.map((professional) => (
            <Card key={professional.id} className="hover-scale">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" alt={professional.name} />
                    <AvatarFallback>
                      {professional.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-medium">{professional.name}</h4>
                    <p className="text-sm text-muted-foreground">{professional.specialty}</p>
                  </div>
                  {getStatusBadge(professional.status)}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    {professional.rating}
                  </span>
                  {professional.distance && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {professional.distance.toFixed(1)} km
                    </span>
                  )}
                  {professional.nextAvailable && professional.status !== 'available' && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {professional.nextAvailable}
                    </span>
                  )}
                </div>

                {professional.status === 'available' ? (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleStartCall(professional, 'video')}
                      className="flex-1"
                    >
                      <Video className="w-4 h-4 mr-1" />
                      Video
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleStartCall(professional, 'audio')}
                      className="flex-1"
                    >
                      <Phone className="w-4 h-4 mr-1" />
                      Audio
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleStartCall(professional, 'chat')}
                    >
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setSelectedProfessional(professional)}
                      >
                        Book Appointment
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Book Consultation</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src="/placeholder.svg" alt={selectedProfessional?.name} />
                            <AvatarFallback>
                              {selectedProfessional?.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{selectedProfessional?.name}</p>
                            <p className="text-sm text-muted-foreground">{selectedProfessional?.specialty}</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Consultation Type</label>
                          <Select value={callType} onValueChange={(value: any) => setCallType(value)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="video">Video Call</SelectItem>
                              <SelectItem value="audio">Audio Call</SelectItem>
                              <SelectItem value="chat">Chat</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Preferred Time</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select time slot" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="next">Next Available</SelectItem>
                              <SelectItem value="morning">Morning (9:00 AM - 12:00 PM)</SelectItem>
                              <SelectItem value="afternoon">Afternoon (1:00 PM - 5:00 PM)</SelectItem>
                              <SelectItem value="evening">Evening (6:00 PM - 9:00 PM)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <Button onClick={handleBookAppointment} className="w-full">
                          Confirm Booking
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
};

const defaultProfessionals: MedicalProfessional[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'General Practitioner',
    rating: 4.8,
    distance: 1.2,
    status: 'available'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Cardiologist',
    rating: 4.9,
    distance: 2.1,
    status: 'busy',
    nextAvailable: '2:00 PM'
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrician',
    rating: 4.7,
    distance: 3.5,
    status: 'available'
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    specialty: 'Psychiatrist',
    rating: 4.6,
    distance: 0.8,
    status: 'offline',
    nextAvailable: 'Tomorrow 9:00 AM'
  }
];

export default CallBooking;