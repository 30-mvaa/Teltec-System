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
  { name: "Recaudación", href: "/recaudacion", icon: CreditCardIcon, roles: ["administrador", "cobros"] },
  { name: "Facturación", href: "/facturacion", icon: DocumentTextIcon, roles: ["administrador", "cobros"] },
  { name: "Configuración", href: "/configuracion", icon: Cog6ToothIcon, roles: ["administrador"] },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const filteredNavigation = navigation.filter((item) => user && item.roles.includes(user.rol))

  const getRoleName = (rol: string) => {
    switch (rol) {
      case "administrador":
        return "Administrador"
      case "atencion_cliente":
        return "Atención al Cliente"
      case "cobros":
        return "Cobros"
      default:
        return rol
    }
  }

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen flex flex-col justify-between">
      <div className="space-y-6">
        <div className="p-4 text-xl font-bold">TelTec Admin</div>

        <nav className="space-y-1 px-2">
          {filteredNavigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center px-3 py-2 rounded-md text-sm font-medium transition",
                  isActive
                    ? "bg-gray-800 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                )}
              >
                <item.icon className="h-5 w-5 mr-3 text-gray-400 group-hover:text-white" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Perfil del usuario en la parte inferior */}
      <div className="border-t border-gray-800 p-4">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-900 font-bold">
            {user?.first_name?.[0] ?? "U"}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">
              {user?.first_name} {user?.last_name}
            </p>
            <p className="text-xs text-gray-400">{getRoleName(user?.rol)}</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
