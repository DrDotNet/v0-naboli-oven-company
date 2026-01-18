"use client"

import { useLanguage } from '@/lib/language-context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Wrench, Check } from 'lucide-react'

export function Maintenance() {
  const { t, dir } = useLanguage()
  
  const careSteps = [
    t('maintenance.care.1'),
    t('maintenance.care.2'),
    t('maintenance.care.3'),
    t('maintenance.care.4'),
    t('maintenance.care.5'),
  ]
  
  return (
    <section id="maintenance" className="py-20 sm:py-32 bg-cream" dir={dir}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal mb-4 text-balance">
            {t('maintenance.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('maintenance.subtitle')}
          </p>
        </div>
        
        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Stone Durability */}
          <Card className="bg-charcoal border-0">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-terracotta">
                  <Shield className="h-6 w-6 text-cream" />
                </div>
                <CardTitle className="text-xl text-cream">
                  {t('maintenance.stone.title')}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-cream/70 leading-relaxed">
                {t('maintenance.stone.description')}
              </p>
              
              {/* Temperature Indicator */}
              <div className="mt-6 p-4 rounded-lg bg-cream/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-cream/60 text-sm">
                    {dir === 'rtl' ? 'مقاومة الحرارة' : 'Heat Resistance'}
                  </span>
                  <span className="text-gold font-bold">1000°C</span>
                </div>
                <div className="h-2 bg-cream/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-terracotta to-gold rounded-full"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Care Instructions */}
          <Card className="bg-card border-charcoal/10">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/20">
                  <Wrench className="h-6 w-6 text-gold" />
                </div>
                <CardTitle className="text-xl text-charcoal">
                  {t('maintenance.care.title')}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {careSteps.map((step, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-terracotta/10">
                      <Check className="h-3 w-3 text-terracotta" />
                    </div>
                    <span className="text-muted-foreground">{step}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        
        {/* Warranty Section */}
        <Card className="mt-8 bg-gradient-to-r from-terracotta to-terracotta-dark border-0 overflow-hidden">
          <CardContent className="p-8 sm:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-cream/20">
                <Shield className="h-10 w-10 text-cream" />
              </div>
              <div className="text-center md:text-start">
                <h3 className="text-2xl font-bold text-cream mb-2">
                  {t('maintenance.warranty.title')}
                </h3>
                <p className="text-cream/80 leading-relaxed max-w-2xl">
                  {t('maintenance.warranty.description')}
                </p>
              </div>
              <div className="flex gap-4 shrink-0">
                {[3, 6, 10].map((years) => (
                  <div 
                    key={years}
                    className="flex flex-col items-center justify-center w-16 h-16 rounded-lg bg-cream/10"
                  >
                    <span className="text-2xl font-bold text-cream">{years}</span>
                    <span className="text-xs text-cream/60">
                      {dir === 'rtl' ? 'سنة' : 'yrs'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
