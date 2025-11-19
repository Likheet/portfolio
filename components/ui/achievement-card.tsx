"use client"

import { Award } from "lucide-react"

interface AchievementCardProps {
    title: string
    description: string
    category: string
}

export function AchievementCard({ title, description, category }: AchievementCardProps) {
    return (
        <div className="group relative h-full w-full rounded-xl border border-white/10 bg-zinc-900/50 p-8 shadow-xl backdrop-blur-md transition-all duration-300 hover:bg-zinc-900/70 hover:border-white/20">
            {/* Simple gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

            {/* Noise Texture */}
            <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay rounded-xl" />

            {/* Content */}
            <div className="relative z-10 space-y-4 h-full flex flex-col">
                <div className="text-xs text-blue-400 font-medium tracking-wider uppercase">
                    {category}
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                    {title}
                </h3>

                <p className="text-zinc-400 leading-relaxed flex-grow">
                    {description}
                </p>

                <div className="pt-4 flex items-center gap-2 text-sm text-zinc-500 group-hover:text-white transition-colors">
                    <Award className="w-4 h-4" />
                    <span>Verified Achievement</span>
                </div>
            </div>
        </div>
    )
}
