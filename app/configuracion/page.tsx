"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2 } from "lucide-react"
import { UsuarioForm } from "@/components/usuario/usuario-form"
import { getUsuarios, deleteUsuario, type Usuario } from "@/lib/services/usuario-services"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function ConfiguracionPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [loadingUsuarios, setLoadingUsuarios] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [openUsuarioDialog, setOpenUsuarioDialog] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [usuarioToDelete, setUsuarioToDelete] = useState<number | null>(null)
  const [currentUsuario, setCurrentUsuario] = useState<Usuario | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Cargar usuarios desde la base de datos
  const loadUsuarios = async () => {
    try {
      setLoadingUsuarios(true)
      setError(null)

      console.log("Cargando usuarios...")
      const data = await getUsuarios({
        search: searchTerm,
        page: 1,
        pageSize: 100,
      })

      console.log("Datos recibidos:", data)

      if (Array.isArray(data.results)) {
        setUsuarios(data.results)
      } else {
        console.error("La respuesta de la API no contiene un array:", data)
        setUsuarios([])
        setError("Formato de respuesta inválido")
      }
    } catch (error: any) {
      console.error("Error al cargar usuarios:", error)
      setError("No se pudieron cargar los usuarios: " + (error.message || "Error desconocido"))
      setUsuarios([])
    } finally {
      setLoadingUsuarios(false)
    }
  }

  // Cargar usuarios al montar el componente
  useEffect(() => {
    loadUsuarios()
  }, [])

  // Recargar usuarios cuando cambie el término de búsqueda
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadUsuarios()
    }, 500) // Debounce de 500ms

    return () => clearTimeout(timeoutId)
  }, [searchTerm])

  // Manejar búsqueda de usuarios
  const handleUsuarioSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  // Manejadores para usuarios
  const handleOpenUsuarioDialog = (usuario: Usuario | null = null) => {
    setCurrentUsuario(usuario)
    setOpenUsuarioDialog(true)
  }

  const handleUsuarioSubmit = () => {
    setOpenUsuarioDialog(false)
    setCurrentUsuario(null)
    // Recargar la lista de usuarios desde la base de datos
    loadUsuarios()
  }

  const handleDeleteUsuarioClick = (id: number) => {
    setUsuarioToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleConfirmDeleteUsuario = async () => {
    if (usuarioToDelete) {
      try {
        await deleteUsuario(usuarioToDelete)
        loadUsuarios() // Recargar la lista
      } catch (error: any) {
        console.error("Error al eliminar usuario:", error)
        setError("No se pudo eliminar el usuario: " + (error.message || "Error desconocido"))
      }
    }
    setDeleteDialogOpen(false)
    setUsuarioToDelete(null)
  }

  // Función para formatear el rol
  const formatRole = (role: string) => {
    switch (role) {
      case "administrador":
        return "Administrador"
      case "atencion_cliente":
        return "Atención al Cliente"
      case "cobros":
        return "Cobros"
      default:
        return role
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Configuración de Usuarios</h1>
        <p className="text-muted-foreground">Administre los usuarios del sistema y sus roles.</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center">
          <CardTitle>Usuarios del Sistema</CardTitle>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar usuario..."
                className="w-64 pl-8"
                value={searchTerm}
                onChange={handleUsuarioSearch}
              />
            </div>
            <Button onClick={() => handleOpenUsuarioDialog()}>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Usuario
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {error && <div className="bg-red-50 border border-red-200 text-red-700 p-4 mb-4 rounded-md">{error}</div>}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuario</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Correo Electrónico</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loadingUsuarios ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 mr-2"></div>
                      Cargando usuarios...
                    </div>
                  </TableCell>
                </TableRow>
              ) : usuarios.length > 0 ? (
                usuarios.map((usuario) => (
                  <TableRow key={usuario.id}>
                    <TableCell>{usuario.username}</TableCell>
                    <TableCell>{`${usuario.first_name} ${usuario.last_name}`}</TableCell>
                    <TableCell>{usuario.email}</TableCell>
                    <TableCell>{formatRole(usuario.role)}</TableCell>
                    <TableCell>
                      <Badge variant={usuario.is_active ? "default" : "destructive"}>
                        {usuario.is_active ? "Activo" : "Inactivo"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenUsuarioDialog(usuario)}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Editar</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteUsuarioClick(usuario.id!)}>
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Eliminar</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    {searchTerm
                      ? "No se encontraron usuarios que coincidan con la búsqueda."
                      : "No hay usuarios registrados."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Diálogo para crear/editar usuario */}
      <Dialog open={openUsuarioDialog} onOpenChange={setOpenUsuarioDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{currentUsuario ? "Editar Usuario" : "Nuevo Usuario"}</DialogTitle>
          </DialogHeader>
          <UsuarioForm
            usuarioId={currentUsuario?.id}
            onSuccess={handleUsuarioSubmit}
            onCancel={() => setOpenUsuarioDialog(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Diálogo de confirmación para eliminar usuario */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará permanentemente el usuario y no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDeleteUsuario} className="bg-red-600 hover:bg-red-700">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
