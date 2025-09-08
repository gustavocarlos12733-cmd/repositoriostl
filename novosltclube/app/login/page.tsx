"use client"

import type React from "react"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isSignUp, setIsSignUp] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    console.log("[v0] Tentando autenticar:", email, isSignUp ? "(signup)" : "(login)")

    try {
      if (isSignUp) {
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? (typeof window !== "undefined" ? window.location.origin : undefined)
        const emailRedirectTo = siteUrl ? new URL("/login", siteUrl).toString() : undefined

        const { error: signUpError } = await supabase.auth.signUp({
          email: email.trim(),
          password: password.trim(),
          options: {
            emailRedirectTo,
          },
        })

        if (signUpError) {
          console.log("[v0] Erro no signup:", signUpError.message)
          setError(signUpError.message)
        } else {
          setSuccess("Email de confirmação enviado. Verifique sua caixa de entrada. Após confirmar, você será redirecionado para a página de login.")
          setIsSignUp(false)
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) {
          console.log("[v0] Erro no login:", error.message)
          setError(error.message)
        } else {
          console.log("[v0] Login bem-sucedido:", data.user?.email)
          router.push("/dashboard")
          router.refresh()
        }
      }
    } catch (err) {
      console.log("[v0] Erro inesperado:", err)
      setError("Erro inesperado. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{isSignUp ? "Criar conta - STL Club" : "Login - STL Club"}</CardTitle>
          <CardDescription>
            {isSignUp ? "Crie sua conta para acessar o sistema (confirmação por e-mail)" : "Entre com suas credenciais para acessar o sistema"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {success && (
              <Alert>
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="seu@email.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Sua senha"
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (isSignUp ? "Criando conta..." : "Entrando...") : isSignUp ? "Criar conta" : "Entrar"}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp)
                  setError("")
                  setSuccess("")
                }}
                className="text-sm underline text-gray-600"
              >
                {isSignUp ? "Já tem conta? Fazer login" : "Não tem conta? Criar agora"}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
