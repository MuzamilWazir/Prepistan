"use client"

import { useEffect, useState } from "react"

export function OAuthGate({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get("token")
    const userStr = params.get("user")
    const error = params.get("error")
    const refresh = params.get("refresh")

    if (error) {
      const url = new URL(window.location.href)
      url.searchParams.delete("error")
      window.history.replaceState({}, "", url.toString())
      setReady(true)
      return
    }

    if (token && userStr) {
      try {
        const user = JSON.parse(decodeURIComponent(userStr))
        localStorage.setItem("prepistan_token", token)
        if (refresh) {
          localStorage.setItem("prepistan_refresh", refresh)
        }
        localStorage.setItem(
          "prepistan_user",
          JSON.stringify({
            name: user.name,
            email: user.email,
            isLoggedIn: true,
            provider: user.provider || "Google",
          })
        )
        const url = new URL(window.location.href)
        url.searchParams.delete("token")
        url.searchParams.delete("refresh")
        url.searchParams.delete("user")
        url.searchParams.delete("error")
        window.history.replaceState({}, "", url.toString())
        window.location.reload()
        return
      } catch {
        const url = new URL(window.location.href)
        url.searchParams.delete("token")
        url.searchParams.delete("refresh")
        url.searchParams.delete("user")
        window.history.replaceState({}, "", url.toString())
      }
    }

    setReady(true)
  }, [])

  if (!ready) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">Signing you in...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
