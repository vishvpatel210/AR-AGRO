import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Search, Eye, ArrowRight, Filter, Sparkles, CheckCircle2, MessageCircle } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { getProductWhatsAppUrl } from '../utils/whatsapp';

export default function ProductGrid({ onSelectProduct, onOpenInquiry }) {
  const shouldReduceMotion = useReducedMotion();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch = 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.botanicalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.origin.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 25 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.45, 
        ease: [0.16, 1, 0.3, 1] 
      }
    },
  };

  return (
    <section id="products" className="py-20 bg-warm-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest/10 text-forest text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-lime" />
            <span>Direct Sourcing & Processing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-forest-dark font-heading tracking-tight mb-4">
            Comprehensive Spices & Agro Product Range
          </h2>
          <p className="text-ink-muted text-base sm:text-lg">
            Certified export-grade agricultural commodities with laboratory verified purity, moisture, and microbiological parameters.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-forest/10">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  selectedCategory === cat.id
                    ? 'bg-forest text-warm-white shadow-soft'
                    : 'bg-sage/50 text-ink-muted hover:text-forest hover:bg-sage'
                }`}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
            <input
              type="text"
              placeholder="Search spice, herb, botanical..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-warm-white border border-forest/20 text-xs sm:text-sm text-ink-dark placeholder-ink-muted focus:outline-none focus:border-forest transition-colors shadow-xs"
            />
          </div>
        </div>

        {/* Product Cards Grid with Staggered Viewport Entrance */}
        <motion.div
          key={selectedCategory + searchQuery}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              className="group bg-warm-card rounded-2xl border border-forest/15 hover:border-forest/40 shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Image Container with subtle hover zoom */}
                <div className="relative h-52 w-full overflow-hidden bg-sage/20">
                  <img
                    src={product.image}
                    alt={product.alt}
                    width="450"
                    height="280"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  
                  {/* Badge */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="px-2 py-0.5 rounded-md bg-forest/90 backdrop-blur-sm text-warm-white text-[11px] font-semibold">
                      {product.badge}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-warm-white/90 backdrop-blur-sm text-forest-dark text-[10px] font-mono font-medium">
                      {product.origin.split(',')[0]}
                    </span>
                  </div>

                  {/* Hover Quick Action */}
                  <div className="absolute inset-0 bg-forest-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="px-3 py-1.5 rounded-lg bg-warm-white text-forest-dark text-xs font-bold shadow-md hover:bg-lime transition-colors flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Specifications</span>
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="text-[11px] font-mono text-ink-muted mb-1">
                    HS: {product.hsCode}
                  </div>
                  <h3 className="text-base font-bold text-forest-dark font-heading group-hover:text-forest transition-colors mb-1">
                    {product.name}
                  </h3>
                  <div className="text-xs italic text-ink-muted mb-2 font-serif">
                    {product.botanicalName}
                  </div>
                  <p className="text-xs text-ink-dark/80 line-clamp-2 leading-relaxed mb-4">
                    {product.shortDesc}
                  </p>

                  {/* Key parameters pill tags */}
                  <div className="flex flex-wrap gap-1.5 text-[11px]">
                    <span className="px-2 py-0.5 rounded bg-sage text-forest-dark font-medium">
                      {product.specifications.purity || 'Sortex Grade'}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-sage text-forest-dark font-medium">
                      {product.specifications.moisture || 'Max 10% Moist'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: View Specs, WhatsApp, & Enquire Now */}
              <div className="p-4 sm:p-5 pt-0">
                <div className="pt-3 border-t border-forest/10 flex items-center gap-1.5 sm:gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelectProduct(product)}
                    className="flex-1 py-2.5 min-h-[44px] rounded-xl border border-forest/20 hover:border-forest text-forest-dark text-xs font-semibold hover:bg-sage/50 transition-colors flex items-center justify-center"
                  >
                    Specs
                  </motion.button>
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
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onOpenInquiry(product)}
                    className="flex-1 py-2.5 min-h-[44px] rounded-xl bg-forest hover:bg-forest-dark text-warm-white text-xs font-semibold shadow-xs flex items-center justify-center gap-1 transition-colors"
                  >
                    <span>Enquire</span>
                    <ArrowRight className="w-3.5 h-3.5 text-lime" />
                  </motion.button>
                </div>
              </div>

            </motion.div>
          ))}
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-sage/20 rounded-2xl border border-dashed border-forest/20">
            <p className="text-forest-dark font-bold text-lg mb-1">No products match your query</p>
            <p className="text-sm text-ink-muted mb-4">Try clearing filters or search for cumin, turmeric, coriander, chilli...</p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="px-4 py-2 rounded-lg bg-forest text-warm-white text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
