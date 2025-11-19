"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { AnimeNavBar } from "@/components/ui/anime-navbar"
import { LetterSwapForward } from "@/components/ui/letter-swap"
import { AuroraBackground } from "@/components/ui/aurora-background"
import { ProjectCard } from "@/components/ui/project-card"
import { TimelineItem } from "@/components/ui/timeline"
import { SkillBadge } from "@/components/ui/skill-badge"
import { MagneticCard3D } from "@/components/ui/magnetic-card"
import { Home, Briefcase, FolderOpen, Award, Mail, ArrowRight, ExternalLink, Github } from 'lucide-react'
import ContactForm from "@/components/ui/contact-form"
import { ProjectsOverlay } from "@/components/projects-overlay"
import { AchievementsOverlay } from "@/components/achievements-overlay"
import { WorkOverlay } from "@/components/work-overlay"
import { projects, achievements, workExperience } from "@/lib/data"

export default function Portfolio() {
  const [isDark, setIsDark] = useState(true)
  const [activeSection, setActiveSection] = useState("")
  const [isProjectsOpen, setIsProjectsOpen] = useState(false)
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false)
  const [isWorkOpen, setIsWorkOpen] = useState(false)
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px 0px 0px" },
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    const switchTheme = () => {
      setIsDark(newTheme)
    }

    // Check if browser supports View Transitions API
    if (!document.startViewTransition) {
      switchTheme()
      return
    }

    // Use View Transitions API for smooth animated transition
    document.startViewTransition(switchTheme)
  }

  const navItems = [
    {
      name: "Home",
      url: "#intro",
      icon: Home,
    },
    {
      name: "Projects",
      url: "#projects",
      icon: FolderOpen,
    },
    {
      name: "Work",
      url: "#work",
      icon: Briefcase,
    },
    {
      name: "Achievements",
      url: "#achievements",
      icon: Award,
    },
    {
      name: "Connect",
      url: "#connect",
      icon: Mail,
    },
  ]

  const sectionNav = [
    { id: "intro", label: "Home" },
    { id: "projects", label: "Projects" },
    { id: "work", label: "Work" },
    { id: "achievements", label: "Achievements" },
    { id: "connect", label: "Connect" },
  ]

  const isOverlayOpen = isProjectsOpen || isAchievementsOpen || isWorkOpen

  return (
    <div className="min-h-screen text-foreground relative overflow-hidden bg-black">
      {/* Main Content Wrapper for Scale Effect */}
      <motion.div
        animate={{
          scale: isOverlayOpen ? 0.92 : 1,
          opacity: isOverlayOpen ? 0.5 : 1,
          filter: isOverlayOpen ? "blur(4px)" : "blur(0px)",
          borderRadius: isOverlayOpen ? "24px" : "0px",
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="origin-center h-full w-full bg-background overflow-hidden"
        style={{ backgroundColor: isDark ? 'rgb(24, 24, 27)' : '#fafafa' }}
      >
        <AnimeNavBar items={navItems} defaultActive="Home" />

        <button
          onClick={toggleTheme}
          className="fixed top-24 right-6 z-50 group p-3 rounded-lg border border-border bg-background hover:border-muted-foreground/50 transition-all duration-300 shadow-sm"
          aria-label="Toggle theme"
        >
          {isDark ? (
            <svg
              className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414 0zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>

        <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
          <div className="flex flex-col gap-4">
            {sectionNav.map((section) => (
              <button
                key={section.id}
                onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" })}
                className="group flex items-center gap-3"
                aria-label={`Navigate to ${section.label}`}
              >
                <div
                  className={`w-2 h-8 rounded-full transition-all duration-500 ${activeSection === section.id ? "bg-foreground" : "bg-muted-foreground/30 group-hover:bg-muted-foreground/60"
                    }`}
                />
                <span
                  className={`text-sm tracking-wider transition-all duration-500 ${activeSection === section.id
                    ? "text-foreground opacity-70 translate-x-0"
                    : "text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-70 group-hover:translate-x-0"
                    }`}
                >
                  {section.label}
                </span>
              </button>
            ))}
          </div>
        </nav>

        <AuroraBackground
          id="intro"
          ref={(el) => { sectionsRef.current[0] = el }}
          className="opacity-0"
          isDark={isDark}
        >
          <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 isolate"
          >
            <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full">
              <div className="lg:col-span-3 space-y-6 sm:space-y-8">
                <div className="space-y-3 sm:space-y-2">
                  <div
                    className="text-sm tracking-wider font-medium"
                    style={{ color: isDark ? '#e5e5e5' : '#0a0a0a' }}
                  >
                    PORTFOLIO / 2025
                  </div>
                  <h1
                    className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight"
                    style={{ color: isDark ? '#ffffff' : '#0a0a0a' }}
                  >
                    <LetterSwapForward
                      label="Likheet"
                      staggerFrom="first"
                      className="inline-flex"
                    />
                    <br />
                    <span
                      style={{ color: isDark ? '#e5e5e5' : '#171717' }}
                    >
                      <LetterSwapForward
                        label="Shetty"
                        staggerFrom="first"
                        className="inline-flex"
                      />
                    </span>
                  </h1>
                </div>

                <div className="space-y-6 max-w-md">
                  <p
                    className="text-lg sm:text-xl font-extralight leading-relaxed"
                    style={{ color: isDark ? '#e5e5e5' : '#171717' }}
                  >
                    Software Engineer specializing in
                    <span
                      className="font-normal"
                      style={{ color: isDark ? '#ffffff' : '#0a0a0a' }}
                    > AI/ML</span>,<span
                      className="font-normal"
                      style={{ color: isDark ? '#ffffff' : '#0a0a0a' }}
                    > Full-Stack Development</span>,
                    and
                    <span
                      className="font-normal"
                      style={{ color: isDark ? '#ffffff' : '#0a0a0a' }}
                    > Cloud Computing</span>.
                  </p>

                  <div
                    className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm"
                    style={{ color: isDark ? '#e5e5e5' : '#262626' }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      Available for work
                    </div>
                    <div>Bangalore, India</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0">
                <div className="space-y-4">
                  <div
                    className="text-sm font-medium"
                    style={{ color: isDark ? '#e5e5e5' : '#0a0a0a' }}
                  >
                    CURRENTLY
                  </div>
                  <div className="space-y-2">
                    <div
                      className="font-medium"
                      style={{ color: isDark ? '#ffffff' : '#0a0a0a' }}
                    >
                      B.E. (ECE) Student
                    </div>
                    <div
                      style={{ color: isDark ? '#e5e5e5' : '#171717' }}
                    >
                      @ RV Institute of Technology & Management
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: isDark ? '#e5e5e5' : '#262626' }}
                    >
                      2021 — 2025 • CGPA: 8.92
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div
                    className="text-sm font-medium"
                    style={{ color: isDark ? '#e5e5e5' : '#0a0a0a' }}
                  >
                    FOCUS
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Python", "C++", "Azure AI", "GCP", "Machine Learning", "Next.js", "React", "TypeScript"].map((skill, index) => (
                      <SkillBadge key={skill} name={skill} index={index} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AuroraBackground>

        <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16" style={{ backgroundColor: isDark ? 'rgb(24, 24, 27)' : '#fafafa' }}>

          <section id="projects" ref={(el) => { sectionsRef.current[1] = el }} className="min-h-screen py-20 sm:py-32 opacity-0">
            <div className="space-y-12 sm:space-y-16">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <button onClick={() => setIsProjectsOpen(true)} className="group text-left">
                  <h2 className="text-3xl sm:text-4xl font-bold group-hover:text-muted-foreground transition-colors duration-300">My Projects</h2>
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                {projects.slice(0, 4).map((project, index) => (
                  <ProjectCard
                    key={index}
                    title={project.name}
                    description={project.description}
                    tech={project.tech}
                    link={project.link}
                    github={project.github}
                    index={index}
                    enableAnimation={true}
                  />
                ))}
              </div>

              <div className="flex justify-center pt-8">
                <button
                  onClick={() => setIsProjectsOpen(true)}
                  className="group flex items-center gap-2 px-6 py-3 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
                >
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">View All Projects</span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all duration-300" />
                </button>
              </div>
            </div>
          </section>

          <section
            id="work"
            ref={(el) => { sectionsRef.current[2] = el }}
            className="min-h-screen py-20 sm:py-32 opacity-0"
          >
            <div className="space-y-12 sm:space-y-16">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <button onClick={() => setIsWorkOpen(true)} className="group text-left">
                  <h2 className="text-3xl sm:text-4xl font-bold group-hover:text-muted-foreground transition-colors duration-300">
                    Selected Work
                  </h2>
                </button>
                <div className="text-sm text-muted-foreground font-medium">2023</div>
              </div>

              <div className="relative border-l border-border/50 ml-3 sm:ml-0 space-y-12">
                {workExperience.slice(0, 2).map((item, index, array) => (
                  <TimelineItem
                    key={index}
                    year={item.year}
                    title={item.title}
                    company={item.company}
                    date={item.date}
                    description={item.description}
                    tech={item.tech}
                    index={index}
                    isLast={index === array.length - 1}
                  />
                ))}
              </div>

              <div className="flex justify-center pt-8">
                <button
                  onClick={() => setIsWorkOpen(true)}
                  className="group flex items-center gap-2 px-6 py-3 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
                >
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    View All Experience
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all duration-300" />
                </button>
              </div>
            </div>
          </section>

          <section
            id="achievements"
            ref={(el) => { sectionsRef.current[3] = el }}
            className="min-h-screen py-20 sm:py-32 opacity-0"
          >
            <div className="space-y-12 sm:space-y-16">
              <button onClick={() => setIsAchievementsOpen(true)} className="group inline-block text-left">
                <h2 className="text-3xl sm:text-4xl font-bold group-hover:text-muted-foreground transition-colors duration-300">
                  Achievements
                </h2>
              </button>

              <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
                {achievements.slice(0, 4).map((achievement, index) => (
                  <MagneticCard3D
                    key={index}
                    className="h-full"
                  >
                    <div className="space-y-4 h-full flex flex-col">
                      <div className="text-xs text-blue-400 font-medium tracking-wider uppercase">
                        {achievement.category}
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
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

              <div className="flex justify-center pt-8">
                <button
                  onClick={() => setIsAchievementsOpen(true)}
                  className="group flex items-center gap-2 px-6 py-3 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
                >
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    View All Achievements
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all duration-300" />
                </button>
              </div>
            </div>
          </section>

          <section id="connect" ref={(el) => { sectionsRef.current[4] = el }} className="py-20 sm:py-32 opacity-0">
            <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
              <div className="space-y-6 sm:space-y-8">
                <h2 className="text-3xl sm:text-4xl font-bold">Let's Connect</h2>

                <div className="space-y-6">
                  <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                    Always interested in new opportunities, collaborations, and conversations about AI, technology, and software development.
                  </p>

                  <div className="space-y-4">
                    <Link
                      href="mailto:likheet.s@gmail.com"
                      className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
                    >
                      <span className="text-base sm:text-lg">likheet.s@gmail.com</span>
                      <svg
                        className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                    <div className="text-muted-foreground text-sm">+91-8904090247</div>
                  </div>

                  <div className="space-y-4 pt-4">
                    <div className="text-sm text-muted-foreground font-medium">MY LINKS</div>
                    <div className="flex items-center gap-4">
                      <Link
                        href="https://github.com/Likheet"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
                        aria-label="GitHub"
                      >
                        <svg
                          className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </Link>

                      <Link
                        href="https://www.linkedin.com/in/likheet/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
                        aria-label="LinkedIn"
                      >
                        <svg
                          className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </Link>

                      <Link
                        href="https://www.instagram.com/likheetshetty/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
                        aria-label="Instagram"
                      >
                        <svg
                          className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M7 2H17C19.2091 2 21 3.79086 21 6V18C21 20.2091 19.2091 22 17 22H7C4.79086 22 3 20.2091 3 18V6C3 3.79086 4.79086 2 7 2ZM7 4C5.89543 4 5 4.89543 5 6V18C5 19.1046 5.89543 20 7 20H17C18.1046 20 19 19.1046 19 18V6C19 4.89543 18.1046 4 17 4H7ZM12 7C14.7614 7 17 9.23858 17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7ZM12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9ZM16.5 6C17.3284 6 18 6.67157 18 7.5C18 8.32843 17.3284 9 16.5 9C15.6716 9 15 8.32843 15 7.5C15 6.67157 15.6716 6 16.5 6Z" />
                        </svg>
                      </Link>

                      <Link
                        href="https://www.kaggle.com/likheet"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
                        aria-label="Kaggle"
                      >
                        <svg
                          className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.07.358" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6 sm:space-y-8">
                <div className="text-sm text-muted-foreground font-medium">SEND A MESSAGE</div>

                <ContactForm />
              </div>
            </div>
          </section>

          <footer className="py-12 sm:py-16 border-t border-border">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">© 2025 Likheet Shetty. All rights reserved.</div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={toggleTheme}
                  className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300"
                  aria-label="Toggle theme"
                >
                  {isDark ? (
                    <svg
                      className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414 0zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </footer>
        </main>
      </motion.div>

      <ProjectsOverlay isOpen={isProjectsOpen} onClose={() => setIsProjectsOpen(false)} />
      <AchievementsOverlay isOpen={isAchievementsOpen} onClose={() => setIsAchievementsOpen(false)} />
      <WorkOverlay isOpen={isWorkOpen} onClose={() => setIsWorkOpen(false)} />
    </div>
  )
}
