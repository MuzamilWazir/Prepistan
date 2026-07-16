"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { SignupForm } from "@/components/signup-form"
import { extractOAuthParams, clearOAuthParams } from "@/lib/api"

export default function SignupPage() {
  const router = useRouter()

  useEffect(() => {
    const params = extractOAuthParams()
    if (params?.error) {
      clearOAuthParams()
      return
    }
    if (params?.token && params?.user) {
      try {
        const user = JSON.parse(decodeURIComponent(params.user))
        localStorage.setItem("prepistan_token", params.token)
        if (params.refresh) {
          localStorage.setItem("prepistan_refresh", params.refresh)
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
        clearOAuthParams()
        router.push("/dashboard")
      } catch {
        clearOAuthParams()
      }
    }
  }, [router])

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <SignupForm />
      </div>
    </div>
  )
}
