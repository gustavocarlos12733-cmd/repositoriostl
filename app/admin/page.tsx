"use client"

import { useAuth } from "@/contexts/auth-context"
import { getModules, type Module } from "@/lib/auth"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Settings,
  Users,
  FileText,
  BarChart3,
  Edit,
  Eye,
  MessageCircle,
  Download,
  Shield,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"

export default function AdminPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [modules, setModules] = useState<Module[]>([])
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)
  const [stats, setStats] = useState({
    totalUsers: 156,
    totalModules: 7,
    totalComments: 89,
    totalDownloads: 1247,
  })

  useEffect(() => {
    // Enquanto carregamos o usuário do Supabase, evita piscar
    if (isLoading) return
    // Se não autenticado, enviar para login admin
    if (!user) {
      router.replace("/admin-login")
      return
    }
    // Se autenticado, mas não admin, enviar para dashboard
    if (!user.isAdmin) {
      router.replace("/dashboard")
      return
    }

    setIsAdminLoggedIn(true)
    const userModules = getModules()
    setModules(userModules)
  }, [router, user, isLoading])

  if (isLoading || !isAdminLoggedIn) {
    return null
  }

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn")
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="icon" className="text-[var(--color-stl-cyan)]">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold">
                  <span className="text-yellow-400 neon-glow-soft">PAINEL ADMINISTRATIVO</span>
                </h1>
                <p className="text-sm text-gray-400">Gerencie O CLUBE DO STL</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-yellow-400 text-black">
                <Shield className="h-3 w-3 mr-1" />
                Admin
              </Badge>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="border-red-500 text-red-400 hover:bg-red-500/10 bg-transparent"
              >
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-gray-900/50 border border-gray-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-red-500/80">
              <BarChart3 className="h-4 w-4 mr-2" />
              Visão Geral
            </TabsTrigger>
            <TabsTrigger value="modules" className="data-[state=active]:bg-cyan-500/80">
              <FileText className="h-4 w-4 mr-2" />
              Módulos
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
              <Users className="h-4 w-4 mr-2" />
              Usuários
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-gray-600">
              <Settings className="h-4 w-4 mr-2" />
              Configurações
            </TabsTrigger>
          </TabsList>

          {/* Visão Geral */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gray-900/50 border-red-500/60 neon-border-soft">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Total de Usuários</p>
                      <p className="text-3xl font-bold text-red-400">{stats.totalUsers}</p>
                    </div>
                    <Users className="h-8 w-8 text-red-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-cyan-500/60 neon-border-soft">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Módulos Ativos</p>
                      <p className="text-3xl font-bold text-cyan-400">{stats.totalModules}</p>
                    </div>
                    <FileText className="h-8 w-8 text-cyan-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-yellow-400/60 neon-border-soft">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Comentários</p>
                      <p className="text-3xl font-bold text-yellow-400">{stats.totalComments}</p>
                    </div>
                    <MessageCircle className="h-8 w-8 text-yellow-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-green-500/60 neon-border-soft">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Downloads</p>
                      <p className="text-3xl font-bold text-green-400">{stats.totalDownloads}</p>
                    </div>
                    <Download className="h-8 w-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Atividade Recente */}
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Atividade Recente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 bg-gray-800/50 rounded-lg">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-white text-sm">Novo usuário cadastrado: João Silva</p>
                      <p className="text-gray-400 text-xs">2 horas atrás</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-gray-800/50 rounded-lg">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-white text-sm">Módulo STL RPG foi completado por Maria Santos</p>
                      <p className="text-gray-400 text-xs">4 horas atrás</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-gray-800/50 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-white text-sm">Novo comentário no módulo STL Zodíaco</p>
                      <p className="text-gray-400 text-xs">6 horas atrás</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Gerenciamento de Módulos */}
          <TabsContent value="modules" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Gerenciar Módulos</h2>
              <Button className="bg-cyan-500 hover:bg-cyan-500/80 text-black">Adicionar Módulo</Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {modules.map((module) => (
                <Card key={module.id} className="bg-gray-900/50 border-gray-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white text-lg">{module.title}</CardTitle>
                      <Badge variant="outline" className="border-cyan-500 text-cyan-500">
                        {module.category}
                      </Badge>
                    </div>
                    <CardDescription className="text-gray-400">{module.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-sm text-gray-400">Visualizações</p>
                          <p className="text-lg font-bold text-white">{Math.floor(Math.random() * 100) + 50}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Comentários</p>
                          <p className="text-lg font-bold text-cyan-400">{module.comments?.length || 0}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Downloads</p>
                          <p className="text-lg font-bold text-green-400">{Math.floor(Math.random() * 200) + 100}</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Link href={`/admin/edit-module/${module.id}`} className="flex-1">
                          <Button variant="outline" className="w-full border-red-500 text-red-400 bg-transparent">
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </Button>
                        </Link>
                        <Link href={`/module/${module.id}`} className="flex-1">
                          <Button variant="outline" className="w-full border-cyan-500 text-cyan-400 bg-transparent">
                            <Eye className="h-4 w-4 mr-2" />
                            Visualizar
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Gerenciamento de Usuários */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Gerenciar Usuários</h2>
              <Button className="bg-yellow-400 hover:bg-yellow-400/80 text-black">Exportar Lista</Button>
            </div>

            <Card className="bg-gray-900/50 border-gray-700">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-gray-700">
                      <tr className="text-left">
                        <th className="p-4 text-gray-400 font-medium">Nome</th>
                        <th className="p-4 text-gray-400 font-medium">Email</th>
                        <th className="p-4 text-gray-400 font-medium">Cadastro</th>
                        <th className="p-4 text-gray-400 font-medium">Progresso</th>
                        <th className="p-4 text-gray-400 font-medium">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          name: "João Silva",
                          email: "joao@email.com",
                          joinedAt: "2024-01-15",
                          progress: 85,
                        },
                        {
                          name: "Maria Santos",
                          email: "maria@email.com",
                          joinedAt: "2024-01-20",
                          progress: 92,
                        },
                        {
                          name: "Pedro Costa",
                          email: "pedro@email.com",
                          joinedAt: "2024-02-01",
                          progress: 67,
                        },
                        {
                          name: "Ana Oliveira",
                          email: "ana@email.com",
                          joinedAt: "2024-02-10",
                          progress: 78,
                        },
                      ].map((user, index) => (
                        <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/30">
                          <td className="p-4 text-white font-medium">{user.name}</td>
                          <td className="p-4 text-gray-300">{user.email}</td>
                          <td className="p-4 text-gray-300">{new Date(user.joinedAt).toLocaleDateString("pt-BR")}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-cyan-500" style={{ width: `${user.progress}%` }}></div>
                              </div>
                              <span className="text-sm text-gray-400">{user.progress}%</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                            >
                              Ver Detalhes
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Configurações */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Configurações do Sistema</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Configurações Gerais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Registros públicos</span>
                    <Button size="sm" variant="outline" className="border-green-500 text-green-400 bg-transparent">
                      Ativo
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Comentários automáticos</span>
                    <Button size="sm" variant="outline" className="border-green-500 text-green-400 bg-transparent">
                      Ativo
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Notificações por email</span>
                    <Button size="sm" variant="outline" className="border-red-500 text-red-400 bg-transparent">
                      Inativo
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Backup e Segurança</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full bg-cyan-500 hover:bg-cyan-500/80 text-black">Fazer Backup dos Dados</Button>
                  <Button
                    variant="outline"
                    className="w-full border-red-500 text-red-400 hover:bg-red-500/10 bg-transparent"
                  >
                    Limpar Cache do Sistema
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                  >
                    Exportar Logs
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
