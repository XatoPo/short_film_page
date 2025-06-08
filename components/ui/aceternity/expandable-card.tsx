"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export const ExpandableCard = ({
  title,
  description,
  image,
  className,
  children,
}: {
  title: string
  description: string
  image: string
  className?: string
  children?: React.ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={cn("relative w-full", className)}>
      <motion.div
        layout
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "bg-gradient-to-br from-[#1D8FF5]/80 to-[#1DF5E6]/80 backdrop-blur-sm rounded-lg overflow-hidden cursor-pointer",
          isOpen ? "absolute inset-0 z-50" : "relative",
        )}
        style={{
          height: isOpen ? "auto" : "200px",
          width: isOpen ? "auto" : "100%",
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <motion.div layout className="relative h-40 overflow-hidden">
          <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <motion.h3 layout className="absolute bottom-4 left-4 text-xl font-bold text-white">
            {title}
          </motion.h3>
        </motion.div>

        <motion.div
          layout
          className="p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-white/90 mb-4">{description}</p>
          {isOpen && children}
        </motion.div>

        {isOpen && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-2 right-2 p-2 bg-black/20 rounded-full text-white hover:bg-black/40 transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              setIsOpen(false)
            }}
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
              className="h-5 w-5"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </motion.button>
        )}
      </motion.div>
      {isOpen && <div className="fixed inset-0 bg-black/70 z-40" onClick={() => setIsOpen(false)} />}
    </div>
  )
}
