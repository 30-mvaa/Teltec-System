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
} from "@/components/ui/dialog"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Download, FileText, Printer, Search, Send } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Datos de ejemplo para la tabla de facturas
const facturasData = [
  {
    id: "F-2023-001",
    cliente: "Juan Carlos Pérez Gómez",
    cedula: "1234567890",
    fecha: "2023-05-01",
    monto: 25.0,
    estado: "emitida",
    pago_id: 1,
  },
  {
    id: "F-2023-002",
    cliente: "María Elena González López",
    cedula: "0987654321",
    fecha: "2023-05-03",
    monto: 35.0,
    estado: "emitida",
    pago_id: 2,
  },
  {
    id: "F-2023-003",
    cliente: "Pedro José Ramírez Torres",
    cedula: "1122334455",
    fecha: "2023-05-05",
    monto: 25.0,
    estado: "anulada",
    pago_id: 3,
  },
  {
    id: "F-2023-004",
    cliente: "Ana Lucía Mendoza Ruiz",
    cedula: "5566778899",
    fecha: "2023-05-10",
    monto: 45.0,
    estado: "emitida",
    pago_id: 4,
  },
]

// Datos de ejemplo para pagos sin factura
const pagosSinFacturaData = [
  {
    id: 5,
    cliente: "Roberto Carlos Suárez Vega",
    cedula: "9988776655",
    fecha: "2023-05-15",
    monto: 35.0,
    metodo: "efectivo",
  },
  {
    id: 6,
    cliente: "Luisa María Torres Vega",
    cedula: "1122334455",
    fecha: "2023-05-16",
    monto: 25.0,
    metodo: "transferencia",
  },
]

export default function FacturacionPage() {
  const [facturas, setFacturas] = useState(facturasData)
  const [pagosSinFactura, setPagosSinFactura] = useState(pagosSinFacturaData)
  const [searchTerm, setSearchTerm] = useState("")
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedPago, setSelectedPago] = useState<any>(null)

  // Filtrar facturas según el término de búsqueda
  const filteredFacturas = facturas.filter(
    (factura) =>
      factura.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      factura.cedula.includes(searchTerm) ||
      factura.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleGenerarFactura = (pago: any) => {
    setSelectedPago(pago)
    setOpenDialog(true)
  }

  const handleConfirmarFactura = () => {
    if (!selectedPago) return

    // Generar nueva factura
    const newId = `F-2023-${String(facturas.length + 1).padStart(3, "0")}`
    const newFactura = {
      id: newId,
      cliente: selectedPago.cliente,
      cedula: selectedPago.cedula,
      fecha: new Date().toISOString().split("T")[0],
      monto: selectedPago.monto,
      estado: "emitida",
      pago_id: selectedPago.id,
    }

    setFacturas((prev) => [...prev, newFactura])
    setPagosSinFactura((prev) => prev.filter((p) => p.id !== selectedPago.id))
    setOpenDialog(false)
    setSelectedPago(null)
  }

  const handleAnularFactura = (id: string) => {
    if (confirm("¿Está seguro que desea anular esta factura?")) {
      setFacturas((prev) => prev.map((f) => (f.id === id ? { ...f, estado: "anulada" } : f)))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Facturación Electrónica</h1>
        <p className="text-muted-foreground">Gestione las facturas electrónicas vinculadas al servicio de internet.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="flex flex-row items-center p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Facturas Emitidas</p>
              <h3 className="text-2xl font-bold">{facturas.filter((f) => f.estado === "emitida").length}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-row items-center p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <FileText className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Facturas Anuladas</p>
              <h3 className="text-2xl font-bold">{facturas.filter((f) => f.estado === "anulada").length}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-row items-center p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
              <FileText className="h-6 w-6 text-amber-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Pagos sin Factura</p>
              <h3 className="text-2xl font-bold">{pagosSinFactura.length}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="facturas" className="space-y-4">
        <TabsList>
          <TabsTrigger value="facturas">Facturas Emitidas</TabsTrigger>
          <TabsTrigger value="pendientes">Pagos sin Factura</TabsTrigger>
        </TabsList>
        <TabsContent value="facturas">
          <Card>
            <CardHeader className="flex flex-row items-center">
              <div>
                <CardTitle>Facturas Emitidas</CardTitle>
                <CardDescription>Registro de facturas electrónicas emitidas</CardDescription>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar por cliente, cédula o número..."
                    className="w-64 pl-8"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Número</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Cédula/RUC</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFacturas.length > 0 ? (
                    filteredFacturas.map((factura) => (
                      <TableRow key={factura.id}>
                        <TableCell>{factura.id}</TableCell>
                        <TableCell>{factura.fecha}</TableCell>
                        <TableCell>{factura.cliente}</TableCell>
                        <TableCell>{factura.cedula}</TableCell>
                        <TableCell>${factura.monto.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge
                            variant={factura.estado === "emitida" ? "default" : "destructive"}
                            className={factura.estado === "emitida" ? "bg-green-500" : ""}
                          >
                            {factura.estado === "emitida" ? "Emitida" : "Anulada"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              title="Descargar PDF"
                              disabled={factura.estado === "anulada"}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              title="Imprimir"
                              disabled={factura.estado === "anulada"}
                            >
                              <Printer className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              title="Enviar por Email"
                              disabled={factura.estado === "anulada"}
                            >
                              <Send className="h-4 w-4" />
                            </Button>
                            {factura.estado === "emitida" && (
                              <Button variant="destructive" size="sm" onClick={() => handleAnularFactura(factura.id)}>
                                Anular
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No se encontraron facturas.
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
              <CardTitle>Pagos sin Factura</CardTitle>
              <CardDescription>Pagos que requieren emisión de factura electrónica</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Cédula/RUC</TableHead>
                    <TableHead>Método</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pagosSinFactura.length > 0 ? (
                    pagosSinFactura.map((pago) => (
                      <TableRow key={pago.id}>
                        <TableCell>{pago.fecha}</TableCell>
                        <TableCell>{pago.cliente}</TableCell>
                        <TableCell>{pago.cedula}</TableCell>
                        <TableCell className="capitalize">{pago.metodo}</TableCell>
                        <TableCell>${pago.monto.toFixed(2)}</TableCell>
                        <TableCell>
                          <Button size="sm" onClick={() => handleGenerarFactura(pago)}>
                            Generar Factura
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No hay pagos pendientes de facturación.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generar Factura Electrónica</DialogTitle>
            <DialogDescription>Se generará una factura electrónica para el siguiente pago:</DialogDescription>
          </DialogHeader>
          {selectedPago && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Cliente:</p>
                  <p className="text-sm">{selectedPago.cliente}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Cédula/RUC:</p>
                  <p className="text-sm">{selectedPago.cedula}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Fecha de Pago:</p>
                  <p className="text-sm">{selectedPago.fecha}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Monto:</p>
                  <p className="text-sm">${selectedPago.monto.toFixed(2)}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">Método de Pago:</p>
                <p className="text-sm capitalize">{selectedPago.metodo}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleConfirmarFactura}>Confirmar y Generar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
