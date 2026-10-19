import React from 'react';
import { Phone, Mail, MapPin, Globe, ShieldCheck, ArrowUp, ExternalLink } from 'lucide-react';

export default function Footer({ onOpenInquiry }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-forest-dark text-warm-white/90 pt-16 pb-12 border-t border-forest-light/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 pb-12 border-b border-forest-light/20">
          
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-warm-white rounded-xl shadow-md border border-lime/30 flex items-center justify-center shrink-0">
                <img
                  src="/images/logo.png"
                  alt="A.R. Agro Spices Official Logo"
                  width="44"
                  height="55"
                  className="h-10 w-auto object-contain"
                />
              </div>
              <div>
                <span className="text-warm-white font-extrabold text-2xl font-heading tracking-tight block">
                  A.R. Agro Spices
                </span>
                <span className="text-xs text-warm-white/60 uppercase tracking-widest font-semibold block">
                  Purity Always Priority • Unjha
                </span>
              </div>
            </div>

            <p className="text-xs text-warm-white/80 leading-relaxed max-w-sm">
              Headquartered in Unjha, Gujarat—Asia’s largest spice trading center. We process and export Sortex-cleaned whole spices, cryogenic ground powders, and agricultural oil seeds to 25+ global markets with complete lot traceability.
            </p>

            <div className="flex items-center gap-2 pt-2 text-xs font-semibold text-lime">
              <ShieldCheck className="w-4 h-4 text-lime shrink-0" />
              <span>Govt. of India Recognized One Star Export House</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-warm-white uppercase tracking-wider mb-4 font-heading">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-warm-white/75">
              <li><a href="#home" className="hover:text-lime transition-colors inline-block py-1">Home & Overview</a></li>
              <li><a href="#products" className="hover:text-lime transition-colors inline-block py-1">Export Products Catalogue</a></li>
              <li><a href="#whole-vs-ground" className="hover:text-lime transition-colors inline-block py-1">Whole Seeds vs Ground</a></li>
              <li><a href="#facility" className="hover:text-lime transition-colors inline-block py-1">Sortex Processing Plant</a></li>
              <li><a href="#logistics" className="hover:text-lime transition-colors inline-block py-1">Warehousing & Sea Ports</a></li>
              <li><a href="#certifications" className="hover:text-lime transition-colors inline-block py-1">Quality Accreditations</a></li>
              <li><a href="#gallery" className="hover:text-lime transition-colors inline-block py-1">Visual Story Gallery</a></li>
              <li><a href="#contact" className="hover:text-lime transition-colors inline-block py-1">Corporate Contact</a></li>
            </ul>
          </div>

          {/* Export Commodities */}
          <div>
            <h4 className="text-sm font-bold text-warm-white uppercase tracking-wider mb-4 font-heading">
              Export Commodities
            </h4>
            <ul className="space-y-2 text-xs text-warm-white/75">
              <li><a href="#products" className="hover:text-lime transition-colors">Cumin Seeds (Jeera)</a></li>
              <li><a href="#products" className="hover:text-lime transition-colors">Fennel Seeds (Saunf)</a></li>
              <li><a href="#products" className="hover:text-lime transition-colors">Turmeric Fingers & Powder</a></li>
              <li><a href="#products" className="hover:text-lime transition-colors">Coriander Seeds (Dhania)</a></li>
              <li><a href="#products" className="hover:text-lime transition-colors">Red Chillies (Teja / Sanam)</a></li>
              <li><a href="#products" className="hover:text-lime transition-colors">Green Cardamom (Elaichi)</a></li>
              <li><a href="#products" className="hover:text-lime transition-colors">Tellicherry Black Pepper</a></li>
              <li><a href="#products" className="hover:text-lime transition-colors">Natural & Hulled Sesame</a></li>
            </ul>
          </div>

          {/* Direct Port & Plant Contact */}
          <div>
            <h4 className="text-sm font-bold text-warm-white uppercase tracking-wider mb-4 font-heading">
              Head Office & Port
            </h4>
            <div className="space-y-3 text-xs text-warm-white/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-lime shrink-0 mt-0.5" />
                <span>216, APMC Building, Market Yard, Unjha – 384170, Gujarat, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-lime shrink-0" />
                <a href="tel:+919870072960" className="hover:text-lime transition-colors font-semibold">
                  +91 98700 72960
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-lime shrink-0" />
                <a href="mailto:info@aragrospices.com" className="hover:text-lime transition-colors">
                  info@aragrospices.com
                </a>
              </div>
              <div className="pt-2">
                <button
                  onClick={onOpenInquiry}
                  className="w-full py-2.5 rounded-xl bg-forest hover:bg-forest-light text-warm-white text-xs font-bold border border-forest-light/40 transition-colors shadow-soft"
                >
                  Request B2B Quotation
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-warm-white/60">
          <div>
            © {new Date().getFullYear()} A.R. Agro Spices. All rights reserved. Registered Export House, Govt. of India.
          </div>
          
          <div className="flex items-center gap-6">
            <span>FSSAI Lic. #10721021000142</span>
            <span>Spices Board #SB/EXP/2018</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-forest/80 hover:bg-forest text-warm-white transition-colors"
              aria-label="Scroll to top of page"
            >
              <ArrowUp className="w-4 h-4 text-lime" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
