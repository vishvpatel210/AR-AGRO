import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Search, ChevronLeft, ChevronRight, X, ArrowLeft, Sparkles, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS, CATEGORIES } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function ProductsPage({ onOpenInquiry }) {
  const shouldReduceMotion = useReducedMotion();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Filter products by category and search
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
  }, [selectedCategory, searchQuery, itemsPerPage]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredProducts.length);
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.04,
      },
    },
  };

  return (
    <div className="py-8 sm:py-12 bg-warm-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-medium text-ink-muted mb-6">
          <Link to="/" className="hover:text-forest flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <span>/</span>
          <span className="text-forest font-semibold">Our Products Catalogue</span>
        </div>

        {/* Page Header */}
        <div className="mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest/10 text-forest text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-lime" />
            <span>Comprehensive Agricultural & Spice Catalogue</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-forest-dark font-heading tracking-tight mb-3">
            All Products
          </h1>
          <p className="text-ink-muted text-sm sm:text-base max-w-2xl leading-relaxed">
            Directly sourced and processed at our Unjha facility in Gujarat. Every commodity is available for bulk wholesale container dispatch and custom export packaging.
          </p>
        </div>

        {/* Search, Filter Tabs & Items Per Page Controls */}
        <div className="bg-sage/40 rounded-2xl p-4 sm:p-5 border border-forest/10 mb-8 sm:mb-10 space-y-4">
          
          {/* Top Row: Search and Items Per Page */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted pointer-events-none" />
              <input
                type="text"
                placeholder="Search by English or Gujarati name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-warm-white border border-forest/20 text-xs sm:text-sm text-ink-dark placeholder-ink-muted focus:outline-none focus:border-forest transition-colors shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink-dark p-1"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Per-Page Selector & Results Count */}
            <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto text-xs text-ink-muted">
              <span>
                Showing <strong>{filteredProducts.length === 0 ? 0 : startIndex + 1}–{endIndex}</strong> of <strong>{filteredProducts.length}</strong> products
              </span>
              <div className="flex items-center gap-1.5">
                <span className="hidden xs:inline">Show:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className="px-2.5 py-1.5 rounded-lg bg-warm-white border border-forest/20 text-xs text-forest-dark font-medium focus:outline-none focus:border-forest cursor-pointer"
                >
                  <option value={8}>8 / page</option>
                  <option value={12}>12 / page</option>
                  <option value={25}>All 25</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-forest/10">
            {CATEGORIES.map((cat) => {
              const count = cat.id === 'all'
                ? PRODUCTS.length
                : PRODUCTS.filter((p) => p.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer min-h-[40px] flex items-center gap-1.5 ${
                    selectedCategory === cat.id
                      ? 'bg-forest text-warm-white shadow-soft'
                      : 'bg-warm-white text-ink-dark/80 hover:text-forest hover:bg-sage/80 border border-forest/10'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                    selectedCategory === cat.id ? 'bg-forest-dark/40 text-warm-white' : 'bg-sage text-ink-muted'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Product Cards Grid: 4 cols on Desktop, 3 on Tablet, 2 on Mobile */}
        {filteredProducts.length > 0 ? (
          <>
            <motion.div
              key={`page-${currentPage}-${selectedCategory}-${searchQuery}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12"
            >
              {currentProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpenInquiry={onOpenInquiry}
                />
              ))}
            </motion.div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 border-t border-forest/10">
                <div className="text-xs text-ink-muted">
                  Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
                </div>

                <div className="flex items-center gap-1.5">
                  {/* Previous Page */}
                  <button
                    onClick={() => {
                      setCurrentPage((p) => Math.max(1, p - 1));
                      window.scrollTo({ top: 250, behavior: 'smooth' });
                    }}
                    disabled={currentPage === 1}
                    aria-label="Previous page"
                    className="px-3 py-2 rounded-xl border border-forest/20 text-xs font-semibold text-forest-dark disabled:opacity-40 disabled:cursor-not-allowed hover:bg-sage/50 transition-colors flex items-center gap-1 min-h-[40px]"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden xs:inline">Previous</span>
                  </button>

                  {/* Page Numbers */}
                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const pageNum = idx + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => {
                          setCurrentPage(pageNum);
                          window.scrollTo({ top: 250, behavior: 'smooth' });
                        }}
                        className={`w-10 h-10 rounded-xl text-xs font-bold transition-all ${
                          currentPage === pageNum
                            ? 'bg-forest text-warm-white shadow-soft ring-2 ring-forest/20'
                            : 'bg-warm-white border border-forest/15 text-ink-dark hover:bg-sage/60'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  {/* Next Page */}
                  <button
                    onClick={() => {
                      setCurrentPage((p) => Math.min(totalPages, p + 1));
                      window.scrollTo({ top: 250, behavior: 'smooth' });
                    }}
                    disabled={currentPage === totalPages}
                    aria-label="Next page"
                    className="px-3 py-2 rounded-xl border border-forest/20 text-xs font-semibold text-forest-dark disabled:opacity-40 disabled:cursor-not-allowed hover:bg-sage/50 transition-colors flex items-center gap-1 min-h-[40px]"
                  >
                    <span className="hidden xs:inline">Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          /* Empty Search Results State */
          <div className="text-center py-20 px-4 bg-sage/20 rounded-3xl border border-dashed border-forest/20 max-w-lg mx-auto my-8">
            <div className="w-12 h-12 rounded-full bg-forest/10 text-forest flex items-center justify-center mx-auto mb-3">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-forest-dark font-heading mb-1">
              No matching spices or commodities
            </h3>
            <p className="text-xs sm:text-sm text-ink-muted mb-5 leading-relaxed">
              We couldn't find any products matching "{searchQuery}". Try selecting another category or clear your search term.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 rounded-xl bg-forest text-warm-white text-xs font-semibold shadow-soft hover:bg-forest-dark transition-colors min-h-[44px]"
            >
              Reset Filters & Show All
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
