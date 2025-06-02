// En frontend/src/lib/axios.ts
// En frontend/src/lib/axios.ts
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para añadir token a las peticiones - MODIFICADO
axiosInstance.interceptors.request.use(
  (config) => {
    // Verificar si estamos en el cliente
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ... (resto del código igual)

export default axiosInstance;
