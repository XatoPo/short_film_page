"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Anchor, Ship, Waves, MapPin, X } from "lucide-react"
import Image from "next/image"

const harborPoints = [
  {
    id: "dock1",
    x: "20%",
    y: "60%",
    title: "Muelle Principal",
    description: "Aquí es donde se construyen las embarcaciones más grandes. El proceso puede tomar hasta 6 meses.",
    details: "Este muelle ha sido el corazón de la actividad naval durante más de 100 años.",
    icon: Ship,
    color: "#1D8FF5",
  },
  {
    id: "workshop",
    x: "45%",
    y: "40%",
    title: "Taller de Kike",
    description: "El taller donde la magia sucede. Herramientas tradicionales y técnicas ancestrales.",
    details: "Cada herramienta tiene su historia y propósito específico en la construcción naval.",
    icon: Anchor,
    color: "#1DF5E6",
  },
  {
    id: "storage",
    x: "70%",
    y: "55%",
    title: "Almacén de Maderas",
    description: "Aquí se almacenan y curan las maderas nobles utilizadas en la construcción.",
    details: "La madera debe curarse durante años antes de estar lista para su uso.",
    icon: MapPin,
    color: "#6FA9F5",
  },
  {
    id: "launch",
    x: "80%",
    y: "75%",
    title: "Zona de Botadura",
    description: "El momento más emocionante: cuando la embarcación toca el agua por primera vez.",
    details: "Una tradición que se celebra con toda la comunidad presente.",
    icon: Waves,
    color: "#4A1DF5",
  },
]

const boats = [
  {
    id: "boat1",
    x: "15%",
    y: "70%",
    name: "La Gaviota",
    type: "Pesquero tradicional",
    status: "En construcción",
    progress: 75,
  },
  {
    id: "boat2",
    x: "35%",
    y: "65%",
    name: "Viento del Mar",
    type: "Embarcación recreativa",
    status: "Terminada",
    progress: 100,
  },
  {
    id: "boat3",
    x: "55%",
    y: "72%",
    name: "Esperanza",
    type: "Bote de transporte",
    status: "En diseño",
    progress: 25,
  },
]

