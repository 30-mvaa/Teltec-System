"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import {
  HomeIcon,
  UsersIcon,
  CreditCardIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  // Otros iconos...
} from "@heroicons/react/24/outline"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  href: string
  icon: React.ForwardRefExoticComponent<any>
  roles: string[]
}

const navigation: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon, roles: ["administrador", "atencion_cliente", "cobros"] },
  { name: "Clientes", href: "/clientes", icon: UsersIcon, roles: ["administrador", "atencion_cliente", "cobros"] },
  { name: "Recaudación", href: "/pagos", icon: CreditCardIcon, roles: ["administrador", "cobros"] },
  { name: "Facturación", href: "/facturacion", icon: DocumentTextIcon, roles: ["administrador", "cobros"] },
  { name: "Configuración", href: "/configuracion", icon: Cog6ToothIcon, roles: ["administrador"] },
]

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuth()

  // Filtrar elementos de navegación según el rol del usuario
  const filteredNavigation = navigation.filter((item) => user && item.roles.includes(user.role))

  // Función para obtener el nombre legible del rol
  const getRoleName = (role: string) => {
    switch (role) {
      case "administrador":
        return "Administrador"
      case "atencion_cliente":
        return "Atención al Cliente"
      case "cobros":
        return "Cobros"
      default:
        return role
    }
  }

  return (
    <>
      {/* Resto del código del sidebar... */}
      
      {/* Perfil de usuario en la parte inferior */}
      <div className="flex-shrink-0 flex border-t border-gray-700 p-4">
        <div className="flex-shrink-0 w-full group flex items-center">
          <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-700">
              {user?.first_name ? user.first_name.charAt(0) : "U"}
            </span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-white">
              {user?.first_name} {user?.last_name}
            </p>
            <p className="text-xs text-gray-400">
              {user?.role ? getRoleName(user.role) : "Usuario"}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}