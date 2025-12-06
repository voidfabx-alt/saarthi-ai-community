import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Heart } from 'lucide-react';
import logo from '@/assets/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center overflow-hidden">
                <img src={logo} alt="Vyuha AI" className="w-8 h-8 object-contain" />
              </div>
              <span className="font-bold text-xl">Vyuha<span className="text-primary">AI</span></span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Building India's first truly multilingual AI assistant, powered by our community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { href: '/chat', label: 'Chat' },
                { href: '/leaderboard', label: 'Leaderboard' },
                { href: '/contribute', label: 'Contribute' },
                { href: '/about', label: 'About' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Languages */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Supported Languages</h4>
            <ul className="space-y-2">
              {['English', 'हिंदी (Hindi)', 'తెలుగు (Telugu)', 'தமிழ் (Tamil)', 'मराठी (Marathi)'].map((lang) => (
                <li key={lang} className="text-sm text-muted-foreground">
                  {lang}
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Connect</h4>
            <div className="flex gap-3">
              {[
                { icon: Github, href: '#', label: 'GitHub' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Vyuha AI. Made with <Heart className="w-4 h-4 inline text-primary" /> in India
          </p>
          <div className="flex gap-6">
            <Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;