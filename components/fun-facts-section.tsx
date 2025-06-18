"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Anchor, Ship, Users, MapPin, Wrench, Award } from "lucide-react"
import { GlowCard } from "./ui/aceternity/glow-card"

const funFacts = [
  {
    icon: Ship,
    number: "1500+",
    title: "Embarcaciones no formalizadas",
    description:
      "En Perú, existen más de 1500 embarcaciones artesanales que aún no están formalizadas ni cuentan con el sistema de monitoreo satelital Sisesat.",
    color: "#5FB4A4",
  },
  {
    icon: Users,
    number: "15,000",
    title: "Impacto Cultural",
    description:
      "La construcción naval es parte fundamental de la identidad cultural costera. Estas tradiciones conectan a las comunidades con su herencia marítima.",
    color: "#B6A38C",
  },
  {
    icon: MapPin,
    number: "3,080",
    title: "Kilómetros de Costa",
    description: "Perú cuenta con una extensa costa donde se desarrolla la construcción naval artesanal.",
    color: "#2F4E5C",
  },
  {
    icon: Wrench,
    number: "3-8",
    title: "Tiempo de Construcción",
    description:
      "Una embarcación tradicional puede tomar entre 3 a 8 meses en completarse. Dependiendo del tamaño y complejidad del diseño.",
    color: "#AAB0B6",
  },
  {
    icon: Anchor,
    number: "500+",
    title: "Técnicas Ancestrales",
    description: "Más de 500 años de técnicas tradicionales de construcción naval se mantienen vivas.",
    color: "#1D8FF5", // Cambiado a azul para mejor visibilidad
  },
  {
    icon: Award,
    number: "300+",
    title: "Maestros Artesanos",
    description: "Más de 300 maestros artesanos mantienen viva la tradición naval en todo el país.",
    color: "#5FB4A4",
  },
]

export default function FunFactsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const factsRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    // Wait for DOM to be fully loaded
    const timer = setTimeout(() => {
      const section = sectionRef.current
      const facts = factsRef.current
      const title = titleRef.current

      if (!section || !facts || !title) {
        console.warn("Fun facts elements not found")
        return
      }

      try {
        // Check if ScrollTrigger is available
        if (typeof gsap.registerPlugin === "function" && gsap.ScrollTrigger) {
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

          // Animate facts cards - check if children exist
          const factCards = Array.from(facts.children).filter((child) => child instanceof HTMLElement)
          if (factCards.length > 0) {
            gsap.fromTo(
              factCards,
              { opacity: 0, y: 80, scale: 0.8 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: "back.out(1.7)",
                scrollTrigger: {
                  trigger: facts,
                  start: "top 80%",
                  end: "bottom 20%",
                  toggleActions: "play none none reverse",
                },
              },
            )
          }

          // Animate numbers - with better error handling
          const numberElements = facts.querySelectorAll(".fact-number")
          numberElements.forEach((el) => {
            if (!(el instanceof HTMLElement)) return

            const element = el as HTMLElement
            const finalNumber = element.textContent || "0"
            const numericValue = Number.parseInt(finalNumber.replace(/\D/g, ""))

            if (numericValue > 0 && !isNaN(numericValue)) {
              const animationObject = { value: 0 }

              gsap.to(animationObject, {
                value: numericValue,
                duration: 2,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: element,
                  start: "top 90%",
                },
                onUpdate: () => {
                  const current = Math.round(animationObject.value)
                  if (finalNumber.includes("+")) {
                    element.textContent = current.toLocaleString() + "+"
                  } else if (finalNumber.includes("%")) {
                    element.textContent = current + "%"
                  } else if (finalNumber.includes("-")) {
                    element.textContent = current + "-8" // Para el rango 3-8
                  } else {
                    element.textContent = current.toLocaleString()
                  }
                },
              })
            }
          })
        } else {
          // Fallback without ScrollTrigger
          gsap.set([title, ...Array.from(facts.children)], { opacity: 1 })
        }
      } catch (error) {
        console.error("Error in fun facts animations:", error)
        // Fallback: just show elements without animation
        if (title) gsap.set(title, { opacity: 1 })
        if (facts) gsap.set(Array.from(facts.children), { opacity: 1 })
      }
    }, 100)

    return () => {
      clearTimeout(timer)
      // Clean up ScrollTrigger instances
      if (typeof window !== "undefined" && gsap.ScrollTrigger) {
        gsap.ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.trigger === sectionRef.current) {
            trigger.kill()
          }
        })
      }
    }
  }, [])

  return (
    <section
      id="sabias-que"
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-b from-documentary-sand to-documentary-turquoise py-20"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold text-documentary-deep mb-8 opacity-0">
            ¿Sabías que...?
          </h2>
          <p className="text-xl text-documentary-deep/80 max-w-3xl mx-auto">
            Datos fascinantes sobre la tradición naval artesanal en el Perú
          </p>
        </div>

        <div ref={factsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {funFacts.map((fact, index) => (
            <GlowCard key={index} className="h-full group opacity-0">
              <div className="text-center p-6 h-full flex flex-col justify-between bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-all duration-300">
                <div>
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: fact.color }}
                  >
                    <fact.icon className="w-8 h-8 text-white" />
                  </div>

                  <div
                    className="fact-number text-4xl md:text-5xl font-bold mb-4 transition-colors duration-300"
                    style={{ color: fact.color }}
                  >
                    {fact.number}
                  </div>

                  <h3 className="text-xl font-semibold text-documentary-deep mb-4">{fact.title}</h3>
                </div>

                <p className="text-documentary-deep/80 leading-relaxed">{fact.description}</p>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  )
}
