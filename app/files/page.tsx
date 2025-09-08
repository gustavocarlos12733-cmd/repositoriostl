"use client"

import { useEffect, useMemo, useState } from "react"
import { getModules } from "@/lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export default function FilesPage() {
  const [modules, setModules] = useState<any[]>([])
  const [q, setQ] = useState("")

  useEffect(() => {
    setModules(getModules())
  }, [])

  const categories = useMemo(() => Array.from(new Set(modules.map((m) => m.category))), [modules])
  const [activeCats, setActiveCats] = useState<string[]>([])

  const filtered = modules.filter((m) => {
    const mq = q.trim().toLowerCase()
    const matchesQ = mq.length === 0 || m.title.toLowerCase().includes(mq) || m.description.toLowerCase().includes(mq)
    const matchesCat = activeCats.length === 0 || activeCats.includes(m.category)
    return matchesQ && matchesCat
  })

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-yellow-400 mb-4">Arquivos STL</h1>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Input placeholder="Buscar..." className="bg-gray-900 border-gray-700 text-white w-64" value={q} onChange={(e) => setQ(e.target.value)} />
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCats((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]))}
                className={`px-3 py-1 rounded-full text-sm border ${activeCats.includes(cat) ? "bg-cyan-500 text-black border-cyan-500" : "border-gray-700 text-gray-300 hover:text-white"}`}
              >
                {cat}
              </button>
            ))}
            {categories.length > 0 && (
              <button onClick={() => setActiveCats([])} className="px-3 py-1 rounded-full text-sm border border-gray-700 text-gray-300 hover:text-white">
                Limpar
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((m) => (
            <Card key={m.id} className="bg-gray-900/60 border-gray-700 overflow-hidden">
              <div className="relative h-36 w-full">
                <Image src="/placeholder.jpg" alt={m.title} fill className="object-cover" />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm text-white">{m.title}</CardTitle>
                  <Badge variant="outline" className="border-cyan-500 text-cyan-400">{m.category}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-gray-400 line-clamp-2">{m.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}


