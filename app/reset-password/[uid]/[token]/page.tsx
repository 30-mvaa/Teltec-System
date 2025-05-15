"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import axios from "@/lib/axios"
import toast from "react-hot-toast"

// Schema de validación
const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .required("La contraseña es obligatoria"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
    .required("Confirma tu contraseña"),
})

export default function ResetPasswordPage() {
  const params = useParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [resetSuccess, setResetSuccess] = useState(false)

  const { uid, token } = params as { uid: string; token: string }

  const handleSubmit = async (values: { password: string; confirmPassword: string }) => {
    setIsLoading(true)
    try {
      await axios.post(`/users/reset-password/${uid}/${token}/`, {
        new_password: values.password,
      })
      setResetSuccess(true)
      toast.success("Contraseña restablecida correctamente")
      setTimeout(() => {
        router.push("/login")
      }, 3000)
    } catch (error) {
      console.error("Error al restablecer contraseña:", error)
      toast.error("El enlace no es válido o ha expirado")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-center text-3xl font-extrabold text-blue-600">Teltec Net</h1>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Restablecer Contraseña</h2>
        </div>

        {resetSuccess ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-green-600 mb-2">¡Contraseña restablecida!</h3>
            <p className="text-gray-600 mb-4">Tu contraseña ha sido restablecida correctamente.</p>
            <p className="text-gray-600 mb-4">Serás redirigido al inicio de sesión en unos segundos...</p>
          </div>
        ) : (
          <Formik
            initialValues={{ password: "", confirmPassword: "" }}
            validationSchema={ResetPasswordSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className="mt-8 space-y-6">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Nueva contraseña
                  </label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    className={`mt-1 block w-full px-3 py-2 border ${
                      errors.password && touched.password ? "border-red-300" : "border-gray-300"
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirmar contraseña
                  </label>
                  <Field
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    className={`mt-1 block w-full px-3 py-2 border ${
                      errors.confirmPassword && touched.confirmPassword ? "border-red-300" : "border-gray-300"
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    {isLoading ? "Procesando..." : "Restablecer contraseña"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  )
}