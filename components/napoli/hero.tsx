"use client"

import { useLanguage } from '@/lib/language-context'
import { Button } from '@/components/ui/button'
import { ChevronDown, Flame } from 'lucide-react'

export function Hero() {
  const { t, dir } = useLanguage()
  
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
  
  return (
    <section 
      id="home" 
      aria-label="Hero - Premium Refractory Ovens"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-charcoal"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, var(--terracotta) 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, var(--gold) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>
      
      {/* Animated Flame Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 text-terracotta/20 animate-pulse">
          <Flame className="h-32 w-32" />
        </div>
        <div className="absolute bottom-1/3 right-1/4 text-gold/15 animate-pulse delay-1000">
          <Flame className="h-24 w-24" />
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center pt-16" dir={dir}>
        {/* Subtitle Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 mb-8">
          <Flame className="h-4 w-4 text-gold" />
          <span className="text-sm font-medium text-gold">{t('hero.subtitle')}</span>
        </div>
        
        {/* Main Title */}
        <h1 className="text-balance text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-cream mb-6 leading-tight">
          {t('hero.title')}
        </h1>
        
        {/* Description */}
        <p className="mx-auto max-w-2xl text-lg sm:text-xl text-cream/70 mb-10 leading-relaxed">
          {t('hero.description')}
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            onClick={() => scrollToSection('#contact')}
            className="bg-terracotta text-cream hover:bg-terracotta-dark px-8 py-6 text-lg"
          >
            {t('hero.cta')}
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => scrollToSection('#ovens')}
            className="bg-transparent border-cream/30 text-cream hover:bg-cream/10 hover:text-cream px-8 py-6 text-lg"
          >
            {t('hero.explore')}
          </Button>
        </div>
        
        {/* Brand Name - decorative, not a heading */}
        <div className="mt-20 sm:mt-32" aria-hidden="true">
          <span className="block text-6xl sm:text-8xl lg:text-9xl font-bold text-cream/5 select-none">
            NAPOLI
          </span>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <button 
        onClick={() => scrollToSection('#ovens')}
        aria-label="Scroll to oven catalog section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream/50 hover:text-gold transition-colors"
      >
        <span className="text-xs uppercase tracking-widest" aria-hidden="true">{t('hero.explore')}</span>
        <ChevronDown className="h-5 w-5 animate-bounce" aria-hidden="true" />
      </button>
    </section>
  )
}
