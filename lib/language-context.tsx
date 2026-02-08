"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

type Language = 'en' | 'ar'

interface LanguageContextType {
  language: Language
  toggleLanguage: () => void
  t: (key: string) => string
  dir: 'ltr' | 'rtl'
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.ovens': 'Ovens',
    'nav.extensions': 'Extensions',
    'nav.gallery': 'Gallery',
    'nav.recipes': 'Recipes',
    'nav.maintenance': 'Maintenance',
    'nav.contact': 'Contact',
    'nav.quote': 'Get Quote',
    
    // Hero
    'hero.subtitle': 'Premium Refractory Ovens',
    'hero.title': 'Crafted for Perfection',
    'hero.description': 'Experience the art of traditional cooking with our handcrafted refractory ovens. Built to last generations with superior heat retention and authentic taste.',
    'hero.cta': 'Request a Quote',
    'hero.explore': 'Explore Our Ovens',
    
    // Ovens Section
    'ovens.title': 'Our Oven Collection',
    'ovens.subtitle': 'Discover the perfect oven for your culinary journey',
    'ovens.filter.all': 'All Models',
    'ovens.warranty': 'Year Warranty',
    'ovens.viewDetails': 'View Details',
    'ovens.interior': 'Interior',
    
    // Product Lines
    'titan.name': 'Titan',
    'titan.description': 'Entry-level excellence with iron/stone interior. Perfect for home enthusiasts.',
    'titanpro.name': 'Titan Pro',
    'titanpro.description': 'Professional-grade with refractory cement. Built for demanding environments.',
    'stonefire.name': 'StoneFire',
    'stonefire.description': 'Premium rectangular stone design. Maximum cooking surface with unmatched durability.',
    'royalflame.name': 'Royal Flame',
    'royalflame.description': 'Our flagship circular stone series. The pinnacle of oven craftsmanship.',
    
    // Interior Types
    'interior.iron': 'Iron',
    'interior.cement': 'Refractory Cement',
    'interior.stone': 'Stone',
    
    // Extensions
    'extensions.title': 'Product Extensions',
    'extensions.subtitle': 'Complete your outdoor cooking experience',
    'smokers.title': 'Premium Smokers',
    'smokers.description': 'Artisan-crafted smokers for authentic wood-fired flavor. Perfect for meats, fish, and vegetables.',
    'accessories.title': 'Accessories',
    'accessories.description': 'Essential tools and accessories to elevate your cooking: pizza peels, thermometers, covers, and more.',
    
    // Gallery
    'gallery.title': 'Previous Projects',
    'gallery.subtitle': 'Explore our installations across the region',
    
    // Recipes
    'recipes.title': 'Culinary Inspirations',
    'recipes.subtitle': 'Discover what you can create with a Napoli oven',
    'recipe.pizza.title': 'Neapolitan Pizza',
    'recipe.pizza.description': 'Authentic 90-second cook time with leopard-spotted crust. The true taste of Naples.',
    'recipe.steak.title': 'Wood-Fired Steak',
    'recipe.steak.description': 'Perfect sear at 800°F. Juicy, tender, with that distinctive smoky flavor.',
    'recipe.lamb.title': 'Whole Roasted Lamb',
    'recipe.lamb.description': 'Traditional slow-roasted lamb for special occasions. Feeds the entire family.',
    
    // Maintenance
    'maintenance.title': 'Maintenance & Warranty',
    'maintenance.subtitle': 'Built to last, easy to maintain',
    'maintenance.stone.title': 'Refractory Stone Durability',
    'maintenance.stone.description': 'Our refractory stones are engineered to withstand extreme temperatures up to 1000°C. The dense composition ensures even heat distribution and exceptional longevity.',
    'maintenance.care.title': 'Care Instructions',
    'maintenance.care.1': 'Allow the oven to cool completely before cleaning',
    'maintenance.care.2': 'Use a brass brush to remove food residue',
    'maintenance.care.3': 'Never use water on hot stones',
    'maintenance.care.4': 'Apply protective cover when not in use',
    'maintenance.care.5': 'Annual inspection recommended for optimal performance',
    'maintenance.warranty.title': 'Our Warranty Promise',
    'maintenance.warranty.description': 'Every Napoli oven comes with comprehensive warranty coverage. From 3 years on our Titan series to an industry-leading 10 years on Royal Flame and StoneFire models.',
    
