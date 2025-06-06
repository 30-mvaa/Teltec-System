"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import EmpresaTab from "./tabs/EmpresaTab"
import PlanesTab from "./tabs/PlanesTab"
import UsuariosTab from "./tabs/UsuariosTab"
import SriTab from "./tabs/SriTab"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ConfiguracionPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    
    if (!isLoading && user) {
      console.log("ROL ACTUAL:", user.rol);
      if (user.rol !== "administrador") {
        router.push("/dashboard")
      }
    }
  }, [user, isLoading, router])

  if (isLoading || user?.rol !== "administrador") return null;
    console.log("Usuario completo:", user);
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
        <p className="text-muted-foreground">
          Administre la configuración del sistema y los parámetros de la aplicación.
        </p>
      </div>

      <Tabs defaultValue="empresa" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="empresa">Empresa</TabsTrigger>
          <TabsTrigger value="planes">Planes</TabsTrigger>
          <TabsTrigger value="usuarios">Usuarios</TabsTrigger>
          <TabsTrigger value="sri">SRI</TabsTrigger>
        </TabsList>

        <TabsContent value="empresa">
          <EmpresaTab />
        </TabsContent>

        <TabsContent value="planes">
          <PlanesTab />
        </TabsContent>

        <TabsContent value="usuarios">
          <UsuariosTab />
        </TabsContent>

        <TabsContent value="sri">
          <SriTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
