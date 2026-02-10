"use client"

import { useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Flame, Wrench } from 'lucide-react'

interface Product {
  id: string
  nameKey: string
  descriptionKey: string
  image: string
  features: string[]
  featuresAr: string[]
}

const smokers: Product[] = [
  {
    id: 'smoker-classic',
    nameKey: 'smoker.classic.name',
    descriptionKey: 'smoker.classic.description',
    image: '/images/smokers/smoker-classic.jpg',
    features: ['Offset firebox', 'Heavy-duty steel', 'Adjustable vents', 'Temperature gauge'],
    featuresAr: ['صندوق نار جانبي', 'فولاذ شديد التحمل', 'فتحات قابلة للتعديل', 'مقياس حرارة'],
  },
  {
    id: 'grill-charcoal',
    nameKey: 'smoker.vertical.name',
    descriptionKey: 'smoker.vertical.description',
    image: '/images/smokers/smoker-vertical.jpg',
    features: ['Brick & steel build', 'Built-in chimney', 'Multi-level grates', 'Open-flame cooking'],
    featuresAr: ['بناء طوب وفولاذ', 'مدخنة مدمجة', 'شبكات متعددة المستويات', 'طهي على اللهب المفتوح'],
  },
  {
    id: 'smoker-barrel',
    nameKey: 'smoker.barrel.name',
    descriptionKey: 'smoker.barrel.description',
    image: '/images/smokers/smoker-barrel.jpg',
    features: ['Large capacity', 'Chrome grates', 'Mobile wheels', 'Dual dampers'],
    featuresAr: ['سعة كبيرة', 'شبكات كروم', 'عجلات متحركة', 'مخمدات مزدوجة'],
  },
]

const accessories: Product[] = [
  {
    id: 'pizza-peel',
    nameKey: 'accessory.peel.name',
    descriptionKey: 'accessory.peel.description',
    image: '/images/accessories/pizza-peel.jpg',
    features: ['Aluminum & wood', 'Long handles', 'Perforated design', 'Multiple sizes'],
    featuresAr: ['ألومنيوم وخشب', 'مقابض طويلة', 'تصميم مثقب', 'أحجام متعددة'],
  },
  {
    id: 'thermometer',
    nameKey: 'accessory.thermometer.name',
    descriptionKey: 'accessory.thermometer.description',
    image: '/images/accessories/thermometer.jpg',
    features: ['Infrared gun', 'Digital probe', 'Dial gauge', 'High accuracy'],
    featuresAr: ['مسدس أشعة تحت الحمراء', 'مسبار رقمي', 'مقياس قرصي', 'دقة عالية'],
  },
  {
    id: 'oven-cover',
    nameKey: 'accessory.cover.name',
    descriptionKey: 'accessory.cover.description',
    image: '/images/accessories/oven-cover.jpg',
    features: ['Waterproof', 'UV resistant', 'Custom fit', 'Heavy-duty fabric'],
    featuresAr: ['مقاوم للماء', 'مقاوم للأشعة فوق البنفسجية', 'مقاس مخصص', 'قماش شديد التحمل'],
  },
  {
    id: 'cleaning-tools',
    nameKey: 'accessory.cleaning.name',
    descriptionKey: 'accessory.cleaning.description',
    image: '/images/accessories/cleaning-tools.jpg',
    features: ['Brass brush', 'Ash scraper', 'Long handles', 'Complete set'],
    featuresAr: ['فرشاة نحاسية', 'مكشطة الرماد', 'مقابض طويلة', 'طقم كامل'],
  },
]

// Translation keys for product names and descriptions
const productTranslations: Record<string, { en: string; ar: string }> = {
  'smoker.classic.name': { en: 'Classic Offset Smoker', ar: 'مدخنة كلاسيكية جانبية' },
  'smoker.classic.description': { en: 'Traditional offset smoker with heavy-duty construction for authentic wood-fired flavor.', ar: 'مدخنة جانبية تقليدية بتصميم متين للنكهة الأصيلة على الحطب.' },
  'smoker.vertical.name': { en: 'Charcoal Brick Grill', ar: 'شواية فحم من الطوب' },
  'smoker.vertical.description': { en: 'Built-in charcoal grill with brick and steel construction, featuring multi-level grates and a powerful chimney for superior airflow.', ar: 'شواية فحم مدمجة بتصميم من الطوب والفولاذ، مع شبكات متعددة المستويات ومدخنة قوية لتدفق هواء ممتاز.' },
  'smoker.barrel.name': { en: 'Barrel Drum Smoker', ar: 'مدخنة برميلية' },
  'smoker.barrel.description': { en: 'High-capacity barrel smoker perfect for events and commercial use.', ar: 'مدخنة برميلية كبيرة السعة مثالية للمناسبات والاستخدام التجاري.' },
  'accessory.peel.name': { en: 'Pizza Peels Set', ar: 'طقم مجارف البيتزا' },
  'accessory.peel.description': { en: 'Professional-grade pizza peels in aluminum and wood for perfect pizza handling.', ar: 'مجارف بيتزا احترافية من الألومنيوم والخشب للتعامل المثالي مع البيتزا.' },
  'accessory.thermometer.name': { en: 'Thermometer Kit', ar: 'طقم موازين الحرارة' },
  'accessory.thermometer.description': { en: 'Complete temperature monitoring kit for precise cooking control.', ar: 'طقم كامل لقياس الحرارة للتحكم الدقيق في الطهي.' },
  'accessory.cover.name': { en: 'Premium Oven Cover', ar: 'غطاء فرن فاخر' },
  'accessory.cover.description': { en: 'Heavy-duty weatherproof cover to protect your oven investment.', ar: 'غطاء متين مقاوم للعوامل الجوية لحماية استثمارك في الفرن.' },
  'accessory.cleaning.name': { en: 'Cleaning Tools Set', ar: 'طقم أدوات التنظيف' },
  'accessory.cleaning.description': { en: 'Complete maintenance kit to keep your oven in pristine condition.', ar: 'طقم صيانة كامل للحفاظ على فرنك في حالة ممتازة.' },
}

