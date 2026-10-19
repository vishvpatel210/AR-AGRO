import React, { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft, MapPin, Globe, ShieldCheck, Award, Factory,
  Package, TrendingUp, Users, ArrowRight, CheckCircle2, Star
} from "lucide-react";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1], delay } },
});

const STATS = [
  { value: "25+", label: "Years of Excellence", icon: Star },
  { value: "25+", label: "Countries Served", icon: Globe },
  { value: "50+", label: "Products Exported", icon: Package },
  { value: "5000+", label: "MT Annual Capacity", icon: TrendingUp },
];

const MACHINERY_PHOTOS = [
  {
    src: "/images/about/machinery-1.jpg",
    alt: "Advanced multi-level spice processing plant — A.R. Agro Spices, Unjha",
    caption: "Multi-Level Spice Processing Plant",
    desc: "Our primary processing tower handles cleaning, grading, and milling across multiple production floors.",
  },
  {
    src: "/images/about/machinery-2.jpg",
    alt: "Precision grinding and classification system — A.R. Agro Spices",
    caption: "Precision Grinding & Classification System",
    desc: "Advanced grinding and air-classification equipment preserves volatile oils and natural aroma.",
  },
  {
    src: "/images/about/machinery-3.png",
    alt: "Seed cleaning and destoning machine — A.R. Agro Spices, Unjha Gujarat",
    caption: "Seed Cleaning & Destoning Machine",
    desc: "Industrial-grade cleaning machinery removes impurities to ensure export purity standards.",
  },
];

const FACILITY_PHOTOS = [
  {
    src: "/images/about/warehouse-exterior.jpg",
    alt: "A.R. Agro Spices warehouse facility exterior, Unjha Gujarat",
    caption: "Warehouse & Export Dispatch Hub",
    desc: "Our purpose-built processing and storage facility in Unjha, Gujarat — equipped for large-volume export handling.",
  },
  {
    src: "/images/about/warehouse-stock.jpg",
    alt: "Palletized spice bags ready for export — A.R. Agro Spices warehouse",
    caption: "Export-Ready Stock — Climate-Controlled Warehouse",
    desc: "Thousands of metric tonnes stored in hygienic, moisture-controlled conditions, ready for dispatch.",
  },
];

const MILESTONES = [
  { year: "2000", title: "Founded in Unjha", desc: "Established with a vision to deliver premium Indian spices to domestic and international markets." },
  { year: "2005", title: "First International Export", desc: "Expanded into global markets, delivering cumin, fennel, and coriander seeds to overseas buyers." },
  { year: "2015", title: "FSSAI Central License", desc: "Received central food safety licensing, enabling large-scale proprietary food manufacturing & export." },
  { year: "2020", title: "AEO-T1 Customs Accreditation", desc: "Recognized by Indian Customs as Authorized Economic Operator — enabling fast-track port clearance." },
  { year: "2024", title: "25+ Countries Served", desc: "Reached global milestones, serving customers across 25+ nations with consistent quality and reliability." },
];

