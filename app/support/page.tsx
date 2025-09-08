"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import BackToDashboard from "@/components/back-to-dashboard"

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4"><BackToDashboard /></div>
        <h1 className="text-2xl font-bold text-yellow-400 mb-4">Falar com Suporte</h1>
        <Card className="bg-gray-900/60 border-gray-700">
          <CardHeader>
            <CardTitle>Suporte Técnico</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-gray-400 text-sm">Precisa de ajuda com impressão 3D ou arquivos STL? Fale diretamente com nosso suporte pelo WhatsApp.</p>
            <a href="https://wa.me/5519982479541" target="_blank" rel="noreferrer">
              <Button className="bg-cyan-500 hover:bg-cyan-500/80 text-black">Falar com Suporte</Button>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


