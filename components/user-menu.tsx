"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

export function UserMenu() {
  const supabase = createClient()
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")

  useEffect(() => {
    ;(async () => {
      const { data } = await supabase.auth.getUser()
      const u = data.user
      if (u) {
        const displayName = (u.user_metadata as any)?.name ?? u.email ?? "Usuário"
        setName(String(displayName))
        setEmail(u.email ?? "")
      }
    })()
  }, [])

  const initials = (name || email || "U").slice(0, 2).toUpperCase()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    if (typeof window !== "undefined") window.location.href = "/login"
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-[var(--brand-accent)] text-[var(--text-inverse)] text-xs">
            {initials}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-gray-900 border-gray-700 text-white">
        <DropdownMenuLabel className="text-sm">
          <div className="font-medium leading-tight">{name || "Usuário"}</div>
          <div className="text-xs text-gray-400">{email}</div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-800" />
        <Link href="/profile">
          <DropdownMenuItem className="focus:bg-gray-800">Meu Perfil</DropdownMenuItem>
        </Link>
        <Link href="/settings">
          <DropdownMenuItem className="focus:bg-gray-800">Configurações</DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator className="bg-gray-800" />
        <DropdownMenuItem onClick={handleLogout} className="text-red-400 focus:bg-gray-800">
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


