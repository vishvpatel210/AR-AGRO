import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles, ArrowRight, Grid } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import ProductCard from './ProductCard';

export default function HomeFeaturedProducts({ onOpenInquiry }) {
  const shouldReduceMotion = useReducedMotion();

  // Exactly the 6 requested featured products
  const featuredProducts = PRODUCTS.filter((p) => p.isFeatured);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  return (
    <section id="products" className="py-16 sm:py-24 bg-warm-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
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

        {/* Clean 3-Column Grid on Desktop, 2 on Tablet, 1 on Mobile */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12"
        >
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenInquiry={onOpenInquiry}
            />
          ))}
        </motion.div>

        {/* View All Products CTA */}
        <div className="text-center pt-4">
          <Link
            to="/products"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-forest hover:bg-forest-dark text-warm-white text-sm sm:text-base font-bold shadow-medium hover:shadow-elevated transition-all duration-200 group min-h-[48px]"
            id="view-all-products-btn"
          >
            <Grid className="w-5 h-5 text-lime" />
            <span>View All Products (25 Items)</span>
            <ArrowRight className="w-4 h-4 text-lime group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-xs text-ink-muted mt-2.5">
            Browse our complete catalogue of whole spices, roots, seeds & agro commodities with filters and search.
          </p>
        </div>

      </div>
    </section>
  );
}
