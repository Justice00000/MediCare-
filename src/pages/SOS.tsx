import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import MapMock from "@/components/sos/MapMock"
import { ShieldAlert, Phone, Timer } from "lucide-react"

export default function SOSPage() {
  const [sosActive, setSosActive] = useState(false)

  // Mock coordinates (could be replaced by Geolocation API later)
  const coords = useMemo(() => ({ lat: 40.7128, lng: -74.006 }), [])

  // Mock responders data
  const responders = useMemo(
    () => [
      { id: "r1", name: "Responder Team Alpha", eta: 6, distanceKm: 1.1, role: "Emergency Care" },
      { id: "r2", name: "Nurse Priya S.", eta: 9, distanceKm: 2.0, role: "On-call Nurse" },
      { id: "r3", name: "Dr. Ahmed K.", eta: 12, distanceKm: 3.2, role: "General Physician" },
    ],
    []
  )

  useEffect(() => {
    document.title = "Emergency SOS | Medicare"
    const desc = "Trigger Emergency SOS, share location, and reach nearby verified responders quickly."
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

  return (
    <div className="container mx-auto px-4 py-6 md:py-10">
      <header className="mb-6 md:mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Emergency SOS</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">If you or someone near you needs urgent assistance, press SOS. We'll notify nearby verified responders and share your location. You can cancel at any time.</p>
      </header>

      <main className="grid gap-6 md:gap-8 lg:grid-cols-3">
        <section className="lg:col-span-2 space-y-6">
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="text-lg">SOS Control</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="lg"
                      variant={sosActive ? "secondary" : "destructive"}
                      className="h-14 px-8 text-lg"
                      aria-pressed={sosActive}
                    >
                      <ShieldAlert className="mr-2" /> {sosActive ? "SOS Active" : "Send SOS"}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirm SOS</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to trigger Emergency SOS? Your approximate location will be shared with nearby verified responders.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Not now</AlertDialogCancel>
                      <AlertDialogAction onClick={() => setSosActive(true)}>Yes, send SOS</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                {sosActive && (
                  <Button variant="outline" onClick={() => setSosActive(false)}>Cancel SOS</Button>
                )}
              </div>

              <div aria-live="polite" className="text-sm text-muted-foreground">
                Status: <span className={sosActive ? "text-foreground" : undefined}>{sosActive ? "SOS active — responders notified" : "Standby"}</span>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Your Location</h2>
            <MapMock coords={coords} />
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Nearby Verified Responders</h2>
            <div className="grid gap-3 md:grid-cols-2">
              {responders.map((r) => (
                <Card key={r.id}>
                  <CardContent className="pt-6 flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg" alt={`${r.name} profile photo`} />
                      <AvatarFallback>{r.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{r.name}</p>
                        <Badge>Verified</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{r.role}</p>
                      <div className="mt-2 flex items-center gap-3 text-sm">
                        <span className="inline-flex items-center gap-1"><Phone className="h-4 w-4" /> {r.distanceKm.toFixed(1)} km</span>
                        <span className="inline-flex items-center gap-1"><Timer className="h-4 w-4" /> ETA {r.eta} min</span>
                      </div>
                    </div>
                    <Button size="sm" variant="secondary">Contact</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <aside className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Help & Safety Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <ul className="list-disc pl-5 space-y-1">
                <li>Stay in a safe, visible place if possible.</li>
                <li>Keep your phone charged and nearby.</li>
                <li>Provide brief, clear information when contacted.</li>
              </ul>
              <div className="pt-2 text-foreground">
                In immediate danger? Call your local emergency number.
              </div>
            </CardContent>
          </Card>
        </aside>
      </main>
    </div>
  )
}
