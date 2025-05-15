import axios from "axios"

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

    // If token exists, add it to the headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    // Check if error.response exists before accessing its properties
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // Get the refresh token
        const refreshToken = localStorage.getItem("refreshToken")

        if (!refreshToken) {
          // If no refresh token, logout the user
          if (typeof window !== "undefined") {
            localStorage.removeItem("token")
            localStorage.removeItem("refreshToken")
            window.location.href = "/login"
          }
          return Promise.reject(error)
        }

        // Try to get a new token
        const response = await axios.post(`${baseURL}/users/login/refresh/`, {
          refresh: refreshToken,
        })

        // If successful, save the new token
        if (response.data.access) {
          localStorage.setItem("token", response.data.access)

          // Update the original request with the new token
          originalRequest.headers.Authorization = `Bearer ${response.data.access}`

          // Retry the original request
          return axiosInstance(originalRequest)
        }
      } catch (refreshError) {
        // If refresh fails, logout the user
        if (typeof window !== "undefined") {
          localStorage.removeItem("token")
          localStorage.removeItem("refreshToken")
          window.location.href = "/login"
        }
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

export default axiosInstance
