"use client"

import { HeroSection } from "@/components/sections/hero-section"
import { ReservationSection } from "@/components/sections/reservation-section"
import { ServicesSection } from "@/components/sections/services-section"
import { AboutPreview } from "@/components/sections/about-preview"
import { CarsPreview } from "@/components/sections/cars-preview"
import { ReviewsSection } from "@/components/sections/reviews-section"
import { CtaContact } from "@/components/sections/cta-contact"
import { FadeInSection } from "@/components/animations/fade-in-section"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      
      <FadeInSection delay={100}>
        <ReservationSection />
      </FadeInSection>
      
      <FadeInSection delay={100}>
        <CarsPreview />
      </FadeInSection>
      
      <FadeInSection delay={200}>
        <ServicesSection />
      </FadeInSection>
      
      <FadeInSection delay={200}>
        <AboutPreview />
      </FadeInSection>
      
      <FadeInSection delay={200}>
        <ReviewsSection />
      </FadeInSection>
      
      <FadeInSection delay={100}>
        <CtaContact />
      </FadeInSection>
    </>
  )
}
