"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Anchor, Ship, Waves, Lightbulb, Clock, Users, Award } from "lucide-react"
import { GlowCard } from "./ui/aceternity/glow-card"

const funFacts = [
  {
    icon: Ship,
    title: "Tipos de Embarcaciones",
    description: "Existen más de 15 tipos diferentes de embarcaciones tradicionales en la región.",
    details: "Cada tipo tiene características específicas según su uso: pesca, transporte o recreación.",
    number: "15+",
  },
  {
    icon: Anchor,
    title: "Maderas Utilizadas",
    description: "Se utilizan principalmente cedro, caoba y roble para diferentes partes del barco.",
    details: "La selección de la madera es crucial para la durabilidad y resistencia de la embarcación.",
    number: "3",
  },
  {
    icon: Clock,
    title: "Años de Tradición",
    description: "Las técnicas de construcción se han transmitido por más de 200 años.",
    details: "Cada maestro artesano aporta su propio estilo y conocimientos únicos.",
    number: "200+",
  },
  {
    icon: Waves,
    title: "Impacto Cultural",
    description: "La construcción naval es parte fundamental de la identidad cultural costera.",
    details: "Estas tradiciones conectan a las comunidades con su herencia marítima.",
    number: "∞",
  },
  {
    icon: Users,
    title: "Maestros Activos",
    description: "Actualmente hay menos de 50 maestros artesanos activos en la región.",
    details: "Es urgente preservar su conocimiento antes de que se pierda.",
    number: "50",
  },
  {
    icon: Award,
    title: "Tiempo de Construcción",
    description: "Una embarcación tradicional puede tomar entre 3 a 8 meses en completarse.",
    details: "Dependiendo del tamaño y complejidad del diseño.",
    number: "3-8",
  },
]

export default function FunFactsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const factsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const section = sectionRef.current
    const facts = factsRef.current

    if (!section || !facts) return

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
  }, [])

  return (
    <section
      id="sabias-que"
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-b from-documentary-sand to-documentary-turquoise py-20"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Lightbulb className="w-8 h-8 text-documentary-deep" />
            <h2 className="text-4xl md:text-5xl font-bold text-documentary-deep">¿Sabías qué?</h2>
          </div>
          <p className="text-xl text-documentary-deep/80 max-w-3xl mx-auto">
            Datos fascinantes sobre la construcción naval artesanal
          </p>
        </div>

        <div ref={factsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {funFacts.map((fact, index) => (
            <GlowCard key={index} className="h-full">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white transition-all duration-300 cursor-pointer group h-full flex flex-col">
                <div className="mb-4 flex justify-center">
                  <div className="relative">
                    <fact.icon className="w-12 h-12 text-documentary-turquoise group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute -top-2 -right-2 bg-documentary-deep text-white text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center">
                      {fact.number}
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-documentary-deep mb-3">{fact.title}</h3>
                <p className="text-documentary-deep/80 mb-4 flex-grow">{fact.description}</p>
                <p className="text-documentary-deep/60 text-sm border-t border-documentary-stone/30 pt-4">
                  {fact.details}
                </p>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  )
}
