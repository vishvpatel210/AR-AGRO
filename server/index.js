import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from .env file in root directory for local dev
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Configurable destination mailbox for export inquiries
export const getRecipientEmail = () => (process.env.RECIPIENT_EMAIL || 'export@aragrospices.com').trim();

// Middleware
app.use(cors());
app.use(express.json({ limit: '1mb' }));

/**
 * Parses and returns SMTP configuration from environment variables.
 * Defaults to secure Hostinger SMTP settings on port 465.
 */
export function getSmtpConfig() {
  const host = (process.env.SMTP_HOST || 'smtp.hostinger.com').trim();
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const secure = process.env.SMTP_SECURE !== undefined
    ? process.env.SMTP_SECURE === 'true'
    : port === 465;
  const user = (process.env.SMTP_USER || '').trim();
  const pass = process.env.SMTP_PASS || '';

  return { host, port, secure, user, pass };
}

/**
 * Builds the authorized RFC 5322 From header.
 * Hostinger requires the sender email to match the authenticated mailbox (SMTP_USER).
 */
export function getAuthorizedFromAddress(smtpUser) {
  const rawFrom = (process.env.SMTP_FROM || '').trim().replace(/^["']|["']$/g, '');
  if (rawFrom) {
    const match = rawFrom.match(/^(.*?)\s*<([^>]+)>$/);
    if (match) {
      const displayName = match[1].replace(/["']/g, '').trim() || 'A.R. Agro Spices Sales';
      return `"${displayName}" <${smtpUser}>`;
    }
  }
  return `"A.R. Agro Spices Sales" <${smtpUser}>`;
}

/**
 * Helper to build the Nodemailer transporter using environment variables.
 * Enforces strict TLS certificate verification and safe socket timeouts for serverless execution.
 */
export function createTransporter() {
  const { host, port, secure, user, pass } = getSmtpConfig();

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
      // Enforce strict TLS certificate validation
      rejectUnauthorized: true,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
}

/**
 * Base API discovery route (returns JSON instead of 404 Cannot GET /api)
 */
app.get('/api', (req, res) => {
  res.json({
    status: 'online',
    service: 'A.R. Agro Spices API Gateway',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: 'GET /api/health',
      sendInquiry: 'POST /api/send-inquiry',
    },
  });
});

/**
 * Health check & configuration status endpoint (safe: no passwords exposed)
 */
app.get('/api/health', (req, res) => {
  const { host, port, secure, user, pass } = getSmtpConfig();
  const isConfigured = Boolean(host && user && pass);

  res.json({
    status: 'online',
    recipientEmail: getRecipientEmail(),
    smtpConfigured: isConfigured,
    smtpHost: host,
    smtpPort: port,
    smtpSecure: secure,
    smtpSenderUser: user ? `${user.slice(0, 3)}***@${user.split('@')[1] || ''}` : 'not set',
    tlsValidation: 'enforced (rejectUnauthorized: true)',
  });
});

/**
 * Primary RFQ Quotation Submission Endpoint
 * POST /api/send-inquiry
 */
app.post('/api/send-inquiry', async (req, res) => {
  const reqId = `rfq_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
  const recipientEmail = getRecipientEmail();

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
    } = req.body || {};

    // 1. Strict validation of required quotation fields
    const missingFields = [];
    if (!fullName || !fullName.trim()) missingFields.push('Full Name');
    if (!companyName || !companyName.trim()) missingFields.push('Company Name');
    if (!email || !email.trim()) missingFields.push('Business Email');
    if (!phone || !phone.trim()) missingFields.push('Phone / WhatsApp Number');
    if (!country || !country.trim()) missingFields.push('Country of Import');
    if (!selectedProduct || !selectedProduct.trim()) missingFields.push('Specific Product');
    if (quantity === undefined || quantity === null || !String(quantity).trim()) missingFields.push('Required Quantity');

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        code: 'VALIDATION_FAILED',
        message: `Missing required field(s): ${missingFields.join(', ')}`,
        reqId,
      });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        code: 'INVALID_EMAIL',
        message: 'Please provide a valid business email address.',
        reqId,
      });
    }

    // 2. Validate SMTP Configuration
    const { user: smtpUser } = getSmtpConfig();
    const transporter = createTransporter();
    if (!transporter || !smtpUser) {
      console.error(`[RFQ_CONFIG_MISSING] reqId=${reqId} SMTP credentials not found in environment.`);
      return res.status(503).json({
        success: false,
        code: 'SMTP_NOT_CONFIGURED',
        message: 'Backend email gateway is not configured. Please ensure SMTP environment variables are set in Vercel.',
        reqId,
      });
    }

    // 3. Format Subject line
    const cleanCompany = companyName.trim();
    const cleanProduct = selectedProduct.trim();
    const subject = `New Export Quotation Request – ${cleanCompany} – ${cleanProduct}`;

    // Clean customer details for headers (prevent header injection)
    const cleanBuyerName = fullName.trim().replace(/[\r\n]/g, '');
    const cleanBuyerEmail = email.trim().replace(/[\r\n]/g, '');

    // 4. Construct Plain-Text Version
    const plainText = `
============================================================
NEW EXPORT QUOTATION REQUEST (RFQ) - A.R. AGRO SPICES
============================================================

A prospective international buyer has submitted a quotation inquiry via the website export portal.

1. BUYER & CORPORATE INFORMATION
------------------------------------------------------------
Full Name:           ${cleanBuyerName}
Company Name:        ${cleanCompany}
Business Email:      ${cleanBuyerEmail}
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
Tracking ID:         ${reqId}
Recipient Mailbox:   ${recipientEmail}
Reply-To:            ${cleanBuyerEmail}
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
    }
    .header p {
      margin: 6px 0 0;
      font-size: 13px;
      opacity: 0.85;
    }
    .content {
      padding: 28px 32px;
    }
    .section-title {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #55755e;
      margin-top: 24px;
      margin-bottom: 12px;
      padding-bottom: 6px;
      border-bottom: 2px solid #eef3ed;
    }
    .section-title:first-of-type {
      margin-top: 0;
    }
    .data-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 8px;
    }
    .data-table td {
      padding: 8px 0;
      vertical-align: top;
      font-size: 14px;
    }
    .data-table td.label {
      width: 38%;
      color: #64748b;
      font-weight: 500;
    }
    .data-table td.val {
      width: 62%;
      color: #0f172a;
      font-weight: 600;
    }
    .highlight-val {
      color: #1b3826 !important;
      font-weight: 700 !important;
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
      font-size: 12px;
      color: #64748b;
      text-align: center;
      line-height: 1.6;
      border-top: 1px solid #e2ece0;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <div class="badge">Export Trade Inquiry</div>
      <h1>New Export Quotation Request</h1>
      <p>Received via A.R. Agro Spices Official Export Portal &bull; Ref: ${reqId}</p>
    </div>

    <div class="content">
      <div class="section-title">1. Buyer & Corporate Profile</div>
      <table class="data-table">
        <tr>
          <td class="label">Full Name:</td>
          <td class="val highlight-val">${cleanBuyerName}</td>
        </tr>
        <tr>
          <td class="label">Company Name:</td>
          <td class="val">${cleanCompany}</td>
        </tr>
        <tr>
          <td class="label">Business Email:</td>
          <td class="val"><a href="mailto:${cleanBuyerEmail}" style="color: #1b3826; text-decoration: underline;">${cleanBuyerEmail}</a></td>
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
          <td class="val highlight-val" style="color: #1b3826;">${quantity} ${unit || 'Metric Tonnes (MT)'}</td>
        </tr>
        <tr>
          <td class="label">Packaging Choice:</td>
          <td class="val">${packaging || 'Standard Export PP Bags'}</td>
        </tr>
        <tr>
          <td class="label">500g Quality Sample:</td>
          <td class="val">${requestSample ? '✅ Sample Requested for Lab Evaluation' : '❌ Sample Not Required'}</td>
        </tr>
      </table>

      <div class="section-title">3. Buyer Notes & Special Requirements</div>
      <div class="notes-box">
${message?.trim() || 'No additional specifications mentioned.'}
      </div>

      <div class="action-row">
        <a href="mailto:${cleanBuyerEmail}?subject=${encodeURIComponent(`Re: Quotation for ${cleanProduct} - A.R. Agro Spices`)}" class="btn">
          ✉️ Reply to Buyer via Email
        </a>
        <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${cleanBuyerName}, thank you for your inquiry for ${cleanProduct} with A.R. Agro Spices.`)}" class="btn btn-secondary">
          💬 Chat on WhatsApp
        </a>
      </div>
    </div>

    <div class="footer">
      This inquiry was submitted from the A.R. Agro Spices website RFQ portal.<br>
      Delivered directly to: <strong>${recipientEmail}</strong> &bull; Unjha, Gujarat, India.<br>
      Submission Timestamp: ${new Date().toISOString()} &bull; ID: ${reqId}
    </div>
  </div>
</body>
</html>
`.trim();

    // 6. Build and dispatch mail with verified From address
    const fromAddress = getAuthorizedFromAddress(smtpUser);

    const mailOptions = {
      from: fromAddress,
      to: recipientEmail,
      replyTo: `"${cleanBuyerName}" <${cleanBuyerEmail}>`,
      subject,
      text: plainText,
      html: htmlContent,
      headers: {
        'X-Entity-Ref-ID': reqId,
        'X-Originating-IP': req.ip || '',
      },
    };

    // Await delivery to SMTP server
    const info = await transporter.sendMail(mailOptions);

    // 7. Verify SMTP acceptance status
    const acceptedList = Array.isArray(info.accepted) ? info.accepted : [];
    const rejectedList = Array.isArray(info.rejected) ? info.rejected : [];

    const isAccepted = acceptedList.some(
      (addr) => String(addr).toLowerCase().includes(recipientEmail.toLowerCase())
    ) || (acceptedList.length > 0 && !rejectedList.some((addr) => String(addr).toLowerCase().includes(recipientEmail.toLowerCase())));

    if (!isAccepted) {
      console.error(`[RFQ_SMTP_REJECTED] reqId=${reqId} recipient=${recipientEmail} rejected=${rejectedList.join(',')} accepted=${acceptedList.join(',')}`);
      return res.status(502).json({
        success: false,
        code: 'SMTP_RECIPIENT_REJECTED',
        message: 'The mail server did not accept the recipient address for delivery.',
        reqId,
        recipient: recipientEmail,
      });
    }

    // Safe diagnostic log ONLY after verified SMTP acceptance
    console.log(`[RFQ_SMTP_ACCEPTED] reqId=${reqId} messageId=${info.messageId} recipient=${recipientEmail} response="${info.response || ''}"`);

    return res.status(200).json({
      success: true,
      message: `Your export quotation request has been accepted by the mail gateway for delivery to ${recipientEmail}.`,
      reqId,
      messageId: info.messageId,
      accepted: acceptedList,
      recipient: recipientEmail,
    });
  } catch (error) {
    console.error(`[RFQ_SMTP_FAILED] reqId=${reqId} recipient=${recipientEmail} code=${error.code || 'UNKNOWN'} command=${error.command || 'NONE'} responseCode=${error.responseCode || 'NONE'} message="${error.message || 'Error sending email'}"`);

    return res.status(502).json({
      success: false,
      code: error.code || 'SMTP_DELIVERY_FAILED',
      message: 'Unable to deliver quotation email via mail server. Please try again or reach out on WhatsApp.',
      reqId,
    });
  }
});

// Start Express server if running directly (local development)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`A.R. Agro Spices Backend Server running on port ${PORT}`);
    console.log(`RFQ Recipient Target: ${getRecipientEmail()}`);
    const { host, user, pass } = getSmtpConfig();
    const hasSmtp = Boolean(host && user && pass);
    console.log(`SMTP Configured: ${hasSmtp ? 'YES (' + host + ')' : 'NO - Awaiting credentials in .env'}`);
    console.log(`=======================================================`);
  });
}

export default app;
