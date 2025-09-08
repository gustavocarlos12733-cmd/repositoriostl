"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AdminModulesPage() {
  return (
    <Card className="bg-gray-900/60 border-gray-700">
      <CardHeader>
        <CardTitle>Gerenciamento de Módulos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-gray-300 mb-3">CRUD de módulos/aulas (em breve)</div>
        <Button className="bg-cyan-500 hover:bg-cyan-500/80 text-black">Adicionar Módulo</Button>
      </CardContent>
    </Card>
  )
}


