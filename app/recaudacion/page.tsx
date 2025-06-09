// "use client"

// import { useAuth } from "@/context/AuthContext"
// import { useRouter } from "next/navigation"
// import { useEffect, useState } from "react"
// import axios from "axios"

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
// import { CreditCard, DollarSign, FileCheck, Plus, Search, User } from "lucide-react"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// export default function RecaudacionPage() {
//   const { user, isLoading } = useAuth()
//   const router = useRouter()

//   const [pagos, setPagos] = useState<any[]>([])
//   const [searchTerm, setSearchTerm] = useState("")
//   const [openDialog, setOpenDialog] = useState(false)
//   const [selectedCliente, setSelectedCliente] = useState<any>(null)
//   const [formData, setFormData] = useState({
//     cliente: "",
//     cedula: "",
//     plan: "",
//     monto: 0,
//     fecha: new Date().toISOString().split("T")[0],
//     metodo: "efectivo",
//     estado: "pagado",
//   })

//   useEffect(() => {

//    const token = localStorage.getItem("token");

// if (!token) {
//   console.error("Token no encontrado, redirigiendo al login");
//   router.push("/login");
//   return;
// }

// const config = {
//   headers: { Authorization: `Bearer ${token}` },
// };

// axios
//   .get("http://localhost:8000/api/facturacion/pagos/", config)
//   .then((res) => setPagos(res.data))
//   .catch((err) => console.error("Error al cargar pagos", err));

//   }, [])
// console.log("ROL ACTUAL:", user?.role);

//   if (isLoading) return <p>Cargando...</p>
//  const rol = user?.role?.toLowerCase();
// if (rol !== "admin" && rol !== "cobros" && rol !== "administrador") return <p>No autorizado</p>;



//   const filteredPagos = pagos.filter(
//     (pago) =>
//       pago.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       pago.cedula.includes(searchTerm)
//   )

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col space-y-2">
//         <h1 className="text-3xl font-bold tracking-tight">Recaudación</h1>
//         <p className="text-muted-foreground">Gestione los pagos mensuales del servicio de internet.</p>
//       </div>

//       <div className="grid gap-4 md:grid-cols-3">
//         <Card>
//           <CardContent className="flex flex-row items-center p-6">
//             <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
//               <DollarSign className="h-6 w-6 text-green-600" />
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-muted-foreground">Recaudación Mensual</p>
//               <h3 className="text-2xl font-bold">$8,450</h3>
//             </div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="flex flex-row items-center p-6">
//             <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
//               <FileCheck className="h-6 w-6 text-blue-600" />
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-muted-foreground">Pagos Completados</p>
//               <h3 className="text-2xl font-bold">185</h3>
//             </div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="flex flex-row items-center p-6">
//             <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
//               <CreditCard className="h-6 w-6 text-amber-600" />
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-muted-foreground">Pagos Pendientes</p>
//               <h3 className="text-2xl font-bold">30</h3>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       <Tabs defaultValue="pagos" className="space-y-4">
//         <TabsList>
//           <TabsTrigger value="pagos">Historial de Pagos</TabsTrigger>
//           <TabsTrigger value="pendientes">Pagos Pendientes</TabsTrigger>
//         </TabsList>