export default function HarborSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const harborRef = useRef<HTMLDivElement>(null)
  const [selectedPoint, setSelectedPoint] = useState<(typeof harborPoints)[0] | null>(null)
  const [selectedBoat, setSelectedBoat] = useState<(typeof boats)[0] | null>(null)
  const [activeLayer, setActiveLayer] = useState<"overview" | "construction" | "history">("overview")

  useEffect(() => {
    if (typeof window === "undefined") return

    const section = sectionRef.current
    const harbor = harborRef.current

    if (!section || !harbor) return

    // Animate harbor view
    gsap.fromTo(
      harbor,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: harbor,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      },
    )

    // Animate points
    const points = harbor.querySelectorAll(".harbor-point")
    gsap.fromTo(
      points,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.2,
        delay: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: harbor,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      },
    )

    // Floating animation for boats
    const boatElements = harbor.querySelectorAll(".harbor-boat")
    boatElements.forEach((boat, index) => {
      gsap.to(boat, {
        y: "+=10",
        duration: 2 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      })
    })

    // Pulsing animation for active points
    gsap.to(points, {
      scale: 1.2,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      stagger: 0.5,
    })
  }, [])

  const handlePointClick = (point: (typeof harborPoints)[0]) => {
    setSelectedPoint(point)
    setSelectedBoat(null)
  }

  const handleBoatClick = (boat: (typeof boats)[0]) => {
    setSelectedBoat(boat)
    setSelectedPoint(null)
  }

  const closeModal = () => {
    setSelectedPoint(null)
    setSelectedBoat(null)
  }

  return (
    <>
      <section ref={sectionRef} className="min-h-screen bg-gradient-to-br from-[#1D37F5] to-[#1DF5E6] py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 md:mb-8">Explora el Puerto</h2>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Descubre cada rincón donde nacen las embarcaciones tradicionales
            </p>

            {/* Layer Controls */}
            <div className="flex justify-center gap-4 mb-8">
              {[
                { key: "overview", label: "Vista General", icon: MapPin },
                { key: "construction", label: "Construcción", icon: Ship },
                { key: "history", label: "Historia", icon: Anchor },
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveLayer(key as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    activeLayer === key
                      ? "bg-white text-[#1D37F5] shadow-lg"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Harbor Map */}
          <div ref={harborRef} className="relative max-w-6xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#6FA9F5]/20 to-[#1D8FF5]/20 backdrop-blur-sm">
              <Image
                src="/placeholder.svg?height=600&width=1000"
                alt="Vista del Puerto"
                width={1000}
                height={600}
                className="w-full h-auto opacity-80"
              />

              {/* Harbor Points */}
              {harborPoints.map((point) => (
                <button
                  key={point.id}
                  className={`harbor-point absolute w-8 h-8 md:w-10 md:h-10 rounded-full border-3 border-white shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer flex items-center justify-center group ${
                    activeLayer === "overview" || activeLayer === "construction" ? "opacity-100" : "opacity-50"
                  }`}
                  style={{
                    left: point.x,
                    top: point.y,
                    backgroundColor: point.color,
                  }}
                  onClick={() => handlePointClick(point)}
                >
                  <point.icon className="w-4 h-4 md:w-5 md:h-5 text-white" />

                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-black/80 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                    {point.title}
                  </div>
                </button>
              ))}

              {/* Boats */}
              {boats.map((boat) => (
                <button
                  key={boat.id}
                  className={`harbor-boat absolute w-12 h-8 md:w-16 md:h-10 cursor-pointer transition-all duration-300 hover:scale-110 ${
                    activeLayer === "overview" || activeLayer === "construction" ? "opacity-100" : "opacity-30"
                  }`}
                  style={{ left: boat.x, top: boat.y }}
                  onClick={() => handleBoatClick(boat)}
                >
                  <div
                    className="w-full h-full rounded-lg shadow-lg flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${
                        boat.status === "Terminada"
                          ? "#1DF5E6, #6FA9F5"
                          : boat.status === "En construcción"
                            ? "#1D8FF5, #4A1DF5"
                            : "#6FA9F5, #1D37F5"
                      })`,
                    }}
                  >
                    <Ship className="w-4 h-4 md:w-6 md:h-6 text-white" />
                  </div>
                </button>
              ))}

              {/* Animated Waves */}
              <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#1DF5E6]/30 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#1DF5E6]/50 animate-pulse" />
                </div>
              </div>
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
      </section>

      {/* Point Detail Modal */}
      {selectedPoint && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: selectedPoint.color }}
                >
                  <selectedPoint.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{selectedPoint.title}</h3>
                  <p className="text-gray-600">{selectedPoint.description}</p>
                </div>
              </div>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 transition-colors">
                <X size={24} />
              </button>
            </div>
            <p className="text-gray-700 leading-relaxed">{selectedPoint.details}</p>
          </div>
        </div>
      )}

      {/* Boat Detail Modal */}
      {selectedBoat && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedBoat.name}</h3>
                <p className="text-gray-600 mb-4">{selectedBoat.type}</p>
                <div className="flex items-center gap-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedBoat.status === "Terminada"
                        ? "bg-green-100 text-green-800"
                        : selectedBoat.status === "En construcción"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {selectedBoat.status}
                  </span>
                  <span className="text-gray-600">Progreso: {selectedBoat.progress}%</span>
                </div>
              </div>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="h-3 rounded-full transition-all duration-500"
                  style={{
                    width: `${selectedBoat.progress}%`,
                    background: `linear-gradient(90deg, #1D8FF5, #1DF5E6)`,
                  }}
                />
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">
              Esta embarcación representa la tradición y el conocimiento transmitido de generación en generación. Cada
              detalle es cuidadosamente trabajado a mano siguiendo técnicas ancestrales.
            </p>
          </div>
        </div>
      )}
    </>
  )
}
