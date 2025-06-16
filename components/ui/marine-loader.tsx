"use client"

import { useEffect, useState } from "react"
import { gsap } from "gsap"

interface MarineLoaderProps {
  onComplete?: () => void
}

export function MarineLoader({ onComplete }: MarineLoaderProps) {
  const [loadingText, setLoadingText] = useState("Navegando...")
  const [progress, setProgress] = useState(0)

  const loadingTexts = [
    "Navegando hacia el puerto...",
    "Preparando las velas...",
    "Cargando herramientas artesanales...",
    "Ajustando las cuerdas...",
    "Revisando la madera noble...",
    "Listo para zarpar...",
  ]

  useEffect(() => {
    // Animate boat
    gsap.to(".boat", {
      x: "+=20",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    })

    // Animate waves
    gsap.to(".wave", {
      x: "+=30",
      duration: 3,
      repeat: -1,
      ease: "none",
    })

    // Animate anchor
    gsap.to(".anchor", {
      rotation: 10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    })

    // Animate rope
    gsap.to(".rope", {
      scaleY: 1.1,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    })

    // Progress simulation with realistic loading
    let currentProgress = 0
    const interval = setInterval(() => {
      // Simulate realistic loading with variable speeds
      const increment = Math.random() * 8 + 2
      currentProgress = Math.min(currentProgress + increment, 100)
      setProgress(currentProgress)

      // Change loading text
      const textIndex = Math.floor((currentProgress / 100) * loadingTexts.length)
      if (textIndex < loadingTexts.length) {
        setLoadingText(loadingTexts[textIndex])
      }

      if (currentProgress >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          onComplete?.()
        }, 800)
      }
    }, 200)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-documentary-deep via-documentary-turquoise to-documentary-wood flex items-center justify-center z-50">
      {/* Animated background waves */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute bottom-0 w-full h-32" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            className="wave opacity-30"
            d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
            fill="rgba(255,255,255,0.1)"
          />
        </svg>
        <svg className="absolute bottom-0 w-full h-24" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            className="wave opacity-20"
            d="M0,80 C300,20 900,100 1200,40 L1200,120 L0,120 Z"
            fill="rgba(255,255,255,0.05)"
            style={{ animationDelay: "-1s" }}
          />
        </svg>
      </div>

      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {/* Main boat illustration */}
        <div className="relative mb-8">
          <svg className="boat mx-auto" width="120" height="80" viewBox="0 0 120 80" fill="none">
            {/* Boat hull */}
            <path d="M20 50 Q60 35 100 50 L95 60 Q60 65 25 60 Z" fill="#B6A38C" stroke="#8F8B84" strokeWidth="2" />
            {/* Mast */}
            <line x1="60" y1="50" x2="60" y2="15" stroke="#8F8B84" strokeWidth="3" className="rope" />
            {/* Sail */}
            <path d="M62 15 Q80 20 85 35 L62 40 Z" fill="rgba(255,255,255,0.9)" stroke="#AAB0B6" strokeWidth="1" />
            {/* Flag */}
            <path d="M60 15 L75 18 L70 22 L60 20 Z" fill="#5FB4A4" />
          </svg>

          {/* Floating anchor */}
          <div className="anchor absolute -right-8 top-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"
                fill="#EFE7DC"
                stroke="#B6A38C"
                strokeWidth="1"
              />
              <circle cx="12" cy="9" r="2" fill="none" stroke="#B6A38C" strokeWidth="1.5" />
              <path d="M12 11V20M8 17L12 20L16 17" stroke="#B6A38C" strokeWidth="1.5" />
            </svg>
          </div>
        </div>

        {/* Logo/Title */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-wide">Donde nacen los barcos</h1>
          <p className="text-white/80 text-lg">Un documental sobre la tradición naval</p>
        </div>

        {/* Progress bar with boat theme */}
        <div className="mb-6">
          <div className="relative w-full h-3 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className="h-full bg-gradient-to-r from-documentary-sand via-documentary-turquoise to-documentary-wood transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              {/* Small boat on progress bar */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                  <path d="M2 8 Q8 6 14 8 L13 10 Q8 11 3 10 Z" fill="white" />
                  <line x1="8" y1="8" x2="8" y2="3" stroke="white" strokeWidth="1" />
                  <path d="M8 3 L11 5 L8 6 Z" fill="white" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-white/70 text-sm">{Math.round(progress)}%</span>
            <span className="text-white/70 text-sm">Cargando...</span>
          </div>
        </div>

        {/* Loading text with typewriter effect */}
        <div className="text-white/90 text-lg font-medium min-h-[1.5rem]">
          <span className="typewriter">{loadingText}</span>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-10 -left-10 opacity-20">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="18" stroke="white" strokeWidth="2" strokeDasharray="4 4" />
            <path d="M20 8L22 14L28 12L22 18L20 24L18 18L12 20L18 14L20 8Z" fill="white" />
          </svg>
        </div>

        <div className="absolute -bottom-10 -right-10 opacity-20">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M16 4L18 12L26 10L18 16L16 24L14 16L6 18L14 12L16 4Z"
              fill="white"
              stroke="white"
              strokeWidth="1"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
