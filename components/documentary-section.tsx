"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Play, X, Info } from "lucide-react"
import Image from "next/image"
import { DraggableCard } from "./ui/aceternity/draggable-card"

const interactivePoints = [
  {
    id: "paint",
    x: "45%",
    y: "30%",
    title: "Pintura Tradicional",
    description: "Las técnicas de pintura utilizadas han sido transmitidas de generación en generación.",
    action: "documentary",
    color: "bg-gradient-to-r from-amber-400 to-orange-500",
  },
  {
    id: "wood",
    x: "25%",
    y: "60%",
    title: "Madera Noble",
    description: "Se utiliza madera de cedro y caoba, seleccionada cuidadosamente por su resistencia.",
    action: "info",
    color: "bg-gradient-to-r from-emerald-400 to-teal-500",
  },
  {
    id: "tools",
    x: "70%",
    y: "50%",
    title: "Herramientas Artesanales",
    description: "Cada herramienta tiene una función específica y muchas son hechas a mano.",
    action: "info",
    color: "bg-gradient-to-r from-purple-400 to-pink-500",
  },
  {
    id: "bow",
    x: "80%",
    y: "25%",
    title: "Proa del Barco",
    description: "La forma de la proa determina la velocidad y estabilidad de la embarcación.",
    action: "info",
    color: "bg-gradient-to-r from-blue-400 to-cyan-500",
  },
]

export default function DocumentarySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const boatRef = useRef<HTMLDivElement>(null)
  const [showDocumentary, setShowDocumentary] = useState(false)
  const [showInfo, setShowInfo] = useState<{ show: boolean; point: (typeof interactivePoints)[0] | null }>({
    show: false,
    point: null,
  })
  const [pointsReady, setPointsReady] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const section = sectionRef.current
    const boat = boatRef.current

    if (!section || !boat) return

    // Animate boat image
    gsap.fromTo(
      boat,
      { opacity: 0, scale: 0.9, rotationY: 15 },
      {
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: boat,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        onComplete: () => setPointsReady(true),
      },
    )

    // Animate interactive points only after boat animation
    if (pointsReady) {
      const points = boat.querySelectorAll(".interactive-point")
      gsap.fromTo(
        points,
        { scale: 0, opacity: 0, rotation: 180 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "back.out(1.7)",
        },
      )

      // Continuous pulsing animation
      gsap.to(points, {
        scale: 1.3,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        stagger: 0.4,
      })
    }
  }, [pointsReady])

  const handlePointClick = (point: (typeof interactivePoints)[0]) => {
    if (!pointsReady) return // Prevent clicks before animation completes

    if (point.action === "documentary") {
      setShowDocumentary(true)
      document.body.style.overflow = "hidden"
    } else {
      setShowInfo({ show: true, point })
    }
  }

  const closeDocumentary = () => {
    setShowDocumentary(false)
    document.body.style.overflow = "auto"
  }

  const closeInfo = () => {
    setShowInfo({ show: false, point: null })
  }

  return (
    <>
      <section
        id="documental"
        ref={sectionRef}
        className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-12 md:py-20 flex items-center"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-8">El Documental</h2>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-4 md:mb-8 px-4">
              Explora la embarcación y descubre los secretos de la construcción naval artesanal
            </p>
            <p className="text-white/80 text-sm md:text-base">
              Haz clic en los puntos interactivos para conocer más detalles
            </p>
          </div>

          <div ref={boatRef} className="relative max-w-5xl mx-auto mb-8 md:mb-16">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/placeholder.svg?height=600&width=1000"
                alt="Embarcación Artesanal"
                width={1000}
                height={600}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Interactive Points */}
            {interactivePoints.map((point) => (
              <button
                key={point.id}
                className={`interactive-point absolute w-8 h-8 md:w-10 md:h-10 ${point.color} rounded-full border-3 border-white shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer flex items-center justify-center group ${
                  !pointsReady ? "pointer-events-none" : ""
                }`}
                style={{ left: point.x, top: point.y }}
                onClick={() => handlePointClick(point)}
              >
                {point.action === "documentary" ? (
                  <Play className="w-3 h-3 md:w-4 md:h-4 text-white ml-0.5" />
                ) : (
                  <Info className="w-3 h-3 md:w-4 md:h-4 text-white" />
                )}

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-black/80 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                  {point.title}
                </div>
              </button>
            ))}
          </div>

          {/* Making Of Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Making Of",
                description: "Detrás de cámaras del documental",
                gradient: "from-rose-500 to-pink-600",
              },
              {
                title: "Entrevista",
                description: "Director y productora hablan del proyecto",
                gradient: "from-blue-500 to-cyan-600",
              },
              {
                title: "Podcast",
                description: "Conversaciones con los artesanos",
                gradient: "from-emerald-500 to-teal-600",
              },
            ].map((item, index) => (
              <DraggableCard key={index} className="w-full">
                <div
                  className={`text-center bg-gradient-to-br ${item.gradient} backdrop-blur-sm rounded-xl p-4 md:p-6 h-full shadow-xl hover:shadow-2xl transition-all duration-300`}
                >
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">{item.title}</h3>
                  <div className="aspect-video bg-black/20 rounded-lg mb-3 md:mb-4 flex items-center justify-center hover:bg-black/30 transition-colors cursor-pointer">
                    <Play className="text-white w-8 h-8 md:w-12 md:h-12" />
                  </div>
                  <p className="text-white/90 text-sm md:text-base">{item.description}</p>
                </div>
              </DraggableCard>
            ))}
          </div>
        </div>
      </section>

      {/* Documentary Modal */}
      {showDocumentary && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button
            onClick={closeDocumentary}
            className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white rounded-full p-3 transition-colors"
          >
            <X size={24} />
          </button>

          <div className="w-full h-full max-w-6xl max-h-[80vh] mx-4">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Documental Artesanos del Mar"
              className="w-full h-full rounded-lg"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Info Modal */}
      {showInfo.show && showInfo.point && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-gray-800">{showInfo.point.title}</h3>
              <button onClick={closeInfo} className="text-gray-500 hover:text-gray-700 transition-colors">
                <X size={24} />
              </button>
            </div>
            <p className="text-gray-600 leading-relaxed">{showInfo.point.description}</p>
          </div>
        </div>
      )}
    </>
  )
}
