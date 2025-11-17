"use client"

import Link from "next/link"
import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function WorkPage() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'))
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  const allWork = [
    {
      year: "2023",
      role: "SDE Intern",
      company: "DesiQna",
      location: "Remote, India",
      period: "Jul 2023 – Dec 2023",
      description: "Worked on the Design and Development part of a fully responsive webpage for a particular section of DesiQnA. Worked on User Verification/Authentication + Engineering challenges of detecting and removing the fake bots and posts. Integrated Recaptcha with the website - Google Layer of Protection for websites.",
      responsibilities: [
        "Designed and developed fully responsive web pages using HTML, CSS, JavaScript, and Bootstrap",
        "Implemented user authentication and verification systems to ensure secure access",
        "Built bot detection algorithms to identify and remove fake accounts and spam posts",
        "Integrated Google reCAPTCHA to add an additional layer of security",
        "Collaborated with backend team to optimize database queries using MySQL",
      ],
      tech: ["HTML", "CSS", "JavaScript", "Bootstrap", "MySQL"],
    },
    {
      year: "2022",
      role: "Full Stack Developer Intern",
      company: "Tech Solutions Inc.",
      location: "Bangalore, India",
      period: "Jan 2022 – Jun 2022",
      description: "Contributed to the development of internal tools and client-facing applications. Collaborated with cross-functional teams to deliver high-quality software solutions.",
      responsibilities: [
        "Developed RESTful APIs using Node.js and Express for internal tools",
        "Built responsive React components for client-facing dashboards",
        "Implemented PostgreSQL database schemas and optimized queries",
        "Containerized applications using Docker for consistent deployment",
        "Participated in code reviews and agile sprint planning",
      ],
      tech: ["React", "Node.js", "PostgreSQL", "Docker"],
    },
  ]

  return (
    <div className="min-h-screen text-foreground" style={{ backgroundColor: isDark ? 'rgb(24, 24, 27)' : '#fafafa' }}>
      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 py-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="space-y-12">
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl font-bold">Work Experience</h1>
            <p className="text-lg sm:text-xl font-extralight text-muted-foreground leading-relaxed">
              My professional journey in software development, including internships and projects that shaped my skills.
            </p>
          </div>

          <div className="space-y-12">
            {allWork.map((job, index) => (
              <article
                key={index}
                className="group space-y-6 p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-medium">{job.role}</h2>
                    <div className="text-lg text-muted-foreground">{job.company}</div>
                    <div className="text-sm text-muted-foreground">
                      {job.period} • {job.location}
                    </div>
                  </div>
                  <div className="text-3xl font-light text-muted-foreground">{job.year}</div>
                </div>

                <p className="text-muted-foreground leading-relaxed">{job.description}</p>

                <div className="space-y-3">
                  <div className="text-sm font-medium text-foreground">Key Responsibilities:</div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {job.responsibilities.map((responsibility, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span className="text-foreground mt-1.5">•</span>
                        <span className="leading-relaxed">{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 pt-4">
                  {job.tech.map((tech) => (
                    <span key={tech} className="px-3 py-1 text-xs border border-border rounded-full text-muted-foreground">
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
