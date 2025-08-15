import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { DashboardLayout } from "@/components/dashboard/AppSidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MapPin, MessageSquare, Phone, Star, Video } from "lucide-react"
import CallBooking from "@/components/calls/CallBooking"

export default function Dashboard() {
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = "Medicare Dashboard | Telehealth"
    const desc = "Patient dashboard: quick actions, nearby professionals, and health articles."
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

  type Pro = { id: string; name: string; specialty: string; distanceKm: number; rating: number }
  const professionals: Pro[] = useMemo(
    () => [
      { id: "1", name: "Dr. Aisha Khan", specialty: "General Practitioner", distanceKm: 1.2, rating: 4.8 },
      { id: "2", name: "Dr. Lucas Martins", specialty: "Pediatrics", distanceKm: 2.3, rating: 4.7 },
      { id: "3", name: "Dr. Mei Lin", specialty: "Dermatology", distanceKm: 3.5, rating: 4.9 },
      { id: "4", name: "Dr. Omar Hassan", specialty: "Psychiatry", distanceKm: 0.9, rating: 4.6 },
    ],
    []
  )

  type Article = { id: string; title: string; summary: string; lang: "en" | "es" | "fr" }
  const articles: Article[] = useMemo(
    () => [
      { id: "a1", title: "Managing Blood Pressure", summary: "Tips to monitor and control hypertension at home.", lang: "en" },
      { id: "a2", title: "Salud mental cotidiana", summary: "Consejos prácticos para el bienestar diario.", lang: "es" },
      { id: "a3", title: "Alimentation équilibrée", summary: "Principes pour une nutrition saine et durable.", lang: "fr" },
      { id: "a4", title: "Understanding Telemedicine", summary: "How virtual care works and when to use it.", lang: "en" },
    ],
    []
  )

  const [lang, setLang] = useState<"all" | "en" | "es" | "fr">("all")
  const filteredArticles = useMemo(
    () => (lang === "all" ? articles : articles.filter((a) => a.lang === lang)),
    [articles, lang]
  )

  return (
    <DashboardLayout>
      <section aria-labelledby="quick-actions" className="space-y-3">
        <h2 id="quick-actions" className="text-xl font-semibold">Quick Actions</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="hover-scale">
            <CardHeader>
              <CardTitle className="text-base">Start Consultation</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Button><Video /> Video</Button>
              <Button variant="secondary"><Phone /> Audio</Button>
              <Button variant="outline"><MessageSquare /> Chat</Button>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardHeader>
              <CardTitle className="text-base">Emergency SOS</CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                variant="destructive" 
                className="w-full"
                onClick={() => navigate('/sos')}
              >
                Immediate Assistance
              </Button>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardHeader>
              <CardTitle className="text-base">Book Home Visit</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                className="w-full"
                onClick={() => navigate('/appointments')}
              >
                <Calendar /> Schedule Nurse/Doctor
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <CallBooking />

      <section aria-labelledby="education" className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h2 id="education" className="text-xl font-semibold">Health Education</h2>
          <div className="flex items-center gap-2">
            <label htmlFor="lang" className="sr-only">Filter language</label>
            <Select value={lang} onValueChange={(v: any) => setLang(v)}>
              <SelectTrigger id="lang" className="w-40">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent className="z-50">
                <SelectItem value="all">All Languages</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {filteredArticles.map((a) => (
            <Card 
              key={a.id} 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate('/health-library')}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{a.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{a.summary}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Button 
            variant="outline" 
            onClick={() => navigate('/health-library')}
          >
            View All Medical Books & Articles
          </Button>
        </div>
      </section>
    </DashboardLayout>
  )
}
