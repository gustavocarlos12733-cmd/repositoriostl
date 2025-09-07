"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, Eye, EyeOff } from "lucide-react"
import Link from "next/link"

export default function AdminLoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (username === "admin" && password === "stlclub2024") {
      // Salvar status de admin no localStorage
      localStorage.setItem("isAdminLoggedIn", "true")
      router.push("/admin")
    } else {
      setError("Credenciais inválidas. Tente novamente.")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900/50 rounded-full border border-yellow-400 mb-4">
            <Shield className="h-8 w-8 text-yellow-400" />
          </div>
          <h1 className="text-2xl font-bold text-yellow-400 neon-glow-soft mb-2">ACESSO ADMINISTRATIVO</h1>
          <p className="text-gray-400 text-sm">
            <span className="text-yellow-400">O CLUBE DO STL</span> - Área Restrita
          </p>
        </div>

        {/* Login Form */}
        <Card className="bg-gray-900/50 border-yellow-400 neon-border-soft">
          <CardHeader className="text-center">
            <CardTitle className="text-white">Login de Administrador</CardTitle>
            <CardDescription className="text-gray-400">
              Insira suas credenciais para acessar o painel administrativo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-300">
                  Usuário
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-gray-800/50 border-gray-600 text-white focus:border-yellow-400 focus:ring-yellow-400/20"
                  placeholder="Digite seu usuário"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">
                  Senha
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-800/50 border-gray-600 text-white focus:border-yellow-400 focus:ring-yellow-400/20 pr-10"
                    placeholder="Digite sua senha"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-400"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-900/20 border border-red-500/50 rounded-lg">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link href="/dashboard" className="text-gray-400 hover:text-yellow-400 text-sm">
                ← Voltar para a área de membros
              </Link>
            </div>

            {/* Credenciais de demonstração */}
            <div className="mt-4 p-3 bg-gray-800/30 rounded-lg border border-gray-700">
              <p className="text-xs text-gray-400 text-center mb-2">Credenciais de demonstração:</p>
              <p className="text-xs text-gray-300 text-center">
                <strong>Usuário:</strong> admin
                <br />
                <strong>Senha:</strong> stlclub2024
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
