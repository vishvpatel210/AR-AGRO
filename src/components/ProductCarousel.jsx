import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Eye, Layers, MessageCircle } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { getProductWhatsAppUrl } from '../utils/whatsapp';

export default function ProductCarousel({ onSelectProduct, onOpenInquiry }) {
  const shouldReduceMotion = useReducedMotion();
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(3);

  // Responsive items per view
  useEffect(() => {
    const updateVisibleItems = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1);
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2);
      } else {
        setVisibleItems(3);
      }
    };
    updateVisibleItems();
    window.addEventListener('resize', updateVisibleItems);
    return () => window.removeEventListener('resize', updateVisibleItems);
  }, []);

  const maxIndex = Math.max(0, PRODUCTS.length - visibleItems);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <section className="py-16 bg-sage/30 border-y border-forest/10 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest/10 text-forest text-xs font-semibold mb-2">
              <Layers className="w-3.5 h-3.5 text-lime" />
              <span>Flagship Export Commodities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-forest-dark font-heading tracking-tight">
              Export Grade Product Carousel
            </h2>
            <p className="text-ink-muted text-sm sm:text-base mt-1">
              Swipe or use controls to explore export batches sourced directly from Unjha & Indian spice belts.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrev}
              disabled={currentIndex === 0}
              aria-label="Previous products slide"
              className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-all ${
                currentIndex === 0
                  ? 'border-forest/10 text-forest/30 cursor-not-allowed bg-warm-white/50'
                  : 'border-forest/20 text-forest hover:bg-forest hover:text-warm-white bg-warm-white shadow-soft'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              aria-label="Next products slide"
              className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-all ${
                currentIndex >= maxIndex
                  ? 'border-forest/10 text-forest/30 cursor-not-allowed bg-warm-white/50'
                  : 'border-forest/20 text-forest hover:bg-forest hover:text-warm-white bg-warm-white shadow-soft'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Carousel Container with Touch/Swipe Support */}
        <div className="overflow-hidden" ref={carouselRef}>
          <motion.div
            className="flex gap-6 cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: -((PRODUCTS.length - visibleItems) * 320), right: 0 }}
            animate={{
              x: shouldReduceMotion 
                ? 0 
                : visibleItems === 1 
                  ? `calc(-${currentIndex} * (100% + 24px))`
                  : visibleItems === 2
                    ? `calc(-${currentIndex} * (50% + 12px))`
                    : `calc(-${currentIndex} * (33.333% + 8px))`,
            }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          >
            {PRODUCTS.map((product) => (
              <div
                key={product.id}
                className="shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                {/* Product Card with Zoom, Shadow, and Border transition */}
                <div className="group bg-warm-card rounded-2xl border border-forest/15 hover:border-forest/40 shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1.5 flex flex-col h-full overflow-hidden">
                  
                  {/* Card Image Container with gentle hover zoom */}
                  <div className="relative h-56 w-full overflow-hidden bg-sage/20">
                    <img
                      src={product.image}
                      alt={product.alt}
                      width="500"
                      height="300"
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    
                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <span className="px-2.5 py-1 rounded-md bg-forest/90 backdrop-blur-sm text-warm-white text-xs font-semibold shadow-xs">
                        {product.badge}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-warm-white/90 backdrop-blur-sm text-forest-dark text-[11px] font-mono font-medium border border-forest/10">
                        {product.origin.split(',')[0]}
                      </span>
                    </div>

                    {/* Hover Quick Action Overlay */}
                    <div className="absolute inset-0 bg-forest-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 p-4">
                      <button
                        onClick={() => onSelectProduct(product)}
                        className="px-3.5 py-2 rounded-lg bg-warm-white text-forest-dark text-xs font-bold shadow-md hover:bg-lime transition-colors flex items-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Specs</span>
                      </button>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="text-xs font-mono text-ink-muted mb-1">
                        HS CODE: {product.hsCode}
                      </div>
                      <h3 className="text-lg font-bold text-forest-dark font-heading group-hover:text-forest transition-colors mb-1.5">
                        {product.name}
                      </h3>
                      <p className="text-xs italic text-ink-muted mb-3 font-serif">
                        {product.botanicalName}
                      </p>
                      <p className="text-xs text-ink-dark/80 line-clamp-2 leading-relaxed mb-4">
                        {product.shortDesc}
                      </p>

                      {/* Spec summary tags */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        <span className="px-2 py-0.5 rounded bg-sage text-[11px] text-forest-dark font-medium">
                          Purity: {product.specifications.purity || 'Sortex Grade'}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-sage text-[11px] text-forest-dark font-medium">
                          Moisture: {product.specifications.moisture || 'Standard'}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Actions: View Details, WhatsApp, & Enquire Now */}
                    <div className="pt-4 border-t border-forest/10 flex items-center gap-1.5 sm:gap-2">
                      <button
                        onClick={() => onSelectProduct(product)}
                        className="flex-1 py-2.5 min-h-[44px] rounded-xl border border-forest/20 hover:border-forest text-forest-dark text-xs font-semibold hover:bg-sage/50 transition-colors flex items-center justify-center"
                      >
                        Details
                      </button>
                      <a
                        href={getProductWhatsAppUrl(product.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Enquire about ${product.name} on WhatsApp`}
                        title={`Enquire about ${product.name} on WhatsApp`}
                        className="w-10 h-10 min-h-[44px] rounded-xl bg-[#25D366]/15 hover:bg-[#25D366] text-[#128C7E] hover:text-white flex items-center justify-center transition-colors shrink-0"
                      >
                        <MessageCircle className="w-4 h-4 fill-current" />
                      </a>
                      <button
                        onClick={() => onOpenInquiry(product)}
                        className="flex-1 py-2.5 min-h-[44px] rounded-xl bg-forest hover:bg-forest-dark text-warm-white text-xs font-semibold shadow-xs flex items-center justify-center gap-1 group-hover:bg-forest-dark transition-colors"
                      >
                        <span>Enquire</span>
                        <ArrowRight className="w-3.5 h-3.5 text-lime" />
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === idx 
                  ? 'w-7 bg-forest' 
                  : 'w-2 bg-forest/20 hover:bg-forest/40'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
