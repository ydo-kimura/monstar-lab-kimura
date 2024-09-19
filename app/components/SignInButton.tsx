'use client'

import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "./Button"

export default function SignInButton() {
  const { data: session } = useSession()

  if (session && session.user) {
    return (
      <div className="flex items-center gap-4">
        <p className="text-white">{session.user.name}</p>
        <Button onClick={() => signOut()} variant="outline">
          Sign out
        </Button>
      </div>
    )
  }

  return (
    <Button onClick={() => signIn("google")} variant="outline">
      Sign in with Google
    </Button>
  )
}