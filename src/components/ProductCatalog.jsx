import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Search, MessageCircle, ExternalLink, Sparkles, X, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { getProductWhatsAppUrl } from '../utils/whatsapp';

const ITEMS_PER_PAGE = 8;

export default function ProductCatalog({ onOpenInquiry }) {
  const shouldReduceMotion = useReducedMotion();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const sectionHeadingRef = useRef(null);

  // Filter products by category and search query
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch = 
        !query ||
        item.name.toLowerCase().includes(query) ||
        (item.commonName && item.commonName.toLowerCase().includes(query)) ||
        (item.categoryLabel && item.categoryLabel.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Reset to page 1 whenever category or search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  // Calculate total pages dynamically
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;

  // Ensure currentPage does not exceed totalPages if product count shrinks
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  // Sliced paginated products (exactly 8 per page, last page may have fewer)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredProducts.length);
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  // Smooth scroll to the Products section heading when changing pages
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
    setCurrentPage(newPage);

    if (sectionHeadingRef.current) {
      sectionHeadingRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      const section = document.getElementById('products');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.04,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 15 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.35, 
        ease: [0.16, 1, 0.3, 1] 
      }
    },
  };

  return (
    <section id="products" ref={sectionHeadingRef} className="py-16 sm:py-24 bg-warm-white relative scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest/10 text-forest text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-lime" />
            <span>Direct Sourcing from Unjha, Gujarat</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-forest-dark font-heading tracking-tight mb-4">
            Our Products
          </h2>
          <p className="text-ink-muted text-base sm:text-lg leading-relaxed">
            Explore our range of quality Indian spices, seeds, and agricultural products.
          </p>
        </div>

        {/* Search & Category Filter Navigation */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-8 pb-6 border-b border-forest/10">
          
          {/* Category Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 w-full lg:w-auto">
            {CATEGORIES.map((cat) => {
              const count = cat.id === 'all' 
                ? PRODUCTS.length 
                : PRODUCTS.filter((p) => p.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer min-h-[42px] flex items-center gap-1.5 ${
                    selectedCategory === cat.id
                      ? 'bg-forest text-warm-white shadow-soft ring-2 ring-forest/20'
                      : 'bg-sage/50 text-ink-dark/80 hover:text-forest hover:bg-sage/80'
                  }`}
                  aria-pressed={selectedCategory === cat.id}
                >
                  <span>{cat.name}</span>
                  <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-mono ${
                    selectedCategory === cat.id ? 'bg-forest-dark/40 text-warm-white' : 'bg-warm-white/80 text-ink-muted'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted pointer-events-none" />
            <input
              type="text"
              placeholder="Search by English or Gujarati name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 min-h-[44px] rounded-xl bg-warm-white border border-forest/20 text-xs sm:text-sm text-ink-dark placeholder-ink-muted focus:outline-none focus:border-forest transition-colors shadow-xs"
              aria-label="Search products"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink-dark p-1"
                aria-label="Clear search query"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Product Count & Active Page Status */}
        {filteredProducts.length > 0 && (
          <div className="flex items-center justify-between text-xs sm:text-sm text-ink-muted mb-6 px-1">
            <span>
              Showing <strong className="text-forest-dark">{startIndex + 1}–{endIndex}</strong> of <strong className="text-forest-dark">{filteredProducts.length}</strong> products
            </span>
            <span>
              Page <strong className="text-forest-dark">{currentPage}</strong> of <strong className="text-forest-dark">{totalPages}</strong>
            </span>
          </div>
        )}

        {/* Product Grid: 4 cols Desktop, 2-3 cols Tablet, 1-2 cols Mobile */}
        {filteredProducts.length > 0 ? (
          <>
            <motion.div
              key={`page-${currentPage}-${selectedCategory}-${searchQuery}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {paginatedProducts.map((product) => {
                const whatsappUrl = getProductWhatsAppUrl(product);

                return (
                  <motion.div
                    key={product.id}
                    variants={cardVariants}
                    className="group bg-warm-card rounded-2xl border border-forest/15 hover:border-forest/40 shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
                  >
                    <div>
                      {/* Consistent 4:3 Product Photograph */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-sage/20">
                        <img
                          src={product.image}
                          alt={product.alt || product.name}
                          width="500"
                          height="375"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.src = '/images/hero_spices.jpg';
                          }}
                          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        />

                        {/* Category Badge */}
                        {product.categoryLabel && (
                          <div className="absolute top-3 left-3 pointer-events-none">
                            <span className="px-2.5 py-1 rounded-md bg-warm-white/95 backdrop-blur-sm text-forest-dark text-[11px] font-semibold border border-forest/10 shadow-xs">
                              {product.categoryLabel}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="p-5">
                        {/* English Product Name */}
                        <h3 className="text-lg font-bold text-forest-dark font-heading group-hover:text-forest transition-colors mb-0.5">
                          {product.name}
                        </h3>

                        {/* Gujarati / Hindi Common Name */}
                        {product.commonName && (
                          <p className="text-xs font-semibold text-lime-hover font-sans mb-2">
                            {product.commonName}
                          </p>
                        )}

                        {/* Short, accurate description */}
                        <p className="text-xs text-ink-muted leading-relaxed line-clamp-2">
                          {product.shortDescription}
                        </p>
                      </div>
                    </div>

                    {/* Actions: Prominent Enquire on WhatsApp Button */}
                    <div className="p-5 pt-0 space-y-2">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm shadow-soft hover:shadow-medium flex items-center justify-center gap-2 transition-all duration-200 min-h-[44px]"
                        aria-label={`Enquire about ${product.name} on WhatsApp`}
                      >
                        <MessageCircle className="w-4 h-4 fill-current shrink-0" />
                        <span>Enquire on WhatsApp</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-80 shrink-0" />
                      </a>

                      {/* Secondary Request RFQ Link */}
                      {onOpenInquiry && (
                        <button
                          type="button"
                          onClick={() => onOpenInquiry(product)}
                          className="w-full py-2 px-3 rounded-lg text-xs font-semibold text-ink-muted hover:text-forest hover:bg-sage/40 transition-colors flex items-center justify-center gap-1.5 min-h-[36px]"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Request Email Quotation</span>
                        </button>
                      )}
                    </div>

                  </motion.div>
                );
              })}
            </motion.div>

            {/* Centered Pagination Controls Below the Product Grid */}
            {totalPages > 1 && (
              <div className="mt-12 flex flex-col items-center justify-center gap-4 pt-6 border-t border-forest/10">
                <nav 
                  className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5" 
                  aria-label="Product catalogue pagination"
                >
                  {/* Previous Button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    aria-label="Go to previous page"
                    className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-forest/20 text-xs sm:text-sm font-semibold text-forest-dark disabled:opacity-40 disabled:cursor-not-allowed hover:bg-sage/60 hover:border-forest/40 transition-all flex items-center gap-1.5 min-h-[42px] cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  {/* Numbered Page Buttons */}
                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const pageNum = idx + 1;
                    const isActive = currentPage === pageNum;

                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        aria-current={isActive ? 'page' : undefined}
                        aria-label={`Page ${pageNum}`}
                        className={`w-10 sm:w-11 h-10 sm:h-11 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-center min-h-[42px] cursor-pointer ${
                          isActive
                            ? 'bg-forest text-warm-white shadow-soft ring-2 ring-forest/20 font-bold'
                            : 'bg-warm-white border border-forest/15 text-forest-dark hover:bg-sage/70 hover:border-forest/30'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  {/* Next Button */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    aria-label="Go to next page"
                    className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-forest/20 text-xs sm:text-sm font-semibold text-forest-dark disabled:opacity-40 disabled:cursor-not-allowed hover:bg-sage/60 hover:border-forest/40 transition-all flex items-center gap-1.5 min-h-[42px] cursor-pointer"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </nav>

                <p className="text-xs text-ink-muted">
                  Showing 8 products per page • Page {currentPage} of {totalPages}
                </p>
              </div>
            )}
          </>
        ) : (
          /* Empty Search / Filter State */
          <div className="text-center py-16 px-4 bg-sage/20 rounded-3xl border border-dashed border-forest/20 max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-full bg-forest/10 text-forest flex items-center justify-center mx-auto mb-3">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-forest-dark font-heading mb-1">
              No products found
            </h3>
            <p className="text-xs sm:text-sm text-ink-muted mb-5 leading-relaxed">
              We couldn't find any products matching "{searchQuery}". Try selecting another category or clear your search term.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 rounded-xl bg-forest text-warm-white text-xs font-semibold shadow-soft hover:bg-forest-dark transition-colors min-h-[44px] cursor-pointer"
            >
              Show All 25 Products
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
