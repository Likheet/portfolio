"use client"

import { CinematicOverlay } from "@/components/ui/cinematic-overlay"
import { AchievementCard } from "@/components/ui/achievement-card"
import { achievements } from "@/lib/data"

interface AchievementsOverlayProps {
    isOpen: boolean
    onClose: () => void
}

export function AchievementsOverlay({ isOpen, onClose }: AchievementsOverlayProps) {
    return (
        <CinematicOverlay isOpen={isOpen} onClose={onClose} title="All Achievements" disableSpotlight={true}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement, index) => (
                    <AchievementCard
                        key={index}
                        title={achievement.title}
                        description={achievement.description}
                        category={achievement.category}
                    />
                ))}
            </div>
        </CinematicOverlay>
    )
}
