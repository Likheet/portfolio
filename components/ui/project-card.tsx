"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"

interface ProjectCardProps {
  title: string
  description: string
  tech: string[]
  link: string
  github?: string
  image?: string
  index: number
  enableAnimation?: boolean
}

export function ProjectCard({
  title,
  description,
  tech,
  link,
  github,
  image,
  index,
  enableAnimation = true
}: ProjectCardProps) {
  const Wrapper = enableAnimation ? motion.div : "div"

  const animationProps = enableAnimation ? {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay: index * 0.1 },
    viewport: { once: true }
  } : {}

  return (
    <Wrapper
      {...animationProps}
      className="group relative rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition-colors duration-300 overflow-hidden h-full flex flex-col"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10 flex flex-col h-full">
        {image && (
          <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden shrink-0">
            <div className="absolute inset-0 bg-muted/20 animate-pulse" />
            {/* Placeholder for actual image implementation */}
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/50 text-sm">
              Project Preview
            </div>
          </div>
        )}

        <div className="flex items-start justify-between gap-4 mb-3 shrink-0">
          <h3 className="text-xl font-semibold tracking-tight group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
          <div className="flex gap-2">
            {github && (
              <Link
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="View Source Code"
              >
                <Github className="w-4 h-4" />
              </Link>
            )}
            <Link
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="View Project"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto shrink-0">
          {tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </Wrapper>
  )
}
