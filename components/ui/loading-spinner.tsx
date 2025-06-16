"use client"

import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function LoadingSpinner({ className, size = "md" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      <div className="absolute inset-0 border-2 border-documentary-turquoise/30 rounded-full animate-spin" />
      <div
        className="absolute inset-0 border-2 border-documentary-turquoise border-t-transparent rounded-full animate-spin"
        style={{ animationDuration: "0.75s" }}
      />
      <div
        className="absolute inset-0 border-2 border-documentary-wood border-t-transparent border-l-transparent rounded-full animate-spin"
        style={{ animationDuration: "1.5s" }}
      />
    </div>
  )
}
