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
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Chip,
  Switch,
  FormGroup,
  Alert,
  CircularProgress,
  Dialog,
  DialogContent,
} from "@mui/material"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import {
  ArrowLeft,
  CreditCard,
  Smartphone,
  Banknote,
  Shield,
  Lock,
  CheckCircle,
  Plus,
  Trash2,
  ChefHat,
  Eye,
  EyeOff,
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

interface PaymentMethod {
  id: string
  type: "card" | "digital" | "cash" | "bank"
  name: string
  description: string
  icon: React.ReactNode
  enabled: boolean
  fee?: number
}

interface SavedCard {
  id: string
  last4: string
  brand: string
  expiryMonth: string
  expiryYear: string
  holderName: string
  isDefault: boolean
}

interface OrderSummary {
  subtotal: number
  deliveryFee: number
  tax: number
  discount: number
  total: number
  itemCount: number
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "card",
    type: "card",
    name: "Tarjeta de Crédito/Débito",
    description: "Visa, Mastercard, American Express",
    icon: <CreditCard size={24} />,
    enabled: true,
  },
  {
    id: "digital",
    type: "digital",
    name: "Billeteras Digitales",
    description: "PayPal, Apple Pay, Google Pay",
    icon: <Smartphone size={24} />,
    enabled: true,
  },
  {
    id: "cash",
    type: "cash",
    name: "Efectivo",
    description: "Pago contra entrega",
    icon: <Banknote size={24} />,
    enabled: true,
    fee: 0,
  },
  {
    id: "bank",
    type: "bank",
    name: "Transferencia Bancaria",
    description: "Transferencia inmediata",
    icon: <CreditCard size={24} />,
    enabled: false,
  },
]

const savedCards: SavedCard[] = [
  {
    id: "card-1",
    last4: "4242",
    brand: "Visa",
    expiryMonth: "12",
    expiryYear: "25",
    holderName: "Juan Pérez",
    isDefault: true,
  },
  {
    id: "card-2",
    last4: "5555",
    brand: "Mastercard",
    expiryMonth: "08",
    expiryYear: "26",
    holderName: "Juan Pérez",
    isDefault: false,
  },
]

const orderSummary: OrderSummary = {
  subtotal: 54.97,
  deliveryFee: 2.99,
  tax: 4.4,
  discount: 5.0,
  total: 57.36,
  itemCount: 6,
}

