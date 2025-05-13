"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Mail, CheckCircle, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function RecuperarPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      // In a real app, this would be an API call to send recovery email
      console.log("Recuperación solicitada para:", email)
      setLoading(false)
      setSubmitted(true)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-[#111827] py-8">
      <div className="mx-auto max-w-md px-4">
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
          <h2 className="mb-2 text-center text-2xl font-bold text-white">Recuperar Contraseña</h2>
          <p className="mb-6 text-center text-gray-400">
            Ingrese su correo electrónico para recibir instrucciones de recuperación
          </p>

          {submitted ? (
            <div className="space-y-6">
              <div className="rounded-lg bg-green-900/20 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-400">Correo enviado</h3>
                    <div className="mt-2 text-sm text-green-300">
                      <p>
                        Hemos enviado instrucciones para recuperar su contraseña a {email}. Por favor revise su bandeja
                        de entrada.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <Button
                asChild
                className="h-12 w-full rounded-md bg-[#3b82f6] text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                <Link href="/login">Volver a Iniciar Sesión</Link>
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
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
                    type="email"
                    placeholder="nombre@ejemplo.com"
                    className="h-12 w-full rounded-md border border-gray-700 bg-gray-900 pl-10 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
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
                    Enviando...
                  </div>
                ) : (
                  "Enviar Instrucciones"
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
