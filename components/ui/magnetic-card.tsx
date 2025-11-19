"use client"

import React, { useRef } from "react"
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion"

interface MagneticCardProps {
    children: React.ReactNode
    className?: string
    enable3D?: boolean
    showSpotlight?: boolean
}

export function MagneticCard3D({
    children,
    className = "",
    enable3D = true,
    showSpotlight = true
}: MagneticCardProps) {
    const ref = useRef<HTMLDivElement>(null)

    // Raw mouse position relative to center
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    // Spotlight values
    const spotX = useMotionValue(0)
    const spotY = useMotionValue(0)
    const spotOpacity = useMotionValue(0)

    // Smooth physics
    const mouseX = useSpring(x, { stiffness: 200, damping: 20 })
    const mouseY = useSpring(y, { stiffness: 200, damping: 20 })

    function handleMouseMove(e: React.MouseEvent) {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()

        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        if (enable3D) {
            x.set(e.clientX - centerX)
            y.set(e.clientY - centerY)
        }

        if (showSpotlight) {
            spotX.set(e.clientX - rect.left)
            spotY.set(e.clientY - rect.top)
            spotOpacity.set(1)
        }
    }

    function handleMouseLeave() {
        x.set(0)
        y.set(0)
        if (showSpotlight) {
            spotOpacity.set(0)
        }
    }

    // Derived transforms
    const rotateX = useMotionTemplate`calc(${mouseY} * -0.05deg)`
    const rotateY = useMotionTemplate`calc(${mouseX} * 0.05deg)`
    const translateX = useMotionTemplate`calc(${mouseX} * 0.1px)`
    const translateY = useMotionTemplate`calc(${mouseY} * 0.1px)`

    const spotlightBg = useMotionTemplate`radial-gradient(600px circle at ${spotX}px ${spotY}px, rgba(255,255,255,0.1), transparent 40%)`

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transformStyle: "preserve-3d",
                perspective: "1000px",
            }}
            className={`relative h-full ${className} group`}
        >
            <motion.div
                style={{
                    rotateX: enable3D ? rotateX : 0,
                    rotateY: enable3D ? rotateY : 0,
                    x: enable3D ? translateX : 0,
                    y: enable3D ? translateY : 0,
                    transformStyle: "preserve-3d",
                }}
                className="relative h-full w-full rounded-xl border border-white/10 bg-zinc-900/50 p-8 shadow-xl backdrop-blur-md transition-colors duration-500"
            >
                {/* JS Spotlight Overlay */}
                {showSpotlight && (
                    <motion.div
                        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        style={{
                            opacity: spotOpacity,
                            background: spotlightBg,
                        }}
                    />
                )}

                {/* CSS Fallback Gradient (only if spotlight is disabled) */}
                {!showSpotlight && (
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
                )}

                {/* Noise Texture */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

                {/* Content with Parallax */}
                <div style={{ transform: enable3D ? "translateZ(20px)" : "none" }} className="relative z-10 h-full flex flex-col">
                    {children}
                </div>
            </motion.div>
        </motion.div>
    )
}
