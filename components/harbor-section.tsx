"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Paintbrush, Hammer, TreePine, Wrench, X } from "lucide-react"
import Image from "next/image"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const workshopPoints = [
  {
    id: "painting",
    x: "25%",
    y: "45%",
    title: "Taller de pintura de David",
    description:
      "Aquí encontramos a David, su trabajo incluye la preparación de superficies, la aplicación de pintura y la reparación de daños en diversos materiales como madera, fibra de vidrio o metal. Además, puede realizar trabajos de pintura decorativa, como nombres, refranes o adornos, en embarcaciones y otros espacios.",
    icon: Paintbrush,
    color: "#DC2626", // Rojo sólido
    image: "/workshop/david-painting.jpg",
  },
  {
    id: "caulking",
    x: "75%",
    y: "70%",
    title: "Espacio de calafateo",
    description:
      "Aquí encontramos a los diferentes artesanos realizando esta actividad que consiste en una técnica tradicional para sellar las juntas entre las tablas de madera de un barco, evitando que el agua entre en la embarcación.",
    icon: Hammer,
    color: "#16A34A", // Verde sólido
    image: "/workshop/caulking-space.jpg",
  },
  {
    id: "wood",
    x: "50%",
    y: "35%",
    title: "Selección de maderas",
    description:
      "Seleccionar la madera adecuada es crucial en la construcción artesanal de barcos debido a su impacto directo en la durabilidad, resistencia y rendimiento de la embarcación. Una elección acertada asegura que el barco pueda soportar las condiciones marinas adversas, como la humedad, la salinidad y los cambios de temperatura, prolongando su vida útil y manteniendo su integridad estructural.",
    icon: TreePine,
    color: "#EAB308", // Amarillo sólido
    image: "/workshop/wood-selection.jpg",
  },
  {
    id: "kike-workshop",
    x: "15%",
    y: "25%",
    title: "Taller de Kike",
    description:
      "Aquí encontramos a Kike, donde se dedica a la construcción, reparación y restauración de embarcaciones, utilizando técnicas tradicionales y a menudo materiales específicos como madera.",
    icon: Wrench,
    color: "#7C3AED", // Morado sólido
    image: "/workshop/kike-workshop.jpg",
  },
]

export default function HarborSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const harborRef = useRef<HTMLDivElement>(null)
  const [selectedPoint, setSelectedPoint] = useState<(typeof workshopPoints)[0] | null>(null)

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

    // Animate points - SOLO FADE IN/OUT
    const points = harbor.querySelectorAll(".workshop-point")
    gsap.fromTo(
      points,
      {
        scale: 0,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        delay: 0.5,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      },
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const handlePointClick = (point: (typeof workshopPoints)[0]) => {
    setSelectedPoint(point)
  }

  const closeModal = () => {
    setSelectedPoint(null)
  }

  return (
    <>
      <section
        id="taller"
        ref={sectionRef}
        className="min-h-screen bg-gradient-to-br from-[#1D37F5] to-[#1DF5E6] py-12 md:py-20"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 md:mb-8">Explora el Taller</h2>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Descubre cada espacio donde los artesanos dan vida a las embarcaciones tradicionales
            </p>
          </div>

          {/* Interactive Workshop Map */}
          <div ref={harborRef} className="relative max-w-6xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#6FA9F5]/20 to-[#1D8FF5]/20 backdrop-blur-sm">
              <Image
                src="/workshop/harbor-real.jpg"
                alt="Vista del Taller Naval"
                width={1000}
                height={600}
                className="w-full h-auto"
                priority
              />

              {/* Workshop Points */}
              {workshopPoints.map((point) => (
                <button
                  key={point.id}
                  className="workshop-point absolute w-12 h-12 md:w-14 md:h-14 rounded-full border-3 border-white shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer flex items-center justify-center group hover:scale-125"
                  style={{
                    left: point.x,
                    top: point.y,
                    backgroundColor: point.color,
                  }}
                  onClick={() => handlePointClick(point)}
                >
                  <point.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />

                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-4 py-2 bg-black/90 text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10 shadow-lg">
                    {point.title}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90"></div>
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
            <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-white font-semibold text-lg mb-4 text-center">Áreas del Taller</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {workshopPoints.map((point) => (
                  <div
                    key={point.id}
                    className="flex items-center gap-3 text-white/90 bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors cursor-pointer"
                    onClick={() => handlePointClick(point)}
                  >
                    <div
                      className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center shadow-md"
                      style={{ backgroundColor: point.color }}
                    >
                      <point.icon className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm font-medium">
                      {point.title.replace("Taller de ", "").replace("Espacio de ", "").replace("Selección de ", "")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal mejorado */}
      {selectedPoint && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-300">
            {/* Header mejorado */}
            <div className="relative bg-gradient-to-r from-gray-50 to-white p-8 rounded-t-3xl border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-6">
                  <div
                    className="w-24 h-24 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3"
                    style={{ backgroundColor: selectedPoint.color }}
                  >
                    <selectedPoint.icon className="w-12 h-12 text-white" />
                  </div>
                  <div>
                    <h3 className="text-4xl font-bold text-gray-800 mb-3">{selectedPoint.title}</h3>
                    <div className="w-20 h-2 rounded-full shadow-sm" style={{ backgroundColor: selectedPoint.color }} />
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-3 rounded-full hover:bg-gray-100 group"
                >
                  <X size={32} className="group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>
            </div>

            {/* Content mejorado */}
            <div className="p-8">
              <div className="grid lg:grid-cols-2 gap-10">
                {/* Image */}
                <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-xl group">
                  <Image
                    src={selectedPoint.image || "/placeholder.svg"}
                    alt={selectedPoint.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Description */}
                <div className="flex flex-col justify-center space-y-6">
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed text-xl font-light">{selectedPoint.description}</p>
                  </div>

                  {/* Decorative element */}
                  <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: selectedPoint.color }} />
                    <span className="text-gray-500 text-sm font-medium uppercase tracking-wider">
                      Tradición Artesanal
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
