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
  TextField,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Chip,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import {
  ArrowLeft,
  Plus,
  Minus,
  Trash2,
  CreditCard,
  Truck,
  Clock,
  ShoppingBag,
  ChefHat,
  CheckCircle,
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

interface DeliveryInfo {
  address: string
  city: string
  postalCode: string
  instructions: string
  phone: string
}

const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: "Pizza Margherita",
    description: "Salsa de tomate, mozzarella fresca, albahaca",
    price: 18.99,
    quantity: 2,
    image: "/placeholder.svg?height=80&width=80",
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
    image: "/placeholder.svg?height=80&width=80",
    restaurantName: "Bella Italia",
    restaurantId: 1,
  },
  {
    id: 3,
    name: "Tacos de Carnitas",
    description: "Tres tacos con carnitas, cebolla, cilantro",
    price: 13.99,
    quantity: 3,
    image: "/placeholder.svg?height=80&width=80",
    restaurantName: "Taco Loco",
    restaurantId: 2,
    customizations: ["Salsa picante", "Extra guacamole"],
  },
]

const steps = ["Carrito", "Entrega", "Pago", "Confirmación"]

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems)
  const [activeStep, setActiveStep] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
    address: "",
    city: "",
    postalCode: "",
    instructions: "",
    phone: "",
  })

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id)
      return
    }
    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getDeliveryFee = () => {
    // Diferentes tarifas por restaurante
    const restaurantFees: Record<number, number> = { 1: 2.99, 2: 1.99 }
    const uniqueRestaurants = [...new Set(cartItems.map((item) => item.restaurantId))]
    return uniqueRestaurants.reduce((total, restaurantId) => total + (restaurantFees[restaurantId] || 2.99), 0)
  }

  const getTax = () => {
    return getSubtotal() * 0.08 // 8% tax
  }

  const getTotal = () => {
    return getSubtotal() + getDeliveryFee() + getTax()
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

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

  if (cartItems.length === 0) {
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
              <Typography variant="h6" component="h1" className="font-bold text-emerald-600">
                DeliGO - Carrito
              </Typography>
            </Toolbar>
          </AppBar>

          {/* Empty Cart */}
          <div className="flex-grow flex items-center justify-center p-8">
            <div className="text-center max-w-md">
              <ShoppingBag size={80} className="text-gray-300 mx-auto mb-6" />
              <Typography variant="h4" className="font-bold text-gray-900 mb-4">
                Tu carrito está vacío
              </Typography>
              <Typography variant="body1" className="text-gray-600 mb-8">
                Parece que aún no has agregado nada a tu carrito. ¡Explora nuestros restaurantes y encuentra algo
                delicioso!
              </Typography>
              <Button
                variant="contained"
                size="large"
                className="bg-emerald-500 hover:bg-emerald-600 px-8 py-3"
                onClick={() => window.history.back()}
              >
                Explorar Restaurantes
              </Button>
            </div>
          </div>
        </div>
      </ThemeProvider>
    )
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
            <Typography variant="h6" component="h1" className="font-bold text-emerald-600 flex-grow">
              DeliGO - Carrito
            </Typography>
            <Chip
              label={`${cartItems.reduce((total, item) => total + item.quantity, 0)} productos`}
              color="primary"
              variant="outlined"
            />
          </Toolbar>
        </AppBar>

        {/* Progress Stepper */}
        <div className="bg-white border-b py-4">
          <div className="max-w-4xl mx-auto px-4">
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow max-w-7xl mx-auto w-full px-4 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {activeStep === 0 && (
                <>
                  <div className="flex justify-between items-center">
                    <Typography variant="h5" className="font-bold text-gray-900">
                      Tu Pedido
                    </Typography>
                    <Button
                      variant="outlined"
                      onClick={() => window.history.back()}
                      className="border-emerald-500 text-emerald-600 hover:bg-emerald-50"
                    >
                      Continuar Comprando
                    </Button>
                  </div>

                  {Object.entries(groupedItems).map(([restaurantId, group]) => (
                    <Card key={restaurantId} className="overflow-hidden">
                      <div className="bg-emerald-50 px-6 py-3 border-b">
                        <Typography variant="h6" className="font-semibold text-emerald-800">
                          {group.restaurantName}
                        </Typography>
                      </div>
                      <CardContent className="p-0">
                        {group.items.map((item, index) => (
                          <div key={item.id}>
                            <div className="p-6">
                              <div className="flex gap-4">
                                <img
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                                />
                                <div className="flex-grow">
                                  <div className="flex justify-between items-start mb-2">
                                    <div>
                                      <Typography variant="h6" className="font-semibold text-gray-900">
                                        {item.name}
                                      </Typography>
                                      <Typography variant="body2" className="text-gray-600">
                                        {item.description}
                                      </Typography>
                                    </div>
                                    <IconButton
                                      onClick={() => removeItem(item.id)}
                                      className="text-red-500 hover:bg-red-50"
                                      size="small"
                                    >
                                      <Trash2 size={16} />
                                    </IconButton>
                                  </div>

                                  {item.customizations && (
                                    <div className="flex flex-wrap gap-1 mb-3">
                                      {item.customizations.map((custom, idx) => (
                                        <Chip key={idx} label={custom} size="small" variant="outlined" />
                                      ))}
                                    </div>
                                  )}

                                  <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
                                      <IconButton
                                        size="small"
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="hover:bg-white"
                                      >
                                        <Minus size={16} />
                                      </IconButton>
                                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                                      <IconButton
                                        size="small"
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="hover:bg-white"
                                      >
                                        <Plus size={16} />
                                      </IconButton>
                                    </div>
                                    <Typography variant="h6" className="font-bold text-emerald-600">
                                      ${(item.price * item.quantity).toFixed(2)}
                                    </Typography>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {index < group.items.length - 1 && <Divider />}
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  ))}
                </>
              )}

              {activeStep === 1 && (
                <Card className="p-6">
                  <Typography variant="h5" className="font-bold text-gray-900 mb-6">
                    Información de Entrega
                  </Typography>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TextField
                      fullWidth
                      label="Dirección completa"
                      value={deliveryInfo.address}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, address: e.target.value })}
                      required
                      className="md:col-span-2"
                    />
                    <TextField
                      fullWidth
                      label="Ciudad"
                      value={deliveryInfo.city}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, city: e.target.value })}
                      required
                    />
                    <TextField
                      fullWidth
                      label="Código Postal"
                      value={deliveryInfo.postalCode}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, postalCode: e.target.value })}
                      required
                    />
                    <TextField
                      fullWidth
                      label="Teléfono"
                      value={deliveryInfo.phone}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, phone: e.target.value })}
                      required
                      className="md:col-span-2"
                    />
                    <TextField
                      fullWidth
                      label="Instrucciones de entrega (opcional)"
                      multiline
                      rows={3}
                      value={deliveryInfo.instructions}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, instructions: e.target.value })}
                      className="md:col-span-2"
                    />
                  </div>
                </Card>
              )}

              {activeStep === 2 && (
                <Card className="p-6">
                  <Typography variant="h5" className="font-bold text-gray-900 mb-6">
                    Método de Pago
                  </Typography>
                  <FormControl component="fieldset">
                    <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                      <FormControlLabel
                        value="card"
                        control={<Radio />}
                        label={
                          <div className="flex items-center gap-2">
                            <CreditCard size={20} />
                            <span>Tarjeta de Crédito/Débito</span>
                          </div>
                        }
                      />
                      <FormControlLabel
                        value="cash"
                        control={<Radio />}
                        label={
                          <div className="flex items-center gap-2">
                            <span>💵</span>
                            <span>Efectivo</span>
                          </div>
                        }
                      />
                    </RadioGroup>
                  </FormControl>

                  {paymentMethod === "card" && (
                    <div className="mt-6 space-y-4">
                      <TextField fullWidth label="Número de tarjeta" placeholder="1234 5678 9012 3456" />
                      <div className="grid grid-cols-2 gap-4">
                        <TextField label="MM/AA" placeholder="12/25" />
                        <TextField label="CVV" placeholder="123" />
                      </div>
                      <TextField fullWidth label="Nombre en la tarjeta" />
                    </div>
                  )}
                </Card>
              )}

              {activeStep === 3 && (
                <Card className="p-6 text-center">
                  <CheckCircle size={80} className="text-emerald-500 mx-auto mb-4" />
                  <Typography variant="h4" className="font-bold text-gray-900 mb-2">
                    ¡Pedido Confirmado!
                  </Typography>
                  <Typography variant="body1" className="text-gray-600 mb-6">
                    Tu pedido ha sido enviado a los restaurantes. Recibirás actualizaciones por SMS.
                  </Typography>
                  <div className="bg-emerald-50 rounded-lg p-4 mb-6">
                    <Typography variant="h6" className="font-semibold text-emerald-800 mb-2">
                      Número de Pedido: #DG-2024-001
                    </Typography>
                    <div className="flex items-center justify-center gap-2 text-emerald-700">
                      <Clock size={16} />
                      <span>Tiempo estimado: 35-45 minutos</span>
                    </div>
                  </div>
                </Card>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <Typography variant="h6" className="font-bold text-gray-900 mb-4">
                    Resumen del Pedido
                  </Typography>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">${getSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 flex items-center gap-1">
                        <Truck size={14} />
                        Envío
                      </span>
                      <span className="font-medium">${getDeliveryFee().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Impuestos</span>
                      <span className="font-medium">${getTax().toFixed(2)}</span>
                    </div>
                    <Divider />
                    <div className="flex justify-between text-lg">
                      <span className="font-bold">Total</span>
                      <span className="font-bold text-emerald-600">${getTotal().toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="bg-emerald-50 rounded-lg p-3 mb-4">
                    <div className="flex items-center gap-2 text-emerald-700 text-sm">
                      <Clock size={14} />
                      <span>Tiempo estimado: 35-45 min</span>
                    </div>
                  </div>

                  {activeStep < 3 && (
                    <div className="space-y-3">
                      <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        onClick={handleNext}
                        className="bg-emerald-500 hover:bg-emerald-600 py-3"
                        disabled={
                          (activeStep === 1 && (!deliveryInfo.address || !deliveryInfo.city || !deliveryInfo.phone)) ||
                          (activeStep === 2 && !paymentMethod)
                        }
                      >
                        {activeStep === 0 && "Continuar a Entrega"}
                        {activeStep === 1 && "Continuar a Pago"}
                        {activeStep === 2 && `Confirmar Pedido - $${getTotal().toFixed(2)}`}
                      </Button>
                      {activeStep > 0 && (
                        <Button variant="outlined" fullWidth onClick={handleBack}>
                          Regresar
                        </Button>
                      )}
                    </div>
                  )}

                  {activeStep === 3 && (
                    <Button
                      variant="contained"
                      fullWidth
                      size="large"
                      className="bg-emerald-500 hover:bg-emerald-600 py-3"
                      onClick={() => (window.location.href = "/")}
                    >
                      Hacer Otro Pedido
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}
