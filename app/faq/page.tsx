"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import BackToDashboard from "@/components/back-to-dashboard"

export default function FaqPage() {
  const sections = [
    {
      title: "Primeiros Passos",
      items: [
        { q: "Como criar minha conta?", a: "Clique em Criar Conta, confirme seu e-mail e faça login." },
        { q: "Esqueci minha senha", a: "Use o link Esqueceu a senha na tela de login para redefini-la." },
      ],
    },
    {
      title: "Downloads",
      items: [
        { q: "Como baixar os arquivos?", a: "Acesse o módulo e clique nos links de download fornecidos." },
      ],
    },
    {
      title: "Suporte",
      items: [
        { q: "Como abrir um ticket?", a: "Use a página de Suporte e clique em Abrir Ticket no WhatsApp." },
      ],
    },
    {
      title: "Assinatura",
      items: [
        { q: "Como renovar?", a: "Verifique seu plano e opções de pagamento na seção Configurações." },
      ],
    },
  ]
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4"><BackToDashboard /></div>
        <h1 className="text-2xl font-bold text-yellow-400 mb-4">FAQ</h1>
        {sections.map((sec, idx) => (
          <Card key={idx} className="bg-gray-900/60 border-gray-700 mb-6">
            <CardHeader>
              <CardTitle>{sec.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {sec.items.map((it, i) => (
                  <AccordionItem key={i} value={`${idx}-${i}`}>
                    <AccordionTrigger>{it.q}</AccordionTrigger>
                    <AccordionContent>{it.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}


