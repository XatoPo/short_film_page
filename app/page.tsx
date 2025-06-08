"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import CharactersSection from "@/components/characters-section"
import DocumentarySection from "@/components/documentary-section"
import ExtrasSection from "@/components/extras-section"
import NavigationBar from "@/components/floating-nav"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Home() {
  useEffect(() => {
    // Initialize GSAP ScrollTrigger for smooth scroll animations
    gsap.set("body", { overflow: "auto" })

    // Configuración mejorada de ScrollTrigger
    ScrollTrigger.config({
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
      ignoreMobileResize: true,
    })

    // Refresh ScrollTrigger después de que todo esté cargado
    ScrollTrigger.refresh()

    // Mejorar el scroll suave para los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const targetId = this.getAttribute("href")
        if (targetId) {
          const targetElement = document.querySelector(targetId)
          if (targetElement) {
            gsap.to(window, {
              duration: 1,
              scrollTo: {
                y: targetElement,
                offsetY: 0,
              },
              ease: "power2.inOut",
            })
          }
        }
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <main className="relative">
      <NavigationBar />
      <HeroSection />
      <AboutSection />
      <CharactersSection />
      <DocumentarySection />
      <ExtrasSection />
    </main>
  )
}
