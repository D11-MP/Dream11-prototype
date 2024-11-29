"use client"

import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

interface AuthProviderProps{
  children : ReactNode,
  session :Session
}

export default function AuthProvider({children}:AuthProviderProps) {
  return (
    <SessionProvider >
        {children}
    </SessionProvider>
  )
}