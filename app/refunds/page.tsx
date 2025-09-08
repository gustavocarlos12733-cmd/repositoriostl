"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import BackToDashboard from "@/components/back-to-dashboard"

export default function RefundsPage() {
  const [email, setEmail] = useState<string>("")
  const [reason, setReason] = useState<string>("")
  const [selected, setSelected] = useState<boolean>(false)
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [showChat, setShowChat] = useState<boolean>(false)

  useEffect(() => {
    // Preencher email se existir na storage do app
    try {
      const stored = localStorage.getItem("stl_club_user")
      if (stored) {
        const u = JSON.parse(stored)
        setEmail(u.email ?? "")
      }
    } catch {}
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setShowChat(true)
    // Aqui poderíamos chamar API de ticket/reembolso
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4"><BackToDashboard /></div>
        <h1 className="text-2xl font-bold text-yellow-400 mb-4">Solicitar Reembolso</h1>
        <Card className="bg-gray-900/60 border-gray-700">
          <CardHeader>
            <CardTitle>Reembolso via PIX</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-900 border-gray-700 text-white"
              />

              <Textarea
                placeholder="Por que está pedindo reembolso?"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
                className="bg-gray-900 border-gray-700 text-white"
              />

              <div className="space-y-2">
                <div className="text-sm text-gray-400">Selecione o produto:</div>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={selected} onChange={(e) => setSelected(e.target.checked)} />
                  O CLUBE DO STL
                </label>
              </div>

              <Button type="submit" disabled={!reason || !selected} className="bg-yellow-400 text-black hover:bg-yellow-500">
                Solicitar reembolso
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {showChat && (
        <div className="fixed bottom-4 right-4 w-80 bg-gray-900 border border-gray-700 rounded-lg shadow-xl overflow-hidden">
          <div className="flex items-center justify-between p-3 border-b border-gray-800">
            <div className="text-sm font-medium text-white">Atendimento</div>
            <button className="text-gray-400 hover:text-white" onClick={() => setShowChat(false)}>×</button>
          </div>
          <div className="p-3 text-sm text-gray-200">
            Seu pedido de reembolso foi concluído. O estorno via PIX será realizado em 7 a 15 dias úteis.
          </div>
        </div>
      )}
    </div>
  )
}


