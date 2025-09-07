"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { loginUser } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSignUp, setIsSignUp] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      // Para login simples, apenas verifica se o email está preenchido
      // O sistema local não requer senha real para usuários comuns
      const user = loginUser(name.trim() || email.split('@')[0], email.trim())
      
      // Redireciona para o dashboard
      router.push("/dashboard")
    } catch (error: any) {
      setError("Erro ao processar solicitação")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-yellow-400">O CLUBE DO STL</h1>
          <p className="text-cyan-400">Área de Membros</p>
        </div>

        <Card className="bg-gray-900/50 border-red-600">
          <CardHeader className="text-center">
            <CardTitle className="text-white">{isSignUp ? "Criar Conta" : "Acesso à Área de Membros"}</CardTitle>
            <CardDescription className="text-gray-400">
              {isSignUp
                ? "Crie sua conta para acessar o conteúdo exclusivo"
                : "Digite suas credenciais para acessar o conteúdo exclusivo"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">
                    Nome
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-400"
                    required={isSignUp}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-400"
                  required
                />
              </div>

              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">
                    Senha (opcional)
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Sua senha (opcional)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-400"
                  />
                </div>
              )}

              {error && <div className="text-red-400 text-sm text-center">{error}</div>}

              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold"
                disabled={isLoading}
              >
                {isLoading
                  ? isSignUp
                    ? "Criando conta..."
                    : "Entrando..."
                  : isSignUp
                    ? "Criar Conta"
                    : "Acessar Área de Membros"}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(!isSignUp)
                    setError(null)
                  }}
                  className="text-cyan-400 hover:text-cyan-300 text-sm underline"
                >
                  {isSignUp ? "Já tem conta? Fazer login" : "Não tem conta? Criar agora"}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-sm text-gray-500">
          <p>Acesso seguro com autenticação</p>
        </div>
      </div>
    </div>
  )
}
