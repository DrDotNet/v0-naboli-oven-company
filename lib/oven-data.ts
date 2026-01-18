export interface OvenModel {
  id: string
  name: string
  series: 'titan' | 'titanpro' | 'stonefire' | 'royalflame'
  interior: 'iron_stone' | 'refractory_cement' | 'rectangular_stone' | 'circular_stone'
  warranty: 3 | 6 | 10
  image: string
}

// Array of available oven images to cycle through
const ovenImages = [
  '/images/ovens/oven-1.jpg',
  '/images/ovens/oven-2.jpg',
  '/images/ovens/oven-3.jpg',
  '/images/ovens/oven-4.jpg',
  '/images/ovens/oven-5.jpg',
]

export const ovenModels: OvenModel[] = [
  // Titan Series - 3 year warranty
  { id: 'TO65', name: 'TO65', series: 'titan', interior: 'iron_stone', warranty: 3, image: ovenImages[0] },
  { id: 'TO50', name: 'TO50', series: 'titan', interior: 'iron_stone', warranty: 3, image: ovenImages[1] },
  
  // Titan Pro Series - 6 year warranty
  { id: 'TP40', name: 'TP40', series: 'titanpro', interior: 'refractory_cement', warranty: 6, image: ovenImages[2] },
  { id: 'TP80', name: 'TP80', series: 'titanpro', interior: 'refractory_cement', warranty: 6, image: ovenImages[3] },
  { id: 'TP60', name: 'TP60', series: 'titanpro', interior: 'refractory_cement', warranty: 6, image: ovenImages[4] },
  
  // StoneFire Series - 10 year warranty
  { id: 'SF40', name: 'SF40', series: 'stonefire', interior: 'rectangular_stone', warranty: 10, image: ovenImages[0] },
  { id: 'SF60', name: 'SF60', series: 'stonefire', interior: 'rectangular_stone', warranty: 10, image: ovenImages[1] },
  { id: 'SF75', name: 'SF75', series: 'stonefire', interior: 'rectangular_stone', warranty: 10, image: ovenImages[2] },
  { id: 'SF90', name: 'SF90', series: 'stonefire', interior: 'rectangular_stone', warranty: 10, image: ovenImages[3] },
  { id: 'SF1.0', name: 'SF1.0', series: 'stonefire', interior: 'rectangular_stone', warranty: 10, image: ovenImages[4] },
  
  // Royal Flame Series - 10 year warranty
  { id: 'RF70', name: 'RF70', series: 'royalflame', interior: 'circular_stone', warranty: 10, image: ovenImages[0] },
  { id: 'RF80', name: 'RF80', series: 'royalflame', interior: 'circular_stone', warranty: 10, image: ovenImages[1] },
  { id: 'RF1.0', name: 'RF1.0', series: 'royalflame', interior: 'circular_stone', warranty: 10, image: ovenImages[2] },
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
    warranty: 6,
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
