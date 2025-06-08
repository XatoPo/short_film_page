"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export const AppleCardsCarousel = ({
  items,
  className,
}: {
  items: {
    id: string
    title: string
    description: string
    image: string
    onClick?: () => void
  }[]
  className?: string
}) => {
  const [activeCard, setActiveCard] = useState(0)
  const [direction, setDirection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.scrollWidth)
    }
  }, [])

  const handleNext = () => {
    setDirection(1)
    setActiveCard((prevIndex) => (prevIndex + 1) % items.length)
  }

  const handlePrevious = () => {
    setDirection(-1)
    setActiveCard((prevIndex) => (prevIndex - 1 + items.length) % items.length)
  }

  const handleDotClick = (index: number) => {
    setDirection(index > activeCard ? 1 : -1)
    setActiveCard(index)
  }

  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <div ref={containerRef} className="flex items-center justify-center py-8">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={activeCard}
            custom={direction}
            initial={{ opacity: 0, x: direction * 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 300 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute"
          >
            <div
              onClick={items[activeCard].onClick}
              className="relative overflow-hidden rounded-2xl shadow-xl cursor-pointer group"
              style={{ width: "300px", height: "400px" }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/70 z-10" />
              <img
                src={items[activeCard].image || "/placeholder.svg"}
                alt={items[activeCard].title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{items[activeCard].title}</h3>
                <p className="text-sm text-white/80">{items[activeCard].description}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-2 w-2 rounded-full ${index === activeCard ? "bg-white" : "bg-white/30"}`}
          />
        ))}
      </div>

      <button
        onClick={handlePrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-30"
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
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-30"
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
  )
}
