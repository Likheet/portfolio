"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { AnimeNavBar } from "@/components/ui/anime-navbar"
import { LetterSwapForward } from "@/components/ui/letter-swap"
import { Home, Briefcase, FolderOpen, Award, Mail, ArrowRight } from 'lucide-react'

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
    setIsDark(!isDark)
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

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <AnimeNavBar items={navItems} defaultActive="Home" />

      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <div className="flex flex-col gap-4">
          {["intro", "projects", "work", "achievements", "connect"].map((section) => (
            <button
              key={section}
              onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })}
              className={`w-2 h-8 rounded-full transition-all duration-500 ${
                activeSection === section ? "bg-foreground" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              aria-label={`Navigate to ${section}`}
            />
          ))}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16">
        <header
          id="intro"
          ref={(el) => (sectionsRef.current[0] = el)}
          className="min-h-screen flex items-center opacity-0"
        >
          <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full">
            <div className="lg:col-span-3 space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-2">
                <div className="text-sm text-muted-foreground font-mono tracking-wider">PORTFOLIO / 2025</div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
                  <LetterSwapForward 
                    label="Likheet" 
                    staggerFrom="first"
                    className="inline-flex"
                  />
                  <br />
                  <span className="text-muted-foreground">
                    <LetterSwapForward 
                      label="Shetty" 
                      staggerFrom="first"
                      className="inline-flex"
                    />
                  </span>
                </h1>
              </div>

              <div className="space-y-6 max-w-md">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Software Engineer specializing in
                  <span className="text-foreground"> AI/ML</span>,<span className="text-foreground"> Full-Stack Development</span>,
                  and
                  <span className="text-foreground"> Cloud Computing</span>.
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
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
                <div className="text-sm text-muted-foreground font-mono">CURRENTLY</div>
                <div className="space-y-2">
                  <div className="text-foreground">B.E. (ECE) Student</div>
                  <div className="text-muted-foreground">@ RV Institute of Technology & Management</div>
                  <div className="text-xs text-muted-foreground">2021 — 2025 • CGPA: 8.52</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">FOCUS</div>
                <div className="flex flex-wrap gap-2">
                  {["Python", "C++", "Azure AI", "GCP", "Machine Learning"].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        <section
          id="projects"
          ref={(el) => (sectionsRef.current[1] = el)}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-light">My Projects</h2>
            </div>

            <div className="space-y-8 sm:space-y-12">
              {[
                {
                  name: "Credit Card Fraud Detection",
                  description: "Developed fraud detection model using ensemble methods (Random Forest, Gradient Boosting) to enhance identification of fraudulent transactions. Applied SMOTE and Near-Miss algorithms for class balancing, improving performance on rare fraud detection cases. Compared 6+ machine learning models, including Logistic Regression, k-NN, and Stacking Classifier to determine the best-performing model.",
                  tech: ["Python", "NumPy", "Pandas", "Scikit-Learn"],
                  link: "#",
                },
                {
                  name: "Pathfinding Algorithms Visualiser",
                  description: "Developed a visualizer for pathfinding algorithms, implementing Depth-First Search (DFS), Breadth-First Search (BFS), A*, and Dijkstra's algorithms. A fully interactive website that allows users to create custom mazes and visually observe the selected algorithm solving the maze in real-time.",
                  tech: ["HTML", "JavaScript", "CSS", "Vis.js"],
                  link: "#",
                },
                {
                  name: "AI News App",
                  description: "Built a Voice-Controlled News Application using Alan AI to enable seamless voice interaction and real-time news fetching. Integrated full voice navigation for tasks like fetching news, opening articles, and app navigation with human-like responses. Utilized React for the front-end, Material-UI for designing components, and JavaScript for implementing functionality.",
                  tech: ["Alan AI", "React", "Material-UI", "CSS"],
                  link: "#",
                },
                {
                  name: "Stack-It!",
                  description: "Developed an interactive web-based game using HTML, CSS, and JavaScript. Utilized Three.js and Cannon.js libraries for rendering 3D graphics and physics simulations. Implemented autopilot mode for automatic gameplay and a 500ms input cooldown for enhanced user experience.",
                  tech: ["HTML", "CSS", "JavaScript", "Three.js", "Cannon.js"],
                  link: "#",
                },
              ].map((project, index) => (
                <div
                  key={index}
                  className="group p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-lg sm:text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                        {project.name}
                      </h3>
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed">{project.description}</p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs border border-border rounded-full text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center pt-8">
              <button className="group flex items-center gap-2 px-6 py-3 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm">
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  View More Projects
                </span>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all duration-300" />
              </button>
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
              <h2 className="text-3xl sm:text-4xl font-light">Selected Work</h2>
              <div className="text-sm text-muted-foreground font-mono">2023</div>
            </div>

            <div className="space-y-8 sm:space-y-12">
              {[
                {
                  year: "2023",
                  role: "SDE Intern",
                  company: "DesiQna",
                  location: "Remote, India",
                  period: "Jul 2023 – Dec 2023",
                  description: "Worked on the Design and Development part of a fully responsive webpage for a particular section of DesiQnA. Worked on User Verification/Authentication + Engineering challenges of detecting and removing the fake bots and posts. Integrated Recaptcha with the website - Google Layer of Protection for websites.",
                  tech: ["HTML", "CSS", "JavaScript", "Bootstrap", "MySQL"],
                },
              ].map((job, index) => (
                <div
                  key={index}
                  className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
                >
                  <div className="lg:col-span-2">
                    <div className="text-xl sm:text-2xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                      {job.year}
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-medium">{job.role}</h3>
                      <div className="text-muted-foreground">{job.company}</div>
                      <div className="text-xs text-muted-foreground mt-1">{job.period} • {job.location}</div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed max-w-lg">{job.description}</p>
                  </div>

                  <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end mt-2 lg:mt-0">
                    {job.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs text-muted-foreground rounded group-hover:border-muted-foreground/50 transition-colors duration-500"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center pt-8">
              <button className="group flex items-center gap-2 px-6 py-3 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm">
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  View More Experience
                </span>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all duration-300" />
              </button>
            </div>
          </div>
        </section>

        <section
          id="achievements"
          ref={(el) => (sectionsRef.current[3] = el)}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <h2 className="text-3xl sm:text-4xl font-light">Achievements</h2>

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
              <button className="group flex items-center gap-2 px-6 py-3 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm">
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  View All Achievements
                </span>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all duration-300" />
              </button>
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
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="text-sm text-muted-foreground font-mono">ELSEWHERE</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "GitHub", handle: "@Likheet", url: "https://github.com/Likheet" },
                  { name: "LinkedIn", handle: "Likheet Shetty", url: "https://www.linkedin.com/in/likheet-shetty" },
                  { name: "HackerRank", handle: "@likheetshetty", url: "https://www.hackerrank.com/profile/likheetshetty" },
                ].map((social) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
                  >
                    <div className="space-y-2">
                      <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                        {social.name}
                      </div>
                      <div className="text-sm text-muted-foreground">{social.handle}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="py-12 sm:py-16 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">© 2025 Likheet Shetty. All rights reserved.</div>
              <div className="text-xs text-muted-foreground">Built with v0.dev</div>
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
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
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

              <button className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300">
                <svg
                  className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </footer>
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  )
}
