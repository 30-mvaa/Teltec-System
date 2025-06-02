// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Edit, MoreVertical, Plus, Save, Trash2, Users } from "lucide-react"
// import { Switch } from "@/components/ui/switch"

// // Datos de ejemplo para planes
// const planesData = [
//   {
//     id: 1,
//     nombre: "Fibra 50Mbps",
//     velocidad: 50,
//     tarifa: 25.0,
//     activo: true,
//   },
//   {
//     id: 2,
//     nombre: "Fibra 100Mbps",
//     velocidad: 100,
//     tarifa: 35.0,
//     activo: true,
//   },
//   {
//     id: 3,
//     nombre: "Fibra 200Mbps",
//     velocidad: 200,
//     tarifa: 45.0,
//     activo: true,
//   },
//   {
//     id: 4,
//     nombre: "Fibra 300Mbps",
//     velocidad: 300,
//     tarifa: 60.0,
//     activo: false,
//   },
// ]

// // Datos de ejemplo para usuarios
// const usuariosData = [
//   {
//     id: 1,
//     nombre: "Admin",
//     apellido: "Usuario",
//     email: "admin@ejemplo.com",
//     rol: "administrador",
//     activo: true,
//   },
//   {
//     id: 2,
//     nombre: "Soporte",
//     apellido: "Técnico",
//     email: "soporte@ejemplo.com",
//     rol: "atencion_cliente",
//     activo: true,
//   },
//   {
//     id: 3,
//     nombre: "Finanzas",
//     apellido: "Cobros",
//     email: "finanzas@ejemplo.com",
//     rol: "cobros",
//     activo: true,
//   },
// ]

// export default function ConfiguracionPage() {
//   const [planes, setPlanes] = useState(planesData)
//   const [usuarios, setUsuarios] = useState(usuariosData)
//   const [openPlanDialog, setOpenPlanDialog] = useState(false)
//   const [openUsuarioDialog, setOpenUsuarioDialog] = useState(false)
//   const [currentPlan, setCurrentPlan] = useState<any>(null)
//   const [currentUsuario, setCurrentUsuario] = useState<any>(null)
//   const [planForm, setPlanForm] = useState({
//     nombre: "",
//     velocidad: 0,
//     tarifa: 0,
//     activo: true,
//   })
//   const [usuarioForm, setUsuarioForm] = useState({
//     nombre: "",
//     apellido: "",
//     email: "",
//     rol: "",
//     password: "",
//     confirmPassword: "",
//     activo: true,
//   })
//   const [empresaForm, setEmpresaForm] = useState({
//     nombre: "Mi Empresa ISP",
//     ruc: "9999999999001",
//     direccion: "Av. Principal 123",
//     telefono: "0991234567",
//     email: "contacto@miempresa.com",
//     sitioWeb: "www.miempresa.com",
//   })
//   const [sriForm, setSriForm] = useState({
//     ambiente: "pruebas",
//     claveAcceso: "********",
//     certificadoDigital: "certificado.p12",
//     clavesCertificado: "********",
//   })

//   // Manejadores para planes
//   const handlePlanInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type, checked } = e.target
//     setPlanForm((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : type === "number" ? Number.parseFloat(value) : value,
//     }))
//   }

//   const handleOpenPlanDialog = (plan: any = null) => {
//     if (plan) {
//       setCurrentPlan(plan)
//       setPlanForm(plan)
//     } else {
//       setCurrentPlan(null)
//       setPlanForm({
//         nombre: "",
//         velocidad: 0,
//         tarifa: 0,
//         activo: true,
//       })
//     }
//     setOpenPlanDialog(true)
//   }

//   const handlePlanSubmit = (e: React.FormEvent) => {
//     e.preventDefault()

//     if (currentPlan) {
//       // Actualizar plan existente
//       setPlanes((prev) => prev.map((p) => (p.id === currentPlan.id ? { ...planForm, id: currentPlan.id } : p)))
//     } else {
//       // Agregar nuevo plan
//       const newId = Math.max(...planes.map((p) => p.id)) + 1
//       setPlanes((prev) => [...prev, { ...planForm, id: newId }])
//     }

//     setOpenPlanDialog(false)
//   }

//   const handleDeletePlan = (id: number) => {
//     if (confirm("¿Está seguro que desea eliminar este plan?")) {
//       setPlanes((prev) => prev.filter((p) => p.id !== id))
//     }
//   }

