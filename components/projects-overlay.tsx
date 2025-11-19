"use client"

import { useState } from "react"
import { motion, LayoutGroup } from "framer-motion"
import { CinematicOverlay } from "@/components/ui/cinematic-overlay"
import { ProjectCard } from "@/components/ui/project-card"
import { projects } from "@/lib/data"

interface ProjectsOverlayProps {
    isOpen: boolean
    onClose: () => void
}

const categories = ["All", "AI/ML", "Web", "Mobile", "Other"]

export function ProjectsOverlay({ isOpen, onClose }: ProjectsOverlayProps) {
    const [activeCategory, setActiveCategory] = useState("All")

    const filteredProjects = projects.filter(project =>
        activeCategory === "All" || project.category === activeCategory
    )

    return (
        <CinematicOverlay isOpen={isOpen} onClose={onClose} title="All Projects">
            <div className="space-y-8">
                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category
                                    ? "bg-white text-black shadow-lg scale-105"
                                    : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <LayoutGroup>
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{
                                    duration: 0.4,
                                    delay: index * 0.05,
                                    ease: "easeOut"
                                }}
                                key={project.name}
                            >
                                <ProjectCard
                                    title={project.name}
                                    description={project.description}
                                    tech={project.tech}
                                    link={project.link}
                                    github={project.github}
                                    index={index}
                                    enableAnimation={false}
                                />
                            </motion.div>
                        ))}
                    </LayoutGroup>
                </motion.div>

                {filteredProjects.length === 0 && (
                    <div className="text-center py-20 text-zinc-500">
                        No projects found in this category.
                    </div>
                )}
            </div>
        </CinematicOverlay>
    )
}
