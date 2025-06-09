"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"

type Plan = {
  id_plan: number
  nombre_plan: string
  velocidad_mbps: number
  tarifa_mensual: number
  es_activo: boolean
}

function getCookie(name: string) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift()
}

export default function PlanesTab() {
  const [planes, setPlanes] = useState<Plan[]>([])
  const [openDialog, setOpenDialog] = useState(false)
  const [currentPlan, setCurrentPlan] = useState<Plan | null>(null)
  const [form, setForm] = useState({ nombre_plan: "", velocidad_mbps: 0, tarifa_mensual: 0, es_activo: true })

  useEffect(() => {
    fetch("http://localhost:8000/api/planes/", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPlanes(data)
        } else {
          console.error("Respuesta inesperada del backend:", data)
          setPlanes([])
        }
      })
      .catch((err) => {
        console.error("Error al cargar planes:", err)
        setPlanes([])
      })
  }, [])

  const handleOpenDialog = (plan?: Plan) => {
    if (plan) {
      setCurrentPlan(plan)
      setForm(plan)
    } else {
      setCurrentPlan(null)
      setForm({ nombre_plan: "", velocidad_mbps: 0, tarifa_mensual: 0, es_activo: true })
    }
    setOpenDialog(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    setForm({ ...form, [name]: type === "number" ? Number(value) : value })
  }

  const handleSave = () => {
    const method = currentPlan ? "PUT" : "POST"
    const url = currentPlan
      ? `http://localhost:8000/api/planes/${currentPlan.id_plan}/`
      : "http://localhost:8000/api/planes/"

    const csrftoken = getCookie("csrftoken")

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken ?? "",
      },
      credentials: "include",
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al guardar el plan")
        return res.json()
      })
      .then((data) => {
        if (currentPlan) {
          setPlanes(planes.map(p => (p.id_plan === data.id_plan ? data : p)))
        } else {
          setPlanes([...planes, data])
        }
        setOpenDialog(false)
      })
      .catch((err) => {
        console.error("Error al guardar plan:", err)
      })
  }

  const handleDelete = (id: number) => {
    if (!confirm("¿Deseas eliminar este plan?")) return

    fetch(`http://localhost:8000/api/planes/${id}/`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "X-CSRFToken": getCookie("csrftoken") ?? "",
      }
    })
      .then(() => {
        setPlanes(planes.filter((p) => p.id_plan !== id))
      })
      .catch((err) => console.error("Error al eliminar plan:", err))
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div>
          <CardTitle>Planes</CardTitle>
          <CardDescription>Administración de planes de servicio</CardDescription>
        </div>
        <Button onClick={() => handleOpenDialog()} className="ml-auto">
          <Plus className="mr-2 h-4 w-4" /> Nuevo Plan
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Velocidad</TableHead>
              <TableHead>Tarifa</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {planes.length === 0 ? (
              <TableRow key="no-data">
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  No hay planes registrados.
                </TableCell>
              </TableRow>
            ) : (
              planes.map((plan) => (
                <TableRow key={plan.id_plan}>
                  <TableCell>{plan.nombre_plan}</TableCell>
                  <TableCell>{plan.velocidad_mbps} Mbps</TableCell>
                  <TableCell>
                    {plan.tarifa_mensual != null
                      ? `$${Number(plan.tarifa_mensual).toFixed(2)}`
                      : "Sin tarifa"}
                  </TableCell>
                  <TableCell>{plan.es_activo ? "Activo" : "Inactivo"}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleOpenDialog(plan)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(plan.id_plan)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentPlan ? "Editar Plan" : "Nuevo Plan"}</DialogTitle>
            <DialogDescription>
              Complete la información del plan de servicio.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="nombre_plan">Nombre</Label>
              <Input id="nombre_plan" name="nombre_plan" value={form.nombre_plan} onChange={handleChange} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="velocidad_mbps">Velocidad (Mbps)</Label>
                <Input
                  id="velocidad_mbps"
                  name="velocidad_mbps"
                  type="number"
                  value={form.velocidad_mbps}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tarifa_mensual">Tarifa ($)</Label>
                <Input
                  id="tarifa_mensual"
                  name="tarifa_mensual"
                  type="number"
                  value={form.tarifa_mensual}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="es_activo"
                name="es_activo"
                checked={form.es_activo}
                onCheckedChange={(checked) => setForm((prev) => ({ ...prev, es_activo: checked }))}
              />
              <Label htmlFor="es_activo">Plan Activo</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
