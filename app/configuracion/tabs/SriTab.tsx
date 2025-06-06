"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SriTab() {
  const [form, setForm] = useState({
    ambiente: "pruebas",
    claveAcceso: "",
    certificadoDigital: "certificado.p12",
    clavesCertificado: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setForm(prev => ({ ...prev, ambiente: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Configuración del SRI guardada correctamente")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuración del SRI</CardTitle>
        <CardDescription>Configure los parámetros para la facturación electrónica con el SRI</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ambiente">Ambiente</Label>
            <Select value={form.ambiente} onValueChange={handleSelectChange}>
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
              value={form.claveAcceso}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="certificadoDigital">Certificado Digital (.p12)</Label>
            <div className="flex items-center gap-2">
              <Input
                id="certificadoDigital"
                name="certificadoDigital"
                value={form.certificadoDigital}
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
              value={form.clavesCertificado}
              onChange={handleChange}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">Guardar Configuración</Button>
        </CardFooter>
      </form>
    </Card>
  )
}
