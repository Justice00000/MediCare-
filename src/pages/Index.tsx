import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import Features from "@/components/site/Features";
import Footer from "@/components/site/Footer";

const Index = () => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && profile && !loading) {
      // Redirect authenticated users to their appropriate dashboard
      const redirectPath = profile.role === 'medical_practitioner' ? '/medical-dashboard' : '/dashboard';
      navigate(redirectPath);
    }
  }, [user, profile, loading, navigate]);

  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Medicare",
    url: "/",
    sameAs: [
      "https://twitter.com/",
      "https://facebook.com/",
      "https://www.linkedin.com/"
    ],
    contactPoint: [{
      "@type": "ContactPoint",
      email: "hello@medicare.example",
      contactType: "customer support"
    }]
  };

  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <section id="about" className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight mb-3">About Medicare</h2>
            <p className="text-muted-foreground">
              Medicare is a modern telehealth platform dedicated to safe, reliable access to healthcare. We combine secure technology and caring clinicians to deliver timely consultations, proactive education, and convenient at-home services.
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
    </div>
  );
};

export default Index;
