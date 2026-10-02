"use client"

import { createContext, useContext } from "react"

const AuthContext = createContext<boolean>(false)

export function AuthProvider({ 
  children, 
  isLoggedIn 
}: { 
  children: React.ReactNode
  isLoggedIn: boolean 
}) {
  return (
    <AuthContext.Provider value={isLoggedIn}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
