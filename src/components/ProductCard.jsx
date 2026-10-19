import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ExternalLink, FileText } from 'lucide-react';
import { getProductWhatsAppUrl } from '../utils/whatsapp';

export default function ProductCard({ product, onOpenInquiry }) {
  const whatsappUrl = getProductWhatsAppUrl(product);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }
      }}
      className="group bg-warm-card rounded-2xl border border-forest/15 hover:border-forest/40 shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
    >
      <div>
        {/* Consistent 4:3 Product Image */}
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

          {/* Short Category Tag */}
          {product.categoryLabel && (
            <div className="absolute top-3 left-3 pointer-events-none">
              <span className="px-2.5 py-1 rounded-md bg-warm-white/95 backdrop-blur-sm text-forest-dark text-[11px] font-semibold border border-forest/10 shadow-xs">
                {product.categoryLabel}
              </span>
            </div>
          )}
        </div>

        {/* Card Body */}
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

      {/* Card Action: Prominent Enquire on WhatsApp Button */}
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

        {/* Optional Secondary Request RFQ Link */}
        {onOpenInquiry && (
          <button
            type="button"
            onClick={() => onOpenInquiry(product)}
            className="w-full py-1.5 px-3 rounded-lg text-xs font-semibold text-ink-muted hover:text-forest hover:bg-sage/40 transition-colors flex items-center justify-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Request Email RFQ</span>
          </button>
        )}
      </div>
    </motion.div>
  );
}
