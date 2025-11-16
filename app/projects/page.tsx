"use client"

import Link from "next/link"
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { useEffect } from 'react'

export default function ProjectsPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  const allProjects = [
    {
      name: "Credit Card Fraud Detection",
      description: "Developed fraud detection model using ensemble methods (Random Forest, Gradient Boosting) to enhance identification of fraudulent transactions. Applied SMOTE and Near-Miss algorithms for class balancing, improving performance on rare fraud detection cases. Compared 6+ machine learning models, including Logistic Regression, k-NN, and Stacking Classifier to determine the best-performing model.",
      tech: ["Python", "NumPy", "Pandas", "Scikit-Learn"],
      details: "This machine learning project focuses on identifying fraudulent credit card transactions using advanced ensemble learning techniques. The model achieved 98.5% accuracy on test data.",
      link: "https://github.com/Likheet/Fraud-Detection-ML",
    },
    {
      name: "Pathfinding Algorithms Visualiser",
      description: "Developed a visualizer for pathfinding algorithms, implementing Depth-First Search (DFS), Breadth-First Search (BFS), A*, and Dijkstra's algorithms. A fully interactive website that allows users to create custom mazes and visually observe the selected algorithm solving the maze in real-time.",
      tech: ["HTML", "JavaScript", "CSS", "Vis.js"],
      details: "An educational tool that helps users understand how different pathfinding algorithms work through interactive visualization.",
      link: "https://github.com/Likheet/pathfinding-algorithm",
    },
    {
      name: "AI News App",
      description: "Built a Voice-Controlled News Application using Alan AI to enable seamless voice interaction and real-time news fetching. Integrated full voice navigation for tasks like fetching news, opening articles, and app navigation with human-like responses. Utilized React for the front-end, Material-UI for designing components, and JavaScript for implementing functionality.",
      tech: ["Alan AI", "React", "Material-UI", "CSS"],
      details: "A modern news application that leverages voice AI to provide hands-free news browsing experience.",
      link: "https://github.com/Likheet/AI-News-App",
    },
    {
      name: "Stack-It!",
      description: "Developed an interactive web-based game using HTML, CSS, and JavaScript. Utilized Three.js and Cannon.js libraries for rendering 3D graphics and physics simulations. Implemented autopilot mode for automatic gameplay and a 500ms input cooldown for enhanced user experience.",
      tech: ["HTML", "CSS", "JavaScript", "Three.js", "Cannon.js"],
      details: "A fun 3D stacking game with realistic physics simulation and smooth gameplay mechanics.",
      link: "https://github.com/Likheet/stack-game",
    },
    {
      name: "E-Commerce Platform",
      description: "Built a full-stack e-commerce platform with user authentication, product management, shopping cart functionality, and payment integration. Implemented responsive design and optimized performance for smooth user experience.",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      details: "A complete e-commerce solution with secure payment processing and intuitive user interface.",
      link: "https://github.com/Likheet/ecommerce-platform",
    },
    {
      name: "Weather Forecast App",
      description: "Created a weather forecast application that provides real-time weather data and 7-day forecasts. Integrated with OpenWeather API and implemented location-based services for automatic weather detection.",
      tech: ["JavaScript", "React", "OpenWeather API", "CSS"],
      details: "A responsive weather application with accurate forecasts and beautiful UI.",
      link: "https://github.com/Likheet/weather-app",
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
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
            <h1 className="text-4xl sm:text-5xl font-light">All Projects</h1>
            <p className="text-lg text-muted-foreground">
              A comprehensive collection of my software development projects, spanning machine learning, web
              development, and interactive applications.
            </p>
          </div>

          <div className="space-y-8">
            {allProjects.map((project, index) => (
              <a
                key={index}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg cursor-pointer"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-xl sm:text-2xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                      {project.name}
                    </h2>
                    <ExternalLink className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0" />
                  </div>

                  <p className="text-muted-foreground leading-relaxed">{project.description}</p>

                  <p className="text-sm text-muted-foreground leading-relaxed">{project.details}</p>

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
              </a>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
