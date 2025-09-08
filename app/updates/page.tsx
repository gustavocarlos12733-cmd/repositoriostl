"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import BackToDashboard from "@/components/back-to-dashboard"

export default function UpdatesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4"><BackToDashboard /></div>
        <h1 className="text-2xl font-bold text-yellow-400 mb-4">Atualizações</h1>
        <Card className="bg-gray-900/60 border-gray-700 mb-6">
          <CardHeader>
            <CardTitle>Plano Mensal de Atualizações</CardTitle>
            <CardDescription className="text-gray-400">Acesse todos os recursos e novos STL por R$ 49,90/mês</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="text-3xl font-bold text-green-400">R$ 49,90/mês</div>
                <p className="text-gray-400 text-sm">Novos arquivos STL, melhorias contínuas e suporte prioritário</p>
              </div>
              <Button className="bg-yellow-400 text-black hover:bg-yellow-500">Assinar agora</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/60 border-gray-700">
          <CardHeader>
            <CardTitle>Roadmap</CardTitle>
            <CardDescription className="text-gray-400">O que vem por aí nos próximos meses</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              <li>Novos pacotes de STL temáticos</li>
              <li>Tutoriais em vídeo de impressão e pós-processo</li>
              <li>Melhorias de performance na plataforma</li>
              <li>Integração com novos provedores de pagamento</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


