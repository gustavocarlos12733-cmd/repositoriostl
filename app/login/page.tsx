"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"

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
    if (!email.trim() || !password.trim()) {
      setError("Informe email e senha")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClient()

      if (isSignUp) {
        const { error: signUpError } = await supabase.auth.signUp({
          email: email.trim(),
          password: password.trim(),
          options: {
            data: name.trim() ? { name: name.trim() } : undefined,
          },
        })
        if (signUpError) throw signUpError
        // Após cadastro, também tentar login para entrar direto
        const { error: loginAfterSignUpError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password.trim(),
        })
        if (loginAfterSignUpError) throw loginAfterSignUpError
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password.trim(),
        })
        if (signInError) throw signInError
      }

      // Garante que os cookies de sessão estejam aplicados antes do middleware
      await supabase.auth.getSession()
      if (typeof window !== "undefined") window.location.href = "/dashboard"
      else router.replace("/dashboard")
    } catch (err: any) {
      const message = typeof err?.message === "string" ? err.message : "Erro ao autenticar"
      setError(message)
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

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Senha
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-400"
                  required
                />
              </div>

              {error && <div className="text-red-400 text-sm text-center">{error}</div>}

              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (isSignUp ? "Criando conta..." : "Entrando...") : isSignUp ? "Criar Conta" : "Acessar Área de Membros"}
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
