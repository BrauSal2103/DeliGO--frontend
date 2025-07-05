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
  Avatar,
  Rating,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Alert,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import {
  ArrowLeft,
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  CheckCircle,
  Truck,
  ChefHat,
  Navigation,
  AlertTriangle,
  Car,
  Bike,
  RefreshCw,
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

interface OrderStatus {
  step: number
  status: "confirmed" | "preparing" | "ready" | "picked_up" | "on_way" | "delivered"
  estimatedTime: string
  actualTime?: string
}

interface DeliveryPerson {
  id: string
  name: string
  photo: string
  rating: number
  totalDeliveries: number
  vehicle: "car" | "bike" | "motorcycle"
  phone: string
  location: { lat: number; lng: number }
}

interface OrderItem {
  id: number
  name: string
  quantity: number
  price: number
  restaurantName: string
}

interface OrderDetails {
  orderId: string
  items: OrderItem[]
  total: number
  deliveryAddress: string
  orderTime: string
  status: OrderStatus
  deliveryPerson?: DeliveryPerson
  restaurantPhone: string
}

const orderDetails: OrderDetails = {
  orderId: "DG-2024-001",
  items: [
    { id: 1, name: "Pizza Margherita", quantity: 2, price: 37.98, restaurantName: "Bella Italia" },
    { id: 2, name: "Pasta Carbonara", quantity: 1, price: 16.99, restaurantName: "Bella Italia" },
    { id: 3, name: "Tacos de Carnitas", quantity: 3, price: 41.97, restaurantName: "Taco Loco" },
  ],
  total: 74.46,
  deliveryAddress: "Av. Libertador 1234, Apt 4B, Palermo",
  orderTime: "14:30",
  status: {
    step: 3,
    status: "on_way",
    estimatedTime: "10-15 min",
  },
  deliveryPerson: {
    id: "driver-1",
    name: "Carlos Rodríguez",
    photo: "/placeholder.svg?height=60&width=60",
    rating: 4.8,
    totalDeliveries: 1247,
    vehicle: "bike",
    phone: "+54 11 9876-5432",
    location: { lat: -34.5875, lng: -58.4205 },
  },
  restaurantPhone: "+54 11 1234-5678",
}

const orderSteps = [
  {
    label: "Pedido Confirmado",
    description: "Tu pedido ha sido recibido",
    icon: <CheckCircle size={20} />,
    time: "14:30",
  },
  {
    label: "Preparando Comida",
    description: "Los restaurantes están preparando tu pedido",
    icon: <ChefHat size={20} />,
    time: "14:35",
  },
  {
    label: "Pedido Listo",
    description: "Tu pedido está listo para recoger",
    icon: <CheckCircle size={20} />,
    time: "15:05",
  },
  {
    label: "En Camino",
    description: "El repartidor está en camino a tu ubicación",
    icon: <Truck size={20} />,
    time: "15:10",
  },
  {
    label: "Entregado",
    description: "¡Disfruta tu comida!",
    icon: <CheckCircle size={20} />,
    time: "",
  },
]

export default function OrderTrackingPage() {
  const [currentStep] = useState(orderDetails.status.step)
  const [showReportDialog, setShowReportDialog] = useState(false)
  const [reportMessage, setReportMessage] = useState("")
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    // Simular actualizaciones en tiempo real
    const interval = setInterval(() => {
      // Aquí se conectaría con WebSocket o polling para actualizaciones reales
      console.log("Checking for order updates...")
    }, 30000) // Cada 30 segundos

    return () => clearInterval(interval)
  }, [])

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  const handleReportIssue = () => {
    setShowReportDialog(false)
    setReportMessage("")
    // Aquí se enviaría el reporte
    alert("Reporte enviado. Te contactaremos pronto.")
  }

  const getVehicleIcon = (vehicle: string) => {
    switch (vehicle) {
      case "car":
        return <Car size={16} />
      case "bike":
        return <Bike size={16} />
      case "motorcycle":
        return <Bike size={16} />
      default:
        return <Truck size={16} />
    }
  }

  const getVehicleText = (vehicle: string) => {
    switch (vehicle) {
      case "car":
        return "Auto"
      case "bike":
        return "Bicicleta"
      case "motorcycle":
        return "Moto"
      default:
        return "Vehículo"
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="w-screen h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <AppBar position="sticky" className="bg-white shadow-sm">
          <Toolbar className="px-4 lg:px-8">
            <IconButton onClick={() => window.history.back()} className="mr-2">
              <ArrowLeft size={24} />
            </IconButton>
            <ChefHat size={28} className="text-emerald-500 mr-2" />
            <div className="flex-grow">
              <Typography variant="h6" component="h1" className="font-bold text-emerald-600">
                Pedido #{orderDetails.orderId}
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                Realizado a las {orderDetails.orderTime}
              </Typography>
            </div>
            <IconButton onClick={handleRefresh} disabled={isRefreshing}>
              <RefreshCw size={20} className={isRefreshing ? "animate-spin" : ""} />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <div className="flex-grow max-w-4xl mx-auto w-full px-4 lg:px-8 py-6">
          <div className="space-y-6">
            {/* Status Alert */}
            <Alert
              severity="info"
              className="bg-emerald-50 border-emerald-200"
              icon={<Truck className="text-emerald-600" />}
            >
              <Typography variant="body1" className="font-medium text-emerald-800">
                Tu pedido está en camino • Llegará en {orderDetails.status.estimatedTime}
              </Typography>
            </Alert>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Map and Delivery Info */}
              <div className="lg:col-span-2 space-y-6">
                {/* Live Map */}
                <Card>
                  <CardContent className="p-0">
                    <div className="relative h-80 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-t-lg">
                      {/* Simulated Map */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-full h-full">
                          {/* Grid pattern to simulate map */}
                          <div
                            className="absolute inset-0 opacity-20"
                            style={{
                              backgroundImage: `
                                linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
                              `,
                              backgroundSize: "40px 40px",
                            }}
                          />

                          {/* Streets simulation */}
                          <div className="absolute top-1/4 left-0 right-0 h-2 bg-gray-300 opacity-60"></div>
                          <div className="absolute top-3/4 left-0 right-0 h-2 bg-gray-300 opacity-60"></div>
                          <div className="absolute left-1/3 top-0 bottom-0 w-2 bg-gray-300 opacity-60"></div>
                          <div className="absolute left-2/3 top-0 bottom-0 w-2 bg-gray-300 opacity-60"></div>

                          {/* Delivery Person Location */}
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="relative">
                              <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                                <Truck size={20} className="text-white" />
                              </div>
                              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-emerald-500 rounded-full opacity-30 animate-ping"></div>
                            </div>
                          </div>

                          {/* Destination */}
                          <div className="absolute top-1/4 right-1/4 transform -translate-x-1/2 -translate-y-full">
                            <MapPin size={32} className="text-red-500" fill="currentColor" />
                          </div>

                          {/* Route line simulation */}
                          <svg className="absolute inset-0 w-full h-full pointer-events-none">
                            <path
                              d="M 50% 50% Q 60% 30% 75% 25%"
                              stroke="#10b981"
                              strokeWidth="3"
                              fill="none"
                              strokeDasharray="10,5"
                              className="animate-pulse"
                            />
                          </svg>
                        </div>
                      </div>

                      {/* Map Controls */}
                      <div className="absolute top-4 right-4">
                        <Fab size="small" className="bg-white hover:bg-gray-50 shadow-lg">
                          <Navigation size={20} />
                        </Fab>
                      </div>
                    </div>

                    {/* Delivery Person Info */}
                    {orderDetails.deliveryPerson && (
                      <div className="p-4 border-t">
                        <div className="flex items-center gap-4">
                          <Avatar
                            src={orderDetails.deliveryPerson.photo}
                            alt={orderDetails.deliveryPerson.name}
                            className="w-16 h-16"
                          />
                          <div className="flex-grow">
                            <Typography variant="h6" className="font-semibold text-gray-900">
                              {orderDetails.deliveryPerson.name}
                            </Typography>
                            <div className="flex items-center gap-2 mb-1">
                              <Rating
                                value={orderDetails.deliveryPerson.rating}
                                precision={0.1}
                                size="small"
                                readOnly
                              />
                              <Typography variant="body2" className="text-gray-600">
                                {orderDetails.deliveryPerson.rating} • {orderDetails.deliveryPerson.totalDeliveries}{" "}
                                entregas
                              </Typography>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              {getVehicleIcon(orderDetails.deliveryPerson.vehicle)}
                              <Typography variant="body2">
                                {getVehicleText(orderDetails.deliveryPerson.vehicle)}
                              </Typography>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Button
                              variant="outlined"
                              size="small"
                              startIcon={<Phone size={16} />}
                              href={`tel:${orderDetails.deliveryPerson.phone}`}
                              className="border-emerald-500 text-emerald-600 hover:bg-emerald-50"
                            >
                              Llamar
                            </Button>
                            <Button
                              variant="outlined"
                              size="small"
                              startIcon={<MessageCircle size={16} />}
                              className="border-gray-300 text-gray-600 hover:bg-gray-50"
                            >
                              Chat
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Order Progress */}
                <Card>
                  <CardContent className="p-6">
                    <Typography variant="h6" className="font-bold text-gray-900 mb-4">
                      Estado del Pedido
                    </Typography>

                    <Stepper activeStep={currentStep} orientation="vertical">
                      {orderSteps.map((step, index) => (
                        <Step key={index}>
                          <StepLabel
                            StepIconComponent={() => (
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                  index <= currentStep ? "bg-emerald-500 text-white" : "bg-gray-200 text-gray-500"
                                }`}
                              >
                                {step.icon}
                              </div>
                            )}
                          >
                            <div className="ml-2">
                              <Typography variant="subtitle1" className="font-semibold">
                                {step.label}
                              </Typography>
                              <Typography variant="body2" className="text-gray-600">
                                {step.description}
                              </Typography>
                              {step.time && (
                                <Typography variant="body2" className="text-emerald-600 font-medium">
                                  {step.time}
                                </Typography>
                              )}
                            </div>
                          </StepLabel>
                          <StepContent>
                            <div className="pb-4">
                              {index === currentStep && (
                                <div className="flex items-center gap-2 text-emerald-600">
                                  <Clock size={16} />
                                  <Typography variant="body2">
                                    Tiempo estimado: {orderDetails.status.estimatedTime}
                                  </Typography>
                                </div>
                              )}
                            </div>
                          </StepContent>
                        </Step>
                      ))}
                    </Stepper>
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary and Actions */}
              <div className="space-y-6">
                {/* Order Details */}
                <Card>
                  <CardContent className="p-6">
                    <Typography variant="h6" className="font-bold text-gray-900 mb-4">
                      Detalles del Pedido
                    </Typography>

                    <div className="space-y-3 mb-4">
                      {orderDetails.items.map((item) => (
                        <div key={item.id} className="flex justify-between items-start">
                          <div className="flex-grow">
                            <Typography variant="body2" className="font-medium">
                              {item.quantity}x {item.name}
                            </Typography>
                            <Typography variant="body2" className="text-gray-600 text-sm">
                              {item.restaurantName}
                            </Typography>
                          </div>
                          <Typography variant="body2" className="font-medium">
                            ${item.price.toFixed(2)}
                          </Typography>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center">
                        <Typography variant="subtitle1" className="font-bold">
                          Total
                        </Typography>
                        <Typography variant="subtitle1" className="font-bold text-emerald-600">
                          ${orderDetails.total.toFixed(2)}
                        </Typography>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-start gap-2">
                        <MapPin size={16} className="text-gray-600 mt-0.5" />
                        <div>
                          <Typography variant="body2" className="font-medium text-gray-900">
                            Dirección de Entrega
                          </Typography>
                          <Typography variant="body2" className="text-gray-600">
                            {orderDetails.deliveryAddress}
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardContent className="p-6">
                    <Typography variant="h6" className="font-bold text-gray-900 mb-4">
                      Acciones Rápidas
                    </Typography>

                    <div className="space-y-3">
                      <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<Phone size={16} />}
                        href={`tel:${orderDetails.restaurantPhone}`}
                        className="border-emerald-500 text-emerald-600 hover:bg-emerald-50"
                      >
                        Llamar al Restaurante
                      </Button>

                      {orderDetails.deliveryPerson && (
                        <Button
                          variant="outlined"
                          fullWidth
                          startIcon={<Phone size={16} />}
                          href={`tel:${orderDetails.deliveryPerson.phone}`}
                          className="border-emerald-500 text-emerald-600 hover:bg-emerald-50"
                        >
                          Llamar al Repartidor
                        </Button>
                      )}

                      <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<AlertTriangle size={16} />}
                        onClick={() => setShowReportDialog(true)}
                        className="border-amber-500 text-amber-600 hover:bg-amber-50"
                      >
                        Reportar Problema
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Help */}
                <Card className="bg-gray-50">
                  <CardContent className="p-4">
                    <Typography variant="subtitle2" className="font-medium text-gray-900 mb-2">
                      ¿Necesitas Ayuda?
                    </Typography>
                    <Typography variant="body2" className="text-gray-600 mb-3">
                      Nuestro equipo de soporte está disponible 24/7
                    </Typography>
                    <Button variant="text" size="small" className="text-emerald-600 p-0" href="tel:+5411000DELI">
                      Contactar Soporte
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Report Issue Dialog */}
        <Dialog open={showReportDialog} onClose={() => setShowReportDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Reportar Problema</DialogTitle>
          <DialogContent>
            <Typography variant="body2" className="text-gray-600 mb-4">
              Describe el problema que estás experimentando con tu pedido
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Describe tu problema aquí..."
              value={reportMessage}
              onChange={(e) => setReportMessage(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowReportDialog(false)}>Cancelar</Button>
            <Button
              onClick={handleReportIssue}
              variant="contained"
              disabled={!reportMessage.trim()}
              className="bg-emerald-500 hover:bg-emerald-600"
            >
              Enviar Reporte
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider>
  )
}