export default function PaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState("card")
  const [selectedCard, setSelectedCard] = useState("card-1")
  const [useNewCard, setUseNewCard] = useState(false)
  const [saveCard, setSaveCard] = useState(false)
  const [showCvv, setShowCvv] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [cardForm, setCardForm] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  })

  const handlePayment = async () => {
    setIsProcessing(true)
    // Simular procesamiento de pago
    setTimeout(() => {
      setIsProcessing(false)
      setShowSuccess(true)
    }, 3000)
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  const getCardBrand = (number: string) => {
    const num = number.replace(/\s/g, "")
    if (num.startsWith("4")) return "Visa"
    if (num.startsWith("5")) return "Mastercard"
    if (num.startsWith("3")) return "American Express"
    return "Tarjeta"
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
              DeliGO - Pago Seguro
            </Typography>
            <div className="flex items-center gap-2 text-emerald-600">
              <Shield size={20} />
              <Typography variant="body2" className="hidden sm:block">
                Pago Protegido
              </Typography>
            </div>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <div className="flex-grow max-w-4xl mx-auto w-full px-4 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Payment Methods */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Summary Mobile */}
              <Card className="lg:hidden">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <Typography variant="h6" className="font-bold">
                      Resumen del Pedido
                    </Typography>
                    <Chip label={`${orderSummary.itemCount} productos`} size="small" color="primary" />
                  </div>
                  <div className="flex justify-between items-center">
                    <Typography variant="h5" className="font-bold text-emerald-600">
                      ${orderSummary.total.toFixed(2)}
                    </Typography>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method Selection */}
              <Card>
                <CardContent className="p-6">
                  <Typography variant="h5" className="font-bold text-gray-900 mb-6">
                    Método de Pago
                  </Typography>

                  <FormControl component="fieldset" className="w-full">
                    <RadioGroup value={selectedMethod} onChange={(e) => setSelectedMethod(e.target.value)}>
                      {paymentMethods.map((method) => (
                        <div key={method.id} className="mb-4">
                          <FormControlLabel
                            value={method.id}
                            control={<Radio />}
                            disabled={!method.enabled}
                            label={
                              <div className="flex items-center gap-3 py-2">
                                <div className="text-emerald-600">{method.icon}</div>
                                <div className="flex-grow">
                                  <Typography variant="subtitle1" className="font-medium">
                                    {method.name}
                                  </Typography>
                                  <Typography variant="body2" className="text-gray-600">
                                    {method.description}
                                  </Typography>
                                  {method.fee !== undefined && (
                                    <Typography variant="body2" className="text-emerald-600">
                                      {method.fee === 0 ? "Sin costo adicional" : `+$${method.fee.toFixed(2)}`}
                                    </Typography>
                                  )}
                                </div>
                                {!method.enabled && <Chip label="Próximamente" size="small" variant="outlined" />}
                              </div>
                            }
                            className="w-full border rounded-lg p-3 hover:bg-gray-50 transition-colors"
                          />
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </CardContent>
              </Card>

              {/* Card Payment Details */}
              {selectedMethod === "card" && (
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <Typography variant="h6" className="font-bold text-gray-900">
                        Detalles de la Tarjeta
                      </Typography>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Lock size={16} />
                        <Typography variant="body2">Encriptado SSL</Typography>
                      </div>
                    </div>

                    {/* Saved Cards */}
                    {savedCards.length > 0 && !useNewCard && (
                      <div className="mb-6">
                        <Typography variant="subtitle2" className="font-medium mb-3">
                          Tarjetas Guardadas
                        </Typography>
                        <div className="space-y-3">
                          {savedCards.map((card) => (
                            <div
                              key={card.id}
                              onClick={() => setSelectedCard(card.id)}
                              className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                                selectedCard === card.id
                                  ? "border-emerald-500 bg-emerald-50"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <CreditCard size={24} className="text-gray-600" />
                                  <div>
                                    <Typography variant="subtitle2" className="font-medium">
                                      {card.brand} •••• {card.last4}
                                    </Typography>
                                    <Typography variant="body2" className="text-gray-600">
                                      {card.holderName} • {card.expiryMonth}/{card.expiryYear}
                                    </Typography>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  {card.isDefault && <Chip label="Principal" size="small" color="primary" />}
                                  <IconButton size="small" className="text-gray-400">
                                    <Trash2 size={16} />
                                  </IconButton>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <Button
                          variant="outlined"
                          startIcon={<Plus size={16} />}
                          onClick={() => setUseNewCard(true)}
                          className="mt-4 border-emerald-500 text-emerald-600 hover:bg-emerald-50"
                        >
                          Usar Nueva Tarjeta
                        </Button>
                      </div>
                    )}

                    {/* New Card Form */}
                    {(useNewCard || savedCards.length === 0) && (
                      <div className="space-y-4">
                        <TextField
                          fullWidth
                          label="Número de Tarjeta"
                          value={cardForm.number}
                          onChange={(e) =>
                            setCardForm({ ...cardForm, number: formatCardNumber(e.target.value.slice(0, 19)) })
                          }
                          placeholder="1234 5678 9012 3456"
                          InputProps={{
                            endAdornment: (
                              <div className="flex items-center gap-1">
                                <Typography variant="body2" className="text-gray-500">
                                  {getCardBrand(cardForm.number)}
                                </Typography>
                              </div>
                            ),
                          }}
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <TextField
                            label="MM/AA"
                            value={cardForm.expiry}
                            onChange={(e) =>
                              setCardForm({ ...cardForm, expiry: formatExpiry(e.target.value.slice(0, 5)) })
                            }
                            placeholder="12/25"
                          />
                          <TextField
                            label="CVV"
                            type={showCvv ? "text" : "password"}
                            value={cardForm.cvv}
                            onChange={(e) => setCardForm({ ...cardForm, cvv: e.target.value.slice(0, 4) })}
                            placeholder="123"
                            InputProps={{
                              endAdornment: (
                                <IconButton onClick={() => setShowCvv(!showCvv)} size="small">
                                  {showCvv ? <EyeOff size={16} /> : <Eye size={16} />}
                                </IconButton>
                              ),
                            }}
                          />
                        </div>

                        <TextField
                          fullWidth
                          label="Nombre en la Tarjeta"
                          value={cardForm.name}
                          onChange={(e) => setCardForm({ ...cardForm, name: e.target.value })}
                          placeholder="Juan Pérez"
                        />

                        <FormGroup>
                          <FormControlLabel
                            control={<Switch checked={saveCard} onChange={(e) => setSaveCard(e.target.checked)} />}
                            label="Guardar esta tarjeta para futuros pagos"
                          />
                        </FormGroup>

                        {useNewCard && (
                          <Button variant="text" onClick={() => setUseNewCard(false)} className="text-emerald-600">
                            ← Usar Tarjeta Guardada
                          </Button>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Digital Wallet */}
              {selectedMethod === "digital" && (
                <Card>
                  <CardContent className="p-6">
                    <Typography variant="h6" className="font-bold text-gray-900 mb-4">
                      Billeteras Digitales
                    </Typography>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {["PayPal", "Apple Pay", "Google Pay"].map((wallet) => (
                        <Button
                          key={wallet}
                          variant="outlined"
                          size="large"
                          className="py-4 border-2 hover:border-emerald-500 hover:bg-emerald-50"
                        >
                          <div className="text-center">
                            <Smartphone size={24} className="mx-auto mb-2" />
                            <Typography variant="body2">{wallet}</Typography>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Cash Payment */}
              {selectedMethod === "cash" && (
                <Card>
                  <CardContent className="p-6">
                    <Typography variant="h6" className="font-bold text-gray-900 mb-4">
                      Pago en Efectivo
                    </Typography>
                    <Alert severity="info" className="mb-4">
                      <Typography variant="body2">
                        Pagarás directamente al repartidor cuando recibas tu pedido. Asegúrate de tener el monto exacto.
                      </Typography>
                    </Alert>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <Typography variant="subtitle2" className="font-medium text-amber-800 mb-2">
                        Total a pagar: ${orderSummary.total.toFixed(2)}
                      </Typography>
                      <Typography variant="body2" className="text-amber-700">
                        Te recomendamos tener billetes pequeños para facilitar el cambio.
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Security Info */}
              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Shield size={24} className="text-emerald-600" />
                    <div>
                      <Typography variant="subtitle2" className="font-medium text-gray-900">
                        Tu pago está protegido
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        Utilizamos encriptación SSL de 256 bits y cumplimos con los estándares PCI DSS
                      </Typography>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary Desktop */}
            <div className="hidden lg:block">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <Typography variant="h6" className="font-bold text-gray-900 mb-4">
                    Resumen del Pedido
                  </Typography>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal ({orderSummary.itemCount} productos)</span>
                      <span className="font-medium">${orderSummary.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Envío</span>
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
                    <div className="flex justify-between text-lg">
                      <span className="font-bold">Total</span>
                      <span className="font-bold text-emerald-600">${orderSummary.total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="bg-emerald-500 hover:bg-emerald-600 py-3 mb-4"
                  >
                    {isProcessing ? (
                      <div className="flex items-center gap-2">
                        <CircularProgress size={20} color="inherit" />
                        <span>Procesando...</span>
                      </div>
                    ) : (
                      `Pagar ${orderSummary.total.toFixed(2)}`
                    )}
                  </Button>

                  <div className="text-center">
                    <Typography variant="body2" className="text-gray-500 mb-2">
                      Al confirmar tu pago aceptas nuestros
                    </Typography>
                    <div className="flex justify-center gap-2 text-xs">
                      <Button variant="text" size="small" className="text-emerald-600 p-0 min-w-0">
                        Términos
                      </Button>
                      <span className="text-gray-400">•</span>
                      <Button variant="text" size="small" className="text-emerald-600 p-0 min-w-0">
                        Privacidad
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Mobile Payment Button */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4">
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handlePayment}
              disabled={isProcessing}
              className="bg-emerald-500 hover:bg-emerald-600 py-3"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <CircularProgress size={20} color="inherit" />
                  <span>Procesando...</span>
                </div>
              ) : (
                `Pagar $${orderSummary.total.toFixed(2)}`
              )}
            </Button>
          </div>
        </div>

        {/* Success Dialog */}
        <Dialog open={showSuccess} maxWidth="sm" fullWidth>
          <DialogContent className="text-center p-8">
            <CheckCircle size={80} className="text-emerald-500 mx-auto mb-4" />
            <Typography variant="h4" className="font-bold text-gray-900 mb-2">
              ¡Pago Exitoso!
            </Typography>
            <Typography variant="body1" className="text-gray-600 mb-6">
              Tu pedido ha sido confirmado y está siendo preparado
            </Typography>
            <div className="bg-emerald-50 rounded-lg p-4 mb-6">
              <Typography variant="h6" className="font-semibold text-emerald-800 mb-1">
                Número de Pedido: #DG-2024-001
              </Typography>
              <Typography variant="body2" className="text-emerald-700">
                Recibirás actualizaciones por SMS y email
              </Typography>
            </div>
            <Button
              variant="contained"
              fullWidth
              size="large"
              className="bg-emerald-500 hover:bg-emerald-600"
              onClick={() => (window.location.href = "/")}
            >
              Continuar
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </ThemeProvider>
  )
}
