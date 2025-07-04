"use client"

import { useEffect, useState, useMemo } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import CharactersSection from "@/components/characters-section"
import DocumentarySection from "@/components/documentary-section"
import GallerySection from "@/components/gallery-section"
import HarborSection from "@/components/harbor-section"
import FunFactsSection from "@/components/fun-facts-section"
import NavigationBar from "@/components/floating-nav"
import { MarineLoader } from "@/components/ui/marine-loader"
import { useImagePreloader } from "@/hooks/use-image-preloader"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
}

export default function Home() {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false)

  // Memoizar la lista de imágenes para evitar re-renders innecesarios
  const allImages = useMemo(
    () => [
      // Hero section
      "/team-photo.jpg",
      "/logo-documental.png",
      "/logo-dhali.png",
      "/hero-background.jpg",

      // About section - team photos
      "/team/director.jpg",
      "/team/editor.jpg",
      "/team/productora.jpg",
      "/team/sonidista.jpg",
      "/team/camarografo1.jpg",
      "/team/camarografo2.jpg",
      "/team/asistente.jpg",
      "/team/director-fotografia.jpg",
      "/conocenos-background.jpg",
      "/mission-vision-background.jpg",

      // Characters section
      "/characters/kike.jpg",
      "/characters/ricardo-portrait.jpg",
      "/characters/david.jpg",
      "/characters/brando.jpg", // Brando
      "/characters/mia.jpg",
      "/characters-background.jpg",

      // Documentary section
      "/boats-harbor.jpg",
      "/gallery/kike-construction.jpg",

      // Gallery section - TODAS LAS FOTOS
      "/gallery/coastal-view.jpg",
      "/gallery/artistic-portrait.jpg",
      "/gallery/filming-boats.jpg",
      "/gallery/team-photography.jpg",
      "/gallery/sea-lions-night.jpg",
      "/gallery/sea-lions-day.jpg",
      "/gallery/lawyer-interview.jpg",
      "/gallery/behind-scenes.jpg",
      "/gallery/harbor-panorama.jpg",
      "/gallery/village-overlook.jpg",
      "/gallery/kike-construction.jpg",
      "/gallery/colorky-boat.jpg",
      "/gallery/kike-workshop.jpg",
      "/gallery/worker-tools.jpg",
      "/gallery/boat-underneath.jpg",
      "/gallery/harbor-aerial.jpg",
      "/gallery/two-boats-varadero.jpg",
      "/gallery/kike-portrait.jpg",
      "/gallery/kike-workshop-2.jpg",

      // Harbor/Taller section
      "/workshop/harbor-real.jpg",
      "/workshop/wood-selection.jpg",
      "/workshop/caulking-space.jpg",
      "/workshop/david-painting.jpg",
      "/workshop/kike-workshop.jpg",
    ],
    [],
  )

  const { isLoading, progress, loadedImages, totalCached } = useImagePreloader({
    images: allImages,
    onProgress: (loaded, total) => {
      console.log(`Loaded ${loaded}/${total} images (${totalCached} from cache)`)
    },
  })

  const handleLoadingComplete = () => {
    console.log("Loading completed, transitioning to main content")
    setIsLoadingComplete(true)
  }

  useEffect(() => {
    if (typeof window === "undefined" || isLoading || !isLoadingComplete) return

    // Initialize GSAP ScrollTrigger
    gsap.set("body", { overflow: "auto" })

    // Enhanced ScrollTrigger configuration
    ScrollTrigger.config({
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
      ignoreMobileResize: true,
    })

    // Smooth scroll animation for anchor links
    const handleAnchorClick = (e: Event) => {
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
    }

    const anchorLinks = document.querySelectorAll('a[href^="#"]')
    anchorLinks.forEach((anchor) => {
      anchor.addEventListener("click", handleAnchorClick)
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
      anchorLinks.forEach((anchor) => {
        anchor.removeEventListener("click", handleAnchorClick)
      })
    }
  }, [isLoading, isLoadingComplete])

  // Mostrar loader mientras carga o mientras no se ha completado la transición
  if (isLoading || !isLoadingComplete) {
    return (
      <MarineLoader
        progress={progress}
        loadedImages={loadedImages.size}
        totalImages={allImages.length}
        totalCached={totalCached}
        onComplete={handleLoadingComplete}
      />
    )
  }

  return (
    <main className="relative">
      <NavigationBar />
      <HeroSection />
      <AboutSection />
      <CharactersSection />
      <DocumentarySection />
      <GallerySection imagesLoaded={true} />
      <HarborSection />
      <FunFactsSection />
    </main>
  )
}
