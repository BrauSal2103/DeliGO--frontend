"use client"

import type React from "react"

import { useState } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
  TextField,
  InputAdornment,
  Chip,
  Rating,
  Tabs,
  Tab,
  Avatar,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import {
  Search,
  Filter,
  MoreVertical,
  TrendingUp,
  Calendar,
  DollarSign,
  Package,
  Star,
  Clock,
  MapPin,
  CheckCircle,
  XCircle,
  Car,
  ChefHat,
  User,
  BarChart3,
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

interface DeliveryRecord {
  id: string
  date: string
  time: string
  restaurantName: string
  restaurantAddress: string
  customerName: string
  customerAddress: string
  distance: number
  duration: number
  earnings: number
  tip: number
  totalEarnings: number
  status: "completed" | "cancelled" | "issue"
  rating?: number
  paymentMethod: "cash" | "card" | "digital"
  orderValue: number
  customerRating?: number
  restaurantRating: number
  vehicleType: "car" | "bike" | "motorcycle"
}

interface DeliveryStats {
  totalDeliveries: number
  totalEarnings: number
  totalDistance: number
  totalTime: number
  averageRating: number
  completionRate: number
  totalTips: number
  averageEarningsPerDelivery: number
  bestDay: string
  bestDayEarnings: number
}

const mockDeliveries: DeliveryRecord[] = [
  {
    id: "DG-2024-101",
    date: "2024-01-15",
    time: "14:30",
    restaurantName: "Bella Italia",
    restaurantAddress: "Av. Roma 456, Palermo",
    customerName: "Juan Pérez",
    customerAddress: "Av. Libertador 1234, Apt 4B",
    distance: 2.3,
    duration: 18,
    earnings: 8.5,
    tip: 2.0,
    totalEarnings: 10.5,
    status: "completed",
    rating: 5,
    paymentMethod: "card",
    orderValue: 54.97,
    customerRating: 4.8,
    restaurantRating: 4.8,
    vehicleType: "bike",
  },
  {
    id: "DG-2024-102",
    date: "2024-01-15",
    time: "16:45",
    restaurantName: "Taco Loco",
    restaurantAddress: "Calle México 789",
    customerName: "María García",
    customerAddress: "Av. Corrientes 2468, Centro",
    distance: 4.1,
    duration: 25,
    earnings: 12.0,
    tip: 3.5,
    totalEarnings: 15.5,
    status: "completed",
    rating: 5,
    paymentMethod: "cash",
    orderValue: 32.5,
    customerRating: 4.9,
    restaurantRating: 4.6,
    vehicleType: "bike",
  },
  {
    id: "DG-2024-103",
    date: "2024-01-15",
    time: "19:20",
    restaurantName: "Sushi Zen",
    restaurantAddress: "Av. Japón 321",
    customerName: "Carlos López",
    customerAddress: "Calle Florida 987, Microcentro",
    distance: 1.8,
    duration: 12,
    earnings: 15.2,
    tip: 5.0,
    totalEarnings: 20.2,
    status: "completed",
    rating: 5,
    paymentMethod: "digital",
    orderValue: 67.99,
    customerRating: 5.0,
    restaurantRating: 4.9,
    vehicleType: "bike",
  },
  {
    id: "DG-2024-104",
    date: "2024-01-14",
    time: "13:15",
    restaurantName: "Green Garden",
    restaurantAddress: "Av. Verde 147",
    customerName: "Ana Martínez",
    customerAddress: "Av. Santa Fe 1357, Recoleta",
    distance: 3.2,
    duration: 22,
    earnings: 6.8,
    tip: 1.0,
    totalEarnings: 7.8,
    status: "completed",
    rating: 4,
    paymentMethod: "card",
    orderValue: 28.97,
    customerRating: 4.2,
    restaurantRating: 4.7,
    vehicleType: "bike",
  },
  {
    id: "DG-2024-105",
    date: "2024-01-14",
    time: "20:30",
    restaurantName: "Burger House",
    restaurantAddress: "Av. América 654",
    customerName: "Luis Rodríguez",
    customerAddress: "Calle Rivadavia 789",
    distance: 2.8,
    duration: 0,
    earnings: 0,
    tip: 0,
    totalEarnings: 0,
    status: "cancelled",
    paymentMethod: "card",
    orderValue: 39.97,
    restaurantRating: 4.5,
    vehicleType: "bike",
  },
  {
    id: "DG-2024-106",
    date: "2024-01-13",
    time: "12:45",
    restaurantName: "Le Petit Bistro",
    restaurantAddress: "Av. París 258",
    customerName: "Sofia Hernández",
    customerAddress: "Av. Callao 456, Barrio Norte",
    distance: 5.2,
    duration: 35,
    earnings: 18.5,
    tip: 8.0,
    totalEarnings: 26.5,
    status: "completed",
    rating: 5,
    paymentMethod: "cash",
    orderValue: 84.99,
    customerRating: 4.7,
    restaurantRating: 4.8,
    vehicleType: "bike",
  },
]

const deliveryStats: DeliveryStats = {
  totalDeliveries: 47,
  totalEarnings: 523.8,
  totalDistance: 142.6,
  totalTime: 18.5, // hours
  averageRating: 4.8,
  completionRate: 95.7,
  totalTips: 89.5,
  averageEarningsPerDelivery: 11.14,
  bestDay: "Viernes",
  bestDayEarnings: 78.5,
}

export default function DeliveryHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTab, setSelectedTab] = useState(0)
  const [selectedPeriod, setSelectedPeriod] = useState("week")
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryRecord | null>(null)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)

  const filterTabs = ["Todas", "Completadas", "Canceladas", "Con Problemas"]
  const periodOptions = [
    { value: "today", label: "Hoy" },
    { value: "week", label: "Esta Semana" },
    { value: "month", label: "Este Mes" },
    { value: "year", label: "Este Año" },
  ]

  const filteredDeliveries = mockDeliveries.filter((delivery) => {
    const matchesSearch =
      delivery.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.restaurantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.customerName.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTab =
      selectedTab === 0 ||
      (selectedTab === 1 && delivery.status === "completed") ||
      (selectedTab === 2 && delivery.status === "cancelled") ||
      (selectedTab === 3 && delivery.status === "issue")

    return matchesSearch && matchesTab
  })

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, delivery: DeliveryRecord) => {
    setAnchorEl(event.currentTarget)
    setSelectedDelivery(delivery)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedDelivery(null)
  }

  const handleViewDetails = () => {
    setShowDetailsDialog(true)
    handleMenuClose()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "success"
      case "cancelled":
        return "error"
      case "issue":
        return "warning"
      default:
        return "default"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completada"
      case "cancelled":
        return "Cancelada"
      case "issue":
        return "Con Problema"
      default:
        return "Desconocido"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle size={16} />
      case "cancelled":
        return <XCircle size={16} />
      case "issue":
        return <Clock size={16} />
      default:
        return <Clock size={16} />
    }
  }

  const getVehicleIcon = (vehicle: string) => {
    switch (vehicle) {
      case "car":
        return "🚗"
      case "bike":
        return "🚲"
      case "motorcycle":
        return "🏍️"
      default:
        return "🚲"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Hoy"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Ayer"
    } else {
      return date.toLocaleDateString("es-ES", { day: "numeric", month: "short" })
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="w-screen h-screen bg-gray-50 flex flex-col overflow-hidden">
        {/* Header */}
        <AppBar position="static" className="bg-white shadow-sm">
          <Toolbar className="w-full px-4">
            <div className="flex items-center gap-3 flex-grow">
              <Avatar className="bg-emerald-500">
                <Car size={20} />
              </Avatar>
              <div>
                <Typography variant="h6" className="font-bold text-emerald-600">
                  Historial de Entregas
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  {deliveryStats.totalDeliveries} entregas realizadas
                </Typography>
              </div>
            </div>
            <IconButton>
              <BarChart3 size={24} />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Stats Cards */}
        <div className="w-full bg-white border-b p-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <Card className="bg-emerald-50 border-emerald-200">
              <CardContent className="p-3 text-center">
                <DollarSign size={20} className="text-emerald-600 mx-auto mb-1" />
                <Typography variant="h6" className="font-bold text-emerald-800 text-sm">
                  ${deliveryStats.totalEarnings.toFixed(0)}
                </Typography>
                <Typography variant="body2" className="text-emerald-700 text-xs">
                  Total Ganado
                </Typography>
              </CardContent>
            </Card>
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-3 text-center">
                <Package size={20} className="text-blue-600 mx-auto mb-1" />
                <Typography variant="h6" className="font-bold text-blue-800 text-sm">
                  {deliveryStats.totalDeliveries}
                </Typography>
                <Typography variant="body2" className="text-blue-700 text-xs">
                  Entregas
                </Typography>
              </CardContent>
            </Card>
            <Card className="bg-amber-50 border-amber-200">
              <CardContent className="p-3 text-center">
                <Star size={20} className="text-amber-600 mx-auto mb-1" />
                <Typography variant="h6" className="font-bold text-amber-800 text-sm">
                  {deliveryStats.averageRating}
                </Typography>
                <Typography variant="body2" className="text-amber-700 text-xs">
                  Rating Prom.
                </Typography>
              </CardContent>
            </Card>
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-3 text-center">
                <TrendingUp size={20} className="text-purple-600 mx-auto mb-1" />
                <Typography variant="h6" className="font-bold text-purple-800 text-sm">
                  {deliveryStats.completionRate}%
                </Typography>
                <Typography variant="body2" className="text-purple-700 text-xs">
                  Completado
                </Typography>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="w-full bg-white border-b p-4">
          <div className="flex gap-3 mb-3">
            <TextField
              size="small"
              placeholder="Buscar por pedido, restaurante o cliente..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={16} className="text-gray-400" />
                  </InputAdornment>
                ),
              }}
              className="flex-grow"
            />
            <IconButton className="border border-gray-300">
              <Filter size={20} />
            </IconButton>
          </div>

          <div className="flex justify-between items-center">
            <Tabs
              value={selectedTab}
              onChange={(_, newValue) => setSelectedTab(newValue)}
              variant="scrollable"
              scrollButtons="auto"
              className="flex-grow"
            >
              {filterTabs.map((tab, index) => (
                <Tab key={index} label={tab} className="min-w-fit text-xs" />
              ))}
            </Tabs>

            <div className="flex gap-2 ml-4">
              {periodOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={selectedPeriod === option.value ? "contained" : "outlined"}
                  size="small"
                  onClick={() => setSelectedPeriod(option.value)}
                  className={
                    selectedPeriod === option.value
                      ? "bg-emerald-500 hover:bg-emerald-600 text-xs"
                      : "border-emerald-500 text-emerald-600 text-xs"
                  }
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Deliveries List */}
        <div className="flex-grow w-full overflow-y-auto p-4">
          {filteredDeliveries.length === 0 ? (
            <Card className="w-full">
              <CardContent className="p-8 text-center">
                <Package size={64} className="text-gray-300 mx-auto mb-4" />
                <Typography variant="h6" className="text-gray-500 mb-2">
                  No se encontraron entregas
                </Typography>
                <Typography variant="body2" className="text-gray-400">
                  {searchQuery ? "Intenta con otros términos de búsqueda" : "Aún no has realizado entregas"}
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3 max-w-4xl mx-auto">
              {filteredDeliveries.map((delivery) => (
                <Card key={delivery.id} className="w-full hover:shadow-lg transition-shadow duration-200">
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      {/* Status Icon */}
                      <div className="flex-shrink-0">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            delivery.status === "completed"
                              ? "bg-emerald-100 text-emerald-600"
                              : delivery.status === "cancelled"
                                ? "bg-red-100 text-red-600"
                                : "bg-amber-100 text-amber-600"
                          }`}
                        >
                          {getStatusIcon(delivery.status)}
                        </div>
                      </div>

                      {/* Delivery Info */}
                      <div className="flex-grow min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <Typography variant="h6" className="font-bold text-gray-900 text-sm">
                              Pedido #{delivery.id}
                            </Typography>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Calendar size={12} />
                              <Typography variant="body2" className="text-xs">
                                {formatDate(delivery.date)} • {delivery.time}
                              </Typography>
                              <span className="text-lg">{getVehicleIcon(delivery.vehicleType)}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Chip
                              icon={getStatusIcon(delivery.status)}
                              label={getStatusText(delivery.status)}
                              color={getStatusColor(delivery.status) as "success" | "error" | "warning" | "default"}
                              size="small"
                              className="text-xs"
                            />
                            <IconButton size="small" onClick={(e) => handleMenuClick(e, delivery)}>
                              <MoreVertical size={14} />
                            </IconButton>
                          </div>
                        </div>

                        {/* Route Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                          <div className="flex items-start gap-2">
                            <ChefHat size={14} className="text-emerald-600 mt-1 flex-shrink-0" />
                            <div className="min-w-0">
                              <Typography variant="body2" className="font-medium text-gray-900 text-xs truncate">
                                {delivery.restaurantName}
                              </Typography>
                              <Typography variant="body2" className="text-gray-600 text-xs truncate">
                                {delivery.restaurantAddress}
                              </Typography>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <User size={14} className="text-blue-600 mt-1 flex-shrink-0" />
                            <div className="min-w-0">
                              <Typography variant="body2" className="font-medium text-gray-900 text-xs truncate">
                                {delivery.customerName}
                              </Typography>
                              <Typography variant="body2" className="text-gray-600 text-xs truncate">
                                {delivery.customerAddress}
                              </Typography>
                            </div>
                          </div>
                        </div>

                        {/* Metrics */}
                        <div className="grid grid-cols-4 gap-3 mb-3">
                          <div className="text-center p-2 bg-gray-50 rounded">
                            <Typography variant="h6" className="font-bold text-gray-900 text-xs">
                              {delivery.distance} km
                            </Typography>
                            <Typography variant="body2" className="text-gray-600 text-xs">
                              Distancia
                            </Typography>
                          </div>
                          <div className="text-center p-2 bg-gray-50 rounded">
                            <Typography variant="h6" className="font-bold text-gray-900 text-xs">
                              {delivery.duration || 0} min
                            </Typography>
                            <Typography variant="body2" className="text-gray-600 text-xs">
                              Tiempo
                            </Typography>
                          </div>
                          <div className="text-center p-2 bg-emerald-50 rounded">
                            <Typography variant="h6" className="font-bold text-emerald-600 text-xs">
                              ${delivery.earnings.toFixed(2)}
                            </Typography>
                            <Typography variant="body2" className="text-emerald-700 text-xs">
                              Base
                            </Typography>
                          </div>
                          <div className="text-center p-2 bg-amber-50 rounded">
                            <Typography variant="h6" className="font-bold text-amber-600 text-xs">
                              ${delivery.tip.toFixed(2)}
                            </Typography>
                            <Typography variant="body2" className="text-amber-700 text-xs">
                              Propina
                            </Typography>
                          </div>
                        </div>

                        {/* Bottom Row */}
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            {delivery.rating && (
                              <div className="flex items-center gap-1">
                                <Rating value={delivery.rating} size="small" readOnly />
                                <Typography variant="body2" className="text-gray-600 text-xs">
                                  {delivery.rating}/5
                                </Typography>
                              </div>
                            )}
                            <Chip
                              label={
                                delivery.paymentMethod === "cash"
                                  ? "Efectivo"
                                  : delivery.paymentMethod === "card"
                                    ? "Tarjeta"
                                    : "Digital"
                              }
                              size="small"
                              variant="outlined"
                              className="text-xs"
                            />
                          </div>
                          <Typography variant="h6" className="font-bold text-emerald-600 text-sm">
                            ${delivery.totalEarnings.toFixed(2)}
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Context Menu */}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleViewDetails}>Ver Detalles</MenuItem>
          <MenuItem onClick={handleMenuClose}>Ver en Mapa</MenuItem>
          <MenuItem onClick={handleMenuClose}>Contactar Cliente</MenuItem>
          <MenuItem onClick={handleMenuClose}>Reportar Problema</MenuItem>
        </Menu>

        {/* Details Dialog */}
        <Dialog open={showDetailsDialog} onClose={() => setShowDetailsDialog(false)} maxWidth="md" fullWidth>
          {selectedDelivery && (
            <>
              <DialogTitle>
                <div className="flex justify-between items-center">
                  <div>
                    <Typography variant="h6" className="font-bold">
                      Detalles de Entrega #{selectedDelivery.id}
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      {formatDate(selectedDelivery.date)} • {selectedDelivery.time}
                    </Typography>
                  </div>
                  <Chip
                    label={getStatusText(selectedDelivery.status)}
                    color={getStatusColor(selectedDelivery.status) as "success" | "error" | "warning" | "default"}
                  />
                </div>
              </DialogTitle>
              <DialogContent>
                <div className="space-y-6">
                  {/* Earnings Summary */}
                  <div className="bg-emerald-50 rounded-lg p-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <Typography variant="h5" className="font-bold text-emerald-600">
                          ${selectedDelivery.earnings.toFixed(2)}
                        </Typography>
                        <Typography variant="body2" className="text-emerald-700">
                          Ganancia Base
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="h5" className="font-bold text-amber-600">
                          ${selectedDelivery.tip.toFixed(2)}
                        </Typography>
                        <Typography variant="body2" className="text-amber-700">
                          Propina
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="h5" className="font-bold text-gray-900">
                          ${selectedDelivery.totalEarnings.toFixed(2)}
                        </Typography>
                        <Typography variant="body2" className="text-gray-700">
                          Total
                        </Typography>
                      </div>
                    </div>
                  </div>

                  {/* Route Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <ChefHat size={20} className="text-emerald-600" />
                        <Typography variant="subtitle1" className="font-semibold">
                          Restaurante
                        </Typography>
                      </div>
                      <Typography variant="body1" className="font-medium mb-1">
                        {selectedDelivery.restaurantName}
                      </Typography>
                      <Typography variant="body2" className="text-gray-600 mb-2">
                        {selectedDelivery.restaurantAddress}
                      </Typography>
                      <div className="flex items-center gap-1">
                        <Star size={16} className="text-amber-500" fill="currentColor" />
                        <Typography variant="body2" className="text-gray-600">
                          {selectedDelivery.restaurantRating}
                        </Typography>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <User size={20} className="text-blue-600" />
                        <Typography variant="subtitle1" className="font-semibold">
                          Cliente
                        </Typography>
                      </div>
                      <Typography variant="body1" className="font-medium mb-1">
                        {selectedDelivery.customerName}
                      </Typography>
                      <Typography variant="body2" className="text-gray-600 mb-2">
                        {selectedDelivery.customerAddress}
                      </Typography>
                      {selectedDelivery.customerRating && (
                        <div className="flex items-center gap-1">
                          <Star size={16} className="text-amber-500" fill="currentColor" />
                          <Typography variant="body2" className="text-gray-600">
                            {selectedDelivery.customerRating}
                          </Typography>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Trip Metrics */}
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <MapPin size={24} className="text-blue-600 mx-auto mb-2" />
                      <Typography variant="h6" className="font-bold text-blue-600">
                        {selectedDelivery.distance} km
                      </Typography>
                      <Typography variant="body2" className="text-blue-700">
                        Distancia
                      </Typography>
                    </div>
                    <div className="text-center p-3 bg-amber-50 rounded-lg">
                      <Clock size={24} className="text-amber-600 mx-auto mb-2" />
                      <Typography variant="h6" className="font-bold text-amber-600">
                        {selectedDelivery.duration} min
                      </Typography>
                      <Typography variant="body2" className="text-amber-700">
                        Duración
                      </Typography>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <DollarSign size={24} className="text-purple-600 mx-auto mb-2" />
                      <Typography variant="h6" className="font-bold text-purple-600">
                        ${selectedDelivery.orderValue.toFixed(2)}
                      </Typography>
                      <Typography variant="body2" className="text-purple-700">
                        Valor Pedido
                      </Typography>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-3xl mb-2 block">{getVehicleIcon(selectedDelivery.vehicleType)}</span>
                      <Typography variant="body2" className="text-gray-700">
                        Vehículo
                      </Typography>
                    </div>
                  </div>

                  {/* Rating */}
                  {selectedDelivery.rating && (
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <Typography variant="subtitle1" className="font-semibold mb-2">
                        Tu Calificación
                      </Typography>
                      <Rating value={selectedDelivery.rating} size="large" readOnly />
                      <Typography variant="body2" className="text-gray-600 mt-1">
                        {selectedDelivery.rating}/5 estrellas
                      </Typography>
                    </div>
                  )}
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setShowDetailsDialog(false)}>Cerrar</Button>
                <Button variant="contained" className="bg-emerald-500 hover:bg-emerald-600">
                  Ver en Mapa
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </div>
    </ThemeProvider>
  )
}
