"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Anchor, Compass, Ship, Waves, MapPin, X } from "lucide-react"
import { AnimatedTooltip } from "./ui/aceternity/animated-tooltip"
import { GlowCard } from "./ui/aceternity/glow-card"

const funFacts = [
  {
    icon: Ship,
    title: "Tipos de Embarcaciones",
    description: "Existen más de 15 tipos diferentes de embarcaciones tradicionales en la región.",
    details: "Cada tipo tiene características específicas según su uso: pesca, transporte o recreación.",
  },
  {
    icon: Anchor,
    title: "Maderas Utilizadas",
    description: "Se utilizan principalmente cedro, caoba y roble para diferentes partes del barco.",
    details: "La selección de la madera es crucial para la durabilidad y resistencia de la embarcación.",
  },
  {
    icon: Compass,
    title: "Técnicas Ancestrales",
    description: "Las técnicas de construcción se han transmitido por más de 200 años.",
    details: "Cada maestro artesano aporta su propio estilo y conocimientos únicos.",
  },
  {
    icon: Waves,
    title: "Impacto Cultural",
    description: "La construcción naval es parte fundamental de la identidad cultural costera.",
    details: "Estas tradiciones conectan a las comunidades con su herencia marítima.",
  },
]

const harborPoints = [
  {
    id: "dock",
    x: "20%",
    y: "60%",
    title: "Muelle Principal",
    description: "Donde se construyen las embarcaciones más grandes",
    details: "Este muelle ha sido el corazón de la actividad naval durante más de 100 años.",
    color: "#1D8FF5",
  },
  {
    id: "workshop",
    x: "50%",
    y: "40%",
    title: "Taller de Kike",
    description: "El corazón de la construcción artesanal",
    details: "Cada herramienta tiene su historia y propósito específico en la construcción naval.",
    color: "#1DF5E6",
  },
  {
    id: "storage",
    x: "75%",
    y: "55%",
    title: "Almacén de Maderas",
    description: "Donde se curan las maderas nobles",
    details: "La madera debe curarse durante años antes de estar lista para su uso.",
    color: "#6FA9F5",
  },
  {
    id: "launch",
    x: "65%",
    y: "75%",
    title: "Zona de Botadura",
    description: "Donde las embarcaciones tocan el agua por primera vez",
    details: "Una tradición que se celebra con toda la comunidad presente.",
    color: "#4A1DF5",
  },
]

export default function ExtrasSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const factsRef = useRef<HTMLDivElement>(null)
  const harborRef = useRef<HTMLDivElement>(null)
  const [selectedPoint, setSelectedPoint] = useState<(typeof harborPoints)[0] | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const section = sectionRef.current
    const facts = factsRef.current
    const harbor = harborRef.current

    if (!section || !facts || !harbor) return

    // Animate fact cards
    gsap.fromTo(
      facts.children,
      { opacity: 0, y: 50, rotationY: 45 },
      {
        opacity: 1,
        y: 0,
        rotationY: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: facts,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      },
    )

    // Animate harbor section
    gsap.fromTo(
      harbor,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        scrollTrigger: {
          trigger: harbor,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      },
    )

    // Animate harbor points
    const points = harbor.querySelectorAll(".harbor-point")
    gsap.fromTo(
      points,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.2,
        delay: 0.5,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: harbor,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      },
    )

    // Pulsing animation for points
    gsap.to(points, {
      scale: 1.2,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      stagger: 0.5,
    })

    // Animate water
    const water = harbor.querySelector(".water-animation")
    if (water) {
      gsap.to(water, {
        x: "+=20",
        y: "+=5",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    }
  }, [])

  const handlePointClick = (point: (typeof harborPoints)[0]) => {
    setSelectedPoint(point)
  }

  const closeModal = () => {
    setSelectedPoint(null)
  }

  return (
    <>
      <section id="extras" ref={sectionRef} className="min-h-screen bg-gradient-to-b from-[#1D37F5] to-[#6FA9F5] py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">¿Sabías qué?</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Datos fascinantes sobre la construcción naval artesanal
            </p>
          </div>

          <div ref={factsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {funFacts.map((fact, index) => (
              <GlowCard key={index} className="h-full">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/20 transition-all duration-300 cursor-pointer group h-full">
                  <div className="mb-4 flex justify-center">
                    <fact.icon className="w-12 h-12 text-[#1DF5E6] group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{fact.title}</h3>
                  <p className="text-white/80 mb-4">{fact.description}</p>
                  <p className="text-white/60 text-sm">{fact.details}</p>
                </div>
              </GlowCard>
            ))}
          </div>

          {/* Interactive Harbor Section */}
          <div ref={harborRef} className="text-center">
            <h3 className="text-3xl font-bold text-white mb-8">Explora el Puerto</h3>
            <div className="relative max-w-4xl mx-auto">
              <div className="relative aspect-video bg-gradient-to-b from-[#1DF5E6]/20 to-[#1D8FF5]/20 rounded-lg overflow-hidden shadow-xl">
                <img
                  src="/placeholder.svg?height=400&width=800"
                  alt="Vista del Puerto"
                  className="w-full h-full object-cover opacity-70"
                />

                {/* Animated Water */}
                <div className="water-animation absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-[#1DF5E6]/40 to-transparent" />

                {/* Harbor Points */}
                {harborPoints.map((point) => (
                  <AnimatedTooltip key={point.id} text={point.title} direction="top">
                    <button
                      className="harbor-point absolute w-8 h-8 rounded-full border-3 border-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer flex items-center justify-center"
                      style={{
                        left: point.x,
                        top: point.y,
                        backgroundColor: point.color,
                      }}
                      onClick={() => handlePointClick(point)}
                    >
                      <MapPin className="w-4 h-4 text-white" />
                    </button>
                  </AnimatedTooltip>
                ))}
              </div>

              {/* Legend */}
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                {harborPoints.map((point) => (
                  <div key={point.id} className="flex items-center gap-2 text-white/80">
                    <div
                      className="w-4 h-4 rounded-full border-2 border-white"
                      style={{ backgroundColor: point.color }}
                    />
                    <span className="text-sm">{point.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Harbor Point Modal */}
      {selectedPoint && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: selectedPoint.color }}
                >
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">{selectedPoint.title}</h3>
              </div>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 transition-colors">
                <X size={24} />
              </button>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">{selectedPoint.description}</p>
            <p className="text-gray-500 text-sm">{selectedPoint.details}</p>
          </div>
        </div>
      )}
    </>
  )
}
