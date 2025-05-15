"use client";

import { createContext, useState, useEffect, useContext, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import axios, { AxiosError } from "axios";

// Definir la interfaz User
export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: "administrador" | "atencion_cliente" | "cobros";
}

// Interfaz para el token decodificado
interface DecodedToken {
  user_id: number;
  email: string;
  name?: string;
  role: string;
  exp: number;
}

// Interfaz para el contexto de autenticación
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Crear el contexto con un valor inicial de null
const AuthContext = createContext<AuthContextType | null>(null);

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Props para el proveedor de autenticación
interface AuthProviderProps {
  children: ReactNode;
}

// Proveedor de autenticación
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Función para validar un token JWT
  const validateToken = (token: string, expectedEmail?: string): User | null => {
    try {
      const decoded: DecodedToken = jwtDecode(token);
      
      // Verificar que el token contenga la información necesaria
      if (!decoded.user_id || !decoded.email || !decoded.role) {
        console.error("Token inválido - información faltante:", decoded);
        return null;
      }
      
      // Si se proporciona un email esperado, verificar que coincida con el del token
      if (expectedEmail && decoded.email !== expectedEmail) {
        console.error("El email en el token no coincide con el email proporcionado");
        return null;
      }
      
      // Verificar si el token ha expirado
      const currentTime = Date.now() / 1000;
      if (decoded.exp && decoded.exp < currentTime) {
        console.error("Token expirado");
        return null;
      }
      
      // Crear y devolver el objeto de usuario
      return {
        id: decoded.user_id,
        email: decoded.email,
        first_name: decoded.name?.split(" ")[0] || "",
        last_name: decoded.name?.split(" ").slice(1).join(" ") || "",
        role: decoded.role as "administrador" | "atencion_cliente" | "cobros",
      };
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      return null;
    }
  };

  // Efecto para verificar la autenticación al cargar la página
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        
        if (!token) {
          setIsLoading(false);
          return;
        }
        
        const validatedUser = validateToken(token);
        
        if (validatedUser) {
          setUser(validatedUser);
          setIsAuthenticated(true);
        } else {
          // Si el token no es válido, hacer logout
          logout();
        }
      } catch (error) {
        console.error("Error al verificar la autenticación:", error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Función para iniciar sesión
  const login = async (email: string, password: string) => {
    try {
      console.log(`Intentando iniciar sesión con email: ${email}`);
      
      // Obtener la URL base de la API
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
      console.log("URL base de la API:", baseUrl);
      
      // Realizar la solicitud de inicio de sesión directamente con axios
      const response = await axios.post(`${baseUrl}/users/login/`, 
        { email, password },
        { 
          headers: { 'Content-Type': 'application/json' },
          timeout: 10000 // 10 segundos de timeout
        }
      );
      
      console.log("Respuesta del servidor:", response.data);
      
      // Verificar que la respuesta contenga los tokens necesarios
      if (!response.data.access || !response.data.refresh) {
        console.error("Respuesta inválida del servidor - tokens faltantes:", response.data);
        throw new Error("Respuesta inválida del servidor. Faltan tokens de autenticación.");
      }
      
      const { access, refresh } = response.data;
      
      // Validar el token y obtener la información del usuario
      const validatedUser = validateToken(access, email);
      
      if (!validatedUser) {
        console.error("Token de acceso inválido o no coincide con el email proporcionado");
        throw new Error("Error de autenticación. Token inválido.");
      }
      
      // Guardar los tokens en localStorage
      localStorage.setItem("token", access);
      localStorage.setItem("refreshToken", refresh);
      
      // Actualizar el estado
      setUser(validatedUser);
      setIsAuthenticated(true);
      
      console.log("Autenticación exitosa:", validatedUser);
      
    } catch (error: unknown) {
      console.error("Error de inicio de sesión:", error);
      
      // Manejo detallado de errores
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<any>;
        if (axiosError.response) {
          // El servidor respondió con un código de estado fuera del rango 2xx
          console.error("Error de respuesta:", axiosError.response.data);
          const errorMessage = axiosError.response.data?.detail || "Credenciales inválidas. Por favor, inténtalo de nuevo.";
          throw new Error(errorMessage);
        } else if (axiosError.request) {
          // La solicitud se hizo pero no se recibió respuesta
          console.error("No se recibió respuesta:", axiosError.request);
          throw new Error("No se recibió respuesta del servidor. Por favor, verifica que el backend esté en ejecución.");
        } else {
          // Algo sucedió en la configuración de la solicitud que desencadenó un error
          console.error("Error de solicitud:", axiosError.message);
          throw new Error("Error al realizar la solicitud. Por favor, inténtalo de nuevo.");
        }
      } else if (error instanceof Error) {
        // Reenviar el error si ya es una instancia de Error
        throw error;
      } else {
        // Cualquier otro tipo de error
        throw new Error("Error de inicio de sesión. Por favor, inténtalo de nuevo.");
      }
    }
  };

  // Función para cerrar sesión
       const logout = () => {
          // Eliminar tokens
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          
          // Actualizar estado
          setUser(null);
          setIsAuthenticated(false);
          
          // Redireccionar
          window.location.href = '/login';
        };
  

  // Proporcionar el contexto a los componentes hijos
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Exportar el contexto y el proveedor
export default AuthContext;





