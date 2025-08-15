import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/AppSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileText, Search, Calendar, Download, User, Heart, Activity, Thermometer, Plus } from "lucide-react";

const Records = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock medical records data
  const recentRecords = [
    {
      id: 1,
      date: "2024-03-10",
      doctor: "Dr. Sarah Johnson",
      type: "General Consultation",
      diagnosis: "Hypertension management",
      prescription: "Lisinopril 10mg daily",
      notes: "Blood pressure well controlled. Continue current medication.",
      vitals: {
        bloodPressure: "125/80",
        heartRate: "72 BPM",
        temperature: "98.6°F",
        weight: "155 lbs"
      }
    },
    {
      id: 2,
      date: "2024-03-05",
      doctor: "Dr. Michael Brown",
      type: "Emergency Consultation",
      diagnosis: "Acute bronchitis",
      prescription: "Azithromycin 500mg, Albuterol inhaler",
      notes: "Patient presented with persistent cough and chest congestion. Prescribed antibiotics and bronchodilator.",
      vitals: {
        bloodPressure: "130/85",
        heartRate: "88 BPM", 
        temperature: "100.2°F",
        weight: "155 lbs"
      }
    },
    {
      id: 3,
      date: "2024-02-28",
      doctor: "Dr. Emily Davis",
      type: "Mental Health",
      diagnosis: "Anxiety management",
      prescription: "Sertraline 50mg daily",
      notes: "Patient reports improved anxiety levels with current medication. Continue therapy sessions.",
      vitals: {
        bloodPressure: "120/78",
        heartRate: "75 BPM",
        temperature: "98.4°F",
        weight: "153 lbs"
      }
    }
  ];

  const labResults = [
    {
      id: 1,
      date: "2024-03-08",
      test: "Complete Blood Count",
      status: "Normal",
      doctor: "Dr. Sarah Johnson",
      results: {
        "White Blood Cells": "7.2 K/uL (Normal)",
        "Red Blood Cells": "4.5 M/uL (Normal)",
        "Hemoglobin": "14.2 g/dL (Normal)",
        "Platelets": "285 K/uL (Normal)"
      }
    },
    {
      id: 2,
      date: "2024-02-25",
      test: "Lipid Panel",
      status: "Attention Needed",
      doctor: "Dr. Sarah Johnson",
      results: {
        "Total Cholesterol": "220 mg/dL (High)",
        "LDL Cholesterol": "140 mg/dL (High)",
        "HDL Cholesterol": "45 mg/dL (Normal)",
        "Triglycerides": "150 mg/dL (Normal)"
      }
    }
  ];

  const prescriptions = [
    {
      id: 1,
      medication: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      prescribedBy: "Dr. Sarah Johnson",
      dateIssued: "2024-03-10",
      refillsLeft: 2,
      status: "Active"
    },
    {
      id: 2,
      medication: "Sertraline",
      dosage: "50mg",
      frequency: "Once daily",
      prescribedBy: "Dr. Emily Davis",
      dateIssued: "2024-02-28",
      refillsLeft: 1,
      status: "Active"
    },
    {
      id: 3,
      medication: "Azithromycin",
      dosage: "500mg",
      frequency: "Once daily for 5 days",
      prescribedBy: "Dr. Michael Brown",
      dateIssued: "2024-03-05",
      refillsLeft: 0,
      status: "Completed"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "normal":
      case "active":
        return "bg-green-100 text-green-800";
      case "attention needed":
      case "high":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "critical":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredRecords = recentRecords.filter(record =>
    record.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.diagnosis.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Medical Records</h1>
          <p className="text-muted-foreground">
            View your complete medical history, prescriptions, and lab results
          </p>
        </div>

        {/* Search */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search records by doctor, type, or diagnosis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Records
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Records</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{recentRecords.length}</div>
              <p className="text-xs text-muted-foreground">Medical consultations</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Prescriptions</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {prescriptions.filter(p => p.status === "Active").length}
              </div>
              <p className="text-xs text-muted-foreground">Current medications</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lab Results</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{labResults.length}</div>
              <p className="text-xs text-muted-foreground">Recent tests</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Visit</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5 days</div>
              <p className="text-xs text-muted-foreground">Days ago</p>
            </CardContent>
          </Card>
        </div>

        {/* Records Tabs */}
        <Tabs defaultValue="consultations" className="space-y-4">
          <TabsList>
            <TabsTrigger value="consultations">Consultations</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="lab-results">Lab Results</TabsTrigger>
          </TabsList>

          <TabsContent value="consultations" className="space-y-4">
            <div className="space-y-4">
              {filteredRecords.map((record) => (
                <Card key={record.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>
                            {record.doctor.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{record.type}</CardTitle>
                          <CardDescription>{record.doctor} • {record.date}</CardDescription>
                        </div>
                      </div>
                      <Badge variant="secondary">
                        {record.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-3">
                        <div>
                          <p className="font-medium text-sm mb-1">Diagnosis</p>
                          <p className="text-sm text-muted-foreground">{record.diagnosis}</p>
                        </div>
                        <div>
                          <p className="font-medium text-sm mb-1">Prescription</p>
                          <p className="text-sm text-muted-foreground">{record.prescription}</p>
                        </div>
                        <div>
                          <p className="font-medium text-sm mb-1">Notes</p>
                          <p className="text-sm text-muted-foreground">{record.notes}</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="font-medium text-sm mb-2">Vitals</p>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center space-x-2 text-sm">
                            <Heart className="h-4 w-4 text-red-500" />
                            <span>{record.vitals.bloodPressure}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <Activity className="h-4 w-4 text-green-500" />
                            <span>{record.vitals.heartRate}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <Thermometer className="h-4 w-4 text-blue-500" />
                            <span>{record.vitals.temperature}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <User className="h-4 w-4 text-purple-500" />
                            <span>{record.vitals.weight}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 mt-4">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="prescriptions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Current Prescriptions</CardTitle>
                <CardDescription>Your active and recent medications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {prescriptions.map((prescription) => (
                    <div key={prescription.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">{prescription.medication} {prescription.dosage}</p>
                        <p className="text-sm text-muted-foreground">{prescription.frequency}</p>
                        <p className="text-xs text-muted-foreground">
                          Prescribed by {prescription.prescribedBy} on {prescription.dateIssued}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Refills remaining: {prescription.refillsLeft}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className={getStatusColor(prescription.status)}>
                          {prescription.status}
                        </Badge>
                        {prescription.status === "Active" && (
                          <Button variant="outline" size="sm">
                            Request Refill
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lab-results" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Laboratory Results</CardTitle>
                <CardDescription>Your recent test results and findings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {labResults.map((lab) => (
                    <div key={lab.id} className="space-y-3 p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{lab.test}</p>
                          <p className="text-sm text-muted-foreground">
                            Ordered by {lab.doctor} on {lab.date}
                          </p>
                        </div>
                        <Badge variant="secondary" className={getStatusColor(lab.status)}>
                          {lab.status}
                        </Badge>
                      </div>
                      
                      <div className="grid gap-2 md:grid-cols-2">
                        {Object.entries(lab.results).map(([test, result]) => (
                          <div key={test} className="flex justify-between text-sm">
                            <span>{test}:</span>
                            <span className={result.includes("High") ? "text-yellow-600 font-medium" : ""}>{result}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download Report
                        </Button>
                        <Button variant="outline" size="sm">
                          View Details
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
    </DashboardLayout>
  );
};

export default Records;