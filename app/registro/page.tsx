"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function RegistroPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    confirmPassword: "",
    rol: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, rol: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden")
      return
    }

    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      // In a real app, this would be an API call to register
      console.log("Registro con:", formData)
      setLoading(false)
      router.push("/login")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-[#111827] py-8">
      <div className="mx-auto max-w-2xl px-4">
        <Link href="/login" className="mb-6 inline-flex items-center text-sm text-gray-400 hover:text-white">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a Iniciar Sesión
        </Link>

        <div className="mb-8 text-center">
          <Link href="/" className="text-4xl font-bold tracking-tight md:text-5xl">
            <span className="text-white">Tel</span>
            <span className="text-[#3b82f6]">Tec</span>
          </Link>
        </div>

        <div className="rounded-lg border border-gray-800 bg-[#1a2236] p-6 shadow-xl md:p-8">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">Crear Cuenta</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-300">
                  Nombre
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <User className="h-5 w-5 text-gray-500" />
                  </div>
                  <Input
                    id="nombre"
                    name="nombre"
                    placeholder="Juan"
                    className="h-12 w-full rounded-md border border-gray-700 bg-gray-900 pl-10 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="apellido" className="block text-sm font-medium text-gray-300">
                  Apellido
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <User className="h-5 w-5 text-gray-500" />
                  </div>
                  <Input
                    id="apellido"
                    name="apellido"
                    placeholder="Pérez"
                    className="h-12 w-full rounded-md border border-gray-700 bg-gray-900 pl-10 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                    value={formData.apellido}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Correo Electrónico
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="nombre@ejemplo.com"
                  className="h-12 w-full rounded-md border border-gray-700 bg-gray-900 pl-10 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="rol" className="block text-sm font-medium text-gray-300">
                Rol
              </label>
              <Select onValueChange={handleSelectChange} required>
                <SelectTrigger className="h-12 w-full rounded-md border border-gray-700 bg-gray-900 text-white focus:border-blue-500 focus:ring-blue-500">
                  <SelectValue placeholder="Seleccione un rol" />
                </SelectTrigger>
                <SelectContent className="border-gray-700 bg-gray-900 text-white">
                  <SelectItem value="administrador" className="focus:bg-gray-800">
                    Administrador
                  </SelectItem>
                  <SelectItem value="atencion_cliente" className="focus:bg-gray-800">
                    Atención al Cliente
                  </SelectItem>
                  <SelectItem value="cobros" className="focus:bg-gray-800">
                    Cobros
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Contraseña
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Lock className="h-5 w-5 text-gray-500" />
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="h-12 w-full rounded-md border border-gray-700 bg-gray-900 pl-10 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                  Confirmar Contraseña
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Lock className="h-5 w-5 text-gray-500" />
                  </div>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="h-12 w-full rounded-md border border-gray-700 bg-gray-900 pl-10 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="h-12 w-full rounded-md bg-[#3b82f6] text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="mr-2 h-5 w-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Registrando...
                </div>
              ) : (
                "Crear Cuenta"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
