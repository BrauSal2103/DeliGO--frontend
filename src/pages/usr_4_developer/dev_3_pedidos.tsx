"use client"

import { useState, useEffect } from "react"
import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  Download,
  RefreshCw,
  Eye,
  Edit,
  Trash2,
  MapPin,
  User,
  Store,
  Truck,
  DollarSign,
  Calendar,
  MoreVertical,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react"

interface Order {
  id: string
  orderNumber: string
  customer: {
    name: string
    email: string
    phone: string
    avatar: string
  }
  restaurant: {
    name: string
    address: string
  }
  driver: {
    name: string
    phone: string
    avatar: string
  } | null
  status: "pending" | "confirmed" | "preparing" | "ready" | "picked_up" | "delivered" | "cancelled"
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  total: number
  deliveryFee: number
  platformFee: number
  createdAt: string
  estimatedDelivery: string
  deliveryAddress: string
  paymentMethod: string
  notes?: string
}

interface OrderStats {
  total: number
  pending: number
  inProgress: number
  completed: number
  cancelled: number
  revenue: number
  avgDeliveryTime: number
  platformFees: number
}

const statusConfig = {
  pending: { label: "Pendiente", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  confirmed: { label: "Confirmado", color: "bg-blue-100 text-blue-800", icon: CheckCircle },
  preparing: { label: "Preparando", color: "bg-orange-100 text-orange-800", icon: Package },
  ready: { label: "Listo", color: "bg-purple-100 text-purple-800", icon: CheckCircle },
  picked_up: { label: "Recogido", color: "bg-indigo-100 text-indigo-800", icon: Truck },
  delivered: { label: "Entregado", color: "bg-green-100 text-green-800", icon: CheckCircle },
  cancelled: { label: "Cancelado", color: "bg-red-100 text-red-800", icon: XCircle },
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [stats, setStats] = useState<OrderStats>({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
    cancelled: 0,
    revenue: 0,
    avgDeliveryTime: 0,
    platformFees: 0,
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [dateFilter, setDateFilter] = useState<string>("today")
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  //const [showFilters, setShowFilters] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showOrderDetails, setShowOrderDetails] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    loadOrders()
    const interval = setInterval(loadOrders, 30000) // Actualizar cada 30 segundos
    return () => clearInterval(interval)
  }, [])

  const loadOrders = () => {
    setIsLoading(true)
    // Simular carga de datos
    setTimeout(() => {
      const mockOrders: Order[] = [
        {
          id: "1",
          orderNumber: "ORD-2024-001",
          customer: {
            name: "Ana García",
            email: "ana.garcia@email.com",
            phone: "+1234567890",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          restaurant: {
            name: "Pizza Palace",
            address: "Av. Principal 123",
          },
          driver: {
            name: "Carlos Ruiz",
            phone: "+1234567891",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          status: "delivered",
          items: [
            { name: "Pizza Margherita", quantity: 1, price: 15.99 },
            { name: "Coca Cola", quantity: 2, price: 2.5 },
          ],
          total: 20.99,
          deliveryFee: 3.5,
          platformFee: 2.1,
          createdAt: "2024-01-15T10:30:00Z",
          estimatedDelivery: "2024-01-15T11:15:00Z",
          deliveryAddress: "Calle 123, Apt 4B",
          paymentMethod: "Tarjeta de Crédito",
        },
        {
          id: "2",
          orderNumber: "ORD-2024-002",
          customer: {
            name: "Luis Martínez",
            email: "luis.martinez@email.com",
            phone: "+1234567892",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          restaurant: {
            name: "Burger House",
            address: "Calle Comercial 456",
          },
          driver: null,
          status: "preparing",
          items: [
            { name: "Hamburguesa Clásica", quantity: 2, price: 12.99 },
            { name: "Papas Fritas", quantity: 1, price: 4.99 },
          ],
          total: 30.97,
          deliveryFee: 2.5,
          platformFee: 3.1,
          createdAt: "2024-01-15T11:45:00Z",
          estimatedDelivery: "2024-01-15T12:30:00Z",
          deliveryAddress: "Av. Central 789",
          paymentMethod: "Efectivo",
        },
        {
          id: "3",
          orderNumber: "ORD-2024-003",
          customer: {
            name: "María López",
            email: "maria.lopez@email.com",
            phone: "+1234567893",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          restaurant: {
            name: "Sushi Express",
            address: "Plaza Gourmet 321",
          },
          driver: {
            name: "Pedro Sánchez",
            phone: "+1234567894",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          status: "picked_up",
          items: [
            { name: "Sushi Variado", quantity: 1, price: 24.99 },
            { name: "Sopa Miso", quantity: 1, price: 6.99 },
          ],
          total: 31.98,
          deliveryFee: 4.0,
          platformFee: 3.2,
          createdAt: "2024-01-15T12:15:00Z",
          estimatedDelivery: "2024-01-15T13:00:00Z",
          deliveryAddress: "Residencial Norte 456",
          paymentMethod: "PayPal",
        },
        {
          id: "4",
          orderNumber: "ORD-2024-004",
          customer: {
            name: "Roberto Silva",
            email: "roberto.silva@email.com",
            phone: "+1234567895",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          restaurant: {
            name: "Tacos El Rey",
            address: "Mercado Central 789",
          },
          driver: null,
          status: "pending",
          items: [
            { name: "Tacos de Carnitas", quantity: 3, price: 8.99 },
            { name: "Quesadilla", quantity: 1, price: 7.99 },
          ],
          total: 34.96,
          deliveryFee: 2.0,
          platformFee: 3.5,
          createdAt: "2024-01-15T12:45:00Z",
          estimatedDelivery: "2024-01-15T13:30:00Z",
          deliveryAddress: "Colonia Sur 123",
          paymentMethod: "Tarjeta de Débito",
        },
        {
          id: "5",
          orderNumber: "ORD-2024-005",
          customer: {
            name: "Carmen Díaz",
            email: "carmen.diaz@email.com",
            phone: "+1234567896",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          restaurant: {
            name: "Pasta Italiana",
            address: "Zona Rosa 654",
          },
          driver: {
            name: "Miguel Torres",
            phone: "+1234567897",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          status: "cancelled",
          items: [
            { name: "Spaghetti Carbonara", quantity: 1, price: 16.99 },
            { name: "Ensalada César", quantity: 1, price: 9.99 },
          ],
          total: 26.98,
          deliveryFee: 3.0,
          platformFee: 2.7,
          createdAt: "2024-01-15T13:20:00Z",
          estimatedDelivery: "2024-01-15T14:05:00Z",
          deliveryAddress: "Centro Histórico 987",
          paymentMethod: "Tarjeta de Crédito",
          notes: "Cliente canceló por demora",
        },
      ]

      setOrders(mockOrders)

      // Calcular estadísticas
      const newStats: OrderStats = {
        total: mockOrders.length,
        pending: mockOrders.filter((o) => o.status === "pending").length,
        inProgress: mockOrders.filter((o) => ["confirmed", "preparing", "ready", "picked_up"].includes(o.status))
          .length,
        completed: mockOrders.filter((o) => o.status === "delivered").length,
        cancelled: mockOrders.filter((o) => o.status === "cancelled").length,
        revenue: mockOrders.filter((o) => o.status === "delivered").reduce((sum, o) => sum + o.total, 0),
        avgDeliveryTime: 28.5,
        platformFees: mockOrders.filter((o) => o.status === "delivered").reduce((sum, o) => sum + o.platformFee, 0),
      }

      setStats(newStats)
      setIsLoading(false)
    }, 1000)
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedOrders(filteredOrders.map((order) => order.id))
    } else {
      setSelectedOrders([])
    }
  }

  const handleSelectOrder = (orderId: string, checked: boolean) => {
    if (checked) {
      setSelectedOrders([...selectedOrders, orderId])
    } else {
      setSelectedOrders(selectedOrders.filter((id) => id !== orderId))
    }
  }

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order)
    setShowOrderDetails(true)
    setDropdownOpen(null)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateString))
  }

  const getStatusIcon = (status: keyof typeof statusConfig) => {
    const IconComponent = statusConfig[status].icon
    return <IconComponent className="w-4 h-4" />
  }

  const getGrowthIndicator = (current: number, previous: number) => {
    if (current > previous) {
      return <TrendingUp className="w-4 h-4 text-green-600" />
    } else if (current < previous) {
      return <TrendingDown className="w-4 h-4 text-red-600" />
    }
    return <Minus className="w-4 h-4 text-gray-600" />
  }

  return (
    <div className="w-screen h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Package className="w-6 h-6 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Gestión de Pedidos</h1>
            </div>
            <div className="text-sm text-gray-500">{filteredOrders.length} pedidos encontrados</div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={loadOrders}
              disabled={isLoading}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
              <span>Actualizar</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              <Download className="w-4 h-4" />
              <span>Exportar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-6 py-4 bg-white border-b border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total</p>
                <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
              </div>
              {getGrowthIndicator(stats.total, 120)}
            </div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600">Pendientes</p>
                <p className="text-2xl font-bold text-yellow-900">{stats.pending}</p>
              </div>
              {getGrowthIndicator(stats.pending, 8)}
            </div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">En Proceso</p>
                <p className="text-2xl font-bold text-orange-900">{stats.inProgress}</p>
              </div>
              {getGrowthIndicator(stats.inProgress, 15)}
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Completados</p>
                <p className="text-2xl font-bold text-green-900">{stats.completed}</p>
              </div>
              {getGrowthIndicator(stats.completed, 85)}
            </div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">Cancelados</p>
                <p className="text-2xl font-bold text-red-900">{stats.cancelled}</p>
              </div>
              {getGrowthIndicator(stats.cancelled, 3)}
            </div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Ingresos</p>
                <p className="text-xl font-bold text-purple-900">{formatCurrency(stats.revenue)}</p>
              </div>
              {getGrowthIndicator(stats.revenue, 1200)}
            </div>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-indigo-600">Tiempo Prom.</p>
                <p className="text-xl font-bold text-indigo-900">{stats.avgDeliveryTime}min</p>
              </div>
              {getGrowthIndicator(25, stats.avgDeliveryTime)}
            </div>
          </div>
          <div className="bg-teal-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-teal-600">Comisiones</p>
                <p className="text-xl font-bold text-teal-900">{formatCurrency(stats.platformFees)}</p>
              </div>
              {getGrowthIndicator(stats.platformFees, 45)}
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 py-4 bg-white border-b border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar por número, cliente o restaurante..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-80"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos los estados</option>
              <option value="pending">Pendientes</option>
              <option value="confirmed">Confirmados</option>
              <option value="preparing">Preparando</option>
              <option value="ready">Listos</option>
              <option value="picked_up">Recogidos</option>
              <option value="delivered">Entregados</option>
              <option value="cancelled">Cancelados</option>
            </select>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="today">Hoy</option>
              <option value="week">Esta semana</option>
              <option value="month">Este mes</option>
              <option value="all">Todos</option>
            </select>
          </div>

          {selectedOrders.length > 0 && (
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600">{selectedOrders.length} seleccionados</span>
              <button className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700">Cancelar</button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                Asignar Repartidor
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Orders Table */}
      <div className="flex-1 overflow-auto">
        <div className="bg-white">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pedido
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Restaurante
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Repartidor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order.id)}
                      onChange={(e) => handleSelectOrder(order.id, e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{order.orderNumber}</div>
                      <div className="text-sm text-gray-500">{order.items.length} artículos</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        src={order.customer.avatar || "/placeholder.svg"}
                        alt={order.customer.name}
                        className="w-8 h-8 rounded-full mr-3"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{order.customer.name}</div>
                        <div className="text-sm text-gray-500">{order.customer.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{order.restaurant.name}</div>
                      <div className="text-sm text-gray-500">{order.restaurant.address}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {order.driver ? (
                      <div className="flex items-center">
                        <img
                          src={order.driver.avatar || "/placeholder.svg"}
                          alt={order.driver.name}
                          className="w-8 h-8 rounded-full mr-3"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{order.driver.name}</div>
                          <div className="text-sm text-gray-500">{order.driver.phone}</div>
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">Sin asignar</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[order.status].color}`}
                    >
                      {getStatusIcon(order.status)}
                      <span className="ml-1">{statusConfig[order.status].label}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{formatCurrency(order.total)}</div>
                      <div className="text-sm text-gray-500">+ {formatCurrency(order.deliveryFee)} envío</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm text-gray-900">{formatDate(order.createdAt)}</div>
                      <div className="text-sm text-gray-500">Est: {formatDate(order.estimatedDelivery)}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="relative">
                      <button
                        onClick={() => setDropdownOpen(dropdownOpen === order.id ? null : order.id)}
                        className="p-2 hover:bg-gray-100 rounded-full"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      {dropdownOpen === order.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                          <div className="py-1">
                            <button
                              onClick={() => handleViewOrder(order)}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              Ver Detalles
                            </button>
                            <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                              <Edit className="w-4 h-4 mr-2" />
                              Editar
                            </button>
                            <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                              <MapPin className="w-4 h-4 mr-2" />
                              Ver en Mapa
                            </button>
                            <button className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Cancelar
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Detalles del Pedido</h2>
                <button onClick={() => setShowOrderDetails(false)} className="text-gray-400 hover:text-gray-600">
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Order Info */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Número de Pedido</p>
                      <p className="text-lg font-semibold">{selectedOrder.orderNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Estado</p>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[selectedOrder.status].color}`}
                      >
                        {getStatusIcon(selectedOrder.status)}
                        <span className="ml-1">{statusConfig[selectedOrder.status].label}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Customer Info */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Cliente
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-3">
                      <img
                        src={selectedOrder.customer.avatar || "/placeholder.svg"}
                        alt={selectedOrder.customer.name}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <p className="font-semibold">{selectedOrder.customer.name}</p>
                        <p className="text-sm text-gray-600">{selectedOrder.customer.email}</p>
                        <p className="text-sm text-gray-600">{selectedOrder.customer.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="w-4 h-4 mr-2 mt-1 text-gray-400" />
                      <p className="text-sm">{selectedOrder.deliveryAddress}</p>
                    </div>
                  </div>
                </div>

                {/* Restaurant Info */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <Store className="w-5 h-5 mr-2" />
                    Restaurante
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-semibold">{selectedOrder.restaurant.name}</p>
                    <p className="text-sm text-gray-600">{selectedOrder.restaurant.address}</p>
                  </div>
                </div>

                {/* Driver Info */}
                {selectedOrder.driver && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <Truck className="w-5 h-5 mr-2" />
                      Repartidor
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center">
                        <img
                          src={selectedOrder.driver.avatar || "/placeholder.svg"}
                          alt={selectedOrder.driver.name}
                          className="w-12 h-12 rounded-full mr-4"
                        />
                        <div>
                          <p className="font-semibold">{selectedOrder.driver.name}</p>
                          <p className="text-sm text-gray-600">{selectedOrder.driver.phone}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Items */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Artículos</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                        </div>
                        <p className="font-semibold">{formatCurrency(item.price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Summary */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <DollarSign className="w-5 h-5 mr-2" />
                    Resumen de Pago
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>{formatCurrency(selectedOrder.total - selectedOrder.deliveryFee)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Costo de envío:</span>
                        <span>{formatCurrency(selectedOrder.deliveryFee)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Comisión plataforma:</span>
                        <span>{formatCurrency(selectedOrder.platformFee)}</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-semibold">
                        <span>Total:</span>
                        <span>{formatCurrency(selectedOrder.total)}</span>
                      </div>
                      <div className="text-sm text-gray-600">Método de pago: {selectedOrder.paymentMethod}</div>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Cronología
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Pedido creado:</span>
                        <span>{formatDate(selectedOrder.createdAt)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Entrega estimada:</span>
                        <span>{formatDate(selectedOrder.estimatedDelivery)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedOrder.notes && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Notas</h3>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <p className="text-sm">{selectedOrder.notes}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
                <button
                  onClick={() => setShowOrderDetails(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Cerrar
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Editar Pedido</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
