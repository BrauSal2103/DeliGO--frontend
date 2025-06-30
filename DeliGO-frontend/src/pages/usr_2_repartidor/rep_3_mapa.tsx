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
  Fab,
  Alert,
  Chip,
  Avatar,
  Drawer,
} from "@mui/material"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import {
  ArrowLeft,
  Navigation,
  Phone,
  MessageCircle,
  LocateIcon as MyLocation,
  Route,
  Zap,
  ChefHat,
  User,
  Car,
  RefreshCw,
  Settings,
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

interface Location {
  lat: number
  lng: number
  address: string
}

interface RouteInfo {
  distance: number
  duration: number
  traffic: "light" | "moderate" | "heavy"
  estimatedArrival: string
}

interface OrderMapData {
  id: string
  restaurantName: string
  restaurantLocation: Location
  restaurantPhone: string
  customerName: string
  customerLocation: Location
  customerPhone: string
  currentStatus: "heading_to_restaurant" | "at_restaurant" | "picked_up" | "heading_to_customer"
  estimatedEarnings: number
  paymentMethod: "cash" | "card" | "digital"
}

interface DriverLocation {
  lat: number
  lng: number
  heading: number
  speed: number
  accuracy: number
}

const mockOrderData: OrderMapData = {
  id: "DG-2024-101",
  restaurantName: "Bella Italia",
  restaurantLocation: {
    lat: -34.5875,
    lng: -58.4205,
    address: "Av. Roma 456, Palermo",
  },
  restaurantPhone: "+54 11 1234-5678",
  customerName: "Juan Pérez",
  customerLocation: {
    lat: -34.5925,
    lng: -58.4105,
    address: "Av. Libertador 1234, Apt 4B, Palermo",
  },
  customerPhone: "+54 11 9876-5432",
  currentStatus: "heading_to_restaurant",
  estimatedEarnings: 8.5,
  paymentMethod: "card",
}

const mockDriverLocation: DriverLocation = {
  lat: -34.585,
  lng: -58.418,
  heading: 45,
  speed: 25,
  accuracy: 5,
}

const mockRouteInfo: RouteInfo = {
  distance: 1.2,
  duration: 8,
  traffic: "moderate",
  estimatedArrival: "15:45",
}

export default function DeliveryMapPage() {
  const [orderData] = useState<OrderMapData>(mockOrderData)
  const [driverLocation, setDriverLocation] = useState<DriverLocation>(mockDriverLocation)
  const [routeInfo, setRouteInfo] = useState<RouteInfo>(mockRouteInfo)
  const [isNavigating, setIsNavigating] = useState(false)
  const [showOrderDetails, setShowOrderDetails] = useState(false)
  const [mapMode, setMapMode] = useState<"standard" | "satellite" | "traffic">("standard")
  const [isLocationTracking, setIsLocationTracking] = useState(true)

  useEffect(() => {
    // Simular actualizaciones de ubicación en tiempo real
    const locationInterval = setInterval(() => {
      setDriverLocation((prev) => ({
        ...prev,
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001,
        speed: Math.max(0, prev.speed + (Math.random() - 0.5) * 10),
      }))
    }, 3000)

    // Simular actualizaciones de ruta
    const routeInterval = setInterval(() => {
      setRouteInfo((prev) => ({
        ...prev,
        duration: Math.max(1, prev.duration - 0.5),
        distance: Math.max(0.1, prev.distance - 0.1),
      }))
    }, 30000)

    return () => {
      clearInterval(locationInterval)
      clearInterval(routeInterval)
    }
  }, [])

  const getCurrentDestination = () => {
    return orderData.currentStatus === "heading_to_restaurant" || orderData.currentStatus === "at_restaurant"
      ? orderData.restaurantLocation
      : orderData.customerLocation
  }

  const getCurrentDestinationName = () => {
    return orderData.currentStatus === "heading_to_restaurant" || orderData.currentStatus === "at_restaurant"
      ? orderData.restaurantName
      : orderData.customerName
  }

  const getCurrentDestinationPhone = () => {
    return orderData.currentStatus === "heading_to_restaurant" || orderData.currentStatus === "at_restaurant"
      ? orderData.restaurantPhone
      : orderData.customerPhone
  }

  const handleStartNavigation = () => {
    const destination = getCurrentDestination()
    const url = `https://maps.google.com/maps?daddr=${destination.lat},${destination.lng}&dirflg=d`
    window.open(url, "_blank")
    setIsNavigating(true)
  }

  const handleCenterOnLocation = () => {
    // Simular centrar el mapa en la ubicación actual
    console.log("Centering map on driver location")
  }

  const getTrafficColor = (traffic: string) => {
    switch (traffic) {
      case "light":
        return "success"
      case "moderate":
        return "warning"
      case "heavy":
        return "error"
      default:
        return "default"
    }
  }

  const getTrafficText = (traffic: string) => {
    switch (traffic) {
      case "light":
        return "Tráfico Ligero"
      case "moderate":
        return "Tráfico Moderado"
      case "heavy":
        return "Tráfico Pesado"
      default:
        return "Tráfico Desconocido"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "heading_to_restaurant":
        return "Dirigiéndose al Restaurante"
      case "at_restaurant":
        return "En el Restaurante"
      case "picked_up":
        return "Pedido Recogido"
      case "heading_to_customer":
        return "En Camino al Cliente"
      default:
        return "Estado Desconocido"
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="w-screen h-screen bg-gray-50 flex flex-col relative">
        {/* Header */}
        <AppBar position="sticky" className="bg-white shadow-sm z-20">
          <Toolbar className="px-4">
            <IconButton onClick={() => window.history.back()} className="mr-2">
              <ArrowLeft size={24} />
            </IconButton>
            <div className="flex-grow">
              <Typography variant="h6" className="font-bold text-emerald-600">
                Navegación - #{orderData.id}
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                {getStatusText(orderData.currentStatus)}
              </Typography>
            </div>
            <IconButton onClick={() => setShowOrderDetails(true)}>
              <Settings size={20} />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Map Container */}
        <div className="flex-grow relative bg-gradient-to-br from-emerald-100 to-teal-100">
          {/* Simulated Map */}
          <div className="absolute inset-0">
            <div className="relative w-full h-full">
              {/* Grid pattern to simulate map */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: "30px 30px",
                }}
              />

              {/* Streets simulation */}
              <div className="absolute top-1/4 left-0 right-0 h-3 bg-gray-400 opacity-70"></div>
              <div className="absolute top-1/2 left-0 right-0 h-3 bg-gray-400 opacity-70"></div>
              <div className="absolute top-3/4 left-0 right-0 h-3 bg-gray-400 opacity-70"></div>
              <div className="absolute left-1/4 top-0 bottom-0 w-3 bg-gray-400 opacity-70"></div>
              <div className="absolute left-1/2 top-0 bottom-0 w-3 bg-gray-400 opacity-70"></div>
              <div className="absolute left-3/4 top-0 bottom-0 w-3 bg-gray-400 opacity-70"></div>

              {/* Driver Location (Current Position) */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                    <Car size={24} className="text-white" />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-500 rounded-full opacity-30 animate-ping"></div>
                  {/* Direction indicator */}
                  <div
                    className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-blue-600"
                    style={{ transform: `translateX(-50%) rotate(${driverLocation.heading}deg)` }}
                  ></div>
                </div>
              </div>

              {/* Restaurant Location */}
              <div className="absolute top-1/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                    <ChefHat size={20} className="text-white" />
                  </div>
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                    {orderData.restaurantName}
                  </div>
                </div>
              </div>

              {/* Customer Location */}
              <div className="absolute top-2/3 right-1/3 transform translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                    <User size={20} className="text-white" />
                  </div>
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                    {orderData.customerName}
                  </div>
                </div>
              </div>

              {/* Route Line */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <path
                  d="M 50% 50% Q 40% 35% 33% 33%"
                  stroke="#10b981"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray="10,5"
                  className="animate-pulse"
                />
                <path
                  d="M 50% 50% Q 60% 60% 67% 67%"
                  stroke="#ef4444"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray="10,5"
                  opacity="0.5"
                />
              </svg>

              {/* Map Controls */}
              <div className="absolute top-4 right-4 space-y-2">
                <Fab size="small" onClick={handleCenterOnLocation} className="bg-white hover:bg-gray-50 shadow-lg">
                  <MyLocation size={20} />
                </Fab>
                <Fab size="small" className="bg-white hover:bg-gray-50 shadow-lg">
                  <Zap size={20} />
                </Fab>
              </div>

              {/* Speed Indicator */}
              <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-3">
                <div className="text-center">
                  <Typography variant="h5" className="font-bold text-gray-900">
                    {Math.round(driverLocation.speed)}
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    km/h
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Route Info Card */}
        <Card className="absolute bottom-20 left-4 right-4 z-10 shadow-xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Navigation size={20} className="text-emerald-600" />
                <Typography variant="h6" className="font-bold text-gray-900">
                  {getCurrentDestinationName()}
                </Typography>
              </div>
              <Chip
                label={getTrafficText(routeInfo.traffic)}
                color={getTrafficColor(routeInfo.traffic) as "success" | "warning" | "error" | "default"}
                size="small"
              />
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <Typography variant="h6" className="font-bold text-emerald-600">
                  {routeInfo.distance.toFixed(1)} km
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  Distancia
                </Typography>
              </div>
              <div className="text-center">
                <Typography variant="h6" className="font-bold text-blue-600">
                  {Math.round(routeInfo.duration)} min
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  Tiempo
                </Typography>
              </div>
              <div className="text-center">
                <Typography variant="h6" className="font-bold text-amber-600">
                  {routeInfo.estimatedArrival}
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  Llegada
                </Typography>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="contained"
                fullWidth
                onClick={handleStartNavigation}
                disabled={isNavigating}
                className="bg-emerald-500 hover:bg-emerald-600"
                startIcon={<Navigation size={16} />}
              >
                {isNavigating ? "Navegando..." : "Iniciar Navegación"}
              </Button>
              <IconButton
                href={`tel:${getCurrentDestinationPhone()}`}
                className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
              >
                <Phone size={20} />
              </IconButton>
            </div>
          </CardContent>
        </Card>

        {/* Location Tracking Alert */}
        {!isLocationTracking && (
          <Alert severity="warning" className="absolute top-20 left-4 right-4 z-10">
            <Typography variant="body2">
              La ubicación GPS está desactivada. Actívala para una navegación precisa.
            </Typography>
          </Alert>
        )}

        {/* Order Details Drawer */}
        <Drawer
          anchor="bottom"
          open={showOrderDetails}
          onClose={() => setShowOrderDetails(false)}
          slotProps={{
            paper: {
              className: "rounded-t-2xl max-h-[70vh]",
            },
          }}
        >
          <div className="p-6">
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6"></div>

            <Typography variant="h5" className="font-bold text-gray-900 mb-4">
              Detalles del Pedido
            </Typography>

            <div className="space-y-4">
              {/* Earnings */}
              <div className="bg-emerald-50 rounded-lg p-4 text-center">
                <Typography variant="h4" className="font-bold text-emerald-600 mb-1">
                  ${orderData.estimatedEarnings.toFixed(2)}
                </Typography>
                <Typography variant="body2" className="text-emerald-700">
                  Ganancia estimada
                </Typography>
              </div>

              {/* Restaurant Info */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Avatar className="bg-emerald-100">
                  <ChefHat size={20} className="text-emerald-600" />
                </Avatar>
                <div className="flex-grow">
                  <Typography variant="subtitle1" className="font-semibold">
                    {orderData.restaurantName}
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    {orderData.restaurantLocation.address}
                  </Typography>
                </div>
                <IconButton
                  href={`tel:${orderData.restaurantPhone}`}
                  className="bg-emerald-50 text-emerald-600"
                  size="small"
                >
                  <Phone size={16} />
                </IconButton>
              </div>

              {/* Customer Info */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Avatar className="bg-blue-100">
                  <User size={20} className="text-blue-600" />
                </Avatar>
                <div className="flex-grow">
                  <Typography variant="subtitle1" className="font-semibold">
                    {orderData.customerName}
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    {orderData.customerLocation.address}
                  </Typography>
                </div>
                <div className="flex gap-1">
                  <IconButton
                    href={`tel:${orderData.customerPhone}`}
                    className="bg-emerald-50 text-emerald-600"
                    size="small"
                  >
                    <Phone size={16} />
                  </IconButton>
                  <IconButton className="bg-blue-50 text-blue-600" size="small">
                    <MessageCircle size={16} />
                  </IconButton>
                </div>
              </div>

              {/* Map Options */}
              <div>
                <Typography variant="subtitle2" className="font-medium mb-2">
                  Opciones del Mapa
                </Typography>
                <div className="flex gap-2">
                  {(["standard", "satellite", "traffic"] as const).map((mode) => (
                    <Button
                      key={mode}
                      variant={mapMode === mode ? "contained" : "outlined"}
                      size="small"
                      onClick={() => setMapMode(mode)}
                      className={
                        mapMode === mode ? "bg-emerald-500 hover:bg-emerald-600" : "border-emerald-500 text-emerald-600"
                      }
                    >
                      {mode === "standard" && "Estándar"}
                      {mode === "satellite" && "Satélite"}
                      {mode === "traffic" && "Tráfico"}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <Button variant="outlined" onClick={() => setShowOrderDetails(false)} className="flex-1">
                Cerrar
              </Button>
              <Button
                variant="contained"
                onClick={() => (window.location.href = `/driver/order/${orderData.id}`)}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600"
              >
                Ver Pedido Completo
              </Button>
            </div>
          </div>
          {/* Floating Action Buttons */}
          <div className="fixed bottom-6 left-6 space-y-3">
            <Fab color="primary" className="bg-blue-500 hover:bg-blue-600">
              <Route size={24} />
            </Fab>
            <Fab
              onClick={() => setIsLocationTracking(!isLocationTracking)}
              className={`${
                isLocationTracking ? "bg-emerald-500 hover:bg-emerald-600" : "bg-gray-400 hover:bg-gray-500"
              }`}
            >
              <RefreshCw size={24} className={isLocationTracking ? "animate-spin" : ""} />
            </Fab>
          </div>
        </Drawer>
      </div>
    </ThemeProvider>
  )
}
