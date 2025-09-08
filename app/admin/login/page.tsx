"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

const MAX_ATTEMPTS = 5
const LOCK_MINUTES = 10
const STORAGE_KEY = "admin_login_attempts"

interface AttemptsState {
  count: number
  lockedUntil?: number
}

export default function AdminLoginPage() {
  const router = useRouter()
  const supabase = useMemo(() => createClient(), [])
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>("")

  const [attempts, setAttempts] = useState<AttemptsState>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? (JSON.parse(raw) as AttemptsState) : { count: 0 }
    } catch {
      return { count: 0 }
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(attempts))
  }, [attempts])

  const isLocked = attempts.lockedUntil && Date.now() < attempts.lockedUntil
  const remainingMs = (attempts.lockedUntil ?? 0) - Date.now()
  const remainingMin = Math.max(0, Math.ceil(remainingMs / 60000))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isLocked) return
    setLoading(true)
    setError("")
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password: password.trim() })
      if (error) {
        const newCount = (attempts.count ?? 0) + 1
        const lockedUntil = newCount >= MAX_ATTEMPTS ? Date.now() + LOCK_MINUTES * 60000 : undefined
        setAttempts({ count: newCount % MAX_ATTEMPTS, lockedUntil })
        setError(lockedUntil ? `Muitas tentativas. Tente novamente em ${LOCK_MINUTES} minutos.` : "Credenciais inválidas.")
        return
      }

      // Checar admin
      const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL
      if (!data.user?.email || (adminEmail && data.user.email !== adminEmail)) {
        setError("Você não tem permissão de administrador.")
        return
      }

      await supabase.auth.getSession()
      router.replace("/admin")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <Card className="w-full max-w-md bg-gray-900/70 border-gray-700">
        <CardHeader>
          <CardTitle className="text-yellow-400">Acesso Administrativo</CardTitle>
          <CardDescription className="text-gray-400">Área restrita para administradores</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isLocked && (
              <Alert variant="destructive">
                <AlertDescription>
                  Muitas tentativas de login. Tente novamente em {remainingMin} minuto{remainingMin === 1 ? "" : "s"}.
                </AlertDescription>
              </Alert>
            )}
            {error && !isLocked && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-900 border-gray-700 text-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-900 border-gray-700 text-white" />
            </div>
            <div className="flex items-center justify-between text-sm">
              <a href="#" className="text-cyan-400 hover:text-cyan-300">Esqueceu a senha?</a>
            </div>
            <Button type="submit" disabled={loading || isLocked} className="w-full bg-yellow-400 text-black hover:bg-yellow-300">
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}


