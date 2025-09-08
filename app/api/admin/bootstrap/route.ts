import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

export async function POST() {
  try {
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL
    const adminPassword = process.env.ADMIN_DEFAULT_PASSWORD ?? "admin123"

    if (!adminEmail) {
      return NextResponse.json({ ok: false, error: "NEXT_PUBLIC_ADMIN_EMAIL não configurado" }, { status: 400 })
    }

    const supabase = createAdminClient()

    // Verifica se já existe
    const { data: existing, error: listError } = await supabase.auth.admin.listUsers({
      page: 1,
      perPage: 1000,
    })

    if (listError) throw listError

    const already = existing.users.find((u) => u.email?.toLowerCase() === adminEmail.toLowerCase())
    if (already) {
      return NextResponse.json({ ok: true, message: "Admin já existe", userId: already.id })
    }

    // Cria usuário admin com email confirmado
    const { data: created, error: createError } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
      user_metadata: { name: "Admin" },
    })

    if (createError) throw createError

    return NextResponse.json({ ok: true, message: "Admin criado", userId: created.user?.id })
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error?.message ?? "Erro ao criar admin" }, { status: 500 })
  }
}


