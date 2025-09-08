import type { ReactNode } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"

export default function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = createClient()
  async function handleLogout() {
    try {
      await supabase.auth.signOut()
      if (typeof window !== "undefined") window.location.href = "/admin/login"
    } catch {}
  }
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="sticky top-0 z-40 border-b border-gray-800 bg-black/60 backdrop-blur">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="text-yellow-400 font-bold">Admin · O CLUBE DO STL</Link>
            <nav className="hidden md:flex items-center gap-4 text-sm text-gray-300">
              <Link href="/admin" className="hover:text-white">Dashboard</Link>
              <Link href="/admin/users" className="hover:text-white">Usuários</Link>
              <Link href="/admin/content" className="hover:text-white">Conteúdo STL</Link>
              <Link href="/admin/modules" className="hover:text-white">Módulos</Link>
              <Link href="/admin/support" className="hover:text-white">Suporte</Link>
              <Link href="/admin/settings" className="hover:text-white">Configurações</Link>
            </nav>
          </div>
          <Button onClick={handleLogout} variant="outline" className="border-gray-700 text-gray-300 bg-transparent hover:bg-gray-800">
            Sair
          </Button>
        </div>
      </div>
      <main className="container mx-auto px-4 py-6">{children}</main>
    </div>
  )
}


