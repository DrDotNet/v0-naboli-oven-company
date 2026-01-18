"use client"

import { useLanguage } from '@/lib/language-context'
import { Card } from '@/components/ui/card'
import { MapPin } from 'lucide-react'

export function Gallery() {
  const { t, dir, language } = useLanguage()
  
  const projects = [
    { 
      location: language === 'ar' ? 'الرياض، السعودية' : 'Riyadh, Saudi Arabia',
      type: language === 'ar' ? 'مطعم فاخر' : 'Fine Dining Restaurant',
      image: '/images/gallery/project-1.jpg'
    },
    { 
      location: language === 'ar' ? 'دبي، الإمارات' : 'Dubai, UAE',
      type: language === 'ar' ? 'فندق 5 نجوم' : '5-Star Hotel',
      image: '/images/gallery/project-2.jpg'
    },
    { 
      location: language === 'ar' ? 'جدة، السعودية' : 'Jeddah, Saudi Arabia',
      type: language === 'ar' ? 'فيلا خاصة' : 'Private Villa',
      image: '/images/gallery/project-3.jpg'
    },
    { 
      location: language === 'ar' ? 'الدوحة، قطر' : 'Doha, Qatar',
      type: language === 'ar' ? 'نادي رياضي' : 'Sports Club',
      image: '/images/gallery/project-4.jpg'
    },
    { 
      location: language === 'ar' ? 'الكويت' : 'Kuwait City',
      type: language === 'ar' ? 'مخبز حرفي' : 'Artisan Bakery',
      image: '/images/gallery/project-5.jpg'
    },
    { 
      location: language === 'ar' ? 'المنامة، البحرين' : 'Manama, Bahrain',
      type: language === 'ar' ? 'مقهى بوتيك' : 'Boutique Cafe',
      image: '/images/gallery/project-6.jpg'
    },
  ]
  
  return (
    <section id="gallery" className="py-20 sm:py-32 bg-cream" dir={dir}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal mb-4 text-balance">
            {t('gallery.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('gallery.subtitle')}
          </p>
        </div>
        
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card 
              key={index}
              className="group overflow-hidden border-charcoal/10 bg-charcoal hover:shadow-xl transition-all duration-300"
            >
              {/* Project Image */}
              <div className="aspect-[4/3] relative overflow-hidden">
                <img 
                  src={project.image || "/placeholder.svg"} 
                  alt={`${project.type} - ${project.location}`}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-charcoal/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center p-4">
                    <div className="flex items-center justify-center gap-2 text-gold mb-2">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm font-medium">{project.location}</span>
                    </div>
                    <p className="text-cream text-lg font-semibold">{project.type}</p>
                  </div>
                </div>
              </div>
              
              {/* Card Info */}
              <div className="p-4">
                <div className="flex items-center gap-2 text-cream/70">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{project.location}</span>
                </div>
                <p className="text-cream font-medium mt-1">{project.type}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
