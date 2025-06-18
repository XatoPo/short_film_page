"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import Image from "next/image"
import { Camera, Users, Film, X, ChevronLeft, ChevronRight, ZoomIn, Heart } from "lucide-react"
import { GlowCard } from "./ui/aceternity/glow-card"

const galleryImages = [
  {
    id: "coastal-view",
    title: "Vista Costera",
    description: "El hermoso paisaje marino que enmarca nuestro documental",
    image: "/gallery/coastal-view.jpg",
    category: "landscapes",
    aspectRatio: "landscape",
  },
  {
    id: "artistic-portrait",
    title: "Momento Contemplativo",
    description: "Capturando la esencia humana en el entorno marino",
    image: "/gallery/artistic-portrait.jpg",
    category: "portraits",
    aspectRatio: "portrait",
  },
  {
    id: "filming-boats",
    title: "Documentando el Proceso",
    description: "El equipo capturando la construcción naval artesanal",
    image: "/gallery/filming-boats.jpg",
    category: "behind-scenes",
    aspectRatio: "portrait",
  },
  {
    id: "team-photography",
    title: "Equipo en Acción",
    description: "Momentos de alegría durante la producción",
    image: "/gallery/team-photography.jpg",
    category: "team",
    aspectRatio: "landscape",
  },
  {
    id: "sea-lions-night",
    title: "Vida Marina Nocturna",
    description: "Los habitantes naturales del puerto en su ambiente",
    image: "/gallery/sea-lions-night.jpg",
    category: "wildlife",
    aspectRatio: "portrait",
  },
  {
    id: "sea-lions-day",
    title: "Vida Marina Diurna",
    description: "La fauna local compartiendo el espacio portuario",
    image: "/gallery/sea-lions-day.jpg",
    category: "wildlife",
    aspectRatio: "landscape",
  },
  {
    id: "lawyer-interview",
    title: "Entrevista Formal",
    description: "Documentando los aspectos legales y formales",
    image: "/gallery/lawyer-interview.jpg",
    category: "interviews",
    aspectRatio: "landscape",
  },
  {
    id: "behind-scenes",
    title: "Detrás de Cámaras",
    description: "El proceso de grabación en el malecón",
    image: "/gallery/behind-scenes.jpg",
    category: "behind-scenes",
    aspectRatio: "landscape",
  },
  {
    id: "harbor-panorama",
    title: "Puerto Pesquero",
    description: "La colorida flota pesquera tradicional",
    image: "/gallery/harbor-panorama.jpg",
    category: "landscapes",
    aspectRatio: "landscape",
  },
  {
    id: "village-overlook",
    title: "Vista del Pueblo",
    description: "Perspectiva panorámica del pueblo costero",
    image: "/gallery/village-overlook.jpg",
    category: "landscapes",
    aspectRatio: "landscape",
  },
  // NUEVAS FOTOS AGREGADAS
  {
    id: "kike-construction",
    title: "Construcción desde Cero",
    description: "Kike trabajando en la construcción de una embarcación artesanal",
    image: "/gallery/kike-construction.jpg",
    category: "behind-scenes",
    aspectRatio: "portrait",
  },
  {
    id: "colorky-boat",
    title: "Embarcación Colorky",
    description: "Detalle de una embarcación pesquera tradicional",
    image: "/gallery/colorky-boat.jpg",
    category: "landscapes",
    aspectRatio: "landscape",
  },
  {
    id: "kike-workshop",
    title: "Maestro en el Taller",
    description: "Kike utilizando maquinaria especializada para el trabajo en madera",
    image: "/gallery/kike-workshop.jpg",
    category: "behind-scenes",
    aspectRatio: "portrait",
  },
  {
    id: "worker-tools",
    title: "Artesano con Herramientas",
    description: "Trabajador especializado con sus herramientas de trabajo",
    image: "/gallery/worker-tools.jpg",
    category: "portraits",
    aspectRatio: "portrait",
  },
  {
    id: "boat-underneath",
    title: "Vista Inferior del Barco",
    description: "Perspectiva única desde debajo de las embarcaciones en reparación",
    image: "/gallery/boat-underneath.jpg",
    category: "landscapes",
    aspectRatio: "landscape",
  },
  {
    id: "harbor-aerial",
    title: "Vista Aérea del Puerto",
    description: "Panorámica del puerto pesquero con múltiples embarcaciones",
    image: "/gallery/harbor-aerial.jpg",
    category: "landscapes",
    aspectRatio: "landscape",
  },
  {
    id: "two-boats-varadero",
    title: "Barcos en el Varadero",
    description: "Embarcaciones Colorky y Sofy I en mantenimiento",
    image: "/gallery/two-boats-varadero.jpg",
    category: "landscapes",
    aspectRatio: "landscape",
  },
  {
    id: "kike-portrait",
    title: "Retrato de Kike",
    description: "Enrique Rejas Olaguibel en su ambiente de trabajo",
    image: "/gallery/kike-portrait.jpg",
    category: "portraits",
    aspectRatio: "portrait",
  },
  {
    id: "kike-workshop-2",
    title: "Trabajo Artesanal",
    description: "Kike en pleno proceso de construcción naval",
    image: "/gallery/kike-workshop-2.jpg",
    category: "behind-scenes",
    aspectRatio: "landscape",
  },
]

