import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from .env file in root directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Hardcoded default recipient for export inquiries (security: never client-controlled)
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'export@aragrospices.com';

// Middleware
app.use(cors());
app.use(express.json({ limit: '1mb' }));

/**
 * Helper to build the Nodemailer transporter using environment variables.
 * Returns null if essential SMTP settings are missing.
 */
function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
    tls: {
      // Do not fail on invalid certs if self-hosted or cPanel
      rejectUnauthorized: process.env.SMTP_REJECT_UNAUTHORIZED !== 'false',
    },
  });
}

/**
 * Health check & configuration status endpoint
 */
app.get('/api/health', (req, res) => {
  const isConfigured = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
  res.json({
    status: 'online',
    recipientEmail: RECIPIENT_EMAIL,
    smtpConfigured: isConfigured,
    smtpHost: process.env.SMTP_HOST || 'not configured',
    port: PORT,
  });
});

/**
 * Primary RFQ Quotation Submission Endpoint
 * POST /api/send-inquiry
 */
app.post('/api/send-inquiry', async (req, res) => {
  try {
    const {
      fullName,
      companyName,
      email,
      phone,
      country,
      destinationPort,
      category,
      selectedProduct,
      grade,
      quantity,
      unit,
      packaging,
      requestSample,
      message,
    } = req.body;

    // 1. Backend Validation of all required fields
    const missingFields = [];
    if (!fullName || !fullName.trim()) missingFields.push('Full Name');
    if (!companyName || !companyName.trim()) missingFields.push('Company Name');
    if (!email || !email.trim()) missingFields.push('Business Email');
    if (!phone || !phone.trim()) missingFields.push('Phone / WhatsApp Number');
    if (!country || !country.trim()) missingFields.push('Country of Import');
    if (!selectedProduct || !selectedProduct.trim()) missingFields.push('Specific Product');
    if (!quantity || !String(quantity).trim()) missingFields.push('Required Quantity');

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        code: 'VALIDATION_FAILED',
        message: `Missing required field(s): ${missingFields.join(', ')}`,
      });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        code: 'INVALID_EMAIL',
        message: 'Please provide a valid business email address.',
      });
    }

    // 2. Check SMTP Configuration
    const transporter = createTransporter();
    if (!transporter) {
      return res.status(503).json({
        success: false,
        code: 'SMTP_NOT_CONFIGURED',
        message:
          'Backend email service is not yet configured. Please configure SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS in the .env file.',
        recipient: RECIPIENT_EMAIL,
      });
    }

    // 3. Format Subject exactly as required:
    // "New Export Quotation Request – [Company Name] – [Product Name]"
    const cleanCompany = companyName.trim();
    const cleanProduct = selectedProduct.trim();
    const subject = `New Export Quotation Request – ${cleanCompany} – ${cleanProduct}`;

    // 4. Construct Clean Plain-Text Version
    const plainText = `
============================================================
NEW EXPORT QUOTATION REQUEST (RFQ) - A.R. AGRO SPICES
============================================================

A prospective international buyer has submitted a quotation inquiry via the website export portal.

1. BUYER & CORPORATE INFORMATION
------------------------------------------------------------
Full Name:           ${fullName.trim()}
Company Name:        ${companyName.trim()}
Business Email:      ${email.trim()}
Phone / WhatsApp:    ${phone.trim()}
Country of Import:   ${country.trim()}
Destination Port:    ${destinationPort?.trim() || 'Not specified (FOB Mundra requested)'}

2. PRODUCT & SHIPMENT SPECIFICATIONS
------------------------------------------------------------
Product Category:    ${category || 'General Spices'}
Specific Product:    ${cleanProduct}
Grade / Quality:     ${grade || 'Standard Export Quality'}
Required Quantity:   ${quantity} ${unit || 'Metric Tonnes (MT)'}
Packaging:           ${packaging || 'Standard Export PP Bags'}
500g Sample Req.:    ${requestSample ? 'YES - Dispatch 500g lab sample' : 'No'}

3. ADDITIONAL SPECIFICATIONS & QUALITY REQUIREMENTS
------------------------------------------------------------
${message?.trim() || 'None provided'}

------------------------------------------------------------
Submitted At:        ${new Date().toUTCString()}
Recipient Mailbox:   ${RECIPIENT_EMAIL}
Reply-To:            ${email.trim()}
============================================================
`.trim();

    // 5. Construct Premium Responsive HTML Email
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f6f3;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #1e293b;
      line-height: 1.5;
    }
    .wrapper {
      max-width: 640px;
      margin: 24px auto;
      background: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid #d9e2d5;
      box-shadow: 0 4px 16px rgba(0,0,0,0.06);
    }
    .header {
      background: linear-gradient(135deg, #1b3826 0%, #2b5439 100%);
      color: #ffffff;
      padding: 28px 32px;
    }
    .badge {
      display: inline-block;
      background: rgba(163, 230, 53, 0.2);
      color: #a3e635;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 4px 10px;
      border-radius: 999px;
      margin-bottom: 8px;
    }
    .header h1 {
      margin: 0;
      font-size: 22px;
      font-weight: 800;
      line-height: 1.3;
      color: #ffffff;
    }
    .header p {
      margin: 6px 0 0;
      font-size: 13px;
      color: #d1fae5;
    }
    .body {
      padding: 28px 32px;
    }
    .section-title {
      font-size: 12px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #1b3826;
      border-bottom: 2px solid #e2ece0;
      padding-bottom: 6px;
      margin-top: 24px;
      margin-bottom: 12px;
    }
    .section-title:first-child {
      margin-top: 0;
    }
    table.data-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 16px;
    }
    table.data-table td {
      padding: 10px 12px;
      font-size: 13px;
      vertical-align: top;
      border-bottom: 1px solid #f1f5f0;
    }
    table.data-table td.label {
      width: 36%;
      font-weight: 600;
      color: #64748b;
    }
    table.data-table td.val {
      width: 64%;
      font-weight: 600;
      color: #0f172a;
    }
    .highlight-val {
      color: #1b3826;
      font-weight: 700;
    }
    .notes-box {
      background: #f8faf7;
      border: 1px solid #e2ece0;
      border-radius: 8px;
      padding: 14px 16px;
      font-size: 13px;
      color: #334155;
      white-space: pre-wrap;
      margin-bottom: 20px;
    }
    .action-row {
      margin: 24px 0 8px;
      text-align: center;
    }
    .btn {
      display: inline-block;
      background: #1b3826;
      color: #ffffff !important;
      text-decoration: none;
      font-weight: 700;
      font-size: 13px;
      padding: 12px 24px;
      border-radius: 8px;
      margin: 4px;
    }
    .btn-secondary {
      background: #25D366;
    }
    .footer {
      background: #f1f5f0;
      padding: 20px 32px;
      font-size: 11px;
      color: #64748b;
      text-align: center;
      border-top: 1px solid #e2ece0;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <div class="badge">Official Website RFQ</div>
      <h1>${cleanProduct}</h1>
      <p>Inquiry received from <strong>${cleanCompany}</strong> (${country.trim()})</p>
    </div>

    <div class="body">
      <div class="section-title">1. Buyer & Corporate Information</div>
      <table class="data-table">
        <tr>
          <td class="label">Full Name:</td>
          <td class="val highlight-val">${fullName.trim()}</td>
        </tr>
        <tr>
          <td class="label">Company Name:</td>
          <td class="val">${cleanCompany}</td>
        </tr>
        <tr>
          <td class="label">Business Email:</td>
          <td class="val"><a href="mailto:${email.trim()}" style="color: #1b3826; text-decoration: underline;">${email.trim()}</a></td>
        </tr>
        <tr>
          <td class="label">Phone / WhatsApp:</td>
          <td class="val"><a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" style="color: #1b3826; text-decoration: underline;">${phone.trim()}</a></td>
        </tr>
        <tr>
          <td class="label">Country of Import:</td>
          <td class="val">${country.trim()}</td>
        </tr>
        <tr>
          <td class="label">Destination Discharge Port:</td>
          <td class="val">${destinationPort?.trim() || 'FOB Mundra (Port not specified)'}</td>
        </tr>
      </table>

      <div class="section-title">2. Product & Order Specifications</div>
      <table class="data-table">
        <tr>
          <td class="label">Product Category:</td>
          <td class="val">${category || 'Spices & Seeds'}</td>
        </tr>
        <tr>
          <td class="label">Specific Product:</td>
          <td class="val highlight-val" style="font-size: 14px; color: #1b3826;">${cleanProduct}</td>
        </tr>
        <tr>
          <td class="label">Purity / Grade:</td>
          <td class="val">${grade || 'Sortex Clean Standard'}</td>
        </tr>
        <tr>
          <td class="label">Required Quantity:</td>
          <td class="val highlight-val">${quantity} ${unit || 'Metric Tonnes (MT)'}</td>
        </tr>
        <tr>
          <td class="label">Packaging Requirements:</td>
          <td class="val">${packaging || 'Standard Export PP Bags'}</td>
        </tr>
        <tr>
          <td class="label">Physical Sample Request:</td>
          <td class="val" style="color: ${requestSample ? '#1b3826' : '#64748b'}; font-weight: ${requestSample ? '700' : '500'};">
            ${requestSample ? '✅ YES - 500g Pre-shipment Sample Requested' : 'No sample requested'}
          </td>
        </tr>
      </table>

      <div class="section-title">3. Additional Specifications & Quality Requirements</div>
      <div class="notes-box">${message?.trim() || 'No additional specifications specified by buyer.'}</div>

      <div class="action-row">
        <a href="mailto:${email.trim()}?subject=RE: Export Quotation - ${encodeURIComponent(cleanProduct)} - A.R. Agro Spices" class="btn">
          ✉️ Reply to Buyer via Email
        </a>
        <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${fullName.trim()}, thank you for your inquiry for ${cleanProduct} with A.R. Agro Spices.`)}" class="btn btn-secondary">
          💬 Chat on WhatsApp
        </a>
      </div>
    </div>

    <div class="footer">
      This inquiry was submitted from the A.R. Agro Spices website RFQ portal.<br>
      Delivered directly to: <strong>${RECIPIENT_EMAIL}</strong> &bull; Unjha, Gujarat, India.<br>
      Submission Timestamp: ${new Date().toISOString()}
    </div>
  </div>
</body>
</html>
`.trim();

    // 6. Send Email via Nodemailer
    const senderFrom = process.env.SMTP_FROM || `"A.R. Agro Spices RFQ" <${process.env.SMTP_USER}>`;

    const mailOptions = {
      from: senderFrom,
      to: RECIPIENT_EMAIL, // FIXED to export@aragrospices.com on backend
      replyTo: `${fullName.trim()} <${email.trim()}>`, // Replying goes straight to buyer
      subject,
      text: plainText,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log(`[RFQ SENT] Subject: "${subject}" to ${RECIPIENT_EMAIL} (messageId: ${info.messageId})`);

    return res.status(200).json({
      success: true,
      message: `Your export quotation request has been successfully dispatched to our export desk (${RECIPIENT_EMAIL}). Our international trade team will contact you within 6 business hours.`,
      messageId: info.messageId,
      accepted: info.accepted,
      recipient: RECIPIENT_EMAIL,
    });
  } catch (error) {
    console.error('[RFQ ERROR] Failed to send email:', error);
    return res.status(500).json({
      success: false,
      code: 'SEND_MAIL_FAILED',
      message: error.message || 'An error occurred while sending the quotation email. Please try again or reach out on WhatsApp.',
    });
  }
});

// Start Express server
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`A.R. Agro Spices Backend Server running on port ${PORT}`);
  console.log(`RFQ Recipient Target: ${RECIPIENT_EMAIL}`);
  const hasSmtp = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
  console.log(`SMTP Configured: ${hasSmtp ? 'YES (' + process.env.SMTP_HOST + ')' : 'NO - Awaiting credentials in .env'}`);
  console.log(`=======================================================`);
});