//   // Manejadores para usuarios
//   const handleUsuarioInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type, checked } = e.target
//     setUsuarioForm((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }))
//   }

//   const handleUsuarioSelectChange = (name: string, value: string) => {
//     setUsuarioForm((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleOpenUsuarioDialog = (usuario: any = null) => {
//     if (usuario) {
//       setCurrentUsuario(usuario)
//       setUsuarioForm({
//         ...usuario,
//         password: "",
//         confirmPassword: "",
//       })
//     } else {
//       setCurrentUsuario(null)
//       setUsuarioForm({
//         nombre: "",
//         apellido: "",
//         email: "",
//         rol: "",
//         password: "",
//         confirmPassword: "",
//         activo: true,
//       })
//     }
//     setOpenUsuarioDialog(true)
//   }

//   const handleUsuarioSubmit = (e: React.FormEvent) => {
//     e.preventDefault()

//     if (usuarioForm.password !== usuarioForm.confirmPassword) {
//       alert("Las contraseñas no coinciden")
//       return
//     }

//     if (currentUsuario) {
//       // Actualizar usuario existente
//       setUsuarios((prev) =>
//         prev.map((u) => (u.id === currentUsuario.id ? { ...usuarioForm, id: currentUsuario.id } : u)),
//       )
//     } else {
//       // Agregar nuevo usuario
//       const newId = Math.max(...usuarios.map((u) => u.id)) + 1
//       setUsuarios((prev) => [...prev, { ...usuarioForm, id: newId }])
//     }

//     setOpenUsuarioDialog(false)
//   }

//   const handleDeleteUsuario = (id: number) => {
//     if (confirm("¿Está seguro que desea eliminar este usuario?")) {
//       setUsuarios((prev) => prev.filter((u) => u.id !== id))
//     }
//   }

//   // Manejadores para configuración de empresa
//   const handleEmpresaInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setEmpresaForm((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleEmpresaSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     // En una app real, aquí se guardarían los datos en la base de datos
//     alert("Configuración de empresa guardada correctamente")
//   }

//   // Manejadores para configuración del SRI
//   const handleSriInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setSriForm((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSriSelectChange = (name: string, value: string) => {
//     setSriForm((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSriSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     // En una app real, aquí se guardarían los datos en la base de datos
//     alert("Configuración del SRI guardada correctamente")
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col space-y-2">
//         <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
//         <p className="text-muted-foreground">
//           Administre la configuración del sistema y los parámetros de la aplicación.
//         </p>
//       </div>

//       <Tabs defaultValue="empresa" className="space-y-4">
//         <TabsList className="grid w-full grid-cols-4">
//           <TabsTrigger value="empresa">Empresa</TabsTrigger>
//           <TabsTrigger value="planes">Planes</TabsTrigger>
//           <TabsTrigger value="usuarios">Usuarios</TabsTrigger>
//           <TabsTrigger value="sri">SRI</TabsTrigger>
//         </TabsList>

//         {/* Pestaña de Configuración de Empresa */}
//         <TabsContent value="empresa">
//           <Card>
//             <CardHeader>
//               <CardTitle>Información de la Empresa</CardTitle>
//               <CardDescription>Configure la información básica de su empresa</CardDescription>
//             </CardHeader>
//             <form onSubmit={handleEmpresaSubmit}>
//               <CardContent className="space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="nombre">Nombre de la Empresa</Label>
//                     <Input
//                       id="nombre"
//                       name="nombre"
//                       value={empresaForm.nombre}
//                       onChange={handleEmpresaInputChange}
//                       required
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="ruc">RUC</Label>
//                     <Input id="ruc" name="ruc" value={empresaForm.ruc} onChange={handleEmpresaInputChange} required />
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="direccion">Dirección</Label>
//                   <Input
//                     id="direccion"
//                     name="direccion"
//                     value={empresaForm.direccion}
//                     onChange={handleEmpresaInputChange}
//                     required
//                   />
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="telefono">Teléfono</Label>
//                     <Input
//                       id="telefono"
//                       name="telefono"
//                       value={empresaForm.telefono}
//                       onChange={handleEmpresaInputChange}
//                       required
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="email">Correo Electrónico</Label>
//                     <Input
//                       id="email"
//                       name="email"
//                       type="email"
//                       value={empresaForm.email}
//                       onChange={handleEmpresaInputChange}
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="sitioWeb">Sitio Web</Label>
//                   <Input
//                     id="sitioWeb"
//                     name="sitioWeb"
//                     value={empresaForm.sitioWeb}
//                     onChange={handleEmpresaInputChange}
//                   />
//                 </div>
//               </CardContent>
//               <CardFooter>
//                 <Button type="submit">
//                   <Save className="mr-2 h-4 w-4" />
//                   Guardar Cambios
//                 </Button>
//               </CardFooter>
//             </form>
//           </Card>
//         </TabsContent>

