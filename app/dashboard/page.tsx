"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area,
} from "recharts"
import {
  Users,
  CreditCard,
  Wifi,
  AlertTriangle,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Bell,
  Filter,
  Download,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Datos de ejemplo para las gráficas
const monthlyRevenue = [
  { name: "Ene", valor: 4000 },
  { name: "Feb", valor: 4500 },
  { name: "Mar", valor: 5000 },
  { name: "Abr", valor: 4800 },
  { name: "May", valor: 5200 },
  { name: "Jun", valor: 5500 },
  { name: "Jul", valor: 5800 },
  { name: "Ago", valor: 6200 },
  { name: "Sep", valor: 6500 },
  { name: "Oct", valor: 6300 },
  { name: "Nov", valor: 6700 },
  { name: "Dic", valor: 7000 },
]

const clientesPorSector = [
  { name: "Norte", value: 35 },
  { name: "Sur", value: 25 },
  { name: "Este", value: 20 },
  { name: "Oeste", value: 15 },
  { name: "Centro", value: 5 },
]

const clientesPorPlan = [
  { name: "Fibra 50Mbps", value: 95 },
  { name: "Fibra 100Mbps", value: 85 },
  { name: "Fibra 200Mbps", value: 45 },
  { name: "Fibra 300Mbps", value: 23 },
]

const tendenciaClientes = [
  { name: "Ene", nuevos: 12, cancelados: 5 },
  { name: "Feb", nuevos: 15, cancelados: 4 },
  { name: "Mar", nuevos: 18, cancelados: 6 },
  { name: "Abr", nuevos: 14, cancelados: 7 },
  { name: "May", nuevos: 20, cancelados: 5 },
  { name: "Jun", nuevos: 22, cancelados: 4 },
]

const COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6"]
const COLORS_PLAN = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444"]

export default function DashboardPage() {
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState("anual")

  return (
    <div className="space-y-6 pb-10">
      {/* Header con barra de búsqueda y acciones */}
      <div className="sticky top-0 z-10 -mx-4 mb-6 bg-background/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:px-6 lg:px-8">
      
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Bienvenido al panel de control del sistema de administración TelTec.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative w-full sm:w-64 md:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Buscar..." className="w-full pl-8" />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Bell className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Sector</DropdownMenuItem>
                  <DropdownMenuItem>Plan</DropdownMenuItem>
                  <DropdownMenuItem>Estado</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Select defaultValue={periodoSeleccionado} onValueChange={setPeriodoSeleccionado}>
                <SelectTrigger className="h-9 w-[130px] sm:w-[150px]">
                  <SelectValue placeholder="Periodo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mensual">Mensual</SelectItem>
                  <SelectItem value="trimestral">Trimestral</SelectItem>
                  <SelectItem value="anual">Anual</SelectItem>
                </SelectContent>
              </Select>
              <Button size="sm" className="hidden sm:flex">
                <Download className="mr-2 h-4 w-4" />
                Exportar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden border-none bg-gradient-to-br from-[#1a2236] to-[#111827] shadow-md">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#3b82f6]/20 text-[#3b82f6]">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400">Total Clientes</p>
              <div className="flex items-center">
                <h3 className="text-2xl font-bold text-white">248</h3>
                <Badge variant="outline" className="ml-2 border-green-800 bg-green-900/30 text-green-400">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  8.2%
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none bg-gradient-to-br from-[#1a2236] to-[#111827] shadow-md">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20 text-green-400">
              <Wifi className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400">Clientes Activos</p>
              <div className="flex items-center">
                <h3 className="text-2xl font-bold text-white">215</h3>
                <span className="ml-2 text-xs text-green-400/70">(86.7%)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none bg-gradient-to-br from-[#1a2236] to-[#111827] shadow-md">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/20 text-red-400">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400">Clientes Inactivos</p>
              <div className="flex items-center">
                <h3 className="text-2xl font-bold text-white">33</h3>
                <Badge variant="outline" className="ml-2 border-red-800 bg-red-900/30 text-red-400">
                  <ArrowDownRight className="mr-1 h-3 w-3" />
                  2.1%
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none bg-gradient-to-br from-[#1a2236] to-[#111827] shadow-md">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#3b82f6]/20 text-[#3b82f6]">
              <CreditCard className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400">Ingresos Mensuales</p>
              <div className="flex items-center">
                <h3 className="text-2xl font-bold text-white">$12,450</h3>
                <Badge variant="outline" className="ml-2 border-green-800 bg-green-900/30 text-green-400">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  5.3%
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico principal */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle>Ingresos Mensuales</CardTitle>
            <CardDescription>Ingresos por recaudación de servicios</CardDescription>
          </div>
          <Badge variant="outline" className="bg-blue-900/30 text-blue-400">
            <TrendingUp className="mr-1 h-3 w-3" />
            +12.5% vs año anterior
          </Badge>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyRevenue}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1f2937" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  formatter={(value) => [`$${value}`, "Ingresos"]}
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    borderRadius: "0.5rem",
                    border: "1px solid #374151",
                    color: "#f9fafb",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="valor"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorUv)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Distribución de clientes */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Distribución por Plan</CardTitle>
            <CardDescription>Clientes por plan contratado</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={clientesPorPlan}
                    cx="50%"
                    cy="45%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                  >
                    {clientesPorPlan.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS_PLAN[index % COLORS_PLAN.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value} clientes`, "Cantidad"]}
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      borderRadius: "0.5rem",
                      border: "1px solid #374151",
                      color: "#f9fafb",
                    }}
                  />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    wrapperStyle={{ paddingTop: "20px" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Distribución Geográfica</CardTitle>
            <CardDescription>Clientes por sector geográfico</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={clientesPorSector}
                    cx="50%"
                    cy="45%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                  >
                    {clientesPorSector.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value} clientes`, "Cantidad"]}
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      borderRadius: "0.5rem",
                      border: "1px solid #374151",
                      color: "#f9fafb",
                    }}
                  />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    wrapperStyle={{ paddingTop: "20px" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
