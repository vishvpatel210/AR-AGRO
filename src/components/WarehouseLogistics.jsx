import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Package, Ship, ShieldCheck, MapPin, CheckCircle2, ArrowRight, Truck } from 'lucide-react';
import { IMAGES } from '../config/images';

export default function WarehouseLogistics({ onOpenInquiry }) {
  const shouldReduceMotion = useReducedMotion();

  const packagingTypes = [
    { title: 'Burlap Jute Sacks with Poly-Liner', desc: 'Eco-friendly breathable protection for whole seeds, 25kg & 50kg export specifications.' },
    { title: 'Multi-Ply Craft Paper Bags', desc: 'Moisture-barrier food-grade craft paper bags with sealed polyethylene inner liners for powders.' },
    { title: 'Heavy-Duty Laminated PP Bags', desc: 'UV-stabilized tear-resistant polypropylene sacks with customized color printing for private labels.' },
    { title: 'Vacuum Sealed Retail Pouches', desc: 'High-barrier nitrogen-flushed nitrogen pouches from 250g to 5kg ready for retail shelves.' },
  ];

  const ports = [
    { name: 'Mundra Port (Gujarat)', time: 'Under 5 Hours Transit from Unjha', type: 'Primary Container Hub' },
    { name: 'Kandla / Deendayal Port', time: 'Under 4 Hours Transit from Unjha', type: 'Bulk Agro Terminal' },
    { name: 'Nhava Sheva (JNPT Mumbai)', time: 'Regular Rail Corridor Feeder', type: 'Specialized High-Value Cargo' },
  ];

  return (
    <section id="logistics" className="py-20 bg-sage-light/60 border-t border-forest/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest/10 text-forest text-xs font-semibold mb-3">
            <Truck className="w-3.5 h-3.5 text-lime" />
            <span>Farm Gate to Global Port</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-forest-dark font-heading tracking-tight mb-4">
            Clean Warehousing & Global Maritime Freight
          </h2>
          <p className="text-ink-muted text-base sm:text-lg">
            Guaranteed freshness from Unjha’s climate-controlled storage to 20ft/40ft ocean container stuffing and direct shipment from India’s largest deep-water ports.
          </p>
        </div>

        {/* Dual Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Card 1: Clean Warehouse & Palletized Storage */}
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="bg-warm-card rounded-3xl overflow-hidden shadow-medium border border-forest/15 flex flex-col justify-between group"
          >
            <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-sage/20">
              <img
                src={IMAGES.story.warehouse.src}
                alt={IMAGES.story.warehouse.alt}
                width="700"
                height="450"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-md bg-forest/90 backdrop-blur-md text-warm-white text-xs font-semibold shadow-xs">
                  ISO 22000 Certified Warehouse
                </span>
              </div>
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-forest-dark/90 to-transparent text-warm-white">
                <p className="text-sm font-bold text-warm-white">Palletized, Climate-Monitored Staging</p>
                <p className="text-xs text-warm-white/80">Dust-free epoxy flooring & shrink-wrapped cargo protection</p>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <h3 className="text-xl font-bold text-forest-dark font-heading mb-3">
                Sterile Warehouse & Custom Export Packaging
              </h3>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed mb-6">
                Our 50,000 sq. ft. storage facility adheres to stringent hygiene parameters. All products are palletized, shrink-wrapped, and tagged with barcoded batch traceability numbers.
              </p>

              {/* Packaging choices list */}
              <div className="space-y-3">
                {packagingTypes.map((pkg, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-ink-dark/85">
                    <CheckCircle2 className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-forest-dark font-semibold">{pkg.title}:</strong>{' '}
                      <span className="text-ink-muted">{pkg.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 2: Cargo Ships & Global Maritime Export */}
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="bg-warm-card rounded-3xl overflow-hidden shadow-medium border border-forest/15 flex flex-col justify-between group"
          >
            <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-sage/20">
              <img
                src={IMAGES.story.shipping.src}
                alt={IMAGES.story.shipping.alt}
                width="700"
                height="450"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-md bg-forest/90 backdrop-blur-md text-warm-white text-xs font-semibold shadow-xs">
                  Mundra Port Sea Freight
                </span>
              </div>
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-forest-dark/90 to-transparent text-warm-white">
                <p className="text-sm font-bold text-warm-white">Direct Sea Routes to 25+ Global Ports</p>
                <p className="text-xs text-warm-white/80">Container desiccant bags & moisture control liners installed</p>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <h3 className="text-xl font-bold text-forest-dark font-heading mb-3">
                Port Proximity & Containerized Sea Freight
              </h3>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed mb-6">
                Direct highway access connects Unjha to Mundra Port in just under 5 hours. We manage full custom clearance, phytosanitary fumigation, container moisture trapping, and bill of lading documentation.
              </p>

              {/* Port Connectivity */}
              <div className="bg-sage/40 rounded-xl p-4 border border-forest/10 space-y-3 mb-6">
                {ports.map((pt, i) => (
                  <div key={i} className="flex items-center justify-between text-xs pb-2 border-b border-forest/5 last:border-0 last:pb-0">
                    <div className="flex items-center gap-2">
                      <Ship className="w-3.5 h-3.5 text-forest" />
                      <span className="font-semibold text-forest-dark">{pt.name}</span>
                    </div>
                    <span className="text-ink-muted font-mono text-[11px]">{pt.time}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-ink-muted">SGS / Geo-Chem Inspection on request</span>
                <button
                  onClick={onOpenInquiry}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-forest hover:text-forest-dark"
                >
                  <span>Request CIF / FOB Rate</span>
                  <ArrowRight className="w-3.5 h-3.5 text-lime" />
                </button>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
