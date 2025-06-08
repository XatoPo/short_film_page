"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { X, Award } from "lucide-react"
import Image from "next/image"
import { GlowCard } from "./ui/aceternity/glow-card"

const characters = [
  {
    id: "kike",
    name: "Kike",
    title: "Maestro Artesano",
    image: "/placeholder.svg?height=300&width=300",
    biography:
      "Kike es un maestro artesano con más de 30 años de experiencia en la construcción de embarcaciones tradicionales. Su taller es un santuario donde se preservan técnicas ancestrales.",
    hasWebsodio: true,
    websodioUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    achievements: ["Maestro Artesano Nacional", "Premio a la Tradición Naval", "Mentor de 15 aprendices"],
    color: "#1D8FF5",
  },
  {
    id: "ricardo",
    name: "Ricardo",
    title: "Veterano de Marina",
    image: "/placeholder.svg?height=300&width=300",
    biography:
      "Ricardo sirvió en la marina durante 25 años y ahora comparte su conocimiento sobre navegación y mantenimiento de embarcaciones con las nuevas generaciones.",
    hasWebsodio: true,
    websodioUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    achievements: ["Capitán de Marina", "Instructor Naval", "Experto en navegación tradicional"],
    color: "#1DF5E6",
  },
  {
    id: "david",
    name: "David",
    title: "Joven Aprendiz",
    image: "/placeholder.svg?height=300&width=300",
    biography:
      "David representa la nueva generación que busca aprender y preservar estas tradiciones. Su pasión por el oficio es contagiosa.",
    hasWebsodio: true,
    websodioUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    achievements: ["Mejor Aprendiz 2023", "Innovador en técnicas mixtas", "Embajador juvenil"],
    color: "#4A1DF5",
  },
  {
    id: "especialista",
    name: "Dr. Especialista",
    title: "Historiador Naval",
    image: "/placeholder.svg?height=300&width=300",
    biography:
      "Experto en historia naval y tradiciones marítimas. Aporta el contexto histórico y cultural necesario para entender la importancia de estas tradiciones.",
    hasWebsodio: false,
    achievements: ["PhD en Historia Marítima", "Autor de 5 libros", "Consultor UNESCO"],
    color: "#6FA9F5",
  },
  {
    id: "economista",
    name: "Economista",
    title: "Analista Económico",
    image: "/placeholder.svg?height=300&width=300",
    biography: "Analiza el impacto económico y social de la industria artesanal naval en las comunidades costeras.",
    hasWebsodio: false,
    achievements: ["Especialista en Economía Azul", "Consultor BID", "Investigador principal"],
    color: "#1D37F5",
  },
]

export default function CharactersSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const charactersRef = useRef<HTMLDivElement>(null)
  const [selectedCharacter, setSelectedCharacter] = useState<(typeof characters)[0] | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const section = sectionRef.current
    const charactersGrid = charactersRef.current

    if (!section || !charactersGrid) return

    // Animate characters grid
    gsap.fromTo(
      charactersGrid.children,
      { opacity: 0, y: 50, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: charactersGrid,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      },
    )
  }, [])

  const openCharacterModal = (character: (typeof characters)[0]) => {
    setSelectedCharacter(character)
    document.body.style.overflow = "hidden"
  }

  const closeCharacterModal = () => {
    setSelectedCharacter(null)
    document.body.style.overflow = "auto"
  }

  return (
    <>
      <section
        id="personajes"
        ref={sectionRef}
        className="min-h-screen bg-gradient-to-b from-[#1DF5E6] to-[#4A1DF5] py-20"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Personajes</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Conoce a las personas que dan vida a esta historia
            </p>
          </div>

          {/* Main Characters */}
          <div ref={charactersRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {characters.slice(0, 3).map((character) => (
              <GlowCard key={character.id} className="cursor-pointer" glowClassName={`bg-[${character.color}]/30`}>
                <div className="text-center group" onClick={() => openCharacterModal(character)}>
                  <div className="relative mb-6 overflow-hidden rounded-lg mx-auto w-64 h-80 shadow-2xl">
                    <Image
                      src={character.image || "/placeholder.svg"}
                      alt={character.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-sm">Click para conocer más</p>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{character.name}</h3>
                  <p className="text-white/80 text-lg">{character.title}</p>
                </div>
              </GlowCard>
            ))}
          </div>

          {/* Specialists */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {characters.slice(3).map((character) => (
              <GlowCard key={character.id} className="cursor-pointer" glowClassName={`bg-[${character.color}]/30`}>
                <div className="text-center group" onClick={() => openCharacterModal(character)}>
                  <div className="relative mb-4 overflow-hidden rounded-lg mx-auto w-48 h-60 shadow-xl">
                    <Image
                      src={character.image || "/placeholder.svg"}
                      alt={character.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{character.name}</h3>
                  <p className="text-white/80">{character.title}</p>
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* Character Modal */}
      {selectedCharacter && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="relative">
              <button
                onClick={closeCharacterModal}
                className="absolute top-4 right-4 z-10 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
              >
                <X size={24} />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                <div>
                  <div className="relative rounded-lg overflow-hidden shadow-xl mb-6">
                    <Image
                      src={selectedCharacter.image || "/placeholder.svg"}
                      alt={selectedCharacter.name}
                      width={400}
                      height={500}
                      className="w-full"
                    />
                    <div className="absolute inset-0 opacity-20" style={{ backgroundColor: selectedCharacter.color }} />
                  </div>

                  {/* Achievements */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Logros</h4>
                    <ul className="space-y-2">
                      {selectedCharacter.achievements?.map((achievement, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-[#1D8FF5]" />
                          <span className="text-gray-700">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <div
                    className="inline-block px-3 py-1 rounded-full text-white text-sm font-medium mb-4"
                    style={{ backgroundColor: selectedCharacter.color }}
                  >
                    {selectedCharacter.title}
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">{selectedCharacter.name}</h2>
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">{selectedCharacter.biography}</p>

                  {selectedCharacter.hasWebsodio && (
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Websodio</h3>
                      <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                        <iframe
                          src={selectedCharacter.websodioUrl}
                          title={`Websodio de ${selectedCharacter.name}`}
                          className="w-full h-full"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
