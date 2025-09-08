"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Download,
  MessageCircle,
  Users,
  FileText,
  Star,
  ChevronRight,
  Trophy,
  Award,
  Crown,
  Zap,
  Target,
} from "lucide-react"
import Link from "next/link"
import { Sidebar } from "@/components/sidebar"
import { useAuth } from "@/contexts/auth-context"
import { getModules } from "@/lib/auth"
import { ThemeToggle } from "@/components/theme-toggle"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const getRankInfo = (completedModules: number) => {
  if (completedModules === 0) return { rank: "Iniciante", icon: Target, color: "text-gray-400", bgColor: "bg-gray-600" }
  if (completedModules <= 2) return { rank: "Bronze", icon: Award, color: "text-amber-600", bgColor: "bg-amber-600" }
  if (completedModules <= 4) return { rank: "Prata", icon: Star, color: "text-gray-300", bgColor: "bg-gray-400" }
  if (completedModules <= 6) return { rank: "Diamante", icon: Trophy, color: "text-blue-400", bgColor: "bg-blue-500" }
  if (completedModules === 7) return { rank: "Mestre", icon: Crown, color: "text-purple-400", bgColor: "bg-purple-500" }
  return { rank: "Desafiante", icon: Zap, color: "text-yellow-400", bgColor: "bg-yellow-500" }
}

