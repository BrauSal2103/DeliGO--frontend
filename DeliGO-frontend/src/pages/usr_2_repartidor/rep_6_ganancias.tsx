"use client"

import { useState } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
  Tabs,
  Tab,
  LinearProgress,
  Chip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Divider,
  Alert,
} from "@mui/material"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import {
  DollarSign,
  TrendingUp,
  Target,
  Clock,
  Fuel,
  Settings,
  Download,
  Plus,
  Package,
  Star,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  CreditCard,
} from "lucide-react"

const theme = createTheme({
  palette: {
    primary: {
      main: "#10b981", // emerald-500
      dark: "#059669", // emerald-600
    },
    secondary: {
      main: "#f59e0b", // amber-500
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
})

interface EarningsData {
  period: string
  totalEarnings: number
  baseEarnings: number
  tips: number
  bonuses: number
  deliveries: number
  hours: number
  avgPerDelivery: number
  avgPerHour: number
}

interface ExpenseData {
  category: string
  amount: number
  description: string
  date: string
  type: "fuel" | "maintenance" | "insurance" | "other"
}

interface GoalData {
  type: "daily" | "weekly" | "monthly"
  target: number
  current: number
  description: string
}

const earningsData: Record<string, EarningsData> = {
  today: {
    period: "Hoy",
    totalEarnings: 127.5,
    baseEarnings: 89.0,
    tips: 32.5,
    bonuses: 6.0,
    deliveries: 8,
    hours: 6.5,
    avgPerDelivery: 15.94,
    avgPerHour: 19.62,
  },
  week: {
    period: "Esta Semana",
    totalEarnings: 523.8,
    baseEarnings: 367.2,
    tips: 134.6,
    bonuses: 22.0,
    deliveries: 34,
    hours: 28.5,
    avgPerDelivery: 15.41,
    avgPerHour: 18.38,
  },
  month: {
    period: "Este Mes",
    totalEarnings: 2156.4,
    baseEarnings: 1509.8,
    tips: 558.6,
    bonuses: 88.0,
    deliveries: 142,
    hours: 118.2,
    avgPerDelivery: 15.19,
    avgPerHour: 18.24,
  },
  year: {
    period: "Este Año",
    totalEarnings: 18247.6,
    baseEarnings: 12773.3,
    tips: 4726.3,
    bonuses: 748.0,
    deliveries: 1204,
    hours: 1002.5,
    avgPerDelivery: 15.15,
    avgPerHour: 18.2,
  },
}

const expensesData: ExpenseData[] = [
  {
    category: "Combustible",
    amount: 45.0,
    description: "Carga de nafta - YPF",
    date: "2024-01-15",
    type: "fuel",
  },
  {
    category: "Mantenimiento",
    amount: 120.0,
    description: "Cambio de aceite y filtros",
    date: "2024-01-12",
    type: "maintenance",
  },
  {
    category: "Seguro",
    amount: 89.5,
    description: "Cuota mensual seguro",
    date: "2024-01-10",
    type: "insurance",
  },
  {
    category: "Otros",
    amount: 25.0,
    description: "Estacionamiento centro",
    date: "2024-01-14",
    type: "other",
  },
]

const goalsData: GoalData[] = [
  {
    type: "daily",
    target: 150.0,
    current: 127.5,
    description: "Meta diaria de ganancias",
  },
  {
    type: "weekly",
    target: 600.0,
    current: 523.8,
    description: "Meta semanal de ganancias",
  },
  {
    type: "monthly",
    target: 2500.0,
    current: 2156.4,
    description: "Meta mensual de ganancias",
  },
]

const weeklyTrend = [
  { day: "Lun", earnings: 78.5, deliveries: 5 },
  { day: "Mar", earnings: 92.3, deliveries: 6 },
  { day: "Mié", earnings: 105.7, deliveries: 7 },
  { day: "Jue", earnings: 89.4, deliveries: 6 },
  { day: "Vie", earnings: 134.2, deliveries: 9 },
  { day: "Sáb", earnings: 156.8, deliveries: 11 },
  { day: "Dom", earnings: 127.5, deliveries: 8 },
]

export default function EarningsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("today")
  const [selectedTab, setSelectedTab] = useState(0)
  const [showAddExpense, setShowAddExpense] = useState(false)
  const [showGoalDialog, setShowGoalDialog] = useState(false)
  const [newExpense, setNewExpense] = useState({
    category: "",
    amount: "",
    description: "",
    type: "fuel" as const,
  })

  const currentData = earningsData[selectedPeriod]
  const totalExpenses = expensesData.reduce((sum, expense) => sum + expense.amount, 0)
  const netEarnings = currentData.totalEarnings - (selectedPeriod === "today" ? 45 : totalExpenses)

  const periodOptions = [
    { value: "today", label: "Hoy" },
    { value: "week", label: "Semana" },
    { value: "month", label: "Mes" },
    { value: "year", label: "Año" },
  ]

  const tabLabels = ["Resumen", "Tendencias", "Gastos", "Metas"]

  const handleAddExpense = () => {
    // Aquí se agregaría el gasto
    console.log("Adding expense:", newExpense)
    setShowAddExpense(false)
    setNewExpense({ category: "", amount: "", description: "", type: "fuel" })
  }

  const getExpenseIcon = (type: string) => {
    switch (type) {
      case "fuel":
        return <Fuel size={20} className="text-red-600" />
      case "maintenance":
        return <Settings size={20} className="text-blue-600" />
      case "insurance":
        return <CreditCard size={20} className="text-purple-600" />
      default:
        return <Wallet size={20} className="text-gray-600" />
    }
  }

  const getGoalProgress = (goal: GoalData) => {
    return Math.min((goal.current / goal.target) * 100, 100)
  }

  // const getGoalColor = (progress: number) => {
  //   if (progress >= 100) return "success"
  //   if (progress >= 80) return "warning"
  //   return "primary"
  // }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="w-screen h-screen bg-gray-50 flex flex-col overflow-hidden">
        {/* Header */}
        <AppBar position="static" className="bg-white shadow-sm">
          <Toolbar className="w-full px-4">
            <div className="flex items-center gap-3 flex-grow">
              <Avatar className="bg-emerald-500">
                <DollarSign size={20} />
              </Avatar>
              <div>
                <Typography variant="h6" className="font-bold text-emerald-600">
                  Ganancias y Balance
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  Gestiona tus finanzas como repartidor
                </Typography>
              </div>
            </div>
            <div className="flex gap-2">
              <IconButton className="text-gray-600">
                <Download size={20} />
              </IconButton>
              <IconButton className="text-gray-600">
                <BarChart3 size={20} />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>

        {/* Period Selector */}
        <div className="w-full bg-white border-b p-4">
          <div className="flex justify-center gap-2">
            {periodOptions.map((option) => (
              <Button
                key={option.value}
                variant={selectedPeriod === option.value ? "contained" : "outlined"}
                onClick={() => setSelectedPeriod(option.value)}
                className={
                  selectedPeriod === option.value
                    ? "bg-emerald-500 hover:bg-emerald-600"
                    : "border-emerald-500 text-emerald-600"
                }
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Main Earnings Card */}
        <div className="w-full p-4">
          <Card className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <Typography variant="h3" className="font-bold mb-2">
                  ${currentData.totalEarnings.toFixed(2)}
                </Typography>
                <Typography variant="h6" className="opacity-90">
                  Ganancias {currentData.period}
                </Typography>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <Typography variant="h5" className="font-bold">
                    ${currentData.baseEarnings.toFixed(2)}
                  </Typography>
                  <Typography variant="body2" className="opacity-80">
                    Base
                  </Typography>
                </div>
                <div className="text-center">
                  <Typography variant="h5" className="font-bold">
                    ${currentData.tips.toFixed(2)}
                  </Typography>
                  <Typography variant="body2" className="opacity-80">
                    Propinas
                  </Typography>
                </div>
                <div className="text-center">
                  <Typography variant="h5" className="font-bold">
                    ${currentData.bonuses.toFixed(2)}
                  </Typography>
                  <Typography variant="body2" className="opacity-80">
                    Bonos
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="w-full bg-white border-b">
          <Tabs
            value={selectedTab}
            onChange={(_, newValue) => setSelectedTab(newValue)}
            variant="fullWidth"
            className="px-4"
          >
            {tabLabels.map((label, index) => (
              <Tab key={index} label={label} />
            ))}
          </Tabs>
        </div>

        {/* Tab Content */}
        <div className="flex-grow w-full overflow-y-auto p-4">
          {/* Resumen Tab */}
          {selectedTab === 0 && (
            <div className="space-y-4 max-w-4xl mx-auto">
              {/* Key Metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Package size={24} className="text-emerald-600 mx-auto mb-2" />
                    <Typography variant="h5" className="font-bold text-gray-900">
                      {currentData.deliveries}
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      Entregas
                    </Typography>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Clock size={24} className="text-blue-600 mx-auto mb-2" />
                    <Typography variant="h5" className="font-bold text-gray-900">
                      {currentData.hours.toFixed(1)}h
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      Horas
                    </Typography>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <TrendingUp size={24} className="text-purple-600 mx-auto mb-2" />
                    <Typography variant="h5" className="font-bold text-gray-900">
                      ${currentData.avgPerDelivery.toFixed(2)}
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      Por Entrega
                    </Typography>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Star size={24} className="text-amber-600 mx-auto mb-2" />
                    <Typography variant="h5" className="font-bold text-gray-900">
                      ${currentData.avgPerHour.toFixed(2)}
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      Por Hora
                    </Typography>
                  </CardContent>
                </Card>
              </div>

              {/* Net Earnings */}
              <Card className="border-l-4 border-l-emerald-500">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <Typography variant="h6" className="font-bold text-gray-900 mb-1">
                        Ganancia Neta
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        Después de gastos
                      </Typography>
                    </div>
                    <div className="text-right">
                      <Typography variant="h4" className="font-bold text-emerald-600">
                        ${netEarnings.toFixed(2)}
                      </Typography>
                      <div className="flex items-center gap-1 justify-end">
                        {netEarnings > currentData.totalEarnings * 0.8 ? (
                          <ArrowUpRight size={16} className="text-emerald-600" />
                        ) : (
                          <ArrowDownRight size={16} className="text-red-600" />
                        )}
                        <Typography variant="body2" className="text-gray-600">
                          {((netEarnings / currentData.totalEarnings) * 100).toFixed(1)}% del bruto
                        </Typography>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Breakdown */}
              <Card>
                <CardContent className="p-6">
                  <Typography variant="h6" className="font-bold text-gray-900 mb-4">
                    Desglose de Ingresos
                  </Typography>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-emerald-500 rounded"></div>
                        <Typography variant="body1">Ganancias Base</Typography>
                      </div>
                      <Typography variant="body1" className="font-medium">
                        ${currentData.baseEarnings.toFixed(2)}
                      </Typography>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-amber-500 rounded"></div>
                        <Typography variant="body1">Propinas</Typography>
                      </div>
                      <Typography variant="body1" className="font-medium">
                        ${currentData.tips.toFixed(2)}
                      </Typography>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-purple-500 rounded"></div>
                        <Typography variant="body1">Bonos</Typography>
                      </div>
                      <Typography variant="body1" className="font-medium">
                        ${currentData.bonuses.toFixed(2)}
                      </Typography>
                    </div>
                    <Divider />
                    <div className="flex justify-between items-center">
                      <Typography variant="h6" className="font-bold">
                        Total Bruto
                      </Typography>
                      <Typography variant="h6" className="font-bold text-emerald-600">
                        ${currentData.totalEarnings.toFixed(2)}
                      </Typography>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Tendencias Tab */}
          {selectedTab === 1 && (
            <div className="space-y-4 max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-6">
                  <Typography variant="h6" className="font-bold text-gray-900 mb-4">
                    Tendencia Semanal
                  </Typography>
                  <div className="space-y-4">
                    {weeklyTrend.map((day, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <Typography variant="body2" className="w-12 text-gray-600">
                          {day.day}
                        </Typography>
                        <div className="flex-grow">
                          <div className="flex justify-between items-center mb-1">
                            <Typography variant="body2" className="text-gray-700">
                              ${day.earnings.toFixed(2)}
                            </Typography>
                            <Typography variant="body2" className="text-gray-500">
                              {day.deliveries} entregas
                            </Typography>
                          </div>
                          <LinearProgress
                            variant="determinate"
                            value={(day.earnings / 160) * 100}
                            className="h-2 rounded-full"
                            sx={{
                              backgroundColor: "#e5e7eb",
                              "& .MuiLinearProgress-bar": {
                                backgroundColor: "#10b981",
                              },
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <Typography variant="h6" className="font-bold text-gray-900 mb-4">
                      Mejor Día
                    </Typography>
                    <div className="text-center">
                      <Typography variant="h4" className="font-bold text-emerald-600 mb-2">
                        Sábado
                      </Typography>
                      <Typography variant="h5" className="font-bold text-gray-900 mb-1">
                        $156.80
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        11 entregas • 8.5 horas
                      </Typography>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <Typography variant="h6" className="font-bold text-gray-900 mb-4">
                      Promedio Diario
                    </Typography>
                    <div className="text-center">
                      <Typography variant="h4" className="font-bold text-blue-600 mb-2">
                        $112.11
                      </Typography>
                      <Typography variant="body2" className="text-gray-600 mb-2">
                        7.2 entregas promedio
                      </Typography>
                      <div className="flex items-center justify-center gap-1">
                        <TrendingUp size={16} className="text-emerald-600" />
                        <Typography variant="body2" className="text-emerald-600">
                          +12% vs semana anterior
                        </Typography>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Gastos Tab */}
          {selectedTab === 2 && (
            <div className="space-y-4 max-w-4xl mx-auto">
              <div className="flex justify-between items-center">
                <Typography variant="h6" className="font-bold text-gray-900">
                  Gastos del Mes
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Plus size={16} />}
                  onClick={() => setShowAddExpense(true)}
                  className="bg-emerald-500 hover:bg-emerald-600"
                >
                  Agregar Gasto
                </Button>
              </div>

              <Card className="bg-red-50 border-red-200">
                <CardContent className="p-6 text-center">
                  <Typography variant="h4" className="font-bold text-red-600 mb-2">
                    ${totalExpenses.toFixed(2)}
                  </Typography>
                  <Typography variant="body1" className="text-red-700">
                    Total de Gastos del Mes
                  </Typography>
                </CardContent>
              </Card>

              <div className="space-y-3">
                {expensesData.map((expense, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0">{getExpenseIcon(expense.type)}</div>
                        <div className="flex-grow">
                          <Typography variant="subtitle1" className="font-semibold text-gray-900">
                            {expense.category}
                          </Typography>
                          <Typography variant="body2" className="text-gray-600">
                            {expense.description}
                          </Typography>
                          <Typography variant="body2" className="text-gray-500 text-xs">
                            {new Date(expense.date).toLocaleDateString("es-ES")}
                          </Typography>
                        </div>
                        <div className="text-right">
                          <Typography variant="h6" className="font-bold text-red-600">
                            -${expense.amount.toFixed(2)}
                          </Typography>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardContent className="p-6">
                  <Typography variant="h6" className="font-bold text-gray-900 mb-4">
                    Categorías de Gastos
                  </Typography>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Fuel size={16} className="text-red-600" />
                        <Typography variant="body2">Combustible</Typography>
                      </div>
                      <Typography variant="body2" className="font-medium">
                        $45.00
                      </Typography>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Settings size={16} className="text-blue-600" />
                        <Typography variant="body2">Mantenimiento</Typography>
                      </div>
                      <Typography variant="body2" className="font-medium">
                        $120.00
                      </Typography>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <CreditCard size={16} className="text-purple-600" />
                        <Typography variant="body2">Seguro</Typography>
                      </div>
                      <Typography variant="body2" className="font-medium">
                        $89.50
                      </Typography>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Wallet size={16} className="text-gray-600" />
                        <Typography variant="body2">Otros</Typography>
                      </div>
                      <Typography variant="body2" className="font-medium">
                        $25.00
                      </Typography>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Metas Tab */}
          {selectedTab === 3 && (
            <div className="space-y-4 max-w-4xl mx-auto">
              <div className="flex justify-between items-center">
                <Typography variant="h6" className="font-bold text-gray-900">
                  Mis Metas
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<Target size={16} />}
                  onClick={() => setShowGoalDialog(true)}
                  className="border-emerald-500 text-emerald-600"
                >
                  Editar Metas
                </Button>
              </div>

              {goalsData.map((goal, index) => {
                const progress = getGoalProgress(goal)
                const isCompleted = progress >= 100

                return (
                  <Card key={index} className={isCompleted ? "border-l-4 border-l-emerald-500" : ""}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <Typography variant="h6" className="font-bold text-gray-900 mb-1">
                            Meta {goal.type === "daily" ? "Diaria" : goal.type === "weekly" ? "Semanal" : "Mensual"}
                          </Typography>
                          <Typography variant="body2" className="text-gray-600">
                            {goal.description}
                          </Typography>
                        </div>
                        <Chip
                          label={isCompleted ? "Completada" : "En Progreso"}
                          color={isCompleted ? "success" : "default"}
                          size="small"
                        />
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <Typography variant="body2" className="text-gray-600">
                            Progreso: ${goal.current.toFixed(2)} / ${goal.target.toFixed(2)}
                          </Typography>
                          <Typography variant="body2" className="font-medium text-gray-900">
                            {progress.toFixed(1)}%
                          </Typography>
                        </div>
                        <LinearProgress
                          variant="determinate"
                          value={progress}
                          className="h-3 rounded-full"
                          sx={{
                            backgroundColor: "#e5e7eb",
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: isCompleted ? "#10b981" : "#3b82f6",
                            },
                          }}
                        />
                      </div>

                      <div className="flex justify-between items-center">
                        <Typography variant="body2" className="text-gray-600">
                          Restante: ${Math.max(0, goal.target - goal.current).toFixed(2)}
                        </Typography>
                        {isCompleted && (
                          <div className="flex items-center gap-1 text-emerald-600">
                            <Target size={16} />
                            <Typography variant="body2" className="font-medium">
                              ¡Meta alcanzada!
                            </Typography>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}

              <Alert severity="info">
                <Typography variant="body2">
                  <strong>Consejo:</strong> Mantén un registro constante de tus gastos para maximizar tus ganancias
                  netas. Las metas te ayudan a mantener la motivación y el enfoque.
                </Typography>
              </Alert>
            </div>
          )}
        </div>

        {/* Add Expense Dialog */}
        <Dialog open={showAddExpense} onClose={() => setShowAddExpense(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Agregar Nuevo Gasto</DialogTitle>
          <DialogContent>
            <div className="space-y-4 pt-4">
              <TextField
                fullWidth
                label="Categoría"
                value={newExpense.category}
                onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                placeholder="Ej: Combustible, Mantenimiento"
              />
              <TextField
                fullWidth
                label="Monto"
                type="number"
                value={newExpense.amount}
                onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                placeholder="0.00"
                InputProps={{
                  startAdornment: <Typography variant="body2">$</Typography>,
                }}
              />
              <TextField
                fullWidth
                label="Descripción"
                multiline
                rows={3}
                value={newExpense.description}
                onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                placeholder="Describe el gasto..."
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowAddExpense(false)}>Cancelar</Button>
            <Button
              onClick={handleAddExpense}
              variant="contained"
              disabled={!newExpense.category || !newExpense.amount}
              className="bg-emerald-500 hover:bg-emerald-600"
            >
              Agregar Gasto
            </Button>
          </DialogActions>
        </Dialog>

        {/* Goal Dialog */}
        <Dialog open={showGoalDialog} onClose={() => setShowGoalDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Editar Metas</DialogTitle>
          <DialogContent>
            <Typography variant="body2" className="text-gray-600 mb-4">
              Ajusta tus metas de ganancias para mantener la motivación
            </Typography>
            <div className="space-y-4">
              {goalsData.map((goal, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Typography variant="body2" className="w-20">
                    {goal.type === "daily" ? "Diaria" : goal.type === "weekly" ? "Semanal" : "Mensual"}:
                  </Typography>
                  <TextField
                    size="small"
                    type="number"
                    value={goal.target}
                    InputProps={{
                      startAdornment: <Typography variant="body2">$</Typography>,
                    }}
                    className="flex-grow"
                  />
                </div>
              ))}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowGoalDialog(false)}>Cancelar</Button>
            <Button variant="contained" className="bg-emerald-500 hover:bg-emerald-600">
              Guardar Metas
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider>
  )
}