//         {/* Pestaña de Planes */}
//         <TabsContent value="planes">
//           <Card>
//             <CardHeader className="flex flex-row items-center">
//               <div>
//                 <CardTitle>Planes de Servicio</CardTitle>
//                 <CardDescription>Administre los planes de servicio de internet</CardDescription>
//               </div>
//               <div className="ml-auto">
//                 <Dialog open={openPlanDialog} onOpenChange={setOpenPlanDialog}>
//                   <DialogTrigger asChild>
//                     <Button onClick={() => handleOpenPlanDialog()}>
//                       <Plus className="mr-2 h-4 w-4" />
//                       Nuevo Plan
//                     </Button>
//                   </DialogTrigger>
//                   <DialogContent>
//                     <DialogHeader>
//                       <DialogTitle>{currentPlan ? "Editar Plan" : "Nuevo Plan"}</DialogTitle>
//                       <DialogDescription>
//                         {currentPlan
//                           ? "Actualice la información del plan en el formulario a continuación."
//                           : "Complete el formulario para crear un nuevo plan."}
//                       </DialogDescription>
//                     </DialogHeader>
//                     <form onSubmit={handlePlanSubmit}>
//                       <div className="grid gap-4 py-4">
//                         <div className="space-y-2">
//                           <Label htmlFor="nombre">Nombre del Plan</Label>
//                           <Input
//                             id="nombre"
//                             name="nombre"
//                             value={planForm.nombre}
//                             onChange={handlePlanInputChange}
//                             required
//                           />
//                         </div>
//                         <div className="grid grid-cols-2 gap-4">
//                           <div className="space-y-2">
//                             <Label htmlFor="velocidad">Velocidad (Mbps)</Label>
//                             <Input
//                               id="velocidad"
//                               name="velocidad"
//                               type="number"
//                               min="1"
//                               value={planForm.velocidad}
//                               onChange={handlePlanInputChange}
//                               required
//                             />
//                           </div>
//                           <div className="space-y-2">
//                             <Label htmlFor="tarifa">Tarifa Mensual ($)</Label>
//                             <Input
//                               id="tarifa"
//                               name="tarifa"
//                               type="number"
//                               step="0.01"
//                               min="0"
//                               value={planForm.tarifa}
//                               onChange={handlePlanInputChange}
//                               required
//                             />
//                           </div>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                           <Switch
//                             id="activo"
//                             name="activo"
//                             checked={planForm.activo}
//                             onCheckedChange={(checked) => setPlanForm((prev) => ({ ...prev, activo: checked }))}
//                           />
//                           <Label htmlFor="activo">Plan Activo</Label>
//                         </div>
//                       </div>
//                       <DialogFooter>
//                         <Button type="button" variant="outline" onClick={() => setOpenPlanDialog(false)}>
//                           Cancelar
//                         </Button>
//                         <Button type="submit">{currentPlan ? "Actualizar" : "Guardar"}</Button>
//                       </DialogFooter>
//                     </form>
//                   </DialogContent>
//                 </Dialog>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Nombre</TableHead>
//                     <TableHead>Velocidad</TableHead>
//                     <TableHead>Tarifa Mensual</TableHead>
//                     <TableHead>Estado</TableHead>
//                     <TableHead className="text-right">Acciones</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {planes.length > 0 ? (
//                     planes.map((plan) => (
//                       <TableRow key={plan.id}>
//                         <TableCell>{plan.nombre}</TableCell>
//                         <TableCell>{plan.velocidad} Mbps</TableCell>
//                         <TableCell>${plan.tarifa.toFixed(2)}</TableCell>
//                         <TableCell>
//                           <div className="flex items-center">
//                             <div
//                               className={`mr-2 h-2 w-2 rounded-full ${plan.activo ? "bg-green-500" : "bg-red-500"}`}
//                             />
//                             <span>{plan.activo ? "Activo" : "Inactivo"}</span>
//                           </div>
//                         </TableCell>
//                         <TableCell className="text-right">
//                           <DropdownMenu>
//                             <DropdownMenuTrigger asChild>
//                               <Button variant="ghost" size="icon">
//                                 <MoreVertical className="h-4 w-4" />
//                                 <span className="sr-only">Abrir menú</span>
//                               </Button>
//                             </DropdownMenuTrigger>
//                             <DropdownMenuContent align="end">
//                               <DropdownMenuLabel>Acciones</DropdownMenuLabel>
//                               <DropdownMenuSeparator />
//                               <DropdownMenuItem onClick={() => handleOpenPlanDialog(plan)}>
//                                 <Edit className="mr-2 h-4 w-4" />
//                                 <span>Editar</span>
//                               </DropdownMenuItem>
//                               <DropdownMenuItem onClick={() => handleDeletePlan(plan.id)}>
//                                 <Trash2 className="mr-2 h-4 w-4" />
//                                 <span>Eliminar</span>
//                               </DropdownMenuItem>
//                             </DropdownMenuContent>
//                           </DropdownMenu>
//                         </TableCell>
//                       </TableRow>
//                     ))
//                   ) : (
//                     <TableRow>
//                       <TableCell colSpan={5} className="h-24 text-center">
//                         No hay planes registrados.
//                       </TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* Pestaña de Usuarios */}
//         <TabsContent value="usuarios">
//           <Card>
//             <CardHeader className="flex flex-row items-center">
//               <div>
//                 <CardTitle>Usuarios del Sistema</CardTitle>
//                 <CardDescription>Administre los usuarios y sus roles en el sistema</CardDescription>
//               </div>
//               <div className="ml-auto">
//                 <Dialog open={openUsuarioDialog} onOpenChange={setOpenUsuarioDialog}>
//                   <DialogTrigger asChild>
//                     <Button onClick={() => handleOpenUsuarioDialog()}>
//                       <Users className="mr-2 h-4 w-4" />
//                       Nuevo Usuario
//                     </Button>
//                   </DialogTrigger>
//                   <DialogContent className="sm:max-w-[600px]">
//                     <DialogHeader>
//                       <DialogTitle>{currentUsuario ? "Editar Usuario" : "Nuevo Usuario"}</DialogTitle>
//                       <DialogDescription>
//                         {currentUsuario
//                           ? "Actualice la información del usuario en el formulario a continuación."
//                           : "Complete el formulario para crear un nuevo usuario."}
//                       </DialogDescription>
//                     </DialogHeader>
//                     <form onSubmit={handleUsuarioSubmit}>
//                       <div className="grid gap-4 py-4">
//                         <div className="grid grid-cols-2 gap-4">
//                           <div className="space-y-2">
//                             <Label htmlFor="nombre">Nombre</Label>
//                             <Input
//                               id="nombre"
//                               name="nombre"
//                               value={usuarioForm.nombre}
//                               onChange={handleUsuarioInputChange}
//                               required
//                             />
//                           </div>
//                           <div className="space-y-2">
//                             <Label htmlFor="apellido">Apellido</Label>
//                             <Input
//                               id="apellido"
//                               name="apellido"
//                               value={usuarioForm.apellido}
//                               onChange={handleUsuarioInputChange}
//                               required
//                             />
//                           </div>
//                         </div>
//                         <div className="space-y-2">
//                           <Label htmlFor="email">Correo Electrónico</Label>
//                           <Input
//                             id="email"
//                             name="email"
//                             type="email"
//                             value={usuarioForm.email}
//                             onChange={handleUsuarioInputChange}
//                             required
//                           />
//                         </div>
//                         <div className="space-y-2">
//                           <Label htmlFor="rol">Rol</Label>
//                           <Select
//                             value={usuarioForm.rol}
//                             onValueChange={(value) => handleUsuarioSelectChange("rol", value)}
//                           >
//                             <SelectTrigger>
//                               <SelectValue placeholder="Seleccione un rol" />
//                             </SelectTrigger>
//                             <SelectContent>
//                               <SelectItem value="administrador">Administrador</SelectItem>
//                               <SelectItem value="atencion_cliente">Atención al Cliente</SelectItem>
//                               <SelectItem value="cobros">Cobros</SelectItem>
//                             </SelectContent>
//                           </Select>
//                         </div>
//                         <div className="grid grid-cols-2 gap-4">
//                           <div className="space-y-2">
//                             <Label htmlFor="password">Contraseña</Label>
//                             <Input
//                               id="password"
//                               name="password"
//                               type="password"
//                               value={usuarioForm.password}
//                               onChange={handleUsuarioInputChange}
//                               required={!currentUsuario}
//                             />
//                           </div>
//                           <div className="space-y-2">
//                             <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
//                             <Input
//                               id="confirmPassword"
//                               name="confirmPassword"
//                               type="password"
//                               value={usuarioForm.confirmPassword}
//                               onChange={handleUsuarioInputChange}
//                               required={!currentUsuario}
//                             />
//                           </div>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                           <Switch
//                             id="activo"
//                             name="activo"
//                             checked={usuarioForm.activo}
//                             onCheckedChange={(checked) => setUsuarioForm((prev) => ({ ...prev, activo: checked }))}
//                           />
//                           <Label htmlFor="activo">Usuario Activo</Label>
//                         </div>
//                       </div>
//                       <DialogFooter>
//                         <Button type="button" variant="outline" onClick={() => setOpenUsuarioDialog(false)}>
//                           Cancelar
//                         </Button>
//                         <Button type="submit">{currentUsuario ? "Actualizar" : "Guardar"}</Button>
//                       </DialogFooter>
//                     </form>
//                   </DialogContent>
//                 </Dialog>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Nombre</TableHead>
//                     <TableHead>Correo Electrónico</TableHead>
//                     <TableHead>Rol</TableHead>
//                     <TableHead>Estado</TableHead>
//                     <TableHead className="text-right">Acciones</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {usuarios.length > 0 ? (
//                     usuarios.map((usuario) => (
//                       <TableRow key={usuario.id}>
//                         <TableCell>{`${usuario.nombre} ${usuario.apellido}`}</TableCell>
//                         <TableCell>{usuario.email}</TableCell>
//                         <TableCell className="capitalize">
//                           {usuario.rol === "administrador"
//                             ? "Administrador"
//                             : usuario.rol === "atencion_cliente"
//                               ? "Atención al Cliente"
//                               : "Cobros"}
//                         </TableCell>
//                         <TableCell>
//                           <div className="flex items-center">
//                             <div
//                               className={`mr-2 h-2 w-2 rounded-full ${usuario.activo ? "bg-green-500" : "bg-red-500"}`}
//                             />
//                             <span>{usuario.activo ? "Activo" : "Inactivo"}</span>
//                           </div>
//                         </TableCell>
//                         <TableCell className="text-right">
//                           <DropdownMenu>
//                             <DropdownMenuTrigger asChild>
//                               <Button variant="ghost" size="icon">
//                                 <MoreVertical className="h-4 w-4" />
//                                 <span className="sr-only">Abrir menú</span>
//                               </Button>
//                             </DropdownMenuTrigger>
//                             <DropdownMenuContent align="end">
//                               <DropdownMenuLabel>Acciones</DropdownMenuLabel>
//                               <DropdownMenuSeparator />
//                               <DropdownMenuItem onClick={() => handleOpenUsuarioDialog(usuario)}>
//                                 <Edit className="mr-2 h-4 w-4" />
//                                 <span>Editar</span>
//                               </DropdownMenuItem>
//                               <DropdownMenuItem onClick={() => handleDeleteUsuario(usuario.id)}>
//                                 <Trash2 className="mr-2 h-4 w-4" />
//                                 <span>Eliminar</span>
//                               </DropdownMenuItem>
//                             </DropdownMenuContent>
//                           </DropdownMenu>
//                         </TableCell>
//                       </TableRow>
//                     ))
//                   ) : (
//                     <TableRow>
//                       <TableCell colSpan={5} className="h-24 text-center">
//                         No hay usuarios registrados.
//                       </TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* Pestaña de SRI */}
//         <TabsContent value="sri">
//           <Card>
//             <CardHeader>
//               <CardTitle>Configuración del SRI</CardTitle>
//               <CardDescription>Configure los parámetros para la facturación electrónica con el SRI</CardDescription>
//             </CardHeader>
//             <form onSubmit={handleSriSubmit}>
//               <CardContent className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="ambiente">Ambiente</Label>
//                   <Select value={sriForm.ambiente} onValueChange={(value) => handleSriSelectChange("ambiente", value)}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Seleccione un ambiente" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="pruebas">Pruebas</SelectItem>
//                       <SelectItem value="produccion">Producción</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="claveAcceso">Clave de Acceso</Label>
//                   <Input
//                     id="claveAcceso"
//                     name="claveAcceso"
//                     type="password"
//                     value={sriForm.claveAcceso}
//                     onChange={handleSriInputChange}
//                     required
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="certificadoDigital">Certificado Digital (.p12)</Label>
//                   <div className="flex items-center gap-2">
//                     <Input
//                       id="certificadoDigital"
//                       name="certificadoDigital"
//                       value={sriForm.certificadoDigital}
//                       readOnly
//                       className="flex-1"
//                     />
//                     <Button type="button" variant="outline">
//                       Subir Certificado
//                     </Button>
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="clavesCertificado">Clave del Certificado</Label>
//                   <Input
//                     id="clavesCertificado"
//                     name="clavesCertificado"
//                     type="password"
//                     value={sriForm.clavesCertificado}
//                     onChange={handleSriInputChange}
//                     required
//                   />
//                 </div>
//               </CardContent>
//               <CardFooter>
//                 <Button type="submit">
//                   <Save className="mr-2 h-4 w-4" />
//                   Guardar Configuración
//                 </Button>
//               </CardFooter>
//             </form>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }
"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Edit, MoreVertical, Plus, Save, Trash2, Users } from "lucide-react"
import { Switch } from "@/components/ui/switch"

