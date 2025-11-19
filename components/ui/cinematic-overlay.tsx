"use client"

import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from "framer-motion"
import { X } from "lucide-react"
import { useEffect } from "react"

interface CinematicOverlayProps {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
    title: string
    disableSpotlight?: boolean
}

export function CinematicOverlay({ isOpen, onClose, children, title, disableSpotlight = false }: CinematicOverlayProps) {
    // Mouse tracking for spotlight
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const background = useMotionTemplate`
    radial-gradient(
      650px circle at ${mouseX}px ${mouseY}px,
      rgba(255,255,255,0.1),
      transparent 80%
    )
  `

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        if (disableSpotlight) return
        const { left, top } = currentTarget.getBoundingClientRect()
        mouseX.set(clientX - left)
        mouseY.set(clientY - top)
    }

    // Prevent body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
                >
                    {/* Backdrop with Blur */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Main Content Container */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        onMouseMove={handleMouseMove}
                        className="relative w-full h-full md:h-[90vh] md:w-[90vw] bg-zinc-900/90 border border-white/10 md:rounded-2xl shadow-2xl overflow-hidden flex flex-col isolate"
                    >
                        {/* Spotlight Effect */}
                        {!disableSpotlight && (
                            <motion.div
                                className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{ background }}
                            />
                        )}

                        {/* Noise Texture */}
                        <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

                        {/* Header */}
                        <div className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/10 bg-zinc-900/50 backdrop-blur-md">
                            <h2 className="text-2xl font-bold tracking-tight text-white">{title}</h2>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-white/10 transition-colors text-zinc-400 hover:text-white"
                                aria-label="Close"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="relative z-10 flex-1 overflow-y-auto p-6 sm:p-8 custom-scrollbar">
                            <div className="max-w-7xl mx-auto">
                                {children}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
