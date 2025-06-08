"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { useRef, useState } from "react"

export const GlowCard = ({
  children,
  className,
  glowClassName,
}: {
  children: React.ReactNode
  className?: string
  glowClassName?: string
}) => {
  const divRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return
    const rect = divRef.current.getBoundingClientRect()
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    setOpacity(1)
  }

  const handleMouseLeave = () => {
    setOpacity(0)
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("relative overflow-hidden rounded-xl", className)}
    >
      {children}
      <div
        className={cn(
          "pointer-events-none absolute -inset-px opacity-0 transition duration-300",
          glowClassName || "bg-[#1DF5E6]",
        )}
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(29, 245, 230, 0.15), transparent 40%)`,
        }}
      />
    </div>
  )
}
