"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function AdminSettingsPage() {
  return (
    <Card className="bg-gray-900/60 border-gray-700">
      <CardHeader>
        <CardTitle>Configurações</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label>Contato (email)</Label>
            <Input className="bg-gray-900 border-gray-700 text-white" />
            <Label>Instagram</Label>
            <Input className="bg-gray-900 border-gray-700 text-white" />
            <Label>WhatsApp</Label>
            <Input className="bg-gray-900 border-gray-700 text-white" />
            <div className="pt-2">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-300">Salvar</Button>
            </div>
          </div>
          <div className="space-y-3">
            <Label>SMTP Host</Label>
            <Input className="bg-gray-900 border-gray-700 text-white" />
            <Label>SMTP User</Label>
            <Input className="bg-gray-900 border-gray-700 text-white" />
            <Label>SMTP Password</Label>
            <Input type="password" className="bg-gray-900 border-gray-700 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


