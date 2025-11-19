"use client"

import { CinematicOverlay } from "@/components/ui/cinematic-overlay"
import { workExperience } from "@/lib/data"
import { motion } from "framer-motion"
import { TimelineItem } from "@/components/ui/timeline"

interface WorkOverlayProps {
    isOpen: boolean
    onClose: () => void
}

export function WorkOverlay({ isOpen, onClose }: WorkOverlayProps) {
    return (
        <CinematicOverlay isOpen={isOpen} onClose={onClose} title="Selected Work">
            <div className="relative border-l border-white/10 ml-3 sm:ml-0 space-y-12 py-8">
                {workExperience.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{
                            duration: 0.6,
                            delay: index * 0.2,
                            type: "spring",
                            damping: 20,
                            stiffness: 100
                        }}
                    >
                        <TimelineItem
                            year={item.year}
                            title={item.title}
                            company={item.company}
                            date={item.date}
                            description={item.description}
                            tech={item.tech}
                            index={index}
                            isLast={index === workExperience.length - 1}
                            enableAnimation={false}
                        />
                    </motion.div>
                ))}
            </div>
        </CinematicOverlay>
    )
}
