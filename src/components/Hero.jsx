import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ShieldCheck, ArrowRight, Download, Award, CheckCircle2, Sparkles, Anchor } from 'lucide-react';
import { IMAGES } from '../config/images';

export default function Hero({ onOpenInquiry }) {
  const shouldReduceMotion = useReducedMotion();

  // Animation variants respecting prefers-reduced-motion
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const textItemVariants = {
    hidden: { 
      opacity: 0, 
      x: shouldReduceMotion ? 0 : -40 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1] 
      }
    },
  };

  const imageRevealVariants = {
    hidden: { 
      opacity: 0, 
      scale: shouldReduceMotion ? 1 : 0.94,
      y: shouldReduceMotion ? 0 : 20
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1],
        delay: 0.2
      }
    },
  };

  return (
    <section id="home" className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-24 bg-gradient-to-b from-sage-light via-warm-white to-warm-white">
      {/* Background Subtle Accent Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-lime/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-forest/5 rounded-full blur-3xl pointer-events-none -ml-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Text Entering Smoothly from the Left */}
          <motion.div 
            className="lg:col-span-7 flex flex-col justify-center"
            variants={textContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Trust Pill */}
            <motion.div variants={textItemVariants} className="inline-flex items-center gap-2 mb-5">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-forest/10 text-forest border border-forest/20 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-lime" />
                Unjha Spice Hub • Direct Origin Exporter
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-xs font-medium text-ink-muted">
                <ShieldCheck className="w-3.5 h-3.5 text-forest" />
                ISO 22000 & HACCP Certified
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              variants={textItemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-forest-dark tracking-tight leading-[1.12] mb-6 font-heading"
            >
              Pure Indian Spices.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest to-forest-light block sm:inline">
                Precision Processed.
              </span>{' '}
              Delivered Worldwide.
            </motion.h1>

            {/* Value Proposition Description */}
            <motion.p 
              variants={textItemVariants}
              className="text-base sm:text-lg text-ink-muted leading-relaxed max-w-2xl mb-8"
            >
              Based in <strong>Unjha, Gujarat</strong>—the spice capital of Asia—A.R. Agro Spices is a premier processor and B2B exporter of 99.8% Sortex-cleaned whole spices, cryogenic ground powders, and oil seeds to over 25 countries across North America, Europe, the Middle East, and Asia.
            </motion.p>

            {/* CTAs with Polished Hover & Tap Feedback */}
            <motion.div 
              variants={textItemVariants}
              className="flex flex-wrap items-center gap-4 mb-10"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenInquiry}
                className="px-7 py-3.5 rounded-xl bg-forest hover:bg-forest-dark text-warm-white font-semibold text-base shadow-medium hover:shadow-elevated transition-all flex items-center gap-3 group"
                id="hero-inquiry-btn"
              >
                <span>Request Export Quote</span>
                <ArrowRight className="w-4 h-4 text-lime group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#products"
                className="px-6 py-3.5 rounded-xl bg-warm-white border border-forest/20 hover:border-forest text-forest-dark font-semibold text-base hover:bg-sage/50 transition-all flex items-center gap-2"
              >
                <span>Browse Catalogue</span>
              </motion.a>
            </motion.div>

            {/* Key Micro Trust Metrics */}
            <motion.div 
              variants={textItemVariants}
              className="grid grid-cols-3 gap-4 pt-6 border-t border-forest/15 max-w-xl"
            >
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-forest-dark font-heading">99.8%</div>
                <div className="text-xs sm:text-sm text-ink-muted">Sortex Purity Guarantee</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-forest-dark font-heading">25+</div>
                <div className="text-xs sm:text-sm text-ink-muted">Countries Served</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-forest-dark font-heading">15,000 MT</div>
                <div className="text-xs sm:text-sm text-ink-muted">Annual Processing</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Hero Image Revealing with Subtle Scale Effect */}
          <motion.div 
            className="lg:col-span-5 relative"
            variants={imageRevealVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative ring */}
              <div className="absolute -inset-3 bg-gradient-to-tr from-forest/20 via-lime/20 to-transparent rounded-3xl blur-md"></div>
              
              {/* Main Card Frame */}
              <div className="relative rounded-2xl overflow-hidden shadow-elevated border border-forest/15 bg-warm-white">
                <img
                  src={IMAGES.hero.src}
                  alt={IMAGES.hero.alt}
                  width="800"
                  height="600"
                  loading="eager"
                  className="w-full h-[360px] sm:h-[420px] object-cover transition-transform duration-700 hover:scale-105"
                />

                {/* Bottom Overlay Pill with Storytelling Metadata */}
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-forest-dark/95 via-forest-dark/70 to-transparent text-warm-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-lime uppercase tracking-wider">Unjha APMC Yard Quality</p>
                      <p className="text-sm font-bold text-warm-white">Whole Spices & Cryogenic Ground Powders</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-md bg-lime/20 border border-lime/40 text-lime-light text-xs font-mono">
                      Export Ready
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Badge 1: Direct Port Logistics */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="hidden xs:flex absolute -bottom-4 left-2 sm:-bottom-5 sm:-left-6 bg-warm-white/95 backdrop-blur-md p-3 sm:p-3.5 rounded-2xl shadow-elevated border border-forest/15 items-center gap-3 max-w-[260px]"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-forest/10 flex items-center justify-center text-forest shrink-0">
                  <Anchor className="w-4 h-4 sm:w-5 sm:h-5 text-forest" />
                </div>
                <div>
                  <div className="text-xs font-bold text-forest-dark font-heading">Mundra & Kandla Ports</div>
                  <div className="text-[10px] sm:text-[11px] text-ink-muted">Direct Containerized Shipments</div>
                </div>
              </motion.div>

              {/* Floating Badge 2: Lab Verified Purity */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="hidden xs:flex absolute -top-3 right-2 sm:-top-4 sm:-right-4 bg-warm-white/95 backdrop-blur-md p-2.5 sm:p-3 rounded-xl shadow-medium border border-forest/15 items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-forest shrink-0" />
                <div className="text-[11px] sm:text-xs font-semibold text-forest-dark">
                  Purity Tested & Certified
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
