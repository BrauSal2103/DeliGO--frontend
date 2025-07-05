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
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from "@mui/material"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import {
  Search,
  Filter,
  MoreVertical,
  Repeat,
  Star,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  ChefHat,
  Calendar,
  TrendingUp,
  ShoppingBag,
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

interface OrderItem {
  id: number
  name: string
  quantity: number
  price: number
}

interface Order {
  id: string
  date: string
  time: string
  restaurants: string[]
  items: OrderItem[]
  total: number
  status: "delivered" | "cancelled" | "in_progress"
  deliveryAddress: string
  estimatedTime?: string
  rating?: number
  canReorder: boolean
  canRate: boolean
  mainImage: string
}

const mockOrders: Order[] = [
  {
    id: "DG-2024-001",
    date: "2024-01-15",
    time: "14:30",
    restaurants: ["Bella Italia", "Taco Loco"],
    items: [
      { id: 1, name: "Pizza Margherita", quantity: 2, price: 37.98 },
      { id: 2, name: "Pasta Carbonara", quantity: 1, price: 16.99 },
      { id: 3, name: "Tacos de Carnitas", quantity: 3, price: 41.97 },
    ],
    total: 74.46,
    status: "delivered",
    deliveryAddress: "Av. Libertador 1234, Apt 4B",
    rating: 5,
    canReorder: true,
    canRate: false,
    mainImage: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "DG-2024-002",
    date: "2024-01-12",
    time: "19:45",
    restaurants: ["Sushi Zen"],
    items: [
      { id: 4, name: "Sushi Variado", quantity: 1, price: 32.99 },
      { id: 5, name: "Ramen Tonkotsu", quantity: 1, price: 18.99 },
    ],
    total: 54.98,
    status: "delivered",
    deliveryAddress: "Av. Libertador 1234, Apt 4B",
    rating: 4,
    canReorder: true,
    canRate: false,
    mainImage: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "DG-2024-003",
    date: "2024-01-10",
    time: "12:15",
    restaurants: ["Green Garden"],
    items: [
      { id: 6, name: "Ensalada Quinoa", quantity: 2, price: 24.98 },
      { id: 7, name: "Smoothie Verde", quantity: 1, price: 8.99 },
    ],
    total: 36.97,
    status: "delivered",
    deliveryAddress: "Av. Libertador 1234, Apt 4B",
    canReorder: true,
    canRate: true,
    mainImage: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "DG-2024-004",
    date: "2024-01-08",
    time: "20:30",
    restaurants: ["Burger House"],
    items: [
      { id: 8, name: "Burger Clásica", quantity: 2, price: 29.98 },
      { id: 9, name: "Papas Fritas", quantity: 1, price: 6.99 },
    ],
    total: 39.97,
    status: "cancelled",
    deliveryAddress: "Av. Libertador 1234, Apt 4B",
    canReorder: true,
    canRate: false,
    mainImage: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "DG-2024-005",
    date: "2024-01-05",
    time: "13:20",
    restaurants: ["Le Petit Bistro"],
    items: [
      { id: 10, name: "Coq au Vin", quantity: 1, price: 45.99 },
      { id: 11, name: "Crème Brûlée", quantity: 1, price: 12.99 },
    ],
    total: 64.98,
    status: "delivered",
    deliveryAddress: "Av. Libertador 1234, Apt 4B",
    rating: 5,
    canReorder: true,
    canRate: false,
    mainImage: "/placeholder.svg?height=80&width=80",
  },
]

const orderStats = {
  totalOrders: 28,
  totalSpent: 1247.85,
  favoriteRestaurant: "Bella Italia",
  avgRating: 4.6,
}

export default function OrderHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTab, setSelectedTab] = useState(0)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showRatingDialog, setShowRatingDialog] = useState(false)
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState("")

  const filterTabs = ["Todos", "Entregados", "Cancelados", "En Proceso"]

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.restaurants.some((restaurant) => restaurant.toLowerCase().includes(searchQuery.toLowerCase())) ||
      order.items.some((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesTab =
      selectedTab === 0 ||
      (selectedTab === 1 && order.status === "delivered") ||
      (selectedTab === 2 && order.status === "cancelled") ||
      (selectedTab === 3 && order.status === "in_progress")

    return matchesSearch && matchesTab
  })

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, order: Order) => {
    setAnchorEl(event.currentTarget)
    setSelectedOrder(order)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedOrder(null)
  }

  const handleReorder = () => {
    if (selectedOrder) {
      // Aquí se agregarían los productos al carrito
      alert(`Productos de ${selectedOrder.id} agregados al carrito`)
    }
    handleMenuClose()
  }

  const handleRate = () => {
    setShowRatingDialog(true)
    handleMenuClose()
  }

  const handleSubmitRating = () => {
    // Aquí se enviaría la calificación
    console.log("Rating:", rating, "Review:", review)
    setShowRatingDialog(false)
    setRating(0)
    setReview("")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "success"
      case "cancelled":
        return "error"
      case "in_progress":
        return "warning"
      default:
        return "default"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "delivered":
        return "Entregado"
      case "cancelled":
        return "Cancelado"
      case "in_progress":
        return "En Proceso"
      default:
        return "Desconocido"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle size={16} />
      case "cancelled":
        return <XCircle size={16} />
      case "in_progress":
        return <Clock size={16} />
      default:
        return <Clock size={16} />
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
      <div className="w-screen h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <AppBar position="sticky" className="bg-white shadow-sm">
          <Toolbar className="px-4 lg:px-8">
            <ChefHat size={28} className="text-emerald-500 mr-2" />
            <Typography variant="h6" component="h1" className="font-bold text-emerald-600 flex-grow">
              Mis Pedidos
            </Typography>
            <IconButton>
              <Filter size={24} />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <div className="flex-grow max-w-4xl mx-auto w-full px-4 lg:px-8 py-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <ShoppingBag size={24} className="text-emerald-600 mx-auto mb-2" />
                <Typography variant="h6" className="font-bold text-gray-900">
                  {orderStats.totalOrders}
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  Pedidos
                </Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp size={24} className="text-emerald-600 mx-auto mb-2" />
                <Typography variant="h6" className="font-bold text-gray-900">
                  ${orderStats.totalSpent.toFixed(0)}
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  Gastado
                </Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Star size={24} className="text-emerald-600 mx-auto mb-2" />
                <Typography variant="h6" className="font-bold text-gray-900">
                  {orderStats.avgRating}
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  Rating Prom.
                </Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <ChefHat size={24} className="text-emerald-600 mx-auto mb-2" />
                <Typography variant="h6" className="font-bold text-gray-900 text-sm">
                  {orderStats.favoriteRestaurant}
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  Favorito
                </Typography>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <TextField
                fullWidth
                placeholder="Buscar por pedido, restaurante o producto..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search size={20} className="text-gray-400" />
                    </InputAdornment>
                  ),
                }}
                className="mb-4"
              />

              <Tabs
                value={selectedTab}
                onChange={(_, newValue) => setSelectedTab(newValue)}
                variant="scrollable"
                scrollButtons="auto"
              >
                {filterTabs.map((tab, index) => (
                  <Tab key={index} label={tab} />
                ))}
              </Tabs>
            </CardContent>
          </Card>

          {/* Orders List */}
          {filteredOrders.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <ShoppingBag size={64} className="text-gray-300 mx-auto mb-4" />
                <Typography variant="h6" className="text-gray-500 mb-2">
                  No se encontraron pedidos
                </Typography>
                <Typography variant="body2" className="text-gray-400 mb-6">
                  {searchQuery ? "Intenta con otros términos de búsqueda" : "Aún no has realizado ningún pedido"}
                </Typography>
                <Button
                  variant="contained"
                  className="bg-emerald-500 hover:bg-emerald-600"
                  onClick={() => (window.location.href = "/")}
                >
                  Explorar Restaurantes
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <Card key={order.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {/* Order Image */}
                      <img
                        src={order.mainImage || "/placeholder.svg"}
                        alt="Pedido"
                        className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                      />

                      {/* Order Details */}
                      <div className="flex-grow">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <Typography variant="h6" className="font-bold text-gray-900">
                              Pedido #{order.id}
                            </Typography>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Calendar size={14} />
                              <Typography variant="body2">
                                {formatDate(order.date)} • {order.time}
                              </Typography>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Chip
                              icon={getStatusIcon(order.status)}
                              label={getStatusText(order.status)}
                              color={getStatusColor(order.status) as "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"}
                              size="small"
                            />
                            <IconButton size="small" onClick={(e) => handleMenuClick(e, order)}>
                              <MoreVertical size={16} />
                            </IconButton>
                          </div>
                        </div>

                        {/* Restaurants */}
                        <div className="flex items-center gap-2 mb-2">
                          <ChefHat size={14} className="text-emerald-600" />
                          <Typography variant="body2" className="text-gray-700">
                            {order.restaurants.join(", ")}
                          </Typography>
                        </div>

                        {/* Items Preview */}
                        <Typography variant="body2" className="text-gray-600 mb-2">
                          {order.items
                            .slice(0, 2)
                            .map((item) => `${item.quantity}x ${item.name}`)
                            .join(", ")}
                          {order.items.length > 2 && ` +${order.items.length - 2} más`}
                        </Typography>

                        {/* Address and Total */}
                        <div className="flex justify-between items-end">
                          <div className="flex items-center gap-1 text-gray-600">
                            <MapPin size={14} />
                            <Typography variant="body2">{order.deliveryAddress}</Typography>
                          </div>
                          <Typography variant="h6" className="font-bold text-emerald-600">
                            ${order.total.toFixed(2)}
                          </Typography>
                        </div>

                        {/* Rating */}
                        {order.rating && (
                          <div className="flex items-center gap-2 mt-2">
                            <Rating value={order.rating} size="small" readOnly />
                            <Typography variant="body2" className="text-gray-600">
                              Tu calificación: {order.rating}/5
                            </Typography>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <Divider className="my-4" />
                    <div className="flex gap-2 flex-wrap">
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => (window.location.href = `/orders/${order.id}`)}
                        className="border-emerald-500 text-emerald-600 hover:bg-emerald-50"
                      >
                        Ver Detalles
                      </Button>
                      {order.canReorder && (
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<Repeat size={16} />}
                          onClick={handleReorder}
                          className="border-gray-300 text-gray-600 hover:bg-gray-50"
                        >
                          Reordenar
                        </Button>
                      )}
                      {order.canRate && (
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<Star size={16} />}
                          onClick={handleRate}
                          className="border-amber-500 text-amber-600 hover:bg-amber-50"
                        >
                          Calificar
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Context Menu */}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={() => (window.location.href = `/orders/${selectedOrder?.id}`)}>Ver Detalles</MenuItem>
          {selectedOrder?.canReorder && <MenuItem onClick={handleReorder}>Reordenar</MenuItem>}
          {selectedOrder?.canRate && <MenuItem onClick={handleRate}>Calificar</MenuItem>}
          <MenuItem onClick={handleMenuClose}>Reportar Problema</MenuItem>
        </Menu>

        {/* Rating Dialog */}
        <Dialog open={showRatingDialog} onClose={() => setShowRatingDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Calificar Pedido</DialogTitle>
          <DialogContent>
            <div className="text-center mb-4">
              <Typography variant="h6" className="mb-2">
                ¿Cómo estuvo tu pedido?
              </Typography>
              <Rating
                value={rating}
                onChange={(_, newValue) => setRating(newValue || 0)}
                size="large"
                className="mb-4"
              />
            </div>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Comparte tu experiencia (opcional)"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowRatingDialog(false)}>Cancelar</Button>
            <Button
              onClick={handleSubmitRating}
              variant="contained"
              disabled={rating === 0}
              className="bg-emerald-500 hover:bg-emerald-600"
            >
              Enviar Calificación
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider>
  )
}
