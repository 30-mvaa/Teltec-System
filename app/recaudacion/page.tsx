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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { CreditCard, DollarSign, FileCheck, Plus, Search, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Datos de ejemplo para la tabla de pagos
const pagosData = [
  {
    id: 1,
    cliente: "Juan Carlos Pérez Gómez",
    cedula: "1234567890",
    plan: "Fibra 50Mbps",
    monto: 25.0,
    fecha: "2023-05-01",
    metodo: "efectivo",
    estado: "pagado",
  },
  {
    id: 2,
    cliente: "María Elena González López",
    cedula: "0987654321",
    plan: "Fibra 100Mbps",
    monto: 35.0,
    fecha: "2023-05-03",
    metodo: "transferencia",
    estado: "pagado",
  },
  {
    id: 3,
    cliente: "Pedro José Ramírez Torres",
    cedula: "1122334455",
    plan: "Fibra 50Mbps",
    monto: 25.0,
    fecha: "2023-05-05",
    metodo: "tarjeta",
    estado: "pagado",
  },
  {
    id: 4,
    cliente: "Ana Lucía Mendoza Ruiz",
    cedula: "5566778899",
    plan: "Fibra 200Mbps",
    monto: 45.0,
    fecha: "2023-05-10",
    metodo: "efectivo",
    estado: "pagado",
  },
  {
    id: 5,
    cliente: "Roberto Carlos Suárez Vega",
    cedula: "9988776655",
    plan: "Fibra 100Mbps",
    monto: 35.0,
    fecha: "",
    metodo: "",
    estado: "pendiente",
  },
]

// Datos de ejemplo para clientes
const clientesData = [
  {
    id: 1,
    nombre: "Juan Carlos Pérez Gómez",
    cedula: "1234567890",
    plan: "Fibra 50Mbps",
    monto: 25.0,
  },
  {
    id: 2,
    nombre: "María Elena González López",
    cedula: "0987654321",
    plan: "Fibra 100Mbps",
    monto: 35.0,
  },
  {
    id: 3,
    nombre: "Pedro José Ramírez Torres",
    cedula: "1122334455",
    plan: "Fibra 50Mbps",
    monto: 25.0,
  },
  {
    id: 4,
    nombre: "Ana Lucía Mendoza Ruiz",
    cedula: "5566778899",
    plan: "Fibra 200Mbps",
    monto: 45.0,
  },
  {
    id: 5,
    nombre: "Roberto Carlos Suárez Vega",
    cedula: "9988776655",
    plan: "Fibra 100Mbps",
    monto: 35.0,
  },
]

export default function RecaudacionPage() {
  const [pagos, setPagos] = useState(pagosData)
  const [searchTerm, setSearchTerm] = useState("")
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedCliente, setSelectedCliente] = useState<any>(null)
  const [formData, setFormData] = useState({
    cliente: "",
    cedula: "",
    plan: "",
    monto: 0,
    fecha: new Date().toISOString().split("T")[0],
    metodo: "efectivo",
    estado: "pagado",
  })

  // Filtrar pagos según el término de búsqueda
  const filteredPagos = pagos.filter(
    (pago) => pago.cliente.toLowerCase().includes(searchTerm.toLowerCase()) || pago.cedula.includes(searchTerm),
  )

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleSelectCliente = (cliente: any) => {
    setSelectedCliente(cliente)
    setFormData({
      ...formData,
      cliente: cliente.nombre,
      cedula: cliente.cedula,
      plan: cliente.plan,
      monto: cliente.monto,
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Agregar nuevo pago
    const newId = Math.max(...pagos.map((p) => p.id)) + 1
    setPagos((prev) => [
      ...prev,
      {
        id: newId,
        cliente: formData.cliente,
        cedula: formData.cedula,
        plan: formData.plan,
        monto: Number.parseFloat(formData.monto.toString()),
        fecha: formData.fecha,
        metodo: formData.metodo,
        estado: formData.estado,
      },
    ])

    setOpenDialog(false)
    setSelectedCliente(null)
    setFormData({
      cliente: "",
      cedula: "",
      plan: "",
      monto: 0,
      fecha: new Date().toISOString().split("T")[0],
      metodo: "efectivo",
      estado: "pagado",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Recaudación</h1>
        <p className="text-muted-foreground">Gestione los pagos mensuales del servicio de internet.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="flex flex-row items-center p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Recaudación Mensual</p>
              <h3 className="text-2xl font-bold">$8,450</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-row items-center p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <FileCheck className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Pagos Completados</p>
              <h3 className="text-2xl font-bold">185</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-row items-center p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
              <CreditCard className="h-6 w-6 text-amber-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Pagos Pendientes</p>
              <h3 className="text-2xl font-bold">30</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pagos" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pagos">Historial de Pagos</TabsTrigger>
          <TabsTrigger value="pendientes">Pagos Pendientes</TabsTrigger>
        </TabsList>
        <TabsContent value="pagos">
          <Card>
            <CardHeader className="flex flex-row items-center">
              <div>
                <CardTitle>Historial de Pagos</CardTitle>
                <CardDescription>Registro de pagos realizados por los clientes</CardDescription>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar por cliente o cédula..."
                    className="w-64 pl-8"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Registrar Pago
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Registrar Nuevo Pago</DialogTitle>
                      <DialogDescription>Complete el formulario para registrar un nuevo pago.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                      <div className="grid gap-4 py-4">
                        {!selectedCliente ? (
                          <div className="space-y-4">
                            <Label>Seleccione un Cliente</Label>
                            <div className="max-h-60 overflow-y-auto border rounded-md">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Cédula</TableHead>
                                    <TableHead>Nombre</TableHead>
                                    <TableHead>Plan</TableHead>
                                    <TableHead>Monto</TableHead>
                                    <TableHead></TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {clientesData.map((cliente) => (
                                    <TableRow key={cliente.id}>
                                      <TableCell>{cliente.cedula}</TableCell>
                                      <TableCell>{cliente.nombre}</TableCell>
                                      <TableCell>{cliente.plan}</TableCell>
                                      <TableCell>${cliente.monto.toFixed(2)}</TableCell>
                                      <TableCell>
                                        <Button variant="ghost" size="sm" onClick={() => handleSelectCliente(cliente)}>
                                          Seleccionar
                                        </Button>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="font-medium">{selectedCliente.nombre}</h3>
                                <p className="text-sm text-muted-foreground">Cédula: {selectedCliente.cedula}</p>
                              </div>
                              <Button variant="outline" size="sm" onClick={() => setSelectedCliente(null)}>
                                <User className="mr-2 h-4 w-4" />
                                Cambiar Cliente
                              </Button>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="plan">Plan</Label>
                                <Input id="plan" name="plan" value={formData.plan} readOnly />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="monto">Monto</Label>
                                <Input
                                  id="monto"
                                  name="monto"
                                  type="number"
                                  step="0.01"
                                  value={formData.monto}
                                  onChange={handleInputChange}
                                  required
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="fecha">Fecha de Pago</Label>
                                <Input
                                  id="fecha"
                                  name="fecha"
                                  type="date"
                                  value={formData.fecha}
                                  onChange={handleInputChange}
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="metodo">Método de Pago</Label>
                                <Select
                                  value={formData.metodo}
                                  onValueChange={(value) => handleSelectChange("metodo", value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Seleccione un método" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="efectivo">Efectivo</SelectItem>
                                    <SelectItem value="transferencia">Transferencia</SelectItem>
                                    <SelectItem value="tarjeta">Tarjeta de Crédito/Débito</SelectItem>
                                    <SelectItem value="deposito">Depósito Bancario</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                      <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpenDialog(false)}>
                          Cancelar
                        </Button>
                        <Button type="submit" disabled={!selectedCliente}>
                          Registrar Pago
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Cédula</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Método</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPagos.length > 0 ? (
                    filteredPagos.map((pago) => (
                      <TableRow key={pago.id}>
                        <TableCell>{pago.fecha || "Pendiente"}</TableCell>
                        <TableCell>{pago.cliente}</TableCell>
                        <TableCell>{pago.cedula}</TableCell>
                        <TableCell>{pago.plan}</TableCell>
                        <TableCell className="capitalize">{pago.metodo || "Pendiente"}</TableCell>
                        <TableCell>${pago.monto.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge
                            variant={pago.estado === "pagado" ? "default" : "outline"}
                            className={pago.estado === "pagado" ? "bg-green-500" : ""}
                          >
                            {pago.estado === "pagado" ? "Pagado" : "Pendiente"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No se encontraron pagos.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
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
        </TabsContent>
        <TabsContent value="pendientes">
          <Card>
            <CardHeader>
              <CardTitle>Pagos Pendientes</CardTitle>
              <CardDescription>Clientes con pagos pendientes del mes actual</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Cédula</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pagos.filter((p) => p.estado === "pendiente").length > 0 ? (
                    pagos
                      .filter((p) => p.estado === "pendiente")
                      .map((pago) => (
                        <TableRow key={pago.id}>
                          <TableCell>{pago.cliente}</TableCell>
                          <TableCell>{pago.cedula}</TableCell>
                          <TableCell>{pago.plan}</TableCell>
                          <TableCell>${pago.monto.toFixed(2)}</TableCell>
                          <TableCell>
                            <Button size="sm">Registrar Pago</Button>
                          </TableCell>
                        </TableRow>
                      ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        No hay pagos pendientes.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
