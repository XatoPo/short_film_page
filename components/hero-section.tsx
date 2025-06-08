"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ChevronDown, Facebook, Instagram, Youtube } from "lucide-react"
import Image from "next/image"
import { Spotlight } from "./ui/aceternity/spotlight"

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const section = sectionRef.current
    const logo = logoRef.current
    const scrollIndicator = scrollIndicatorRef.current

    if (!section || !logo || !scrollIndicator) return

    // Initial animations
    gsap.fromTo(logo, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" })

    // Floating animation for scroll indicator
    gsap.to(scrollIndicator, {
      y: 10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    })

    // Parallax effect on scroll (más suave)
    gsap.to(section, {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    })

    // Scroll indicator click handler
    scrollIndicator.addEventListener("click", () => {
      const nextSection = document.querySelector("#nosotros")
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" })
      }
    })
  }, [])

  return (
    <section id="hero" ref={sectionRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Taller de Kike - Workshop"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
      </div>

      {/* Main Logo */}
      <Spotlight className="relative z-10 text-center">
        <div ref={logoRef} className="relative z-10 text-center">
          <div className="mb-8">
            <Image
              src="/placeholder.svg?height=200&width=400"
              alt="Logo del Documental"
              width={400}
              height={200}
              className="mx-auto"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-wide">Artesanos del Mar</h1>
          <p className="text-xl md:text-2xl text-white/90 font-light">Un documental sobre la tradición naval</p>
        </div>
      </Spotlight>

      {/* Productora Logo */}
      <div className="absolute top-8 right-8 z-20">
        <Image
          src="/placeholder.svg?height=80&width=120"
          alt="Logo Productora"
          width={120}
          height={80}
          className="opacity-90"
        />
      </div>

      {/* Social Media Icons */}
      <div className="absolute bottom-8 left-8 z-20 flex space-x-4">
        <a href="#" className="text-white hover:text-[#1D8FF5] transition-colors duration-300">
          <Facebook size={24} />
        </a>
        <a href="#" className="text-white hover:text-[#1D8FF5] transition-colors duration-300">
          <Instagram size={24} />
        </a>
        <a href="#" className="text-white hover:text-[#1D8FF5] transition-colors duration-300">
          <Youtube size={24} />
        </a>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 text-center cursor-pointer"
      >
        <p className="text-white text-sm mb-2">Desliza hacia abajo</p>
        <ChevronDown className="text-white mx-auto" size={24} />
      </div>
    </section>
  )
}
