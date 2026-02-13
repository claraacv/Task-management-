'use client'
import { signIn, signOut } from "next-auth/react"

export function SignIn({ provider }: { provider: string }) {
  return (
      <button 
        onClick={() => signIn(provider, {callbackUrl: "/task-management/homepage"})}
        className="bg-gray-600 text-white p-2 rounded-md w-full font-bold mb-3">
        Sign In with {provider}
      </button>
  )
}