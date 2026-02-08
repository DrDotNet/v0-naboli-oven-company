export interface OvenSpecs {
  totalHeight: string // الارتفاع الكلي
  shape: 'circular' | 'cylindrical' // الشكل - دائري / اسطواني
  interiorMaterial: string // المادة الداخلية
  interiorHeight: string // الارتفاع الداخلي
  interiorDimensions: string // المقاس الداخلي/سم
  exteriorDimensions: string // المقاس الخارجي/سم
  warranty: number // الضمان بالسنوات
}

export interface OvenModel {
  id: string
  name: string
  series: 'titan' | 'titanpro' | 'stonefire' | 'royalflame'
  interior: 'iron_stone' | 'refractory_cement' | 'rectangular_stone' | 'circular_stone'
  warranty: 3 | 10
  images: string[] // Multiple images per model
  specs: OvenSpecs
}

// Array of available oven images to cycle through
const ovenImages = [
  '/images/ovens/oven-1.jpg', 
  '/images/ovens/oven-2.jpg',
  '/images/ovens/oven-3.jpg',
  '/images/ovens/oven-4.jpg',
  '/images/ovens/oven-5.jpg',
  '/images/ovens/oven-401.jpg',
  '/images/ovens/oven-501.jpg',
  '/images/ovens/oven-506.jpg',
  '/images/ovens/oven-509.jpg',
  '/images/ovens/oven-513.jpg',
  '/images/ovens/oven-516.jpg',
  '/images/ovens/oven-523.jpg',
  '/images/ovens/oven-527.jpg',
  '/images/ovens/oven-547.jpg',
  '/images/ovens/oven-556.jpg'
]

