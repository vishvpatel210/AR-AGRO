import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft, MapPin, Phone, Mail, MessageCircle,
  Clock, ArrowRight, Send, CheckCircle2, Building2
} from "lucide-react";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay } },
});

const CONTACT_CARDS = [
  {
    icon: Building2,
    label: "Head Office",
    color: "bg-forest/10 text-forest",
    lines: [
      "216, APMC Building, Market Yard,",
      "Unjha – 384170, Gujarat, India.",
    ],
    action: {
      href: "https://maps.google.com/?q=216+APMC+Building+Market+Yard+Unjha+384170+Gujarat+India",
      label: "View on Map",
      external: true,
    },
  },
  {
    icon: Phone,
    label: "Phone",
    color: "bg-lime/20 text-forest-dark",
    lines: ["+91 98700 72960", "+91 84606 72960"],
    action: {
      href: "tel:+919870072960",
      label: "Call Now",
      external: false,
    },
  },
  {
    icon: Mail,
    label: "Email",
    color: "bg-forest/10 text-forest",
    lines: ["info@aragrospices.com", "export@aragrospices.com"],
    action: {
      href: "mailto:info@aragrospices.com",
      label: "Send Email",
      external: false,
    },
  },
  {
    icon: MessageCircle,
    label: "WhatsApp Export Hotline",
    color: "bg-lime/20 text-forest-dark",
    lines: ["+91 98700 72960", "24/7 International Support"],
    action: {
      href: "https://wa.me/919870072960?text=Hello%20A.R.%20Agro%20Spices%2C%20I%20would%20like%20to%20enquire%20about%20your%20products.",
      label: "Chat on WhatsApp",
      external: true,
    },
  },
];

