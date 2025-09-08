"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Menu,
  X,
  Download,
  MessageCircle,
  Users,
  FileText,
  Star,
  User,
  LogOut,
  Settings,
  Home,
  ChevronRight,
  Trophy,
  Award,
  Crown,
  Zap,
  Target,
} from "lucide-react"
import Link from "next/link"

const getRankInfo = (completedModules: number) => {
  if (completedModules === 0) return { rank: "Iniciante", icon: Target, color: "text-gray-400" }
  if (completedModules <= 2) return { rank: "Bronze", icon: Award, color: "text-amber-600" }
  if (completedModules <= 4) return { rank: "Prata", icon: Star, color: "text-gray-300" }
  if (completedModules <= 6) return { rank: "Diamante", icon: Trophy, color: "text-blue-400" }
  if (completedModules === 7) return { rank: "Mestre", icon: Crown, color: "text-purple-400" }
  return { rank: "Desafiante", icon: Zap, color: "text-yellow-400" }
}

interface SidebarProps {
  modules: any[]
  userProgress: any[]
}

export function Sidebar({ modules, userProgress }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()

  useEffect(() => {
    loadUser()
  }, [])

  const loadUser = async () => {
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser()
    if (authUser) {
      const { data: profile } = await supabase.from("profiles").select("*").eq("id", authUser.id).single()
      setUser(profile)
    }
  }

  const logout = async () => {
    await supabase.auth.signOut()
    window.location.href = "/login"
  }

  if (!user) return null

  const completedModules = userProgress.filter((p) => p.completed).length
  const rankInfo = getRankInfo(completedModules)
  const RankIcon = rankInfo.icon

  return (
    <>
      {/* Menu Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-50 bg-gray-900/90 border border-yellow-400/40 hover:border-yellow-400/60 text-yellow-400"
        size="icon"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsOpen(false)} />}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-80 bg-black/90 backdrop-blur border-r border-yellow-400/40 transform transition-transform duration-300 z-50 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-yellow-400">O CLUBE DO STL</h1>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-2">
            <div className="text-sm">
              <p className="text-white font-medium">{user.name}</p>
              <p className="text-gray-400">{user.email}</p>
            </div>

            {/* Sistema de ranking no sidebar */}
            <div className="flex items-center gap-2 p-2 bg-gray-900/50 rounded-lg border border-yellow-400/20">
              <RankIcon className={`h-4 w-4 ${rankInfo.color}`} />
              <span className={`text-sm font-medium ${rankInfo.color}`}>{rankInfo.rank}</span>
              <span className="text-xs text-gray-400 ml-auto">
                {completedModules}/{modules.length}
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Dashboard */}
          <div>
            <Link href="/dashboard" onClick={() => setIsOpen(false)}>
              <Button
                variant="ghost"
                className="w-full justify-start text-white hover:text-yellow-400 hover:bg-gray-800/50"
              >
                <Home className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            </Link>
          </div>

          {/* Navegação principal */}
          <div className="grid gap-2">
            <Link href="/files" onClick={() => setIsOpen(false)}>
              <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800/50">
                <FileText className="h-4 w-4 mr-2" />
                Arquivos STL
              </Button>
            </Link>
            <Link href="/progress" onClick={() => setIsOpen(false)}>
              <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800/50">
                <Zap className="h-4 w-4 mr-2" />
                Meu Progresso
              </Button>
            </Link>
            <Link href="/support" onClick={() => setIsOpen(false)}>
              <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800/50">
                <MessageCircle className="h-4 w-4 mr-2" />
                Suporte
              </Button>
            </Link>
            <Link href="/settings" onClick={() => setIsOpen(false)}>
              <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800/50">
                <Settings className="h-4 w-4 mr-2" />
                Configurações
              </Button>
            </Link>
          </div>

          {/* ARQUIVOS STL com dados reais */}
          <div>
            <h3 className="text-red-600 font-semibold mb-3 flex items-center gap-2">
              <Download className="h-4 w-4" />
              ARQUIVOS STL
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {modules
                .filter((m) => m.category === "ARQUIVOS STL")
                .map((module) => {
                  const progress = userProgress.find((p) => p.module_id === module.id)
                  const isCompleted = progress?.completed || false

                  return (
                    <Link key={module.id} href={`/module/${module.id}`} onClick={() => setIsOpen(false)}>
                      <div className="p-3 bg-gray-900/50 rounded-lg border border-yellow-400/20 hover:border-yellow-400/40 transition-all cursor-pointer group">
                        <div className="flex items-center justify-between mb-2">
                          <FileText className="h-4 w-4 text-cyan-400" />
                          {isCompleted && <Badge className="bg-green-600 text-white text-xs">OK</Badge>}
                        </div>
                        <h4 className="text-white text-xs font-medium mb-1 group-hover:text-cyan-400 transition-colors line-clamp-2">
                          {module.title}
                        </h4>
                        <Progress value={isCompleted ? 100 : 0} className="h-1" />
                      </div>
                    </Link>
                  )
                })}
            </div>
          </div>

          {/* CANAL SUPORTE */}
          <div>
            <h3 className="text-cyan-400 font-semibold mb-3 flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              CANAL SUPORTE STL
            </h3>
            <div className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start text-sm text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50"
              >
                Suporte Técnico
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-sm text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50"
              >
                FAQ
              </Button>
            </div>
          </div>

          {/* GRUPO WHATSAPP */}
          <div>
            <Link href="/whatsapp-group" onClick={() => setIsOpen(false)}>
              <h3 className="text-yellow-400 font-semibold mb-3 flex items-center gap-2 cursor-pointer hover:text-yellow-300">
                <Users className="h-4 w-4" />
                GRUPO WHATSAPP
                <ChevronRight className="h-4 w-4 ml-auto" />
              </h3>
            </Link>
          </div>

          <div>
            <h3 className="text-purple-400 font-semibold mb-3 flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              CONQUISTAS
            </h3>
            <div className="space-y-2">
              <div
                className={`p-2 rounded-lg border ${completedModules >= 1 ? "bg-amber-900/20 border-amber-600/40" : "bg-gray-900/20 border-gray-600/40"}`}
              >
                <div className="flex items-center gap-2">
                  <Award className={`h-3 w-3 ${completedModules >= 1 ? "text-amber-600" : "text-gray-500"}`} />
                  <span className={`text-xs ${completedModules >= 1 ? "text-amber-600" : "text-gray-500"}`}>
                    Bronze
                  </span>
                </div>
              </div>
              <div
                className={`p-2 rounded-lg border ${completedModules >= 3 ? "bg-gray-700/20 border-gray-300/40" : "bg-gray-900/20 border-gray-600/40"}`}
              >
                <div className="flex items-center gap-2">
                  <Star className={`h-3 w-3 ${completedModules >= 3 ? "text-gray-300" : "text-gray-500"}`} />
                  <span className={`text-xs ${completedModules >= 3 ? "text-gray-300" : "text-gray-500"}`}>Prata</span>
                </div>
              </div>
              <div
                className={`p-2 rounded-lg border ${completedModules >= 5 ? "bg-blue-900/20 border-blue-400/40" : "bg-gray-900/20 border-gray-600/40"}`}
              >
                <div className="flex items-center gap-2">
                  <Trophy className={`h-3 w-3 ${completedModules >= 5 ? "text-blue-400" : "text-gray-500"}`} />
                  <span className={`text-xs ${completedModules >= 5 ? "text-blue-400" : "text-gray-500"}`}>
                    Diamante
                  </span>
                </div>
              </div>
              <div
                className={`p-2 rounded-lg border ${completedModules === 7 ? "bg-purple-900/20 border-purple-400/40" : "bg-gray-900/20 border-gray-600/40"}`}
              >
                <div className="flex items-center gap-2">
                  <Crown className={`h-3 w-3 ${completedModules === 7 ? "text-purple-400" : "text-gray-500"}`} />
                  <span className={`text-xs ${completedModules === 7 ? "text-purple-400" : "text-gray-500"}`}>
                    Mestre
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800 space-y-2">
          <Link href="/profile" onClick={() => setIsOpen(false)}>
            <Button
              variant="ghost"
              className="w-full justify-start text-cyan-400 hover:text-cyan-300 hover:bg-gray-800/50"
            >
              <User className="h-4 w-4 mr-2" />
              Perfil
            </Button>
          </Link>

          {user.user_type === "admin" && (
            <Link href="/admin" onClick={() => setIsOpen(false)}>
              <Button
                variant="ghost"
                className="w-full justify-start text-yellow-400 hover:text-yellow-300 hover:bg-gray-800/50"
              >
                <Settings className="h-4 w-4 mr-2" />
                Admin
              </Button>
            </Link>
          )}

          <Button
            variant="ghost"
            onClick={() => {
              logout()
              setIsOpen(false)
            }}
            className="w-full justify-start text-red-600 hover:text-red-500 hover:bg-gray-800/50"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>
      </div>
    </>
  )
}
