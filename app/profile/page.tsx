"use client"

import type React from "react"

import { useAuth } from "@/contexts/auth-context"
import { saveUser, type User } from "@/lib/auth"
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Camera, Save, UserIcon, Mail, Phone, Calendar } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  const { user, login } = useAuth()
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  })
  const [avatar, setAvatar] = useState(user?.avatar || "")
  const [isLoading, setIsLoading] = useState(false)

  if (!user) {
    router.push("/login")
    return null
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setAvatar(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    setIsLoading(true)

    try {
      const updatedUser: User = {
        ...user,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        avatar: avatar,
      }

      saveUser(updatedUser)
      login(updatedUser)

      // Simular delay de salvamento
      await new Promise((resolve) => setTimeout(resolve, 1000))

      router.push("/dashboard")
    } catch (error) {
      console.error("Erro ao salvar perfil:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="text-[var(--color-stl-cyan)]">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-white">Meu Perfil</h1>
              <p className="text-sm text-gray-400">Gerencie suas informações pessoais</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Card de Avatar e Info Básica */}
          <Card className="bg-gray-900/50 border-[var(--color-stl-yellow)] neon-border">
            <CardHeader className="text-center">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="h-24 w-24 border-2 border-[var(--color-stl-cyan)]">
                    <AvatarImage src={avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback className="bg-gray-800 text-[var(--color-stl-cyan)] text-xl font-bold">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-[var(--color-stl-neon-red)] hover:bg-[var(--color-stl-neon-red)]/80"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </div>
                <div>
                  <CardTitle className="text-[var(--color-stl-yellow)] neon-glow">{user.name}</CardTitle>
                  <CardDescription className="text-gray-400">{user.email}</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Card de Informações da Conta */}
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calendar className="h-5 w-5 text-[var(--color-stl-cyan)]" />
                Informações da Conta
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-gray-800/50 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Membro desde</div>
                  <div className="text-white font-medium">{formatDate(user.joinedAt)}</div>
                </div>
                <div className="p-3 bg-gray-800/50 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Tipo de conta</div>
                  <div className="text-white font-medium">
                    {user.isAdmin ? (
                      <span className="text-[var(--color-stl-neon-red)]">Administrador</span>
                    ) : (
                      <span className="text-[var(--color-stl-cyan)]">Membro</span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card de Edição de Perfil */}
          <Card className="bg-gray-900/50 border-[var(--color-stl-cyan)] neon-border">
            <CardHeader>
              <CardTitle className="text-[var(--color-stl-cyan)] neon-glow">Editar Informações</CardTitle>
              <CardDescription className="text-gray-400">Atualize suas informações pessoais</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                {/* Nome */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white flex items-center gap-2">
                    <UserIcon className="h-4 w-4 text-[var(--color-stl-cyan)]" />
                    Nome Completo
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-[var(--color-stl-cyan)]"
                    placeholder="Seu nome completo"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white flex items-center gap-2">
                    <Mail className="h-4 w-4 text-[var(--color-stl-cyan)]" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-[var(--color-stl-cyan)]"
                    placeholder="seu@email.com"
                  />
                </div>

                {/* Telefone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white flex items-center gap-2">
                    <Phone className="h-4 w-4 text-[var(--color-stl-cyan)]" />
                    Telefone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-[var(--color-stl-cyan)]"
                    placeholder="(11) 99999-9999"
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
                  <Link href="/dashboard" className="flex-1">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                    >
                      Cancelar
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Card de Estatísticas Pessoais */}
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Suas Estatísticas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-[var(--color-stl-neon-red)]">7</div>
                  <div className="text-xs text-gray-400">Módulos Concluídos</div>
                </div>
                <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-[var(--color-stl-cyan)]">15</div>
                  <div className="text-xs text-gray-400">Comentários</div>
                </div>
                <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-[var(--color-stl-yellow)]">42</div>
                  <div className="text-xs text-gray-400">Downloads</div>
                </div>
                <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-green-400">85%</div>
                  <div className="text-xs text-gray-400">Progresso</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