export default function ContactPage({ onOpenInquiry }) {
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);

  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const subject = encodeURIComponent(`Enquiry from ${form.name}${form.company ? ` — ${form.company}` : ''}`);
    const body = encodeURIComponent(
      `Dear A.R. Agro Spices Team,

Name: ${form.name}
Company: ${form.company || 'N/A'}
Phone / WhatsApp: ${form.phone || 'N/A'}

Message:
${form.message}

---
Sent via aragrospices.com contact form`
    );
    window.location.href = `mailto:export@aragrospices.com?subject=${subject}&body=${body}`;
    setSent(true);
  }

  function handleWhatsApp() {
    const text = encodeURIComponent(
      `Hello A.R. Agro Spices,\n\nName: ${form.name}\nCompany: ${form.company || 'N/A'}\nEmail: ${form.email}\nPhone: ${form.phone || 'N/A'}\n\nMessage:\n${form.message}`
    );
    window.open(`https://wa.me/919870072960?text=${text}`, '_blank', 'noopener,noreferrer');
    setSent(true);
  }

  return (
    <div className="bg-warm-white min-h-screen">

      {/* ── Hero ─────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-forest-dark via-forest to-forest-dark overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "28px 28px" }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium text-warm-white/60 mb-8">
            <Link to="/" className="hover:text-lime flex items-center gap-1 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /><span>Home</span>
            </Link>
            <span>/</span>
            <span className="text-lime font-semibold">Contact Us</span>
          </nav>

          <div className="max-w-2xl">
            <motion.div variants={fadeUp(0)} initial="hidden" animate="visible"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lime/15 border border-lime/30 text-lime text-xs font-semibold mb-5">
              <MapPin className="w-3.5 h-3.5" />
              <span>Unjha, Gujarat — Asia's Spice Capital</span>
            </motion.div>

            <motion.h1 variants={fadeUp(0.06)} initial="hidden" animate="visible"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-warm-white font-heading tracking-tight leading-[1.1] mb-5">
              Connect With<br />
              <span className="text-lime">Our Team</span>
            </motion.h1>

            <motion.p variants={fadeUp(0.12)} initial="hidden" animate="visible"
              className="text-warm-white/75 text-base sm:text-lg leading-relaxed max-w-xl">
              At A.R. Agro Spices, our exceptional team possesses extensive industry expertise,
              ensuring the delivery of top-quality products at competitive prices for all orders.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── Contact Cards ─────────────────────── */}
      <section className="py-14 sm:py-16 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CONTACT_CARDS.map(({ icon: Icon, label, color, lines, action }, i) => (
              <motion.div key={label} variants={fadeUp(i * 0.08)} initial="hidden" whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="group bg-white rounded-2xl p-6 border border-forest/10 shadow-sm hover:shadow-lg hover:border-forest/25 transition-all duration-300">
                <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xs font-bold text-ink-muted uppercase tracking-wider mb-3">{label}</h3>
                <div className="space-y-1 mb-5">
                  {lines.map((line, j) => (
                    <p key={j} className="text-sm font-semibold text-forest-dark leading-snug">{line}</p>
                  ))}
                </div>
                <a
                  href={action.href}
                  {...(action.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-forest hover:text-forest-dark transition-colors group/link"
                >
                  {action.label}
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Business Hours ────────────────────── */}
      <section className="pb-4 sm:pb-6 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeUp()} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
            className="bg-sage/30 rounded-2xl p-5 sm:p-6 border border-forest/15 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 rounded-xl bg-forest/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-forest" />
              </div>
              <h3 className="text-sm font-bold text-forest-dark">Business Hours</h3>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs text-ink-muted">
              <span><strong className="text-forest-dark">Mon – Sat:</strong> 9:00 AM – 6:30 PM (IST)</span>
              <span><strong className="text-forest-dark">Sunday:</strong> Closed</span>
              <span><strong className="text-forest-dark">WhatsApp:</strong> 24/7 International Support</span>
              <span><strong className="text-forest-dark">Export Enquiries:</strong> export@aragrospices.com</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Contact Form + Map ────────────────── */}
      <section className="py-12 sm:py-16 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">

            {/* Form */}
            <motion.div variants={fadeUp()} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
              <span className="inline-flex items-center gap-1.5 text-forest text-xs font-bold uppercase tracking-widest mb-3">
                <span className="w-6 h-0.5 bg-forest inline-block" />Send a Message
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-dark font-heading mb-6">
                Get in Touch
              </h2>

              {sent ? (
                <div className="flex flex-col items-center justify-center py-16 gap-4 text-center bg-sage/20 rounded-2xl border border-forest/15">
                  <CheckCircle2 className="w-14 h-14 text-forest" />
                  <h3 className="text-xl font-bold text-forest-dark font-heading">Message Sent!</h3>
                  <p className="text-sm text-ink-muted max-w-xs">
                    Your email client has opened with a pre-filled message to{' '}
                    <strong className="text-forest-dark">export@aragrospices.com</strong>. Our team will respond within 24 hours.
                  </p>
                  <button onClick={() => setSent(false)} className="mt-2 px-5 py-2.5 rounded-xl bg-forest text-white text-sm font-semibold cursor-pointer hover:bg-forest-dark transition-colors">
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-forest-dark mb-1.5">Full Name <span className="text-red-500">*</span></label>
                      <input required name="name" value={form.name} onChange={handleChange} placeholder="e.g. Rajesh Kumar"
                        className="w-full px-4 py-3 rounded-xl border border-forest/20 bg-white text-sm text-ink-dark placeholder:text-ink-muted/50 focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-forest-dark mb-1.5">Company Name</label>
                      <input name="company" value={form.company} onChange={handleChange} placeholder="e.g. Global Foods Ltd."
                        className="w-full px-4 py-3 rounded-xl border border-forest/20 bg-white text-sm text-ink-dark placeholder:text-ink-muted/50 focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-all" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-forest-dark mb-1.5">Email Address <span className="text-red-500">*</span></label>
                      <input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@company.com"
                        className="w-full px-4 py-3 rounded-xl border border-forest/20 bg-white text-sm text-ink-dark placeholder:text-ink-muted/50 focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-forest-dark mb-1.5">Phone / WhatsApp</label>
                      <input name="phone" value={form.phone} onChange={handleChange} placeholder="+1 555 000 1234"
                        className="w-full px-4 py-3 rounded-xl border border-forest/20 bg-white text-sm text-ink-dark placeholder:text-ink-muted/50 focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-forest-dark mb-1.5">Message <span className="text-red-500">*</span></label>
                    <textarea required name="message" value={form.message} onChange={handleChange} rows={5}
                      placeholder="Tell us about your requirements, product needs, or questions..."
                      className="w-full px-4 py-3 rounded-xl border border-forest/20 bg-white text-sm text-ink-dark placeholder:text-ink-muted/50 focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-all resize-none" />
                  </div>
                  <div className="flex flex-wrap gap-3 pt-1">
                    <button type="submit"
                      className="px-6 py-3.5 rounded-xl bg-forest hover:bg-forest-dark text-white font-bold text-sm flex items-center gap-2 transition-all shadow-sm hover:shadow-md min-h-[44px] cursor-pointer">
                      <Send className="w-4 h-4" />
                      Send Email
                    </button>
                    <button type="button" onClick={handleWhatsApp}
                      className="px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-sm flex items-center gap-2 transition-all min-h-[44px] cursor-pointer shadow-sm hover:shadow-md">
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp Instead
                    </button>
                    <button type="button" onClick={() => onOpenInquiry && onOpenInquiry()}
                      className="px-6 py-3.5 rounded-xl bg-sage/60 hover:bg-sage text-forest-dark font-semibold text-sm border border-forest/15 transition-all min-h-[44px] cursor-pointer">
                      Request Quote
                    </button>
                  </div>
                  <p className="text-[11px] text-ink-muted">
                    Clicking <strong>Send Email</strong> opens your email app pre-filled to{' '}
                    <a href="mailto:export@aragrospices.com" className="text-forest font-semibold hover:underline">export@aragrospices.com</a>.
                  </p>
                </form>
              )}
            </motion.div>

            {/* Map + Location */}
            <motion.div variants={fadeUp(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
              <span className="inline-flex items-center gap-1.5 text-forest text-xs font-bold uppercase tracking-widest mb-3">
                <span className="w-6 h-0.5 bg-forest inline-block" />Our Location
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-dark font-heading mb-6">
                Find Us in Unjha
              </h2>

              {/* Embedded map */}
              <div className="rounded-2xl overflow-hidden border border-forest/15 shadow-sm mb-5 aspect-[4/3]">
                <iframe
                  title="A.R. Agro Spices Location — APMC Market Yard, Unjha"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3669.1234!2d72.3867!3d23.8095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c439ee8d5e935%3A0x3b9b8a7f0d6e7f6e!2sAPMC%20Market%20Yard%2C%20Unjha%2C%20Gujarat%20384170!5e0!3m2!1sen!2sin!4v1697000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Address Card */}
              <div className="bg-sage/30 rounded-2xl p-5 border border-forest/15 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-forest-dark uppercase tracking-wider mb-1">Head Office & Processing Unit</h4>
                    <p className="text-sm text-ink-muted leading-relaxed">
                      216, APMC Building, Market Yard,<br />Unjha – 384170, Gujarat, India.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-forest shrink-0" />
                  <div>
                    <a href="tel:+919870072960" className="block text-sm font-semibold text-forest-dark hover:text-forest transition-colors">+91 98700 72960</a>
                    <a href="tel:+918460672960" className="block text-sm font-semibold text-forest-dark hover:text-forest transition-colors">+91 84606 72960</a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-forest shrink-0" />
                  <div>
                    <a href="mailto:info@aragrospices.com" className="block text-sm font-semibold text-forest-dark hover:text-forest transition-colors">info@aragrospices.com</a>
                    <a href="mailto:export@aragrospices.com" className="block text-sm font-semibold text-forest-dark hover:text-forest transition-colors">export@aragrospices.com</a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA strip ────────────────────────── */}
      <section className="py-12 bg-gradient-to-br from-forest-dark via-forest to-forest-dark mt-6">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-xl sm:text-2xl font-extrabold text-warm-white font-heading mb-3">
            Ready to Place an Export Order?
          </h2>
          <p className="text-warm-white/70 text-sm leading-relaxed mb-6">
            Share your product requirements and quantity — our export team responds within 24 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button onClick={() => onOpenInquiry && onOpenInquiry()}
              className="px-6 py-3.5 rounded-xl bg-lime hover:bg-lime-hover text-forest-dark font-bold text-sm flex items-center gap-2 transition-all min-h-[44px] cursor-pointer shadow-soft">
              Request Export Quote <ArrowRight className="w-4 h-4" />
            </button>
            <a href="https://wa.me/919870072960?text=Hello%20A.R.%20Agro%20Spices%2C%20I%20would%20like%20to%20get%20a%20quote."
              target="_blank" rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-warm-white/10 hover:bg-warm-white/20 text-warm-white font-semibold text-sm border border-warm-white/20 transition-all min-h-[44px] flex items-center gap-2">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
