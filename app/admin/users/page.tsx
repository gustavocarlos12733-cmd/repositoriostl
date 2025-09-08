"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AdminUsersPage() {
  const supabase = createClient()
  const [users, setUsers] = useState<any[]>([])
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState("all")

  useEffect(() => {
    // Placeholder: carrega usuários via RPC/endpoint no futuro; por enquanto, simulado
    ;(async () => {
      const { data } = await supabase.from("profiles").select("id,name,email,user_type,created_at").limit(100)
      setUsers(data ?? [])
    })()
  }, [])

  const filtered = users.filter((u) => u.name?.toLowerCase().includes(query.toLowerCase()) || u.email?.toLowerCase().includes(query.toLowerCase()))

  return (
    <Card className="bg-gray-900/60 border-gray-700">
      <CardHeader>
        <CardTitle>Gerenciamento de Usuários</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3 mb-4">
          <Input placeholder="Buscar por nome ou email" value={query} onChange={(e) => setQuery(e.target.value)} className="bg-gray-900 border-gray-700 text-white w-64" />
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-48 bg-gray-900 border-gray-700 text-white">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 text-white border-gray-700">
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="active">Ativos</SelectItem>
              <SelectItem value="inactive">Inativos</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Desde</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((u) => (
              <TableRow key={u.id}>
                <TableCell>{u.name ?? "-"}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.user_type ?? "member"}</TableCell>
                <TableCell>{u.created_at ? new Date(u.created_at).toLocaleDateString("pt-BR") : "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}


