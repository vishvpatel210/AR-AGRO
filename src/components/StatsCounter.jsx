import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Globe2, Factory, Sparkles, Clock, CheckCircle } from 'lucide-react';
import { TRUST_STATS } from '../data/products';

export default function StatsCounter() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: [0.16, 1, 0.3, 1] 
      }
    },
  };

  const icons = [Globe2, Factory, Sparkles, Clock];

  return (
    <section className="relative z-20 -mt-6 sm:-mt-10 max-w-7xl mx-auto px-4 sm:px-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="bg-warm-card rounded-2xl shadow-elevated border border-forest/15 p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
      >
        {TRUST_STATS.map((stat, idx) => {
          const Icon = icons[idx] || CheckCircle;
          return (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="flex flex-col items-start p-3 sm:p-4 rounded-xl hover:bg-sage/40 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-forest/10 flex items-center justify-center text-forest mb-3">
                <Icon className="w-5 h-5 text-forest" />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-forest-dark font-heading tracking-tight mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-bold text-ink-dark mb-0.5">
                {stat.label}
              </div>
              <div className="text-xs text-ink-muted leading-relaxed">
                {stat.sub}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
