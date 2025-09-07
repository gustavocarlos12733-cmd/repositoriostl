"use client"

import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, MessageCircle, Crown, Zap } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import { getModules } from "@/lib/auth"
import { useState, useEffect } from "react"

export default function WhatsAppGroupPage() {
  const { user } = useAuth()
  const [modules, setModules] = useState<any[]>([])

  useEffect(() => {
    setModules(getModules())
  }, [])

  if (!user) return null

  return (
    <div className="min-h-screen bg-black">
      <Sidebar modules={modules} />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-yellow-400 mb-2">GRUPO WHATSAPP O CLUBE STL</h1>
          <p className="text-gray-400">Acesso exclusivo à comunidade VIP</p>
        </div>

        {/* Card Principal */}
        <Card className="bg-gray-900/50 border-yellow-400/40 mb-8">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-4 bg-green-600/20 rounded-full w-20 h-20 flex items-center justify-center">
              <Users className="h-10 w-10 text-green-400" />
            </div>
            <CardTitle className="text-2xl text-yellow-400">Grupo VIP Exclusivo</CardTitle>
            <CardDescription className="text-gray-300">
              Junte-se à nossa comunidade premium e tenha acesso a conteúdo exclusivo, suporte direto e interação com
              outros membros do Clube STL.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* Preço */}
            <div className="text-center mb-8">
              <div className="inline-block p-6 bg-gradient-to-r from-green-600/20 to-green-500/20 rounded-lg border border-green-500/30">
                <div className="text-5xl font-bold text-green-400 mb-2">R$ 9,90</div>
                <div className="text-gray-400">por mês</div>
              </div>
            </div>

            {/* Benefícios */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Crown className="h-5 w-5 text-yellow-400" />
                  Benefícios Exclusivos
                </h3>

                <div className="space-y-3">
                  {[
                    "Conteúdo exclusivo diário",
                    "Novos modelos STL em primeira mão",
                    "Tutoriais avançados de impressão 3D",
                    "Dicas de configuração e otimização",
                    "Acesso a modelos beta",
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-cyan-400" />
                  Suporte Premium
                </h3>

                <div className="space-y-3">
                  {[
                    "Suporte direto via WhatsApp",
                    "Resposta prioritária em até 2h",
                    "Comunidade ativa 24/7",
                    "Networking com outros makers",
                    "Eventos exclusivos online",
                  ].map((support, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-300">{support}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Depoimentos */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4 text-center">O que nossos membros dizem</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-800/50 rounded-lg border border-yellow-400/20">
                  <p className="text-gray-300 text-sm mb-2">
                    "O grupo é incrível! Sempre tem conteúdo novo e o suporte é muito rápido."
                  </p>
                  <p className="text-yellow-400 text-xs">- João M.</p>
                </div>
                <div className="p-4 bg-gray-800/50 rounded-lg border border-yellow-400/20">
                  <p className="text-gray-300 text-sm mb-2">
                    "Valeu muito a pena! Os modelos exclusivos são de altíssima qualidade."
                  </p>
                  <p className="text-yellow-400 text-xs">- Maria S.</p>
                </div>
              </div>
            </div>

            {/* Botão de Assinatura */}
            <div className="text-center">
              <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 text-lg">
                <Zap className="h-5 w-5 mr-2" />
                Assinar Grupo VIP - R$ 9,90/mês
              </Button>
              <p className="text-gray-400 text-sm mt-2">Cancele a qualquer momento • Sem taxa de adesão</p>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Rápido */}
        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Perguntas Frequentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-white font-medium mb-1">Como funciona o pagamento?</h4>
                <p className="text-gray-400 text-sm">Cobrança mensal automática via PIX ou cartão de crédito.</p>
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Posso cancelar a qualquer momento?</h4>
                <p className="text-gray-400 text-sm">Sim, sem multas ou taxas de cancelamento.</p>
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">O que acontece se eu cancelar?</h4>
                <p className="text-gray-400 text-sm">Você mantém acesso até o final do período pago.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
