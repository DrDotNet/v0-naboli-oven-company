"use client"

import React from "react"

import { useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import { ovenModels, seriesInfo } from '@/lib/oven-data'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Send, CheckCircle } from 'lucide-react'

export function ContactForm() {
  const { t, dir, language } = useLanguage()
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    model: '',
    message: '',
  })
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send to an API
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
    setFormData({ name: '', phone: '', email: '', model: '', message: '' })
  }
  
  // Group models by series for the dropdown
  const modelOptions = Object.entries(seriesInfo).map(([series, info]) => ({
    series,
    name: t(info.nameKey),
    models: ovenModels.filter(m => m.series === series),
  }))
  
  return (
    <section id="contact" className="py-20 sm:py-32 bg-charcoal" dir={dir}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cream mb-4 text-balance">
            {t('form.title')}
          </h2>
          <p className="text-lg text-cream/70 max-w-2xl mx-auto">
            {t('form.subtitle')}
          </p>
        </div>
        
        {/* Form Card */}
        <Card className="bg-cream border-0">
          <CardHeader className="pb-0">
            <CardTitle className="sr-only">{t('form.title')}</CardTitle>
          </CardHeader>
          <CardContent className="p-6 sm:p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-xl font-semibold text-charcoal">{t('form.success')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-charcoal">
                      {t('form.name')}
                    </Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-background border-charcoal/20 focus:border-terracotta"
                      dir={language === 'ar' ? 'rtl' : 'ltr'}
                    />
                  </div>
                  
                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-charcoal">
                      {t('form.phone')}
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-background border-charcoal/20 focus:border-terracotta"
                      dir="ltr"
                    />
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-charcoal">
                      {t('form.email')}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-background border-charcoal/20 focus:border-terracotta"
                      dir="ltr"
                    />
                  </div>
                  
                  {/* Model Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="model" className="text-charcoal">
                      {t('form.model')}
                    </Label>
                    <Select
                      value={formData.model}
                      onValueChange={(value) => setFormData({ ...formData, model: value })}
                    >
                      <SelectTrigger className="bg-background border-charcoal/20 focus:border-terracotta">
                        <SelectValue placeholder={t('form.model.select')} />
                      </SelectTrigger>
                      <SelectContent>
                        {modelOptions.map((group) => (
                          <div key={group.series}>
                            <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                              {group.name}
                            </div>
                            {group.models.map((model) => (
                              <SelectItem key={model.id} value={model.id}>
                                {model.name}
                              </SelectItem>
                            ))}
                          </div>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-charcoal">
                    {t('form.message')}
                  </Label>
                  <Textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-background border-charcoal/20 focus:border-terracotta resize-none"
                    dir={language === 'ar' ? 'rtl' : 'ltr'}
                  />
                </div>
                
                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-terracotta text-cream hover:bg-terracotta-dark"
                >
                  <Send className="h-4 w-4 me-2" />
                  {t('form.submit')}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
