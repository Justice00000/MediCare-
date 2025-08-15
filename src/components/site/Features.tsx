import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { type LucideIcon, Video, MessageSquare, AlertTriangle, Home, CalendarDays, BookOpen } from "lucide-react";

const FeatureItem = ({
  title,
  description,
  Icon,
}: {
  title: string;
  description: string;
  Icon: LucideIcon;
}) => (
  <Card className="h-full animate-enter">
    <CardHeader>
      <div className="flex items-center gap-3">
        <div className="rounded-md bg-accent p-2">
          <Icon className="text-foreground" />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </div>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
  </Card>
);

const Features = () => {
  return (
    <section id="features" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-3">Everything you need for modern care</h2>
          <p className="text-muted-foreground">Designed for speed, safety, and peace of mind.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureItem
            title="Real-time chat & video"
            description="HD video visits and secure messaging with licensed clinicians."
            Icon={Video}
          />
          <FeatureItem
            title="Emergency SOS"
            description="One-tap alert to rapidly reach emergency support when it matters."
            Icon={AlertTriangle}
          />
          <FeatureItem
            title="Home visit booking"
            description="Arrange at-home care with flexible scheduling that fits your life."
            Icon={CalendarDays}
          />
          <FeatureItem
            title="Health education library"
            description="Trusted guides and resources tailored to your conditions."
            Icon={BookOpen}
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
