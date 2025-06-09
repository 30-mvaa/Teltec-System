"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Edit, MoreVertical, Trash2, Users } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"

export default function UsuariosTab() {
  const [usuarios, setUsuarios] = useState<any[]>([])
  const [usuarioForm, setUsuarioForm] = useState({ nombre: "", apellido: "", email: "", rol: "", password: "", confirmPassword: "", is_active: true })
  const [openDialog, setOpenDialog] = useState(false)
  const [currentUsuario, setCurrentUsuario] = useState<any>(null)

  const fetchUsuarios = async () => {
    const res = await fetch("http://localhost:8000/api/users/usuarios/", { credentials: "include" })
    const data = await res.json()
    setUsuarios(data)
  }

  useEffect(() => {
    fetchUsuarios()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setUsuarioForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setUsuarioForm(prev => ({ ...prev, [name]: value }))
  }

  const handleOpenDialog = (usuario: any = null) => {
    if (usuario) {
      setCurrentUsuario(usuario)
      setUsuarioForm({
        nombre: usuario.first_name || "",
        apellido: usuario.last_name || "",
        email: usuario.email || "",
        rol: usuario.rol || "",
        password: "",
        confirmPassword: "",
        is_active: usuario.is_active ?? true,
      })
    } else {
      setCurrentUsuario(null)
      setUsuarioForm({ nombre: "", apellido: "", email: "", rol: "", password: "", confirmPassword: "", is_active: true })
    }
    setOpenDialog(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (usuarioForm.password !== usuarioForm.confirmPassword) {
      toast.error("Las contraseñas no coinciden")
      return
    }

    const { confirmPassword, nombre, apellido, is_active, ...rest } = usuarioForm

    const payload = {
      ...rest,
      first_name: nombre,
      last_name: apellido,
      is_active: is_active,
    }

    try {
      const csrftoken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("csrftoken="))
        ?.split("=")[1]

      let res
      if (currentUsuario) {
        res = await fetch(`http://localhost:8000/api/users/usuarios/${currentUsuario.id}/`, {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken || "",
          },
          body: JSON.stringify(payload),
        })
      } else {
        res = await fetch("http://localhost:8000/api/users/usuarios/", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken || "",
          },
          body: JSON.stringify(payload),
        })
      }

      if (res.ok) {
        await fetchUsuarios()
        setOpenDialog(false)
        toast.success(currentUsuario ? "Usuario actualizado" : "Usuario creado")
      } else {
        const errorText = await res.text()
        toast.error("Error al guardar usuario: " + errorText)
      }
    } catch {
      toast.error("Error de conexión")
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("¿Está seguro que desea eliminar este usuario?")) return

    try {
      const csrftoken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("csrftoken="))
        ?.split("=")[1]

      const res = await fetch(`http://localhost:8000/api/users/usuarios/${id}/`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "X-CSRFToken": csrftoken || "",
        },
      })

      if (!res.ok) throw new Error("Error al eliminar usuario")

      await fetchUsuarios()
      toast.success("Usuario eliminado correctamente")
    } catch {
      toast.error("No se pudo eliminar el usuario")
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div>
          <CardTitle>Usuarios del Sistema</CardTitle>
          <CardDescription>Administre los usuarios y sus roles en el sistema</CardDescription>
        </div>
        <div className="ml-auto">
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()}>
                <Users className="mr-2 h-4 w-4" /> Nuevo Usuario
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{currentUsuario ? "Editar Usuario" : "Nuevo Usuario"}</DialogTitle>
                <DialogDescription>
                  {currentUsuario ? "Actualice la información del usuario." : "Complete los campos para registrar un nuevo usuario."}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre</Label>
                    <Input id="nombre" name="nombre" value={usuarioForm.nombre} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apellido">Apellido</Label>
                    <Input id="apellido" name="apellido" value={usuarioForm.apellido} onChange={handleInputChange} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input id="email" name="email" type="email" value={usuarioForm.email} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rol">Rol</Label>
                  <Select value={usuarioForm.rol} onValueChange={(value) => handleSelectChange("rol", value)}>
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
                    <Input id="password" name="password" type="password" value={usuarioForm.password} onChange={handleInputChange} required={!currentUsuario} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                    <Input id="confirmPassword" name="confirmPassword" type="password" value={usuarioForm.confirmPassword} onChange={handleInputChange} required={!currentUsuario} />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="is_active" name="is_active" checked={usuarioForm.is_active} onCheckedChange={(checked) => setUsuarioForm(prev => ({ ...prev, is_active: checked }))} />
                  <Label htmlFor="activo">Usuario Activo</Label>
                </div>
                <DialogFooter>
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
              <TableHead>Correo</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usuarios.length > 0 ? (
              usuarios.map(usuario => (
                <TableRow key={usuario.id}>
                  <TableCell>{`${usuario.first_name} ${usuario.last_name}`}</TableCell>
                  <TableCell>{usuario.email}</TableCell>
                  <TableCell className="capitalize">{usuario.rol.replace("_", " ")}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className={`mr-2 h-2 w-2 rounded-full ${usuario.is_active ? "bg-green-500" : "bg-red-500"}`} />
                      <span>{usuario.is_active ? "Activo" : "Inactivo"}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleOpenDialog(usuario)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(usuario.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-6">
                  No hay usuarios registrados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
