"use client"

import { motion } from "framer-motion"

interface TimelineItemProps {
    year: string
    title: string
    company: string
    date: string
    description: string
    tech: string[]
    index: number
    isLast?: boolean
    enableAnimation?: boolean
}

export function TimelineItem({
    year,
    title,
    company,
    date,
    description,
    tech,
    index,
    isLast,
    enableAnimation = true
}: TimelineItemProps) {
    const Wrapper = enableAnimation ? motion.div : "div"

    const animationProps = enableAnimation ? {
        initial: { opacity: 0, x: -20 },
        whileInView: { opacity: 1, x: 0 },
        transition: { duration: 0.5, delay: index * 0.1 },
        viewport: { once: true }
    } : {}

    return (
        <div className="relative pl-8 sm:pl-12 py-2 group">
            {/* Vertical Line */}
            {!isLast && (
                <div
                    className="absolute left-[11px] sm:left-[15px] top-[24px] bottom-[-24px] w-[2px] bg-border group-hover:bg-blue-500/30 transition-colors duration-300"
                />
            )}

            {/* Dot */}
            <div className="absolute left-[4px] sm:left-[8px] top-[24px] w-4 h-4 rounded-full border-2 border-blue-500 bg-background z-10 group-hover:scale-125 transition-transform duration-300" />

            <Wrapper
                {...animationProps}
                className="flex flex-col sm:flex-row gap-4 sm:gap-8 p-4 rounded-xl hover:bg-white/5 transition-colors duration-300"
            >
                <div className="sm:w-32 flex-shrink-0">
                    <span className="text-2xl font-light text-muted-foreground group-hover:text-blue-400 transition-colors">
                        {year}
                    </span>
                </div>

                <div className="flex-grow space-y-3">
                    <div>
                        <h3 className="text-xl font-semibold">{title}</h3>
                        <div className="text-blue-400 font-medium">{company}</div>
                        <div className="text-xs text-muted-foreground mt-1">{date}</div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed text-sm">
                        {description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                        {tech.map((t) => (
                            <span
                                key={t}
                                className="px-2 py-1 text-xs rounded bg-secondary text-secondary-foreground group-hover:bg-blue-500/10 group-hover:text-blue-400 transition-colors"
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </Wrapper>
        </div>
    )
}
