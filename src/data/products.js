/**
 * A.R. Agro Spices - Product Catalogue & Category Data
 * 
 * 25 authentic Indian spices, seeds, grains, and agro commodities.
 * Every product has its own individual local photograph in /images/products/.
 */

export const CATEGORIES = [
  { 
    id: 'all', 
    name: 'All Products', 
    count: 25 
  },
  { 
    id: 'spices-seeds', 
    name: 'Spices & Seeds', 
    tagline: 'Whole Spices & Seeds',
    description: 'Premium whole spices and seeds sourced for quality, purity, and authentic flavour.',
    image: '/images/hero_spices.jpg',
    itemsList: [
      'Cumin Seeds (Jeera)',
      'Fennel Seeds (Saunf)',
      'Coriander Seeds',
      'Fenugreek Seeds',
      'Sesame Seeds',
      'Mustard Seeds',
      'Black Cumin',
      'Ajwain',
      'Dill Seeds',
      'Chia Seeds',
      'Flax Seeds',
      'Basil Seeds',
      'Quinoa'
    ]
  },
  { 
    id: 'agro-herbal', 
    name: 'Agro & Herbal Products', 
    tagline: 'Agricultural & Herbal Commodities',
    description: 'Carefully sourced agricultural and herbal products for domestic and international buyers.',
    image: '/images/products/chickpeas.jpg',
    itemsList: [
      'Chickpeas',
      'Roasted Gram',
      'Senna Leaves',
      'Psyllium Husk',
      'Asaliya Seeds'
    ]
  },
  { 
    id: 'other-products', 
    name: 'Other Products', 
    tagline: 'Specialty Roots, Leaves & Aromatics',
    description: 'Explore our additional specialty products, roots, leaves, and aromatic ingredients.',
    image: '/images/whole_vs_ground.jpg',
    itemsList: [
      'Turmeric Finger',
      'Bay Leaves',
      'Nutmeg',
      'Tamarind',
      'Dry Red Chilli',
      'Cardamom',
      'Dry Ginger'
    ]
  }
];

