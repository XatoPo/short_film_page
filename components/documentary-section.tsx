"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Play, X, Info } from "lucide-react"
import Image from "next/image"
import { AnimatedTooltip } from "./ui/aceternity/animated-tooltip"
import { GlowCard } from "./ui/aceternity/glow-card"

const interactivePoints = [
  {
    id: "paint",
    x: "15%",
    y: "25%",
    title: "Pintura Tradicional",
    description: "Las técnicas de pintura utilizadas han sido transmitidas de generación en generación.",
    action: "documentary",
    color: "#1DF5E6",
  },
  {
    id: "wood",
    x: "35%",
    y: "45%",
    title: "Madera Noble",
    description: "Se utiliza madera de cedro y caoba, seleccionada cuidadosamente por su resistencia.",
    action: "info",
    color: "#1D8FF5",
  },
  {
    id: "tools",
    x: "60%",
    y: "35%",
    title: "Herramientas Artesanales",
    description: "Cada herramienta tiene una función específica y muchas son hechas a mano.",
    action: "info",
    color: "#4A1DF5",
  },
  {
    id: "bow",
    x: "85%",
    y: "20%",
    title: "Proa del Barco",
    description: "La forma de la proa determina la velocidad y estabilidad de la embarcación.",
    action: "info",
    color: "#6FA9F5",
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

  useEffect(() => {
    if (typeof window === "undefined") return

    const section = sectionRef.current
    const boat = boatRef.current

    if (!section || !boat) return

    // Animate boat image
    gsap.fromTo(
      boat,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: boat,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      },
    )

    // Animate interactive points - UNA SOLA animación de entrada
    const points = boat.querySelectorAll(".interactive-point")
    gsap.fromTo(
      points,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        delay: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: boat,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play reverse none none",
        },
      },
    )

    // Eliminar la animación de pulsación repetitiva y reemplazar con hover suave
    points.forEach((point) => {
      point.addEventListener("mouseenter", () => {
        gsap.to(point, { scale: 1.2, duration: 0.3, ease: "power2.out" })
      })
      point.addEventListener("mouseleave", () => {
        gsap.to(point, { scale: 1, duration: 0.3, ease: "power2.out" })
      })
    })
  }, [])

  const handlePointClick = (point: (typeof interactivePoints)[0]) => {
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
        className="min-h-screen relative py-20 flex items-center overflow-hidden"
        style={{
          backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#4A1DF5]/80 to-[#1D37F5]/80 z-0" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">El Documental</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Explora la embarcación y descubre los secretos de la construcción naval artesanal
            </p>
            <p className="text-white/80">Haz clic en los puntos interactivos para conocer más detalles</p>
          </div>

          <div ref={boatRef} className="relative max-w-5xl mx-auto">
            {/* Boat image container with interactive points */}
            <div className="relative">
              <Image
                src="/placeholder.svg?height=600&width=1000"
                alt="Embarcación Artesanal"
                width={1000}
                height={600}
                className="w-full rounded-lg shadow-2xl opacity-90"
              />

              {/* Interactive Points */}
              {interactivePoints.map((point) => (
                <AnimatedTooltip key={point.id} text={point.title} direction="top">
                  <button
                    className="interactive-point absolute w-6 h-6 md:w-8 md:h-8 rounded-full border-3 border-white shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer flex items-center justify-center group transform hover:scale-110"
                    style={{
                      left: point.x,
                      top: point.y,
                      backgroundColor: point.color,
                      transform: "translate(-50%, -50%)",
                    }}
                    onClick={() => handlePointClick(point)}
                  >
                    {point.action === "documentary" ? (
                      <Play className="w-2 h-2 md:w-3 md:h-3 text-white ml-0.5" />
                    ) : (
                      <Info className="w-2 h-2 md:w-3 md:h-3 text-white" />
                    )}

                    {/* Ripple effect */}
                    <div
                      className="absolute inset-0 rounded-full animate-ping opacity-30"
                      style={{ backgroundColor: point.color }}
                    />
                  </button>
                </AnimatedTooltip>
              ))}
            </div>
          </div>

          {/* Making Of Section */}
          <div className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              { title: "Making Of", desc: "Detrás de cámaras del documental" },
              { title: "Entrevista", desc: "Director y productora hablan del proyecto" },
              { title: "Podcast", desc: "Conversaciones con los artesanos" },
            ].map((item, index) => (
              <GlowCard key={index} className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden">
                <div className="text-center p-6">
                  <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                  <div className="aspect-video bg-black/20 rounded-lg mb-4 flex items-center justify-center group cursor-pointer hover:bg-black/30 transition-all duration-300">
                    <Play className="text-white w-12 h-12 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <p className="text-white/80">{item.desc}</p>
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* Documentary Modal */}
      {showDocumentary && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center animate-in fade-in duration-300">
          <button
            onClick={closeDocumentary}
            className="absolute top-4 right-4 z-10 bg-white/20 text-white rounded-full p-3 hover:bg-white/30 transition-colors"
          >
            <X size={24} />
          </button>

          <div className="w-full h-full max-w-6xl max-h-[80vh] mx-4 rounded-xl overflow-hidden shadow-2xl">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Documental Artesanos del Mar"
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Info Modal */}
      {showInfo.show && showInfo.point && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: showInfo.point.color }}
                >
                  <Info className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">{showInfo.point.title}</h3>
              </div>
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
