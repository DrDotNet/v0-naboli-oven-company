"use client"

import { useLanguage } from '@/lib/language-context'
import { MessageCircle } from 'lucide-react'

export function WhatsAppButton() {
  const { t, dir } = useLanguage()
  
  const whatsappNumber = '972587801247' // Replace with actual number
  const message = encodeURIComponent('Hello, I am interested in Napoli Ovens. / مرحباً، أنا مهتم بأفران نابولي.')
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`
  
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 ${dir === 'rtl' ? 'left-6' : 'right-6'} z-50 group`}
      aria-label={t('whatsapp.chat')}
    >
      <div className="flex items-center gap-3 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
        <MessageCircle className="h-6 w-6" />
        <span className="hidden sm:inline font-medium">{t('whatsapp.chat')}</span>
      </div>
      
      {/* Pulse animation */}
      <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
        <span className="relative inline-flex rounded-full h-4 w-4 bg-[#25D366]" />
      </span>
    </a>
  )
}
