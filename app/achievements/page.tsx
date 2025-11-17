"use client"

import Link from "next/link"
import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function AchievementsPage() {
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

  const allAchievements = [
    {
      title: "Azure AI Engineer Associate",
      description: "Achieved Azure AI Engineer Associate certification, validating proficiency in designing and implementing AI solutions on the Microsoft Azure platform.",
      details: "This certification demonstrates expertise in designing and implementing AI solutions using Azure Cognitive Services, Azure Machine Learning, and knowledge mining.",
      category: "Certification",
      date: "2024",
    },
    {
      title: "3-Star Problem Solving on HackerRank",
      description: "Demonstrated strong problem-solving skills and algorithmic thinking on the HackerRank platform.",
      details: "Achieved 3-star rating by solving complex data structures and algorithm problems, ranking in the top percentile of programmers.",
      category: "Competitive Programming",
      date: "2024",
    },
    {
      title: "20th Place - GeeksforGeeks Weekly Contest 162",
      description: "Achieved 20th place in the GeeksforGeeks Weekly Contest 162 leaderboard, competing against programmers worldwide.",
      details: "Demonstrated strong algorithmic problem-solving abilities in a time-constrained competitive environment.",
      category: "Competitive Programming",
      date: "2024",
    },
    {
      title: "2nd Place - CYBERATIC-QUIZ",
      description: "Placed 2nd out of all students within the college in CYBERATIC-QUIZ, demonstrating expertise in cybersecurity concepts.",
      details: "Competed in a comprehensive cybersecurity quiz covering topics like network security, cryptography, and ethical hacking.",
      category: "College Achievement",
      date: "2023",
    },
    {
      title: "Google Cloud Digital Leader",
      description: "Gained foundational knowledge of cloud computing principles by completing the Google Cloud Digital Leader Certification.",
      details: "This certification validates understanding of cloud concepts, Google Cloud products and services, and their business value.",
      category: "Certification",
      date: "2023",
    },
    {
      title: "50+ Google Cloud Skill Labs",
      description: "Completed over 50 skill labs on Google Cloud Platform, demonstrating hands-on expertise in cloud technologies.",
      details: "Gained practical experience with GCP services including Compute Engine, Cloud Storage, BigQuery, and Kubernetes Engine.",
      category: "Cloud Computing",
      date: "2023",
    },
    {
      title: "MATLAB Onramp Certification",
      description: "Successfully completed the MATLAB Onramp course, showcasing a solid foundation in MATLAB programming and computational thinking.",
      details: "Learned MATLAB fundamentals including arrays, plotting, data analysis, and script development.",
      category: "Certification",
      date: "2023",
    },
    {
      title: "Volunteer - Waste Management Awareness",
      description: "Volunteered at a local government school to increase awareness on Proper Waste Management and Disposal, contributing to environmental education.",
      details: "Organized workshops and activities to educate students about waste segregation, recycling, and environmental conservation.",
      category: "Community Service",
      date: "2022",
    },
    {
      title: "BLS Certified",
      description: "Save a Life BLS Certified, demonstrating commitment to public safety and emergency response preparedness.",
      details: "Completed Basic Life Support (BLS) training including CPR, AED usage, and emergency response protocols.",
      category: "Health & Safety",
      date: "2022",
    },
  ]

  const categories = Array.from(new Set(allAchievements.map((a) => a.category)))

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
            <h1 className="text-5xl sm:text-6xl font-bold">Achievements</h1>
            <p className="text-lg sm:text-xl font-extralight text-muted-foreground leading-relaxed">
              A comprehensive list of certifications, competitive programming achievements, and community contributions.
            </p>
          </div>

          {categories.map((category) => (
            <div key={category} className="space-y-6">
              <h2 className="text-2xl font-light text-muted-foreground border-b border-border pb-2">{category}</h2>
              <div className="grid gap-6 lg:grid-cols-2">
                {allAchievements
                  .filter((achievement) => achievement.category === category)
                  .map((achievement, index) => (
                    <article
                      key={index}
                      className="group p-6 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg"
                    >
                      <div className="space-y-4">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-lg font-medium group-hover:text-muted-foreground transition-colors duration-300">
                            {achievement.title}
                          </h3>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">{achievement.date}</span>
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed">{achievement.description}</p>

                        <p className="text-xs text-muted-foreground/80 leading-relaxed">{achievement.details}</p>
                      </div>
                    </article>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
