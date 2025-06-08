"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"

export const AnimatedTooltip = ({
  children,
  text,
  direction = "top",
  className,
}: {
  children: React.ReactNode
  text: string
  direction?: "top" | "bottom" | "left" | "right"
  className?: string
}) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false)

  const directionStyles = {
    top: {
      tooltip: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
      arrow: "top-full left-1/2 transform -translate-x-1/2 border-t-black/80 border-l-transparent border-r-transparent",
    },
    bottom: {
      tooltip: "top-full left-1/2 transform -translate-x-1/2 mt-2",
      arrow:
        "bottom-full left-1/2 transform -translate-x-1/2 border-b-black/80 border-l-transparent border-r-transparent",
    },
    left: {
      tooltip: "right-full top-1/2 transform -translate-y-1/2 mr-2",
      arrow: "left-full top-1/2 transform -translate-y-1/2 border-l-black/80 border-t-transparent border-b-transparent",
    },
    right: {
      tooltip: "left-full top-1/2 transform -translate-y-1/2 ml-2",
      arrow:
        "right-full top-1/2 transform -translate-y-1/2 border-r-black/80 border-t-transparent border-b-transparent",
    },
  }

  return (
    <div
      className={cn("relative inline-block", className)}
      onMouseEnter={() => setTooltipVisible(true)}
      onMouseLeave={() => setTooltipVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isTooltipVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className={cn(
              "absolute z-50 whitespace-nowrap px-3 py-1.5 bg-black/80 backdrop-blur-sm text-white text-xs rounded-md",
              directionStyles[direction].tooltip,
            )}
          >
            {text}
            <div className={cn("absolute w-0 h-0 border-4", directionStyles[direction].arrow)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
