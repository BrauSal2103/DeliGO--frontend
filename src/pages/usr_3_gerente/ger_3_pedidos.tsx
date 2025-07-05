"use client"

import { useState } from "react"
import {
  Clock,
  Package,
  User,
  Phone,
  MapPin,
  DollarSign,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  AlertCircle,
  MoreVertical,
  Eye,
  Printer,
  MessageSquare,
  RefreshCw,
  Bell,
} from "lucide-react"

interface Order {
  id: string
  customerName: string
  customerPhone: string
  customerAddress: string
  items: Array<{
    name: string
    quantity: number
    price: number
    notes?: string
  }>
  total: number
  status: "pending" | "confirmed" | "preparing" | "ready" | "delivered" | "cancelled"
  priority: "normal" | "high" | "urgent"
  orderTime: string
  estimatedTime: number
  paymentMethod: string
  notes?: string
}

export default function OrdersManagement() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-001",
      customerName: "María González",
      customerPhone: "+1 234-567-8901",
      customerAddress: "Av. Principal 123, Col. Centro",
      items: [
        { name: "Pizza Margherita Grande", quantity: 1, price: 18.99 },
        { name: "Coca Cola 500ml", quantity: 2, price: 2.5 },
        { name: "Alitas BBQ (12 pzs)", quantity: 1, price: 12.99 },
      ],
      total: 34.48,
      status: "pending",
      priority: "urgent",
      orderTime: "14:25",
      estimatedTime: 25,
      paymentMethod: "Tarjeta de Crédito",
      notes: "Sin cebolla en la pizza, por favor",
    },
    {
      id: "ORD-002",
      customerName: "Carlos Rodríguez",
      customerPhone: "+1 234-567-8902",
      customerAddress: "Calle Secundaria 456, Col. Norte",
      items: [
        { name: "Hamburguesa Clásica", quantity: 2, price: 12.99 },
        { name: "Papas Fritas Grandes", quantity: 1, price: 4.99 },
        { name: "Malteada de Chocolate", quantity: 1, price: 5.99 },
      ],
      total: 36.96,
      status: "confirmed",
      priority: "high",
      orderTime: "14:18",
      estimatedTime: 18,
      paymentMethod: "Efectivo",
    },
    {
      id: "ORD-003",
      customerName: "Ana Martínez",
      customerPhone: "+1 234-567-8903",
      customerAddress: "Blvd. Sur 789, Col. Residencial",
      items: [
        { name: "Pasta Alfredo", quantity: 1, price: 15.99 },
        { name: "Ensalada César", quantity: 1, price: 8.99 },
        { name: "Agua Natural", quantity: 1, price: 1.5 },
      ],
      total: 26.48,
      status: "preparing",
      priority: "normal",
      orderTime: "14:10",
      estimatedTime: 12,
      paymentMethod: "Transferencia",
    },
    {
      id: "ORD-004",
      customerName: "Luis Hernández",
      customerPhone: "+1 234-567-8904",
      customerAddress: "Av. Oriente 321, Col. Industrial",
      items: [
        { name: "Pizza Pepperoni Mediana", quantity: 1, price: 16.99 },
        { name: "Refresco 600ml", quantity: 1, price: 2.99 },
      ],
      total: 19.98,
      status: "ready",
      priority: "normal",
      orderTime: "13:55",
      estimatedTime: 5,
      paymentMethod: "Tarjeta de Débito",
    },
    {
      id: "ORD-005",
      customerName: "Sofia López",
      customerPhone: "+1 234-567-8905",
      customerAddress: "Calle Poniente 654, Col. Moderna",
      items: [
        { name: "Tacos de Pollo (4 pzs)", quantity: 1, price: 9.99 },
        { name: "Guacamole", quantity: 1, price: 3.99 },
        { name: "Horchata", quantity: 1, price: 3.5 },
      ],
      total: 17.48,
      status: "delivered",
      priority: "normal",
      orderTime: "13:40",
      estimatedTime: 0,
      paymentMethod: "Efectivo",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showOrderDetails, setShowOrderDetails] = useState(false)
  const [showContextMenu, setShowContextMenu] = useState<string | null>(null)

  // Filtrar pedidos
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    const matchesPriority = priorityFilter === "all" || order.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  // Actualizar estado del pedido
  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
    setShowContextMenu(null)
  }

  // Obtener color del estado
  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "confirmed":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "preparing":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "ready":
        return "bg-green-100 text-green-800 border-green-200"
      case "delivered":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  // Obtener color de prioridad
  const getPriorityColor = (priority: Order["priority"]) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "normal":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  // Obtener texto del estado
  const getStatusText = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "Pendiente"
      case "confirmed":
        return "Confirmado"
      case "preparing":
        return "Preparando"
      case "ready":
        return "Listo"
      case "delivered":
        return "Entregado"
      case "cancelled":
        return "Cancelado"
      default:
        return status
    }
  }

  // Obtener texto de prioridad
  const getPriorityText = (priority: Order["priority"]) => {
    switch (priority) {
      case "urgent":
        return "Urgente"
      case "high":
        return "Alta"
      case "normal":
        return "Normal"
      default:
        return priority
    }
  }

  // Contar pedidos por estado
  const getStatusCount = (status: string) => {
    if (status === "all") return orders.length
    return orders.filter((order) => order.status === status).length
  }

  return (
    <div className="w-screen h-screen bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Package className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gestión de Pedidos</h1>
              <p className="text-gray-600">Administra los pedidos entrantes en tiempo real</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <RefreshCw className="h-4 w-4" />
              <span>Actualizar</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Bell className="h-4 w-4" />
              <span>Notificaciones</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filtros y Búsqueda */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Búsqueda */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por cliente o ID de pedido..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Filtros */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filtros:</span>
            </div>

            {/* Filtro por Estado */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="all">Todos ({getStatusCount("all")})</option>
              <option value="pending">Pendientes ({getStatusCount("pending")})</option>
              <option value="confirmed">Confirmados ({getStatusCount("confirmed")})</option>
              <option value="preparing">Preparando ({getStatusCount("preparing")})</option>
              <option value="ready">Listos ({getStatusCount("ready")})</option>
              <option value="delivered">Entregados ({getStatusCount("delivered")})</option>
            </select>

            {/* Filtro por Prioridad */}
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="all">Todas las prioridades</option>
              <option value="urgent">Urgente</option>
              <option value="high">Alta</option>
              <option value="normal">Normal</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de Pedidos */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  {/* Información Principal */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`w-3 h-3 rounded-full ${getPriorityColor(order.priority)}`}></div>
                      <h3 className="text-lg font-semibold text-gray-900">#{order.id}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}
                      >
                        {getStatusText(order.status)}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                        {getPriorityText(order.priority)}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                      {/* Cliente */}
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="font-medium text-gray-900">{order.customerName}</p>
                          <p className="text-sm text-gray-600">{order.customerPhone}</p>
                        </div>
                      </div>

                      {/* Dirección */}
                      <div className="flex items-start space-x-2">
                        <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                        <p className="text-sm text-gray-600">{order.customerAddress}</p>
                      </div>

                      {/* Tiempo y Total */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{order.orderTime}</span>
                          {order.estimatedTime > 0 && (
                            <span className="text-sm font-medium text-orange-600">({order.estimatedTime} min)</span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <span className="text-lg font-bold text-green-600">${order.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Items del Pedido */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Productos:</h4>
                      <div className="space-y-1">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-center text-sm">
                            <span className="text-gray-600">
                              {item.quantity}x {item.name}
                              {item.notes && <span className="text-orange-600 ml-2">({item.notes})</span>}
                            </span>
                            <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Notas */}
                    {order.notes && (
                      <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-start space-x-2">
                          <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-yellow-800">Notas especiales:</p>
                            <p className="text-sm text-yellow-700">{order.notes}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Método de Pago */}
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>Pago:</span>
                      <span className="font-medium">{order.paymentMethod}</span>
                    </div>
                  </div>

                  {/* Acciones */}
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => {
                        setSelectedOrder(order)
                        setShowOrderDetails(true)
                      }}
                      className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Ver detalles"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Imprimir"
                    >
                      <Printer className="h-4 w-4" />
                    </button>
                    <button
                      className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                      title="Contactar cliente"
                    >
                      <MessageSquare className="h-4 w-4" />
                    </button>
                    <div className="relative">
                      <button
                        onClick={() => setShowContextMenu(showContextMenu === order.id ? null : order.id)}
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>

                      {/* Menú Contextual */}
                      {showContextMenu === order.id && (
                        <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                          <div className="py-1">
                            {order.status === "pending" && (
                              <button
                                onClick={() => updateOrderStatus(order.id, "confirmed")}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                              >
                                <CheckCircle className="inline h-4 w-4 mr-2" />
                                Confirmar Pedido
                              </button>
                            )}
                            {order.status === "confirmed" && (
                              <button
                                onClick={() => updateOrderStatus(order.id, "preparing")}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                              >
                                <Clock className="inline h-4 w-4 mr-2" />
                                Marcar Preparando
                              </button>
                            )}
                            {order.status === "preparing" && (
                              <button
                                onClick={() => updateOrderStatus(order.id, "ready")}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
                              >
                                <CheckCircle className="inline h-4 w-4 mr-2" />
                                Marcar Listo
                              </button>
                            )}
                            {order.status === "ready" && (
                              <button
                                onClick={() => updateOrderStatus(order.id, "delivered")}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-600"
                              >
                                <Package className="inline h-4 w-4 mr-2" />
                                Marcar Entregado
                              </button>
                            )}
                            {order.status !== "delivered" && order.status !== "cancelled" && (
                              <button
                                onClick={() => updateOrderStatus(order.id, "cancelled")}
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                              >
                                <XCircle className="inline h-4 w-4 mr-2" />
                                Cancelar Pedido
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay pedidos</h3>
            <p className="text-gray-600">No se encontraron pedidos que coincidan con los filtros seleccionados.</p>
          </div>
        )}
      </div>

      {/* Modal de Detalles del Pedido */}
      {showOrderDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Detalles del Pedido #{selectedOrder.id}</h2>
                <button
                  onClick={() => setShowOrderDetails(false)}
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-lg"
                >
                  <XCircle className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Estado y Prioridad */}
                <div className="flex items-center space-x-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedOrder.status)}`}
                  >
                    {getStatusText(selectedOrder.status)}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm font-medium">
                    Prioridad: {getPriorityText(selectedOrder.priority)}
                  </span>
                </div>

                {/* Información del Cliente */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-3">Información del Cliente</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span>{selectedOrder.customerName}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>{selectedOrder.customerPhone}</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                      <span>{selectedOrder.customerAddress}</span>
                    </div>
                  </div>
                </div>

                {/* Productos */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Productos Pedidos</h3>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-start p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                          {item.notes && <p className="text-sm text-orange-600 mt-1">Nota: {item.notes}</p>}
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                          <p className="text-sm text-gray-600">${item.price.toFixed(2)} c/u</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Resumen de Pago */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Total del Pedido:</span>
                    <span className="text-xl font-bold text-green-600">${selectedOrder.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>Método de Pago:</span>
                    <span>{selectedOrder.paymentMethod}</span>
                  </div>
                </div>

                {/* Notas Especiales */}
                {selectedOrder.notes && (
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <h3 className="font-medium text-yellow-800 mb-2">Notas Especiales:</h3>
                    <p className="text-yellow-700">{selectedOrder.notes}</p>
                  </div>
                )}

                {/* Información de Tiempo */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-blue-900">Hora del Pedido:</p>
                      <p className="text-blue-700">{selectedOrder.orderTime}</p>
                    </div>
                    {selectedOrder.estimatedTime > 0 && (
                      <div className="text-right">
                        <p className="font-medium text-blue-900">Tiempo Estimado:</p>
                        <p className="text-blue-700">{selectedOrder.estimatedTime} minutos</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowOrderDetails(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cerrar
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <Printer className="inline h-4 w-4 mr-2" />
                  Imprimir
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <MessageSquare className="inline h-4 w-4 mr-2" />
                  Contactar Cliente
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
