"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"

export const AnimatedTestimonials = ({
  testimonials,
  className,
}: {
  testimonials: {
    quote: string
    name: string
    title: string
    image?: string
  }[]
  className?: string
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1)
      setIsAnimating(true)
      setCurrentIndex((prevIndex) => (prevIndex + 1 === testimonials.length ? 0 : prevIndex + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  const handleNext = () => {
    if (isAnimating) return
    setDirection(1)
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex + 1 === testimonials.length ? 0 : prevIndex + 1))
  }

  const handlePrevious = () => {
    if (isAnimating) return
    setDirection(-1)
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex - 1 < 0 ? testimonials.length - 1 : prevIndex - 1))
  }

  const testimonial = testimonials[currentIndex]

  return (
    <div className={cn("flex flex-col items-center justify-center space-y-6", className)}>
      <div className="relative h-60 w-full overflow-hidden">
        <AnimatePresence initial={false} mode="wait" onExitComplete={() => setIsAnimating(false)}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: direction * 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 100 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center"
          >
            <p className="text-xl md:text-2xl italic text-white/90 mb-6 max-w-3xl">"{testimonial.quote}"</p>
            <div className="flex items-center space-x-4">
              {testimonial.image && (
                <div className="h-12 w-12 rounded-full overflow-hidden">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <div>
                <p className="font-semibold text-white">{testimonial.name}</p>
                <p className="text-white/70 text-sm">{testimonial.title}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (isAnimating) return
              setDirection(index > currentIndex ? 1 : -1)
              setIsAnimating(true)
              setCurrentIndex(index)
            }}
            className={`h-2 w-2 rounded-full ${index === currentIndex ? "bg-white" : "bg-white/30"}`}
          />
        ))}
      </div>

      <div className="flex space-x-4">
        <button
          onClick={handlePrevious}
          disabled={isAnimating}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 text-white"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <button
          onClick={handleNext}
          disabled={isAnimating}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 text-white"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  )
}
