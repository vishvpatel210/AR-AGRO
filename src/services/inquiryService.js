/**
 * B2B Export Inquiry Service
 * 
 * Handles client-side validation and dispatches RFQ payloads to the backend API.
 * Keeps SMTP credentials and private keys strictly on the server.
 */

// Target API endpoint (uses Vite proxy /api/send-inquiry by default)
const API_URL = import.meta.env.VITE_INQUIRY_API_URL || '/api/send-inquiry';

/**
 * Validates RFQ Form Fields
 * @param {object} data
 * @returns {object} { isValid: boolean, errors: Record<string, string> }
 */
export function validateInquiryForm(data) {
  const errors = {};

  // Full Name
  if (!data.fullName || !data.fullName.trim()) {
    errors.fullName = 'Full name is required.';
  } else if (data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter a valid full name (at least 2 characters).';
  }

  // Company Name
  if (!data.companyName || !data.companyName.trim()) {
    errors.companyName = 'Company / Organization name is required.';
  } else if (data.companyName.trim().length < 2) {
    errors.companyName = 'Please enter a valid company name.';
  }

  // Business Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !data.email.trim()) {
    errors.email = 'Business email is required.';
  } else if (!emailRegex.test(data.email.trim())) {
    errors.email = 'Please provide a valid business email address.';
  }

  // Phone / WhatsApp Number
  const phoneRegex = /^[\d\s+\-()]{7,20}$/;
  if (!data.phone || !data.phone.trim()) {
    errors.phone = 'Phone or WhatsApp number with country code is required.';
  } else if (!phoneRegex.test(data.phone.trim())) {
    errors.phone = 'Please provide a valid phone number with country code (e.g. +1 555 123 4567 or +91 98700 72960).';
  }

  // Country of Import
  if (!data.country || !data.country.trim()) {
    errors.country = 'Destination country of import is required.';
  }

  // Specific Product
  if (!data.selectedProduct || !data.selectedProduct.trim()) {
    errors.selectedProduct = 'Please select a specific spice or commodity.';
  }

  // Required Quantity
  if (!data.quantity || !String(data.quantity).trim()) {
    errors.quantity = 'Required quantity is required.';
  } else if (isNaN(Number(data.quantity)) || Number(data.quantity) <= 0) {
    errors.quantity = 'Please enter a valid numeric quantity greater than 0.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Checks backend health and SMTP configuration status
 * @returns {Promise<{ isOnline: boolean, smtpConfigured: boolean, data?: any }>}
 */
export async function checkServerStatus() {
  try {
    const res = await fetch('/api/health');
    if (!res.ok) return { isOnline: false, smtpConfigured: false };
    const data = await res.json();
    return {
      isOnline: true,
      smtpConfigured: Boolean(data.smtpConfigured),
      data
    };
  } catch (err) {
    return { isOnline: false, smtpConfigured: false };
  }
}

/**
 * Dispatches the inquiry payload to the backend server.
 * Returns genuine success or error — does NOT simulate delivery.
 * 
 * @param {object} inquiryPayload 
 * @returns {Promise<{ success: boolean, message: string, code?: string, data?: any }>}
 */
export async function submitInquiry(inquiryPayload) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        ...inquiryPayload,
        submittedAt: new Date().toISOString(),
        portalSource: window.location.hostname
      })
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok || !result.success) {
      return {
        success: false,
        code: result.code || `HTTP_${response.status}`,
        message: result.message || `Server responded with status ${response.status}`,
        data: result
      };
    }

    return {
      success: true,
      message: result.message || 'Quotation inquiry received successfully.',
      data: result
    };
  } catch (err) {
    return {
      success: false,
      code: 'NETWORK_ERROR',
      message: 'Unable to reach backend server. Please verify the server is running or contact us via WhatsApp.'
    };
  }
}
