"use client"

import { useAuth } from "@/contexts/auth-context"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Settings, Palette, Users, FileText, Layout, Plus, Edit, Trash2, Save, Eye } from "lucide-react"

export default function SuperAdminPage() {
  const { user } = useAuth()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Verificar se é admin
    const adminData = localStorage.getItem("stl-admin")
    setIsAdmin(!!adminData)
  }, [])

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Card className="bg-gray-900/50 border-red-500/60">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-red-400 mb-4">Acesso Negado</h2>
            <p className="text-gray-400">Você não tem permissão para acessar esta área.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-yellow-400 mb-2">SUPER ADMIN - O CLUBE DO STL</h1>
          <p className="text-gray-400">Controle total da plataforma</p>
        </div>

        <Tabs defaultValue="layout" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-gray-900/50 border border-yellow-400/40">
            <TabsTrigger value="layout" className="text-white data-[state=active]:text-yellow-400">
              <Layout className="h-4 w-4 mr-2" />
              Layout
            </TabsTrigger>
            <TabsTrigger value="colors" className="text-white data-[state=active]:text-yellow-400">
              <Palette className="h-4 w-4 mr-2" />
              Cores
            </TabsTrigger>
            <TabsTrigger value="content" className="text-white data-[state=active]:text-yellow-400">
              <FileText className="h-4 w-4 mr-2" />
              Conteúdo
            </TabsTrigger>
            <TabsTrigger value="modules" className="text-white data-[state=active]:text-yellow-400">
              <Plus className="h-4 w-4 mr-2" />
              Módulos
            </TabsTrigger>
            <TabsTrigger value="users" className="text-white data-[state=active]:text-yellow-400">
              <Users className="h-4 w-4 mr-2" />
              Usuários
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-white data-[state=active]:text-yellow-400">
              <Settings className="h-4 w-4 mr-2" />
              Config
            </TabsTrigger>
          </TabsList>

          {/* Layout Tab */}
          <TabsContent value="layout">
            <Card className="bg-gray-900/50 border border-yellow-400/40">
              <CardHeader>
                <CardTitle className="text-white">Configurações de Layout</CardTitle>
                <CardDescription className="text-gray-400">
                  Altere a estrutura e organização da plataforma
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-white">Nome da Plataforma</Label>
                    <Input defaultValue="O CLUBE DO STL" className="bg-gray-800 border-yellow-400/40 text-white" />
                  </div>
                  <div>
                    <Label className="text-white">Subtítulo</Label>
                    <Input defaultValue="Área de Membros" className="bg-gray-800 border-yellow-400/40 text-white" />
                  </div>
                </div>

                <div>
                  <Label className="text-white">Posição da Navegação</Label>
                  <div className="flex gap-4 mt-2">
                    <Button variant="outline" className="border-yellow-400/40 text-yellow-400 bg-transparent">
                      Lateral Esquerda (Atual)
                    </Button>
                    <Button variant="ghost" className="text-gray-400">
                      Topo
                    </Button>
                    <Button variant="ghost" className="text-gray-400">
                      Lateral Direita
                    </Button>
                  </div>
                </div>

                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Layout
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Colors Tab */}
          <TabsContent value="colors">
            <Card className="bg-gray-900/50 border border-yellow-400/40">
              <CardHeader>
                <CardTitle className="text-white">Configurações de Cores</CardTitle>
                <CardDescription className="text-gray-400">
                  Personalize o esquema de cores da plataforma
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label className="text-white">Cor Principal (Amarelo)</Label>
                    <div className="flex gap-2 mt-2">
                      <Input
                        type="color"
                        defaultValue="#ffd700"
                        className="w-16 h-10 bg-gray-800 border-yellow-400/40"
                      />
                      <Input defaultValue="#ffd700" className="bg-gray-800 border-yellow-400/40 text-white" />
                    </div>
                  </div>

                  <div>
                    <Label className="text-white">Vermelho Sangue</Label>
                    <div className="flex gap-2 mt-2">
                      <Input
                        type="color"
                        defaultValue="#8B0000"
                        className="w-16 h-10 bg-gray-800 border-yellow-400/40"
                      />
                      <Input defaultValue="#8B0000" className="bg-gray-800 border-yellow-400/40 text-white" />
                    </div>
                  </div>

                  <div>
                    <Label className="text-white">Azul Ciano</Label>
                    <div className="flex gap-2 mt-2">
                      <Input
                        type="color"
                        defaultValue="#00FFFF"
                        className="w-16 h-10 bg-gray-800 border-yellow-400/40"
                      />
                      <Input defaultValue="#00FFFF" className="bg-gray-800 border-yellow-400/40 text-white" />
                    </div>
                  </div>
                </div>

                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <Save className="h-4 w-4 mr-2" />
                  Aplicar Cores
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content">
            <Card className="bg-gray-900/50 border border-yellow-400/40">
              <CardHeader>
                <CardTitle className="text-white">Gerenciar Conteúdo</CardTitle>
                <CardDescription className="text-gray-400">
                  Edite textos, descrições e conteúdo da plataforma
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-white">Mensagem de Boas-vindas</Label>
                  <Textarea
                    defaultValue="Bem-vindo ao Clube STL! Acesse todo o conteúdo exclusivo."
                    className="bg-gray-800 border-yellow-400/40 text-white mt-2"
                    rows={3}
                  />
                </div>

                <div>
                  <Label className="text-white">Descrição do Grupo WhatsApp</Label>
                  <Textarea
                    defaultValue="Junte-se à nossa comunidade premium e tenha acesso a conteúdo exclusivo, suporte direto e interação com outros membros do Clube STL."
                    className="bg-gray-800 border-yellow-400/40 text-white mt-2"
                    rows={4}
                  />
                </div>

                <div>
                  <Label className="text-white">Preço do Grupo WhatsApp</Label>
                  <Input
                    defaultValue="9.90"
                    type="number"
                    step="0.01"
                    className="bg-gray-800 border-yellow-400/40 text-white mt-2"
                  />
                </div>

                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Conteúdo
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Modules Tab */}
          <TabsContent value="modules">
            <Card className="bg-gray-900/50 border border-yellow-400/40">
              <CardHeader>
                <CardTitle className="text-white">Gerenciar Módulos STL</CardTitle>
                <CardDescription className="text-gray-400">
                  Adicione, edite ou remova categorias e módulos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-white">Categorias Existentes</h3>
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Nova Categoria
                  </Button>
                </div>

                <div className="space-y-3">
                  {[
                    "STL ZODÍACO",
                    "STL DESENHOS GERAIS",
                    "STL MINI MUNDO",
                    "STL RPG",
                    "STL PERSONALIDADES E CELEBRIDADES",
                    "STL CENÁRIOS",
                    "STL RELIGIÃO URBANA",
                  ].map((category, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-yellow-400/20"
                    >
                      <div>
                        <h4 className="text-white font-medium">{category}</h4>
                        <p className="text-gray-400 text-sm">12 arquivos • Ativo</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" className="text-cyan-400 hover:text-cyan-300">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-yellow-400 hover:text-yellow-300">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card className="bg-gray-900/50 border border-yellow-400/40">
              <CardHeader>
                <CardTitle className="text-white">Gerenciar Usuários</CardTitle>
                <CardDescription className="text-gray-400">
                  Visualize e gerencie todos os usuários da plataforma
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-yellow-400/20">
                    <div>
                      <h4 className="text-white font-medium">João Silva</h4>
                      <p className="text-gray-400 text-sm">joao@email.com • Membro desde 15/01/2024</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className="bg-green-600 text-white">Ativo</Badge>
                      <Button size="sm" variant="ghost" className="text-cyan-400 hover:text-cyan-300">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-yellow-400/20">
                    <div>
                      <h4 className="text-white font-medium">Maria Santos</h4>
                      <p className="text-gray-400 text-sm">maria@email.com • Membro desde 20/01/2024</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className="bg-yellow-600 text-white">WhatsApp VIP</Badge>
                      <Button size="sm" variant="ghost" className="text-cyan-400 hover:text-cyan-300">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card className="bg-gray-900/50 border border-yellow-400/40">
              <CardHeader>
                <CardTitle className="text-white">Configurações Gerais</CardTitle>
                <CardDescription className="text-gray-400">Configurações avançadas da plataforma</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-white">Modo de Manutenção</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <Button variant="outline" className="border-green-500 text-green-400 bg-transparent">
                        Ativo
                      </Button>
                      <Button variant="ghost" className="text-gray-400">
                        Manutenção
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label className="text-white">Registros Novos</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <Button variant="outline" className="border-green-500 text-green-400 bg-transparent">
                        Permitir
                      </Button>
                      <Button variant="ghost" className="text-gray-400">
                        Bloquear
                      </Button>
                    </div>
                  </div>
                </div>

                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Configurações
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
