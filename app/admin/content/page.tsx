"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AdminContentPage() {
  return (
    <Card className="bg-gray-900/60 border-gray-700">
      <CardHeader>
        <CardTitle>Gerenciamento de Conteúdo (STL)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label>Título</Label>
            <Input className="bg-gray-900 border-gray-700 text-white" />
            <Label>Descrição</Label>
            <Input className="bg-gray-900 border-gray-700 text-white" />
            <Label>Categoria</Label>
            <Input className="bg-gray-900 border-gray-700 text-white" />
            <Label>Tags</Label>
            <Input className="bg-gray-900 border-gray-700 text-white" />
            <div className="pt-2">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-300">Salvar</Button>
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-400 mb-2">Upload de arquivo STL (em breve)</div>
            <div className="h-48 bg-gray-950 border border-gray-800 rounded-lg flex items-center justify-center text-gray-500">
              Pré-visualização
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


