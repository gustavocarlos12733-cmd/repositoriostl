import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import LogoutButton from "@/components/logout-button"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const isAdmin = user.email === "admin@stlclub.com" || user.email?.includes("admin")

  const { data: modules, error } = await supabase
    .from("stl_modules")
    .select("*")
    .order("created_at", { ascending: false })

  console.log("[v0] Usuário logado:", user.email, "Admin:", isAdmin)
  console.log("[v0] Módulos encontrados:", modules?.length || 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">STL Club Dashboard</h1>
              <p className="text-sm text-gray-600">
                Bem-vindo, {user.email}
                {isAdmin && (
                  <Badge className="ml-2" variant="secondary">
                    Admin
                  </Badge>
                )}
              </p>
            </div>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Status da Conexão */}
          <Card>
            <CardHeader>
              <CardTitle>Status da Conexão</CardTitle>
              <CardDescription>Verificação do Supabase</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">Conectado ao Supabase</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">Projeto: ysslfjqratjaluyzposy</p>
            </CardContent>
          </Card>

          {/* Informações do Usuário */}
          <Card>
            <CardHeader>
              <CardTitle>Suas Informações</CardTitle>
              <CardDescription>Dados da conta</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm">
                  <strong>Email:</strong> {user.email}
                </p>
                <p className="text-sm">
                  <strong>ID:</strong> {user.id}
                </p>
                <p className="text-sm">
                  <strong>Tipo:</strong> {isAdmin ? "Administrador" : "Usuário"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Módulos STL */}
          <Card>
            <CardHeader>
              <CardTitle>Módulos STL</CardTitle>
              <CardDescription>Arquivos disponíveis</CardDescription>
            </CardHeader>
            <CardContent>
              {error ? (
                <p className="text-sm text-red-600">Erro ao carregar módulos: {error.message}</p>
              ) : modules && modules.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-sm font-medium">{modules.length} módulos encontrados</p>
                  <div className="max-h-32 overflow-y-auto space-y-1">
                    {modules.slice(0, 5).map((module: any) => (
                      <div key={module.id} className="text-xs p-2 bg-gray-100 rounded">
                        {module.name}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500">Nenhum módulo encontrado</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Seção Admin */}
        {isAdmin && (
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Painel Administrativo</CardTitle>
                <CardDescription>Funcionalidades exclusivas para administradores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <Button variant="outline">Gerenciar Usuários</Button>
                  <Button variant="outline">Upload de Módulos</Button>
                  <Button variant="outline">Relatórios</Button>
                  <Button variant="outline">Configurações</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
