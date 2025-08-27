"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Save, Plus, Trash2, Upload, Eye, LogOut } from "lucide-react"
import { getPortfolioData, savePortfolioData, type PortfolioData } from "@/lib/portfolio-data"
import { logout } from "@/lib/auth"
import { useRouter } from "next/navigation"
import AdminGuard from "@/components/admin-guard"

function AdminDashboardContent() {
  const [activeTab, setActiveTab] = useState("hero")
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null)
  const router = useRouter()

  useEffect(() => {
    const data = getPortfolioData()
    setPortfolioData(data)
  }, [])

  if (!portfolioData) {
    return <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">Loading...</div>
  }

  const handleSave = () => {
    savePortfolioData(portfolioData)
    alert("Changes saved successfully! Refresh the main site to see updates.")
  }

  const handleLogout = () => {
    logout()
    router.push("/admin/login")
  }

  const updateHero = (field: string, value: string) => {
    setPortfolioData({
      ...portfolioData,
      hero: { ...portfolioData.hero, [field]: value },
    })
  }

  const updateAbout = (field: string, value: any) => {
    setPortfolioData({
      ...portfolioData,
      about: { ...portfolioData.about, [field]: value },
    })
  }

  const updateContact = (field: string, value: string) => {
    setPortfolioData({
      ...portfolioData,
      contact: { ...portfolioData.contact, [field]: value },
    })
  }

  const addProject = () => {
    const newProject = {
      id: Date.now(),
      title: "New Project",
      description: "Project description",
      image: "/placeholder.svg",
      tech: ["React"],
      liveUrl: "",
      githubUrl: "",
      color: "from-blue-500 to-cyan-500",
    }
    setPortfolioData({
      ...portfolioData,
      projects: [...portfolioData.projects, newProject],
    })
  }

  const removeProject = (id: number) => {
    setPortfolioData({
      ...portfolioData,
      projects: portfolioData.projects.filter((p) => p.id !== id),
    })
  }

  const updateProject = (id: number, field: string, value: any) => {
    setPortfolioData({
      ...portfolioData,
      projects: portfolioData.projects.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    })
  }

  const addSkill = () => {
    const newSkill = { name: "New Skill", color: "text-blue-400" }
    setPortfolioData({
      ...portfolioData,
      about: {
        ...portfolioData.about,
        skills: [...portfolioData.about.skills, newSkill],
      },
    })
  }

  const removeSkill = (index: number) => {
    const newSkills = portfolioData.about.skills.filter((_, i) => i !== index)
    setPortfolioData({
      ...portfolioData,
      about: { ...portfolioData.about, skills: newSkills },
    })
  }

  const updateSkill = (index: number, field: string, value: string) => {
    const newSkills = portfolioData.about.skills.map((skill, i) => (i === index ? { ...skill, [field]: value } : skill))
    setPortfolioData({
      ...portfolioData,
      about: { ...portfolioData.about, skills: newSkills },
    })
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-blue-400">Portfolio Admin</h1>
            <p className="text-slate-400">Edit every detail of your portfolio</p>
          </div>
          <div className="flex gap-4">
            <Button
              onClick={() => window.open("/", "_blank")}
              variant="outline"
              className="border-slate-700 hover:border-blue-500"
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview Site
            </Button>
            <Button
              onClick={handleSave}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-500/10 bg-transparent"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-slate-900">
            <TabsTrigger value="hero">Hero Section</TabsTrigger>
            <TabsTrigger value="about">About Section</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          {/* Hero Section */}
          <TabsContent value="hero">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-blue-400">Hero Section Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <Input
                      value={portfolioData.hero.name}
                      onChange={(e) => updateHero("name", e.target.value)}
                      className="bg-slate-800 border-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <Input
                      value={portfolioData.hero.title}
                      onChange={(e) => updateHero("title", e.target.value)}
                      className="bg-slate-800 border-slate-700"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Subtitle</label>
                  <Textarea
                    value={portfolioData.hero.subtitle}
                    onChange={(e) => updateHero("subtitle", e.target.value)}
                    className="bg-slate-800 border-slate-700"
                    rows={3}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Primary Button Text</label>
                    <Input
                      value={portfolioData.hero.primaryButtonText}
                      onChange={(e) => updateHero("primaryButtonText", e.target.value)}
                      className="bg-slate-800 border-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Secondary Button Text</label>
                    <Input
                      value={portfolioData.hero.secondaryButtonText}
                      onChange={(e) => updateHero("secondaryButtonText", e.target.value)}
                      className="bg-slate-800 border-slate-700"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* About Section */}
          <TabsContent value="about">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-blue-400">About Section Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Profile Image URL</label>
                  <div className="flex gap-2">
                    <Input
                      value={portfolioData.about.profileImage}
                      onChange={(e) => updateAbout("profileImage", e.target.value)}
                      className="bg-slate-800 border-slate-700"
                    />
                    <Button variant="outline" className="border-slate-700 bg-transparent">
                      <Upload className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description Paragraph 1</label>
                  <Textarea
                    value={portfolioData.about.description1}
                    onChange={(e) => updateAbout("description1", e.target.value)}
                    className="bg-slate-800 border-slate-700"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description Paragraph 2</label>
                  <Textarea
                    value={portfolioData.about.description2}
                    onChange={(e) => updateAbout("description2", e.target.value)}
                    className="bg-slate-800 border-slate-700"
                    rows={3}
                  />
                </div>

                {/* Skills Management */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="block text-sm font-medium">Skills</label>
                    <Button onClick={addSkill} size="sm" variant="outline" className="border-slate-700 bg-transparent">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Skill
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {portfolioData.about.skills.map((skill, index) => (
                      <div key={index} className="flex gap-3 items-center p-3 bg-slate-800 rounded-lg">
                        <Input
                          value={skill.name}
                          onChange={(e) => updateSkill(index, "name", e.target.value)}
                          className="bg-slate-700 border-slate-600"
                          placeholder="Skill name"
                        />
                        <select
                          value={skill.color}
                          onChange={(e) => updateSkill(index, "color", e.target.value)}
                          className="bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white"
                        >
                          <option value="text-orange-400">Orange</option>
                          <option value="text-yellow-400">Yellow</option>
                          <option value="text-blue-400">Blue</option>
                          <option value="text-green-400">Green</option>
                          <option value="text-purple-400">Purple</option>
                          <option value="text-slate-400">Gray</option>
                          <option value="text-red-400">Red</option>
                          <option value="text-pink-400">Pink</option>
                        </select>
                        <Button
                          onClick={() => removeSkill(index)}
                          size="sm"
                          variant="outline"
                          className="border-red-500 text-red-500 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects Section */}
          <TabsContent value="projects">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-blue-400">Projects Management</h3>
                <Button onClick={addProject} className="bg-gradient-to-r from-blue-500 to-cyan-500">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Project
                </Button>
              </div>

              {portfolioData.projects.map((project) => (
                <Card key={project.id} className="bg-slate-900/50 border-slate-800">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <Button
                        onClick={() => removeProject(project.id)}
                        size="sm"
                        variant="outline"
                        className="border-red-500 text-red-500 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Project Title</label>
                        <Input
                          value={project.title}
                          onChange={(e) => updateProject(project.id, "title", e.target.value)}
                          className="bg-slate-800 border-slate-700"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Image URL</label>
                        <Input
                          value={project.image}
                          onChange={(e) => updateProject(project.id, "image", e.target.value)}
                          className="bg-slate-800 border-slate-700"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <Textarea
                        value={project.description}
                        onChange={(e) => updateProject(project.id, "description", e.target.value)}
                        className="bg-slate-800 border-slate-700"
                        rows={2}
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Live URL</label>
                        <Input
                          value={project.liveUrl}
                          onChange={(e) => updateProject(project.id, "liveUrl", e.target.value)}
                          className="bg-slate-800 border-slate-700"
                          placeholder="https://..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">GitHub URL</label>
                        <Input
                          value={project.githubUrl}
                          onChange={(e) => updateProject(project.id, "githubUrl", e.target.value)}
                          className="bg-slate-800 border-slate-700"
                          placeholder="https://github.com/..."
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Technologies (comma-separated)</label>
                      <Input
                        value={project.tech.join(", ")}
                        onChange={(e) =>
                          updateProject(
                            project.id,
                            "tech",
                            e.target.value.split(", ").filter((t) => t.trim()),
                          )
                        }
                        className="bg-slate-800 border-slate-700"
                        placeholder="React, Next.js, Tailwind"
                      />
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.tech.map((tech, index) => (
                          <Badge key={index} variant="secondary" className="bg-slate-700">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Contact Section */}
          <TabsContent value="contact">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-blue-400">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <Input
                    value={portfolioData.contact.email}
                    onChange={(e) => updateContact("email", e.target.value)}
                    className="bg-slate-800 border-slate-700"
                    type="email"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">GitHub URL</label>
                    <Input
                      value={portfolioData.contact.githubUrl}
                      onChange={(e) => updateContact("githubUrl", e.target.value)}
                      className="bg-slate-800 border-slate-700"
                      placeholder="https://github.com/username"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">LinkedIn URL</label>
                    <Input
                      value={portfolioData.contact.linkedinUrl}
                      onChange={(e) => updateContact("linkedinUrl", e.target.value)}
                      className="bg-slate-800 border-slate-700"
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  return (
    <AdminGuard>
      <AdminDashboardContent />
    </AdminGuard>
  )
}
