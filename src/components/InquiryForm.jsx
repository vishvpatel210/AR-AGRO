import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  Phone, 
  Mail, 
  MapPin, 
  Building, 
  Globe, 
  X, 
  AlertCircle, 
  ExternalLink,
  MessageCircle,
  Copy,
  Check,
  Loader2,
  RefreshCw,
  Facebook,
  Instagram,
  Linkedin,
  Share2
} from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { getFormWhatsAppUrl, WHATSAPP_NUMBER } from '../utils/whatsapp';
import { validateInquiryForm, submitInquiry } from '../services/inquiryService';

export default function InquiryForm({ initialProduct = null, isModal = false, onClose = null }) {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    country: '',
    destinationPort: '',
    category: 'all',
    selectedProduct: initialProduct ? initialProduct.name : 'Cumin Seeds (Jeera)',
    grade: 'Sortex Clean (99.5% - 99.8%)',
    quantity: '14',
    unit: 'Metric Tonnes (MT)',
    packaging: '25 kg PP Bags with Poly-liner',
    requestSample: false,
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null); // null | { backendConfigured: boolean, success: boolean, message: string }
  const [copied, setCopied] = useState(false);

  // Sync initialProduct if passed or changed
  useEffect(() => {
    if (initialProduct) {
      setFormData((prev) => ({
        ...prev,
        category: initialProduct.category || 'all',
        selectedProduct: initialProduct.name,
        grade: initialProduct.grades && initialProduct.grades.length > 0 ? initialProduct.grades[0].name : prev.grade
      }));
    }
  }, [initialProduct]);

  // Filter products by selected category
  const availableProducts = PRODUCTS.filter((p) => {
    if (!formData.category || formData.category === 'all') return true;
    return p.category === formData.category;
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      // If category changes and currently selected product is not in that category, pick first from new category
      ...(field === 'category' && value !== 'all' ? {
        selectedProduct: PRODUCTS.find((p) => p.category === value)?.name || prev.selectedProduct
      } : {})
    }));

    // Clear field-specific error when user updates the field
    if (errors[field]) {
      setErrors((prev) => {
        const newErr = { ...prev };
        delete newErr[field];
        return newErr;
      });
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const validation = validateInquiryForm(formData);
    if (validation.errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: validation.errors[field] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent accidental duplicate submissions

    const validation = validateInquiryForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      // Mark all fields as touched
      const allTouched = Object.keys(formData).reduce((acc, k) => ({ ...acc, [k]: true }), {});
      setTouched(allTouched);
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    setSubmissionStatus(null);

    try {
      const response = await submitInquiry(formData);
      setSubmissionStatus(response);
    } catch (err) {
      setSubmissionStatus({
        success: false,
        code: 'CLIENT_ERROR',
        message: err.message || 'Submission error. Please connect via WhatsApp or direct email.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFormData({
      fullName: '',
      companyName: '',
      email: '',
      phone: '',
      country: '',
      destinationPort: '',
      category: 'all',
      selectedProduct: initialProduct ? initialProduct.name : 'Cumin Seeds (Jeera)',
      grade: 'Sortex Clean (99.5% - 99.8%)',
      quantity: '14',
      unit: 'Metric Tonnes (MT)',
      packaging: '25 kg PP Bags with Poly-liner',
      requestSample: false,
      message: ''
    });
    setErrors({});
    setTouched({});
    setSubmissionStatus(null);
  };

  const handleCopyRFQ = () => {
    const text = `A.R. AGRO SPICES - EXPORT RFQ\nCommodity: ${formData.selectedProduct}\nQuantity: ${formData.quantity} ${formData.unit}\nPackaging: ${formData.packaging}\nPort: ${formData.destinationPort || 'FOB Mundra'}\nBuyer: ${formData.fullName} (${formData.companyName}, ${formData.country})\nContact: ${formData.email} / ${formData.phone}\nNotes: ${formData.message || 'None'}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const whatsappDirectUrl = getFormWhatsAppUrl(formData);

  const formContent = (
    <div className="bg-warm-card rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-10 border border-forest/15 shadow-elevated relative">
      {/* Modal Close Button */}
      {isModal && onClose && (
        <button
          onClick={onClose}
          aria-label="Close RFQ modal"
          className="absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 rounded-full bg-sage/60 hover:bg-sage text-forest-dark flex items-center justify-center transition-colors focus:ring-2 focus:ring-forest"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Header */}
      <div className="mb-6 sm:mb-8 pr-8 sm:pr-0">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest/10 text-forest text-xs font-semibold mb-2">
          <FileText className="w-3.5 h-3.5 text-lime" />
          <span>B2B Export Quotation (RFQ)</span>
        </div>
        <h3 className="text-xl sm:text-3xl font-extrabold text-forest-dark font-heading leading-tight">
          Request an Export Quotation & Specs
        </h3>
        <p className="text-xs sm:text-sm text-ink-muted mt-1">
          Inquiries are delivered directly to <strong className="text-forest">export@aragrospices.com</strong>. Receive FOB Mundra / CIF destination pricing and Certificate of Analysis (COA).
        </p>
      </div>

      <AnimatePresence mode="wait">
        {submissionStatus && submissionStatus.success ? (
          // Verified Real Delivery Success State
          <motion.div
            key="success-state"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="p-6 sm:p-8 rounded-2xl bg-sage/30 border border-forest/20 text-ink-dark space-y-6"
          >
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-forest/15 text-forest flex items-center justify-center mx-auto shadow-sm ring-8 ring-forest/5">
                <CheckCircle2 className="w-9 h-9 text-forest" />
              </div>
              <h4 className="text-2xl font-bold text-forest-dark font-heading">
                Export Quotation Request Delivered
              </h4>
              <p className="text-xs sm:text-sm text-ink-muted max-w-lg mx-auto leading-relaxed">
                Your RFQ has been successfully sent to <strong className="text-forest-dark font-semibold">export@aragrospices.com</strong>. Our international trade desk in Unjha will review your requirements and respond within 6 business hours.
              </p>
            </div>

            {/* RFQ Summary Preview */}
            <div className="p-4 sm:p-5 rounded-xl bg-warm-white border border-forest/15 space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-forest/10 pb-2">
                <span className="text-[11px] font-bold text-forest uppercase tracking-wider">
                  Submitted Inquiry Details
                </span>
                <span className="text-[11px] text-ink-muted">
                  Recipient: export@aragrospices.com
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-ink-dark">
                <div><span className="text-ink-muted font-medium">Commodity:</span> <strong>{formData.selectedProduct}</strong></div>
                <div><span className="text-ink-muted font-medium">Quantity:</span> <strong>{formData.quantity} {formData.unit}</strong></div>
                <div><span className="text-ink-muted font-medium">Packaging:</span> <strong>{formData.packaging}</strong></div>
                <div><span className="text-ink-muted font-medium">Destination:</span> <strong>{formData.country} {formData.destinationPort ? `(${formData.destinationPort})` : ''}</strong></div>
                <div><span className="text-ink-muted font-medium">Buyer:</span> <strong>{formData.fullName}</strong> ({formData.companyName})</div>
                <div><span className="text-ink-muted font-medium">Direct Contact:</span> <strong>{formData.email}</strong></div>
              </div>
            </div>

            {/* Actions: Submit another or instant WhatsApp */}
            <div className="space-y-3 pt-2">
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm shadow-medium flex items-center justify-center gap-2 transition-colors min-h-[44px]"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Instant Follow-Up via WhatsApp (+91 98700 72960)</span>
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCopyRFQ}
                  className="flex-1 py-2.5 px-3 rounded-xl border border-forest/20 text-xs font-semibold text-forest-dark hover:bg-sage/40 transition-colors flex items-center justify-center gap-1.5 min-h-[44px]"
                >
                  {copied ? <Check className="w-4 h-4 text-forest" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy RFQ Summary'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetForm}
                  className="px-4 py-2.5 rounded-xl bg-forest hover:bg-forest-dark text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 min-h-[44px]"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Submit Another Quote</span>
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
            {/* Useful Error Banner when Submission Fails */}
            {submissionStatus && !submissionStatus.success && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl border border-red-300 bg-red-50/80 text-red-900 text-xs space-y-2 relative"
                role="alert"
              >
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h5 className="font-bold text-sm text-red-900 font-heading">
                      {submissionStatus.code === 'SMTP_NOT_CONFIGURED'
                        ? 'Email Service Setup Required'
                        : 'Unable to Send Quotation Request'}
                    </h5>
                    <p className="mt-1 leading-relaxed text-red-800">
                      {submissionStatus.message}
                    </p>
                    {submissionStatus.code === 'SMTP_NOT_CONFIGURED' && (
                      <div className="mt-2.5 p-2.5 bg-white/90 rounded-lg border border-red-200 text-[11px] text-ink-dark space-y-1">
                        <div className="font-semibold text-forest-dark">To enable live email delivery to export@aragrospices.com:</div>
                        <div>Configure your SMTP credentials in the project's <code className="bg-sage/40 px-1 py-0.5 rounded font-mono">.env</code> file:</div>
                        <code className="block bg-slate-900 text-emerald-400 p-2 rounded text-[10px] font-mono whitespace-pre overflow-x-auto">
SMTP_HOST=smtp.gmail.com (or your mail server)&#10;SMTP_PORT=587&#10;SMTP_USER=your_user&#10;SMTP_PASS=your_password
                        </code>
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => setSubmissionStatus(null)}
                    aria-label="Dismiss error"
                    className="text-red-500 hover:text-red-800 p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
            
            {/* Contact Person & Company Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="fullName" className="block text-xs font-semibold text-ink-dark mb-1">
                  Full Name <span className="text-red-600">*</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  placeholder="e.g. David Miller"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  onBlur={() => handleBlur('fullName')}
                  aria-invalid={errors.fullName ? 'true' : 'false'}
                  aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                  className={`w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border ${
                    errors.fullName ? 'border-red-500 bg-red-50/20' : 'border-forest/20 bg-warm-white'
                  } text-xs sm:text-sm text-ink-dark focus:border-forest focus:outline-none`}
                />
                {errors.fullName && touched.fullName && (
                  <p id="fullName-error" role="alert" className="text-red-600 text-[11px] mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="companyName" className="block text-xs font-semibold text-ink-dark mb-1">
                  Company Name <span className="text-red-600">*</span>
                </label>
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  required
                  placeholder="e.g. Apex Global Foods LLC"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  onBlur={() => handleBlur('companyName')}
                  aria-invalid={errors.companyName ? 'true' : 'false'}
                  aria-describedby={errors.companyName ? 'companyName-error' : undefined}
                  className={`w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border ${
                    errors.companyName ? 'border-red-500 bg-red-50/20' : 'border-forest/20 bg-warm-white'
                  } text-xs sm:text-sm text-ink-dark focus:border-forest focus:outline-none`}
                />
                {errors.companyName && touched.companyName && (
                  <p id="companyName-error" role="alert" className="text-red-600 text-[11px] mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.companyName}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Business Email & Phone / WhatsApp Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-ink-dark mb-1">
                  Business Email <span className="text-red-600">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="procurement@company.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={`w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border ${
                    errors.email ? 'border-red-500 bg-red-50/20' : 'border-forest/20 bg-warm-white'
                  } text-xs sm:text-sm text-ink-dark focus:border-forest focus:outline-none`}
                />
                {errors.email && touched.email && (
                  <p id="email-error" role="alert" className="text-red-600 text-[11px] mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-xs font-semibold text-ink-dark mb-1">
                  Phone / WhatsApp Number (with Country Code) <span className="text-red-600">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="+1 (555) 019-2834"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  onBlur={() => handleBlur('phone')}
                  aria-invalid={errors.phone ? 'true' : 'false'}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                  className={`w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border ${
                    errors.phone ? 'border-red-500 bg-red-50/20' : 'border-forest/20 bg-warm-white'
                  } text-xs sm:text-sm text-ink-dark focus:border-forest focus:outline-none`}
                />
                {errors.phone && touched.phone && (
                  <p id="phone-error" role="alert" className="text-red-600 text-[11px] mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Country & Destination Discharge Port */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="country" className="block text-xs font-semibold text-ink-dark mb-1">
                  Country of Import <span className="text-red-600">*</span>
                </label>
                <input
                  id="country"
                  name="country"
                  type="text"
                  required
                  placeholder="e.g. United States, Germany, UAE, UK"
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  onBlur={() => handleBlur('country')}
                  aria-invalid={errors.country ? 'true' : 'false'}
                  aria-describedby={errors.country ? 'country-error' : undefined}
                  className={`w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border ${
                    errors.country ? 'border-red-500 bg-red-50/20' : 'border-forest/20 bg-warm-white'
                  } text-xs sm:text-sm text-ink-dark focus:border-forest focus:outline-none`}
                />
                {errors.country && touched.country && (
                  <p id="country-error" role="alert" className="text-red-600 text-[11px] mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.country}</span>
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="destinationPort" className="block text-xs font-semibold text-ink-dark mb-1">
                  Destination Discharge Port (for CIF Quotes)
                </label>
                <input
                  id="destinationPort"
                  name="destinationPort"
                  type="text"
                  placeholder="e.g. Rotterdam, Jebel Ali, New York, Hamburg"
                  value={formData.destinationPort}
                  onChange={(e) => handleInputChange('destinationPort', e.target.value)}
                  className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-forest/20 bg-warm-white text-xs sm:text-sm text-ink-dark focus:border-forest focus:outline-none"
                />
              </div>
            </div>

            {/* Product Category & Specific Product Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="block text-xs font-semibold text-ink-dark mb-1">
                  Product Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-3 py-2.5 min-h-[44px] rounded-xl border border-forest/20 bg-warm-white text-xs sm:text-sm text-ink-dark focus:border-forest focus:outline-none cursor-pointer"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="selectedProduct" className="block text-xs font-semibold text-ink-dark mb-1">
                  Specific Product <span className="text-red-600">*</span>
                </label>
                <select
                  id="selectedProduct"
                  name="selectedProduct"
                  required
                  value={formData.selectedProduct}
                  onChange={(e) => handleInputChange('selectedProduct', e.target.value)}
                  className="w-full px-3 py-2.5 min-h-[44px] rounded-xl border border-forest/20 bg-warm-white text-xs sm:text-sm text-ink-dark focus:border-forest focus:outline-none cursor-pointer"
                >
                  {availableProducts.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                  <option value="Mixed Spices FCL Container">Mixed Spices (Multi-Commodity FCL)</option>
                  <option value="Other Agricultural Product">Other Agro Commodity (Specify Below)</option>
                </select>
              </div>
            </div>

            {/* Quantity with Unit & Packaging Requirements */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="quantity" className="block text-xs font-semibold text-ink-dark mb-1">
                  Required Quantity & Unit <span className="text-red-600">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    id="quantity"
                    name="quantity"
                    type="text"
                    required
                    placeholder="e.g. 14"
                    value={formData.quantity}
                    onChange={(e) => handleInputChange('quantity', e.target.value)}
                    onBlur={() => handleBlur('quantity')}
                    aria-invalid={errors.quantity ? 'true' : 'false'}
                    aria-describedby={errors.quantity ? 'quantity-error' : undefined}
                    className={`w-1/2 px-3.5 py-2.5 min-h-[44px] rounded-xl border ${
                      errors.quantity ? 'border-red-500 bg-red-50/20' : 'border-forest/20 bg-warm-white'
                    } text-xs sm:text-sm text-ink-dark focus:border-forest focus:outline-none`}
                  />
                  <select
                    id="unit"
                    name="unit"
                    value={formData.unit}
                    onChange={(e) => handleInputChange('unit', e.target.value)}
                    className="w-1/2 px-2.5 py-2.5 min-h-[44px] rounded-xl border border-forest/20 bg-warm-white text-xs sm:text-sm text-ink-dark focus:border-forest focus:outline-none cursor-pointer"
                  >
                    <option value="Metric Tonnes (MT)">Metric Tonnes (MT)</option>
                    <option value="1x 20ft FCL (~13-14 MT)">1x 20ft FCL</option>
                    <option value="1x 40ft FCL (~26-27 MT)">1x 40ft FCL</option>
                    <option value="Kilograms (KG)">Kilograms (KG)</option>
                  </select>
                </div>
                {errors.quantity && touched.quantity && (
                  <p id="quantity-error" role="alert" className="text-red-600 text-[11px] mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.quantity}</span>
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="packaging" className="block text-xs font-semibold text-ink-dark mb-1">
                  Packaging Requirements
                </label>
                <select
                  id="packaging"
                  name="packaging"
                  value={formData.packaging}
                  onChange={(e) => handleInputChange('packaging', e.target.value)}
                  className="w-full px-3 py-2.5 min-h-[44px] rounded-xl border border-forest/20 bg-warm-white text-xs sm:text-sm text-ink-dark focus:border-forest focus:outline-none cursor-pointer"
                >
                  <option value="25 kg PP Bags with Poly-liner">25 kg PP Bags with Poly-liner</option>
                  <option value="50 kg PP Woven Bags">50 kg PP Woven Bags</option>
                  <option value="25 kg Multi-Wall Craft Paper Sacks">25 kg Multi-Wall Craft Paper Sacks</option>
                  <option value="Burlap Jute Bags with Liner">Burlap Jute Bags with Poly-liner</option>
                  <option value="Vacuum Pouches (500g / 1kg / 5kg)">Vacuum Sealed Pouches (Retail/Foodservice)</option>
                  <option value="Custom Private Label Packing">Custom Buyer Private Label Packing</option>
                </select>
              </div>
            </div>

            {/* Additional Message */}
            <div>
              <label htmlFor="message" className="block text-xs font-semibold text-ink-dark mb-1">
                Additional Specifications & Quality Requirements
              </label>
              <textarea
                id="message"
                name="message"
                rows="3"
                placeholder="Mention specific purity (e.g. 99.8% Sortex), moisture limit, ASTA color value, volatile oil %, third-party lab inspection (SGS, Geo-Chem), or target delivery timeline..."
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-forest/20 bg-warm-white text-xs sm:text-sm text-ink-dark placeholder-ink-muted focus:border-forest focus:outline-none"
              ></textarea>
            </div>

            {/* Physical Sample Checkbox */}
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-sage/40 border border-forest/10">
              <input
                type="checkbox"
                id="requestSample"
                name="requestSample"
                checked={formData.requestSample}
                onChange={(e) => handleInputChange('requestSample', e.target.checked)}
                className="w-4 h-4 text-forest rounded border-forest/30 focus:ring-forest cursor-pointer"
              />
              <label htmlFor="requestSample" className="text-xs text-ink-dark font-medium cursor-pointer">
                <strong>Request 500g Lab Testing Sample:</strong> Dispatch pre-shipment testing batch via international courier (DHL/FedEx).
              </label>
            </div>

            {/* Clear Privacy Notice */}
            <div className="text-[11px] text-ink-muted leading-relaxed flex items-start gap-1.5 p-2.5 rounded-lg bg-warm-white border border-forest/10">
              <ShieldCheck className="w-4 h-4 text-forest shrink-0 mt-0.5" />
              <span>
                <strong>Privacy Notice:</strong> All company and buyer information is kept strictly confidential under standard international B2B trade non-disclosure terms. We will never share your details or send unsolicited marketing.
              </span>
            </div>

            {/* Dual Actions: Submit Form & WhatsApp Direct Fallback */}
            <div className="pt-2 space-y-2.5">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-xl bg-forest hover:bg-forest-dark text-warm-white text-sm font-bold shadow-medium hover:shadow-elevated transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 min-h-[44px]"
                id="inquiry-submit-btn"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-lime" />
                    <span>Sending RFQ to export@aragrospices.com...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-lime" />
                    <span>Submit Export RFQ (Guaranteed Response in 6 Hours)</span>
                  </>
                )}
              </motion.button>

              {/* Direct WhatsApp Instant Action */}
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] font-bold text-xs sm:text-sm border border-[#25D366]/30 flex items-center justify-center gap-2 transition-colors min-h-[44px]"
                id="inquiry-whatsapp-direct-btn"
              >
                <MessageCircle className="w-4 h-4 fill-current text-[#25D366]" />
                <span>Or Enquire Directly on WhatsApp (+91 98700 72960)</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#128C7E]/70" />
              </a>
            </div>

            <div className="flex items-center justify-center gap-4 text-[11px] text-ink-muted pt-1">
              <span>Direct APMC Exporter</span>
              <span>•</span>
              <span>No Broker Markup</span>
              <span>•</span>
              <span>One Star Export House</span>
            </div>

          </form>
        )}
      </AnimatePresence>
    </div>
  );

  if (isModal) {
    return (
      <div 
        className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
        onClick={onClose}
      >
        <div 
          onClick={(e) => e.stopPropagation()} 
          className="max-w-2xl w-full my-auto max-h-[96vh] sm:max-h-[95vh] overflow-y-auto"
        >
          {formContent}
        </div>
      </div>
    );
  }

  return (
    <section id="contact" className="py-20 bg-warm-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Corporate Contacts */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest/10 text-forest text-xs font-semibold mb-3">
                <Building className="w-3.5 h-3.5 text-lime" />
                <span>Global Export Headquarters</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-forest-dark font-heading tracking-tight mb-4">
                Partner with India’s Premier Spice Exporter
              </h2>
              <p className="text-sm text-ink-muted leading-relaxed">
                Whether you are an international food manufacturer, spice packager, restaurant distributor, or extraction facility, our direct sourcing and transparent pricing deliver guaranteed consistency.
              </p>
            </div>

            {/* Direct Cards */}
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-sage/40 border border-forest/15 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-forest/10 text-forest flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-forest uppercase tracking-wider">
                    Unjha Corporate & Processing
                  </h4>
                  <p className="text-xs text-ink-dark/90 font-medium mt-0.5">
                    216, APMC Building, Market Yard, Unjha – 384170, Gujarat, India
                  </p>
                  <p className="text-[11px] text-ink-muted mt-0.5">
                    Asia’s Largest Spice Terminal
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-sage/40 border border-forest/15 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#25D366]/15 text-[#128C7E] flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-forest uppercase tracking-wider">
                    WhatsApp Export Hotline
                  </h4>
                  <a 
                    href={getFormWhatsAppUrl(formData)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-forest-dark hover:text-forest transition-colors block mt-0.5"
                  >
                    +91 98700 72960
                  </a>
                  <p className="text-[11px] text-ink-muted">
                    Instant RFQ & Trade Specs (24/7 International Support)
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-sage/40 border border-forest/15 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-forest/10 text-forest flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-forest uppercase tracking-wider">
                    Direct Email Enquiries
                  </h4>
                  <a href="mailto:info@aragrospices.com" className="text-sm font-bold text-forest-dark hover:text-forest transition-colors block mt-0.5">
                    info@aragrospices.com
                  </a>
                  <p className="text-[11px] text-ink-muted">
                    export@aragrospices.com
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-sage/40 border border-forest/15 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-forest/10 text-forest flex items-center justify-center shrink-0">
                  <Share2 className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-forest uppercase tracking-wider">
                    Official Social Channels
                  </h4>
                  <p className="text-[11px] text-ink-muted mt-0.5 mb-2.5">
                    Connect with us for regular crop arrival & export updates
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href="https://www.linkedin.com/company/a-r-agro-spices13/"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="LinkedIn"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-forest/20 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-all text-xs font-semibold shadow-xs"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                      <span>LinkedIn</span>
                    </a>
                    <a
                      href="https://www.instagram.com/a.r.agrospices?igsh=ajg2bGwxZTAxcjU2"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Instagram"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-forest/20 text-[#E4405F] hover:bg-[#E4405F] hover:text-white transition-all text-xs font-semibold shadow-xs"
                    >
                      <Instagram className="w-3.5 h-3.5" />
                      <span>Instagram</span>
                    </a>
                    <a
                      href="https://www.facebook.com/profile.php?id=61592786966701"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Facebook"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-forest/20 text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-all text-xs font-semibold shadow-xs"
                    >
                      <Facebook className="w-3.5 h-3.5" />
                      <span>Facebook</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Star Export House Badge */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-forest to-forest-dark text-warm-white shadow-soft">
              <div className="flex items-center gap-2 text-lime font-bold text-xs uppercase tracking-wider mb-1">
                <ShieldCheck className="w-4 h-4 text-lime" />
                <span>Government of India Recognized</span>
              </div>
              <p className="text-sm font-bold font-heading">
                One Star Export House Status
              </p>
              <p className="text-xs text-warm-white/80 mt-1">
                Spices Board of India Certificate #SB/EXP/2018 • APEDA Reg. #198421
              </p>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7">
            {formContent}
          </div>

        </div>
      </div>
    </section>
  );
}
