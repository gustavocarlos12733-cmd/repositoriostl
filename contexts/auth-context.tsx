"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { type User, getUser, logout as authLogout } from "@/lib/auth"

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
    try {
      const storedUser = getUser()
      setUser(storedUser)
    } catch (error) {
      console.error("Erro ao carregar usuário:", error)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const login = (user: User) => {
    setUser(user)
  }

  const logout = () => {
    authLogout()
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
