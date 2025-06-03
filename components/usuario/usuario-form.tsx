"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { createUsuario, updateUsuario, getUsuarioById, type UsuarioInput } from "@/lib/services/usuario-services"

interface UsuarioFormProps {
  usuarioId?: number
  onSuccess?: () => void
  onCancel?: () => void
}

export function UsuarioForm({ usuarioId, onSuccess, onCancel }: UsuarioFormProps) {
  const [formData, setFormData] = useState<UsuarioInput>({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    role: "administrador",
    password: "",
    confirmPassword: "",
    is_active: true,
  })
  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isEditing = Boolean(usuarioId)

  // Cargar datos del usuario si estamos en modo edición
  useEffect(() => {
    if (usuarioId) {
      const fetchUsuario = async () => {
        try {
          setLoadingData(true)
          setError(null)
          const data = await getUsuarioById(usuarioId)
          setFormData({
            username: data.username || "",
            email: data.email || "",
            first_name: data.first_name || "",
            last_name: data.last_name || "",
            role: data.role || "administrador",
            password: "",
            confirmPassword: "",
            is_active: data.is_active ?? true,
          })
        } catch (err: any) {
          console.error("Error al cargar usuario:", err)
          setError("No se pudo cargar la información del usuario")
        } finally {
          setLoadingData(false)
        }
      }

      fetchUsuario()
    }
  }, [usuarioId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Limpiar error cuando el usuario empiece a escribir
    if (error) setError(null)
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, is_active: checked }))
  }

  const validateForm = () => {
    // Validar campos requeridos
    if (!formData.username?.trim()) {
      setError("El nombre de usuario es obligatorio")
      return false
    }

    if (!formData.email?.trim()) {
      setError("El correo electrónico es obligatorio")
      return false
    }

    if (!formData.first_name?.trim()) {
      setError("El nombre es obligatorio")
      return false
    }

    if (!formData.last_name?.trim()) {
      setError("El apellido es obligatorio")
      return false
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError("El formato del correo electrónico no es válido")
      return false
    }

    // Validar contraseña solo si es nuevo usuario o si se proporciona
    if (!isEditing || (formData.password && formData.password.trim() !== "")) {
      if (!formData.password || formData.password.length < 6) {
        setError("La contraseña debe tener al menos 6 caracteres")
        return false
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Las contraseñas no coinciden")
        return false
      }
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!validateForm()) {
      return
    }

    try {
      setLoading(true)

      // Preparar los datos para enviar
      const dataToSubmit: UsuarioInput = {
        username: formData.username.trim(),
        email: formData.email.trim(),
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        role: formData.role,
        is_active: formData.is_active,
      }

      // Solo incluir password si se proporciona
      if (formData.password && formData.password.trim() !== "") {
        dataToSubmit.password = formData.password
      }

      console.log("Enviando datos:", dataToSubmit)

      let result
      if (isEditing && usuarioId) {
        result = await updateUsuario(usuarioId, dataToSubmit)
        console.log("Usuario actualizado:", result)
      } else {
        result = await createUsuario(dataToSubmit)
        console.log("Usuario creado:", result)
      }

      // Llamar callback de éxito
      if (onSuccess) {
        onSuccess()
      }
    } catch (err: any) {
      console.error("Error al guardar usuario:", err)

      let errorMessage = "Ocurrió un error al procesar la solicitud"

      if (err.response?.data) {
        if (typeof err.response.data === "object") {
          // Formatear errores de validación del backend
          const errors = []
          for (const [field, fieldErrors] of Object.entries(err.response.data)) {
            if (Array.isArray(fieldErrors)) {
              errors.push(`${field}: ${fieldErrors.join(", ")}`)
            } else {
              errors.push(`${field}: ${fieldErrors}`)
            }
          }
          errorMessage = errors.join("\n")
        } else if (typeof err.response.data === "string") {
          errorMessage = err.response.data
        }
      } else if (err.message) {
        errorMessage = err.message
      }

      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  if (loadingData) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
          <p>Cargando información del usuario...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <Card className="border-red-500 bg-red-50 dark:bg-red-950/20">
            <CardContent className="p-4">
              <div className="text-red-600 dark:text-red-400">
                <p className="whitespace-pre-line">{error}</p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="first_name">Nombre *</Label>
            <Input
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last_name">Apellido *</Label>
            <Input
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="username">Nombre de Usuario *</Label>
            <Input
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Correo Electrónico *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="role">Rol *</Label>
          <Select value={formData.role} onValueChange={handleSelectChange} disabled={loading}>
            <SelectTrigger id="role">
              <SelectValue placeholder="Seleccione un rol" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="administrador">Administrador</SelectItem>
              <SelectItem value="atencion_cliente">Atención al Cliente</SelectItem>
              <SelectItem value="cobros">Cobros</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="password">{isEditing ? "Nueva Contraseña (opcional)" : "Contraseña *"}</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required={!isEditing}
              disabled={loading}
              placeholder={isEditing ? "Dejar vacío para mantener la actual" : ""}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar Contraseña {!isEditing && "*"}</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required={!isEditing || Boolean(formData.password && formData.password.trim() !== "")}
              disabled={loading}
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Switch id="is_active" checked={formData.is_active} onCheckedChange={handleSwitchChange} disabled={loading} />
          <Label htmlFor="is_active">Usuario Activo</Label>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
              Cancelar
            </Button>
          )}
          <Button type="submit" disabled={loading}>
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Guardando...
              </div>
            ) : isEditing ? (
              "Actualizar Usuario"
            ) : (
              "Crear Usuario"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
