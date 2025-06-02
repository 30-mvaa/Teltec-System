

'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import axios from "axios"
import { jwtDecode } from "jwt-decode"

interface User {
  id: number
  email: string
  name: string
  rol: string
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

  // useEffect(() => {
  //   const token = localStorage.getItem("token")
  //   const email = localStorage.getItem("email")
  //   const role = localStorage.getItem("rol")
  //   const name = localStorage.getItem("nombre")
  //   const id = localStorage.getItem("user_id")

  //   if (token && email && role && name && id) {
  //     setUser({
  //       id: parseInt(id),
  //       email,
  //       role,
  //       name,
  //     })
  //     setIsAuthenticated(true)
  //   }

  //   setIsLoading(false)
  // }, [])
  useEffect(() => {
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  const rol = localStorage.getItem("rol");
  const name = localStorage.getItem("nombre");
  const id = localStorage.getItem("user_id");

  // Si alguno está ausente, se borra todo para evitar errores
  if (!token || !rol || !email || !id) {
    localStorage.clear();
    setIsAuthenticated(false);
    setUser(null);
    setIsLoading(false);
    return;
  }

  setUser({
    id: parseInt(id),
    email,
    rol,
    name,
  });
  setIsAuthenticated(true);
  setIsLoading(false);
}, []);


  const login = async (email: string, password: string) => {
  try {
    const response = await axios.post("http://localhost:8000/api/users/login/", {
    email,
    password,
});


    const data = response.data;
    const decoded: any = jwtDecode(data.access); // decodifica JWT
   


localStorage.setItem("token", data.access);
localStorage.setItem("email", data.email);
localStorage.setItem("rol", data.rol);
localStorage.setItem("nombre", data.name);
localStorage.setItem("user_id", data.user_id);

    // Actualiza el estado del usuario en React
    setUser({
      id: decoded.user_id,
      email: decoded.email,
      name: `${decoded.first_name || ""} ${decoded.last_name || ""}`,
      rol: decoded.rol,
    });

    setIsAuthenticated(true);

    // Redirecciona manualmente
    window.location.href = "/dashboard";
  } catch (error: any) {
    console.error("Error en login:", error);
    throw error;
  }
};



  const logout = () => {
    localStorage.clear()
    setUser(null)
    setIsAuthenticated(false)
    window.location.href = "/login"
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
