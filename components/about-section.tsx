"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Image from "next/image"

const teamMembers = [
  {
    name: "Natalia Escalante",
    role: "Productora",
    image: "/team/productora.jpg",
  },
  {
    name: "Sebastian Noriega",
    role: "Director",
    image: "/team/director.jpg",
  },
  {
    name: "Camilo Barbarán",
    role: "Director de Fotografía",
    image: "/team/director-fotografia.jpg",
  },
  {
    name: "Carlos Talavera",
    role: "Camarógrafo 1",
    image: "/team/camarografo1.jpg",
  },
  {
    name: "Samantha Zapata",
    role: "Camarográfa 2",
    image: "/team/camarografo2.jpg",
  },
  {
    name: "Maggie Benner",
    role: "Asistente de investigación",
    image: "/team/asistente.jpg",
  },
  {
    name: "Miguel Tarrillo",
    role: "Editor",
    image: "/team/editor.jpg",
  },
  {
    name: "Haziel Advíncula",
    role: "Sonidista",
    image: "/team/sonidista.jpg",
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
    <>
      <section
        id="nosotros"
        ref={sectionRef}
        className="min-h-screen py-12 sm:py-16 md:py-20 -mt-1 relative"
        style={{
          backgroundImage: `url('/conocenos-background.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Background overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-documentary-turquoise/80 via-documentary-turquoise/70 to-documentary-wood/80" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          {/* Introduction */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 ref={titleRef} className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 sm:mb-8">
              ¡Conócenos!
            </h2>
            <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed px-4">
              En Dhali Studios, somos apasionados por contar historias que preservan las tradiciones y el conocimiento
              ancestral de nuestros artesanos navales.
            </p>
          </div>

          {/* Team Members */}
          <div ref={teamRef} className="flex flex-wrap justify-center gap-6 sm:gap-8 mb-16 sm:mb-20 max-w-7xl mx-auto">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="group relative bg-white/15 backdrop-blur-md rounded-2xl p-6 hover:bg-white/25 transition-all duration-300 transform hover:scale-105 border border-white/30 shadow-xl w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.33rem)] xl:w-[calc(25%-1.5rem)] min-w-[280px] max-w-[320px] glow-card"
                style={{
                  background:
                    "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(91, 180, 164, 0.15) 0%, transparent 50%)",
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  const x = ((e.clientX - rect.left) / rect.width) * 100
                  const y = ((e.clientY - rect.top) / rect.height) * 100
                  e.currentTarget.style.setProperty("--mouse-x", `${x}%`)
                  e.currentTarget.style.setProperty("--mouse-y", `${y}%`)
                }}
              >
                <div className="text-center">
                  {/* Photo with better aspect ratio */}
                  <div className="relative mb-6 overflow-hidden rounded-xl mx-auto w-full aspect-[4/5] max-w-[200px] shadow-lg">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover object-top transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-sm sm:text-base text-white/90 font-medium">{member.role}</p>

                  {/* Maritime decoration line */}
                  <div className="mt-4 flex justify-center">
                    <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission and Vision - Separate full-screen section */}
      <section
        ref={missionRef}
        className="min-h-screen relative flex items-center py-16 sm:py-20"
        style={{
          backgroundImage: `url('/mission-vision-background.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Background overlay for mission section */}
        <div className="absolute inset-0 bg-gradient-to-r from-documentary-deep/90 via-documentary-deep/70 to-documentary-deep/50" />

        <div className="relative z-10 container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 sm:mb-8">Misión</h3>
              <p className="text-white/90 text-lg sm:text-xl leading-relaxed mb-8 sm:mb-12">
                Preservar y documentar el arte milenario de la construcción naval artesanal, capturando no solo las
                técnicas ancestrales, sino también las historias, la pasión y el conocimiento de los maestros artesanos
                que mantienen viva esta tradición en nuestras costas.
              </p>

              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 sm:mb-8">Visión</h3>
              <p className="text-white/90 text-lg sm:text-xl leading-relaxed">
                Crear un puente generacional que conecte el pasado con el presente, asegurando que estas técnicas
                ancestrales y el conocimiento de nuestros artesanos navales trascienda el tiempo y inspire a las futuras
                generaciones a valorar y preservar nuestro patrimonio marítimo.
              </p>
            </div>

            <div className="order-1 lg:order-2">
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div className="aspect-square relative overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src="/team/photographer.jpg"
                    alt="Fotógrafo documentando el proceso"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="aspect-square relative overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src="/team/interview-subject.jpg"
                    alt="Entrevista con participante"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="aspect-square relative overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src="/team/interviewee.jpg"
                    alt="Artesano compartiendo conocimiento"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="aspect-square relative overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src="/team/filming-crew.jpg"
                    alt="Equipo de grabación trabajando"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}