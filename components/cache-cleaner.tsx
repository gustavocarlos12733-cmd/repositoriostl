"use client"

import { useEffect } from "react"

export function CacheCleaner() {
  useEffect(() => {
    // Verificar se há dados antigos no localStorage
    const hasOldData = localStorage.getItem("stl_club_modules")
    
    if (hasOldData) {
      console.log("🧹 Detectados dados antigos no cache. Limpando...")
      
      // Limpar dados antigos
      const keysToRemove = [
        'stl_club_modules',
        'stl_club_user',
        'stl-admin',
        'isAdminLoggedIn'
      ]
      
      keysToRemove.forEach(key => {
        localStorage.removeItem(key)
        sessionStorage.removeItem(key)
      })
      
      console.log("✅ Cache limpo! Recarregando página...")
      
      // Recarregar a página para aplicar as mudanças
      window.location.reload()
    }
  }, [])

  return null // Este componente não renderiza nada
}
