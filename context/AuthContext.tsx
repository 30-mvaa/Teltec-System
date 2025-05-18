// En frontend/src/context/AuthContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

// Definir la estructura del usuario
interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
}

// Definir la estructura del contexto
interface AuthContextType {
  
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading?: boolean;
}

// Crear el contexto
const AuthContext = createContext<AuthContextType | null>(null);

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

// Proveedor del contexto
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Función de login simplificada
  const login = async (email: string, password: string): Promise<void> => {
    console.log("Intentando iniciar sesión...", { email });

    try {
      const response = await axios.post("http://localhost:8000/api/users/login/", { 
        email, 
        password 
      });
      
      console.log("Respuesta de login:", response.data);

      // Guardar tokens
      localStorage.setItem("token", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);

      // Decodificar token para obtener info del usuario
      const decoded: any = jwtDecode(response.data.access);
      console.log("Token decodificado:", decoded);

      // Establecer usuario y estado de autenticación
      setUser({
        id: response.data.user_id || decoded.user_id,
        email: response.data.email || decoded.email,
        first_name: response.data.first_name || decoded.first_name || "",
        last_name: response.data.last_name || decoded.last_name || "",
        role: response.data.role || decoded.role || "atencion_cliente",
      });
      
      setIsAuthenticated(true);
      console.log("Login exitoso");
      
      // Redirigir manualmente
      window.location.href = "/dashboard";
    } catch (error: any) {
      console.error("Error en login:", error);
      throw error;
    }
  };

  // Función de logout simplificada
  const logout = () => {
    console.log("Cerrando sesión...");

    // Limpiar localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");

    // Actualizar estado
    setUser(null);
    setIsAuthenticated(false);

    // Redirigir manualmente
    window.location.href = "/login";
  };

  // Valor del contexto
  const value: AuthContextType = {
    user,
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;