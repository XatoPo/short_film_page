"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Image from "next/image"
import { ChevronDown, Facebook, Instagram, Youtube } from "lucide-react"

// TikTok icon component since it's not in Lucide
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
)

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
    const handleScrollClick = () => {
      const nextSection = document.querySelector("#nosotros")
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" })
      }
    }

    scrollIndicator.addEventListener("click", handleScrollClick)

    return () => {
      scrollIndicator.removeEventListener("click", handleScrollClick)
    }
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url('/hero-background.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

      {/* Logos - positioned at top corners */}
      <div className="absolute top-4 sm:top-6 md:top-8 left-0 right-0 flex justify-between items-center px-4 sm:px-6 md:px-8 z-20">
        {/* Documentary Logo - Left */}
        <div className="flex items-center">
          <Image
            src="/logo-documental.png"
            alt="Logo Documental - Donde nacen los barcos"
            width={120}
            height={120}
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain"
            priority
          />
        </div>

        {/* Productora Logo - Right */}
        <div className="flex items-center">
          <Image
            src="/logo-dhali.png"
            alt="Logo Documental - Donde nacen los barcos"
            width={120}
            height={120}
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain"
            priority
          />
        </div>
      </div>

      {/* Main content */}
      <div ref={logoRef} className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
          Donde nacen los barcos
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed max-w-2xl mx-auto">
          Un documental sobre la tradición naval
        </p>
      </div>

      {/* Social Media Icons - Bottom Left */}
      <div className="absolute bottom-6 sm:bottom-8 left-4 sm:left-6 md:left-8 z-20 flex flex-col sm:flex-row gap-3 sm:gap-4">
        <a
          href="#"
          className="group p-2 sm:p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
        >
          <Facebook className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-documentary-turquoise transition-colors" />
        </a>
        <a
          href="#"
          className="group p-2 sm:p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
        >
          <Instagram className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-documentary-turquoise transition-colors" />
        </a>
        <a
          href="#"
          className="group p-2 sm:p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
        >
          <TikTokIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-documentary-turquoise transition-colors" />
        </a>
        <a
          href="#"
          className="group p-2 sm:p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
        >
          <Youtube className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-documentary-turquoise transition-colors" />
        </a>
      </div>

      {/* Scroll Indicator - Bottom Center */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20 text-center cursor-pointer group"
      >
        <p className="text-white text-xs sm:text-sm mb-2 opacity-80 group-hover:opacity-100 transition-opacity">
          Desliza hacia abajo
        </p>
        <div className="flex justify-center">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center group-hover:border-white/80 transition-colors">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 group-hover:bg-white transition-colors" />
          </div>
        </div>
        <ChevronDown className="text-white mx-auto mt-2 w-5 h-5 sm:w-6 sm:h-6 group-hover:text-documentary-turquoise transition-colors" />
      </div>
    </section>
  )
}
