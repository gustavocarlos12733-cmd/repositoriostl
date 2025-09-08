"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-yellow-400 mb-4">Configurações</h1>
        <Card className="bg-gray-900/60 border-gray-700">
          <CardHeader>
            <CardTitle>Perfil</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nome</Label>
              <Input className="bg-gray-900 border-gray-700 text-white" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input className="bg-gray-900 border-gray-700 text-white" />
            </div>
            <div className="md:col-span-2 pt-2">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-300">Salvar</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


