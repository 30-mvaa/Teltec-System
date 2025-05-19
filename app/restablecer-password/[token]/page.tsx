"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, Lock, ArrowLeft, CheckCircle, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function RestablecerPasswordPage({ params }: { params: { token: string } }) {
  const router = useRouter()
  const { token } = params
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [verifying, setVerifying] = useState(true)
  const [submitted, setSubmitted] = useState(false)
  const [tokenValid, setTokenValid] = useState<boolean | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  })

  // Verificar validez del token al cargar la página
  useEffect(() => {
    const verifyToken = async () => {
      try {
        // Verificar el token con el backend
        const response = await fetch(`/api/auth/verificar-token?token=${token}`);
        const data = await response.json();
        
        setTokenValid(response.ok);
        
        if (!response.ok) {
          setError(data.message || 'Token inválido o expirado');
        }
      } catch (error) {
        console.error('Error al verificar token:', error);
        setTokenValid(false);
        setError('Error al verificar el token. Por favor, solicite un nuevo enlace.');
      } finally {
        setVerifying(false);
      }
    };

    verifyToken();
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    setLoading(true);

    try {
      // Enviar solicitud al endpoint de restablecimiento
      const response = await fetch('/api/auth/restablecer-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al restablecer la contraseña');
      }

      // Si todo va bien, mostrar mensaje de éxito
      setSubmitted(true);
      
      // Redirigir al login después de 3 segundos
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (error: any) {
      console.error('Error:', error);
      setError(error.message || 'Ocurrió un error al restablecer la contraseña. Por favor, inténtelo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  // Mostrar mensaje de carga mientras se verifica el token
  if (verifying) {
    return (
      <div className="min-h-screen bg-[#111827] py-8">
        <div className="mx-auto max-w-md px-4">
          <div className="flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-blue-500"></div>
          </div>
          <p className="mt-4 text-center text-white">Verificando enlace...</p>
        </div>
      </div>
    );
  }

  // Mostrar mensaje de error si el token no es válido
  if (tokenValid === false) {
    return (
      <div className="min-h-screen bg-[#111827] py-8">
        <div className="mx-auto max-w-md px-4">
          <div className="rounded-lg border border-gray-800 bg-[#1a2236] p-6 shadow-xl md:p-8">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-red-900/20 p-3">
                <AlertTriangle className="h-6 w-6 text-red-400" />
              </div>
            </div>
            <h2 className="mb-6 text-center text-2xl font-bold text-white">Enlace inválido</h2>
            <p className="mb-6 text-center text-gray-400">
              {error || 'El enlace para restablecer la contraseña es inválido o ha expirado.'}
            </p>
            <Button
              asChild
              className="h-12 w-full rounded-md bg-[#3b82f6] text-base font-medium text-white hover:bg-blue-600"
            >
              <Link href="/recuperar-password">Solicitar nuevo enlace</Link>
            </Button>
          </div>
        </div>
      </div>
    );
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
          <h2 className="mb-2 text-center text-2xl font-bold text-white">Restablecer Contraseña</h2>
          <p className="mb-6 text-center text-gray-400">
            Ingresa tu nueva contraseña
          </p>

          {error && (
            <Alert variant="destructive" className="mb-4 border-red-800 bg-red-900/20 text-red-400">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {submitted ? (
            <div className="space-y-6">
              <div className="rounded-lg bg-green-900/20 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-400">Contraseña actualizada</h3>
                    <div className="mt-2 text-sm text-green-300">
                      <p>
                        Tu contraseña ha sido actualizada correctamente. Serás redirigido a la página de inicio de sesión.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Nueva Contraseña
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
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <p className="text-xs text-gray-400">La contraseña debe tener al menos 8 caracteres</p>
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
                    minLength={8}
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
                    Actualizando...
                  </div>
                ) : (
                  "Restablecer Contraseña"
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}