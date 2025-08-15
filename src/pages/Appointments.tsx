import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/AppSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar as CalendarIcon, Clock, User, Video, MessageSquare, Phone, Plus } from "lucide-react";

const Appointments = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Mock appointments data
  const upcomingAppointments = [
    {
      id: 1,
      patientName: "Dr. Sarah Johnson",
      doctorName: "Dr. Sarah Johnson", // For medical practitioner view
      patientAge: 35,
      date: "2024-03-15",
      time: "10:00 AM",
      duration: "30 min",
      type: "video",
      status: "confirmed",
      reason: "Regular checkup and blood pressure monitoring",
      avatar: "/placeholder.svg"
    },
    {
      id: 2,
      patientName: "Dr. Michael Brown",
      doctorName: "Dr. Michael Brown",
      patientAge: 42,
      date: "2024-03-15",
      time: "2:30 PM", 
      duration: "45 min",
      type: "chat",
      status: "confirmed",
      reason: "Follow-up on diabetes management",
      avatar: "/placeholder.svg"
    },
    {
      id: 3,
      patientName: "Dr. Emily Davis",
      doctorName: "Dr. Emily Davis",
      patientAge: 28,
      date: "2024-03-16",
      time: "9:15 AM",
      duration: "30 min",
      type: "audio",
      status: "pending",
      reason: "Mental health consultation",
      avatar: "/placeholder.svg"
    }
  ];

  const pastAppointments = [
    {
      id: 4,
      patientName: "Dr. Robert Wilson",
      doctorName: "Dr. Robert Wilson",
      date: "2024-03-10",
      time: "11:00 AM",
      duration: "30 min",
      type: "video",
      status: "completed",
      reason: "Allergy consultation",
      rating: 5,
      avatar: "/placeholder.svg"
    },
    {
      id: 5,
      patientName: "Dr. Lisa Anderson",
      doctorName: "Dr. Lisa Anderson", 
      date: "2024-03-08",
      time: "3:00 PM",
      duration: "45 min",
      type: "chat",
      status: "completed",
      reason: "Skin condition follow-up",
      rating: 4,
      avatar: "/placeholder.svg"
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />;
      case "audio":
        return <Phone className="h-4 w-4" />;
      case "chat":
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "video":
        return "bg-purple-100 text-purple-800";
      case "audio":
        return "bg-blue-100 text-blue-800";
      case "chat":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
          <p className="text-muted-foreground">
            Manage your consultations and connect with healthcare professionals
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">2 confirmed, 1 pending</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Scheduled consultations</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <div className="text-yellow-500">★</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8</div>
              <p className="text-xs text-muted-foreground">Patient satisfaction</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Calendar */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>Select a date to view appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
              <Button className="w-full mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Schedule New Appointment
              </Button>
            </CardContent>
          </Card>

          {/* Appointments List */}
          <div className="lg:col-span-2 space-y-4">
            <Tabs defaultValue="upcoming" className="space-y-4">
              <TabsList>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Appointments</CardTitle>
                    <CardDescription>Your scheduled consultations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingAppointments.map((appointment) => (
                        <div key={appointment.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                          <Avatar>
                            <AvatarImage src={appointment.avatar} />
                            <AvatarFallback>
                              {appointment.patientName.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <p className="font-medium">{appointment.patientName}</p>
                              <div className="flex space-x-2">
                                <Badge variant="secondary" className={getTypeColor(appointment.type)}>
                                  {getTypeIcon(appointment.type)}
                                  <span className="ml-1 capitalize">{appointment.type}</span>
                                </Badge>
                                <Badge variant="secondary" className={getStatusColor(appointment.status)}>
                                  {appointment.status}
                                </Badge>
                              </div>
                            </div>
                            
                            <p className="text-sm text-muted-foreground">{appointment.reason}</p>
                            
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <CalendarIcon className="h-4 w-4" />
                                <span>{appointment.date}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>{appointment.time} ({appointment.duration})</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            {appointment.status === "confirmed" && (
                              <Button size="sm">
                                {getTypeIcon(appointment.type)}
                                <span className="ml-2">Join</span>
                              </Button>
                            )}
                            <Button variant="outline" size="sm">
                              Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="past" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Past Appointments</CardTitle>
                    <CardDescription>Your consultation history</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {pastAppointments.map((appointment) => (
                        <div key={appointment.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                          <Avatar>
                            <AvatarImage src={appointment.avatar} />
                            <AvatarFallback>
                              {appointment.patientName.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <p className="font-medium">{appointment.patientName}</p>
                              <div className="flex space-x-2">
                                <Badge variant="secondary" className={getTypeColor(appointment.type)}>
                                  {getTypeIcon(appointment.type)}
                                  <span className="ml-1 capitalize">{appointment.type}</span>
                                </Badge>
                                <Badge variant="secondary" className={getStatusColor(appointment.status)}>
                                  {appointment.status}
                                </Badge>
                              </div>
                            </div>
                            
                            <p className="text-sm text-muted-foreground">{appointment.reason}</p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <div className="flex items-center space-x-1">
                                  <CalendarIcon className="h-4 w-4" />
                                  <span>{appointment.date}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock className="h-4 w-4" />
                                  <span>{appointment.time}</span>
                                </div>
                              </div>
                              {appointment.rating && (
                                <div className="flex items-center space-x-1">
                                  <span className="text-sm text-muted-foreground">Rating:</span>
                                  <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                      <span key={i} className={`text-sm ${i < appointment.rating ? 'text-yellow-500' : 'text-gray-300'}`}>
                                        ★
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              View Notes
                            </Button>
                            <Button variant="outline" size="sm">
                              Rebook
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Appointments;