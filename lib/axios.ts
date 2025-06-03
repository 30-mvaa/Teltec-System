import axios from "axios"

// Crear una instancia de axios con configuración básica
const apiClient = axios.create({
  baseURL: "http://localhost:8000", // Asegúrate de que esta URL sea correcta
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Para manejar cookies de sesión si es necesario
})

// Interceptor para agregar token de autenticación
apiClient.interceptors.request.use(
  (config) => {
    // Obtener token del almacenamiento local
    const token = localStorage.getItem("access_token")

    // Si hay token, agregarlo a los headers
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Interceptor para manejar errores de respuesta
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Manejar errores 401 (no autorizado)
    if (error.response?.status === 401) {
      // Limpiar tokens
      localStorage.removeItem("access_token")
      localStorage.removeItem("refresh_token")

      // Opcional: redirigir a login
      // window.location.href = '/login'
    }

    return Promise.reject(error)
  },
)

export default apiClient
