"use client"

import { useAuth } from "@/contexts/auth-context"
import { getModules, updateModule, type Module } from "@/lib/auth"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save, Eye } from "lucide-react"
import Link from "next/link"

export default function EditModulePage() {
  const { user } = useAuth()
  const params = useParams()
  const router = useRouter()
  const [module, setModule] = useState<Module | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    category: "",
  })

  useEffect(() => {
    if (params.id) {
      const modules = getModules()
      const foundModule = modules.find((m) => m.id === params.id)
      if (foundModule) {
        setModule(foundModule)
        setFormData({
          title: foundModule.title,
          description: foundModule.description,
          content: foundModule.content,
          category: foundModule.category,
        })
      }
    }
  }, [params.id])

  if (!user?.isAdmin) {
    router.push("/dashboard")
    return null
  }

  if (!module) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Módulo não encontrado</h1>
          <Link href="/admin">
            <Button className="bg-[var(--color-stl-neon-red)] hover:bg-[var(--color-stl-neon-red)]/80">
              Voltar ao Admin
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = async () => {
    setIsLoading(true)

    try {
      const updatedModule = {
        ...module,
        title: formData.title,
        description: formData.description,
        content: formData.content,
        category: formData.category,
      }

      updateModule(module.id, updatedModule)

      // Simular delay de salvamento
      await new Promise((resolve) => setTimeout(resolve, 1000))

      router.push("/admin")
    } catch (error) {
      console.error("Erro ao salvar módulo:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="ghost" size="icon" className="text-[var(--color-stl-cyan)]">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-white">Editar Módulo</h1>
              <p className="text-sm text-gray-400">{module.title}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Formulário de Edição */}
          <Card className="bg-gray-900/50 border-[var(--color-stl-neon-red)] neon-border">
            <CardHeader>
              <CardTitle className="text-[var(--color-stl-neon-red)] neon-glow">Informações do Módulo</CardTitle>
              <CardDescription className="text-gray-400">Edite as informações e conteúdo do módulo</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                {/* Título */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-white">
                    Título do Módulo
                  </Label>
                  <Input
                    id="title"
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-[var(--color-stl-cyan)]"
                    placeholder="Nome do módulo"
                  />
                </div>

                {/* Categoria */}
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-white">
                    Categoria
                  </Label>
                  <Input
                    id="category"
                    type="text"
                    value={formData.category}
                    onChange={(e) => handleInputChange("category", e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-[var(--color-stl-cyan)]"
                    placeholder="Categoria do módulo"
                  />
                </div>

                {/* Descrição */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-white">
                    Descrição
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-[var(--color-stl-cyan)] resize-none"
                    rows={3}
                    placeholder="Descrição breve do módulo"
                  />
                </div>

                {/* Conteúdo */}
                <div className="space-y-2">
                  <Label htmlFor="content" className="text-white">
                    Conteúdo do Módulo
                  </Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => handleInputChange("content", e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-[var(--color-stl-cyan)] resize-none"
                    rows={15}
                    placeholder="Conteúdo completo do módulo..."
                  />
                </div>

                {/* Botões */}
                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    onClick={handleSave}
                    disabled={isLoading}
                    className="flex-1 bg-[var(--color-stl-neon-red)] hover:bg-[var(--color-stl-neon-red)]/80 text-white font-semibold"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isLoading ? "Salvando..." : "Salvar Alterações"}
                  </Button>
                  <Link href={`/module/${module.id}`} className="flex-1">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-[var(--color-stl-cyan)] text-[var(--color-stl-cyan)] bg-transparent"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Visualizar
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Preview do Conteúdo */}
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Preview do Conteúdo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-invert max-w-none">
                <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {formData.content || "O conteúdo aparecerá aqui conforme você digita..."}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
