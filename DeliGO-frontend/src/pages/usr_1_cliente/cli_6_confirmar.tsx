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
  Divider,
  Chip,
  Alert,
  Dialog,
  DialogContent,
  CircularProgress,
  Checkbox,
  FormControlLabel,
} from "@mui/material"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import {
  ArrowLeft,
  MapPin,
  CreditCard,
  Clock,
  Phone,
  Edit,
  CheckCircle,
  ChefHat,
  Truck,
  Home,
  Banknote,
  Shield,
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

interface CartItem {
  id: number
  name: string
  description: string
  price: number
  quantity: number
  image: string
  restaurantName: string
  restaurantId: number
  customizations?: string[]
}

interface DeliveryAddress {
  street: string
  apartment: string
  floor: string
  city: string
  postalCode: string
  references: string
  phone: string
  type: "home" | "work" | "other"
  label?: string
}

interface PaymentMethod {
  type: "card" | "cash" | "digital"
  cardLast4?: string
  cardBrand?: string
  cardHolder?: string
  digitalWallet?: string
}

interface OrderSummary {
  subtotal: number
  deliveryFee: number
  tax: number
  discount: number
  total: number
  estimatedTime: string
}

const cartItems: CartItem[] = [
  {
    id: 1,
    name: "Pizza Margherita",
    description: "Salsa de tomate, mozzarella fresca, albahaca",
    price: 18.99,
    quantity: 2,
    image: "/placeholder.svg?height=60&width=60",
    restaurantName: "Bella Italia",
    restaurantId: 1,
    customizations: ["Extra queso", "Sin cebolla"],
  },
  {
    id: 2,
    name: "Pasta Carbonara",
    description: "Espaguetis con panceta, huevo, parmesano",
    price: 16.99,
    quantity: 1,
    image: "/placeholder.svg?height=60&width=60",
    restaurantName: "Bella Italia",
    restaurantId: 1,
  },
  {
    id: 3,
    name: "Tacos de Carnitas",
    description: "Tres tacos con carnitas, cebolla, cilantro",
    price: 13.99,
    quantity: 3,
    image: "/placeholder.svg?height=60&width=60",
    restaurantName: "Taco Loco",
    restaurantId: 2,
    customizations: ["Salsa picante", "Extra guacamole"],
  },
]

const deliveryAddress: DeliveryAddress = {
  street: "Av. Libertador 1234",
  apartment: "4B",
  floor: "3",
  city: "Palermo, Buenos Aires",
  postalCode: "C1425",
  references: "Portón verde, al lado de la farmacia, timbre 3",
  phone: "+54 11 1234-5678",
  type: "home",
}

const paymentMethod: PaymentMethod = {
  type: "card",
  cardLast4: "4242",
  cardBrand: "Visa",
  cardHolder: "Juan Pérez",
}

const orderSummary: OrderSummary = {
  subtotal: 68.96,
  deliveryFee: 4.98, // Dos restaurantes
  tax: 5.52,
  discount: 5.0,
  total: 74.46,
  estimatedTime: "35-45 min",
}

export default function OrderConfirmationPage() {
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const groupedItems = cartItems.reduce(
    (acc, item) => {
      if (!acc[item.restaurantId]) {
        acc[item.restaurantId] = {
          restaurantName: item.restaurantName,
          items: [],
        }
      }
      acc[item.restaurantId].items.push(item)
      return acc
    },
    {} as Record<number, { restaurantName: string; items: CartItem[] }>,
  )

  const handleConfirmOrder = async () => {
    if (!acceptedTerms) return

    setIsProcessing(true)
    // Simular procesamiento del pedido
    setTimeout(() => {
      setIsProcessing(false)
      setShowSuccess(true)
    }, 3000)
  }

  const getPaymentIcon = () => {
    switch (paymentMethod.type) {
      case "card":
        return <CreditCard size={20} />
      case "cash":
        return <Banknote size={20} />
      case "digital":
        return <Phone size={20} />
      default:
        return <CreditCard size={20} />
    }
  }

  const getPaymentText = () => {
    switch (paymentMethod.type) {
      case "card":
        return `${paymentMethod.cardBrand} •••• ${paymentMethod.cardLast4}`
      case "cash":
        return "Efectivo - Pago contra entrega"
      case "digital":
        return paymentMethod.digitalWallet || "Billetera Digital"
      default:
        return "Método de pago"
    }
  }

  const getAddressIcon = () => {
    switch (deliveryAddress.type) {
      case "home":
        return <Home size={20} />
      case "work":
        return <MapPin size={20} />
      default:
        return <MapPin size={20} />
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <AppBar position="sticky" className="bg-white shadow-sm">
          <Toolbar className="px-4 lg:px-8">
            <IconButton onClick={() => window.history.back()} className="mr-2">
              <ArrowLeft size={24} />
            </IconButton>
            <ChefHat size={28} className="text-emerald-500 mr-2" />
            <Typography variant="h6" component="h1" className="font-bold text-emerald-600 flex-grow">
              Confirmar Pedido
            </Typography>
            <div className="flex items-center gap-2 text-emerald-600">
              <Shield size={20} />
              <Typography variant="body2" className="hidden sm:block">
                Pedido Seguro
              </Typography>
            </div>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <div className="flex-grow max-w-4xl mx-auto w-full px-4 lg:px-8 py-8">
          <div className="space-y-6">
            {/* Page Title */}
            <div className="text-center mb-8">
              <Typography variant="h4" className="font-bold text-gray-900 mb-2">
                Revisa tu Pedido
              </Typography>
              <Typography variant="body1" className="text-gray-600">
                Verifica todos los detalles antes de confirmar tu pedido
              </Typography>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Order Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Cart Items */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <Typography variant="h6" className="font-bold text-gray-900">
                        Tu Pedido ({cartItems.reduce((total, item) => total + item.quantity, 0)} productos)
                      </Typography>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Edit size={16} />}
                        className="border-emerald-500 text-emerald-600 hover:bg-emerald-50"
                        onClick={() => (window.location.href = "/cart")}
                      >
                        Editar
                      </Button>
                    </div>

                    {Object.entries(groupedItems).map(([restaurantId, group]) => (
                      <div key={restaurantId} className="mb-6 last:mb-0">
                        <div className="flex items-center gap-2 mb-4">
                          <ChefHat size={20} className="text-emerald-600" />
                          <Typography variant="h6" className="font-semibold text-emerald-800">
                            {group.restaurantName}
                          </Typography>
                        </div>

                        <div className="space-y-4">
                          {group.items.map((item, index) => (
                            <div key={item.id}>
                              <div className="flex gap-4">
                                <img
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                                />
                                <div className="flex-grow">
                                  <div className="flex justify-between items-start mb-1">
                                    <Typography variant="subtitle1" className="font-semibold text-gray-900">
                                      {item.name}
                                    </Typography>
                                    <Typography variant="h6" className="font-bold text-emerald-600">
                                      ${(item.price * item.quantity).toFixed(2)}
                                    </Typography>
                                  </div>
                                  <Typography variant="body2" className="text-gray-600 mb-2">
                                    {item.description}
                                  </Typography>
                                  {item.customizations && (
                                    <div className="flex flex-wrap gap-1 mb-2">
                                      {item.customizations.map((custom, idx) => (
                                        <Chip key={idx} label={custom} size="small" variant="outlined" />
                                      ))}
                                    </div>
                                  )}
                                  <div className="flex justify-between items-center">
                                    <Typography variant="body2" className="text-gray-500">
                                      Cantidad: {item.quantity}
                                    </Typography>
                                    <Typography variant="body2" className="text-gray-600">
                                      ${item.price.toFixed(2)} c/u
                                    </Typography>
                                  </div>
                                </div>
                              </div>
                              {index < group.items.length - 1 && <Divider className="mt-4" />}
                            </div>
                          ))}
                        </div>
                        {Number.parseInt(restaurantId) !== Object.keys(groupedItems).length && (
                          <Divider className="mt-6" />
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Delivery Address */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <Typography variant="h6" className="font-bold text-gray-900">
                        Dirección de Entrega
                      </Typography>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Edit size={16} />}
                        className="border-emerald-500 text-emerald-600 hover:bg-emerald-50"
                        onClick={() => (window.location.href = "/location")}
                      >
                        Cambiar
                      </Button>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="text-emerald-600 mt-1">{getAddressIcon()}</div>
                      <div className="flex-grow">
                        <Typography variant="subtitle1" className="font-semibold text-gray-900 mb-1">
                          {deliveryAddress.type === "home"
                            ? "Casa"
                            : deliveryAddress.type === "work"
                              ? "Trabajo"
                              : deliveryAddress.label || "Otra dirección"}
                        </Typography>
                        <Typography variant="body2" className="text-gray-700 mb-1">
                          {deliveryAddress.street}
                          {deliveryAddress.apartment && `, Apt ${deliveryAddress.apartment}`}
                          {deliveryAddress.floor && `, Piso ${deliveryAddress.floor}`}
                        </Typography>
                        <Typography variant="body2" className="text-gray-700 mb-2">
                          {deliveryAddress.city} {deliveryAddress.postalCode}
                        </Typography>
                        {deliveryAddress.references && (
                          <Typography variant="body2" className="text-gray-600 mb-2">
                            <strong>Referencias:</strong> {deliveryAddress.references}
                          </Typography>
                        )}
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone size={16} />
                          <Typography variant="body2">{deliveryAddress.phone}</Typography>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-emerald-50 rounded-lg">
                      <div className="flex items-center gap-2 text-emerald-700">
                        <Clock size={16} />
                        <Typography variant="body2" className="font-medium">
                          Tiempo estimado de entrega: {orderSummary.estimatedTime}
                        </Typography>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <Typography variant="h6" className="font-bold text-gray-900">
                        Método de Pago
                      </Typography>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Edit size={16} />}
                        className="border-emerald-500 text-emerald-600 hover:bg-emerald-50"
                        onClick={() => (window.location.href = "/payment")}
                      >
                        Cambiar
                      </Button>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-emerald-600">{getPaymentIcon()}</div>
                      <div className="flex-grow">
                        <Typography variant="subtitle1" className="font-semibold text-gray-900">
                          {getPaymentText()}
                        </Typography>
                        {paymentMethod.type === "card" && paymentMethod.cardHolder && (
                          <Typography variant="body2" className="text-gray-600">
                            {paymentMethod.cardHolder}
                          </Typography>
                        )}
                        {paymentMethod.type === "cash" && (
                          <Typography variant="body2" className="text-amber-600">
                            Asegúrate de tener el monto exacto
                          </Typography>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Terms and Conditions */}
                <Card>
                  <CardContent className="p-6">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={acceptedTerms}
                          onChange={(e) => setAcceptedTerms(e.target.checked)}
                          color="primary"
                        />
                      }
                      label={
                        <Typography variant="body2" className="text-gray-700">
                          Acepto los{" "}
                          <Button variant="text" className="text-emerald-600 p-0 min-w-0 underline">
                            Términos y Condiciones
                          </Button>{" "}
                          y la{" "}
                          <Button variant="text" className="text-emerald-600 p-0 min-w-0 underline">
                            Política de Privacidad
                          </Button>
                        </Typography>
                      }
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardContent className="p-6">
                    <Typography variant="h6" className="font-bold text-gray-900 mb-4">
                      Resumen del Pedido
                    </Typography>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium">${orderSummary.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 flex items-center gap-1">
                          <Truck size={14} />
                          Envío
                        </span>
                        <span className="font-medium">${orderSummary.deliveryFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Impuestos</span>
                        <span className="font-medium">${orderSummary.tax.toFixed(2)}</span>
                      </div>
                      {orderSummary.discount > 0 && (
                        <div className="flex justify-between text-emerald-600">
                          <span>Descuento</span>
                          <span>-${orderSummary.discount.toFixed(2)}</span>
                        </div>
                      )}
                      <Divider />
                      <div className="flex justify-between text-xl">
                        <span className="font-bold">Total</span>
                        <span className="font-bold text-emerald-600">${orderSummary.total.toFixed(2)}</span>
                      </div>
                    </div>

                    <Alert severity="info" className="mb-6">
                      <Typography variant="body2">
                        Tu pedido será preparado por {Object.keys(groupedItems).length} restaurante
                        {Object.keys(groupedItems).length > 1 ? "s" : ""} y entregado en una sola orden.
                      </Typography>
                    </Alert>

                    <Button
                      variant="contained"
                      fullWidth
                      size="large"
                      onClick={handleConfirmOrder}
                      disabled={!acceptedTerms || isProcessing}
                      className="bg-emerald-500 hover:bg-emerald-600 py-3 mb-4"
                    >
                      {isProcessing ? (
                        <div className="flex items-center gap-2">
                          <CircularProgress size={20} color="inherit" />
                          <span>Procesando Pedido...</span>
                        </div>
                      ) : (
                        `Confirmar Pedido - $${orderSummary.total.toFixed(2)}`
                      )}
                    </Button>

                    <div className="text-center">
                      <Typography variant="body2" className="text-gray-500">
                        🔒 Pago 100% seguro y protegido
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Success Dialog */}
        <Dialog open={showSuccess} maxWidth="sm" fullWidth>
          <DialogContent className="text-center p-8">
            <CheckCircle size={80} className="text-emerald-500 mx-auto mb-4" />
            <Typography variant="h4" className="font-bold text-gray-900 mb-2">
              ¡Pedido Confirmado!
            </Typography>
            <Typography variant="body1" className="text-gray-600 mb-6">
              Tu pedido ha sido enviado a los restaurantes y está siendo preparado
            </Typography>
            <div className="bg-emerald-50 rounded-lg p-4 mb-6">
              <Typography variant="h6" className="font-semibold text-emerald-800 mb-2">
                Número de Pedido: #DG-2024-001
              </Typography>
              <div className="flex items-center justify-center gap-2 text-emerald-700 mb-2">
                <Clock size={16} />
                <span>Tiempo estimado: {orderSummary.estimatedTime}</span>
              </div>
              <Typography variant="body2" className="text-emerald-700">
                Recibirás actualizaciones por SMS al {deliveryAddress.phone}
              </Typography>
            </div>
            <div className="space-y-3">
              <Button
                variant="contained"
                fullWidth
                size="large"
                className="bg-emerald-500 hover:bg-emerald-600"
                onClick={() => (window.location.href = "/orders/DG-2024-001")}
              >
                Seguir mi Pedido
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => (window.location.href = "/")}
                className="border-emerald-500 text-emerald-600"
              >
                Hacer Otro Pedido
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </ThemeProvider>
  )
}
