"use client"

import { useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import CharactersSection from "@/components/characters-section"
import DocumentarySection from "@/components/documentary-section"
import GallerySection from "@/components/gallery-section"
import ExtrasSection from "@/components/extras-section"
import FunFactsSection from "@/components/fun-facts-section"
import NavigationBar from "@/components/floating-nav"
import { MarineLoader } from "@/components/ui/marine-loader"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  useEffect(() => {
    if (typeof window === "undefined" || isLoading) return

    // Initialize GSAP ScrollTrigger
    gsap.set("body", { overflow: "auto" })

    // Enhanced ScrollTrigger configuration
    ScrollTrigger.config({
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
      ignoreMobileResize: true,
    })

    // Smooth scroll animation for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e: Event) => {
        e.preventDefault()
        const targetId = (e.currentTarget as HTMLAnchorElement).getAttribute("href")
        if (targetId) {
          const targetElement = document.querySelector(targetId)
          if (targetElement) {
            const element = targetElement as HTMLElement
            gsap.to(window, {
              duration: 1.2,
              scrollTo: {
                y: element.offsetTop,
                offsetY: 0,
              },
              ease: "power2.inOut",
            })
          }
        }
      })
    })

    // Page entrance animation
    gsap.fromTo("main", { opacity: 0 }, { opacity: 1, duration: 1, ease: "power2.out" })

    // Add scroll-based parallax effects
    gsap.utils.toArray(".parallax-element").forEach((element: any) => {
      gsap.to(element, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })
    })

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [isLoading])

  if (isLoading) {
    return <MarineLoader onComplete={handleLoadingComplete} />
  }

  return (
    <main className="relative">
      <NavigationBar />
      <HeroSection />
      <AboutSection />
      <CharactersSection />
      <DocumentarySection />
      <GallerySection />
      <ExtrasSection />
      <FunFactsSection />
    </main>
  )
}
