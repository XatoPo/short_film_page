"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Image from "next/image"
import { GlowCard } from "./ui/aceternity/glow-card"

const teamMembers = [
  {
    name: "Productor",
    role: "Producción Ejecutiva",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Director",
    role: "Dirección",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Camarógrafo",
    role: "Dirección de Fotografía",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Editor",
    role: "Postproducción",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Sonidista",
    role: "Diseño de Sonido",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Asistente",
    role: "Asistencia de Dirección",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Magui",
    role: "Coordinación",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Nat",
    role: "Producción",
    image: "/placeholder.svg?height=200&width=200",
  },
]

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const teamRef = useRef<HTMLDivElement>(null)
  const missionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const section = sectionRef.current
    const title = titleRef.current
    const team = teamRef.current
    const mission = missionRef.current

    if (!section || !title || !team || !mission) return

    // Animate title
    gsap.fromTo(
      title,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: title,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      },
    )

    // Animate team members
    gsap.fromTo(
      team.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: team,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      },
    )

    // Animate mission section
    gsap.fromTo(
      mission,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
          trigger: mission,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      },
    )
  }, [])

  return (
    <section
      id="nosotros"
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-b from-documentary-turquoise to-documentary-wood py-20 -mt-1"
    >
      <div className="container mx-auto px-6">
        {/* Introduction */}
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold text-white mb-8">
            Nosotros
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Somos un equipo apasionado por contar historias que preserven las tradiciones y el conocimiento ancestral de
            nuestros artesanos navales.
          </p>
        </div>

        {/* Team Members */}
        <div ref={teamRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {teamMembers.map((member, index) => (
            <GlowCard key={index} className="h-full">
              <div className="text-center group cursor-pointer h-full">
                <div className="relative mb-4 overflow-hidden rounded-full mx-auto w-48 h-48">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                <p className="text-white/80">{member.role}</p>
              </div>
            </GlowCard>
          ))}
        </div>

        {/* Mission and Vision */}
        <div ref={missionRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-documentary-deep mb-6">Nuestra Misión</h3>
            <p className="text-documentary-deep/90 text-lg leading-relaxed mb-8">
              Preservar y documentar el arte milenario de la construcción naval artesanal, capturando no solo las
              técnicas ancestrales, sino también las historias, la pasión y el conocimiento de los maestros artesanos
              que mantienen viva esta tradición en nuestras costas.
            </p>

            <h3 className="text-3xl font-bold text-documentary-deep mb-6">Nuestra Visión</h3>
            <p className="text-documentary-deep/90 text-lg leading-relaxed">
              Crear un puente generacional que conecte el pasado con el presente, asegurando que estas técnicas
              ancestrales y el conocimiento de nuestros artesanos navales trascienda el tiempo y inspire a las futuras
              generaciones a valorar y preservar nuestro patrimonio marítimo.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/placeholder.svg?height=200&width=200"
              alt="Grabando documental"
              width={200}
              height={200}
              className="rounded-lg shadow-lg"
            />
            <Image
              src="/placeholder.svg?height=200&width=200"
              alt="Entrevista artesano"
              width={200}
              height={200}
              className="rounded-lg shadow-lg"
            />
            <Image
              src="/placeholder.svg?height=200&width=200"
              alt="Taller trabajo"
              width={200}
              height={200}
              className="rounded-lg shadow-lg"
            />
            <Image
              src="/placeholder.svg?height=200&width=200"
              alt="Equipo grabación"
              width={200}
              height={200}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
