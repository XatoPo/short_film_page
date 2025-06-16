"use client"

import { Anchor, Film, Info, Ship, Users, Camera, Lightbulb } from "lucide-react"
import { FloatingNav } from "./ui/aceternity/floating-navbar"

export default function NavigationBar() {
  const navItems = [
    {
      name: "Inicio",
      link: "#hero",
      icon: <Anchor className="h-4 w-4" />,
    },
    {
      name: "Nosotros",
      link: "#nosotros",
      icon: <Info className="h-4 w-4" />,
    },
    {
      name: "Personajes",
      link: "#personajes",
      icon: <Users className="h-4 w-4" />,
    },
    {
      name: "Documental",
      link: "#documental",
      icon: <Film className="h-4 w-4" />,
    },
    {
      name: "Galería",
      link: "#galeria",
      icon: <Camera className="h-4 w-4" />,
    },
    {
      name: "Taller",
      link: "#extras",
      icon: <Ship className="h-4 w-4" />,
    },
    {
      name: "Datos",
      link: "#sabias-que",
      icon: <Lightbulb className="h-4 w-4" />,
    },
  ]

  return <FloatingNav navItems={navItems} />
}
