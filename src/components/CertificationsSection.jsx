import React from 'react';

/**
 * CertificationsSection — Homepage animated certification logo slider.
 *
 * Two rows of logo cards scroll in opposite directions:
 *   Row 1: right → left  (animate-marquee-left)
 *   Row 2: left → right  (animate-marquee-right)
 *
 * Logo arrays are duplicated so the loop is seamless.
 * Animations pause when the user hovers over the marquee track.
 * Respects prefers-reduced-motion (handled globally in index.css).
 */

const ROW_ONE = [
  {
    id: 'iso',
    label: 'ISO 9001:2015',
    sub: 'Certified Company',
    src: '/images/cert-logos/iso.svg',
  },
  {
    id: 'haccp',
    label: 'HACCP Certified',
    sub: 'Food Safety System',
    src: '/images/cert-logos/haccp.svg',
  },
  {
    id: 'spices-board',
    label: 'Spices Board of India',
    sub: 'Ministry of Commerce',
    src: '/images/cert-logos/spices-board.svg',
  },
  {
    id: 'gmp',
    label: 'GMP Certified',
    sub: 'Good Manufacturing Practice',
    src: '/images/cert-logos/gmp.svg',
  },
  {
    id: 'fssai',
    label: 'FSSAI Licensed',
    sub: 'Central License · 10721999001022',
    src: '/images/cert-logos/fssai.svg',
  },
  {
    id: 'apeda',
    label: 'APEDA Member',
    sub: 'Reg. RCMC · Govt. of India',
    src: '/images/cert-logos/apeda.svg',
  },
];

const ROW_TWO = [
  {
    id: 'aeo',
    label: 'AEO-T1 Certified',
    sub: 'Indian Customs · CBIC',
    src: '/images/cert-logos/aeo.svg',
  },
  {
    id: 'tpci',
    label: 'TPCI Member',
    sub: 'Trade Promotion Council of India',
    src: '/images/cert-logos/tpci.svg',
  },
  {
    id: 'fieo',
    label: 'FIEO Member',
    sub: 'Federation of Indian Export Orgs.',
    src: '/images/cert-logos/fieo.svg',
  },
  {
    id: 'msme',
    label: 'MSME Udyam',
    sub: 'UDYAM-GJ-14-0008149',
    src: '/images/cert-logos/msme.svg',
  },
  {
    id: 'dgft-star',
    label: 'One Star Export House',
    sub: 'DGFT, Govt. of India',
    src: '/images/cert-logos/dgft-star.svg',
  },
  {
    id: 'fssai2',
    label: 'GST Registered',
    sub: '24ABPFA2522H1ZO · Active',
    src: '/images/cert-logos/fssai.svg',   // reuse FSSAI style card for now
  },
];

function LogoCard({ logo }) {
  return (
    <div
      className="flex-shrink-0 mx-3 flex flex-col items-center justify-center
                 bg-white rounded-2xl border border-gray-100
                 shadow-[0_2px_12px_rgba(36,86,50,0.07)]
                 hover:shadow-[0_8px_28px_rgba(36,86,50,0.14)]
                 hover:-translate-y-1
                 transition-all duration-300 cursor-default
                 w-[180px] sm:w-[200px] h-[100px] sm:h-[110px] px-5 py-3"
      aria-label={logo.label}
    >
      <img
        src={logo.src}
        alt={logo.label}
        draggable={false}
        className="max-h-[60px] sm:max-h-[68px] w-full object-contain select-none"
        loading="lazy"
      />
    </div>
  );
}

function MarqueeRow({ logos, direction }) {
  // Duplicate array for seamless infinite loop
  const doubled = [...logos, ...logos];
  const animClass =
    direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right';

  return (
    <div className="relative overflow-hidden cert-slider-mask marquee-track">
      <div className={`flex ${animClass}`}>
        {doubled.map((logo, idx) => (
          <LogoCard key={`${logo.id}-${idx}`} logo={logo} />
        ))}
      </div>
    </div>
  );
}

export default function CertificationsSection() {
  return (
    <section
      id="certifications"
      aria-labelledby="cert-heading"
      className="py-16 sm:py-20 bg-[#f7f9f5] overflow-hidden"
    >
      {/* ── Section Heading ── */}
      <div className="text-center max-w-2xl mx-auto px-4 mb-10 sm:mb-12">
        <p className="inline-block text-xs font-semibold uppercase tracking-widest
                      text-forest bg-forest/10 px-3 py-1 rounded-full mb-3">
          Verified &amp; Accredited
        </p>
        <h2
          id="cert-heading"
          className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold
                     font-heading text-forest-dark tracking-tight"
        >
          Our Certifications
        </h2>
        <p className="mt-3 text-sm sm:text-base text-ink-muted leading-relaxed">
          Compliant with international food safety standards and accredited by
          India's leading regulatory &amp; trade bodies.
        </p>
      </div>

      {/* ── Row 1: slides right → left ── */}
      <MarqueeRow logos={ROW_ONE} direction="left" />

      {/* ── Spacer between rows ── */}
      <div className="h-4" />

      {/* ── Row 2: slides left → right ── */}
      <MarqueeRow logos={ROW_TWO} direction="right" />
    </section>
  );
}
