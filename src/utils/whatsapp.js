/**
 * WhatsApp Helper Utilities for A.R. Agro Spices
 * Official B2B Export Hotline: +91 98700 72960
 */

export const WHATSAPP_NUMBER = '919870072960';
export const WHATSAPP_BASE_URL = 'https://wa.me/' + WHATSAPP_NUMBER;

export const DEFAULT_WHATSAPP_MESSAGE = 
  'Hello A.R. Agro Spices, I am interested in your products. Please share product details, available packaging options, and quotation information.';

/**
 * Builds a direct WhatsApp URL with safely encoded message
 * @param {string} message 
 * @returns {string} Encoded WhatsApp URL
 */
export function getWhatsAppUrl(message = DEFAULT_WHATSAPP_MESSAGE) {
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message.trim())}`;
}

/**
 * Builds a product-specific WhatsApp inquiry message
 * Format: "Hello A.R. Agro Spices, I am interested in [PRODUCT NAME] ([COMMON NAME]). Please share the available grades, packaging options, minimum order quantity, and quotation."
 * @param {object|string} product
 * @returns {string} Encoded WhatsApp URL
 */
export function getProductWhatsAppUrl(product) {
  let displayName = '';
  if (typeof product === 'string') {
    displayName = product;
  } else if (product && product.name) {
    if (product.commonName) {
      // Extract primary common name (e.g. "Jeera" from "Jeera / જીરું")
      const primeCommon = product.commonName.split('/')[0].trim();
      displayName = `${product.name} (${primeCommon})`;
    } else {
      displayName = product.name;
    }
  } else {
    displayName = 'Indian Spices';
  }

  const message = `Hello A.R. Agro Spices, I am interested in ${displayName}. Please share your available grades, specifications, minimum order quantity, and quotation.`;
  return getWhatsAppUrl(message);
}

/**
 * Builds a formatted WhatsApp message from RFQ form data
 * @param {object} formData
 * @returns {string} Encoded WhatsApp URL
 */
export function getFormWhatsAppUrl(formData) {
  const lines = [
    `*EXPORT RFQ INQUIRY - A.R. AGRO SPICES*`,
    `----------------------------------------`,
    `*Commodity:* ${formData.selectedProduct || 'Spices / Agro Commodity'}`,
    formData.grade ? `*Grade:* ${formData.grade}` : null,
    `*Quantity:* ${formData.quantity || ''} ${formData.unit || ''}`,
    `*Packaging:* ${formData.packaging || 'Standard Export Packing'}`,
    formData.destinationPort ? `*Discharge Port:* ${formData.destinationPort}` : null,
    `----------------------------------------`,
    `*Buyer Name:* ${formData.fullName}`,
    `*Company:* ${formData.companyName}`,
    `*Country:* ${formData.country}`,
    `*Email:* ${formData.email}`,
    `*Phone:* ${formData.phone}`,
    formData.requestSample ? `*Sample Request:* Yes, 500g physical lab sample required` : null,
    formData.message ? `*Additional Notes:* ${formData.message}` : null,
    `----------------------------------------`,
    `Sent via ar-agro-spices.com export portal`
  ].filter(Boolean);

  return getWhatsAppUrl(lines.join('\n'));
}
