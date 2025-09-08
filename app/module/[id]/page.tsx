"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { getModules } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CheckCircle, MessageCircle, Download, Eye, FileText } from "lucide-react"
import Link from "next/link"

export default function ModulePage() {
  const params = useParams()
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [module, setModule] = useState<any>(null)
  const [userProgress, setUserProgress] = useState<any>(null)
  const [comments, setComments] = useState<any[]>([])
  const [comment, setComment] = useState("")
  const [isSubmittingComment, setIsSubmittingComment] = useState(false)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    loadModuleData()
  }, [params.id])

  const loadModuleData = async () => {
    try {
      // Primeiro, garantir sessão aplicada (evita redirecionamentos indevidos)
      await supabase.auth.getSession()
      const { data: userData } = await supabase.auth.getUser()
      const authUser = userData.user
      // Não redirecionar imediatamente; deixar o middleware proteger.
      if (!authUser) {
        setUser(null)
        setLoading(false)
        return
      }

      // Carregar perfil do usuário
      const { data: profile } = await supabase.from("profiles").select("*").eq("id", authUser.id).single()

      // Carregar módulo (fallback para dados locais quando tabela não existir)
      let moduleData: any = null
      try {
        const { data } = await supabase.from("modules").select("*").eq("id", params.id).single()
        moduleData = data
      } catch {}
      if (!moduleData) {
        const local = getModules().find((m) => m.id === params.id)
        moduleData = local ? { ...local, files: [] } : null
      }

      // Carregar progresso do usuário para este módulo
      const { data: progressData } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", authUser.id)
        .eq("module_id", params.id)
        .single()

      // Carregar comentários do módulo
      const { data: commentsData } = await supabase
        .from("comments")
        .select(`
          *,
          profiles:user_id (name)
        `)
        .eq("module_id", params.id)
        .order("created_at", { ascending: false })

      setUser(profile)
      setModule(moduleData)
      setUserProgress(progressData)
      setComments(commentsData || [])
    } catch (error) {
      console.error("Erro ao carregar dados do módulo:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleMarkAsViewed = async () => {
    if (!module || !user) return

    try {
      if (userProgress) {
        // Atualizar progresso existente
        await supabase
          .from("user_progress")
          .update({
            completed: true,
            completed_at: new Date().toISOString(),
          })
          .eq("id", userProgress.id)
      } else {
        // Criar novo progresso
        await supabase.from("user_progress").insert({
          user_id: user.id,
          module_id: module.id,
          completed: true,
          completed_at: new Date().toISOString(),
        })
      }

      // Recarregar dados
      loadModuleData()
    } catch (error) {
      console.error("Erro ao marcar como visto:", error)
    }
  }

  const handleAddComment = async () => {
    if (!comment.trim() || !module || !user) return

    setIsSubmittingComment(true)

    try {
      await supabase.from("comments").insert({
        user_id: user.id,
        module_id: module.id,
        content: comment.trim(),
      })

      setComment("")
      loadModuleData() // Recarregar comentários
    } catch (error) {
      console.error("Erro ao adicionar comentário:", error)
    } finally {
      setIsSubmittingComment(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Carregando módulo...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Sessão não encontrada</h1>
          <Link href="/login">
            <Button className="bg-yellow-400 text-black hover:bg-yellow-300">Fazer login</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (!module) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Módulo não encontrado</h1>
          <Link href="/dashboard">
            <Button className="bg-red-600 hover:bg-red-600/80">Voltar ao Dashboard</Button>
          </Link>
        </div>
      </div>
    )
  }

  const isCompleted = userProgress?.completed || false
  const files = module.files || []

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="text-cyan-400">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-white">{module.title}</h1>
              <p className="text-sm text-gray-400">{module.category}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Conteúdo Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status e Progresso */}
            <Card className="bg-gray-900/50 border border-yellow-400/40">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Status do Módulo</CardTitle>
                  {isCompleted ? (
                    <Badge className="bg-green-600 text-white flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Concluído
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="border-cyan-400 text-cyan-400">
                      Em Progresso
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Progresso</span>
                      <span className="text-sm text-cyan-400">{isCompleted ? 100 : 0}%</span>
                    </div>
                    <Progress value={isCompleted ? 100 : 0} className="h-2" />
                  </div>

                  {!isCompleted && (
                    <Button
                      onClick={handleMarkAsViewed}
                      className="w-full bg-red-600 hover:bg-red-600/80 text-white font-semibold"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Marcar como Visto
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Conteúdo do Módulo */}
            <Card className="bg-gray-900/50 border border-yellow-400/40">
              <CardHeader>
                <CardTitle className="text-red-600">Conteúdo do Módulo</CardTitle>
                <CardDescription className="text-gray-400">{module.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose prose-invert max-w-none">
                  <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {module.content || "Conteúdo em desenvolvimento..."}
                  </div>

                  <div className="mt-8 p-6 bg-gray-800/50 rounded-lg border border-yellow-400/20">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <Download className="h-5 w-5 text-cyan-400" />
                      Arquivos STL Disponíveis
                    </h3>
                    {files.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {files.map((file: any, index: number) => (
                          <Button
                            key={index}
                            variant="outline"
                            className="justify-start border-cyan-400 text-cyan-400 bg-transparent hover:bg-cyan-400/10"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            {file.name || `arquivo_${index + 1}.stl`}
                          </Button>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <FileText className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                        <p className="text-gray-500 text-sm">Nenhum arquivo disponível ainda</p>
                        <p className="text-gray-600 text-xs">Os arquivos serão adicionados em breve</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Comentários */}
          <div className="space-y-6">
            <Card className="bg-gray-900/50 border border-yellow-400/40">
              <CardHeader>
                <CardTitle className="text-cyan-400 flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Comentários ({comments.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Adicionar Comentário */}
                  <div className="space-y-3">
                    <Textarea
                      placeholder="Deixe seu comentário sobre este módulo..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-400 resize-none"
                      rows={3}
                    />
                    <Button
                      onClick={handleAddComment}
                      disabled={!comment.trim() || isSubmittingComment}
                      className="w-full bg-cyan-400 hover:bg-cyan-400/80 text-black font-semibold"
                    >
                      {isSubmittingComment ? "Enviando..." : "Adicionar Comentário"}
                    </Button>
                  </div>

                  {/* Lista de Comentários */}
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {comments.length > 0 ? (
                      comments.map((comment) => (
                        <div key={comment.id} className="p-3 bg-gray-800/50 rounded-lg border border-yellow-400/20">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-white">
                              {comment.profiles?.name || "Usuário"}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(comment.created_at).toLocaleDateString("pt-BR")}
                            </span>
                          </div>
                          <p className="text-sm text-gray-300">{comment.content}</p>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <MessageCircle className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                        <p className="text-gray-500 text-sm">Nenhum comentário ainda</p>
                        <p className="text-gray-600 text-xs">Seja o primeiro a comentar!</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Informações Adicionais */}
            <Card className="bg-gray-900/50 border border-yellow-400/40">
              <CardHeader>
                <CardTitle className="text-white text-sm">Informações</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Categoria:</span>
                    <span className="text-white">{module.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className={isCompleted ? "text-green-400" : "text-cyan-400"}>
                      {isCompleted ? "Concluído" : "Em Progresso"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Progresso:</span>
                    <span className="text-white">{isCompleted ? 100 : 0}%</span>
                  </div>
                  {userProgress?.completed_at && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Concluído em:</span>
                      <span className="text-green-400">
                        {new Date(userProgress.completed_at).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
