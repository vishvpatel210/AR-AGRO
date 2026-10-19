import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink, ShieldCheck, Calendar, FileText, Building2 } from 'lucide-react';

export default function CertificateModal({ certificate, onClose }) {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    // Prevent background scrolling while modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!certificate) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-forest-dark/80 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-warm-white w-full max-w-4xl rounded-2xl shadow-elevated border border-forest/20 overflow-hidden z-10 flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-forest/10 bg-warm-white shrink-0">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 pr-4">
              <div className="w-9 h-9 rounded-xl bg-forest/10 text-forest flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-forest" />
              </div>
              <div className="min-w-0">
                <h3 id="modal-title" className="text-base sm:text-lg font-bold text-forest-dark font-heading truncate">
                  {certificate.title}
                </h3>
                <p className="text-xs text-ink-muted truncate">
                  {certificate.issuingAuthority}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-ink-muted hover:text-forest-dark hover:bg-sage/70 transition-colors cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center"
              aria-label="Close certificate preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body: Document Preview + Key Metadata */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-sage-light/30 grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Document Image Container with object-contain */}
            <div className="lg:col-span-7 bg-warm-white rounded-xl border border-forest/15 p-2 sm:p-3 shadow-soft flex items-center justify-center min-h-[380px] sm:min-h-[460px]">
              <img
                src={certificate.image}
                alt={`${certificate.title} official certificate document issued to A.R. Agro Spices`}
                className="max-h-[65vh] w-auto max-w-full object-contain rounded-lg shadow-xs"
              />
            </div>

            {/* Certificate Details Sidebar */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                
                {/* Status Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest/10 border border-forest/20 text-forest text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
                  <span>Officially Verified Document</span>
                </div>

                {/* Structured Metadata Box */}
                <div className="bg-warm-white rounded-xl p-4 border border-forest/10 space-y-3 text-xs">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-ink-muted font-mono block">Certificate / License Number</span>
                    <span className="font-mono font-bold text-forest-dark text-sm break-all select-all">
                      {certificate.licenseNumber}
                    </span>
                  </div>

                  {certificate.udin && (
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-ink-muted font-mono block">UDIN Number</span>
                      <span className="font-mono font-semibold text-ink-dark select-all">
                        {certificate.udin}
                      </span>
                    </div>
                  )}

                  {certificate.iecNumber && (
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-ink-muted font-mono block">Import Export Code (IEC)</span>
                      <span className="font-mono font-semibold text-ink-dark select-all">
                        {certificate.iecNumber}
                      </span>
                    </div>
                  )}

                  <div className="pt-2 border-t border-forest/10 flex items-start gap-2">
                    <Building2 className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                    <div>
                      <span className="text-ink-muted block text-[11px]">Issuing Authority</span>
                      <span className="font-medium text-ink-dark">{certificate.issuingAuthority}</span>
                      {certificate.ministry && (
                        <span className="text-[11px] text-ink-muted block">{certificate.ministry}</span>
                      )}
                    </div>
                  </div>

                  {certificate.validity && (
                    <div className="pt-2 border-t border-forest/10 flex items-start gap-2">
                      <Calendar className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                      <div>
                        <span className="text-ink-muted block text-[11px]">Validity & Term</span>
                        <span className="font-medium text-forest-dark">{certificate.validity}</span>
                        {certificate.issueDate && (
                          <span className="text-[11px] text-ink-muted block">Issued: {certificate.issueDate}</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-xs font-bold text-forest-dark uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-forest" />
                    <span>Regulatory Scope</span>
                  </h4>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    {certificate.description}
                  </p>
                </div>

              </div>

              {/* Actions: Download / Open Fullscreen */}
              <div className="pt-3 border-t border-forest/10 flex flex-col sm:flex-row gap-2">
                <a
                  href={certificate.downloadUrl}
                  download={`${certificate.id}.jpg`}
                  className="flex-1 py-3 px-4 rounded-xl bg-forest hover:bg-forest-dark text-warm-white text-xs sm:text-sm font-semibold shadow-soft flex items-center justify-center gap-2 transition-colors min-h-[44px]"
                >
                  <Download className="w-4 h-4 text-lime" />
                  <span>Download Document</span>
                </a>

                <a
                  href={certificate.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-sage/60 hover:bg-sage text-forest-dark text-xs sm:text-sm font-semibold border border-forest/15 flex items-center justify-center gap-1.5 transition-colors min-h-[44px]"
                >
                  <span>Open Full Size</span>
                  <ExternalLink className="w-3.5 h-3.5 text-forest" />
                </a>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
