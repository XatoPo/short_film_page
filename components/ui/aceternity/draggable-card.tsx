"use client"

import type React from "react"

import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { useRef, useState } from "react"
import { cn } from "@/lib/utils"

export const DraggableCard = ({
  children,
  className,
  onDragEnd,
}: {
  children: React.ReactNode
  className?: string
  onDragEnd?: (direction: "left" | "right" | null) => void
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-30, 30])
  const [exitX, setExitX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  const handleDragEnd = () => {
    if (x.get() < -100) {
      setExitX(-1000)
      onDragEnd?.("left")
    } else if (x.get() > 100) {
      setExitX(1000)
      onDragEnd?.("right")
    } else {
      animate(x, 0, { type: "spring", stiffness: 300, damping: 20 })
      onDragEnd?.(null)
    }
    setIsDragging(false)
  }

  return (
    <motion.div
      ref={cardRef}
      className={cn("relative cursor-grab active:cursor-grabbing", isDragging ? "z-50" : "z-0", className)}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      style={{ x, rotate }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
      animate={{ x: exitX }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}
