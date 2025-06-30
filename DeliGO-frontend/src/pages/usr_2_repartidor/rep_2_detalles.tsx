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
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  Avatar,
  Divider,
  Fab,
} from "@mui/material"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import {
  ArrowLeft,
  MapPin,
  Navigation,
  Phone,
  MessageCircle,
  Clock,
  CheckCircle,
  Package,
  Truck,
  AlertTriangle,
  DollarSign,
  Star,
  ChefHat,
  User,
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

interface OrderDetails {
  id: string
  restaurantName: string
  restaurantAddress: string
  restaurantPhone: string
  restaurantContact: string
  deliveryAddress: string
  customerName: string
  customerPhone: string
  items: Array<{
    id: number
    name: string
    quantity: number
    price: number
    specialInstructions?: string
  }>
  totalAmount: number
  estimatedEarnings: number
  distance: number
  estimatedTime: number
  currentStatus:
    | "accepted"
    | "heading_to_restaurant"
    | "at_restaurant"
    | "picked_up"
    | "heading_to_customer"
    | "delivered"
  paymentMethod: "cash" | "card" | "digital"
  specialInstructions?: string
  orderTime: string
  acceptedTime: string
  customerRating?: number
  restaurantRating: number
}

// interface StepStatus {
//   step: number
//   completed: boolean
//   timestamp?: string
// }

const orderDetails: OrderDetails = {
  id: "DG-2024-101",
  restaurantName: "Bella Italia",
  restaurantAddress: "Av. Roma 456, Palermo",
  restaurantPhone: "+54 11 1234-5678",
  restaurantContact: "Marco (Encargado)",
  deliveryAddress: "Av. Libertador 1234, Apt 4B, Piso 3, Palermo",
  customerName: "Juan Pérez",
  customerPhone: "+54 11 9876-5432",
  items: [
    {
      id: 1,
      name: "Pizza Margherita",
      quantity: 2,
      price: 37.98,
      specialInstructions: "Extra queso, sin cebolla",
    },
    {
      id: 2,
      name: "Pasta Carbonara",
      quantity: 1,
      price: 16.99,
    },
  ],
  totalAmount: 54.97,
  estimatedEarnings: 8.5,
  distance: 2.3,
  estimatedTime: 15,
  currentStatus: "heading_to_restaurant",
  paymentMethod: "card",
  specialInstructions: "Llamar al llegar, portón verde al lado de la farmacia",
  orderTime: "14:30",
  acceptedTime: "14:32",
  customerRating: 4.5,
  restaurantRating: 4.8,
}

const deliverySteps = [
  {
    label: "Dirigirse al Restaurante",
    description: "Ve al restaurante para recoger el pedido",
    icon: <Navigation size={20} />,
    action: "Llegué al Restaurante",
    status: "heading_to_restaurant",
  },
  {
    label: "Recoger Pedido",
    description: "Confirma que tienes todos los productos",
    icon: <Package size={20} />,
    action: "Pedido Recogido",
    status: "at_restaurant",
  },
  {
    label: "En Camino al Cliente",
    description: "Dirígete a la dirección de entrega",
    icon: <Truck size={20} />,
    action: "Llegué con el Cliente",
    status: "picked_up",
  },
  {
    label: "Entregar Pedido",
    description: "Entrega el pedido al cliente",
    icon: <CheckCircle size={20} />,
    action: "Pedido Entregado",
    status: "heading_to_customer",
  },
]

export default function OrderDetailsPage() {
  const [order, setOrder] = useState<OrderDetails>(orderDetails)
  const [currentStep, setCurrentStep] = useState(1)
  const [showIssueDialog, setShowIssueDialog] = useState(false)
  const [issueDescription, setIssueDescription] = useState("")
  const [showDeliveryDialog, setShowDeliveryDialog] = useState(false)
  const [deliveryNotes, setDeliveryNotes] = useState("")
  //const [showPhotoDialog, setShowPhotoDialog] = useState(false)

  useEffect(() => {
    // Determinar el paso actual basado en el estado
    const statusToStep = {
      accepted: 0,
      heading_to_restaurant: 0,
      at_restaurant: 1,
      picked_up: 2,
      heading_to_customer: 2,
      delivered: 3,
    }
    setCurrentStep(statusToStep[order.currentStatus] || 0)
  }, [order.currentStatus])

  const handleNextStep = () => {
    const nextStatuses = {
      0: "at_restaurant",
      1: "picked_up",
      2: "heading_to_customer",
      3: "delivered",
    }

    if (currentStep === 3) {
      setShowDeliveryDialog(true)
      return
    }

    const nextStatus = nextStatuses[currentStep as keyof typeof nextStatuses]
    if (nextStatus) {
      setOrder((prev) => ({ ...prev, currentStatus: nextStatus as OrderDetails["currentStatus"] }))
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleCompleteDelivery = () => {
    setOrder((prev) => ({ ...prev, currentStatus: "delivered" }))
    setShowDeliveryDialog(false)
    // Redirigir a la vista de pedidos disponibles o historial
    setTimeout(() => {
      window.location.href = "/driver/available-orders"
    }, 2000)
  }

  const handleReportIssue = () => {
    // Aquí se enviaría el reporte del problema
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
      default:
        return "default"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "accepted":
        return "Pedido Aceptado"
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

  const getCurrentStepInfo = () => {
    return deliverySteps[currentStep] || deliverySteps[0]
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="w-screen h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <AppBar position="sticky" className="bg-white shadow-sm">
          <Toolbar className="px-4">
            <IconButton onClick={() => window.history.back()} className="mr-2">
              <ArrowLeft size={24} />
            </IconButton>
            <div className="flex-grow">
              <Typography variant="h6" className="font-bold text-emerald-600">
                Pedido #{order.id}
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                Aceptado a las {order.acceptedTime}
              </Typography>
            </div>
            <Chip
              label={getStatusText(order.currentStatus)}
              color={getStatusColor(order.currentStatus) as "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"}
              variant="filled"
            />
          </Toolbar>
        </AppBar>

        {/* Current Step Alert */}
        <Alert severity="info" className="m-4 bg-emerald-50 border-emerald-200" icon={getCurrentStepInfo().icon}>
          <Typography variant="body1" className="font-medium text-emerald-800">
            {getCurrentStepInfo().description}
          </Typography>
        </Alert>

        {/* Main Content */}
        <div className="flex-grow px-4 pb-6">
          <div className="space-y-6">
            {/* Earnings Card */}
            <Card className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
              <CardContent className="p-6 text-center">
                <DollarSign size={32} className="mx-auto mb-2" />
                <Typography variant="h4" className="font-bold mb-1">
                  ${order.estimatedEarnings.toFixed(2)}
                </Typography>
                <Typography variant="body2" className="opacity-90">
                  Ganancia por esta entrega
                </Typography>
              </CardContent>
            </Card>

            {/* Progress Stepper */}
            <Card>
              <CardContent className="p-6">
                <Typography variant="h6" className="font-bold text-gray-900 mb-4">
                  Progreso de la Entrega
                </Typography>

                <Stepper activeStep={currentStep} orientation="vertical">
                  {deliverySteps.map((step, index) => (
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
                        <Typography variant="subtitle1" className="font-semibold">
                          {step.label}
                        </Typography>
                        <Typography variant="body2" className="text-gray-600">
                          {step.description}
                        </Typography>
                      </StepLabel>
                      <StepContent>
                        {index === currentStep && (
                          <div className="pb-4">
                            <Button
                              variant="contained"
                              onClick={handleNextStep}
                              className="bg-emerald-500 hover:bg-emerald-600 mr-2"
                            >
                              {step.action}
                            </Button>
                            <Button
                              variant="outlined"
                              onClick={() => setShowIssueDialog(true)}
                              className="border-red-500 text-red-600 hover:bg-red-50"
                            >
                              Reportar Problema
                            </Button>
                          </div>
                        )}
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>
              </CardContent>
            </Card>

            {/* Restaurant Info */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="bg-emerald-100">
                    <ChefHat size={20} className="text-emerald-600" />
                  </Avatar>
                  <div className="flex-grow">
                    <Typography variant="h6" className="font-bold text-gray-900">
                      {order.restaurantName}
                    </Typography>
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-amber-500" fill="currentColor" />
                      <Typography variant="body2" className="text-gray-600">
                        {order.restaurantRating} • {order.restaurantContact}
                      </Typography>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <IconButton
                      href={`tel:${order.restaurantPhone}`}
                      className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                    >
                      <Phone size={20} />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        window.open(`https://maps.google.com/?q=${encodeURIComponent(order.restaurantAddress)}`)
                      }
                      className="bg-blue-50 text-blue-600 hover:bg-blue-100"
                    >
                      <Navigation size={20} />
                    </IconButton>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <MapPin size={16} className="text-gray-500 mt-1" />
                  <Typography variant="body2" className="text-gray-700">
                    {order.restaurantAddress}
                  </Typography>
                </div>
              </CardContent>
            </Card>

            {/* Customer Info */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="bg-blue-100">
                    <User size={20} className="text-blue-600" />
                  </Avatar>
                  <div className="flex-grow">
                    <Typography variant="h6" className="font-bold text-gray-900">
                      {order.customerName}
                    </Typography>
                    {order.customerRating && (
                      <div className="flex items-center gap-1">
                        <Star size={16} className="text-amber-500" fill="currentColor" />
                        <Typography variant="body2" className="text-gray-600">
                          {order.customerRating} • Cliente verificado
                        </Typography>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <IconButton
                      href={`tel:${order.customerPhone}`}
                      className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                    >
                      <Phone size={20} />
                    </IconButton>
                    <IconButton className="bg-blue-50 text-blue-600 hover:bg-blue-100">
                      <MessageCircle size={20} />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        window.open(`https://maps.google.com/?q=${encodeURIComponent(order.deliveryAddress)}`)
                      }
                      className="bg-blue-50 text-blue-600 hover:bg-blue-100"
                    >
                      <Navigation size={20} />
                    </IconButton>
                  </div>
                </div>

                <div className="flex items-start gap-2 mb-3">
                  <MapPin size={16} className="text-gray-500 mt-1" />
                  <Typography variant="body2" className="text-gray-700">
                    {order.deliveryAddress}
                  </Typography>
                </div>

                {order.specialInstructions && (
                  <Alert severity="info" className="mt-3">
                    <Typography variant="body2">
                      <strong>Instrucciones:</strong> {order.specialInstructions}
                    </Typography>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardContent className="p-6">
                <Typography variant="h6" className="font-bold text-gray-900 mb-4">
                  Productos del Pedido
                </Typography>

                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-start p-3 bg-gray-50 rounded-lg">
                      <div className="flex-grow">
                        <Typography variant="subtitle2" className="font-medium">
                          {item.quantity}x {item.name}
                        </Typography>
                        {item.specialInstructions && (
                          <Typography variant="body2" className="text-amber-600 text-sm">
                            • {item.specialInstructions}
                          </Typography>
                        )}
                      </div>
                      <Typography variant="body2" className="font-medium text-gray-900">
                        ${item.price.toFixed(2)}
                      </Typography>
                    </div>
                  ))}
                </div>

                <Divider className="my-4" />

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Typography variant="body2" className="text-gray-600">
                      Total del pedido:
                    </Typography>
                    <Typography variant="h6" className="font-bold text-gray-900">
                      ${order.totalAmount.toFixed(2)}
                    </Typography>
                  </div>
                  <div className="flex justify-between items-center">
                    <Typography variant="body2" className="text-gray-600">
                      Método de pago:
                    </Typography>
                    <Chip
                      label={order.paymentMethod === "cash" ? "Efectivo" : "Digital"}
                      size="small"
                      color={order.paymentMethod === "cash" ? "warning" : "primary"}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trip Summary */}
            <Card>
              <CardContent className="p-6">
                <Typography variant="h6" className="font-bold text-gray-900 mb-4">
                  Resumen del Viaje
                </Typography>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <Route size={24} className="text-blue-600 mx-auto mb-2" />
                    <Typography variant="h6" className="font-bold text-blue-600">
                      {order.distance} km
                    </Typography>
                    <Typography variant="body2" className="text-blue-700">
                      Distancia
                    </Typography>
                  </div>
                  <div className="text-center p-3 bg-amber-50 rounded-lg">
                    <Clock size={24} className="text-amber-600 mx-auto mb-2" />
                    <Typography variant="h6" className="font-bold text-amber-600">
                      {order.estimatedTime} min
                    </Typography>
                    <Typography variant="body2" className="text-amber-700">
                      Tiempo est.
                    </Typography>
                  </div>
                  <div className="text-center p-3 bg-emerald-50 rounded-lg">
                    <DollarSign size={24} className="text-emerald-600 mx-auto mb-2" />
                    <Typography variant="h6" className="font-bold text-emerald-600">
                      ${order.estimatedEarnings.toFixed(2)}
                    </Typography>
                    <Typography variant="body2" className="text-emerald-700">
                      Ganancia
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Issue Report Dialog */}
        <Dialog open={showIssueDialog} onClose={() => setShowIssueDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle size={24} className="text-amber-600" />
            Reportar Problema
          </DialogTitle>
          <DialogContent>
            <Typography variant="body2" className="text-gray-600 mb-4">
              Describe el problema que estás experimentando con este pedido
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

        {/* Delivery Confirmation Dialog */}
        <Dialog open={showDeliveryDialog} onClose={() => setShowDeliveryDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle size={24} className="text-emerald-600" />
            Confirmar Entrega
          </DialogTitle>
          <DialogContent>
            <Typography variant="body2" className="text-gray-600 mb-4">
              ¿Confirmas que el pedido fue entregado exitosamente al cliente?
            </Typography>
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
                Ganancia confirmada: ${order.estimatedEarnings.toFixed(2)}
              </Typography>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowDeliveryDialog(false)}>Cancelar</Button>
            <Button
              onClick={handleCompleteDelivery}
              variant="contained"
              className="bg-emerald-500 hover:bg-emerald-600"
            >
              Confirmar Entrega
            </Button>
          </DialogActions>
        </Dialog>

        {/* Floating Map Button */}
        <Fab
          color="primary"
          className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600"
          onClick={() => (window.location.href = `/driver/map/${order.id}`)}
        >
          <Navigation size={24} />
        </Fab>
      </div>
    </ThemeProvider>
  )
}
