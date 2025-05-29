"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, Search, Trash2, UserPlus } from "lucide-react"

const clientesData = [
  {
    id: 1,
    cedula: "1234567890",
    nombres: "Juan Carlos",
    apellidos: "Pérez Gómez",
    fecha_nacimiento: "1990-01-01",
    edad: "34",
    direccion: "Av. Principal 123",
    sector: "Norte",
    email: "juan.perez@ejemplo.com",
    telefono: "0991234567",
    estado: "activo",
    fecha_registro: "2024-01-01",
  },
]

export default function ClientesPage() {
  const [clientes, setClientes] = useState(clientesData)
  const [openDialog, setOpenDialog] = useState(false)
  const [currentCliente, setCurrentCliente] = useState<any>(null)
  const [formData, setFormData] = useState({
    cedula: "",
    nombres: "",
    apellidos: "",
    fecha_nacimiento: "",
    edad: "",
    direccion: "",
    sector: "",
    email: "",
    telefono: "",
    estado: "activo",
    fecha_registro: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === "edad" || name === "cedula" || name === "telefono") {
      if (!/^[0-9]*$/.test(value)) return
    }
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleOpenDialog = (cliente: any = null) => {
    if (cliente) {
      setCurrentCliente(cliente)
      setFormData(cliente)
    } else {
      setCurrentCliente(null)
      setFormData({
        cedula: "",
        nombres: "",
        apellidos: "",
        fecha_nacimiento: "",
        edad: "",
        direccion: "",
        sector: "",
        email: "",
        telefono: "",
        estado: "activo",
        fecha_registro: "",
      })
    }
    setOpenDialog(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentCliente) {
      setClientes((prev) => prev.map((c) => (c.id === currentCliente.id ? { ...formData, id: currentCliente.id } : c)))
    } else {
      const newId = Math.max(...clientes.map((c) => c.id)) + 1
      setClientes((prev) => [...prev, { ...formData, id: newId }])
    }
    setOpenDialog(false)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Clientes</CardTitle>
            <CardDescription>Gestión de clientes del sistema</CardDescription>
          </div>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()}>
                <UserPlus className="mr-2 h-4 w-4" /> Nuevo Cliente
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{currentCliente ? "Editar Cliente" : "Nuevo Cliente"}</DialogTitle>
                <DialogDescription>
                  {currentCliente
                    ? "Actualice la información del cliente."
                    : "Complete el formulario para registrar un nuevo cliente."}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cedula">Cédula</Label>
                      <Input id="cedula" name="cedula" value={formData.cedula} onChange={handleInputChange} required />
                    </div>
                    <div>
                      <Label htmlFor="estado">Estado</Label>
                      <Select value={formData.estado} onValueChange={(value) => handleSelectChange("estado", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione estado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="activo">Activo</SelectItem>
                          <SelectItem value="inactivo">Inactivo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nombres">Nombres</Label>
                      <Input id="nombres" name="nombres" value={formData.nombres} onChange={handleInputChange} required />
                    </div>
                    <div>
                      <Label htmlFor="apellidos">Apellidos</Label>
                      <Input id="apellidos" name="apellidos" value={formData.apellidos} onChange={handleInputChange} required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fecha_nacimiento">Fecha de Nacimiento</Label>
                      <Input type="date" id="fecha_nacimiento" name="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={handleInputChange} required />
                    </div>
                    <div>
                      <Label htmlFor="edad">Edad</Label>
                      <Input id="edad" name="edad" value={formData.edad} onChange={handleInputChange} required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="direccion">Dirección</Label>
                      <Input id="direccion" name="direccion" value={formData.direccion} onChange={handleInputChange} required />
                    </div>
                    <div>
                      <Label htmlFor="sector">Sector</Label>
                      <Input id="sector" name="sector" value={formData.sector} onChange={handleInputChange} required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Correo Electrónico</Label>
                      <Input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
                    </div>
                    <div>
                      <Label htmlFor="telefono">Teléfono</Label>
                      <Input id="telefono" name="telefono" value={formData.telefono} onChange={handleInputChange} required />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="fecha_registro">Fecha de Registro</Label>
                    <Input type="date" id="fecha_registro" name="fecha_registro" value={formData.fecha_registro} onChange={handleInputChange} required />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Guardar</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cédula</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientes.map((cliente) => (
                <TableRow key={cliente.id}>
                  <TableCell>{cliente.cedula}</TableCell>
                  <TableCell>{cliente.nombres} {cliente.apellidos}</TableCell>
                  <TableCell>{cliente.email}</TableCell>
                  <TableCell>{cliente.telefono}</TableCell>
                  <TableCell>{cliente.estado}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleOpenDialog(cliente)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
