"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { type User } from "@/lib/auth"
import { createClient } from "@/lib/supabase/client"

interface AuthContextType {
  user: User | null
  login: (user: User) => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadUserFromSupabase = async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase.auth.getUser()
        if (error) {
          setUser(null)
        } else if (data.user) {
          const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL
          const normalizedUser: User = {
            id: data.user.id,
            name: (data.user.user_metadata as any)?.name || data.user.email || "Usuário",
            email: data.user.email || "",
            isAdmin: adminEmail ? data.user.email === adminEmail : false,
            joinedAt: new Date().toISOString(),
          }
          setUser(normalizedUser)
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error("Erro ao carregar usuário (Supabase):", error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    void loadUserFromSupabase()
  }, [])

  const login = (user: User) => {
    setUser(user)
  }

  const logout = async () => {
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
    } catch {}
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
