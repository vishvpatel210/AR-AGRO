import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, CheckCircle2, ArrowLeft, Award, Lock, FileCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CERTIFICATES_DATA } from '../data/certificates';
import CertificateCard from '../components/CertificateCard';
import CertificateModal from '../components/CertificateModal';

const PAGE_SIZE = 4;

export default function CertificatesPage({ onOpenInquiry }) {
  const shouldReduceMotion = useReducedMotion();
  const [activeCertificate, setActiveCertificate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const gridRef = useRef(null);

  const totalPages = Math.ceil(CERTIFICATES_DATA.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedCerts = CERTIFICATES_DATA.slice(startIndex, startIndex + PAGE_SIZE);

  function goToPage(page) {
    setCurrentPage(page);
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.08 },
    },
    exit: { opacity: 0, transition: { duration: 0.18 } },
  };

  return (
    <div className="py-8 sm:py-12 bg-warm-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium text-ink-muted mb-6">
          <Link to="/" className="hover:text-forest flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <span className="text-ink-muted/60">/</span>
          <span className="text-forest font-semibold">Certificates</span>
        </nav>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-forest/10 border border-forest/20 text-forest text-xs font-semibold mb-4">
            <ShieldCheck className="w-4 h-4 text-forest" />
            <span>Government Verified & Regulatory Accreditations</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-forest-dark font-heading tracking-tight mb-4">
            Our Certifications
          </h1>
          
          <p className="text-ink-muted text-base sm:text-lg leading-relaxed">
            Our commitment to quality, food safety and international export standards.
          </p>
        </div>

        {/* B2B Credibility & Compliance Highlights Banner */}
        <div className="bg-sage/40 rounded-2xl p-5 sm:p-6 border border-forest/15 mb-10 sm:mb-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-forest/10 text-forest flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-forest" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-forest-dark uppercase tracking-wider">FSSAI Central License</h4>
                <p className="text-xs text-ink-muted">Proprietary food manufacturer & direct international export authorization.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-forest/10 text-forest flex items-center justify-center shrink-0 mt-0.5">
                <Award className="w-4 h-4 text-forest" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-forest-dark uppercase tracking-wider">Indian Customs AEO-T1</h4>
                <p className="text-xs text-ink-muted">WCO SAFE framework compliance with fast-track port customs clearance.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-forest/10 text-forest flex items-center justify-center shrink-0 mt-0.5">
                <FileCheck className="w-4 h-4 text-forest" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-forest-dark uppercase tracking-wider">DGFT Free Sale Certificate</h4>
                <p className="text-xs text-ink-muted">Commerce certificate for unhindered global export of Indian spices.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-forest/10 text-forest flex items-center justify-center shrink-0 mt-0.5">
                <Lock className="w-4 h-4 text-forest" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-forest-dark uppercase tracking-wider">100% Verified Documents</h4>
                <p className="text-xs text-ink-muted">Authentic statutory registrations available for global buyer compliance audits.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Grid header: title + page count */}
        <div
          ref={gridRef}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6 scroll-mt-24"
        >
          <h2 className="text-lg font-bold text-forest-dark font-heading">
            All Certificates
            <span className="ml-2 text-xs font-normal text-ink-muted">({CERTIFICATES_DATA.length} documents)</span>
          </h2>
          {totalPages > 1 && (
            <p className="text-xs text-ink-muted">
              Showing {startIndex + 1}–{Math.min(startIndex + PAGE_SIZE, CERTIFICATES_DATA.length)} of {CERTIFICATES_DATA.length}
            </p>
          )}
        </div>

        {/* Certificate Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 mb-8"
          >
            {paginatedCerts.map((cert) => (
              <CertificateCard
                key={cert.id}
                certificate={cert}
                onPreview={(c) => setActiveCertificate(c)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div
            className="flex items-center justify-center gap-1.5 mb-14"
            role="navigation"
            aria-label="Certificate pagination"
          >
            {/* Previous */}
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
              className={`flex items-center gap-1 px-3.5 py-2 rounded-xl text-sm font-semibold border transition-all duration-200 min-h-[40px] ${
                currentPage === 1
                  ? 'text-ink-muted/40 border-forest/10 bg-sage/20 cursor-not-allowed'
                  : 'text-forest-dark border-forest/20 bg-white hover:bg-forest hover:text-white hover:border-forest cursor-pointer shadow-sm hover:shadow-md'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            {/* Page numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                aria-label={`Page ${page}`}
                aria-current={page === currentPage ? 'page' : undefined}
                className={`w-10 h-10 rounded-xl text-sm font-bold border transition-all duration-200 cursor-pointer ${
                  page === currentPage
                    ? 'bg-forest text-white border-forest shadow-md scale-105'
                    : 'text-forest-dark border-forest/20 bg-white hover:bg-forest/10 hover:border-forest/40 shadow-sm'
                }`}
              >
                {page}
              </button>
            ))}

            {/* Next */}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
              className={`flex items-center gap-1 px-3.5 py-2 rounded-xl text-sm font-semibold border transition-all duration-200 min-h-[40px] ${
                currentPage === totalPages
                  ? 'text-ink-muted/40 border-forest/10 bg-sage/20 cursor-not-allowed'
                  : 'text-forest-dark border-forest/20 bg-white hover:bg-forest hover:text-white hover:border-forest cursor-pointer shadow-sm hover:shadow-md'
              }`}
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Export Buyer Support / Audit Inquiry CTA */}
        <div className="bg-gradient-to-br from-forest-dark via-forest to-forest-dark rounded-3xl p-8 sm:p-12 text-warm-white shadow-elevated text-center max-w-4xl mx-auto relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold font-heading mb-3 text-warm-white">
              Require Quality Audits or Custom Documentation?
            </h3>
            <p className="text-sm sm:text-base text-warm-white/80 max-w-2xl mx-auto mb-6 leading-relaxed">
              We provide complete phytosanitary certificates, certificate of analysis (COA), SGS/Geo-Chem inspection reports, and certificate of origin with every export shipment.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => onOpenInquiry && onOpenInquiry('Export Compliance & Certificates')}
                className="px-6 py-3.5 rounded-xl bg-lime hover:bg-lime-hover text-forest-dark font-bold text-sm shadow-soft transition-all min-h-[44px] cursor-pointer"
              >
                Request Certificate Package
              </button>
              <a
                href="https://wa.me/919870072960?text=Hello%20A.R.%20Agro%20Spices%2C%20I%20would%20like%20to%20request%20your%20company%20registration%20and%20compliance%20certificate%20dossier."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-warm-white/10 hover:bg-warm-white/20 text-warm-white font-semibold text-sm border border-warm-white/20 transition-all min-h-[44px]"
              >
                Inquire on WhatsApp
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Lightbox Preview Modal */}
      {activeCertificate && (
        <CertificateModal
          certificate={activeCertificate}
          onClose={() => setActiveCertificate(null)}
        />
      )}
    </div>
  );
}