export default function AboutPage({ onOpenInquiry }) {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="bg-warm-white min-h-screen">

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-forest-dark via-forest to-forest-dark overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "28px 28px" }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium text-warm-white/60 mb-8">
            <Link to="/" className="hover:text-lime flex items-center gap-1 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <span>/</span>
            <span className="text-lime font-semibold">About Us</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <motion.div variants={fadeUp(0)} initial="hidden" animate="visible"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lime/15 border border-lime/30 text-lime text-xs font-semibold mb-5">
                <MapPin className="w-3.5 h-3.5" />
                <span>Unjha, Gujarat — India's Spice Capital</span>
              </motion.div>
              <motion.h1 variants={fadeUp(0.06)} initial="hidden" animate="visible"
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-warm-white font-heading tracking-tight leading-[1.1] mb-5">
                A.R. Agro Spices<br />
                <span className="text-lime">— 25 Years of</span><br />
                Spice Excellence
              </motion.h1>
              <motion.p variants={fadeUp(0.12)} initial="hidden" animate="visible"
                className="text-warm-white/75 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
                Founded in 2000, A.R. Agro Spices is a trusted manufacturer and global exporter of premium Indian spices
                and agricultural products — serving buyers across 25+ countries with quality, consistency, and integrity.
              </motion.p>
              <motion.div variants={fadeUp(0.18)} initial="hidden" animate="visible" className="flex flex-wrap gap-3">
                <button onClick={() => onOpenInquiry && onOpenInquiry()}
                  className="px-6 py-3.5 rounded-xl bg-lime hover:bg-lime-hover text-forest-dark font-bold text-sm shadow-soft transition-all min-h-[44px] flex items-center gap-2 cursor-pointer">
                  <span>Request a Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <Link to="/products"
                  className="px-6 py-3.5 rounded-xl bg-warm-white/10 hover:bg-warm-white/20 text-warm-white font-semibold text-sm border border-warm-white/20 transition-all min-h-[44px] flex items-center gap-2">
                  View Products
                </Link>
              </motion.div>
            </div>

            <motion.div variants={fadeUp(0.22)} initial="hidden" animate="visible" className="grid grid-cols-2 gap-4">
              {STATS.map(({ value, label, icon: Icon }) => (
                <div key={label} className="bg-warm-white/10 backdrop-blur-sm border border-warm-white/15 rounded-2xl p-5 text-center hover:bg-warm-white/15 transition-colors">
                  <Icon className="w-6 h-6 text-lime mx-auto mb-2" />
                  <div className="text-3xl font-extrabold text-warm-white font-heading">{value}</div>
                  <div className="text-xs text-warm-white/65 font-medium mt-1">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-14 sm:py-20 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <motion.div variants={fadeUp()} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
              <span className="inline-flex items-center gap-1.5 text-forest text-xs font-bold uppercase tracking-widest mb-3">
                <span className="w-6 h-0.5 bg-forest inline-block" />Our Story
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-forest-dark font-heading tracking-tight mb-6">
                Built on Quality,<br />Grown by Trust
              </h2>
              <div className="space-y-4 text-ink-muted text-base leading-relaxed">
                <p>Founded in 2000, <strong className="text-forest-dark">A.R. Agro Spices</strong> was established with a clear vision — to deliver premium-quality Indian spices and agro products to customers across domestic and international markets. Based in <strong className="text-forest-dark">Unjha, Gujarat</strong>, one of India's most renowned spice trading hubs, we have built our reputation on quality, consistency, reliability, and long-term customer relationships.</p>
                <p>Over the past <strong className="text-forest-dark">25+ years</strong>, we have developed extensive expertise in sourcing the finest raw materials, implementing advanced processing practices, and maintaining stringent quality control at every stage. Our commitment to excellence has enabled us to expand our global footprint, successfully serving customers across <strong className="text-forest-dark">25+ countries</strong> with products that consistently meet international quality standards.</p>
                <p>Every product at A.R. Agro Spices is carefully sourced, processed, and packaged to preserve its natural freshness, purity, flavor, and nutritional value. By combining traditional sourcing expertise with modern processing technology and efficient export operations, we ensure reliable quality and timely deliveries for customers worldwide.</p>
                <p>Today, A.R. Agro Spices is recognized as a trusted manufacturer and global exporter of premium Indian spices and agro products. With a strong focus on quality, integrity, innovation, and customer satisfaction, we continue to build long-term partnerships while bringing the authentic taste of India to global markets.</p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} className="relative">
              <span className="inline-flex items-center gap-1.5 text-forest text-xs font-bold uppercase tracking-widest mb-3">
                <span className="w-6 h-0.5 bg-forest inline-block" />Key Milestones
              </span>
              <h3 className="text-2xl font-bold text-forest-dark font-heading mb-8">Our Journey</h3>
              <div className="relative">
                <div className="absolute left-[22px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-forest via-forest/40 to-transparent" />
                <div className="space-y-7">
                  {MILESTONES.map(({ year, title, desc }) => (
                    <div key={year} className="flex gap-5 items-start">
                      <div className="w-11 h-11 rounded-full bg-forest flex items-center justify-center shrink-0 z-10 shadow-md border-2 border-warm-white">
                        <span className="text-[10px] font-extrabold text-lime leading-tight text-center">{year}</span>
                      </div>
                      <div className="pt-1.5 flex-1">
                        <h4 className="text-sm font-bold text-forest-dark mb-1">{title}</h4>
                        <p className="text-xs text-ink-muted leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Vision Values */}
      <section className="py-14 sm:py-16 bg-sage/30 border-y border-forest/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-dark font-heading mb-3">Our Mission, Vision & Values</h2>
            <p className="text-ink-muted text-sm sm:text-base">The guiding principles that shape every product, partnership, and export shipment.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: Award, color: "bg-forest/10 text-forest", title: "Our Mission", body: "To provide the highest quality Indian spices and agro products with uncompromising purity, consistent supply reliability, and transparent pricing — enabling long-term trust with global buyers." },
              { icon: Globe, color: "bg-lime/20 text-forest-dark", title: "Our Vision", body: "To be recognized globally as India's most trusted and quality-first spice exporter, bringing the authentic taste of Indian agriculture to every corner of the world." },
              { icon: ShieldCheck, color: "bg-forest/10 text-forest", title: "Our Values", body: "Quality first. Integrity in every transaction. Reliability in every shipment. Innovation in processing. Sustainability in sourcing. Long-term customer relationships above all." },
            ].map(({ icon: Icon, color, title, body }) => (
              <motion.div key={title} variants={fadeUp()} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
                className="bg-white rounded-2xl p-6 border border-forest/10 shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center mb-4`}><Icon className="w-5 h-5" /></div>
                <h3 className="text-lg font-bold text-forest-dark font-heading mb-2">{title}</h3>
                <p className="text-sm text-ink-muted leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HIGH MACHINERY SECTION */}
      <section id="about-machinery" className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeUp()} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
            className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 text-forest text-xs font-bold uppercase tracking-widest mb-3">
              <span className="w-6 h-0.5 bg-forest inline-block" />Processing Technology<span className="w-6 h-0.5 bg-forest inline-block" />
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-forest-dark font-heading tracking-tight mb-4">
              High-Grade Machinery & Processing Infrastructure
            </h2>
            <p className="text-ink-muted text-base sm:text-lg leading-relaxed">
              Our state-of-the-art processing facility in Unjha combines industrial-grade machinery with advanced quality-control systems — ensuring every export batch meets international purity standards.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {MACHINERY_PHOTOS.map(({ src, alt, caption, desc }, i) => (
              <motion.div key={src} variants={fadeUp(i * 0.1)} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}
                className="group rounded-2xl overflow-hidden border border-forest/10 shadow-sm hover:shadow-xl transition-shadow duration-300 bg-white">
                <div className="relative aspect-[4/3] overflow-hidden bg-sage/20">
                  <img src={src} alt={alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-5 border-t border-forest/8">
                  <div className="flex items-start gap-2 mb-2">
                    <Factory className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                    <h3 className="text-sm font-bold text-forest-dark font-heading leading-tight">{caption}</h3>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp(0.15)} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
            className="bg-gradient-to-br from-sage/40 to-sage/20 rounded-2xl p-6 sm:p-8 border border-forest/15">
            <h3 className="text-lg font-bold text-forest-dark font-heading mb-5 flex items-center gap-2">
              <Factory className="w-5 h-5 text-forest" />Processing Capabilities
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: "Seed Cleaning & Grading", desc: "Destoning, scalping, gravity separation for foreign-matter-free output." },
                { title: "Precision Milling", desc: "Industrial mills maintaining particle size uniformity for spice powders." },
                { title: "Air Classification", desc: "Pneumatic separators ensuring purity and consistent bulk density." },
                { title: "Quality Inspection", desc: "In-line moisture, colour, and purity checks at every production stage." },
              ].map(({ title, desc }) => (
                <div key={title} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-forest-dark mb-1">{title}</h4>
                    <p className="text-xs text-ink-muted leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Warehouse & Facility Photos */}
      <section className="py-14 sm:py-20 bg-sage/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeUp()} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
            className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-dark font-heading mb-3">Warehouse & Export Facility</h2>
            <p className="text-ink-muted text-sm sm:text-base leading-relaxed">
              Modern storage, hygienic handling, and dedicated export dispatch — built to handle large-scale global orders.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {FACILITY_PHOTOS.map(({ src, alt, caption, desc }, i) => (
              <motion.div key={src} variants={fadeUp(i * 0.08)} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}
                className="group rounded-2xl overflow-hidden border border-forest/10 shadow-sm hover:shadow-lg transition-shadow bg-white">
                <div className="relative aspect-[16/9] overflow-hidden bg-sage/20">
                  <img src={src} alt={alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                </div>
                <div className="p-5 border-t border-forest/8">
                  <div className="flex items-start gap-2 mb-1.5">
                    <Package className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                    <h3 className="text-sm font-bold text-forest-dark font-heading">{caption}</h3>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-14 sm:py-16 bg-white border-t border-forest/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-dark font-heading mb-3">Why Global Buyers Choose A.R. Agro Spices</h2>
            <p className="text-ink-muted text-sm sm:text-base">Trusted by importers, distributors and food manufacturers across 25+ countries.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: ShieldCheck, title: "Government Certified", desc: "FSSAI Central License, AEO-T1 Customs, DGFT, MSME & GST registered entity." },
              { icon: Award, title: "One Star Export House", desc: "Recognized by the Government of India for export excellence — APEDA certified." },
              { icon: Factory, title: "In-House Processing", desc: "Full seed-to-shipment control at our own Unjha processing plant — no middlemen." },
              { icon: Globe, title: "25+ Countries", desc: "Active export relationships with buyers across Middle East, Europe, USA, Africa, & Asia." },
              { icon: Users, title: "Long-Term Partnerships", desc: "Over 80% of our business comes from repeat buyers who trust our consistency." },
              { icon: TrendingUp, title: "Competitive FOB Pricing", desc: "Direct-from-origin pricing from Unjha and Mundra port with full logistics support." },
            ].map(({ icon: Icon, title, desc }) => (
              <motion.div key={title} variants={fadeUp()} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
                className="group p-5 rounded-2xl border border-forest/10 bg-white hover:bg-sage/20 hover:border-forest/25 transition-all duration-200 shadow-sm hover:shadow-md">
                <div className="w-10 h-10 rounded-xl bg-forest/10 text-forest flex items-center justify-center mb-3 group-hover:bg-forest group-hover:text-white transition-colors duration-200">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-forest-dark mb-1.5">{title}</h3>
                <p className="text-xs text-ink-muted leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-gradient-to-br from-forest-dark via-forest to-forest-dark">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-warm-white font-heading mb-4">Ready to Source Premium Indian Spices?</h2>
          <p className="text-warm-white/75 text-sm sm:text-base leading-relaxed mb-8">
            Connect with our export team for FOB / CIF pricing, product specs, lab reports, and a custom sample shipment.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button onClick={() => onOpenInquiry && onOpenInquiry()}
              className="px-7 py-3.5 rounded-xl bg-lime hover:bg-lime-hover text-forest-dark font-bold text-sm shadow-soft transition-all min-h-[44px] flex items-center gap-2 cursor-pointer">
              Request Export Quote <ArrowRight className="w-4 h-4" />
            </button>
            <a href="https://wa.me/919870072960?text=Hello%20A.R.%20Agro%20Spices%2C%20I%20would%20like%20to%20learn%20more%20about%20your%20company%20and%20export%20capabilities."
              target="_blank" rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-xl bg-warm-white/10 hover:bg-warm-white/20 text-warm-white font-semibold text-sm border border-warm-white/20 transition-all min-h-[44px] flex items-center gap-2">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
