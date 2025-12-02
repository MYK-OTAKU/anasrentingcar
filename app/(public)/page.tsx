"use client"

import { HeroSection } from "@/components/sections/hero-section"
import { AboutPreview } from "@/components/sections/about-preview"
import { CarsPreview } from "@/components/sections/cars-preview"
import { ReviewsSection } from "@/components/sections/reviews-section"
import { CtaContact } from "@/components/sections/cta-contact"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutPreview />
      <CarsPreview />
      <ReviewsSection />
      <CtaContact />
    </>
  )
}
