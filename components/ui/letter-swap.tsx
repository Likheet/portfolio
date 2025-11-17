'use client'

import { useEffect, useState } from "react"

interface TextProps {
  label: string
  reverse?: boolean
  transition?: unknown
  staggerDuration?: number
  staggerFrom?: "first" | "last" | "center" | number
  className?: string
  onClick?: () => void
}

interface StaticFadeTextProps {
  label: string
  className?: string
  onClick?: () => void
}

function StaticFadeText({ label, className, onClick }: StaticFadeTextProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsVisible(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <span
      className={`inline-flex items-center transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      } ${className ?? ""}`}
      onClick={onClick}
    >
      {label}
    </span>
  )
}

export function LetterSwapForward({ label, className, onClick }: TextProps) {
  return <StaticFadeText label={label} className={className} onClick={onClick} />
}

export function LetterSwapPingPong({
  label,
  className,
  onClick,
}: TextProps) {
  return <StaticFadeText label={label} className={className} onClick={onClick} />
}
