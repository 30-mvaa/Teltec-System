"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { useRouter } from "next/navigation"
import { getCSRFToken, getCookie } from "@/utils/csrf"


interface User {
  id: number
  email: string
  name: string
  rol: string
  //rol: "administrador" | "atencion_cliente" | "cobros"
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider")
  }
  return context
}


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const rol = localStorage.getItem("rol")
    const email = localStorage.getItem("email")
    const name = localStorage.getItem("nombre")
    const id = localStorage.getItem("user_id")

    if (!rol || !email || !id) {
      localStorage.clear()
      setUser(null)
      setIsAuthenticated(false)
      setIsLoading(false)
      return
    }

    setUser({
      id: parseInt(id),
      email,
      rol,
      name: name || "",
    })
    setIsAuthenticated(true)
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
  await getCSRFToken() // Obligatorio antes de hacer login

  const csrfToken = getCookie("csrftoken")
  if (!csrfToken) throw new Error("No se pudo obtener el token CSRF")

  const res = await fetch("http://localhost:8000/api/users/session-login/", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
    },
    body: JSON.stringify({ username: email, password }),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error || "Error al iniciar sesión")
  }

  localStorage.setItem("rol", data.rol)
  localStorage.setItem("email", data.email)
  localStorage.setItem("nombre", data.name)
  localStorage.setItem("user_id", data.user_id)

  setUser({
    id: data.user_id,
    email: data.email,
    name: data.name,
    rol: data.rol,
  })

  setIsAuthenticated(true)
  router.push("/dashboard")
}

  const logout = async () => {
    await fetch("http://localhost:8000/api/users/session-logout/", {
      method: "POST",
      credentials: "include",
    })

    localStorage.clear()
    setUser(null)
    setIsAuthenticated(false)
    router.push("/login")
  }

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated,
    isLoading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
