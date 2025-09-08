"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Button } from "@/components/ui/button"

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

function isStandalone(): boolean {
  // Android/Chromium
  const matchStandalone = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(display-mode: standalone)").matches
  // iOS Safari
  const iosStandalone = typeof window !== "undefined" && (window as any).navigator?.standalone === true
  return Boolean(matchStandalone || iosStandalone)
}

function isIOS(): boolean {
  if (typeof navigator === "undefined") return false
  const ua = navigator.userAgent.toLowerCase()
  return /iphone|ipad|ipod/.test(ua)
}

export default function PwaInstallBanner() {
  const [show, setShow] = useState(false)
  const [showIosHelp, setShowIosHelp] = useState(false)
  const deferredPromptRef = useRef<BeforeInstallPromptEvent | null>(null)

  useEffect(() => {
    if (isStandalone()) {
      setShow(false)
      return
    }

    // Registrar o Service Worker
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .catch(() => {
          /* sem bloqueio */
        })
    }

    const onBeforeInstall = (e: Event) => {
      e.preventDefault?.()
      deferredPromptRef.current = e as BeforeInstallPromptEvent
      setShow(true)
    }
    window.addEventListener("beforeinstallprompt", onBeforeInstall as EventListener)

    // Exibir para iOS também (não possui beforeinstallprompt)
    if (isIOS()) {
      setShow(true)
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall as EventListener)
    }
  }, [])

  const handleInstall = async () => {
    if (isIOS()) {
      // iOS não permite prompt automático. Mostrar instruções.
      setShowIosHelp(true)
      return
    }

    const dp = deferredPromptRef.current
    if (!dp) {
      // Se não houver evento, tentar abrir instruções genéricas
      setShowIosHelp(true)
      return
    }
    try {
      await dp.prompt()
      await dp.userChoice
      setShow(false)
      deferredPromptRef.current = null
    } catch {
      /* ignorar */
    }
  }

  if (!show) return null

  return (
    <>
      <div className="fixed z-[60] bottom-4 right-4 left-4 md:left-auto md:w-96 bg-gray-900/95 border border-yellow-400/40 rounded-lg shadow-xl p-4">
        <div className="text-white font-semibold mb-1">Instale o aplicativo</div>
        <div className="text-gray-400 text-sm mb-3">Baixe para usar como app no seu dispositivo.</div>
        <div className="flex items-center gap-2">
          <Button onClick={handleInstall} className="bg-yellow-400 hover:bg-yellow-500 text-black flex-1">Baixar</Button>
          <Button variant="ghost" onClick={() => setShow(false)} className="text-gray-400">Agora não</Button>
        </div>
      </div>

      {showIosHelp && (
        <div className="fixed inset-0 z-[70] bg-black/60 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-gray-900 border border-yellow-400/40 rounded-lg p-4">
            <div className="text-white font-semibold mb-2">Como instalar no iPhone/iPad</div>
            <ol className="list-decimal pl-5 text-sm text-gray-300 space-y-1 mb-3">
              <li>Toque no botão Compartilhar no Safari.</li>
              <li>Escolha "Adicionar à Tela de Início".</li>
              <li>Confirme tocando em "Adicionar".</li>
            </ol>
            <div className="flex justify-end">
              <Button onClick={() => setShowIosHelp(false)} className="bg-yellow-400 hover:bg-yellow-500 text-black">Entendi</Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}


