

"use client"

import { useEffect, useState } from "react"
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
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation";


export default function ClientesPage() {
  const [clientes, setClientes] = useState<any[]>([])
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

  const handleDelete = async (id: number) => {
  const confirm = window.confirm("¿Estás seguro de eliminar este cliente?");
  if (!confirm) return;

  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    await axios.delete(`http://localhost:8000/api/clientes/clientes/${id}/`, config);
    toast.success("Cliente eliminado correctamente");
    fetchClientes(); // actualiza lista
  } catch (error) {
    console.error("Error al eliminar cliente", error);
    toast.error("Error al eliminar cliente");
  }
};
  const router = useRouter();


  const fetchClientes = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("❌ No se encontró token. Redirigiendo al login...");
    router.push("/login");
    return;
  }

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    const res = await axios.get("http://localhost:8000/api/clientes/clientes/", config);
    setClientes(res.data);
  } catch (error:any) {
    console.error("❌ Error al obtener clientes:", error);
    if (error.response?.status === 401) {
      console.warn("⚠️ Token inválido. Redirigiendo al login...");
      localStorage.clear();
      router.push("/login");
    }
  }
};


  useEffect(() => {
    fetchClientes()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (["edad", "cedula", "telefono"].includes(name) && !/^[0-9]*$/.test(value)) return
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    }
    try {
      if (currentCliente) {
        await axios.put(`http://localhost:8000/api/clientes/clientes/${currentCliente.id_cliente}/`, formData, config)
        toast.success("Cliente actualizado correctamente")
      } else {
        await axios.post("http://localhost:8000/api/clientes/clientes/", formData, config)
        toast.success("Cliente registrado correctamente")
      }
      fetchClientes()
      setOpenDialog(false)
    } catch (error) {
      console.error("Error al guardar cliente", error)
      toast.error("Error al guardar cliente")
    }
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
                  {currentCliente ? "Actualice la información del cliente." : "Complete el formulario para registrar un nuevo cliente."}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cedula">Cédula</Label>
                      <Input id="cedula" name="cedula" value={formData.cedula} onChange={handleInputChange} required disabled={!!currentCliente} />
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
              {clientes.length > 0 ? (
                clientes.map((cliente) => (
                  <TableRow key={cliente.id_cliente}>
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
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(cliente.id_cliente)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>

                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow key="empty">
                  <TableCell colSpan={6} className="text-center py-6">
                    No hay clientes registrados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

