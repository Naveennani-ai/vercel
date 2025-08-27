export interface PortfolioData {
  hero: {
    name: string
    title: string
    subtitle: string
    primaryButtonText: string
    secondaryButtonText: string
  }
  about: {
    profileImage: string
    description1: string
    description2: string
    skills: Array<{
      name: string
      color: string
    }>
  }
  projects: Array<{
    id: number
    title: string
    description: string
    image: string
    tech: string[]
    liveUrl: string
    githubUrl: string
    color: string
  }>
  contact: {
    email: string
    githubUrl: string
    linkedinUrl: string
    additionalEmail: string
  }
}

const defaultData: PortfolioData = {
  hero: {
    name: "Somesh",
    title: "Web Developer",
    subtitle: "Crafting immersive digital experiences with cutting-edge technologies and creative innovation.",
    primaryButtonText: "Hire Me",
    secondaryButtonText: "Projects",
  },
  about: {
    profileImage: "/images/profile.jpg",
    description1:
      "I'm a passionate web developer with expertise in creating immersive digital experiences. I specialize in modern web technologies and love bringing creative ideas to life through code.",
    description2:
      "With a keen eye for design and a deep understanding of user experience, I craft websites that not only look stunning but also perform exceptionally well.",
    skills: [
      { name: "HTML/CSS", color: "text-orange-400" },
      { name: "JavaScript", color: "text-yellow-400" },
      { name: "React", color: "text-blue-400" },
      { name: "Node.js", color: "text-green-400" },
      { name: "GSAP", color: "text-purple-400" },
      { name: "Next.js", color: "text-slate-400" },
    ],
  },
  projects: [
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
    {
      id: 2,
      title: "Calculator App",
      description: "Clean and functional calculator with modern UI design",
      image: "/images/project-2.png",
      tech: ["JavaScript", "CSS", "HTML"],
      liveUrl: "",
      githubUrl: "",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 3,
      title: "Real Estate Platform",
      description: "Property listing platform with advanced search features",
      image: "/images/project-3.png",
      tech: ["React", "Node.js", "MongoDB"],
      liveUrl: "",
      githubUrl: "",
      color: "from-green-500 to-teal-500",
    },
    {
      id: 4,
      title: "Lead Generation Site",
      description: "High-converting landing page with 3D illustrations",
      image: "/images/project-4.png",
      tech: ["Next.js", "GSAP", "Tailwind"],
      liveUrl: "",
      githubUrl: "",
      color: "from-orange-500 to-red-500",
    },
    {
      id: 5,
      title: "Programmer Memes",
      description: "Fun application for developer memes and jokes",
      image: "/images/project-5.png",
      tech: ["React", "API", "CSS"],
      liveUrl: "",
      githubUrl: "",
      color: "from-indigo-500 to-purple-500",
    },
    {
      id: 6,
      title: "Organic Food Store",
      description: "E-commerce platform for organic fruits and vegetables",
      image: "/images/project-6.png",
      tech: ["Next.js", "Stripe", "Tailwind"],
      liveUrl: "",
      githubUrl: "",
      color: "from-lime-500 to-green-500",
    },
  ],
  contact: {
    email: "hello@somesh.dev",
    githubUrl: "#",
    linkedinUrl: "#",
    additionalEmail: "#",
  },
}

export function getPortfolioData(): PortfolioData {
  if (typeof window === "undefined") return defaultData

  const stored = localStorage.getItem("portfolioData")
  if (stored) {
    try {
      const parsed = JSON.parse(stored)
      return { ...defaultData, ...parsed }
    } catch {
      return defaultData
    }
  }
  return defaultData
}

export function savePortfolioData(data: Partial<PortfolioData>) {
  if (typeof window === "undefined") return

  const current = getPortfolioData()
  const updated = { ...current, ...data }
  localStorage.setItem("portfolioData", JSON.stringify(updated))

  window.dispatchEvent(new CustomEvent("portfolioDataChanged", { detail: updated }))
}
