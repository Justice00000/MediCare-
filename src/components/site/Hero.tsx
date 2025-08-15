import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section id="top" className="hero-surface">
      <div className="container mx-auto px-4 py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center animate-enter">
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="gradient-text">Medicare Telehealth</span> — connect to verified medical professionals in real time
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Secure chat and video consultations, instant emergency support, home visit bookings, and a rich health education library.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Button 
              onClick={() => navigate('/auth')}
              size="lg" 
              className="btn-hero hover-scale"
            >
              Get Started
            </Button>
            <a href="#features">
              <Button variant="secondary" size="lg">Learn More</Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
