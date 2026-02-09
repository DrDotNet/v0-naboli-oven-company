"use client"

import { useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import { Button } from '@/components/ui/button'
import { Menu, X, Globe } from 'lucide-react'

export function Header() {
  const { t, toggleLanguage, language, dir } = useLanguage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const navItems = [
    { key: 'nav.home', href: '#home' },
    { key: 'nav.ovens', href: '#ovens' },
    { key: 'nav.extensions', href: '#extensions' },
    { key: 'nav.gallery', href: '#gallery' },
    { key: 'nav.recipes', href: '#recipes' },
    { key: 'nav.maintenance', href: '#maintenance' },
  ]
  
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-charcoal/95 backdrop-blur-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo.png"
              alt="Napoli Ovens Logo"
              className="h-10 w-10 object-contain invert mix-blend-screen"
            />
            <div className="hidden sm:block">
              <span className="text-lg font-bold text-cream">Napoli</span>
              <span className="block text-xs text-gold">
                {language === 'ar' ? 'أفران حرارية' : 'Refractory Ovens'}
              </span>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-6" dir={dir}>
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.href)}
                className="text-sm font-medium text-cream/80 transition-colors hover:text-gold"
              >
                {t(item.key)}
              </button>
            ))}
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-cream hover:bg-cream/10 hover:text-gold"
            >
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">{language === 'en' ? 'العربية' : 'English'}</span>
            </Button>
            
            {/* CTA Button */}
            <Button
              onClick={() => scrollToSection('#contact')}
              className="hidden sm:flex bg-terracotta text-cream hover:bg-terracotta-dark"
            >
              {t('nav.quote')}
            </Button>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-cream hover:bg-cream/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-cream/10 py-4" dir={dir}>
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.href)}
                  className="px-4 py-2 text-sm font-medium text-cream/80 transition-colors hover:bg-cream/10 hover:text-gold text-start"
                >
                  {t(item.key)}
                </button>
              ))}
              <Button
                onClick={() => scrollToSection('#contact')}
                className="mx-4 mt-2 bg-terracotta text-cream hover:bg-terracotta-dark"
              >
                {t('nav.quote')}
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
