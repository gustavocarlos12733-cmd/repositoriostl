"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function BackToDashboard() {
  return (
    <Link href="/dashboard">
      <Button
        variant="outline"
        size="sm"
        className="border-[var(--border)] text-gray-300 bg-transparent hover:bg-gray-800"
        aria-label="Voltar ao Dashboard"
      >
        <ArrowLeft className="h-4 w-4 mr-1" /> Voltar
      </Button>
    </Link>
  )
}