function ProductCard({ product, onClick, language }: { product: Product; onClick: () => void; language: 'en' | 'ar' }) {
  const name = productTranslations[product.nameKey]?.[language] || product.nameKey
  
  return (
    <Card 
      className="bg-cream/5 border-cream/10 hover:bg-cream/10 transition-all cursor-pointer group overflow-hidden"
      onClick={onClick}
    >
      <div className="aspect-[4/3] relative overflow-hidden bg-white">
        <img 
          src={product.image || "/placeholder.svg"} 
          alt={name}
          className="absolute inset-0 w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-lg font-bold text-cream drop-shadow-lg">{name}</h3>
        </div>
      </div>
      <CardContent className="py-3 px-4">
        <p className="text-cream/60 text-sm line-clamp-2">
          {productTranslations[product.descriptionKey]?.[language]}
        </p>
      </CardContent>
    </Card>
  )
}

function ProductModal({ 
  product, 
  isOpen, 
  onClose, 
  language,
  dir 
}: { 
  product: Product | null
  isOpen: boolean
  onClose: () => void
  language: 'en' | 'ar'
  dir: 'ltr' | 'rtl'
}) {
  if (!product) return null
  
  const name = productTranslations[product.nameKey]?.[language] || product.nameKey
  const description = productTranslations[product.descriptionKey]?.[language] || product.descriptionKey
  const features = dir === 'rtl' ? product.featuresAr : product.features
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-charcoal border-cream/20 max-w-2xl" dir={dir}>
        <DialogHeader>
          <DialogTitle className="text-2xl text-cream">{name}</DialogTitle>
          <DialogDescription className="text-cream/70">{description}</DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          <div className="aspect-video relative overflow-hidden rounded-lg mb-6 bg-white">
            <img 
              src={product.image || "/placeholder.svg"} 
              alt={name}
              className="absolute inset-0 w-full h-full object-contain"
            />
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-cream">
              {language === 'ar' ? 'المميزات' : 'Features'}
            </h4>
            <div className="flex flex-wrap gap-2">
              {features.map((feature, i) => (
                <span 
                  key={i}
                  className="inline-flex items-center rounded-full bg-gold/10 px-3 py-1.5 text-sm text-gold"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
          
          <div className="mt-6 flex gap-3">
            <Button 
              className="flex-1 bg-terracotta hover:bg-terracotta-dark text-cream"
              onClick={() => {
                const contactSection = document.getElementById('contact')
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' })
                }
                onClose()
              }}
            >
              {language === 'ar' ? 'اطلب الآن' : 'Request Quote'}
            </Button>
            <Button 
              variant="outline" 
              className="border-cream/20 text-cream hover:bg-cream/10 bg-transparent"
              onClick={onClose}
            >
              {language === 'ar' ? 'إغلاق' : 'Close'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function Extensions() {
  const { t, language, dir } = useLanguage()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }
  
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }
  
  return (
    <section id="extensions" className="py-20 sm:py-32 bg-charcoal" dir={dir}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cream mb-4 text-balance">
            {t('extensions.title')}
          </h2>
          <p className="text-lg text-cream/70 max-w-2xl mx-auto">
            {t('extensions.subtitle')}
          </p>
        </div>
        
        {/* Smokers Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-terracotta/20">
              <Flame className="h-6 w-6 text-terracotta" />
            </div>
            <h3 className="text-2xl font-bold text-cream">{t('smokers.title')}</h3>
          </div>
          <p className="text-cream/70 mb-8 max-w-3xl">
            {t('smokers.description')}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {smokers.map((smoker) => (
              <ProductCard 
                key={smoker.id} 
                product={smoker} 
                onClick={() => handleProductClick(smoker)}
                language={language}
              />
            ))}
          </div>
        </div>
        
        {/* Accessories Section */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/20">
              <Wrench className="h-6 w-6 text-gold" />
            </div>
            <h3 className="text-2xl font-bold text-cream">{t('accessories.title')}</h3>
          </div>
          <p className="text-cream/70 mb-8 max-w-3xl">
            {t('accessories.description')}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {accessories.map((accessory) => (
              <ProductCard 
                key={accessory.id} 
                product={accessory} 
                onClick={() => handleProductClick(accessory)}
                language={language}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Product Modal */}
      <ProductModal 
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        language={language}
        dir={dir}
      />
    </section>
  )
}
