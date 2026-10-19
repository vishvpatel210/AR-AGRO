import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Award, ShieldCheck, CheckCircle2, FileCheck, Check } from 'lucide-react';
import { CERTIFICATIONS } from '../data/products';

export default function CertificationsSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="certifications" className="py-20 bg-warm-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest/10 text-forest text-xs font-semibold mb-3">
            <Award className="w-3.5 h-3.5 text-lime" />
            <span>Accredited Global Standards</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-forest-dark font-heading tracking-tight mb-4">
            International Food Safety & Export Accreditations
          </h2>
          <p className="text-ink-muted text-base sm:text-lg">
            Our processing plants operate in full compliance with United States FDA, European Union regulations, and Gulf Standards Organization (GSO) quality guidelines.
          </p>
        </div>

        {/* Certifications Cards Grid with Staggered Entrance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-14">
          {CERTIFICATIONS.map((cert, idx) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="p-5 rounded-2xl bg-warm-card border border-forest/15 hover:border-forest/40 shadow-soft hover:shadow-medium transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-forest/10 text-forest flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-5 h-5 text-forest" />
                </div>
                <h3 className="text-base font-bold text-forest-dark font-heading mb-1">
                  {cert.name}
                </h3>
                <p className="text-xs text-ink-muted leading-relaxed">
                  {cert.body}
                </p>
              </div>

              <div className="pt-3 mt-4 border-t border-forest/10 flex items-center justify-between">
                <span className="text-[11px] font-mono text-forest font-semibold">
                  {cert.code}
                </span>
                <CheckCircle2 className="w-3.5 h-3.5 text-forest" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quality Commitment Callout */}
        <div className="bg-gradient-to-r from-forest-dark to-forest rounded-3xl p-6 sm:p-10 text-warm-white shadow-elevated flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h3 className="text-xl sm:text-2xl font-bold font-heading mb-2">
              Batch-Specific Certificates of Analysis (COA)
            </h3>
            <p className="text-xs sm:text-sm text-warm-white/85 leading-relaxed">
              Every shipment is accompanied by detailed test certificates verifying moisture percentage, volatile oil content, Salmonella, E. Coli, Aflatoxin, and heavy metal compliance. Pre-shipment independent inspection by SGS or Bureau Veritas readily arranged.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-3">
            <span className="px-4 py-2.5 rounded-xl bg-lime text-forest-dark font-bold text-xs uppercase tracking-wider">
              100% Lab Verified
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
