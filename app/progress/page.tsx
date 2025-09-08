"use client"

import { useEffect, useState } from "react"
import { getModules } from "@/lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function ProgressPage() {
  const [modules, setModules] = useState<any[]>([])
  useEffect(() => {
    setModules(getModules())
  }, [])
  const completed = modules.filter((m) => m.isCompleted).length
  const total = modules.length
  const pct = total ? Math.round((completed / total) * 100) : 0
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-yellow-400 mb-4">Meu Progresso</h1>
        <Card className="bg-gray-900/60 border-gray-700 mb-6">
          <CardHeader>
            <CardTitle>Resumo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-400 mb-2">{completed}/{total} módulos concluídos</div>
            <Progress value={pct} className="h-2" />
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modules.map((m) => (
            <Card key={m.id} className="bg-gray-900/60 border-gray-700">
              <CardHeader>
                <CardTitle className="text-sm">{m.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={m.isCompleted ? 100 : m.progress} className="h-2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}


