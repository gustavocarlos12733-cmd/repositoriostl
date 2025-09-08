"use client"

import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserMenu } from "@/components/user-menu"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

export function HeaderBar() {
  const supabase = createClient()
  const [hasUser, setHasUser] = useState(false)

  useEffect(() => {
    ;(async () => {
      const { data } = await supabase.auth.getUser()
      setHasUser(Boolean(data.user))
    })()
  }, [])

  return (
    <div className="sticky top-0 z-40 -mx-4 px-4 py-3 bg-[var(--bg-dark)]/70 backdrop-blur border-b border-[var(--border)] flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Link href="/dashboard" className="text-yellow-400 font-bold hidden sm:block">O CLUBE DO STL</Link>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        {hasUser ? (
          <UserMenu />
        ) : (
          <Link href="/login" className="text-sm text-gray-300 hover:text-white">Entrar</Link>
        )}
      </div>
    </div>
  )
}