export const PRODUCTS = [
  // ==========================================
  // Category 1: Spices & Seeds (13 items)
  // ==========================================
  {
    id: 'cumin-seeds',
    name: 'Cumin Seeds',
    commonName: 'Jeera / જીરું',
    category: 'spices-seeds',
    categoryLabel: 'Spices & Seeds',
    isFeatured: true,
    image: '/images/products/cumin-seeds.jpg',
    alt: 'Whole Cumin Seeds (Jeera) from Unjha, Gujarat',
    shortDescription: 'Unjha machine-cleaned and Sortex-grade whole cumin seeds with intense natural aroma.'
  },
  {
    id: 'fennel-seeds',
    name: 'Fennel Seeds',
    commonName: 'Saunf / વરિયાળી',
    category: 'spices-seeds',
    categoryLabel: 'Spices & Seeds',
    isFeatured: true,
    image: '/images/products/fennel-seeds.jpg',
    alt: 'Green Fennel Seeds (Saunf)',
    shortDescription: 'Sweet green and Lucknowi quality aromatic fennel seeds, carefully color-sorted.'
  },
  {
    id: 'coriander-seeds',
    name: 'Coriander Seeds',
    commonName: 'Dhania / ધાણા',
    category: 'spices-seeds',
    categoryLabel: 'Spices & Seeds',
    isFeatured: true,
    image: '/images/products/coriander-seeds.jpg',
    alt: 'Whole Coriander Seeds (Dhania)',
    shortDescription: 'Clean golden coriander seeds with citrusy, fresh aroma and minimal splits.'
  },
  {
    id: 'fenugreek-seeds',
    name: 'Fenugreek Seeds',
    commonName: 'Methi / મેથી',
    category: 'spices-seeds',
    categoryLabel: 'Spices & Seeds',
    isFeatured: false,
    image: '/images/products/fenugreek-seeds.jpg',
    alt: 'Golden Fenugreek Seeds (Methi)',
    shortDescription: 'Golden-yellow rhombic fenugreek seeds packed with natural aroma and soluble fiber.'
  },
  {
    id: 'sesame-seeds',
    name: 'Sesame Seeds',
    commonName: 'Til / તલ',
    category: 'spices-seeds',
    categoryLabel: 'Spices & Seeds',
    isFeatured: true,
    image: '/images/products/sesame-seeds.jpg',
    alt: 'Natural White & Hulled Sesame Seeds (Til)',
    shortDescription: 'Natural white and mechanically hulled sesame seeds with rich oil content and high purity.'
  },
  {
    id: 'mustard-seeds',
    name: 'Mustard Seeds',
    commonName: 'Rai / Sarson / રાઈ',
    category: 'spices-seeds',
    categoryLabel: 'Spices & Seeds',
    isFeatured: true,
    image: '/images/products/mustard-seeds.jpg',
    alt: 'Bold Black & Yellow Mustard Seeds (Rai)',
    shortDescription: 'Small bold black and yellow mustard seeds with robust pungency and high sinigrin.'
  },
  {
    id: 'black-cumin-seeds',
    name: 'Black Cumin Seeds',
    commonName: 'Kalonji / કલોંજી',
    category: 'spices-seeds',
    categoryLabel: 'Spices & Seeds',
    isFeatured: false,
    image: '/images/products/black-cumin-seeds.jpg',
    alt: 'Black Cumin Seeds / Kalonji (Nigella Sativa)',
    shortDescription: 'Deep black, aromatic nigella seeds prized for culinary seasoning and herbal health.'
  },
  {
    id: 'ajwain-seeds',
    name: 'Ajwain Seeds',
    commonName: 'Carom Seeds / અજમો',
    category: 'spices-seeds',
    categoryLabel: 'Spices & Seeds',
    isFeatured: false,
    image: '/images/products/ajwain-seeds.jpg',
    alt: 'Whole Ajwain Seeds (Carom Seeds)',
    shortDescription: 'Pungent thymol-rich ajwain seeds machine-cleaned and Sortex graded for export.'
  },
  {
    id: 'dill-seeds',
    name: 'Dill Seeds',
    commonName: 'Suva / સુવા દાણા',
    category: 'spices-seeds',
    categoryLabel: 'Spices & Seeds',
    isFeatured: false,
    image: '/images/products/dill-seeds.jpg',
    alt: 'Clean Whole Dill Seeds (Suva)',
    shortDescription: 'Oval light-brown dill seeds with aromatic carvone notes for seasonings and pickles.'
  },
  {
    id: 'chia-seeds',
    name: 'Chia Seeds',
    commonName: 'ચિયા સીડ્સ',
    category: 'spices-seeds',
    categoryLabel: 'Spices & Seeds',
    isFeatured: false,
    image: '/images/products/chia-seeds.jpg',
    alt: 'Raw Natural Chia Seeds',
    shortDescription: 'Clean premium dietary chia seeds rich in Omega-3 fatty acids and soluble fiber.'
  },
  {
    id: 'flax-seeds',
    name: 'Flax Seeds',
    commonName: 'Alsi / અળસી',
    category: 'spices-seeds',
    categoryLabel: 'Spices & Seeds',
    isFeatured: false,
    image: '/images/products/flax-seeds.jpg',
    alt: 'Golden Brown Flax Seeds (Alsi / Linseeds)',
    shortDescription: 'Clean flax seeds packed with lignans, alpha-linolenic acid, and natural plant protein.'
  },
  {
    id: 'basil-seeds',
    name: 'Basil Seeds',
    commonName: 'Sabja / તકમરીયા',
    category: 'spices-seeds',
    categoryLabel: 'Spices & Seeds',
    isFeatured: false,
    image: '/images/products/basil-seeds.jpg',
    alt: 'Clean Black Sweet Basil Seeds (Sabja)',
    shortDescription: 'Pure black sweet basil seeds with high mucilage content and rapid swelling power.'
  },
  {
    id: 'quinoa',
    name: 'Quinoa',
    commonName: 'White Quinoa / કીનોવા',
    category: 'spices-seeds',
    categoryLabel: 'Spices & Seeds',
    isFeatured: false,
    image: '/images/products/quinoa.jpg',
    alt: 'Saponin-Free White Quinoa Grains',
    shortDescription: 'Pre-washed, saponin-free white quinoa grains rich in all 9 essential amino acids.'
  },

  // ==========================================
  // Category 2: Agro & Herbal Products (5 items)
  // ==========================================
  {
    id: 'chickpeas',
    name: 'Chickpeas',
    commonName: 'Kabuli Chana / કાબુલી ચણા',
    category: 'agro-herbal',
    categoryLabel: 'Agro & Herbal Products',
    isFeatured: false,
    image: '/images/products/chickpeas.jpg',
    alt: 'Export Quality White Chickpeas (Kabuli Chana)',
    shortDescription: 'Bold 75-80 and 42-44 count export quality white chickpeas, machine graded and cleaned.'
  },
  {
    id: 'roasted-gram',
    name: 'Roasted Gram',
    commonName: 'Bhuna Chana / શેકેલા ચણા',
    category: 'agro-herbal',
    categoryLabel: 'Agro & Herbal Products',
    isFeatured: false,
    image: '/images/products/roasted-gram.jpg',
    alt: 'Crispy Roasted Yellow Gram (Bhuna Chana)',
    shortDescription: 'Traditionally roasted split and whole golden chana with crispy crunch and high protein.'
  },
  {
    id: 'senna-leaves',
    name: 'Senna Leaves',
    commonName: 'Sonamukhi / સોનામુખી',
    category: 'agro-herbal',
    categoryLabel: 'Agro & Herbal Products',
    isFeatured: false,
    image: '/images/products/senna-leaves.jpg',
    alt: 'Dry Senna Leaves & Pods (Sonamukhi)',
    shortDescription: 'Prime whole dried senna leaves with verified sennosides for herbal extraction and tea.'
  },
  {
    id: 'psyllium-husk',
    name: 'Psyllium Husk',
    commonName: 'Isabgol / ઇસબગોલ',
    category: 'agro-herbal',
    categoryLabel: 'Agro & Herbal Products',
    isFeatured: false,
    image: '/images/products/psyllium-husk.jpg',
    alt: '99% Pure White Psyllium Husk (Isabgol)',
    shortDescription: 'Pure white psyllium husk from Gujarat with superior swelling volume and high purity.'
  },
  {
    id: 'asaliya-seeds',
    name: 'Asaliya Seeds',
    commonName: 'Halim / Garden Cress / આસાળિયો',
    category: 'agro-herbal',
    categoryLabel: 'Agro & Herbal Products',
    isFeatured: false,
    image: '/images/products/asaliya-seeds.jpg',
    alt: 'Natural Asaliya / Halim Seeds (Garden Cress)',
    shortDescription: 'Clean reddish-brown garden cress seeds known for high iron and herbal potency.'
  },

  // ==========================================
  // Category 3: Other Products (7 items)
  // ==========================================
  {
    id: 'turmeric-finger',
    name: 'Turmeric Finger',
    commonName: 'Haldi / હળદર',
    category: 'other-products',
    categoryLabel: 'Other Products',
    isFeatured: true,
    image: '/images/products/turmeric-finger.jpg',
    alt: 'Polished Golden Turmeric Fingers (Haldi)',
    shortDescription: 'High-curcumin double polished golden turmeric fingers direct from prime growing belts.'
  },
  {
    id: 'bay-leaves',
    name: 'Bay Leaves',
    commonName: 'Tej Patta / તમાલપત્ર',
    category: 'other-products',
    categoryLabel: 'Other Products',
    isFeatured: false,
    image: '/images/products/bay-leaves.jpg',
    alt: 'Dried Indian Bay Leaves (Tej Patta)',
    shortDescription: 'Whole dried aromatic bay leaves with deep herbal clove-cinnamon fragrance.'
  },
  {
    id: 'nutmeg',
    name: 'Nutmeg',
    commonName: 'Jaiphal / જાયફળ',
    category: 'other-products',
    categoryLabel: 'Other Products',
    isFeatured: false,
    image: '/images/products/nutmeg.jpg',
    alt: 'Whole Nutmeg with Shell (Jaiphal)',
    shortDescription: 'Extra bold whole nutmegs with rich myristicin oil content and warm sweet aroma.'
  },
  {
    id: 'tamarind',
    name: 'Tamarind',
    commonName: 'Imli / આમલી',
    category: 'other-products',
    categoryLabel: 'Other Products',
    isFeatured: false,
    image: '/images/products/tamarind.jpg',
    alt: 'Natural Seedless Tamarind Pods & Slab (Imli)',
    shortDescription: 'Whole tamarind pods and seedless slabs with tangy tartaric acidity and rich natural pulp.'
  },
  {
    id: 'dry-red-chilli',
    name: 'Dry Red Chilli',
    commonName: 'Lal Mirch / લાલ મરચાં',
    category: 'other-products',
    categoryLabel: 'Other Products',
    isFeatured: false,
    image: '/images/products/dry-red-chilli.jpg',
    alt: 'Sun-Dried Whole Red Chillies (Teja / Sanam)',
    shortDescription: 'Sun-dried S4 Sanam and Teja red chillies with high heat, natural pungency, and rich red colour.'
  },
  {
    id: 'cardamom',
    name: 'Cardamom',
    commonName: 'Elaichi / એલચી',
    category: 'other-products',
    categoryLabel: 'Other Products',
    isFeatured: false,
    image: '/images/products/cardamom.jpg',
    alt: 'Bold Green & Black Cardamom Pods (Elaichi)',
    shortDescription: 'Bold green cardamom pods from the Western Ghats with intense sweet balsamic aroma.'
  },
  {
    id: 'dry-ginger',
    name: 'Dry Ginger',
    commonName: 'Sonth / સૂંઠ',
    category: 'other-products',
    categoryLabel: 'Other Products',
    isFeatured: false,
    image: '/images/products/dry-ginger.jpg',
    alt: 'Whole Dry Ginger Rhizomes (Sonth)',
    shortDescription: 'Hard sun-dried whole ginger rhizomes with high gingerol content and sharp pungent warmth.'
  }
];