// Datos de ejemplo (puedes remplazarlos luego por fetch API)
const planesData = [/* ... */]
const usuariosData = [/* ... */]

export default function ConfiguracionPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && user?.role !== "administrador") {
      router.push("/dashboard")
    }
  }, [user, isLoading, router])

  if (isLoading || user?.role !== "administrador") return null

  // --- todo tu estado y lógica permanece sin cambio ---
  const [planes, setPlanes] = useState(planesData)
  const [usuarios, setUsuarios] = useState(usuariosData)
  const [openPlanDialog, setOpenPlanDialog] = useState(false)
  const [openUsuarioDialog, setOpenUsuarioDialog] = useState(false)
  const [currentPlan, setCurrentPlan] = useState<any>(null)
  const [currentUsuario, setCurrentUsuario] = useState<any>(null)
  const [planForm, setPlanForm] = useState({ nombre: "", velocidad: 0, tarifa: 0, activo: true })
  const [usuarioForm, setUsuarioForm] = useState({ nombre: "", apellido: "", email: "", rol: "", password: "", confirmPassword: "", activo: true })
  const [empresaForm, setEmpresaForm] = useState({ nombre: "Mi Empresa ISP", ruc: "9999999999001", direccion: "Av. Principal 123", telefono: "0991234567", email: "contacto@miempresa.com", sitioWeb: "www.miempresa.com" })
  const [sriForm, setSriForm] = useState({ ambiente: "pruebas", claveAcceso: "********", certificadoDigital: "certificado.p12", clavesCertificado: "********" })

  // 🧩 Manejadores (todo igual que antes)
  const handlePlanInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { /* ... */ }
  const handleOpenPlanDialog = (plan: any = null) => { /* ... */ }
  const handlePlanSubmit = (e: React.FormEvent) => { /* ... */ }
  const handleDeletePlan = (id: number) => { /* ... */ }
  const handleUsuarioInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { /* ... */ }
  const handleUsuarioSelectChange = (name: string, value: string) => { /* ... */ }
  const handleOpenUsuarioDialog = (usuario: any = null) => { /* ... */ }
  const handleUsuarioSubmit = (e: React.FormEvent) => { /* ... */ }
  const handleDeleteUsuario = (id: number) => { /* ... */ }
  const handleEmpresaInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { /* ... */ }
  const handleEmpresaSubmit = (e: React.FormEvent) => { /* ... */ }
  const handleSriInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { /* ... */ }
  const handleSriSelectChange = (name: string, value: string) => { /* ... */ }
  const handleSriSubmit = (e: React.FormEvent) => { /* ... */ }

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

        {/* Pestaña de Configuración de Empresa */}
        <TabsContent value="empresa">
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
                    <Input
                      id="nombre"
                      name="nombre"
                      value={empresaForm.nombre}
                      onChange={handleEmpresaInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ruc">RUC</Label>
                    <Input id="ruc" name="ruc" value={empresaForm.ruc} onChange={handleEmpresaInputChange} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="direccion">Dirección</Label>
                  <Input
                    id="direccion"
                    name="direccion"
                    value={empresaForm.direccion}
                    onChange={handleEmpresaInputChange}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="telefono">Teléfono</Label>
                    <Input
                      id="telefono"
                      name="telefono"
                      value={empresaForm.telefono}
                      onChange={handleEmpresaInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={empresaForm.email}
                      onChange={handleEmpresaInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sitioWeb">Sitio Web</Label>
                  <Input
                    id="sitioWeb"
                    name="sitioWeb"
                    value={empresaForm.sitioWeb}
                    onChange={handleEmpresaInputChange}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  Guardar Cambios
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        {/* Pestaña de Planes */}
        <TabsContent value="planes">
          <Card>
            <CardHeader className="flex flex-row items-center">
              <div>
                <CardTitle>Planes de Servicio</CardTitle>
                <CardDescription>Administre los planes de servicio de internet</CardDescription>
              </div>
              <div className="ml-auto">
                <Dialog open={openPlanDialog} onOpenChange={setOpenPlanDialog}>
                  <DialogTrigger asChild>
                    <Button onClick={() => handleOpenPlanDialog()}>
                      <Plus className="mr-2 h-4 w-4" />
                      Nuevo Plan
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{currentPlan ? "Editar Plan" : "Nuevo Plan"}</DialogTitle>
                      <DialogDescription>
                        {currentPlan
                          ? "Actualice la información del plan en el formulario a continuación."
                          : "Complete el formulario para crear un nuevo plan."}
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handlePlanSubmit}>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="nombre">Nombre del Plan</Label>
                          <Input
                            id="nombre"
                            name="nombre"
                            value={planForm.nombre}
                            onChange={handlePlanInputChange}
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="velocidad">Velocidad (Mbps)</Label>
                            <Input
                              id="velocidad"
                              name="velocidad"
                              type="number"
                              min="1"
                              value={planForm.velocidad}
                              onChange={handlePlanInputChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="tarifa">Tarifa Mensual ($)</Label>
                            <Input
                              id="tarifa"
                              name="tarifa"
                              type="number"
                              step="0.01"
                              min="0"
                              value={planForm.tarifa}
                              onChange={handlePlanInputChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="activo"
                            name="activo"
                            checked={planForm.activo}
                            onCheckedChange={(checked) => setPlanForm((prev) => ({ ...prev, activo: checked }))}
                          />
                          <Label htmlFor="activo">Plan Activo</Label>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpenPlanDialog(false)}>
                          Cancelar
                        </Button>
                        <Button type="submit">{currentPlan ? "Actualizar" : "Guardar"}</Button>
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
                    <TableHead>Nombre</TableHead>
                    <TableHead>Velocidad</TableHead>
                    <TableHead>Tarifa Mensual</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {planes.length > 0 ? (
                    planes.map((plan) => (
                      <TableRow key={plan.id}>
                        <TableCell>{plan.nombre}</TableCell>
                        <TableCell>{plan.velocidad} Mbps</TableCell>
                        <TableCell>${plan.tarifa.toFixed(2)}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div
                              className={`mr-2 h-2 w-2 rounded-full ${plan.activo ? "bg-green-500" : "bg-red-500"}`}
                            />
                            <span>{plan.activo ? "Activo" : "Inactivo"}</span>
                          </div>
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
                              <DropdownMenuItem onClick={() => handleOpenPlanDialog(plan)}>
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Editar</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDeletePlan(plan.id)}>
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
                      <TableCell colSpan={5} className="h-24 text-center">
                        No hay planes registrados.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pestaña de Usuarios */}
        <TabsContent value="usuarios">
          <Card>
            <CardHeader className="flex flex-row items-center">
              <div>
                <CardTitle>Usuarios del Sistema</CardTitle>
                <CardDescription>Administre los usuarios y sus roles en el sistema</CardDescription>
              </div>
              <div className="ml-auto">
                <Dialog open={openUsuarioDialog} onOpenChange={setOpenUsuarioDialog}>
                  <DialogTrigger asChild>
                    <Button onClick={() => handleOpenUsuarioDialog()}>
                      <Users className="mr-2 h-4 w-4" />
                      Nuevo Usuario
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>{currentUsuario ? "Editar Usuario" : "Nuevo Usuario"}</DialogTitle>
                      <DialogDescription>
                        {currentUsuario
                          ? "Actualice la información del usuario en el formulario a continuación."
                          : "Complete el formulario para crear un nuevo usuario."}
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleUsuarioSubmit}>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="nombre">Nombre</Label>
                            <Input
                              id="nombre"
                              name="nombre"
                              value={usuarioForm.nombre}
                              onChange={handleUsuarioInputChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="apellido">Apellido</Label>
                            <Input
                              id="apellido"
                              name="apellido"
                              value={usuarioForm.apellido}
                              onChange={handleUsuarioInputChange}
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
                            value={usuarioForm.email}
                            onChange={handleUsuarioInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="rol">Rol</Label>
                          <Select
                            value={usuarioForm.rol}
                            onValueChange={(value) => handleUsuarioSelectChange("rol", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione un rol" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="administrador">Administrador</SelectItem>
                              <SelectItem value="atencion_cliente">Atención al Cliente</SelectItem>
                              <SelectItem value="cobros">Cobros</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="password">Contraseña</Label>
                            <Input
                              id="password"
                              name="password"
                              type="password"
                              value={usuarioForm.password}
                              onChange={handleUsuarioInputChange}
                              required={!currentUsuario}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                            <Input
                              id="confirmPassword"
                              name="confirmPassword"
                              type="password"
                              value={usuarioForm.confirmPassword}
                              onChange={handleUsuarioInputChange}
                              required={!currentUsuario}
                            />
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="activo"
                            name="activo"
                            checked={usuarioForm.activo}
                            onCheckedChange={(checked) => setUsuarioForm((prev) => ({ ...prev, activo: checked }))}
                          />
                          <Label htmlFor="activo">Usuario Activo</Label>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpenUsuarioDialog(false)}>
                          Cancelar
                        </Button>
                        <Button type="submit">{currentUsuario ? "Actualizar" : "Guardar"}</Button>
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
                    <TableHead>Nombre</TableHead>
                    <TableHead>Correo Electrónico</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {usuarios.length > 0 ? (
                    usuarios.map((usuario) => (
                      <TableRow key={usuario.id}>
                        <TableCell>{`${usuario.nombre} ${usuario.apellido}`}</TableCell>
                        <TableCell>{usuario.email}</TableCell>
                        <TableCell className="capitalize">
                          {usuario.rol === "administrador"
                            ? "Administrador"
                            : usuario.rol === "atencion_cliente"
                              ? "Atención al Cliente"
                              : "Cobros"}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div
                              className={`mr-2 h-2 w-2 rounded-full ${usuario.activo ? "bg-green-500" : "bg-red-500"}`}
                            />
                            <span>{usuario.activo ? "Activo" : "Inactivo"}</span>
                          </div>
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
                              <DropdownMenuItem onClick={() => handleOpenUsuarioDialog(usuario)}>
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Editar</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDeleteUsuario(usuario.id)}>
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
                      <TableCell colSpan={5} className="h-24 text-center">
                        No hay usuarios registrados.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pestaña de SRI */}
        <TabsContent value="sri">
          <Card>
            <CardHeader>
              <CardTitle>Configuración del SRI</CardTitle>
              <CardDescription>Configure los parámetros para la facturación electrónica con el SRI</CardDescription>
            </CardHeader>
            <form onSubmit={handleSriSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ambiente">Ambiente</Label>
                  <Select value={sriForm.ambiente} onValueChange={(value) => handleSriSelectChange("ambiente", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un ambiente" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pruebas">Pruebas</SelectItem>
                      <SelectItem value="produccion">Producción</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="claveAcceso">Clave de Acceso</Label>
                  <Input
                    id="claveAcceso"
                    name="claveAcceso"
                    type="password"
                    value={sriForm.claveAcceso}
                    onChange={handleSriInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="certificadoDigital">Certificado Digital (.p12)</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="certificadoDigital"
                      name="certificadoDigital"
                      value={sriForm.certificadoDigital}
                      readOnly
                      className="flex-1"
                    />
                    <Button type="button" variant="outline">
                      Subir Certificado
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clavesCertificado">Clave del Certificado</Label>
                  <Input
                    id="clavesCertificado"
                    name="clavesCertificado"
                    type="password"
                    value={sriForm.clavesCertificado}
                    onChange={handleSriInputChange}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  Guardar Configuración
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