export const ovenModels: OvenModel[] = [
  // Titan Series - 3 year warranty
  { 
    id: 'TO65', 
    name: 'TO65', 
    series: 'titan', 
    interior: 'iron_stone', 
    warranty: 3, 
    images: [ovenImages[7]],
    specs: {
      totalHeight: '170 سم',
      shape: 'circular',
      interiorMaterial: 'باطون حراري داخلي',
      interiorHeight: '40 سم',
      interiorDimensions: 'قطر 66',
      exteriorDimensions: '100×100',
      warranty: 3,
    }
  },
  { 
    id: 'TO50', 
    name: 'TO50', 
    series: 'titan', 
    interior: 'iron_stone', 
    warranty: 3, 
    images: [ovenImages[7]],
    specs: {
      totalHeight: '171 سم',
      shape: 'cylindrical',
      interiorMaterial: 'حديد داخلي',
      interiorHeight: '50 سم',
      interiorDimensions: '60×40',
      exteriorDimensions: '80×73',
      warranty: 3,
    }
  },

  // Titan Pro Series - 3 year warranty
  { 
    id: 'TP40', 
    name: 'TP40', 
    series: 'titanpro', 
    interior: 'refractory_cement', 
    warranty: 3, 
    images: [ovenImages[8]],
    specs: {
      totalHeight: '172 سم',
      shape: 'cylindrical',
      interiorMaterial: 'باطون حراري داخلي',
      interiorHeight: '30 سم',
      interiorDimensions: '40×50',
      exteriorDimensions: '70×75',
      warranty: 3,
    }
  },
  { 
    id: 'TP80', 
    name: 'TP80', 
    series: 'titanpro', 
    interior: 'refractory_cement', 
    warranty: 3, 
    images: [ovenImages[11]],
    specs: {
      totalHeight: '174 سم',
      shape: 'circular',
      interiorMaterial: 'باطون حراري داخلي',
      interiorHeight: '30 سم',
      interiorDimensions: 'قطر 60 سم',
      exteriorDimensions: '90×90',
      warranty: 3,
    }
  },
  
  // StoneFire Series - 10 year warranty
  { 
    id: 'SF40', 
    name: 'SF40', 
    series: 'stonefire', 
    interior: 'rectangular_stone', 
    warranty: 10, 
    images: [ovenImages[0], ovenImages[2], ovenImages[4]],
    specs: {
      totalHeight: '175 سم',
      shape: 'cylindrical',
      interiorMaterial: 'باطون حراري داخلي',
      interiorHeight: '25 سم',
      interiorDimensions: '65×70',
      exteriorDimensions: '80×80',
      warranty: 10,
    }
  },
  { 
    id: 'SF60', 
    name: 'SF60', 
    series: 'stonefire', 
    interior: 'rectangular_stone', 
    warranty: 10, 
    images: [ovenImages[1], ovenImages[3], ovenImages[0]],
    specs: {
      totalHeight: '176 سم',
      shape: 'circular',
      interiorMaterial: 'باطون حراري داخلي',
      interiorHeight: '30 سم',
      interiorDimensions: 'قطر 60 سم',
      exteriorDimensions: '90×90',
      warranty: 10,
    }
  },
  { 
    id: 'SF75', 
    name: 'SF75', 
    series: 'stonefire', 
    interior: 'rectangular_stone', 
    warranty: 10, 
    images: [ovenImages[2], ovenImages[4], ovenImages[1]],
    specs: {
      totalHeight: '2م',
      shape: 'cylindrical',
      interiorMaterial: 'باطون حراري داخلي',
      interiorHeight: '28 سم',
      interiorDimensions: '50×40',
      exteriorDimensions: '80×75',
      warranty: 10,
    }
  },
  { 
    id: 'SF90', 
    name: 'SF90', 
    series: 'stonefire', 
    interior: 'rectangular_stone', 
    warranty: 10, 
    images: [ovenImages[3], ovenImages[0], ovenImages[2]],
    specs: {
      totalHeight: '190 سم',
      shape: 'cylindrical',
      interiorMaterial: 'حجر حراري داخلي',
      interiorHeight: '47 سم',
      interiorDimensions: '100×100',
      exteriorDimensions: '140×140',
      warranty: 10,
    }
  },
  { 
    id: 'SF1.0', 
    name: 'SF1.0', 
    series: 'stonefire', 
    interior: 'rectangular_stone', 
    warranty: 10, 
    images: [ovenImages[4], ovenImages[1], ovenImages[3]],
    specs: {
      totalHeight: '190 سم',
      shape: 'cylindrical',
      interiorMaterial: 'حجر حراري داخلي',
      interiorHeight: '37 سم',
      interiorDimensions: '75×90',
      exteriorDimensions: '120×115',
      warranty: 10,
    }
  },
  
  // Royal Flame Series - 10 year warranty
  { 
    id: 'RF70', 
    name: 'RF70', 
    series: 'royalflame', 
    interior: 'circular_stone', 
    warranty: 10, 
    images: [ovenImages[6]],
    specs: {
      totalHeight: '170 سم',
      shape: 'circular',
      interiorMaterial: 'باطون حراري داخلي',
      interiorHeight: '40 سم',
      interiorDimensions: 'قطر 66',
      exteriorDimensions: '100×100',
      warranty: 10,
    }
  },
  { 
    id: 'RF80', 
    name: 'RF80', 
    series: 'royalflame', 
    interior: 'circular_stone', 
    warranty: 10, 
    images: [ovenImages[14]],
    specs: {
      totalHeight: '175 سم',
      shape: 'circular',
      interiorMaterial: 'حجر حراري داخلي',
      interiorHeight: '45 سم',
      interiorDimensions: 'قطر 80',
      exteriorDimensions: '110×110',
      warranty: 10,
    }
  }
]

export const seriesInfo = {
  titan: {
    nameKey: 'titan.name',
    descriptionKey: 'titan.description',
    warranty: 3,
  },
  titanpro: {
    nameKey: 'titanpro.name',
    descriptionKey: 'titanpro.description',
    warranty: 3,
  },
  stonefire: {
    nameKey: 'stonefire.name',
    descriptionKey: 'stonefire.description',
    warranty: 10,
  },
  royalflame: {
    nameKey: 'royalflame.name',
    descriptionKey: 'royalflame.description',
    warranty: 10,
  },
}

// Shape translations
export const shapeTranslations = {
  circular: { en: 'Circular', ar: 'دائري' },
  cylindrical: { en: 'Cylindrical', ar: 'اسطواني' },
}

// Spec labels translations
export const specLabels = {
  totalHeight: { en: 'Total Height', ar: 'الارتفاع الكلي' },
  shape: { en: 'Shape', ar: 'الشكل' },
  interiorMaterial: { en: 'Interior Material', ar: 'المادة الداخلية' },
  interiorHeight: { en: 'Interior Height', ar: 'الارتفاع الداخلي' },
  interiorDimensions: { en: 'Interior Dimensions (cm)', ar: 'المقاس الداخلي/سم' },
  exteriorDimensions: { en: 'Exterior Dimensions (cm)', ar: 'المقاس الخارجي/سم' },
  warranty: { en: 'Warranty', ar: 'الضمان' },
}
