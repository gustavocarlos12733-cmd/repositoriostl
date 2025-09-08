"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import BackToDashboard from "@/components/back-to-dashboard"

export default function PurchasesPage() {
  const [email, setEmail] = useState<string>("")
  const [items, setItems] = useState<{ id: string; name: string; date: string }[]>([])

  useEffect(() => {
    // Falso histórico local: apenas "O CLUBE DO STL"
    setItems([{ id: "club-stl", name: "O CLUBE DO STL", date: new Date().toLocaleDateString("pt-BR") }])
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4"><BackToDashboard /></div>
        <h1 className="text-2xl font-bold text-yellow-400 mb-4">Compras e Assinaturas</h1>
        <Card className="bg-gray-900/60 border-gray-700">
          <CardHeader>
            <CardTitle>Seus produtos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {items.map((it) => (
                <div key={it.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded border border-gray-700">
                  <div>
                    <div className="text-white text-sm font-medium">{it.name}</div>
                    <div className="text-xs text-gray-400">{it.date}</div>
                  </div>
                  <span className="text-xs text-gray-400">Ativo</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


