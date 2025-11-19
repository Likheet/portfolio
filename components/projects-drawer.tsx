"use client"

import { useState } from "react"
import { motion, LayoutGroup } from "framer-motion"
import { FullscreenDrawer } from "@/components/ui/fullscreen-drawer"
import { ProjectCard } from "@/components/ui/project-card"
import { projects } from "@/lib/data"

interface ProjectsDrawerProps {
    isOpen: boolean
    onClose: () => void
}

const categories = ["All", "AI/ML", "Web", "Mobile", "Other"]

export function ProjectsDrawer({ isOpen, onClose }: ProjectsDrawerProps) {
    const [activeCategory, setActiveCategory] = useState("All")

    const filteredProjects = projects.filter(project =>
        activeCategory === "All" || project.category === activeCategory
    )

    return (
        <FullscreenDrawer isOpen={isOpen} onClose={onClose} title="All Projects">
            <div className="space-y-8">
                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category
                                    ? "bg-primary text-primary-foreground shadow-lg scale-105"
                                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
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
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                key={project.name}
                            >
                                <ProjectCard
                                    title={project.name}
                                    description={project.description}
                                    tech={project.tech}
                                    link={project.link}
                                    github={project.github}
                                    index={index}
                                />
                            </motion.div>
                        ))}
                    </LayoutGroup>
                </motion.div>

                {filteredProjects.length === 0 && (
                    <div className="text-center py-20 text-muted-foreground">
                        No projects found in this category.
                    </div>
                )}
            </div>
        </FullscreenDrawer>
    )
}