const categories = [
  { id: "all", name: "Todas", icon: Camera, color: "#5FB4A4" },
  { id: "behind-scenes", name: "Detrás de Cámaras", icon: Film, color: "#B6A38C" },
  { id: "team", name: "Equipo", icon: Users, color: "#2F4E5C" },
  { id: "landscapes", name: "Paisajes", icon: Camera, color: "#AAB0B6" },
  { id: "portraits", name: "Retratos", icon: Users, color: "#EFE7DC" },
  { id: "wildlife", name: "Vida Marina", icon: Camera, color: "#5FB4A4" },
  { id: "interviews", name: "Entrevistas", icon: Film, color: "#B6A38C" },
]

interface GallerySectionProps {
  imagesLoaded: boolean
}

export default function GallerySection({ imagesLoaded }: GallerySectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const filteredImages =
    selectedCategory === "all" ? galleryImages : galleryImages.filter((img) => img.category === selectedCategory)

  useEffect(() => {
    if (typeof window === "undefined" || !imagesLoaded) return

    const section = sectionRef.current
    const gallery = galleryRef.current

    if (!section || !gallery) return

    // Animate gallery items with stagger effect
    const animateGallery = () => {
      gsap.fromTo(
        gallery.children,
        {
          opacity: 0,
          y: 60,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gallery,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }

    animateGallery()

    return () => {
      gsap.killTweensOf(gallery.children)
    }
  }, [imagesLoaded, selectedCategory])

  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === selectedCategory) return

    const gallery = galleryRef.current
    if (!gallery) return

    // Animate out current images
    gsap.to(gallery.children, {
      opacity: 0,
      scale: 0.8,
      y: -30,
      duration: 0.3,
      stagger: 0.03,
      onComplete: () => {
        setSelectedCategory(categoryId)
        // Animate in new images
        setTimeout(() => {
          gsap.fromTo(
            gallery.children,
            { opacity: 0, scale: 0.8, y: 30 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.4,
              stagger: 0.05,
              ease: "back.out(1.7)",
            },
          )
        }, 100)
      },
    })
  }

  const openLightbox = (index: number) => {
    setSelectedImage(index)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setSelectedImage(null)
    document.body.style.overflow = "auto"
  }

  const navigateImage = (direction: "prev" | "next") => {
    if (selectedImage === null) return

    if (direction === "prev") {
      setSelectedImage(selectedImage > 0 ? selectedImage - 1 : filteredImages.length - 1)
    } else {
      setSelectedImage(selectedImage < filteredImages.length - 1 ? selectedImage + 1 : 0)
    }
  }

  const toggleFavorite = (imageId: string) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(imageId)) {
      newFavorites.delete(imageId)
    } else {
      newFavorites.add(imageId)
    }
    setFavorites(newFavorites)
  }

  if (!imagesLoaded) {
    return (
      <section
        id="galeria"
        className="min-h-screen bg-gradient-to-br from-documentary-stone via-documentary-sand to-documentary-turquoise py-20 flex items-center justify-center"
      >
        <div className="text-center text-documentary-deep">
          <div className="text-2xl font-bold mb-4">Preparando galería...</div>
          <p className="text-documentary-deep/70">Las imágenes se están cargando</p>
        </div>
      </section>
    )
  }

  return (
    <>
      <section
        id="galeria"
        ref={sectionRef}
        className="min-h-screen bg-gradient-to-br from-documentary-stone via-documentary-sand to-documentary-turquoise py-20 relative overflow-hidden"
      >
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-documentary-deep mb-8">Galería Fotográfica</h2>
            <p className="text-xl text-documentary-deep/80 max-w-3xl mx-auto mb-8">
              Momentos capturados durante la creación del documental
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-documentary-turquoise to-documentary-wood mx-auto rounded-full" />
          </div>

          {/* Category filters */}
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`group flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-500 transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? "bg-documentary-turquoise text-white shadow-lg scale-105"
                    : "bg-white/80 backdrop-blur-sm text-documentary-deep hover:bg-white hover:shadow-md"
                }`}
              >
                <category.icon className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
                <span className="text-sm font-medium">{category.name}</span>
                {selectedCategory === category.id && <div className="w-2 h-2 bg-white rounded-full animate-pulse" />}
              </button>
            ))}
          </div>

          {/* Gallery grid */}
          <div ref={galleryRef} className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {filteredImages.map((item, index) => (
              <GlowCard
                key={`${selectedCategory}-${item.id}`}
                className="break-inside-avoid mb-6 group cursor-pointer overflow-hidden"
              >
                <div className="relative overflow-hidden rounded-lg bg-white" onClick={() => openLightbox(index)}>
                  <div className="relative">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={400}
                      height={item.aspectRatio === "portrait" ? 600 : 300}
                      className="w-full h-auto transition-all duration-700 group-hover:scale-110"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Hover content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                      <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                      <p className="text-sm text-white/80 mb-3">{item.description}</p>

                      <div className="flex items-center gap-2">
                        <button
                          className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation()
                            openLightbox(index)
                          }}
                        >
                          <ZoomIn className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleFavorite(item.id)
                          }}
                        >
                          <Heart
                            className={`w-4 h-4 transition-colors ${
                              favorites.has(item.id) ? "fill-red-500 text-red-500" : ""
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Category badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-xs rounded-full">
                        {categories.find((c) => c.id === item.category)?.name}
                      </span>
                    </div>

                    {/* Favorite indicator */}
                    {favorites.has(item.id) && (
                      <div className="absolute top-3 right-3">
                        <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                      </div>
                    )}
                  </div>
                </div>
              </GlowCard>
            ))}
          </div>

          {/* Gallery stats */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-6 px-8 py-4 bg-white/80 backdrop-blur-sm rounded-full shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-documentary-deep">{filteredImages.length}</div>
                <div className="text-sm text-documentary-deep/70">Fotos</div>
              </div>
              <div className="w-px h-8 bg-documentary-deep/20" />
              <div className="text-center">
                <div className="text-2xl font-bold text-documentary-deep">{favorites.size}</div>
                <div className="text-sm text-documentary-deep/70">Favoritas</div>
              </div>
              <div className="w-px h-8 bg-documentary-deep/20" />
              <div className="text-center">
                <div className="text-2xl font-bold text-documentary-deep">{categories.length - 1}</div>
                <div className="text-sm text-documentary-deep/70">Categorías</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 modal-backdrop">
          <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center modal-content">
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-3 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-colors"
            >
              <X size={24} />
            </button>

            {/* Navigation buttons */}
            <button
              onClick={() => navigateImage("prev")}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => navigateImage("next")}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-colors"
            >
              <ChevronRight size={24} />
            </button>

            {/* Image */}
            <div className="relative max-h-full max-w-full">
              <Image
                src={filteredImages[selectedImage].image || "/placeholder.svg"}
                alt={filteredImages[selectedImage].title}
                width={1200}
                height={800}
                className="max-h-[85vh] max-w-full object-contain"
              />

              {/* Image info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                <h3 className="text-2xl font-bold mb-2">{filteredImages[selectedImage].title}</h3>
                <p className="text-white/80">{filteredImages[selectedImage].description}</p>
              </div>
            </div>

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm">
              {selectedImage + 1} / {filteredImages.length}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
