"use client"

import { useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import { ovenModels, seriesInfo, shapeTranslations, specLabels, type OvenModel } from '@/lib/oven-data'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Shield, Flame, Square, ChevronLeft, ChevronRight, Ruler, Box, Layers, ZoomIn, X, DoorOpen, Circle } from 'lucide-react'

type FilterType = 'all' | 'titan' | 'titanpro' | 'stonefire' | 'royalflame'

export function OvenCatalog() {
  const { t, language, dir } = useLanguage()
  const [filter, setFilter] = useState<FilterType>('all')
  const [selectedOven, setSelectedOven] = useState<OvenModel | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  
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
      case 'iron': return <Flame className="h-4 w-4" />
      case 'cement': return <Shield className="h-4 w-4" />
      case 'stone': return <Square className="h-4 w-4" />
    }
  }
  
  const getWarrantyColor = (warranty: number) => {
    switch (warranty) {
      case 3: return 'bg-muted text-muted-foreground'
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
    setCurrentImageIndex(0)
    setIsModalOpen(true)
  }
  
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedOven(null)
    setCurrentImageIndex(0)
  }
  
  const handleNextImage = () => {
    if (selectedOven) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedOven.images.length)
    }
  }
  
  const handlePrevImage = () => {
    if (selectedOven) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedOven.images.length) % selectedOven.images.length)
    }
  }
  
  const openLightbox = (imageUrl: string) => {
    setLightboxImage(imageUrl)
    setIsLightboxOpen(true)
  }
  
  const closeLightbox = () => {
    setIsLightboxOpen(false)
    setLightboxImage(null)
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
                        <div className="aspect-[4/3] relative overflow-hidden bg-charcoal/5">
                          <img 
                            src={model.images[0] || "/placeholder.svg"} 
                            alt={`${model.name} - ${t(info.nameKey)}`}
                            className="absolute inset-0 w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
                          <div className="absolute bottom-3 left-3 right-3">
                            <span className="text-2xl font-bold text-cream drop-shadow-lg">{model.name}</span>
                          </div>
                          {/* Image count indicator */}
                          {model.images.length > 1 && (
                            <div className={`absolute top-2 ${dir === 'rtl' ? 'left-2' : 'right-2'} bg-charcoal/70 text-cream text-xs px-2 py-1 rounded-full`}>
                              {model.images.length} {language === 'ar' ? 'صور' : 'photos'}
                            </div>
                          )}
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
        <DialogContent className="bg-card border-charcoal/20 max-w-3xl max-h-[90vh] overflow-y-auto" dir={dir}>
          {selectedOven && (() => {
            const info = seriesInfo[selectedOven.series]
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
                  {/* Image Gallery */}
                  <div className="relative mb-6">
                    <div className="aspect-video relative overflow-hidden rounded-lg group/image cursor-pointer" onClick={() => openLightbox(selectedOven.images[currentImageIndex])}>
                      <img 
                        src={selectedOven.images[currentImageIndex] || "/placeholder.svg"} 
                        alt={`${selectedOven.name} - ${t(info.nameKey)} - ${currentImageIndex + 1}`}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-charcoal/0 group-hover/image:bg-charcoal/30 transition-colors flex items-center justify-center">
                        <div className="opacity-0 group-hover/image:opacity-100 transition-opacity bg-charcoal/70 text-cream px-4 py-2 rounded-lg flex items-center gap-2">
                          <ZoomIn className="h-5 w-5" />
                          <span className="text-sm">{language === 'ar' ? 'تكبير الصورة' : 'Expand Image'}</span>
                        </div>
                      </div>
                      <Badge className={`absolute top-3 ${dir === 'rtl' ? 'left-3' : 'right-3'} ${getWarrantyColor(info.warranty)}`}>
                        <Shield className="h-3 w-3 me-1" />
                        {info.warranty} {t('ovens.warranty')}
                      </Badge>
                    </div>
                    
                    {/* Navigation Arrows */}
                    {selectedOven.images.length > 1 && (
                      <>
                        <button
                          onClick={handlePrevImage}
                          className={`absolute top-1/2 -translate-y-1/2 ${dir === 'rtl' ? 'right-2' : 'left-2'} bg-charcoal/70 hover:bg-charcoal text-cream p-2 rounded-full transition-colors`}
                          aria-label={language === 'ar' ? 'الصورة السابقة' : 'Previous image'}
                        >
                          {dir === 'rtl' ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
                        </button>
                        <button
                          onClick={handleNextImage}
                          className={`absolute top-1/2 -translate-y-1/2 ${dir === 'rtl' ? 'left-2' : 'right-2'} bg-charcoal/70 hover:bg-charcoal text-cream p-2 rounded-full transition-colors`}
                          aria-label={language === 'ar' ? 'الصورة التالية' : 'Next image'}
                        >
                          {dir === 'rtl' ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                        </button>
                      </>
                    )}
                    
                    {/* Image Thumbnails */}
                    {selectedOven.images.length > 1 && (
                      <div className="flex justify-center gap-2 mt-3">
                        {selectedOven.images.map((img, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`w-16 h-12 rounded overflow-hidden border-2 transition-all ${
                              idx === currentImageIndex 
                                ? 'border-terracotta' 
                                : 'border-transparent opacity-60 hover:opacity-100'
                            }`}
                          >
                            <img 
                              src={img || "/placeholder.svg"} 
                              alt={`${selectedOven.name} thumbnail ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Specifications Table */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-charcoal mb-4 flex items-center gap-2">
                      <Ruler className="h-5 w-5 text-terracotta" />
                      {language === 'ar' ? 'المواصفات التفصيلية' : 'Detailed Specifications'}
                    </h4>
                    <div className="bg-cream rounded-lg overflow-hidden">
                      <table className="w-full">
                        <tbody>
                          <tr className="border-b border-charcoal/10">
                            <td className="py-3 px-4 font-medium text-charcoal bg-charcoal/5 w-1/2">
                              <div className="flex items-center gap-2">
                                <Ruler className="h-4 w-4 text-terracotta" />
                                {specLabels.totalHeight[language]}
                              </div>
                            </td>
                            <td className="py-3 px-4 text-muted-foreground">
                              {selectedOven.specs.totalHeight}
                            </td>
                          </tr>
                          <tr className="border-b border-charcoal/10">
                            <td className="py-3 px-4 font-medium text-charcoal bg-charcoal/5">
                              <div className="flex items-center gap-2">
                                <Circle className="h-4 w-4 text-terracotta" />
                                {specLabels.shape[language]}
                              </div>
                            </td>
                            <td className="py-3 px-4 text-muted-foreground">
                              {shapeTranslations[selectedOven.specs.shape][language]}
                            </td>
                          </tr>
                          <tr className="border-b border-charcoal/10">
                            <td className="py-3 px-4 font-medium text-charcoal bg-charcoal/5">
                              <div className="flex items-center gap-2">
                                <DoorOpen className="h-4 w-4 text-terracotta" />
                                {specLabels.doorDimensions[language]}
                              </div>
                            </td>
                            <td className="py-3 px-4 text-muted-foreground">
                              {selectedOven.specs.doorDimensions}
                            </td>
                          </tr>
                          <tr className="border-b border-charcoal/10">
                            <td className="py-3 px-4 font-medium text-charcoal bg-charcoal/5">
                              <div className="flex items-center gap-2">
                                <Layers className="h-4 w-4 text-terracotta" />
                                {specLabels.interiorMaterial[language]}
                              </div>
                            </td>
                            <td className="py-3 px-4 text-muted-foreground">
                              {selectedOven.specs.interiorMaterial}
                            </td>
                          </tr>
                          <tr className="border-b border-charcoal/10">
                            <td className="py-3 px-4 font-medium text-charcoal bg-charcoal/5">
                              <div className="flex items-center gap-2">
                                <Ruler className="h-4 w-4 text-terracotta" />
                                {specLabels.interiorHeight[language]}
                              </div>
                            </td>
                            <td className="py-3 px-4 text-muted-foreground">
                              {selectedOven.specs.interiorHeight}
                            </td>
                          </tr>
                          <tr className="border-b border-charcoal/10">
                            <td className="py-3 px-4 font-medium text-charcoal bg-charcoal/5">
                              <div className="flex items-center gap-2">
                                <Box className="h-4 w-4 text-terracotta" />
                                {specLabels.interiorDimensions[language]}
                              </div>
                            </td>
                            <td className="py-3 px-4 text-muted-foreground">
                              {selectedOven.specs.interiorDimensions}
                            </td>
                          </tr>
                          <tr className="border-b border-charcoal/10">
                            <td className="py-3 px-4 font-medium text-charcoal bg-charcoal/5">
                              <div className="flex items-center gap-2">
                                <Box className="h-4 w-4 text-terracotta" />
                                {specLabels.exteriorDimensions[language]}
                              </div>
                            </td>
                            <td className="py-3 px-4 text-muted-foreground">
                              {selectedOven.specs.exteriorDimensions}
                            </td>
                          </tr>
                          <tr>
                            <td className="py-3 px-4 font-medium text-charcoal bg-charcoal/5">
                              <div className="flex items-center gap-2">
                                <Shield className="h-4 w-4 text-terracotta" />
                                {specLabels.warranty[language]}
                              </div>
                            </td>
                            <td className="py-3 px-4 text-muted-foreground">
                              {selectedOven.specs.warranty} {language === 'ar' ? 'سنوات' : 'Years'}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
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
      
      {/* Fullscreen Image Lightbox */}
      {isLightboxOpen && lightboxImage && (
        <div 
          className="fixed inset-0 z-[100] bg-charcoal/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 bg-cream/10 hover:bg-cream/20 text-cream p-3 rounded-full transition-colors"
            aria-label={language === 'ar' ? 'إغلاق' : 'Close'}
          >
            <X className="h-6 w-6" />
          </button>
          
          {/* Image Counter */}
          {selectedOven && selectedOven.images.length > 1 && (
            <div className="absolute top-4 left-4 bg-charcoal/70 text-cream px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {selectedOven.images.length}
            </div>
          )}
          
          {/* Navigation Arrows in Lightbox */}
          {selectedOven && selectedOven.images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handlePrevImage()
                  setLightboxImage(selectedOven.images[(currentImageIndex - 1 + selectedOven.images.length) % selectedOven.images.length])
                }}
                className={`absolute top-1/2 -translate-y-1/2 ${dir === 'rtl' ? 'right-4' : 'left-4'} bg-cream/10 hover:bg-cream/20 text-cream p-3 rounded-full transition-colors`}
                aria-label={language === 'ar' ? 'الصورة السابقة' : 'Previous image'}
              >
                {dir === 'rtl' ? <ChevronRight className="h-8 w-8" /> : <ChevronLeft className="h-8 w-8" />}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleNextImage()
                  setLightboxImage(selectedOven.images[(currentImageIndex + 1) % selectedOven.images.length])
                }}
                className={`absolute top-1/2 -translate-y-1/2 ${dir === 'rtl' ? 'left-4' : 'right-4'} bg-cream/10 hover:bg-cream/20 text-cream p-3 rounded-full transition-colors`}
                aria-label={language === 'ar' ? 'الصورة التالية' : 'Next image'}
              >
                {dir === 'rtl' ? <ChevronLeft className="h-8 w-8" /> : <ChevronRight className="h-8 w-8" />}
              </button>
            </>
          )}
          
          {/* Full Size Image */}
          <img 
            src={lightboxImage || "/placeholder.svg"} 
            alt={selectedOven ? `${selectedOven.name} - Full Size` : 'Oven image'}
            className="max-w-[90vw] max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          
          {/* Thumbnail Strip in Lightbox */}
          {selectedOven && selectedOven.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-charcoal/70 p-2 rounded-lg">
              {selectedOven.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentImageIndex(idx)
                    setLightboxImage(img)
                  }}
                  className={`w-16 h-12 rounded overflow-hidden border-2 transition-all ${
                    idx === currentImageIndex 
                      ? 'border-terracotta' 
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img 
                    src={img || "/placeholder.svg"} 
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  )
}
