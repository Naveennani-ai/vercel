"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import { getPortfolioData } from "@/lib/portfolio-data"

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Corporate Website",
      description: "Modern business website with team showcase and contact forms",
      image: "/images/project-1.png",
      tech: ["React", "Next.js", "Tailwind"],
      liveUrl: "",
      githubUrl: "",
      color: "from-blue-500 to-cyan-500",
    },
  ])

  useEffect(() => {
    const data = getPortfolioData()
    setProjects(data.projects)

    const handleDataChange = (event: CustomEvent) => {
      setProjects(event.detail.projects)
    }

    window.addEventListener("portfolioDataChanged", handleDataChange as EventListener)

    return () => {
      window.removeEventListener("portfolioDataChanged", handleDataChange as EventListener)
    }
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          },
        },
      )

      // Cards stagger animation
      gsap.fromTo(
        ".project-card",
        {
          opacity: 0,
          y: 100,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        },
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 ref={titleRef} className="text-4xl md:text-5xl font-light text-center mb-16">
          Featured <span className="text-blue-400">Projects</span>
        </h2>

        <div ref={containerRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card group relative p-6 rounded-2xl bg-slate-900/50 backdrop-blur-sm border border-slate-800 hover:border-blue-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10"
            >
              {/* Project Image */}
              <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                ></div>
              </div>

              {/* Project Info */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">{project.description}</p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className="px-3 py-1 text-xs bg-slate-800 text-slate-300 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-slate-700 hover:border-blue-500 hover:bg-blue-500/10 bg-transparent"
                    onClick={() => project.liveUrl && window.open(project.liveUrl, "_blank")}
                    disabled={!project.liveUrl}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-slate-700 hover:border-blue-500 hover:bg-blue-500/10 bg-transparent"
                    onClick={() => project.githubUrl && window.open(project.githubUrl, "_blank")}
                    disabled={!project.githubUrl}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </Button>
                </div>
              </div>

              {/* Glow effect */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 -z-10`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
