"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string
    link: string
    icon?: React.ReactNode
  }[]
  className?: string
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState<string>(navItems[0]?.link || "")

  useEffect(() => {
    const sections = navItems.map((item) => document.querySelector(item.link)).filter(Boolean)

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 300

      if (scrollPosition > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }

      // Find the current active section
      for (const section of sections) {
        if (!section) continue
        const sectionTop = section.getBoundingClientRect().top + window.scrollY
        const sectionBottom = sectionTop + section.getBoundingClientRect().height

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveSection(section.id ? `#${section.id}` : "")
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [navItems])

  return (
    <div
      className={cn(
        "fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none",
        className,
      )}
    >
      <div className="bg-black/70 backdrop-blur-md rounded-full p-2 flex items-center justify-center shadow-lg border border-white/10">
        <nav className="flex items-center gap-1">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className={cn(
                "px-3 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1",
                activeSection === item.link
                  ? "text-white bg-[#1D8FF5]/30"
                  : "text-white/60 hover:text-white hover:bg-white/10",
              )}
              onClick={(e) => {
                e.preventDefault()
                document.querySelector(item.link)?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              {item.icon && <span className="text-white/70">{item.icon}</span>}
              <span>{item.name}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
}
