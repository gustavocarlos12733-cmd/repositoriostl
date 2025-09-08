"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-yellow-400 mb-4">Suporte</h1>
        <Card className="bg-gray-900/60 border-gray-700">
          <CardHeader>
            <CardTitle>Abrir Ticket</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="Assunto" className="bg-gray-900 border-gray-700 text-white" />
            <Input placeholder="Descrição" className="bg-gray-900 border-gray-700 text-white" />
            <a href="https://wa.me/5519982479541" target="_blank" rel="noreferrer">
              <Button className="bg-[var(--brand-accent)] hover:opacity-90 text-black">Abrir Ticket no WhatsApp</Button>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


