import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check, Sparkles, Zap, Shield, ArrowRight, Eye } from 'lucide-react';
import { IMAGES } from '../config/images';

export default function WholeVsGroundShowcase({ onOpenInquiry, onSelectProduct }) {
  const shouldReduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState('whole'); // 'whole' or 'ground'

  const features = {
    whole: [
      { title: '99.8% Sortex Optical Cleaning', desc: 'Every batch undergoes multi-stage destoning, gravity separation, and high-speed Buhler optical Sortex color sorting.' },
      { title: 'Intact Volatile Essential Oils', desc: 'Natural seed coat preserves 100% of the inherent thymol, cumin aldehyde, anethole, and piperine compounds.' },
      { title: 'Extended 24-Month Shelf Stability', desc: 'Moisture controlled below 8.5% to ensure zero fungal risk during transoceanic maritime transit.' },
      { title: 'Full Traceability to Gujarat Farms', desc: 'Direct sourcing linkages with APMC Unjha growers ensure authentic origin and zero cross-contamination.' },
    ],
    ground: [
      { title: 'Sub-Zero Cryogenic Micro-Milling', desc: 'Liquid nitrogen cold grinding below 40°C prevents the volatile oil evaporation that plagues ordinary hammer mills.' },
      { title: 'Standardized 60 - 100 Mesh Fineness', desc: 'Smooth, clump-free uniform particles engineered for optimal culinary release and industrial food manufacturing.' },
      { title: 'Zero Additives, Starch, or Colorants', desc: '100% pure single-origin ground spice guaranteed by independent third-party GC-MS chromatography analysis.' },
      { title: 'Multi-Barrier Nitrogen Flushed Packing', desc: 'Vacuum-sealed aluminium and multi-ply craft sacks eliminate oxygen degradation and UV light damage.' },
    ]
  };

  return (
    <section id="whole-vs-ground" className="py-20 bg-warm-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest/10 text-forest text-xs font-semibold mb-3"
          >
            <Sparkles className="w-3.5 h-3.5 text-lime" />
            <span>Precision Processing Benchmark</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-forest-dark font-heading tracking-tight mb-4"
          >
            Whole Seeds vs. Cryogenic Ground Powders
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-ink-muted text-base sm:text-lg leading-relaxed"
          >
            We honor the integrity of Indian spices at every stage—from pristine, intact whole seeds to scientifically pulverized micro-powders that retain maximum aroma and bioactive potency.
          </motion.p>
        </div>

        {/* Visual Story Showcase Card */}
        <div className="bg-sage/40 rounded-3xl border border-forest/15 overflow-hidden shadow-medium">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
            
            {/* High-Resolution Comparative Photography */}
            <motion.div
              initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7 relative group overflow-hidden min-h-[380px] lg:min-h-full"
            >
              <img
                src={IMAGES.story.wholeVsGround.src}
                alt={IMAGES.story.wholeVsGround.alt}
                width="900"
                height="600"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/80 via-transparent to-transparent flex items-end p-6 sm:p-8">
                <div className="text-warm-white">
                  <span className="px-3 py-1 rounded-full bg-lime text-forest-dark text-xs font-bold uppercase tracking-wider inline-block mb-2">
                    Studio Comparison
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-heading mb-1 text-warm-white">
                    Authentic Seeds Beside Fine Pulverized Powders
                  </h3>
                  <p className="text-xs sm:text-sm text-warm-white/85 max-w-lg">
                    Real visual demonstration of whole dried red chillies, raw golden turmeric fingers, cumin seeds, and green cardamom pods beside their aromatic freshly ground powders.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Interactive Feature Panel */}
            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between bg-warm-white/80 backdrop-blur-sm">
              <div>
                
                {/* Switcher Tabs */}
                <div className="flex rounded-xl bg-sage p-1 mb-8">
                  <button
                    onClick={() => setActiveTab('whole')}
                    className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                      activeTab === 'whole'
                        ? 'bg-forest text-warm-white shadow-soft'
                        : 'text-ink-muted hover:text-forest'
                    }`}
                  >
                    Whole Spices (Seeds)
                  </button>
                  <button
                    onClick={() => setActiveTab('ground')}
                    className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                      activeTab === 'ground'
                        ? 'bg-forest text-warm-white shadow-soft'
                        : 'text-ink-muted hover:text-forest'
                    }`}
                  >
                    Cryogenic Ground Powders
                  </button>
                </div>

                {/* Tab Content List with smooth animation */}
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: activeTab === 'whole' ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  {features[activeTab].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3.5">
                      <div className="w-6 h-6 rounded-full bg-lime/20 flex items-center justify-center shrink-0 mt-0.5 text-forest">
                        <Check className="w-3.5 h-3.5 text-forest stroke-[2.5]" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-forest-dark">{item.title}</h4>
                        <p className="text-xs text-ink-muted leading-relaxed mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Bottom Quick Action */}
              <div className="pt-8 mt-8 border-t border-forest/10 flex items-center justify-between">
                <div className="text-xs text-ink-muted">
                  Custom Mesh sizes & packing available
                </div>
                <button
                  onClick={onOpenInquiry}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-forest hover:text-forest-dark group"
                >
                  <span>Request Custom Specs</span>
                  <ArrowRight className="w-3.5 h-3.5 text-lime group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
