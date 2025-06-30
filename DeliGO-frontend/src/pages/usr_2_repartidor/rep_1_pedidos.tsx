"use client"

import { useState, useEffect } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
  Switch,
  FormControlLabel,
  Chip,
  Avatar,
  Alert,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Badge,
  Slider,
} from "@mui/material"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import {
  MapPin,
  Navigation,
  Clock,
  DollarSign,
  Car,
  ChefHat,
  Phone,
  Filter,
  RefreshCwIcon as Refresh,
  Settings,
  Package,
  Route,
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

interface AvailableOrder {
  id: string
  restaurantName: string
  restaurantAddress: string
  restaurantPhone: string
  deliveryAddress: string
  customerName: string
  customerPhone: string
  items: Array<{
    name: string
    quantity: number
  }>
  totalAmount: number
  estimatedEarnings: number
  distance: number
  estimatedTime: number
  preparationTime: number
  priority: "normal" | "high" | "urgent"
  paymentMethod: "cash" | "card" | "digital"
  specialInstructions?: string
  orderTime: string
  restaurantRating: number
  customerRating?: number
}

interface DriverStats {
  isOnline: boolean
  todayEarnings: number
  todayDeliveries: number
  currentRating: number
  completionRate: number
}

const mockOrders: AvailableOrder[] = [
  {
    id: "DG-2024-101",
    restaurantName: "Bella Italia",
    restaurantAddress: "Av. Roma 456",
    restaurantPhone: "+54 11 1234-5678",
    deliveryAddress: "Av. Libertador 1234, Apt 4B, Palermo",
    customerName: "Juan Pérez",
    customerPhone: "+54 11 9876-5432",
    items: [
      { name: "Pizza Margherita", quantity: 2 },
      { name: "Pasta Carbonara", quantity: 1 },
    ],
    totalAmount: 54.97,
    estimatedEarnings: 8.5,
    distance: 2.3,
    estimatedTime: 15,
    preparationTime: 8,
    priority: "normal",
    paymentMethod: "card",
    orderTime: "14:30",
    restaurantRating: 4.8,
    customerRating: 4.5,
  },
  {
    id: "DG-2024-102",
    restaurantName: "Taco Loco",
    restaurantAddress: "Calle México 789",
    restaurantPhone: "+54 11 2345-6789",
    deliveryAddress: "Av. Corrientes 2468, Centro",
    customerName: "María García",
    customerPhone: "+54 11 8765-4321",
    items: [
      { name: "Tacos de Carnitas", quantity: 3 },
      { name: "Quesadillas", quantity: 2 },
    ],
    totalAmount: 32.5,
    estimatedEarnings: 12.0,
    distance: 4.1,
    estimatedTime: 25,
    preparationTime: 12,
    priority: "high",
    paymentMethod: "cash",
    specialInstructions: "Llamar al llegar, portón azul",
    orderTime: "14:25",
    restaurantRating: 4.6,
    customerRating: 4.8,
  },
  {
    id: "DG-2024-103",
    restaurantName: "Sushi Zen",
    restaurantAddress: "Av. Japón 321",
    restaurantPhone: "+54 11 3456-7890",
    deliveryAddress: "Calle Florida 987, Microcentro",
    customerName: "Carlos López",
    customerPhone: "+54 11 7654-3210",
    items: [
      { name: "Sushi Variado", quantity: 1 },
      { name: "Ramen", quantity: 1 },
    ],
    totalAmount: 67.99,
    estimatedEarnings: 15.2,
    distance: 1.8,
    estimatedTime: 12,
    preparationTime: 15,
    priority: "urgent",
    paymentMethod: "digital",
    orderTime: "14:20",
    restaurantRating: 4.9,
  },
  {
    id: "DG-2024-104",
    restaurantName: "Green Garden",
    restaurantAddress: "Av. Verde 147",
    restaurantPhone: "+54 11 4567-8901",
    deliveryAddress: "Av. Santa Fe 1357, Recoleta",
    customerName: "Ana Martínez",
    customerPhone: "+54 11 6543-2109",
    items: [
      { name: "Ensalada Quinoa", quantity: 2 },
      { name: "Smoothie Verde", quantity: 1 },
    ],
    totalAmount: 28.97,
    estimatedEarnings: 6.8,
    distance: 3.2,
    estimatedTime: 20,
    preparationTime: 5,
    priority: "normal",
    paymentMethod: "card",
    orderTime: "14:35",
    restaurantRating: 4.7,
    customerRating: 4.2,
  },
]

const driverStats: DriverStats = {
  isOnline: true,
  todayEarnings: 127.5,
  todayDeliveries: 8,
  currentRating: 4.9,
  completionRate: 98.5,
}

export default function AvailableOrdersPage() {
  const [orders, setOrders] = useState<AvailableOrder[]>(mockOrders)
  const [stats, setStats] = useState<DriverStats>(driverStats)
  const [selectedOrder, setSelectedOrder] = useState<AvailableOrder | null>(null)
  const [showOrderDialog, setShowOrderDialog] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [maxDistance, setMaxDistance] = useState(5)
  const [minEarnings, setMinEarnings] = useState(5)
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    // Simular actualizaciones en tiempo real de pedidos
    const interval = setInterval(() => {
      // Aquí se conectaría con WebSocket para recibir nuevos pedidos
      console.log("Checking for new orders...")
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const handleToggleOnline = () => {
    setStats((prev) => ({ ...prev, isOnline: !prev.isOnline }))
  }

  const handleOrderClick = (order: AvailableOrder) => {
    setSelectedOrder(order)
    setShowOrderDialog(true)
  }

  const handleAcceptOrder = () => {
    if (selectedOrder) {
      // Aquí se enviaría la aceptación del pedido
      setOrders((prev) => prev.filter((order) => order.id !== selectedOrder.id))
      setShowOrderDialog(false)
      setSelectedOrder(null)
      // Redirigir a la vista de detalles del pedido
      window.location.href = `/driver/order/${selectedOrder.id}`
    }
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  const getPriorityColor = (priority: string): "error" | "warning" | "default" => {
    switch (priority) {
      case "urgent":
        return "error"
      case "high":
        return "warning"
      default:
        return "default"
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "Urgente"
      case "high":
        return "Alta"
      default:
        return "Normal"
    }
  }

  const getPaymentIcon = (method: string) => {
    switch (method) {
      case "cash":
        return "💵"
      case "card":
        return "💳"
      case "digital":
        return "📱"
      default:
        return "💳"
    }
  }

  const filteredOrders = orders.filter(
    (order) => order.distance <= maxDistance && order.estimatedEarnings >= minEarnings,
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="w-screen h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <AppBar position="sticky" className="bg-white shadow-sm">
          <Toolbar className="px-4">
            <div className="flex items-center gap-3 flex-grow">
              <Avatar className="bg-emerald-500">
                <Car size={20} />
              </Avatar>
              <div>
                <Typography variant="h6" className="font-bold text-emerald-600">
                  DeliGO Driver
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  {stats.isOnline ? "En línea" : "Desconectado"}
                </Typography>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <IconButton onClick={handleRefresh} disabled={isRefreshing}>
                <Refresh size={20} className={isRefreshing ? "animate-spin" : ""} />
              </IconButton>
              <IconButton onClick={() => setShowFilters(true)}>
                <Filter size={20} />
              </IconButton>
              <IconButton>
                <Settings size={20} />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>

        {/* Status Bar */}
        <div className="bg-white border-b p-4">
          <div className="flex items-center justify-between mb-4">
            <FormControlLabel
              control={<Switch checked={stats.isOnline} onChange={handleToggleOnline} color="primary" />}
              label={
                <Typography variant="body1" className="font-medium">
                  {stats.isOnline ? "Disponible para pedidos" : "No disponible"}
                </Typography>
              }
            />
            <Badge badgeContent={filteredOrders.length} color="primary">
              <Package size={24} className="text-gray-600" />
            </Badge>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <Typography variant="h6" className="font-bold text-emerald-600">
                ${stats.todayEarnings.toFixed(2)}
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                Hoy
              </Typography>
            </div>
            <div className="text-center">
              <Typography variant="h6" className="font-bold text-emerald-600">
                {stats.todayDeliveries}
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                Entregas
              </Typography>
            </div>
            <div className="text-center">
              <Typography variant="h6" className="font-bold text-emerald-600">
                {stats.currentRating}
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                Rating
              </Typography>
            </div>
            <div className="text-center">
              <Typography variant="h6" className="font-bold text-emerald-600">
                {stats.completionRate}%
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                Completado
              </Typography>
            </div>
          </div>
        </div>

        {/* Offline Alert */}
        {!stats.isOnline && (
          <Alert severity="warning" className="m-4">
            <Typography variant="body2">Estás desconectado. Activa tu disponibilidad para recibir pedidos.</Typography>
          </Alert>
        )}

        {/* Orders List */}
        <div className="flex-grow px-4 py-6">
          {filteredOrders.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Package size={64} className="text-gray-300 mx-auto mb-4" />
                <Typography variant="h6" className="text-gray-500 mb-2">
                  {stats.isOnline ? "No hay pedidos disponibles" : "Conéctate para ver pedidos"}
                </Typography>
                <Typography variant="body2" className="text-gray-400 mb-6">
                  {stats.isOnline
                    ? "Los nuevos pedidos aparecerán aquí automáticamente"
                    : "Activa tu disponibilidad para comenzar a recibir pedidos"}
                </Typography>
                {!stats.isOnline && (
                  <Button
                    variant="contained"
                    onClick={handleToggleOnline}
                    className="bg-emerald-500 hover:bg-emerald-600"
                  >
                    Conectarse
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Typography variant="h6" className="font-bold text-gray-900">
                  Pedidos Disponibles ({filteredOrders.length})
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  Actualizado hace 1 min
                </Typography>
              </div>

              {filteredOrders.map((order) => (
                <Card
                  key={order.id}
                  className="hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  onClick={() => handleOrderClick(order)}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                          <ChefHat size={20} className="text-emerald-600" />
                        </div>
                        <div>
                          <Typography variant="h6" className="font-bold text-gray-900">
                            {order.restaurantName}
                          </Typography>
                          <Typography variant="body2" className="text-gray-600">
                            Pedido #{order.id}
                          </Typography>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Chip
                          label={getPriorityText(order.priority)}
                          color={getPriorityColor(order.priority)}
                          size="small"
                        />
                        <Typography variant="body2" className="text-gray-500">
                          {order.orderTime}
                        </Typography>
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin size={16} className="text-gray-500" />
                          <Typography variant="body2" className="text-gray-700 font-medium">
                            Recoger en:
                          </Typography>
                        </div>
                        <Typography variant="body2" className="text-gray-600 ml-6">
                          {order.restaurantAddress}
                        </Typography>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Navigation size={16} className="text-gray-500" />
                          <Typography variant="body2" className="text-gray-700 font-medium">
                            Entregar en:
                          </Typography>
                        </div>
                        <Typography variant="body2" className="text-gray-600 ml-6">
                          {order.deliveryAddress}
                        </Typography>
                      </div>
                    </div>

                    {/* Items Preview */}
                    <div className="mb-4">
                      <Typography variant="body2" className="text-gray-700 font-medium mb-1">
                        Productos:
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        {order.items.map((item) => `${item.quantity}x ${item.name}`).join(", ")}
                      </Typography>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-4 gap-4 mb-4">
                      <div className="text-center p-3 bg-emerald-50 rounded-lg">
                        <DollarSign size={20} className="text-emerald-600 mx-auto mb-1" />
                        <Typography variant="h6" className="font-bold text-emerald-600">
                          ${order.estimatedEarnings.toFixed(2)}
                        </Typography>
                        <Typography variant="body2" className="text-emerald-700">
                          Ganancia
                        </Typography>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <Route size={20} className="text-blue-600 mx-auto mb-1" />
                        <Typography variant="h6" className="font-bold text-blue-600">
                          {order.distance} km
                        </Typography>
                        <Typography variant="body2" className="text-blue-700">
                          Distancia
                        </Typography>
                      </div>
                      <div className="text-center p-3 bg-amber-50 rounded-lg">
                        <Clock size={20} className="text-amber-600 mx-auto mb-1" />
                        <Typography variant="h6" className="font-bold text-amber-600">
                          {order.estimatedTime} min
                        </Typography>
                        <Typography variant="body2" className="text-amber-700">
                          Tiempo
                        </Typography>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-2xl mb-1 block">{getPaymentIcon(order.paymentMethod)}</span>
                        <Typography variant="body2" className="text-gray-700">
                          {order.paymentMethod === "cash" ? "Efectivo" : "Digital"}
                        </Typography>
                      </div>
                    </div>

                    {/* Special Instructions */}
                    {order.specialInstructions && (
                      <Alert severity="info" className="mb-4">
                        <Typography variant="body2">
                          <strong>Instrucciones:</strong> {order.specialInstructions}
                        </Typography>
                      </Alert>
                    )}

                    {/* Preparation Status */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-gray-500" />
                        <Typography variant="body2" className="text-gray-600">
                          Listo en {order.preparationTime} min
                        </Typography>
                      </div>
                      <Button
                        variant="contained"
                        size="large"
                        className="bg-emerald-500 hover:bg-emerald-600 px-8"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleOrderClick(order)
                        }}
                      >
                        Aceptar Pedido
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Order Details Dialog */}
        <Dialog open={showOrderDialog} onClose={() => setShowOrderDialog(false)} maxWidth="md" fullWidth>
          {selectedOrder && (
            <>
              <DialogTitle>
                <div className="flex justify-between items-center">
                  <div>
                    <Typography variant="h6" className="font-bold">
                      {selectedOrder.restaurantName}
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      Pedido #{selectedOrder.id}
                    </Typography>
                  </div>
                  <Chip
                    label={getPriorityText(selectedOrder.priority)}
                    color={getPriorityColor(selectedOrder.priority) as "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"}
                  />
                </div>
              </DialogTitle>
              <DialogContent>
                <div className="space-y-6">
                  {/* Earnings Highlight */}
                  <div className="bg-emerald-50 rounded-lg p-4 text-center">
                    <Typography variant="h4" className="font-bold text-emerald-600 mb-1">
                      ${selectedOrder.estimatedEarnings.toFixed(2)}
                    </Typography>
                    <Typography variant="body2" className="text-emerald-700">
                      Ganancia estimada por esta entrega
                    </Typography>
                  </div>

                  {/* Route Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Typography variant="subtitle2" className="font-medium text-gray-900 mb-2">
                        📍 Recoger en:
                      </Typography>
                      <Typography variant="body2" className="text-gray-700 mb-1">
                        {selectedOrder.restaurantName}
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        {selectedOrder.restaurantAddress}
                      </Typography>
                      <Button
                        variant="text"
                        size="small"
                        startIcon={<Phone size={16} />}
                        href={`tel:${selectedOrder.restaurantPhone}`}
                        className="text-emerald-600 mt-1"
                      >
                        Llamar restaurante
                      </Button>
                    </div>
                    <div>
                      <Typography variant="subtitle2" className="font-medium text-gray-900 mb-2">
                        🏠 Entregar en:
                      </Typography>
                      <Typography variant="body2" className="text-gray-700 mb-1">
                        {selectedOrder.customerName}
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        {selectedOrder.deliveryAddress}
                      </Typography>
                      <Button
                        variant="text"
                        size="small"
                        startIcon={<Phone size={16} />}
                        href={`tel:${selectedOrder.customerPhone}`}
                        className="text-emerald-600 mt-1"
                      >
                        Llamar cliente
                      </Button>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div>
                    <Typography variant="subtitle2" className="font-medium text-gray-900 mb-3">
                      Productos del pedido:
                    </Typography>
                    <div className="space-y-2">
                      {selectedOrder.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <Typography variant="body2">
                            {item.quantity}x {item.name}
                          </Typography>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t">
                      <div className="flex justify-between items-center">
                        <Typography variant="subtitle2" className="font-medium">
                          Total del pedido:
                        </Typography>
                        <Typography variant="subtitle2" className="font-bold text-emerald-600">
                          ${selectedOrder.totalAmount.toFixed(2)}
                        </Typography>
                      </div>
                    </div>
                  </div>

                  {/* Trip Details */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <Route size={24} className="text-blue-600 mx-auto mb-2" />
                      <Typography variant="h6" className="font-bold text-blue-600">
                        {selectedOrder.distance} km
                      </Typography>
                      <Typography variant="body2" className="text-blue-700">
                        Distancia total
                      </Typography>
                    </div>
                    <div className="text-center p-3 bg-amber-50 rounded-lg">
                      <Clock size={24} className="text-amber-600 mx-auto mb-2" />
                      <Typography variant="h6" className="font-bold text-amber-600">
                        {selectedOrder.estimatedTime} min
                      </Typography>
                      <Typography variant="body2" className="text-amber-700">
                        Tiempo estimado
                      </Typography>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-3xl mb-2 block">{getPaymentIcon(selectedOrder.paymentMethod)}</span>
                      <Typography variant="body2" className="text-gray-700">
                        {selectedOrder.paymentMethod === "cash" ? "Efectivo" : "Digital"}
                      </Typography>
                    </div>
                  </div>

                  {/* Special Instructions */}
                  {selectedOrder.specialInstructions && (
                    <Alert severity="info">
                      <Typography variant="body2">
                        <strong>Instrucciones especiales:</strong> {selectedOrder.specialInstructions}
                      </Typography>
                    </Alert>
                  )}
                </div>
              </DialogContent>
              <DialogActions className="p-6">
                <Button onClick={() => setShowOrderDialog(false)} variant="outlined" size="large">
                  Cancelar
                </Button>
                <Button
                  onClick={handleAcceptOrder}
                  variant="contained"
                  size="large"
                  className="bg-emerald-500 hover:bg-emerald-600 px-8"
                >
                  Aceptar Pedido - ${selectedOrder.estimatedEarnings.toFixed(2)}
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>

        {/* Filters Dialog */}
        <Dialog open={showFilters} onClose={() => setShowFilters(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Filtros de Pedidos</DialogTitle>
          <DialogContent>
            <div className="space-y-6 pt-4">
              <div>
                <Typography variant="subtitle2" className="font-medium mb-4">
                  Distancia máxima: {maxDistance} km
                </Typography>
                <Slider
                  value={maxDistance}
                  onChange={(_, newValue) => setMaxDistance(newValue as number)}
                  min={1}
                  max={10}
                  step={0.5}
                  marks
                  valueLabelDisplay="auto"
                />
              </div>
              <div>
                <Typography variant="subtitle2" className="font-medium mb-4">
                  Ganancia mínima: ${minEarnings}
                </Typography>
                <Slider
                  value={minEarnings}
                  onChange={(_, newValue) => setMinEarnings(newValue as number)}
                  min={3}
                  max={20}
                  step={1}
                  marks
                  valueLabelDisplay="auto"
                />
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowFilters(false)}>Aplicar Filtros</Button>
          </DialogActions>
        </Dialog>

        {/* Floating Action Button */}
        <Fab
          color="primary"
          className="fixed bottom-6 right-6 bg-emerald-500 hover:bg-emerald-600"
          onClick={() => (window.location.href = "/driver/map")}
        >
          <Navigation size={24} />
        </Fab>
      </div>
    </ThemeProvider>
  )
}
