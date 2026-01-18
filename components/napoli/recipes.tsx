"use client"

import { useLanguage } from '@/lib/language-context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Pizza, Beef, Drumstick } from 'lucide-react'

export function Recipes() {
  const { t, dir } = useLanguage()
  
  const recipes = [
    {
      titleKey: 'recipe.pizza.title',
      descriptionKey: 'recipe.pizza.description',
      icon: Pizza,
      time: '90s',
      temp: '450°C',
      image: '/images/recipes/pizza.jpg',
    },
    {
      titleKey: 'recipe.steak.title',
      descriptionKey: 'recipe.steak.description',
      icon: Beef,
      time: '8-12min',
      temp: '425°C',
      image: '/images/recipes/steak.jpg',
    },
    {
      titleKey: 'recipe.lamb.title',
      descriptionKey: 'recipe.lamb.description',
      icon: Drumstick,
      time: '4-6hrs',
      temp: '180°C',
      image: '/images/recipes/lamb.jpg',
    },
  ]
  
  return (
    <section id="recipes" className="py-20 sm:py-32 bg-charcoal" dir={dir}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cream mb-4 text-balance">
            {t('recipes.title')}
          </h2>
          <p className="text-lg text-cream/70 max-w-2xl mx-auto">
            {t('recipes.subtitle')}
          </p>
        </div>
        
        {/* Recipe Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {recipes.map((recipe, index) => {
            const Icon = recipe.icon
            
            return (
              <Card 
                key={index}
                className="bg-cream border-0 hover:shadow-2xl transition-shadow group overflow-hidden"
              >
                {/* Recipe Image */}
                <div className="aspect-[16/10] relative overflow-hidden">
                  <img 
                    src={recipe.image || "/placeholder.svg"} 
                    alt={t(recipe.titleKey)}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 text-cream">
                      <Icon className="h-5 w-5" />
                      <span className="font-bold text-lg">{t(recipe.titleKey)}</span>
                    </div>
                  </div>
                </div>
                <CardHeader className="text-center pb-2 pt-4"></CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {t(recipe.descriptionKey)}
                  </p>
                  
                  {/* Time and Temp */}
                  <div className="flex justify-center gap-6">
                    <div className="text-center">
                      <span className="block text-2xl font-bold text-terracotta">{recipe.time}</span>
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">
                        {dir === 'rtl' ? 'الوقت' : 'Cook Time'}
                      </span>
                    </div>
                    <div className="w-px bg-charcoal/10" />
                    <div className="text-center">
                      <span className="block text-2xl font-bold text-gold">{recipe.temp}</span>
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">
                        {dir === 'rtl' ? 'الحرارة' : 'Temperature'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
