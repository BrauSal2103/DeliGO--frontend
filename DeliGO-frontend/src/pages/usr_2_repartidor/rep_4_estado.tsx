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
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  Avatar,
  LinearProgress,
} from "@mui/material"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import {
  ArrowLeft,
  CheckCircle,
  Package,
  Truck,
  Navigation,
  Phone,
  MessageCircle,
  Camera,
  AlertTriangle,
  DollarSign,
  ChefHat,
  User,
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

interface OrderStatusData {
  id: string
  restaurantName: string
  restaurantAddress: string
  restaurantPhone: string
  customerName: string
  customerAddress: string
  customerPhone: string
  currentStatus: "heading_to_restaurant" | "at_restaurant" | "picked_up" | "heading_to_customer" | "delivered"
  estimatedEarnings: number
  totalAmount: number
  paymentMethod: "cash" | "card" | "digital"
  itemCount: number
  specialInstructions?: string
}

interface StatusStep {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  status: "heading_to_restaurant" | "at_restaurant" | "picked_up" | "heading_to_customer" | "delivered"
  buttonText: string
  completed: boolean
  active: boolean
}

const mockOrderData: OrderStatusData = {
  id: "DG-2024-101",
  restaurantName: "Bella Italia",
  restaurantAddress: "Av. Roma 456, Palermo",
  restaurantPhone: "+54 11 1234-5678",
  customerName: "Juan Pérez",
  customerAddress: "Av. Libertador 1234, Apt 4B, Palermo",
  customerPhone: "+54 11 9876-5432",
  currentStatus: "at_restaurant",
  estimatedEarnings: 8.5,
  totalAmount: 54.97,
  paymentMethod: "card",
  itemCount: 3,
  specialInstructions: "Llamar al llegar, portón verde",
}

export default function OrderStatusPage() {
  const [orderData, setOrderData] = useState<OrderStatusData>(mockOrderData)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [showIssueDialog, setShowIssueDialog] = useState(false)
  const [showPhotoDialog, setShowPhotoDialog] = useState(false)
  const [nextStatus, setNextStatus] = useState<string>("")
  const [issueDescription, setIssueDescription] = useState("")
  const [deliveryNotes, setDeliveryNotes] = useState("")

  const statusSteps: StatusStep[] = [
    {
      id: "heading_to_restaurant",
      title: "Dirigirse al Restaurante",
      description: "Ve al restaurante para recoger el pedido",
      icon: <Navigation size={24} />,
      status: "heading_to_restaurant",
      buttonText: "Llegué al Restaurante",
      completed: ["at_restaurant", "picked_up", "heading_to_customer", "delivered"].includes(orderData.currentStatus),
      active: orderData.currentStatus === "heading_to_restaurant",
    },
    {
      id: "at_restaurant",
      title: "En el Restaurante",
      description: "Confirma que tienes todos los productos",
      icon: <Package size={24} />,
      status: "at_restaurant",
      buttonText: "Pedido Recogido",
      completed: ["picked_up", "heading_to_customer", "delivered"].includes(orderData.currentStatus),
      active: orderData.currentStatus === "at_restaurant",
    },
    {
      id: "picked_up",
      title: "Pedido Recogido",
      description: "Dirígete a la dirección de entrega",
      icon: <Truck size={24} />,
      status: "picked_up",
      buttonText: "Llegué con el Cliente",
      completed: ["heading_to_customer", "delivered"].includes(orderData.currentStatus),
      active: orderData.currentStatus === "picked_up",
    },
    {
      id: "heading_to_customer",
      title: "En Camino al Cliente",
      description: "Entrega el pedido al cliente",
      icon: <Truck size={24} />,
      status: "heading_to_customer",
      buttonText: "Pedido Entregado",
      completed: orderData.currentStatus === "delivered",
      active: orderData.currentStatus === "heading_to_customer",
    },
  ]

  const getCurrentStep = () => {
    return statusSteps.find((step) => step.active) || statusSteps[0]
  }

  const getProgressPercentage = () => {
    const statusOrder = ["heading_to_restaurant", "at_restaurant", "picked_up", "heading_to_customer", "delivered"]
    const currentIndex = statusOrder.indexOf(orderData.currentStatus)
    return ((currentIndex + 1) / statusOrder.length) * 100
  }

  const handleStatusChange = (newStatus: string) => {
    setNextStatus(newStatus)
    if (newStatus === "delivered") {
      setShowPhotoDialog(true)
    } else {
      setShowConfirmDialog(true)
    }
  }

  const confirmStatusChange = () => {
    setOrderData((prev) => ({ ...prev, currentStatus: nextStatus as typeof prev.currentStatus }))
    setShowConfirmDialog(false)
    setNextStatus("")

    if (nextStatus === "delivered") {
      // Redirigir después de completar la entrega
      setTimeout(() => {
        window.location.href = "/driver/available-orders"
      }, 2000)
    }
  }

  const handleCompleteDelivery = () => {
    setOrderData((prev) => ({ ...prev, currentStatus: "delivered" }))
    setShowPhotoDialog(false)
    setTimeout(() => {
      window.location.href = "/driver/available-orders"
    }, 2000)
  }

  const handleReportIssue = () => {
    console.log("Issue reported:", issueDescription)
    setShowIssueDialog(false)
    setIssueDescription("")
    alert("Problema reportado. El equipo de soporte te contactará pronto.")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "success"
      case "heading_to_customer":
      case "picked_up":
        return "primary"
      case "at_restaurant":
        return "warning"
      default:
        return "default"
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
      case "delivered":
        return "Entregado"
      default:
        return "Estado Desconocido"
    }
  }

  const currentStep = getCurrentStep()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="w-screen h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <AppBar position="sticky" className="bg-white shadow-sm w-full">
          <Toolbar className="w-full px-4">
            <IconButton onClick={() => window.history.back()} className="mr-2">
              <ArrowLeft size={24} />
            </IconButton>
            <div className="flex-grow">
              <Typography variant="h6" className="font-bold text-emerald-600">
                Estado del Pedido #{orderData.id}
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                {orderData.itemCount} productos • ${orderData.totalAmount.toFixed(2)}
              </Typography>
            </div>
            <Chip
              label={getStatusText(orderData.currentStatus)}
              color={getStatusColor(orderData.currentStatus) as "success" | "primary" | "warning" | "default"}
              variant="filled"
            />
          </Toolbar>
        </AppBar>

        {/* Progress Bar */}
        <div className="w-full bg-white border-b p-4">
          <div className="flex justify-between items-center mb-2">
            <Typography variant="body2" className="text-gray-600">
              Progreso de la entrega
            </Typography>
            <Typography variant="body2" className="font-medium text-emerald-600">
              {Math.round(getProgressPercentage())}% completado
            </Typography>
          </div>
          <LinearProgress
            variant="determinate"
            value={getProgressPercentage()}
            className="h-2 rounded-full"
            sx={{
              backgroundColor: "#e5e7eb",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#10b981",
              },
            }}
          />
        </div>

        {/* Main Content */}
        <div className="flex-grow w-full px-4 py-6">
          <div className="max-w-md mx-auto space-y-6">
            {/* Current Step Card */}
            <Card className="w-full shadow-lg border-l-4 border-l-emerald-500">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                    <div className="text-emerald-600">{currentStep.icon}</div>
                  </div>
                  <div className="flex-grow">
                    <Typography variant="h6" className="font-bold text-gray-900">
                      {currentStep.title}
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      {currentStep.description}
                    </Typography>
                  </div>
                </div>

                {orderData.currentStatus !== "delivered" && (
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={() => {
                      const nextStatuses = {
                        heading_to_restaurant: "at_restaurant",
                        at_restaurant: "picked_up",
                        picked_up: "heading_to_customer",
                        heading_to_customer: "delivered",
                      }
                      const next = nextStatuses[orderData.currentStatus as keyof typeof nextStatuses]
                      if (next) handleStatusChange(next)
                    }}
                    className="bg-emerald-500 hover:bg-emerald-600 py-3 text-lg font-semibold"
                  >
                    {currentStep.buttonText}
                  </Button>
                )}

                {orderData.currentStatus === "delivered" && (
                  <Alert severity="success" className="mt-4">
                    <Typography variant="body2" className="font-medium">
                      ¡Pedido entregado exitosamente! Ganancia: ${orderData.estimatedEarnings.toFixed(2)}
                    </Typography>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Earnings Card */}
            <Card className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
              <CardContent className="p-6 text-center">
                <DollarSign size={32} className="mx-auto mb-2" />
                <Typography variant="h4" className="font-bold mb-1">
                  ${orderData.estimatedEarnings.toFixed(2)}
                </Typography>
                <Typography variant="body2" className="opacity-90">
                  Ganancia por esta entrega
                </Typography>
              </CardContent>
            </Card>

            {/* Restaurant Info */}
            <Card className="w-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="bg-emerald-100">
                    <ChefHat size={20} className="text-emerald-600" />
                  </Avatar>
                  <div className="flex-grow">
                    <Typography variant="h6" className="font-bold text-gray-900">
                      {orderData.restaurantName}
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      Recoger pedido
                    </Typography>
                  </div>
                  <div className="flex gap-2">
                    <IconButton
                      href={`tel:${orderData.restaurantPhone}`}
                      className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                      size="small"
                    >
                      <Phone size={16} />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        window.open(`https://maps.google.com/?q=${encodeURIComponent(orderData.restaurantAddress)}`)
                      }
                      className="bg-blue-50 text-blue-600 hover:bg-blue-100"
                      size="small"
                    >
                      <Navigation size={16} />
                    </IconButton>
                  </div>
                </div>
                <Typography variant="body2" className="text-gray-700">
                  {orderData.restaurantAddress}
                </Typography>
              </CardContent>
            </Card>

            {/* Customer Info */}
            <Card className="w-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="bg-blue-100">
                    <User size={20} className="text-blue-600" />
                  </Avatar>
                  <div className="flex-grow">
                    <Typography variant="h6" className="font-bold text-gray-900">
                      {orderData.customerName}
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      Entregar pedido
                    </Typography>
                  </div>
                  <div className="flex gap-2">
                    <IconButton
                      href={`tel:${orderData.customerPhone}`}
                      className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                      size="small"
                    >
                      <Phone size={16} />
                    </IconButton>
                    <IconButton className="bg-blue-50 text-blue-600 hover:bg-blue-100" size="small">
                      <MessageCircle size={16} />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        window.open(`https://maps.google.com/?q=${encodeURIComponent(orderData.customerAddress)}`)
                      }
                      className="bg-blue-50 text-blue-600 hover:bg-blue-100"
                      size="small"
                    >
                      <Navigation size={16} />
                    </IconButton>
                  </div>
                </div>
                <Typography variant="body2" className="text-gray-700 mb-3">
                  {orderData.customerAddress}
                </Typography>
                {orderData.specialInstructions && (
                  <Alert severity="info">
                    <Typography variant="body2">
                      <strong>Instrucciones:</strong> {orderData.specialInstructions}
                    </Typography>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="w-full">
              <CardContent className="p-6">
                <Typography variant="h6" className="font-bold text-gray-900 mb-4">
                  Acciones Rápidas
                </Typography>
                <div className="space-y-3">
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<Navigation size={16} />}
                    onClick={() => (window.location.href = `/driver/map/${orderData.id}`)}
                    className="border-blue-500 text-blue-600 hover:bg-blue-50"
                  >
                    Ver en Mapa
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<Camera size={16} />}
                    onClick={() => setShowPhotoDialog(true)}
                    className="border-gray-500 text-gray-600 hover:bg-gray-50"
                  >
                    Tomar Foto
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<AlertTriangle size={16} />}
                    onClick={() => setShowIssueDialog(true)}
                    className="border-red-500 text-red-600 hover:bg-red-50"
                  >
                    Reportar Problema
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Status Timeline */}
            <Card className="w-full">
              <CardContent className="p-6">
                <Typography variant="h6" className="font-bold text-gray-900 mb-4">
                  Progreso Detallado
                </Typography>
                <div className="space-y-4">
                  {statusSteps.map((step) => (
                    <div key={step.id} className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          step.completed
                            ? "bg-emerald-500 text-white"
                            : step.active
                              ? "bg-emerald-100 text-emerald-600"
                              : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {step.completed ? <CheckCircle size={20} /> : step.icon}
                      </div>
                      <div className="flex-grow">
                        <Typography
                          variant="subtitle2"
                          className={`font-medium ${
                            step.completed ? "text-emerald-600" : step.active ? "text-gray-900" : "text-gray-500"
                          }`}
                        >
                          {step.title}
                        </Typography>
                        <Typography variant="body2" className="text-gray-600">
                          {step.description}
                        </Typography>
                      </div>
                      {step.active && <Chip label="Actual" size="small" color="primary" className="bg-emerald-500" />}
                      {step.completed && <CheckCircle size={20} className="text-emerald-500" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Confirmation Dialog */}
        <Dialog open={showConfirmDialog} onClose={() => setShowConfirmDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Confirmar Cambio de Estado</DialogTitle>
          <DialogContent>
            <Typography variant="body1" className="mb-4">
              ¿Confirmas que quieres cambiar el estado del pedido?
            </Typography>
            <Alert severity="info">
              <Typography variant="body2">
                Este cambio se registrará y el cliente será notificado automáticamente.
              </Typography>
            </Alert>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowConfirmDialog(false)}>Cancelar</Button>
            <Button onClick={confirmStatusChange} variant="contained" className="bg-emerald-500 hover:bg-emerald-600">
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>

        {/* Issue Report Dialog */}
        <Dialog open={showIssueDialog} onClose={() => setShowIssueDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle size={24} className="text-amber-600" />
            Reportar Problema
          </DialogTitle>
          <DialogContent>
            <Typography variant="body2" className="text-gray-600 mb-4">
              Describe el problema que estás experimentando
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Describe el problema aquí..."
              value={issueDescription}
              onChange={(e) => setIssueDescription(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowIssueDialog(false)}>Cancelar</Button>
            <Button
              onClick={handleReportIssue}
              variant="contained"
              disabled={!issueDescription.trim()}
              className="bg-red-500 hover:bg-red-600"
            >
              Enviar Reporte
            </Button>
          </DialogActions>
        </Dialog>

        {/* Photo/Delivery Dialog */}
        <Dialog open={showPhotoDialog} onClose={() => setShowPhotoDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle className="flex items-center gap-2">
            <Camera size={24} className="text-emerald-600" />
            Confirmar Entrega
          </DialogTitle>
          <DialogContent>
            <Typography variant="body2" className="text-gray-600 mb-4">
              Toma una foto como comprobante de entrega (opcional)
            </Typography>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
              <Camera size={48} className="text-gray-400 mx-auto mb-2" />
              <Typography variant="body2" className="text-gray-500">
                Toca para tomar foto
              </Typography>
            </div>
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="Notas adicionales sobre la entrega (opcional)"
              value={deliveryNotes}
              onChange={(e) => setDeliveryNotes(e.target.value)}
            />
            <div className="mt-4 p-3 bg-emerald-50 rounded-lg">
              <Typography variant="body2" className="text-emerald-800 font-medium">
                Ganancia confirmada: ${orderData.estimatedEarnings.toFixed(2)}
              </Typography>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowPhotoDialog(false)}>Cancelar</Button>
            <Button
              onClick={handleCompleteDelivery}
              variant="contained"
              className="bg-emerald-500 hover:bg-emerald-600"
            >
              Confirmar Entrega
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider>
  )
}
