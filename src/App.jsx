import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import StatsCounter from './components/StatsCounter';
import ProductCatalog from './components/ProductCatalog';
import WholeVsGroundShowcase from './components/WholeVsGroundShowcase';
import ProcessingFacility from './components/ProcessingFacility';
import WarehouseLogistics from './components/WarehouseLogistics';
import CertificationsSection from './components/CertificationsSection';
import ImageGallery from './components/ImageGallery';
import InquiryForm from './components/InquiryForm';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Footer from './components/Footer';
import ProductsPage from './pages/ProductsPage';
import CertificatesPage from './pages/CertificatesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ArrowCursor from './components/ArrowCursor';
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquiryProduct, setInquiryProduct] = useState(null);

  const handleOpenInquiry = (product = null) => {
    setInquiryProduct(product);
    setInquiryModalOpen(true);
  };

  const handleCloseInquiry = () => {
    setInquiryModalOpen(false);
    setInquiryProduct(null);
  };

  return (
    <div className="min-h-screen bg-warm-white text-ink-dark flex flex-col font-sans selection:bg-lime/30 selection:text-forest-dark">
      {/* Interactive Arrow Cursor Effect */}
      <ArrowCursor />

      {/* Navigation Header */}
      <Header onOpenInquiry={() => handleOpenInquiry()} />

      <main className="flex-1">
        <Routes>
          {/* 1. Main Homepage Route */}
          <Route
            path="/"
            element={
              <>
                {/* 1. Hero Section */}
                <Hero onOpenInquiry={() => handleOpenInquiry()} />

                {/* 2. Key Trade Statistics */}
                <StatsCounter />

                {/* 3. Image-First "Our Products" Catalogue (8 products/page with pagination) */}
                <ProductCatalog onOpenInquiry={(p) => handleOpenInquiry(p)} />

                {/* 4. Visual Story: Whole Spices vs Cryogenic Ground Powders */}
                <WholeVsGroundShowcase 
                  onOpenInquiry={() => handleOpenInquiry()} 
                  onSelectProduct={(p) => handleOpenInquiry(p)} 
                />

                {/* 5. Visual Story: Modern Processing & Bühler Sortex Machinery */}
                <ProcessingFacility onOpenInquiry={() => handleOpenInquiry()} />

                {/* 6. Visual Story: Palletized Warehouses & Global Container Shipping */}
                <WarehouseLogistics onOpenInquiry={() => handleOpenInquiry()} />

                {/* 7. Global Food Safety Certifications */}
                <CertificationsSection />

                {/* 8. Visual Storytelling Image Gallery */}
                <ImageGallery />

              </>
            }
          />

          {/* 2. Dedicated Products Route */}
          <Route
            path="/products"
            element={<ProductsPage onOpenInquiry={(p) => handleOpenInquiry(p)} />}
          />

          {/* 3. Dedicated Certificates Route */}
          <Route
            path="/certificates"
            element={<CertificatesPage onOpenInquiry={(p) => handleOpenInquiry(p)} />}
          />

          {/* 4. About Company Route */}
          <Route
            path="/about"
            element={<AboutPage onOpenInquiry={() => handleOpenInquiry()} />}
          />

          {/* 5. Contact Route */}
          <Route
            path="/contact"
            element={<ContactPage onOpenInquiry={() => handleOpenInquiry()} />}
          />
        </Routes>
      </main>

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />

      {/* Global Footer */}
      <Footer onOpenInquiry={() => handleOpenInquiry()} />

      {/* Standalone B2B Quotation Modal */}
      {inquiryModalOpen && (
        <InquiryForm
          isModal={true}
          initialProduct={inquiryProduct}
          onClose={handleCloseInquiry}
        />
      )}

      {/* Vercel Web Analytics */}
      <Analytics />
    </div>
  );
}
