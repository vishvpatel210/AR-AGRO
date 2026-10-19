import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Cpu, ShieldCheck, CheckCircle2, Factory, Sparkles, Sliders, ArrowRight } from 'lucide-react';
import { IMAGES } from '../config/images';

export default function ProcessingFacility({ onOpenInquiry }) {
  const shouldReduceMotion = useReducedMotion();

  const steps = [
    {
      step: '01',
      title: 'Destoning & Gravity Separation',
      desc: 'Raw farm harvests from Unjha APMC pass through high-capacity aspirators and specific-gravity separators to eliminate light dust, sand, and heavy field debris.',
    },
    {
      step: '02',
      title: 'Bühler Sortex Optical Color Sorters',
      desc: 'High-speed CCD multi-chromatic sensor cameras inspect each seed individually in mid-air, firing ultra-precise pneumatic ejectors to reject discolored or foreign seeds.',
    },
    {
      step: '03',
      title: 'Sub-Zero Cryogenic Grinding',
      desc: 'Low-temperature liquid nitrogen chilled milling chambers maintain temperature under 40°C, ensuring volatile aromatic oils and natural color pigments remain intact.',
    },
    {
      step: '04',
      title: 'In-Line Metal Detection & Sterilization',
      desc: 'Finished spices pass through multi-frequency metal detectors (Fe, Non-Fe, SS < 0.8mm) and undergo ETO or steam sterilization per strict US FDA & EU food regulations.',
    },
  ];

  return (
    <section id="facility" className="py-20 bg-warm-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest/10 text-forest text-xs font-semibold mb-3">
              <Factory className="w-3.5 h-3.5 text-lime" />
              <span>State-of-the-Art Processing Infrastructure</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-forest-dark font-heading tracking-tight leading-tight">
              Optical Sortex Sorting & Cryogenic Processing Facility
            </h2>
          </div>
          <div className="lg:col-span-4 text-left lg:text-right">
            <p className="text-sm text-ink-muted leading-relaxed mb-3">
              Located in Unjha, Gujarat, our ISO 22000-certified facility features German and Swiss machinery engineered for zero contamination.
            </p>
            <button
              onClick={onOpenInquiry}
              className="inline-flex items-center gap-2 text-xs font-bold text-forest hover:text-forest-dark group"
            >
              <span>Schedule Factory Audit / Virtual Tour</span>
              <ArrowRight className="w-3.5 h-3.5 text-lime group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Feature Hero Banner with Facility Photo */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden shadow-elevated border border-forest/15 mb-14 group"
        >
          <img
            src={IMAGES.story.facility.src}
            alt={IMAGES.story.facility.alt}
            width="1200"
            height="500"
            loading="lazy"
            className="w-full h-[380px] sm:h-[480px] object-cover transition-transform duration-700 group-hover:scale-102"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/95 via-forest-dark/40 to-transparent flex flex-col justify-end p-6 sm:p-10">
            <div className="max-w-3xl text-warm-white">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-lime text-forest-dark text-xs font-bold uppercase tracking-wider">
                  Unjha Central Processing Unit
                </span>
                <span className="px-3 py-1 rounded-full bg-warm-white/20 backdrop-blur-md text-warm-white text-xs font-mono">
                  15,000 MT Annual Capacity
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-warm-white mb-2">
                Engineered for 99.8% Ultra-High Purity Standards
              </h3>
              <p className="text-xs sm:text-sm text-warm-white/85 leading-relaxed">
                Clean epoxy sanitized work floors, positive air-pressure sterilization zones, and computerized optical color sorting machines capable of handling 5 metric tonnes per hour.
              </p>
            </div>
          </div>
        </motion.div>

        {/* 4 Process Pillars with Staggered Entrance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st, idx) => (
            <motion.div
              key={st.step}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              className="p-6 rounded-2xl bg-warm-card border border-forest/15 hover:border-forest/40 shadow-soft hover:shadow-medium transition-all group"
            >
              <div className="text-3xl font-black font-heading text-forest/20 group-hover:text-forest transition-colors mb-3">
                {st.step}
              </div>
              <h4 className="text-base font-bold text-forest-dark mb-2">
                {st.title}
              </h4>
              <p className="text-xs text-ink-muted leading-relaxed">
                {st.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
