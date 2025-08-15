import { Twitter, Facebook, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="border-t mt-16">
      <div className="container mx-auto px-4 py-10 md:py-12">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div>
            <p className="font-display text-xl gradient-text">Medicare</p>
            <p className="text-sm text-muted-foreground mt-2">Connecting you to verified medical professionals in real time.</p>
            <div id="connect" className="mt-4 text-sm">
              <a href="mailto:hello@medicare.example" className="story-link">hello@medicare.example</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-foreground transition-colors">
              <Twitter />
            </a>
            <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-foreground transition-colors">
              <Facebook />
            </a>
            <a href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-foreground transition-colors">
              <Linkedin />
            </a>
            <a href="mailto:hello@medicare.example" aria-label="Email" className="text-muted-foreground hover:text-foreground transition-colors">
              <Mail />
            </a>
          </div>
        </div>
        <div className="text-xs text-muted-foreground mt-8">© {new Date().getFullYear()} Medicare. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
