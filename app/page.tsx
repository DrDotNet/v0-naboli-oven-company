import { Header } from '@/components/napoli/header'
import { Hero } from '@/components/napoli/hero'
import { OvenCatalog } from '@/components/napoli/oven-catalog'
import { Extensions } from '@/components/napoli/extensions'
import { Gallery } from '@/components/napoli/gallery'
import { Recipes } from '@/components/napoli/recipes'
import { Maintenance } from '@/components/napoli/maintenance'
import { ContactForm } from '@/components/napoli/contact-form'
import { Footer } from '@/components/napoli/footer'
import { WhatsAppButton } from '@/components/napoli/whatsapp-button'
import { StructuredData } from '@/components/napoli/structured-data'

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <OvenCatalog />
          <Extensions />
          <Gallery />
          <Recipes />
          <Maintenance />
          <ContactForm />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  )
}
