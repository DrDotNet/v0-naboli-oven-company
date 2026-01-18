"use client"

import { useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import { ovenModels, seriesInfo, type OvenModel } from '@/lib/oven-data'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Shield, Flame, Circle, Square, Check } from 'lucide-react'

type FilterType = 'all' | 'titan' | 'titanpro' | 'stonefire' | 'royalflame'

export function OvenCatalog() {
  const { t, language, dir } = useLanguage()
  const [filter, setFilter] = useState<FilterType>('all')
  const [selectedOven, setSelectedOven] = useState<OvenModel | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: t('ovens.filter.all') },
    { key: 'titan', label: t('titan.name') },
    { key: 'titanpro', label: t('titanpro.name') },
    { key: 'stonefire', label: t('stonefire.name') },
    { key: 'royalflame', label: t('royalflame.name') },
  ]
  
  const filteredModels = filter === 'all' 
    ? ovenModels 
    : ovenModels.filter(m => m.series === filter)
  
  // Group by series for display
  const groupedModels = filteredModels.reduce((acc, model) => {
    if (!acc[model.series]) {
      acc[model.series] = []
    }
    acc[model.series].push(model)
    return acc
  }, {} as Record<string, OvenModel[]>)
  
  const getInteriorIcon = (interior: OvenModel['interior']) => {
    switch (interior) {
      case 'iron_stone': return <Flame className="h-4 w-4" />
      case 'refractory_cement': return <Shield className="h-4 w-4" />
      case 'rectangular_stone': return <Square className="h-4 w-4" />
      case 'circular_stone': return <Circle className="h-4 w-4" />
    }
  }
  
  const getWarrantyColor = (warranty: number) => {
    switch (warranty) {
      case 3: return 'bg-muted text-muted-foreground'
      case 6: return 'bg-gold/20 text-gold'
      case 10: return 'bg-terracotta/20 text-terracotta'
      default: return 'bg-muted text-muted-foreground'
    }
  }
  
  const scrollToContact = () => {
    const element = document.querySelector('#contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
  
  const handleViewDetails = (model: OvenModel) => {
    setSelectedOven(model)
    setIsModalOpen(true)
  }
  
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedOven(null)
  }
  
  // Features for each series
  const seriesFeatures: Record<string, { en: string[]; ar: string[] }> = {
    titan: {
      en: ['Iron stone interior', 'Quick heat-up', 'Compact design', '3-year warranty'],
      ar: ['داخلية من الحجر الحديدي', 'تسخين سريع', 'تصميم مدمج', 'ضمان 3 سنوات'],
    },
    titanpro: {
      en: ['Refractory cement interior', 'Professional grade', 'Enhanced insulation', '6-year warranty'],
      ar: ['داخلية من الإسمنت الحراري', 'جودة احترافية', 'عزل محسّن', 'ضمان 6 سنوات'],
    },
    stonefire: {
      en: ['Rectangular stone interior', 'Superior heat retention', 'Premium construction', '10-year warranty'],
      ar: ['داخلية من الحجر المستطيل', 'احتفاظ فائق بالحرارة', 'بناء فاخر', 'ضمان 10 سنوات'],
    },
    royalflame: {
      en: ['Circular stone interior', 'Traditional dome design', 'Ultimate performance', '10-year warranty'],
      ar: ['داخلية من الحجر الدائري', 'تصميم قبة تقليدي', 'أداء استثنائي', 'ضمان 10 سنوات'],
    },
  }
  
  return (
    <section id="ovens" className="py-20 sm:py-32 bg-cream" dir={dir}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal mb-4 text-balance">
            {t('ovens.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('ovens.subtitle')}
          </p>
        </div>
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((f) => (
            <Button
              key={f.key}
              variant={filter === f.key ? 'default' : 'outline'}
              onClick={() => setFilter(f.key)}
              className={filter === f.key 
                ? 'bg-charcoal text-cream hover:bg-charcoal/90' 
                : 'border-charcoal/20 text-charcoal hover:bg-charcoal/5 bg-transparent'}
            >
              {f.label}
            </Button>
          ))}
        </div>
        
        {/* Oven Series Cards */}
        <div className="space-y-16">
          {Object.entries(groupedModels).map(([series, models]) => {
            const info = seriesInfo[series as keyof typeof seriesInfo]
            return (
              <div key={series} className="space-y-6">
                {/* Series Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-charcoal/10 pb-4">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-charcoal">
                      {t(info.nameKey)}
                    </h3>
                    <p className="text-muted-foreground mt-1 max-w-xl">
                      {t(info.descriptionKey)}
                    </p>
                  </div>
                  <Badge className={`${getWarrantyColor(info.warranty)} self-start sm:self-auto`}>
                    <Shield className="h-3 w-3 me-1" />
                    {info.warranty} {t('ovens.warranty')}
                  </Badge>
                </div>
                
                {/* Model Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {models.map((model) => (
                    <Card key={model.id} className="bg-card border-charcoal/10 hover:shadow-lg transition-shadow group overflow-hidden">
                      <CardHeader className="p-0">
                        {/* Oven Image */}
                        <div className="aspect-[4/3] relative overflow-hidden">
                          <img 
                            src={model.image || "/placeholder.svg"} 
                            alt={`${model.name} - ${t(info.nameKey)}`}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
                          <div className="absolute bottom-3 left-3 right-3">
                            <span className="text-2xl font-bold text-cream drop-shadow-lg">{model.name}</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="py-3 px-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          {getInteriorIcon(model.interior)}
                          <span>{t('ovens.interior')}: {t(`interior.${model.interior}`)}</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          variant="outline" 
                          className="w-full border-terracotta text-terracotta hover:bg-terracotta hover:text-cream bg-transparent"
                          onClick={() => handleViewDetails(model)}
                        >
                          {t('ovens.viewDetails')}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      
      {/* Oven Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="bg-card border-charcoal/20 max-w-2xl" dir={dir}>
          {selectedOven && (() => {
            const info = seriesInfo[selectedOven.series]
            const features = seriesFeatures[selectedOven.series]?.[language] || []
            return (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl text-charcoal">
                    {selectedOven.name} - {t(info.nameKey)}
                  </DialogTitle>
                  <DialogDescription className="text-muted-foreground">
                    {t(info.descriptionKey)}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="mt-4">
                  <div className="aspect-video relative overflow-hidden rounded-lg mb-6">
                    <img 
                      src={selectedOven.image || "/placeholder.svg"} 
                      alt={`${selectedOven.name} - ${t(info.nameKey)}`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <Badge className={`absolute top-3 ${dir === 'rtl' ? 'left-3' : 'right-3'} ${getWarrantyColor(info.warranty)}`}>
                      <Shield className="h-3 w-3 me-1" />
                      {info.warranty} {t('ovens.warranty')}
                    </Badge>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-semibold text-charcoal mb-2">
                        {language === 'ar' ? 'نوع البطانة الداخلية' : 'Interior Type'}
                      </h4>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        {getInteriorIcon(selectedOven.interior)}
                        <span>{t(`interior.${selectedOven.interior}`)}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-charcoal mb-2">
                        {language === 'ar' ? 'المميزات' : 'Features'}
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-2 text-muted-foreground">
                            <Check className="h-4 w-4 text-terracotta flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex gap-3">
                    <Button 
                      className="flex-1 bg-terracotta hover:bg-terracotta-dark text-cream"
                      onClick={() => {
                        handleCloseModal()
                        scrollToContact()
                      }}
                    >
                      {language === 'ar' ? 'اطلب عرض سعر' : 'Request Quote'}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-charcoal/20 text-charcoal hover:bg-charcoal/5 bg-transparent"
                      onClick={handleCloseModal}
                    >
                      {language === 'ar' ? 'إغلاق' : 'Close'}
                    </Button>
                  </div>
                </div>
              </>
            )
          })()}
        </DialogContent>
      </Dialog>
    </section>
  )
}
