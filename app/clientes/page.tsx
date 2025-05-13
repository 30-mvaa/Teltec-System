"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Edit, MoreVertical, Search, Trash2, UserPlus } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Datos de ejemplo para la tabla de clientes
const clientesData = [
  {
    
    id: 1,
    cedula: "1234567890",
    nombres: "Juan Carlos",
    apellidos: "Pérez Gómez",
    direccion: "Av. Principal 123",
    sector: "Norte",
    email: "juan.perez@ejemplo.com",
    telefono: "0991234567",
    estado: "activo",
  },
  {
    id: 2,
    cedula: "0987654321",
    nombres: "María Elena",
    apellidos: "González López",
    direccion: "Calle Secundaria 456",
    sector: "Sur",
    email: "maria.gonzalez@ejemplo.com",
    telefono: "0997654321",
    estado: "activo",
  },
  {
    id: 3,
    cedula: "1122334455",
    nombres: "Pedro José",
    apellidos: "Ramírez Torres",
    direccion: "Calle 10 y Avenida 5",
    sector: "Este",
    email: "pedro.ramirez@ejemplo.com",
    telefono: "0993456789",
    estado: "inactivo",
  },
  {
    id: 4,
    cedula: "5566778899",
    nombres: "Ana Lucía",
    apellidos: "Mendoza Ruiz",
    direccion: "Urbanización Las Palmas",
    sector: "Oeste",
    email: "ana.mendoza@ejemplo.com",
    telefono: "0998765432",
    estado: "activo",
  },
  {
    id: 5,
    cedula: "9988776655",
    nombres: "Roberto Carlos",
    apellidos: "Suárez Vega",
    direccion: "Ciudadela Los Ceibos",
    sector: "Centro",
    email: "roberto.suarez@ejemplo.com",
    telefono: "0994567890",
    estado: "inactivo",
  },
]
  

export default function ClientesPage() {
  const [clientes, setClientes] = useState(clientesData)
  const [searchTerm, setSearchTerm] = useState("")
  const [openDialog, setOpenDialog] = useState(false)
  const [currentCliente, setCurrentCliente] = useState<any>(null)
  const [formData, setFormData] = useState({
    cedula: "",
    nombres: "",
    apellidos: "",
    direccion: "",
    sector: "",
    email: "",
    telefono: "",
    estado: "activo",
  })

  // Filtrar clientes según el término de búsqueda
  //const filteredClientes = clientes.filter(
    //(cliente) =>
     //cliente.cedula.includes(searchTerm) ||
      //cliente.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
      //cliente.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
      //cliente.email.toLowerCase().includes(searchTerm.toLowerCase()),
  //)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
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
        direccion: "",
        sector: "",
        email: "",
        telefono: "",
        estado: "activo",
      })
    }
    setOpenDialog(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (currentCliente) {
      // Actualizar cliente existente
      setClientes((prev) => prev.map((c) => (c.id === currentCliente.id ? { ...formData, id: currentCliente.id } : c)))
    } else {
      // Agregar nuevo cliente
      const newId = Math.max(...clientes.map((c) => c.id)) + 1
      setClientes((prev) => [...prev, { ...formData, id: newId }])
    }

    setOpenDialog(false)
  }

  const handleDelete = (id: number) => {
    if (confirm("¿Está seguro que desea eliminar este cliente?")) {
      setClientes((prev) => prev.filter((c) => c.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Gestión de Clientes</h1>
        <p className="text-muted-foreground">Administre la información de los clientes del servicio de internet.</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center">
          <div>
            <CardTitle>Clientes</CardTitle>
            <CardDescription>Lista de clientes registrados en el sistema</CardDescription>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              
              <Input
               // type="search"
                placeholder="Buscar cliente..."
                className="w-64 pl-8"
                //value={searchTerm}
                onChange={ handleSearch }
              /> 

            </div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogTrigger asChild>
                
                <Button onClick={() => {/*handleOpenDialog()*/}}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Nuevo Cliente
                </Button>
                  
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>{currentCliente ? "Editar Cliente" : "Nuevo Cliente"}</DialogTitle>
                  <DialogDescription>
                    {currentCliente
                      ? "Actualice la información del cliente en el formulario a continuación."
                      : "Complete el formulario para registrar un nuevo cliente."}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cedula">Cédula/RUC</Label>
                        <Input
                          id="cedula"
                          name="cedula"
                          value={formData.cedula}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="estado">Estado</Label>
                        <Select value={formData.estado} onValueChange={(value) => handleSelectChange("estado", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione un estado" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="activo">Activo</SelectItem>
                            <SelectItem value="inactivo">Inactivo</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nombres">Nombres</Label>
                        <Input
                          id="nombres"
                          name="nombres"
                          value={formData.nombres}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="apellidos">Apellidos</Label>
                        <Input
                          id="apellidos"
                          name="apellidos"
                          value={formData.apellidos}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="direccion">Dirección</Label>
                      <Input
                        id="direccion"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="sector">Sector</Label>
                        <Select value={formData.sector} onValueChange={(value) => handleSelectChange("sector", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione un sector" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Norte">Norte</SelectItem>
                            <SelectItem value="Sur">Sur</SelectItem>
                            <SelectItem value="Este">Este</SelectItem>
                            <SelectItem value="Oeste">Oeste</SelectItem>
                            <SelectItem value="Centro">Centro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="telefono">Teléfono</Label>
                        <Input
                          id="telefono"
                          name="telefono"
                          value={formData.telefono}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Correo Electrónico</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setOpenDialog(false)}>
                      Cancelar
                    </Button>
                    <Button type="submit">{currentCliente ? "Actualizar" : "Guardar"}</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {/*}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cédula/RUC</TableHead>
                <TableHead>Nombres</TableHead>
                <TableHead>Apellidos</TableHead>
                <TableHead>Sector</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClientes.length > 0 ? (
                filteredClientes.map((cliente) => (
                  <TableRow key={cliente.id}>
                    <TableCell>{cliente.cedula}</TableCell>
                    <TableCell>{cliente.nombres}</TableCell>
                    <TableCell>{cliente.apellidos}</TableCell>
                    <TableCell>{cliente.sector}</TableCell>
                    <TableCell>{cliente.telefono}</TableCell>
                    <TableCell>
                      <Badge
                        variant={cliente.estado === "activo" ? "default" : "destructive"}
                        className={cliente.estado === "activo" ? "bg-green-500" : ""}
                      >
                        {cliente.estado === "activo" ? "Activo" : "Inactivo"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Abrir menú</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleOpenDialog(cliente)}>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Editar</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(cliente.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Eliminar</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No se encontraron clientes.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
             
          </Table>  */}
          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

