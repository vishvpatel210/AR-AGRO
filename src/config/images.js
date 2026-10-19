/**
 * Centralized Image Configuration for A.R. Agro Spices
 * 
 * Provides single-source-of-truth for all visual assets:
 * - High-resolution local studio photography
 * - Licensed culinary and agricultural stock photography
 * - Descriptive alt text for SEO and accessibility
 * - Aspect ratios, focal points, and object-fit rules
 */

export const IMAGES = {
  // Brand & Hero Imagery
  hero: {
    src: '/images/hero_spices.jpg',
    fallback: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1600&q=85',
    alt: 'Premium Indian whole spices arranged in rustic wooden and brass bowls with vibrant chillies, turmeric, cumin, coriander and cardamom',
    caption: '100% Export-Grade Authentic Indian Spices Sourced from Unjha, Gujarat',
    aspectRatio: '16/9',
    objectFit: 'cover'
  },

  // Visual Storytelling Assets
  story: {
    wholeVsGround: {
      src: '/images/whole_vs_ground.jpg',
      fallback: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=1600&q=85',
      alt: 'Whole spices arranged alongside finely ground spice powders in dark wooden bowls demonstrating cryogenic milling purity',
      caption: 'Whole Seeds vs. Ultra-Fine Cryogenic Ground Spices with Retained Volatile Oils',
      aspectRatio: '16/9',
      objectFit: 'cover'
    },
    facility: {
      src: '/images/facility.jpg',
      fallback: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=85',
      alt: 'Modern stainless steel optical Sortex spice cleaning and optical color sorting plant at A.R. Agro Spices',
      caption: 'Bühler Sortex Optical Color Sorters & Sterilization Line in Unjha',
      aspectRatio: '16/9',
      objectFit: 'cover'
    },
    warehouse: {
      src: '/images/warehouse.jpg',
      fallback: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=85',
      alt: 'Clean ISO 22000 certified warehouse with shrink-wrapped pallets of spice sacks ready for export',
      caption: 'Climate-Controlled 50,000 Sq. Ft. Warehouse Facility with Palletized Staging',
      aspectRatio: '16/9',
      objectFit: 'cover'
    },
    shipping: {
      src: '/images/shipping.jpg',
      fallback: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1600&q=85',
      alt: 'Container cargo ship sailing from Mundra Port loaded with export shipping containers for global delivery',
      caption: 'Direct Sea Freight from Mundra & Kandla Ports to 25+ Global Destinations',
      aspectRatio: '16/9',
      objectFit: 'cover'
    }
  },

  // Individual Product Photography
  products: {
    cumin: {
      src: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
      alt: 'Premium grade Unjha Cumin Seeds (Jeera) 99.5% Sortex Clean',
      thumb: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=75'
    },
    turmeric: {
      src: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=800&q=80',
      alt: 'Golden Alleppey & Salem Turmeric Fingers and High-Curcumin Turmeric Powder',
      thumb: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=400&q=75'
    },
    redChilli: {
      src: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=800&q=80',
      alt: 'Dried Red Chillies S4 Sanam and Teja with Vibrant Red Colour and Fine Crushed Chilli Powder',
      thumb: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=400&q=75'
    },
    coriander: {
      src: 'https://images.unsplash.com/photo-1599909533730-801217e94f06?auto=format&fit=crop&w=800&q=80',
      alt: 'Export grade Eagle quality Coriander Seeds (Dhania) and Aromatic Powder',
      thumb: 'https://images.unsplash.com/photo-1599909533730-801217e94f06?auto=format&fit=crop&w=400&q=75'
    },
    fennel: {
      src: 'https://images.unsplash.com/photo-1608797178974-15b35a61dede?auto=format&fit=crop&w=800&q=80',
      alt: 'Sweet Green Lucknowi & Abu Road Fennel Seeds (Saunf)',
      thumb: 'https://images.unsplash.com/photo-1608797178974-15b35a61dede?auto=format&fit=crop&w=400&q=75'
    },
    cardamom: {
      src: 'https://images.unsplash.com/photo-1599909686000-8b4382e3c042?auto=format&fit=crop&w=800&q=80',
      alt: 'Whole Bold 8mm Extra Green Cardamom Pods (Elaichi) from Idukki Kerala',
      thumb: 'https://images.unsplash.com/photo-1599909686000-8b4382e3c042?auto=format&fit=crop&w=400&q=75'
    },
    blackPepper: {
      src: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80',
      alt: 'Malabar & Tellicherry Garbled Special Extra Bold Black Peppercorns',
      thumb: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=400&q=75'
    },
    sesame: {
      src: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=800&q=80',
      alt: 'Natural White Sesame Seeds 99.9% Auto Sortex Clean and Hulled Sesame',
      thumb: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=400&q=75'
    },
    fenugreek: {
      src: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80',
      alt: 'Golden Yellow Fenugreek Seeds (Methi Dana) Machine Cleaned',
      thumb: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=400&q=75'
    },
    mustard: {
      src: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
      alt: 'Small Bold Black and Yellow Mustard Seeds (Rai / Sarson)',
      thumb: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=75'
    },
    psyllium: {
      src: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=800&q=80',
      alt: 'Pure 99% Psyllium Husk (Isabgol) and Psyllium Seed Powder',
      thumb: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=400&q=75'
    },
    senna: {
      src: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
      alt: 'Natural Senna Leaves & Pods (Cassia Angustifolia) Export Quality',
      thumb: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=75'
    }
  },

  // Gallery Showcase Collections
  gallery: [
    {
      id: 'gal-1',
      title: 'Artisanal Spice Assortment',
      category: 'spices',
      image: '/images/hero_spices.jpg',
      alt: 'Selection of whole Indian spices in wooden bowls on rustic slate',
      tag: 'Whole Spices',
      description: 'Sourced directly from the fertile agricultural belt of Gujarat & Rajasthan.'
    },
    {
      id: 'gal-2',
      title: 'Whole vs. Cryogenic Ground Spices',
      category: 'processing',
      image: '/images/whole_vs_ground.jpg',
      alt: 'Comparative display of whole seed spices and fine spice powders',
      tag: 'Precision Grinding',
      description: 'Low-temperature cryogenic processing preserves 98%+ of natural volatile oils.'
    },
    {
      id: 'gal-3',
      title: 'Sortex Optical Color Sorting Plant',
      category: 'facility',
      image: '/images/facility.jpg',
      alt: 'Advanced optical color sorters and stainless steel processing machinery',
      tag: 'Processing Facility',
      description: 'High-speed camera sensor ejectors eliminating impurities to achieve 99.8% purity.'
    },
    {
      id: 'gal-4',
      title: 'Palletized Export Warehouse',
      category: 'warehouse',
      image: '/images/warehouse.jpg',
      alt: 'Climate-controlled warehouse with neatly stacked palletized spice bags',
      tag: 'Storage & Packaging',
      description: 'ISO 22000 compliant dust-free warehouse with automated pest control and moisture sensors.'
    },
    {
      id: 'gal-5',
      title: 'Global Maritime Trade & Freight',
      category: 'shipping',
      image: '/images/shipping.jpg',
      alt: 'Container cargo ship sailing from Mundra Port with spice shipments',
      tag: 'Global Logistics',
      description: 'Weekly direct FCL container shipments from Mundra and Kandla ports to 25+ global ports.'
    },
    {
      id: 'gal-6',
      title: 'Vibrant Red Chilli & Haldi Harvest',
      category: 'spices',
      image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=1200&q=85',
      alt: 'High ASTA red chillies and rich golden turmeric powder display',
      tag: 'Raw Commodities',
      description: 'Sun-dried premium Teja and Sanam red chillies with laboratory verified capsaicin levels.'
    }
  ]
};

export default IMAGES;
