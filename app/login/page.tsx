/* // En frontend/src/app/login/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

// Schema de validación
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Email inválido").required("El email es obligatorio"),
  password: Yup.string().required("La contraseña es obligatoria"),
});

export default function LoginPage() {
  const { login, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Asegurarse de que el código cliente solo se ejecute después de la hidratación
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Redireccionar si ya está autenticado
  useEffect(() => {
    if (isClient && !isLoading && isAuthenticated) {
      console.log("Usuario ya autenticado, redirigiendo al dashboard");
      router.push("/dashboard");
    }
  }, [isAuthenticated, isLoading, router, isClient]);

  const handleSubmit = async (values: { email: string; password: string }) => {
    console.log("Enviando formulario de login...", values);
    setIsSubmitting(true);

    try {
      await login(values.email, values.password);
      toast.success("Inicio de sesión exitoso");
    } catch (error: any) {
      console.error("Error en login:", error);

      // Mostrar mensaje de error específico del backend si existe
      const errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.error ||
        "Error al iniciar sesión. Por favor, verifica tus credenciales.";

      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mostrar spinner mientras se verifica la autenticación
  if (isLoading || (isAuthenticated && isClient)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#111827] px-4">
      <Link href="/" className="mb-8 text-4xl font-bold tracking-tight md:text-5xl">
        <span className="text-white">Tel</span>
        <span className="text-[#3b82f6]">Tec</span>
        <span className="text-[#28f061]"> Net</span>
      </Link>

      <div className="w-full max-w-md rounded-lg border border-gray-800 bg-[#1a2236] p-8 shadow-xl">
        <h2 className="mb-6 text-center text-2xl font-bold text-white">Iniciar Sesión</h2>

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
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Contraseña
              </label>
              <Link href="/recuperar-password" className="text-sm text-blue-400 hover:text-blue-300">
                ¿Olvidó su contraseña?
              </Link>
            </div>
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
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Iniciando sesión...
              </div>
            ) : (
              "Iniciar Sesión"
            )}
          </Button>

          <div className="text-center text-sm text-gray-400">
            ¿No tiene una cuenta?{" "}
            <Link href="/registro" className="font-medium text-blue-400 hover:text-blue-300">
              Registrarse
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
*/


// En frontend/src/app/login/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";



// Esquema de validación
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Email inválido").required("El email es obligatorio"),
  password: Yup.string().required("La contraseña es obligatoria").min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export default function LoginPage() {
  const { login, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && !isLoading && isAuthenticated) {
      console.log("Usuario ya autenticado, redirigiendo al dashboard");
      setTimeout(() => {
        router.push("/dashboard");
      }, 100);
    }
  }, [isAuthenticated, isLoading, isClient, router]);

  console.log("Estado antes de login:", { isAuthenticated, isLoading });

  const handleSubmit = async (values: { email: string; password: string }) => {
    console.log("Enviando formulario de login...", values);
    setIsSubmitting(true);
    try {
      await login(values.email, values.password);
      toast.success("Inicio de sesión exitoso");
      setTimeout(() => {
        router.push("/dashboard");
      }, 100);
    } catch (error: any) {
      console.error("Error en login:", error);
      const errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.error ||
        "Error al iniciar sesión. Por favor, verifica tus credenciales.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || (isAuthenticated && isClient)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#111827] px-4">
      <Link href="/" className="mb-8 text-4xl font-bold tracking-tight md:text-5xl">
        <span className="text-white">Tel</span>
        <span className="text-[#3b82f6]">Tec</span>
        <span className="text-[#28f061]"> Net</span>
      </Link>

      <div className="w-full max-w-md rounded-lg border border-gray-800 bg-[#1a2236] p-8 shadow-xl">
        <h2 className="mb-6 text-center text-2xl font-bold text-white">Iniciar Sesión</h2>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Mail className="h-5 w-5 text-gray-500" />
                  </div>
                  <Field
                    type="email"
                    name="email"
                    placeholder="nombre@ejemplo.com"
                    className="h-12 w-full rounded-md border border-gray-700 bg-gray-900 pl-10 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-400" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                    Contraseña
                  </label>
                  <Link href="/recuperar-password" className="text-sm text-blue-400 hover:text-blue-300">
                    ¿Olvidó su contraseña?
                  </Link>
                </div>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Lock className="h-5 w-5 text-gray-500" />
                  </div>
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    className="h-12 w-full rounded-md border border-gray-700 bg-gray-900 pl-10 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                  <ErrorMessage name="password" component="div" className="mt-1 text-sm text-red-400" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="h-12 w-full rounded-md bg-[#3b82f6] text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="mr-2 h-5 w-5 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Iniciando sesión...
                  </div>
                ) : (
                  "Iniciar Sesión"
                )}
              </button>

              <div className="text-center text-sm text-gray-400">
                ¿No tiene una cuenta?{" "}
                <Link href="/registro" className="font-medium text-blue-400 hover:text-blue-300">
                  Registrarse
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
