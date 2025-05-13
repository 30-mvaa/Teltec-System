import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#111827]">
      <div className="flex flex-col items-center space-y-6 px-4 text-center">
        <h1 className="text-6xl font-bold tracking-tight md:text-7xl">
          <span className="text-white">Tel</span>
          <span className="text-[#3b82f6]">Tec</span>
            <span className="text-[#28f061]"> Net</span>
        </h1>

        <p className="text-lg text-gray-400">Sistema de Administración</p>

        <div className="mt-4">
          <Button
            asChild
            className="h-12 min-w-[200px] rounded-md bg-white px-8 text-base font-medium text-gray-900 hover:bg-gray-100"
          >
            <Link href="/login">Iniciar Sesión</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