export default function DashboardPage() {
  const { user } = useAuth()
  const [modules, setModules] = useState<any[]>([])
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadedModules = getModules()
    setModules(loadedModules)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-yellow-400 text-2xl font-bold mb-2">O CLUBE DO STL</div>
          <div className="text-white">Carregando sua área de membros...</div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-yellow-400 text-2xl font-bold mb-4">O CLUBE DO STL</div>
          <div className="text-white mb-4">Você precisa fazer login para acessar a área de membros</div>
          <Link href="/login">
            <Button className="bg-yellow-400 text-black hover:bg-yellow-500">Fazer Login</Button>
          </Link>
        </div>
      </div>
    )
  }

  const filtered = modules.filter((m) => {
    const matchesQuery = query.trim().length === 0 || m.title.toLowerCase().includes(query.toLowerCase())
    const matchesCat = category === "all" || m.category === category
    return matchesQuery && matchesCat
  })
  const completedModules = filtered.filter((m) => m.isCompleted).length
  const totalProgress = filtered.length > 0 ? (completedModules / filtered.length) * 100 : 0
  const rankInfo = getRankInfo(completedModules)
  const RankIcon = rankInfo.icon

  return (
    <div className="min-h-screen bg-black">
      <Sidebar modules={modules} userProgress={[]} />

      <div className="container mx-auto px-4 py-8 lg:pl-72">
        {/* Header fixo */}
        <div className="sticky top-0 z-40 -mx-4 px-4 py-3 bg-[var(--bg-dark)]/70 backdrop-blur border-b border-[var(--border)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-yellow-400 font-bold">O CLUBE DO STL</span>
            <span className="text-gray-500">/</span>
            <span className="text-gray-300">Dashboard</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/profile">
              <Button variant="outline" className="border-[var(--border)] text-gray-300 bg-transparent hover:bg-gray-800">
                Meu Perfil
              </Button>
            </Link>
          </div>
        </div>
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-yellow-400 mb-2">O CLUBE DO STL</h1>
              <h2 className="text-2xl font-bold text-white mb-2">Bem-vindo, {user.name}!</h2>
              <p className="text-gray-400">Sua jornada no mundo da impressão 3D</p>
            </div>

            <div className="text-center">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${rankInfo.bgColor} mb-2`}>
                <RankIcon className="h-6 w-6 text-white" />
                <span className="text-white font-bold">{rankInfo.rank}</span>
              </div>
              <div className="text-sm text-gray-400">
                {completedModules}/{modules.length} módulos
              </div>
            </div>
          </div>

          {/* Busca e filtros */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            <div className="lg:col-span-2 flex gap-3">
              <Input placeholder="Buscar módulos..." value={query} onChange={(e) => setQuery(e.target.value)} className="bg-gray-900 border-gray-700 text-white" />
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-48 bg-gray-900 border-gray-700 text-white">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 text-white border-gray-700">
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="ARQUIVOS STL">Arquivos STL</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="card-gradient border border-[var(--border)]">
              <CardHeader>
                <CardTitle className="text-white">Progresso Geral</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-cyan-400 mb-2">{Math.round(totalProgress)}%</div>
                  <div className="text-sm text-gray-400">Concluído</div>
                </div>
                <Progress value={totalProgress} className="h-3 mb-4" />
                <div className="flex justify-between text-sm">
                  <span className="text-green-400">{completedModules} concluídos</span>
                  <span className="text-gray-400">{modules.length - completedModules} pendentes</span>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient border border-[var(--border)]">
              <CardHeader>
                <CardTitle className="text-white">Estatísticas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Módulos Concluídos</span>
                    <span className="text-green-400 font-bold">{completedModules}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total Disponível</span>
                    <span className="text-cyan-400 font-bold">{modules.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Próximo Rank</span>
                    <span className={`font-bold ${rankInfo.color}`}>
                      {completedModules === modules.length ? "Máximo!" : `${completedModules + 1} módulos`}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient border border-[var(--border)]">
              <CardHeader>
                <CardTitle className="text-white">Ranking de Conquistas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { rank: "Iniciante", modules: 0, icon: Target, active: completedModules >= 0 },
                    { rank: "Bronze", modules: 2, icon: Award, active: completedModules >= 2 },
                    { rank: "Diamante", modules: 6, icon: Trophy, active: completedModules >= 6 },
                    { rank: "Mestre", modules: 7, icon: Crown, active: completedModules >= 7 },
                  ].map((level) => {
                    const Icon = level.icon
                    return (
                      <div
                        key={level.rank}
                        className={`flex items-center gap-3 p-2 rounded ${
                          level.active ? "bg-yellow-400/20 text-yellow-400" : "text-gray-500"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="text-sm font-medium">{level.rank}</span>
                        <span className="text-xs ml-auto">{level.modules} módulos</span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="card-gradient border border-[var(--border)]">
              <CardHeader>
                <CardTitle className="text-red-600 flex items-center gap-2">
                  <Download className="h-6 w-6" />
                  ARQUIVOS STL
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Acesse todos os modelos 3D exclusivos do clube
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filtered.map((module) => (
                    <Link key={module.id} href={`/module/${module.id}`}>
                      <div className="p-0 overflow-hidden rounded-lg border border-yellow-400/20 hover:border-yellow-400/40 transition-all cursor-pointer group bg-gradient-to-br from-gray-900/80 to-gray-800/60">
                        <div className="relative h-36 w-full">
                          <Image src="/placeholder.jpg" alt={module.title} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <FileText className="h-5 w-5 text-cyan-400" />
                            {module.isCompleted && <Badge className="bg-green-600 text-white">Concluído</Badge>}
                          </div>
                          <h3 className="text-white font-medium text-sm mb-1 group-hover:text-cyan-400 transition-colors">
                            {module.title}
                          </h3>
                          <p className="text-gray-400 text-xs mb-2 line-clamp-2">{module.description}</p>
                          <div className="flex items-center justify-between">
                            <Progress value={module.isCompleted ? 100 : module.progress} className="h-1 flex-1 mr-2" />
                            <ChevronRight className="h-4 w-4 text-gray-500 group-hover:text-cyan-400 transition-colors" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar direita */}
          <div className="space-y-6">
            {/* CANAL SUPORTE STL */}
            <Card className="bg-gray-900/50 border border-yellow-400/40">
              <CardHeader>
                <CardTitle className="text-cyan-400 flex items-center gap-2">
                  <MessageCircle className="h-6 w-6" />
                  CANAL SUPORTE STL
                </CardTitle>
                <CardDescription className="text-gray-400">Tire suas dúvidas e receba suporte</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-800/50 rounded-lg border border-yellow-400/20">
                    <h4 className="text-white font-medium mb-2">Suporte Técnico</h4>
                    <p className="text-gray-400 text-sm mb-3">Problemas com impressão ou arquivos STL</p>
                    <Button className="w-full bg-cyan-500 hover:bg-cyan-500/80 text-black">Abrir Ticket</Button>
                  </div>

                  <div className="p-4 bg-gray-800/50 rounded-lg border border-yellow-400/20">
                    <h4 className="text-white font-medium mb-2">FAQ</h4>
                    <p className="text-gray-400 text-sm mb-3">Perguntas frequentes e tutoriais</p>
                    <Button
                      variant="outline"
                      className="w-full border-cyan-500 text-cyan-400 bg-transparent hover:bg-cyan-500/10"
                    >
                      Ver FAQ
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* GRUPO WHATSAPP */}
            <Link href="/whatsapp-group">
              <Card className="bg-gray-900/50 border border-yellow-400/40 hover:border-yellow-400/60 transition-all cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-yellow-400 flex items-center gap-2">
                    <Users className="h-6 w-6" />
                    GRUPO WHATSAPP O CLUBE STL
                    <ChevronRight className="h-5 w-5 ml-auto" />
                  </CardTitle>
                  <CardDescription className="text-gray-400">Acesso exclusivo ao grupo VIP</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400 mb-1">R$ 9,90</div>
                    <div className="text-sm text-gray-400">Clique para saber mais</div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
