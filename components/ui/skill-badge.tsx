"use client"

import { motion } from "framer-motion"

interface SkillBadgeProps {
    name: string
    index: number
}

export function SkillBadge({ name, index }: SkillBadgeProps) {
    return (
        <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            viewport={{ once: true }}
            className="px-4 py-2 text-sm font-medium rounded-full border border-border bg-background/50 hover:bg-blue-500/10 hover:border-blue-500/30 hover:text-blue-400 transition-all duration-300 cursor-default backdrop-blur-sm"
        >
            {name}
        </motion.span>
    )
}