    // Contact Form
    'form.title': 'Get a Quote',
    'form.subtitle': 'Ready to transform your cooking experience? Contact us today.',
    'form.name': 'Full Name',
    'form.phone': 'Phone Number',
    'form.email': 'Email Address',
    'form.model': 'Interested Oven Model',
    'form.model.select': 'Select a model',
    'form.message': 'Your Message',
    'form.submit': 'Send Request',
    'form.success': 'Thank you! We will contact you shortly.',
    
    // Footer
    'footer.tagline': 'Crafting exceptional ovens since 2005',
    'footer.contact': 'Contact Us',
    'footer.hours': 'Business Hours',
    'footer.hours.weekdays': 'Saturday - Thursday: 9AM - 6PM',
    'footer.hours.weekend': 'Friday: Closed',
    'footer.rights': 'All rights reserved.',
    
    // WhatsApp
    'whatsapp.chat': 'Chat on WhatsApp',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.ovens': 'الأفران',
    'nav.extensions': 'الملحقات',
    'nav.gallery': 'معرض الصور',
    'nav.recipes': 'الوصفات',
    'nav.maintenance': 'الصيانة',
    'nav.contact': 'اتصل بنا',
    'nav.quote': 'احصل على عرض سعر',
    
    // Hero
    'hero.subtitle': 'أفران حرارية فاخرة',
    'hero.title': 'صُنعت للكمال',
    'hero.description': 'استمتع بفن الطهي التقليدي مع أفراننا الحرارية المصنوعة يدوياً. مصممة لتدوم أجيالاً مع احتفاظ فائق بالحرارة ومذاق أصيل.',
    'hero.cta': 'اطلب عرض سعر',
    'hero.explore': 'استكشف أفراننا',
    
    // Ovens Section
    'ovens.title': 'مجموعة الأفران',
    'ovens.subtitle': 'اكتشف الفرن المثالي لرحلتك في الطهي',
    'ovens.filter.all': 'جميع الموديلات',
    'ovens.warranty': 'سنوات ضمان',
    'ovens.viewDetails': 'عرض التفاصيل',
    'ovens.interior': 'التصميم الداخلي',
    
    // Product Lines
    'titan.name': 'تيتان',
    'titan.description': 'تميز على مستوى الدخول مع تصميم داخلي من الحديد والحجر. مثالي لعشاق الطهي المنزلي.',
    'titanpro.name': 'تيتان برو',
    'titanpro.description': 'درجة احترافية مع الأسمنت الحراري. مصمم للبيئات المتطلبة.',
    'stonefire.name': 'ستون فاير',
    'stonefire.description': 'تصميم حجري مستطيل فاخر. أقصى سطح طهي مع متانة لا مثيل لها.',
    'royalflame.name': 'رويال فليم',
    'royalflame.description': 'سلسلتنا الرائدة بالحجر الدائري. قمة الحرفية في صناعة الأفران.',
    
    // Interior Types
    'interior.iron': 'حديد',
    'interior.cement': 'أسمنت حراري',
    'interior.stone': 'حجر',
    
    // Extensions
    'extensions.title': 'ملحقات المنتجات',
    'extensions.subtitle': 'أكمل تجربة الطهي في الهواء الطلق',
    'smokers.title': 'مدخنات فاخرة',
    'smokers.description': 'مدخنات مصنوعة يدوياً للنكهة الأصيلة للحطب. مثالية للحوم والأسماك والخضروات.',
    'accessories.title': 'الإكسسوارات',
    'accessories.description': 'أدوات وإكسسوارات أساسية لرفع مستوى طهيك: مجارف البيتزا، موازين الحرارة، الأغطية والمزيد.',
    
