import React, { useRef } from 'react';
import { motion, useReducedMotion, useMotionValue, useTransform } from 'framer-motion';
import { Eye, Download, Calendar, Award } from 'lucide-react';

export default function CertificateCard({ certificate, onPreview }) {
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef(null);

  // 3-D tilt on mouse move
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-80, 80], [5, -5]);
  const rotateY = useTransform(mouseX, [-80, 80], [-5, 5]);

  function handleMouseMove(e) {
    if (shouldReduceMotion) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      variants={{
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      style={{
        ...(shouldReduceMotion ? {} : { rotateX, rotateY, transformStyle: 'preserve-3d' }),
        boxShadow: '0 2px 12px -2px rgba(0,0,0,0.08), 0 0 0 1px rgba(34,85,34,0.12)',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={shouldReduceMotion ? {} : { y: -6 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      className="group relative bg-white rounded-2xl flex flex-col justify-between overflow-hidden"
    >
      {/* Animated glow ring on hover (via pseudo-element simulation) */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ boxShadow: '0 0 0 2px rgba(34,120,34,0.45), 0 16px 40px -8px rgba(34,100,34,0.20)' }}
      />

      {/* Shine sweep — diagonal left-to-right on hover */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-2xl">
        <div
          className="absolute top-0 h-full w-[50%] -translate-x-full group-hover:translate-x-[260%] transition-transform duration-700 ease-in-out"
          style={{
            background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.22) 50%, transparent 80%)',
            transform: 'skewX(-20deg)',
          }}
        />
      </div>

      <div className="relative z-20 flex flex-col h-full">
        {/* Certificate Document Preview Frame */}
        <div
          onClick={() => onPreview(certificate)}
          className="relative aspect-[3/4] w-full p-4 bg-gradient-to-b from-sage/30 to-sage/10 border-b border-forest/10 flex items-center justify-center cursor-pointer overflow-hidden"
          title="Click to view full certificate"
        >
          <img
            src={certificate.image}
            alt={`${certificate.title} official credential`}
            loading="lazy"
            className="w-full h-full object-contain filter drop-shadow-md transition-transform duration-500 ease-out group-hover:scale-[1.07]"
          />

          {/* Hover overlay hint */}
          <div className="absolute inset-0 bg-forest-dark/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-250 flex items-center justify-center gap-2 text-white text-xs font-semibold">
            <Eye className="w-4 h-4 text-lime" />
            <span>Click to Enlarge</span>
          </div>

          {/* Badge */}
          {certificate.badge && (
            <div className="absolute top-3 left-3 pointer-events-none">
              <span className="px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-sm text-forest-dark text-[11px] font-bold border border-forest/15 shadow-sm flex items-center gap-1">
                <Award className="w-3 h-3 text-forest" />
                <span>{certificate.badge}</span>
              </span>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-5 flex-1">
          <h3
            onClick={() => onPreview(certificate)}
            className="text-base sm:text-lg font-bold text-forest-dark font-heading group-hover:text-forest transition-colors duration-200 mb-1.5 cursor-pointer line-clamp-2"
          >
            {certificate.title}
          </h3>

          <p className="text-xs font-semibold text-lime-hover font-sans mb-3 line-clamp-1">
            {certificate.issuingAuthority}
          </p>

          <div className="space-y-1.5 pt-2 border-t border-forest/10 text-xs">
            {certificate.licenseNumber && (
              <div className="flex items-center justify-between text-ink-dark/90">
                <span className="text-[11px] text-ink-muted">Reg / Lic No:</span>
                <span className="font-mono font-bold text-forest-dark truncate max-w-[170px]" title={certificate.licenseNumber}>
                  {certificate.licenseNumber}
                </span>
              </div>
            )}
            {certificate.validity && (
              <div className="flex items-center justify-between text-ink-muted text-[11px]">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-forest shrink-0" />
                  <span>Validity:</span>
                </span>
                <span className="font-medium text-forest-dark truncate max-w-[160px]">
                  {certificate.validity}
                </span>
              </div>
            )}
          </div>

          {certificate.description && (
            <p className="text-xs text-ink-muted leading-relaxed line-clamp-2 mt-3 pt-2 border-t border-forest/5">
              {certificate.description}
            </p>
          )}
        </div>

        {/* Card Actions */}
        <div className="p-5 pt-0 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onPreview(certificate)}
            className="group/view w-full py-2.5 px-3 rounded-xl bg-forest hover:bg-forest-dark text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 min-h-[42px] cursor-pointer shadow-sm hover:shadow-md"
            aria-label={`View ${certificate.title} full document`}
          >
            <Eye className="w-3.5 h-3.5 text-lime transition-transform duration-200 group-hover/view:scale-110" />
            <span>View</span>
          </button>

          <a
            href={certificate.downloadUrl}
            download={`${certificate.id}.jpg`}
            className="group/dl w-full py-2.5 px-3 rounded-xl bg-sage/60 hover:bg-forest/10 text-forest-dark text-xs font-semibold border border-forest/15 hover:border-forest/40 flex items-center justify-center gap-1.5 transition-all duration-200 min-h-[42px]"
            aria-label={`Download ${certificate.title} document`}
          >
            <Download className="w-3.5 h-3.5 text-forest transition-transform duration-200 group-hover/dl:-translate-y-0.5 group-hover/dl:scale-110" />
            <span>Download</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
