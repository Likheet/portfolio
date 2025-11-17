"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { AnimeNavBar } from "@/components/ui/anime-navbar"
import { LetterSwapForward } from "@/components/ui/letter-swap"
import { AuroraBackground } from "@/components/ui/aurora-background"
import { Home, Briefcase, FolderOpen, Award, Mail, ArrowRight, ExternalLink } from 'lucide-react'
import ContactForm from "@/components/ui/contact-form"

export default function Portfolio() {
  const [isDark, setIsDark] = useState(true)
  const [activeSection, setActiveSection] = useState("")
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
      { threshold: 0.3, rootMargin: "0px 0px -20% 0px" },
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const toggleTheme = () => {
    const switchTheme = () => {
      setIsDark(!isDark)
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

  return (
    <div className="min-h-screen bg-background text-foreground relative">
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
                className={`w-2 h-8 rounded-full transition-all duration-500 ${
                  activeSection === section.id ? "bg-foreground" : "bg-muted-foreground/30 group-hover:bg-muted-foreground/60"
                }`}
              />
              <span
                className={`text-sm font-mono tracking-wider transition-all duration-500 ${
                  activeSection === section.id 
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
        ref={(el) => (sectionsRef.current[0] = el)}
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
                  className="text-sm font-mono tracking-wider"
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
                  className="text-sm font-mono"
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
                  className="text-sm font-mono"
                  style={{ color: isDark ? '#e5e5e5' : '#0a0a0a' }}
                >
                  FOCUS
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Python", "C++", "Azure AI", "GCP", "Machine Learning"].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs border rounded-full transition-colors duration-300"
                      style={{
                        color: isDark ? '#e5e5e5' : '#0a0a0a',
                        borderColor: isDark ? '#525252' : '#d4d4d4'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = isDark ? '#a3a3a3' : '#737373'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = isDark ? '#525252' : '#d4d4d4'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AuroraBackground>

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16">

        <section id="projects" ref={(el) => (sectionsRef.current[1] = el)} className="min-h-screen py-20 sm:py-32 opacity-0">
          <div className="space-y-12 sm:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <Link href="/projects" className="group">
                <h2 className="text-3xl sm:text-4xl font-light group-hover:text-muted-foreground transition-colors duration-300">My Projects</h2>
              </Link>
            </div>

            <div className="space-y-8 sm:space-y-12">
              {[
                {
                  name: "Credit Card Fraud Detection",
                  description: "Developed fraud detection model using ensemble methods (Random Forest, Gradient Boosting) to enhance identification of fraudulent transactions. Applied SMOTE and Near-Miss algorithms for class balancing, improving performance on rare fraud detection cases. Compared 6+ machine learning models, including Logistic Regression, k-NN, and Stacking Classifier to determine the best-performing model.",
                  tech: ["Python", "NumPy", "Pandas", "Scikit-Learn"],
                  link: "https://github.com/Likheet/Fraud-Detection-ML",
                },
                {
                  name: "Pathfinding Algorithms Visualiser",
                  description: "Developed a visualizer for pathfinding algorithms, implementing Depth-First Search (DFS), Breadth-First Search (BFS), A*, and Dijkstra's algorithms. A fully interactive website that allows users to create custom mazes and visually observe the selected algorithm solving the maze in real-time.",
                  tech: ["HTML", "JavaScript", "CSS", "Vis.js"],
                  link: "https://github.com/Likheet/pathfinding-algorithm",
                },
                {
                  name: "AI News App",
                  description: "Built a Voice-Controlled News Application using Alan AI to enable seamless voice interaction and real-time news fetching. Integrated full voice navigation for tasks like fetching news, opening articles, and app navigation with human-like responses. Utilized React for the front-end, Material-UI for designing components, and JavaScript for implementing functionality.",
                  tech: ["Alan AI", "React", "Material-UI", "CSS"],
                  link: "https://github.com/Likheet/AI-News-App",
                },
                {
                  name: "Stack-It!",
                  description: "Developed an interactive web-based game using HTML, CSS, and JavaScript. Utilized Three.js and Cannon.js libraries for rendering 3D graphics and physics simulations. Implemented autopilot mode for automatic gameplay and a 500ms input cooldown for enhanced user experience.",
                  tech: ["HTML", "CSS", "JavaScript", "Three.js", "Cannon.js"],
                  link: "https://github.com/Likheet/stack-game",
                },
              ].map((project, index) => (
                <a
                  key={index}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-lg sm:text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">{project.name}</h3>
                      <ExternalLink className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0" />
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tech.map((tech) => (
                        <span key={tech} className="px-3 py-1 text-xs border border-border rounded-full text-muted-foreground">{tech}</span>
                      ))}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div className="flex justify-center pt-8">
              <Link href="/projects" className="group flex items-center gap-2 px-6 py-3 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm">
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">View All Projects</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all duration-300" />
              </Link>
            </div>
          </div>
        </section>

        <section
          id="work"
          ref={(el) => (sectionsRef.current[2] = el)}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <Link href="/work" className="group">
                <h2 className="text-3xl sm:text-4xl font-light group-hover:text-muted-foreground transition-colors duration-300">
                  Selected Work
                </h2>
              </Link>
              <div className="text-sm text-muted-foreground font-mono">2023</div>
            </div>

            <div className="space-y-8 sm:space-y-12">
              <div
                className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
              >
                <div className="lg:col-span-2">
                  <div className="text-xl sm:text-2xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                    2023
                  </div>
                </div>

                <div className="lg:col-span-6 space-y-3">
                  <div>
                    <h3 className="text-lg sm:text-xl font-medium">SDE Intern</h3>
                    <div className="text-muted-foreground">DesiQna</div>
                    <div className="text-xs text-muted-foreground mt-1">Jul 2023 – Dec 2023 • Remote, India</div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed max-w-lg">Worked on the Design and Development part of a fully responsive webpage for a particular section of DesiQnA. Worked on User Verification/Authentication + Engineering challenges of detecting and removing the fake bots and posts. Integrated Recaptcha with the website - Google Layer of Protection for websites.</p>
                </div>

                <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end mt-2 lg:mt-0">
                  {["HTML", "CSS", "JavaScript", "Bootstrap", "MySQL"].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs text-muted-foreground rounded group-hover:border-muted-foreground/50 transition-colors duration-500"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-8">
              <Link 
                href="/work"
                className="group flex items-center gap-2 px-6 py-3 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
              >
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  View All Experience
                </span>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all duration-300" />
              </Link>
            </div>
          </div>
        </section>

        <section
          id="achievements"
          ref={(el) => (sectionsRef.current[3] = el)}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <Link href="/achievements" className="group inline-block">
              <h2 className="text-3xl sm:text-4xl font-light group-hover:text-muted-foreground transition-colors duration-300">
                Achievements
              </h2>
            </Link>

            <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
              {[
                {
                  title: "Azure AI Engineer Associate",
                  description: "Achieved Azure AI Engineer Associate certification, validating proficiency in designing and implementing AI solutions.",
                  category: "Certification",
                },
                {
                  title: "3-Star Problem Solving on HackerRank",
                  description: "Demonstrated strong problem-solving skills and algorithmic thinking on the HackerRank platform.",
                  category: "Competitive Programming",
                },
                {
                  title: "20th Place - GeeksforGeeks Weekly Contest 162",
                  description: "Achieved 20th place in the GeeksforGeeks Weekly Contest 162 leaderboard, competing against programmers worldwide.",
                  category: "Competitive Programming",
                },
                {
                  title: "2nd Place - CYBERATIC-QUIZ",
                  description: "Placed 2nd out of all students within the college in CYBERATIC-QUIZ, demonstrating expertise in cybersecurity concepts.",
                  category: "College Achievement",
                },
                {
                  title: "Google Cloud Digital Leader",
                  description: "Gained foundational knowledge of cloud computing principles by completing the Google Cloud Digital Leader Certification.",
                  category: "Certification",
                },
                {
                  title: "50+ Google Cloud Skill Labs",
                  description: "Completed over 50 skill labs on Google Cloud Platform, demonstrating hands-on expertise in cloud technologies.",
                  category: "Cloud Computing",
                },
              ].map((achievement, index) => (
                <article
                  key={index}
                  className="group p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg"
                >
                  <div className="space-y-4">
                    <div className="text-xs text-muted-foreground font-mono">
                      {achievement.category}
                    </div>

                    <h3 className="text-lg sm:text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                      {achievement.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed">{achievement.description}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="flex justify-center pt-8">
              <Link 
                href="/achievements"
                className="group flex items-center gap-2 px-6 py-3 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
              >
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  View All Achievements
                </span>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all duration-300" />
              </Link>
            </div>
          </div>
        </section>

        <section id="connect" ref={(el) => (sectionsRef.current[4] = el)} className="py-20 sm:py-32 opacity-0">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl font-light">Let's Connect</h2>

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
                  <div className="text-sm text-muted-foreground font-mono">MY LINKS</div>
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
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
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
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
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
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.057-1.644.069-4.85.069-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.073-1.689-.073-4.948 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 5.838c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
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
                        <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.07.358"/>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="text-sm text-muted-foreground font-mono">SEND A MESSAGE</div>

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
    </div>
  )
}