    // Gallery
    'gallery.title': 'المشاريع السابقة',
    'gallery.subtitle': 'استكشف تركيباتنا في جميع أنحاء المنطقة',
    
    // Recipes
    'recipes.title': 'إلهامات الطهي',
    'recipes.subtitle': 'اكتشف ما يمكنك إبداعه مع فرن نابولي',
    'recipe.pizza.title': 'بيتزا نابولية',
    'recipe.pizza.description': 'وقت طهي أصيل 90 ثانية مع قشرة مرقطة. المذاق الحقيقي لنابولي.',
    'recipe.steak.title': 'ستيك على الحطب',
    'recipe.steak.description': 'تحميص مثالي عند 800 درجة فهرنهايت. عصير وطري مع نكهة مدخنة مميزة.',
    'recipe.lamb.title': 'خروف مشوي كامل',
    'recipe.lamb.description': 'خروف مشوي تقليدي بطيء للمناسبات الخاصة. يكفي العائلة بأكملها.',
    
    // Maintenance
    'maintenance.title': 'الصيانة والضمان',
    'maintenance.subtitle': 'صُنع ليدوم، سهل الصيانة',
    'maintenance.stone.title': 'متانة الحجر الحراري',
    'maintenance.stone.description': 'أحجارنا الحرارية مصممة لتحمل درجات حرارة قصوى تصل إلى 1000 درجة مئوية. التركيبة الكثيفة تضمن توزيع حرارة متساوٍ وعمر استثنائي.',
    'maintenance.care.title': 'تعليمات العناية',
    'maintenance.care.1': 'اترك الفرن يبرد تماماً قبل التنظيف',
    'maintenance.care.2': 'استخدم فرشاة نحاسية لإزالة بقايا الطعام',
    'maintenance.care.3': 'لا تستخدم الماء على الأحجار الساخنة أبداً',
    'maintenance.care.4': 'ضع الغطاء الواقي عند عدم الاستخدام',
    'maintenance.care.5': 'يُنصح بالفحص السنوي للأداء الأمثل',
    'maintenance.warranty.title': 'وعد الضمان',
    'maintenance.warranty.description': 'كل فرن نابولي يأتي مع تغطية ضمان شاملة. من 3 سنوات على سلسلة تيتان إلى 10 سنوات رائدة في الصناعة على موديلات رويال فليم وستون فاير.',
    
    // Contact Form
    'form.title': 'احصل على عرض سعر',
    'form.subtitle': 'هل أنت مستعد لتحويل تجربة الطهي الخاصة بك؟ اتصل بنا اليوم.',
    'form.name': 'الاسم الكامل',
    'form.phone': 'رقم الهاتف',
    'form.email': 'البريد الإلكتروني',
    'form.model': 'موديل الفرن المطلوب',
    'form.model.select': 'اختر موديلاً',
    'form.message': 'رسالتك',
    'form.submit': 'إرسال الطلب',
    'form.success': 'شكراً لك! سنتواصل معك قريباً.',
    
    // Footer
    'footer.tagline': 'نصنع أفراناً استثنائية منذ 2005',
    'footer.contact': 'اتصل بنا',
    'footer.hours': 'ساعات العمل',
    'footer.hours.weekdays': 'السبت - الخميس: 9 صباحاً - 6 مساءً',
    'footer.hours.weekend': 'الجمعة: مغلق',
    'footer.rights': 'جميع الحقوق محفوظة.',
    
    // WhatsApp
    'whatsapp.chat': 'تواصل عبر واتساب',
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')
  
  const toggleLanguage = useCallback(() => {
    setLanguage(prev => {
      const newLang = prev === 'en' ? 'ar' : 'en'
      document.documentElement.lang = newLang
      document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr'
      return newLang
    })
  }, [])
  
  const t = useCallback((key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key
  }, [language])
  
  const dir = language === 'ar' ? 'rtl' : 'ltr'
  
  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