//         <TabsContent value="pagos">
//           <Card>
//             <CardHeader className="flex flex-row items-center">
//               <div>
//                 <CardTitle>Historial de Pagos</CardTitle>
//                 <CardDescription>Registro de pagos realizados por los clientes</CardDescription>
//               </div>
//               <div className="ml-auto flex items-center gap-2">
//                 <div className="relative">
//                   <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     type="search"
//                     placeholder="Buscar por cliente o cédula..."
//                     className="w-64 pl-8"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                   />
//                 </div>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Fecha</TableHead>
//                     <TableHead>Cliente</TableHead>
//                     <TableHead>Cédula</TableHead>
//                     <TableHead>Plan</TableHead>
//                     <TableHead>Método</TableHead>
//                     <TableHead>Monto</TableHead>
//                     <TableHead>Estado</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {filteredPagos.length > 0 ? (
//                     filteredPagos.map((pago) => (
//                       <TableRow key={pago.id_pago}>
//                         <TableCell>{pago.fecha_pago}</TableCell>
//                         <TableCell>{pago.cliente}</TableCell>
//                         <TableCell>{pago.cedula}</TableCell>
//                         <TableCell>{pago.plan}</TableCell>
//                         <TableCell className="capitalize">{pago.metodo}</TableCell>
//                         <TableCell>${pago.monto.toFixed(2)}</TableCell>
//                         <TableCell>
//                           <Badge
//                             variant={pago.estado === "pagado" ? "default" : "outline"}
//                             className={pago.estado === "pagado" ? "bg-green-500" : ""}
//                           >
//                             {pago.estado === "pagado" ? "Pagado" : "Pendiente"}
//                           </Badge>
//                         </TableCell>
//                       </TableRow>
//                     ))
//                   ) : (
//                     <TableRow>
//                       <TableCell colSpan={7} className="h-24 text-center">
//                         No se encontraron pagos.
//                       </TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="pendientes">
//           <Card>
//             <CardHeader>
//               <CardTitle>Pagos Pendientes</CardTitle>
//               <CardDescription>Clientes con pagos pendientes del mes actual</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Cliente</TableHead>
//                     <TableHead>Cédula</TableHead>
//                     <TableHead>Plan</TableHead>
//                     <TableHead>Monto</TableHead>
//                     <TableHead>Acciones</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {pagos.filter((p) => p.estado === "pendiente").length > 0 ? (
//                     pagos
//                       .filter((p) => p.estado === "pendiente")
//                       .map((pago) => (
//                         <TableRow key={pago.id_pago}>
//                           <TableCell>{pago.cliente}</TableCell>
//                           <TableCell>{pago.cedula}</TableCell>
//                           <TableCell>{pago.plan}</TableCell>
//                           <TableCell>${pago.monto.toFixed(2)}</TableCell>
//                           <TableCell>
//                             <Button size="sm">Registrar Pago</Button>
//                           </TableCell>
//                         </TableRow>
//                       ))
//                   ) : (
//                     <TableRow>
//                       <TableCell colSpan={5} className="h-24 text-center">
//                         No hay pagos pendientes.
//                       </TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }

// app/recaudacion/page.tsx
"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, DollarSign, FileCheck, Plus, Search } from "lucide-react"
import toast from "react-hot-toast"

export default function RecaudacionPage() {
  const router = useRouter()
  const [pagos, setPagos] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [openDialog, setOpenDialog] = useState(false)
  const [formData, setFormData] = useState({
    cliente: "",
    cedula: "",
    plan: "",
    monto: 0,
    metodo: "efectivo",
    fecha_pago: new Date().toISOString().split("T")[0],
    estado: "pagado",
  })

  useEffect(() => {
    const rol = localStorage.getItem("rol")
    if (!rol || (rol !== "administrador" && rol !== "cobros")) {
      router.push("/dashboard")
    }
  }, [router])

  const fetchPagos = () => {
    fetch("http://localhost:8000/api/facturacion/pagos/", { credentials: "include" })
      .then(res => res.json())
      .then(data => setPagos(data))
      .catch(() => toast.error("Error al cargar pagos"))
  }

  useEffect(() => {
    fetchPagos()
  }, [])

  const filteredPagos = pagos.filter(p =>
    p.cliente?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.cedula?.includes(searchTerm)
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch("http://localhost:8000/api/facturacion/pagos/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData),
    })
    if (res.ok) {
      toast.success("Pago registrado")
      setOpenDialog(false)
      fetchPagos()
    } else {
      toast.error("Error al registrar el pago")
    }
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
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Historial de Pagos</CardTitle>
                <CardDescription>Registro de pagos realizados por los clientes</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar por cliente o cédula..."
                    className="w-64 pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" /> Registrar Pago
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Registrar Pago</DialogTitle>
                      <DialogDescription>Complete el formulario para registrar un nuevo pago.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="cliente">Cliente</Label>
                          <Input id="cliente" name="cliente" value={formData.cliente} onChange={handleInputChange} required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cedula">Cédula</Label>
                          <Input id="cedula" name="cedula" value={formData.cedula} onChange={handleInputChange} required />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="plan">Plan</Label>
                          <Input id="plan" name="plan" value={formData.plan} onChange={handleInputChange} required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="monto">Monto</Label>
                          <Input id="monto" name="monto" type="number" value={formData.monto} onChange={handleInputChange} required />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="fecha_pago">Fecha</Label>
                          <Input id="fecha_pago" name="fecha_pago" type="date" value={formData.fecha_pago} onChange={handleInputChange} required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="metodo">Método</Label>
                          <Select value={formData.metodo} onValueChange={(value) => handleSelectChange("metodo", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione un método" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="efectivo">Efectivo</SelectItem>
                              <SelectItem value="transferencia">Transferencia</SelectItem>
                              <SelectItem value="tarjeta">Tarjeta</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Guardar</Button>
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
                      <TableRow key={pago.id_pago}>
                        <TableCell>{pago.fecha_pago}</TableCell>
                        <TableCell>{pago.cliente}</TableCell>
                        <TableCell>{pago.cedula}</TableCell>
                        <TableCell>{pago.plan}</TableCell>
                        <TableCell>{pago.metodo}</TableCell>
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
