import apiClient from "../axios"

// Definir las interfaces necesarias
export interface Usuario {
  id?: number
  username: string
  email: string
  first_name: string
  last_name: string
  role: string
  is_active: boolean
  date_joined?: string
}

export interface UsuarioInput {
  username: string
  email: string
  first_name: string
  last_name: string
  role: string
  password?: string
  confirmPassword?: string
  is_active: boolean
}

export interface UsuarioSearchParams {
  search?: string
  page?: number
  pageSize?: number
}

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

// Función para crear un nuevo usuario
export async function createUsuario(usuario: UsuarioInput): Promise<Usuario> {
  try {
    console.log("Datos enviados al servidor:", usuario)

    // Preparar los datos para el backend Django
    const userData = {
      username: usuario.username,
      email: usuario.email,
      first_name: usuario.first_name,
      last_name: usuario.last_name,
      role: usuario.role,
      is_active: usuario.is_active,
      ...(usuario.password && { password: usuario.password }),
    }

    const response = await apiClient.post("/api/users/register/", userData)
    console.log("Respuesta del servidor:", response.data)
    return response.data
  } catch (error: any) {
    console.error("Error al crear usuario:", error)
    if (error.response) {
      console.error("Datos de respuesta:", error.response.data)
      console.error("Estado HTTP:", error.response.status)
    }
    throw error
  }
}

// Función para obtener usuarios
export async function getUsuarios(params: UsuarioSearchParams = {}): Promise<PaginatedResponse<Usuario>> {
  try {
    const response = await apiClient.get("/api/users/", {
      params: {
        search: params.search || "",
        page: params.page || 1,
        page_size: params.pageSize || 10,
      },
    })
    return response.data
  } catch (error) {
    console.error("Error al obtener usuarios:", error)
    throw error
  }
}

// Función para obtener un usuario por ID
export async function getUsuarioById(id: number): Promise<Usuario> {
  try {
    const response = await apiClient.get(`/api/users/${id}/`)
    return response.data
  } catch (error) {
    console.error(`Error al obtener usuario con ID ${id}:`, error)
    throw error
  }
}

// Función para actualizar un usuario
export async function updateUsuario(id: number, usuario: UsuarioInput): Promise<Usuario> {
  try {
    // Preparar los datos para el backend Django
    const userData = {
      username: usuario.username,
      email: usuario.email,
      first_name: usuario.first_name,
      last_name: usuario.last_name,
      role: usuario.role,
      is_active: usuario.is_active,
      ...(usuario.password && usuario.password.trim() !== "" && { password: usuario.password }),
    }

    const response = await apiClient.put(`/api/users/${id}/`, userData)
    return response.data
  } catch (error) {
    console.error(`Error al actualizar usuario con ID ${id}:`, error)
    throw error
  }
}

// Función para eliminar un usuario
export async function deleteUsuario(id: number): Promise<void> {
  try {
    await apiClient.delete(`/api/users/${id}/`)
  } catch (error) {
    console.error(`Error al eliminar usuario con ID ${id}:`, error)
    throw error
  }
}
