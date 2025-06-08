"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { useRef, useState } from "react"

export const Spotlight = ({
  children,
  className,
  spotlightClassName,
}: {
  children: React.ReactNode
  className?: string
  spotlightClassName?: string
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setPosition({ x, y })
    setOpacity(1)
  }

  const handleMouseLeave = () => {
    setOpacity(0)
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative z-10">{children}</div>
      <div
        className={cn(
          "pointer-events-none absolute -inset-px z-0 transition duration-300",
          spotlightClassName || "bg-[#1D8FF5]",
        )}
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(29, 143, 245, 0.1), transparent 40%)`,
        }}
      />
    </div>
  )
}
