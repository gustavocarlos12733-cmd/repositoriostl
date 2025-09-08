"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AdminSupportPage() {
  const tickets = [
    { id: "TCK-001", subject: "Problema ao baixar STL", status: "aberto" },
    { id: "TCK-002", subject: "Erro no login", status: "fechado" },
  ]
  return (
    <Card className="bg-gray-900/60 border-gray-700">
      <CardHeader>
        <CardTitle>Suporte</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Assunto</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((t) => (
              <TableRow key={t.id}>
                <TableCell>{t.id}</TableCell>
                <TableCell>{t.subject}</TableCell>
                <TableCell className={t.status === "aberto" ? "text-yellow-400" : "text-green-400"}>{t.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}


