"use client"

import { CinematicOverlay } from "@/components/ui/cinematic-overlay"
import { AchievementCard } from "@/components/ui/achievement-card"
import { achievements } from "@/lib/data"
import { useState } from "react"

interface AchievementsOverlayProps {
    isOpen: boolean
    onClose: () => void
}

export function AchievementsOverlay({ isOpen, onClose }: AchievementsOverlayProps) {
    const [visibleCount, setVisibleCount] = useState(9)
    const batchSize = 9
    const visibleAchievements = achievements.slice(0, visibleCount)

    const loadMore = () => {
        setVisibleCount((prev) => Math.min(prev + batchSize, achievements.length))
    }

    return (
        <CinematicOverlay isOpen={isOpen} onClose={onClose} title="All Achievements" disableSpotlight={true}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleAchievements.map((achievement, index) => (
                    <AchievementCard
                        key={index}
                        title={achievement.title}
                        description={achievement.description}
                        category={achievement.category}
                    />
                ))}
            </div>
            {visibleCount < achievements.length && (
                <button
                    onClick={loadMore}
                    className="mt-6 w-full py-2 bg-white/10 text-white rounded hover:bg-white/20 transition-colors"
                >
                    Load More
                </button>
            )}
        </CinematicOverlay>
    )
}
