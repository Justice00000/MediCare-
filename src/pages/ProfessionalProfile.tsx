import * as React from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import RatingStars from "@/components/profile/RatingStars";
import BookingForm from "@/components/profile/BookingForm";
import ChatPlaceholder from "@/components/profile/ChatPlaceholder";

const mockProfiles = [
  {
    id: "1",
    name: "Dr. Sarah Lee, MD",
    role: "Family Physician",
    photo: "/placeholder.svg",
    rating: 4.8,
    reviews: 128,
    specialties: ["Primary Care", "Telemedicine", "Preventive Health"],
    distanceKm: 2.1,
    bio: "Board-certified physician with 10+ years of experience providing compassionate, patient-centered care.",
    availabilityNote: "Next available today, 2:00–4:00 PM",
  },
  {
    id: "2",
    name: "Nurse Alex Gomez, RN",
    role: "Registered Nurse",
    photo: "/placeholder.svg",
    rating: 4.6,
    reviews: 76,
    specialties: ["Wound Care", "Home Visits", "Chronic Care"],
    distanceKm: 4.7,
    bio: "Experienced RN specializing in home care and chronic condition support.",
    availabilityNote: "Available tomorrow morning",
  },
];

export default function ProfessionalProfile() {
  const { id } = useParams();
  const professional = mockProfiles.find((p) => p.id === id) ?? mockProfiles[0];

  // Basic SEO
  React.useEffect(() => {
    const title = `${professional.name} – Consultation & Booking | Medicare`;
    document.title = title;
    const desc = `${professional.role} • ${professional.specialties.join(", ")} • Book a home visit or video consultation.`;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);

    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", window.location.href);

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Physician",
      name: professional.name,
      description: professional.bio,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: professional.rating,
        reviewCount: professional.reviews,
      },
      medicalSpecialty: professional.specialties,
    });
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [professional]);

  return (
    <main className="container mx-auto max-w-6xl px-4 py-6">
      <header className="mb-6 flex items-center justify-between">
        <Button variant="outline" asChild>
          <Link to="/dashboard" aria-label="Back to dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Link>
        </Button>
      </header>

      <h1 className="sr-only">{professional.name} – Consultation and Booking</h1>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={professional.photo} alt={`${professional.name} profile photo`} />
                  <AvatarFallback>{professional.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-display text-xl">{professional.name}</span>
                    <Badge variant="secondary">{professional.role}</Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <RatingStars rating={professional.rating} />
                    <span>({professional.reviews} reviews)</span>
                    <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" /> {professional.distanceKm} km away</span>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {professional.specialties.map((s) => (
                      <Badge key={s} variant="outline">{s}</Badge>
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{professional.bio}</p>
              <p className="mt-2 text-sm text-foreground"><span className="font-medium">Availability:</span> {professional.availabilityNote}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Book now</CardTitle>
            </CardHeader>
            <CardContent>
              <BookingForm professionalName={professional.name} />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <ChatPlaceholder professionalName={professional.name} />
        </div>
      </div>
    </main>
  );
}
