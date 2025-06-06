"use client"

import { useState } from "react"
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
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"

type Plan = {
  id: number
  nombre: string
  velocidad: number
  tarifa: number
  activo: boolean
}

const planesIniciales: Plan[] = [
  { id: 1, nombre: "Fibra 100 Mbps", velocidad: 100, tarifa: 25.0, activo: true },
  { id: 2, nombre: "Fibra 200 Mbps", velocidad: 200, tarifa: 40.0, activo: false },
]

export default function PlanesTab() {
  const [planes, setPlanes] = useState<Plan[]>(planesIniciales)
  const [openDialog, setOpenDialog] = useState(false)
  const [currentPlan, setCurrentPlan] = useState<Plan | null>(null)
  const [form, setForm] = useState({ nombre: "", velocidad: 0, tarifa: 0, activo: true })

  const handleOpenDialog = (plan?: Plan) => {
    if (plan) {
      setCurrentPlan(plan)
      setForm(plan)
    } else {
      setCurrentPlan(null)
      setForm({ nombre: "", velocidad: 0, tarifa: 0, activo: true })
    }
    setOpenDialog(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    setForm({ ...form, [name]: type === "number" ? Number(value) : value })
  }

  const handleSave = () => {
    if (currentPlan) {
      setPlanes(planes.map(p => (p.id === currentPlan.id ? { ...form, id: currentPlan.id } : p)))
    } else {
      const newId = planes.length ? Math.max(...planes.map(p => p.id)) + 1 : 1
      setPlanes([...planes, { ...form, id: newId }])
    }
    setOpenDialog(false)
  }

  const handleDelete = (id: number) => {
    if (confirm("¿Deseas eliminar este plan?")) {
      setPlanes(planes.filter(p => p.id !== id))
    }
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
            {planes.map((plan) => (
              <TableRow key={plan.id}>
                <TableCell>{plan.nombre}</TableCell>
                <TableCell>{plan.velocidad} Mbps</TableCell>
                <TableCell>${plan.tarifa.toFixed(2)}</TableCell>
                <TableCell>{plan.activo ? "Activo" : "Inactivo"}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleOpenDialog(plan)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(plan.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
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
              <Label htmlFor="nombre">Nombre</Label>
              <Input id="nombre" name="nombre" value={form.nombre} onChange={handleChange} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="velocidad">Velocidad (Mbps)</Label>
                <Input
                  id="velocidad"
                  name="velocidad"
                  type="number"
                  value={form.velocidad}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tarifa">Tarifa ($)</Label>
                <Input
                  id="tarifa"
                  name="tarifa"
                  type="number"
                  value={form.tarifa}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="activo"
                name="activo"
                checked={form.activo}
                onCheckedChange={(checked) => setForm((prev) => ({ ...prev, activo: checked }))}
              />
              <Label htmlFor="activo">Plan Activo</Label>
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
