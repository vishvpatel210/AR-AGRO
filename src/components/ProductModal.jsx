import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Globe, Package, Truck, ShieldCheck, ArrowRight, Award, MessageCircle } from 'lucide-react';
import { getProductWhatsAppUrl } from '../utils/whatsapp';

export default function ProductModal({ product, onClose, onOpenInquiry }) {
  if (!product) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-6 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-warm-card rounded-2xl sm:rounded-3xl max-w-3xl w-full max-h-[92vh] sm:max-h-[90vh] overflow-y-auto border border-forest/20 shadow-2xl relative my-auto"
        >
          {/* Close Button with 44px min touch target */}
          <button
            onClick={onClose}
            aria-label="Close product details"
            className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-warm-white/95 backdrop-blur-sm text-ink-dark hover:bg-warm-white flex items-center justify-center shadow-md transition-colors focus:ring-2 focus:ring-forest"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header & Hero Image */}
          <div className="relative h-48 sm:h-72 w-full overflow-hidden bg-forest-dark">
            <img
              src={product.image}
              alt={product.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/95 via-forest-dark/40 to-transparent flex items-end p-4 sm:p-6">
              <div className="text-warm-white pr-10">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded bg-lime text-forest-dark text-[11px] font-bold uppercase">
                    {product.badge}
                  </span>
                  <span className="text-[11px] font-mono text-warm-white/80">
                    HS: {product.hsCode}
                  </span>
                </div>
                <h2 className="text-xl sm:text-3xl font-extrabold font-heading text-warm-white leading-tight">
                  {product.name}
                </h2>
                <p className="text-xs sm:text-sm italic text-warm-white/80 font-serif">
                  {product.botanicalName} • Sourced from {product.origin}
                </p>
              </div>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-4 sm:p-8 space-y-5 sm:space-y-6">
            
            {/* Description */}
            <div>
              <h4 className="text-xs font-bold text-ink-muted uppercase tracking-wider mb-2">
                Commodity Overview
              </h4>
              <p className="text-sm text-ink-dark/90 leading-relaxed">
                {product.shortDesc}
              </p>
            </div>

            {/* Specifications Grid */}
            <div className="bg-sage/40 rounded-2xl p-4 sm:p-5 border border-forest/10">
              <h4 className="text-xs font-bold text-forest uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-forest" />
                <span>Laboratory Technical Specifications</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {Object.entries(product.specifications).map(([key, val]) => (
                  <div key={key} className="bg-warm-white p-2.5 rounded-xl border border-forest/10">
                    <div className="text-[10px] text-ink-muted uppercase font-semibold">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div className="text-xs font-bold text-forest-dark mt-0.5">
                      {val}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Export Grades Available */}
            {product.grades && (
              <div>
                <h4 className="text-xs font-bold text-ink-muted uppercase tracking-wider mb-2.5">
                  Available Export Grades
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {product.grades.map((gr, idx) => (
                    <div key={idx} className="p-3 rounded-xl border border-forest/15 bg-warm-white flex flex-col justify-between">
                      <span className="text-xs font-bold text-forest-dark">{gr.name}</span>
                      <span className="text-[11px] font-mono text-forest mt-1">Purity: {gr.purity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Logistics & Packaging */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl border border-forest/10 bg-warm-white">
                <div className="flex items-center gap-2 text-xs font-bold text-forest mb-2">
                  <Package className="w-4 h-4" />
                  <span>Packaging Options</span>
                </div>
                <ul className="text-xs text-ink-dark/85 space-y-1">
                  {product.packaging.map((pkg, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-forest shrink-0" />
                      <span>{pkg}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl border border-forest/10 bg-warm-white">
                <div className="flex items-center gap-2 text-xs font-bold text-forest mb-2">
                  <Truck className="w-4 h-4" />
                  <span>Container Loadability</span>
                </div>
                <p className="text-xs text-ink-dark/85 leading-relaxed">
                  {product.loadability}
                </p>
                <div className="mt-3 text-[11px] text-ink-muted">
                  Dispatched via Mundra Port / Kandla Port, Gujarat
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-forest/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-ink-muted">
                COA (Certificate of Analysis) available per batch
              </span>
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 w-full sm:w-auto">
                <button
                  onClick={onClose}
                  className="px-4 py-3 rounded-xl border border-forest/20 text-xs font-semibold text-ink-dark hover:bg-sage/40 transition-colors flex-1 sm:flex-initial min-h-[44px]"
                >
                  Close
                </button>
                <a
                  href={getProductWhatsAppUrl(product.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold shadow-soft flex items-center justify-center gap-1.5 flex-1 sm:flex-initial min-h-[44px] transition-colors"
                  aria-label={`Enquire about ${product.name} on WhatsApp`}
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>WhatsApp</span>
                </a>
                <button
                  onClick={() => {
                    onClose();
                    onOpenInquiry(product);
                  }}
                  className="px-5 py-3 rounded-xl bg-forest hover:bg-forest-dark text-warm-white text-xs font-semibold shadow-soft flex items-center justify-center gap-2 w-full sm:w-auto min-h-[44px]"
                >
                  <span>Request RFQ</span>
                  <ArrowRight className="w-3.5 h-3.5 text-lime" />
                </button>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
