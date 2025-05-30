"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Users, CreditCard, FileText, Home, LogOut, Settings, User, Menu, X } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [userRole] = useState("administrador") // En una app real, esto vendría de un contexto de autenticación
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (path: string) => pathname === path

  const handleLogout = () => {
    // En una app real, aquí se haría el logout
    router.push("/login")
  }

  const menuItems = [
    {
      title: "Dashboard",
      icon: BarChart3,
      path: "/dashboard",
      roles: ["administrador", "atencion_cliente", "cobros"],
    },
    {
      title: "Clientes",
      icon: Users,
      path: "/clientes",
      roles: ["administrador", "atencion_cliente"],
    },
    {
      title: "Recaudación",
      icon: CreditCard,
      path: "/recaudacion",
      roles: ["administrador", "cobros"],
    },
    {
      title: "Facturación",
      icon: FileText,
      path: "/facturacion",
      roles: ["administrador", "cobros"],
    },
    {
      title: "Configuración",
      icon: Settings,
      path: "/configuracion",
      roles: ["administrador"],
    },
  ]

  // Filtrar elementos del menú según el rol del usuario
  const filteredMenuItems = menuItems.filter((item) => item.roles.includes(userRole))

  // Componente de menú que se reutiliza en la barra lateral y en el menú móvil
  const MenuItems = () => (
    <>
      {filteredMenuItems.map((item) => (
        <SidebarMenuItem key={item.path}>
          <SidebarMenuButton
            asChild
            isActive={isActive(item.path)}
            tooltip={item.title}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Link href={item.path} className="flex items-center gap-2">
              <item.icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </>
  )

  return (
    <>
      {/* Sidebar para pantallas medianas y grandes */}
      <Sidebar className="hidden md:block">
        <SidebarHeader className="flex h-14 items-center border-b px-4">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <Home className="h-5 w-5 text-indigo-600" />
            <span className="text-lg">ISP Manager</span>
          </Link>
          <div className="ml-auto md:hidden">
            <SidebarTrigger />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <MenuItems />
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="border-t p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/placeholder.svg?key=qq6kl" alt="Avatar" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start text-sm">
                  <span className="font-medium">Admin Usuario</span>
                  <span className="text-xs text-muted-foreground capitalize">{userRole}</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/perfil">
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/configuracion">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configuración</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar Sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </Sidebar>

      {/* Header móvil con menú desplegable */}
      <div className="sticky top-0 z-20 flex h-14 items-center justify-between border-b bg-background px-4 md:hidden">
        <div className="flex items-center gap-2">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[80%] max-w-[300px] p-0">
              <div className="flex h-14 items-center border-b px-4">
                <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
                  <Home className="h-5 w-5 text-indigo-600" />
                  <span className="text-lg">ISP Manager</span>
                </Link>
                <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setMobileMenuOpen(false)}>
                  <X className="h-5 w-5" />
                  <span className="sr-only">Cerrar</span>
                </Button>
              </div>
              <div className="py-4">
                <SidebarMenu>
                  <MenuItems />
                </SidebarMenu>
              </div>
              <div className="absolute bottom-0 left-0 right-0 border-t p-4">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?key=qq6kl" alt="Avatar" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Admin Usuario</span>
                    <span className="text-xs text-muted-foreground capitalize">{userRole}</span>
                  </div>
                  <Button variant="ghost" size="icon" className="ml-auto" onClick={handleLogout}>
                    <LogOut className="h-5 w-5" />
                    <span className="sr-only">Cerrar Sesión</span>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/dashboard" className="font-semibold">
            ISP Manager
          </Link>
        </div>
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.svg?key=qq6kl" alt="Avatar" />
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>
      </div>
    </>
  )
}
