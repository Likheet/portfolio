"use client"

import { FullscreenDrawer } from "@/components/ui/fullscreen-drawer"
import { MagneticCard3D } from "@/components/ui/magnetic-card"
import { achievements } from "@/lib/data"
import { Award } from "lucide-react"

interface AchievementsDrawerProps {
    isOpen: boolean
    onClose: () => void
}

export function AchievementsDrawer({ isOpen, onClose }: AchievementsDrawerProps) {
    return (
        <FullscreenDrawer isOpen={isOpen} onClose={onClose} title="All Achievements">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement, index) => (
                    <MagneticCard3D key={index} className="h-full">
                        <div className="space-y-4 h-full flex flex-col">
                            <div className="text-xs text-blue-400 font-medium tracking-wider uppercase">
                                {achievement.category}
                            </div>

                            <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                                {achievement.title}
                            </h3>

                            <p className="text-zinc-400 leading-relaxed flex-grow">
                                {achievement.description}
                            </p>

                            <div className="pt-4 flex items-center gap-2 text-sm text-zinc-500 group-hover:text-white transition-colors">
                                <Award className="w-4 h-4" />
                                <span>Verified Achievement</span>
                            </div>
                        </div>
                    </MagneticCard3D>
                ))}
            </div>
        </FullscreenDrawer>
    )
}
