import { useEffect, useMemo } from "react"
import { DashboardLayout } from "@/components/dashboard/AppSidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MessageSquare, Phone, Star, Video, Users, FileText, TrendingUp } from "lucide-react"
import PatientCallList from "@/components/calls/PatientCallList"

export default function MedicalDashboard() {
  useEffect(() => {
    document.title = "Medical Dashboard | Medicare"
    const desc = "Medical practitioner dashboard: patient consultations, appointments, and medical tools."
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
    if (!meta) {
      meta = document.createElement("meta")
      meta.name = "description"
      document.head.appendChild(meta)
    }
    meta.content = desc

    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!link) {
      link = document.createElement("link")
      link.rel = "canonical"
      document.head.appendChild(link)
    }
    link.href = window.location.href
  }, [])

  type Appointment = { id: string; patient: string; time: string; type: string; status: 'upcoming' | 'completed' | 'cancelled' }
  const appointments: Appointment[] = useMemo(
    () => [
      { id: "1", patient: "Sarah Johnson", time: "09:00 AM", type: "General Consultation", status: "upcoming" },
      { id: "2", patient: "Michael Chen", time: "10:30 AM", type: "Follow-up", status: "upcoming" },
      { id: "3", patient: "Emma Davis", time: "02:00 PM", type: "Dermatology", status: "upcoming" },
      { id: "4", patient: "James Wilson", time: "03:30 PM", type: "Cardiology", status: "completed" },
    ],
    []
  )

  type Patient = { id: string; name: string; condition: string; lastVisit: string; priority: 'high' | 'medium' | 'low' }
  const recentPatients: Patient[] = useMemo(
    () => [
      { id: "1", name: "Alice Cooper", condition: "Hypertension", lastVisit: "2 days ago", priority: "high" },
      { id: "2", name: "Bob Martinez", condition: "Diabetes Type 2", lastVisit: "1 week ago", priority: "medium" },
      { id: "3", name: "Carol White", condition: "Annual Checkup", lastVisit: "3 days ago", priority: "low" },
      { id: "4", name: "David Brown", condition: "Migraine", lastVisit: "5 days ago", priority: "medium" },
    ],
    []
  )

  const stats = [
    { title: "Today's Appointments", value: "8", icon: Calendar, trend: "+2 from yesterday" },
    { title: "Total Patients", value: "247", icon: Users, trend: "+12 this month" },
    { title: "Consultations Done", value: "156", icon: FileText, trend: "+8 this week" },
    { title: "Patient Satisfaction", value: "4.8/5", icon: Star, trend: "+0.2 from last month" },
  ]

  return (
    <DashboardLayout>
      <section aria-labelledby="stats-overview" className="space-y-3">
        <h2 id="stats-overview" className="text-xl font-semibold">Practice Overview</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="hover-scale">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {stat.trend}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section aria-labelledby="quick-actions" className="space-y-3">
        <h2 id="quick-actions" className="text-xl font-semibold">Quick Actions</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="hover-scale">
            <CardHeader>
              <CardTitle className="text-base">Start Consultation</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Button><Video className="mr-2 h-4 w-4" /> Video Call</Button>
              <Button variant="secondary"><Phone className="mr-2 h-4 w-4" /> Audio Call</Button>
              <Button variant="outline"><MessageSquare className="mr-2 h-4 w-4" /> Chat</Button>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardHeader>
              <CardTitle className="text-base">Schedule Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full"><Calendar className="mr-2 h-4 w-4" /> View Full Schedule</Button>
              <Button variant="outline" className="w-full"><Clock className="mr-2 h-4 w-4" /> Set Availability</Button>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardHeader>
              <CardTitle className="text-base">Patient Records</CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full"><FileText className="mr-2 h-4 w-4" /> Access Records</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section aria-labelledby="appointments" className="space-y-3">
          <h2 id="appointments" className="text-xl font-semibold">Today's Appointments</h2>
          <div className="space-y-3">
            {appointments.map((appointment) => (
              <Card key={appointment.id} className="animate-fade-in">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg" alt={`${appointment.patient} profile photo`} />
                        <AvatarFallback>{appointment.patient.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{appointment.patient}</p>
                        <p className="text-sm text-muted-foreground">{appointment.type}</p>
                        <p className="text-sm font-medium">{appointment.time}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant={appointment.status === 'upcoming' ? 'default' : appointment.status === 'completed' ? 'secondary' : 'destructive'}>
                        {appointment.status}
                      </Badge>
                      {appointment.status === 'upcoming' && (
                        <Button size="sm">Start</Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <div className="lg:col-span-2">
          <PatientCallList />
        </div>
      </div>
    </DashboardLayout>
  )
}