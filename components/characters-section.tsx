"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { X, Award } from "lucide-react"
import Image from "next/image"
import { GlowCard } from "./ui/aceternity/glow-card"

const characters = [
  {
    id: "kike",
    name: "Enrique Rejas Olaguibel",
    title: "Artesano Naval",
    image: "/characters/kike.jpg",
    biography:
      "Enrique es un maestro artesano con más de 15 años de experiencia en la construcción de embarcaciones tradicionales. Su taller es un santuario donde se preservan técnicas ancestrales.",
    hasWebsodio: true,
    websodioUrl: "https://www.youtube.com/embed/d3cgemSclN4?si=eHcg1g7577vR2KXi",
    achievements: ["Maestro artesano de su propio taller", "15 años de experiencia en este arte"],
    color: "#5FB4A4", // Turquesa suave
  },
  {
    id: "ricardo",
    name: "Ricardo Rueda",
    title: "Dueño artesano",
    image: "/characters/ricardo-portrait.jpg", // Foto real de Ricardo
    biography:
      "Ricardo es dueño de su propio taller artesanal y comparte su conocimiento sobre construcción y mantenimiento de embarcaciones con las nuevas generaciones.",
    hasWebsodio: true,
    websodioUrl: "https://youtube.com/@dondenacenlosbarcos?si=-zDAjwByOONEuad9",
    achievements: [
      "Capitán de marina especializado en el uso estrategias para el combate",
      "Dueño del varadero junto a su hermano",
    ],
    color: "#B6A38C", // Madera lavada
  },
  {
    id: "david",
    name: "David Carrillo",
    title: "Pintor artesano",
    image: "/characters/david.jpg",
    biography:
      "David Carrillo es un pintor artesano con más de 5 años de experiencia. Al principio su vocación era la de un pintor normal, pero decidió tomar el siguiente paso y empezar con la pintura artesana naval. Ahí, se encarga de proteger y embellecer embarcaciones a través de la aplicación de pintura y otros recubrimientos.",
    hasWebsodio: true,
    websodioUrl: "https://www.youtube.com/watch?v=-WR800JF__Q&t=2s",
    achievements: ["Pintor profesional", "Más de 5 años de experiencias pintando y decorando barcos artesanales"],
    color: "#2F4E5C", // Azul profundo
  },
  {
    id: "brando",
    name: "Lic. Brando Tarrillo",
    title: "Abogado",
    image: "/characters/brando.jpg", // Se actualizará con nueva foto
    biography:
      "Brando Tarrillo es el abogado y uno de nuestros especialistas involucrados en nuestro documental. Su aporte nos hace entender un poco más sobre las normas y ayudas legales que estos artesanos requieren para ser el sustento de sus familias.",
    hasWebsodio: false,
    achievements: ["Colegiado en Colegio de Abogados del Callao", "Número de colegiatura: 9869"],
    color: "#AAB0B6", // Gris piedra
  },
  {
    id: "mia",
    name: "Mia Mingo",
    title: "Economista",
    image: "/characters/mia.jpg", // Se actualizará con nueva foto
    biography:
      "Mia es nuestra segunda especialista que nos acompaña en este documental. Ella nos da sus grandes aportes y nos adentra al tema desde un punto crítico como lo es el económico. Nos dará sus puntos de vistas y como estos artesanos navales son un hilo conductor a la sostenibilidad de Pucusana, ya que los pescadores dependen de sus barcos y sin barcos, no existiría pesca.",
    hasWebsodio: false,
    achievements: ["Licenciada en economía en la universidad de Lima"],
    color: "#2F4E5C", // Azul profundo para mejor contraste
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
        className="min-h-screen py-20 relative"
        style={{
          backgroundImage: `url('/characters-background.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Background overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-documentary-wood/80 via-documentary-stone/70 to-documentary-deep/80" />

        <div className="container mx-auto px-6 relative z-10">
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
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
                      style={{ objectPosition: character.id === "ricardo" ? "center 20%" : "center" }}
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
                      style={{ objectPosition: selectedCharacter.id === "ricardo" ? "center 20%" : "center" }}
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