import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Camera, X, Maximize2, Tag, ArrowUpRight } from 'lucide-react';
import { IMAGES } from '../config/images';

export default function ImageGallery() {
  const shouldReduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const categories = [
    { id: 'all', name: 'All Visuals' },
    { id: 'spices', name: 'Indian Spices' },
    { id: 'processing', name: 'Processing & Milling' },
    { id: 'facility', name: 'Optical Sorting' },
    { id: 'warehouse', name: 'Storage & Warehouse' },
    { id: 'shipping', name: 'Global Shipping' },
  ];

  const galleryItems = IMAGES.gallery;

  const filteredItems = galleryItems.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <section id="gallery" className="py-20 bg-warm-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest/10 text-forest text-xs font-semibold mb-3">
            <Camera className="w-3.5 h-3.5 text-lime" />
            <span>Visual Storytelling Gallery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-forest-dark font-heading tracking-tight mb-4">
            A Glimpse into Our Spices, Plants & Global Shipments
          </h2>
          <p className="text-ink-muted text-base sm:text-lg">
            High-resolution photographic documentation of our origin sourcing, sortex cleaning operations, warehouse logistics, and container shipping.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-forest text-warm-white shadow-soft'
                  : 'bg-sage/50 text-ink-muted hover:text-forest hover:bg-sage'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Gallery Grid with AnimatePresence & layout */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
                transition={{ duration: 0.35 }}
                onClick={() => setSelectedPhoto(item)}
                className="group relative rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated border border-forest/15 cursor-pointer bg-sage/20 aspect-[4/3]"
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  width="600"
                  height="450"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/90 via-forest-dark/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                  <div className="flex justify-end">
                    <span className="w-9 h-9 rounded-full bg-warm-white/90 backdrop-blur-sm flex items-center justify-center text-forest shadow-md">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </div>

                  <div>
                    <span className="px-2.5 py-0.5 rounded bg-lime text-forest-dark text-[11px] font-bold uppercase tracking-wider mb-2 inline-block">
                      {item.tag}
                    </span>
                    <h3 className="text-lg font-bold text-warm-white font-heading mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-warm-white/80 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Permanent subtle tag on bottom-left for touch users */}
                <div className="absolute bottom-3 left-3 group-hover:opacity-0 transition-opacity">
                  <span className="px-2.5 py-1 rounded-md bg-forest-dark/80 backdrop-blur-sm text-warm-white text-[11px] font-medium shadow-xs">
                    {item.tag}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-warm-card rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-forest/20 flex flex-col"
              >
                <div className="relative aspect-[16/9] w-full bg-black">
                  <img
                    src={selectedPhoto.image}
                    alt={selectedPhoto.alt}
                    className="w-full h-full object-contain"
                  />
                  <button
                    onClick={() => setSelectedPhoto(null)}
                    aria-label="Close photo preview"
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-warm-white flex items-center justify-center hover:bg-black/90 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 bg-warm-white flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <div>
                    <span className="px-2.5 py-0.5 rounded bg-forest/10 text-forest text-xs font-semibold mb-1.5 inline-block">
                      {selectedPhoto.tag}
                    </span>
                    <h3 className="text-xl font-bold text-forest-dark font-heading">
                      {selectedPhoto.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-ink-muted mt-1 max-w-xl">
                      {selectedPhoto.description}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedPhoto(null)}
                    className="px-4 py-2 rounded-xl bg-forest text-warm-white text-xs font-semibold shrink-0"
                  >
                    Close Preview
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
