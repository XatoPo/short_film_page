"use client"

import type React from "react"

import { useRef, useState } from "react"
import { cn } from "@/lib/utils"

export const GlowingEffect = ({
  children,
  className,
  containerClassName,
  glowClassName,
}: {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  glowClassName?: string
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
      className={cn("relative overflow-hidden", containerClassName)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={cn("relative z-10", className)}>{children}</div>
      <div
        className={cn("absolute pointer-events-none rounded-full blur-xl", glowClassName || "bg-[#1DF5E6]")}
        style={{
          top: position.y - 100,
          left: position.x - 100,
          width: 200,
          height: 200,
          opacity,
          transition: "opacity 0.3s",
        }}
      />
    </div>
  )
}
