// app/configuracion/tabs/EmpresaTab.tsx
"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export default function EmpresaTab() {
  const [empresaForm, setEmpresaForm] = useState({
    nombre: "Mi Empresa ISP",
    ruc: "9999999999001",
    direccion: "Av. Principal 123",
    telefono: "0991234567",
    email: "contacto@miempresa.com",
    sitioWeb: "www.miempresa.com",
  })

  const handleEmpresaInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEmpresaForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleEmpresaSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Configuración de empresa guardada correctamente")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Información de la Empresa</CardTitle>
        <CardDescription>Configure la información básica de su empresa</CardDescription>
      </CardHeader>
      <form onSubmit={handleEmpresaSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre de la Empresa</Label>
              <Input id="nombre" name="nombre" value={empresaForm.nombre} onChange={handleEmpresaInputChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ruc">RUC</Label>
              <Input id="ruc" name="ruc" value={empresaForm.ruc} onChange={handleEmpresaInputChange} required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="direccion">Dirección</Label>
            <Input id="direccion" name="direccion" value={empresaForm.direccion} onChange={handleEmpresaInputChange} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="telefono">Teléfono</Label>
              <Input id="telefono" name="telefono" value={empresaForm.telefono} onChange={handleEmpresaInputChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input id="email" name="email" type="email" value={empresaForm.email} onChange={handleEmpresaInputChange} required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="sitioWeb">Sitio Web</Label>
            <Input id="sitioWeb" name="sitioWeb" value={empresaForm.sitioWeb} onChange={handleEmpresaInputChange} />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">Guardar Cambios</Button>
        </CardFooter>
      </form>
    </Card>
  )
}
