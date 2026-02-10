"use client"

import { useLanguage } from '@/lib/language-context'

export function Gallery() {
  const { t, dir } = useLanguage()
  
  const projects = [
    { image: '/images/gallery/project-1.jpg' },
    { image: '/images/gallery/project-2.jpg' },
    { image: '/images/gallery/project-3.jpg' },
    { image: '/images/gallery/project-4.jpg' },
    { image: '/images/gallery/project-5.jpg' },
    { image: '/images/gallery/project-6.jpg' },
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
            <div 
              key={index}
              className="group overflow-hidden rounded-lg border border-charcoal/10 hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <img 
                  src={project.image || "/placeholder.svg"} 
                  alt={`Napoli oven project ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
