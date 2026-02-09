"use client"

import { useLanguage } from '@/lib/language-context'
import { Flame, Phone, Mail, MapPin, Clock } from 'lucide-react'

export function Footer() {
  const { t, dir, language } = useLanguage()
  
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-charcoal border-t border-cream/10" dir={dir}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo.png"
                alt="Napoli Ovens Logo"
                width={48}
                height={48}
                className="h-12 w-auto object-contain brightness-0 invert"
              />
              <div>
                <span className="text-lg font-bold text-cream">Napoli</span>
                <span className="block text-xs text-gold">
                  {language === 'ar' ? 'أفران حرارية' : 'Refractory Ovens'}
                </span>
              </div>
            </div>
            <p className="text-cream/60 text-sm leading-relaxed">
              {t('footer.tagline')}
            </p>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-cream font-semibold mb-4 flex items-center gap-2">
              <Phone className="h-4 w-4 text-terracotta" />
              {t('footer.contact')}
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-cream/60">
                <Phone className="h-4 w-4" />
                <a href="tel:+972587801247" className="hover:text-gold transition-colors">
                  +972587801247
                </a>
              </li>
              <li className="flex items-center gap-2 text-cream/60">
                <Mail className="h-4 w-4" />
                <a href="mailto:info@napoliovens.com" className="hover:text-gold transition-colors">
                  info@napoliovens.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-cream/60">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>
                  {language === 'ar' 
                    ? 'دير ابو مشعل - رام الله' 
                    : 'Deir Abu Meshal - Ramallah'}
                </span>
              </li>
            </ul>
          </div>
          
          {/* Business Hours */}
          <div>
            <h3 className="text-cream font-semibold mb-4 flex items-center gap-2">
              <Clock className="h-4 w-4 text-terracotta" />
              {t('footer.hours')}
            </h3>
            <ul className="space-y-2 text-sm text-cream/60">
              <li>{t('footer.hours.weekdays')}</li>
              <li>{t('footer.hours.weekend')}</li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-cream font-semibold mb-4 flex items-center gap-2">
              <Flame className="h-4 w-4 text-terracotta" />
              {language === 'ar' ? 'روابط سريعة' : 'Quick Links'}
            </h3>
            <ul className="space-y-2 text-sm">
              {['nav.ovens', 'nav.extensions', 'nav.gallery', 'nav.recipes', 'nav.maintenance'].map((key) => (
                <li key={key}>
                  <a 
                    href={`#${key.split('.')[1]}`}
                    className="text-cream/60 hover:text-gold transition-colors"
                  >
                    {t(key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-cream/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-cream/40">
            © {currentYear} Napoli Ovens. {t('footer.rights')}
          </p>
          <p className="text-sm text-cream/40">
            {language === 'ar' ? 'شركة نابولي للأفران الحرارية' : 'Napoli Refractory Ovens Co.'}
          </p>
        </div>
      </div>
    </footer>
  )
}
