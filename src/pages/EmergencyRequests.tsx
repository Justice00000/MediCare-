import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/AppSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Clock, MapPin, Phone, Navigation, CheckCircle, User } from "lucide-react";

const EmergencyRequests = () => {
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);

  // Mock emergency requests data
  const activeRequests = [
    {
      id: "ER001",
      patientName: "John Doe",
      patientAge: 35,
      urgency: "critical",
      symptoms: "Chest pain, difficulty breathing",
      location: "123 Main St, Downtown",
      distance: "2.3 km",
      timeRequested: "5 minutes ago",
      contact: "+1-234-567-8901",
      vitals: {
        heartRate: "110 BPM",
        bloodPressure: "150/90",
        temperature: "100.2°F"
      }
    },
    {
      id: "ER002", 
      patientName: "Sarah Johnson",
      patientAge: 28,
      urgency: "high",
      symptoms: "Severe allergic reaction, swelling",
      location: "456 Oak Ave, Midtown",
      distance: "1.8 km",
      timeRequested: "8 minutes ago",
      contact: "+1-234-567-8902",
      vitals: {
        heartRate: "95 BPM",
        bloodPressure: "140/85",
        temperature: "99.1°F"
      }
    },
    {
      id: "ER003",
      patientName: "Michael Brown",
      patientAge: 42,
      urgency: "medium",
      symptoms: "High fever, headache, nausea",
      location: "789 Pine Rd, Uptown",
      distance: "4.1 km",
      timeRequested: "12 minutes ago",
      contact: "+1-234-567-8903",
      vitals: {
        heartRate: "88 BPM",
        bloodPressure: "130/80",
        temperature: "102.5°F"
      }
    }
  ];

  const recentRequests = [
    {
      id: "ER100",
      patientName: "Emily Davis",
      urgency: "high",
      symptoms: "Asthma attack",
      resolvedAt: "2 hours ago",
      duration: "45 minutes",
      status: "resolved"
    },
    {
      id: "ER099",
      patientName: "Robert Wilson",
      urgency: "medium", 
      symptoms: "Food poisoning symptoms",
      resolvedAt: "5 hours ago",
      duration: "30 minutes",
      status: "resolved"
    },
    {
      id: "ER098",
      patientName: "Lisa Anderson",
      urgency: "critical",
      symptoms: "Severe migraine with vision changes",
      resolvedAt: "1 day ago",
      duration: "1 hour 15 minutes",
      status: "transferred"
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "transferred":
        return <Navigation className="h-4 w-4 text-blue-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Emergency Requests</h1>
          <p className="text-muted-foreground">
            Manage incoming emergency medical requests with location tracking
          </p>
        </div>

        {/* Emergency Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Emergencies</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{activeRequests.length}</div>
              <p className="text-xs text-muted-foreground">Requiring immediate attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Resolved</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Successfully handled</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
              <Clock className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.2m</div>
              <p className="text-xs text-muted-foreground">Average response time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Coverage Area</CardTitle>
              <MapPin className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5.2km</div>
              <p className="text-xs text-muted-foreground">Current radius</p>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Requests Tabs */}
        <Tabs defaultValue="active" className="space-y-4">
          <TabsList>
            <TabsTrigger value="active">Active Requests ({activeRequests.length})</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            <div className="space-y-4">
              {activeRequests.map((request) => (
                <Card key={request.id} className="border-l-4 border-l-red-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <AlertTriangle className="h-6 w-6 text-red-500" />
                        <div>
                          <CardTitle className="text-lg">{request.patientName}, {request.patientAge}</CardTitle>
                          <CardDescription>ID: {request.id} • {request.timeRequested}</CardDescription>
                        </div>
                      </div>
                      <Badge className={getUrgencyColor(request.urgency)}>
                        {request.urgency.toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-3">
                        <div>
                          <p className="font-medium text-sm">Symptoms</p>
                          <p className="text-sm text-muted-foreground">{request.symptoms}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm">{request.location}</p>
                            <p className="text-xs text-muted-foreground">{request.distance} away</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <p className="text-sm">{request.contact}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <p className="font-medium text-sm mb-2">Current Vitals</p>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="bg-muted p-2 rounded">
                              <p className="font-medium">Heart Rate</p>
                              <p>{request.vitals.heartRate}</p>
                            </div>
                            <div className="bg-muted p-2 rounded">
                              <p className="font-medium">BP</p>
                              <p>{request.vitals.bloodPressure}</p>
                            </div>
                            <div className="bg-muted p-2 rounded">
                              <p className="font-medium">Temperature</p>
                              <p>{request.vitals.temperature}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 mt-4">
                      <Button size="sm" className="bg-red-600 hover:bg-red-700">
                        <Phone className="h-4 w-4 mr-2" />
                        Accept Emergency
                      </Button>
                      <Button variant="outline" size="sm">
                        <MapPin className="h-4 w-4 mr-2" />
                        View Location
                      </Button>
                      <Button variant="outline" size="sm">
                        <Navigation className="h-4 w-4 mr-2" />
                        Get Directions
                      </Button>
                      <Button variant="outline" size="sm">
                        Transfer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recent" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recently Resolved</CardTitle>
                <CardDescription>Emergency requests handled in the past 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentRequests.map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(request.status)}
                        <div>
                          <p className="font-medium">{request.patientName}</p>
                          <p className="text-sm text-muted-foreground">{request.symptoms}</p>
                          <p className="text-xs text-muted-foreground">
                            Resolved {request.resolvedAt} • Duration: {request.duration}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getUrgencyColor(request.urgency)}>
                          {request.urgency}
                        </Badge>
                        <Badge variant="secondary" className={
                          request.status === "resolved" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-blue-100 text-blue-800"
                        }>
                          {request.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default EmergencyRequests;