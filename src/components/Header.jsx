import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, MapPin, Award, Menu, X, ArrowRight, Globe } from 'lucide-react';

export default function Header({ onOpenInquiry }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Certificates', href: '/certificates' },
    { name: 'Gallery', href: '/#gallery' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Bar for B2B Credibility */}
      <div className="bg-forest-dark text-warm-white/90 text-xs py-2 px-3 sm:px-4 border-b border-forest-light/20">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-1.5 sm:gap-2">
          <div className="flex items-center gap-2 sm:gap-4 text-xs font-medium">
            <span className="flex items-center gap-1.5 text-lime-light text-[11px] sm:text-xs">
              <Award className="w-3.5 h-3.5 text-lime shrink-0" />
              <span className="hidden sm:inline">Govt. Recognized </span>One Star Export House
            </span>
            <span className="hidden md:inline text-warm-white/40">|</span>
            <span className="hidden md:flex items-center gap-1.5 text-warm-white/80">
              <MapPin className="w-3.5 h-3.5 text-lime shrink-0" />
              APMC Market Yard, Unjha – Gujarat
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-5 text-xs ml-auto">
            <a 
              href="tel:+919870072960" 
              className="flex items-center gap-1.5 text-warm-white/90 hover:text-lime transition-colors text-[11px] sm:text-xs"
              aria-label="Direct export phone line"
            >
              <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-lime shrink-0" />
              <span className="font-semibold">+91 98700 72960</span>
            </a>
            <a 
              href="mailto:info@aragrospices.com" 
              className="hidden lg:flex items-center gap-1.5 text-warm-white/90 hover:text-lime transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-lime shrink-0" />
              <span>info@aragrospices.com</span>
            </a>
            <div className="hidden xs:flex items-center gap-1 border-l border-forest-light/30 pl-2 sm:pl-3">
              <Globe className="w-3 h-3 text-warm-white/60 shrink-0" />
              <span className="text-[10px] sm:text-[11px] text-warm-white/75 font-mono">B2B EXPORT</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div 
        className={`w-full transition-all duration-300 ${
          isScrolled 
            ? 'glass-header shadow-soft py-2.5 sm:py-3 border-b border-forest/10' 
            : 'bg-warm-white/95 py-3 sm:py-4 border-b border-forest/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 flex items-center justify-between">
          {/* Logo placed at nav first */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0" aria-label="A.R. Agro Spices Home">
            <img
              src="/images/logo.png"
              alt="A.R. Agro Spices Logo"
              width="48"
              height="60"
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-forest-dark font-extrabold text-base sm:text-xl font-heading leading-tight tracking-tight flex items-center gap-1.5 truncate">
                A.R. Agro Spices
                <span className="w-1.5 h-1.5 rounded-full bg-lime inline-block shrink-0"></span>
              </span>
              <span className="text-[9px] sm:text-[10px] font-semibold text-ink-muted uppercase tracking-wider sm:tracking-widest truncate">
                Purity Always Priority • Unjha
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isCurrent = link.href === location.pathname;

              if (link.href.startsWith('/#')) {
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className="px-3 py-2 text-sm font-medium text-ink-dark/80 hover:text-forest transition-colors rounded-lg hover:bg-sage/70 relative"
                  >
                    {link.name}
                  </a>
                );
              }

              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-sage/70 relative ${
                    isCurrent ? 'text-forest font-bold bg-sage/50' : 'text-ink-dark/80 hover:text-forest'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* CTA & Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenInquiry}
              className="px-4 lg:px-5 py-2.5 rounded-xl bg-forest hover:bg-forest-dark text-warm-white text-xs sm:text-sm font-semibold shadow-soft hover:shadow-medium transition-all duration-200 flex items-center gap-2 group min-h-[44px]"
              id="header-quote-btn"
            >
              <span>Request Quote</span>
              <ArrowRight className="w-4 h-4 text-lime group-hover:translate-x-0.5 transition-transform" />
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-sage/60 text-forest-dark hover:bg-sage transition-colors focus:ring-2 focus:ring-forest min-w-[44px] min-h-[44px] flex items-center justify-center ml-2"
            aria-label="Toggle navigation menu"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-warm-white border-b border-forest/15 px-4 pt-3 pb-6 shadow-elevated overflow-hidden"
          >
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => {
                if (link.href.startsWith('/#')) {
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-3 rounded-lg text-base font-medium text-ink-dark hover:bg-sage/80 hover:text-forest transition-colors min-h-[44px] flex items-center"
                    >
                      {link.name}
                    </a>
                  );
                }
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 rounded-lg text-base font-medium text-ink-dark hover:bg-sage/80 hover:text-forest transition-colors min-h-[44px] flex items-center"
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-3 border-t border-forest/10 mt-2 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenInquiry();
                  }}
                  className="w-full py-3.5 rounded-xl bg-forest text-warm-white text-center font-semibold text-sm flex items-center justify-center gap-2 shadow-soft min-h-[44px]"
                >
                  <span>Request Export Quote (RFQ)</span>
                  <ArrowRight className="w-4 h-4 text-lime" />
                </button>
                <div className="flex justify-between items-center text-xs text-ink-muted px-2 pt-2">
                  <span>Call Us: +91 98700 72960</span>
                  <span>Unjha, Gujarat</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