export const TRUST_STATS = [
  { value: '25+', label: 'Export Destinations', sub: 'North America, Europe, Gulf, Far East' },
  { value: '15,000+', label: 'MT Annual Capacity', sub: 'State-of-the-art Unjha processing plant' },
  { value: '99.8%', label: 'Sortex Purity Level', sub: 'High-precision optical laser sortexed' },
  { value: '18+', label: 'Years Global Trust', sub: 'Government Recognized Star Export House' }
];

export const CERTIFICATIONS = [
  { name: 'ISO 22000:2018', body: 'Food Safety Management System', code: 'FSMS Certified' },
  { name: 'HACCP', body: 'Hazard Analysis Critical Control Point', code: 'Food Hazard Prevention' },
  { name: 'HALAL India', body: 'Islamic Food Council Standards', code: 'Export Halal Certified' },
  { name: 'APEDA Member', body: 'Govt. of India Agricultural Products', code: 'Reg. RCMC 198421' },
  { name: 'Spices Board of India', body: 'Ministry of Commerce & Industry', code: 'Govt. Verified Exporter' },
  { name: 'US FDA Registered', body: 'United States Food & Drug Admin', code: 'FDA Facility #184920' },
  { name: 'One Star Export House', body: 'Directorate General of Foreign Trade', code: 'DGFT India Recognition' }
];
