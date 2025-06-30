"use client"

import { useState } from "react"
import {
  Store,
  DollarSign,
  ShoppingBag,
  Users,
  Clock,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Settings,
  Bell,
  MoreVertical,
  Calendar,
  ChevronDown,
} from "lucide-react"

export default function ManagerDashboard() {
  const [restaurantOpen, setRestaurantOpen] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState("today")
  const [showNotifications, setShowNotifications] = useState(false)
  const [showPeriodMenu, setShowPeriodMenu] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  // Datos simulados
  const todayStats = {
    revenue: 2847.5,
    orders: 47,
    customers: 42,
    avgOrderValue: 60.59,
    completionRate: 94.7,
    preparationTime: 18.5,
  }

  const weekStats = {
    revenue: 18234.8,
    orders: 312,
    customers: 287,
    avgOrderValue: 58.44,
    completionRate: 92.3,
    preparationTime: 19.2,
  }

  const monthStats = {
    revenue: 76543.2,
    orders: 1284,
    customers: 1156,
    avgOrderValue: 59.61,
    completionRate: 93.8,
    preparationTime: 18.8,
  }

  const currentStats = selectedPeriod === "today" ? todayStats : selectedPeriod === "week" ? weekStats : monthStats

  const recentOrders = [
    {
      id: "#ORD-2024-001",
      customer: "María González",
      items: 3,
      total: 89.5,
      status: "preparing",
      time: "5 min",
      priority: "normal",
    },
    {
      id: "#ORD-2024-002",
      customer: "Carlos Ruiz",
      items: 2,
      total: 45.0,
      status: "ready",
      time: "12 min",
      priority: "high",
    },
    {
      id: "#ORD-2024-003",
      customer: "Ana López",
      items: 4,
      total: 127.8,
      status: "delivered",
      time: "25 min",
      priority: "normal",
    },
    {
      id: "#ORD-2024-004",
      customer: "Pedro Martín",
      items: 1,
      total: 32.5,
      status: "pending",
      time: "2 min",
      priority: "urgent",
    },
  ]

  const weeklyData = [
    { day: "Lun", revenue: 2340, orders: 38 },
    { day: "Mar", revenue: 2680, orders: 42 },
    { day: "Mié", revenue: 2890, orders: 47 },
    { day: "Jue", revenue: 2456, orders: 39 },
    { day: "Vie", revenue: 3240, orders: 52 },
    { day: "Sáb", revenue: 3890, orders: 61 },
    { day: "Dom", revenue: 2738, orders: 43 },
  ]

  const topProducts = [
    { name: "Pizza Margherita", sales: 23, revenue: 1265.0 },
    { name: "Hamburguesa Clásica", sales: 18, revenue: 954.0 },
    { name: "Pasta Carbonara", sales: 15, revenue: 825.0 },
    { name: "Ensalada César", sales: 12, revenue: 480.0 },
    { name: "Tacos al Pastor", sales: 11, revenue: 385.0 },
  ]

  const alerts = [
    {
      type: "warning",
      message: "Stock bajo: Queso Mozzarella (5 unidades)",
      time: "10 min",
    },
    {
      type: "info",
      message: "Nuevo pedido de cliente VIP",
      time: "15 min",
    },
    {
      type: "error",
      message: "Retraso en entrega #ORD-2024-001",
      time: "20 min",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500"
      case "preparing":
        return "bg-blue-500"
      case "ready":
        return "bg-green-500"
      case "delivered":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pendiente"
      case "preparing":
        return "Preparando"
      case "ready":
        return "Listo"
      case "delivered":
        return "Entregado"
      default:
        return status
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "text-red-600 bg-red-50 border-red-200"
      case "high":
        return "text-orange-600 bg-orange-50 border-orange-200"
      case "normal":
        return "text-green-600 bg-green-50 border-green-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getPriorityText = (priority: string) => {
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

  const getPeriodText = (period: string) => {
    switch (period) {
      case "today":
        return "Hoy"
      case "week":
        return "Esta semana"
      case "month":
        return "Este mes"
      default:
        return period
    }
  }

  return (
    <div className="w-screen h-screen bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 bg-orange-500 rounded-full flex items-center justify-center">
              <Store className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Panel de Control</h1>
              <p className="text-sm text-gray-500">Restaurante "La Bella Vista"</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Estado del restaurante */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">{restaurantOpen ? "Abierto" : "Cerrado"}</span>
              <button
                onClick={() => setRestaurantOpen(!restaurantOpen)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  restaurantOpen ? "bg-green-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    restaurantOpen ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <div className={`w-2 h-2 rounded-full ${restaurantOpen ? "bg-green-500" : "bg-red-500"}`} />
            </div>

            {/* Selector de período */}
            <div className="relative">
              <button
                onClick={() => setShowPeriodMenu(!showPeriodMenu)}
                className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50"
              >
                <Calendar className="h-4 w-4" />
                <span className="text-sm">{getPeriodText(selectedPeriod)}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {showPeriodMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  <button
                    onClick={() => {
                      setSelectedPeriod("today")
                      setShowPeriodMenu(false)
                    }}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                  >
                    Hoy
                  </button>
                  <button
                    onClick={() => {
                      setSelectedPeriod("week")
                      setShowPeriodMenu(false)
                    }}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                  >
                    Esta semana
                  </button>
                  <button
                    onClick={() => {
                      setSelectedPeriod("month")
                      setShowPeriodMenu(false)
                    }}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                  >
                    Este mes
                  </button>
                </div>
              )}
            </div>

            {/* Notificaciones */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50"
              >
                <Bell className="h-4 w-4" />
                {alerts.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {alerts.length}
                  </span>
                )}
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold">Notificaciones</h3>
                    <p className="text-sm text-gray-500">Alertas y notificaciones importantes</p>
                  </div>
                  <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
                    {alerts.map((alert, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                        <AlertTriangle
                          className={`h-5 w-5 mt-0.5 ${
                            alert.type === "error"
                              ? "text-red-500"
                              : alert.type === "warning"
                                ? "text-yellow-500"
                                : "text-blue-500"
                          }`}
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                          <p className="text-xs text-gray-500">Hace {alert.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button className="p-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50">
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-6">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: "overview", label: "Resumen" },
                { id: "analytics", label: "Análisis" },
                { id: "orders", label: "Pedidos" },
                { id: "products", label: "Productos" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-orange-500 text-orange-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Cards de estadísticas principales */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Ingresos</p>
                      <p className="text-2xl font-bold text-gray-900">${currentStats.revenue.toLocaleString()}</p>
                      <p className="text-xs text-green-600 flex items-center mt-1">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +12.5% vs período anterior
                      </p>
                    </div>
                    <DollarSign className="h-8 w-8 text-gray-400" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Pedidos</p>
                      <p className="text-2xl font-bold text-gray-900">{currentStats.orders}</p>
                      <p className="text-xs text-green-600 flex items-center mt-1">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +8.2% vs período anterior
                      </p>
                    </div>
                    <ShoppingBag className="h-8 w-8 text-gray-400" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Clientes</p>
                      <p className="text-2xl font-bold text-gray-900">{currentStats.customers}</p>
                      <p className="text-xs text-green-600 flex items-center mt-1">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +15.3% vs período anterior
                      </p>
                    </div>
                    <Users className="h-8 w-8 text-gray-400" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Tiempo Promedio</p>
                      <p className="text-2xl font-bold text-gray-900">{currentStats.preparationTime} min</p>
                      <p className="text-xs text-green-600 flex items-center mt-1">
                        <TrendingDown className="h-3 w-3 mr-1" />
                        -2.1 min vs período anterior
                      </p>
                    </div>
                    <Clock className="h-8 w-8 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Métricas adicionales */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow border">
                  <h3 className="text-lg font-semibold mb-4">Rendimiento</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Tasa de Completado</span>
                        <span className="font-medium">{currentStats.completionRate}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${currentStats.completionRate}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Valor Promedio por Pedido</span>
                        <span className="font-medium">${currentStats.avgOrderValue}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: "75%" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Satisfacción del Cliente</span>
                        <span className="font-medium">4.8/5</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "96%" }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow border">
                  <h3 className="text-lg font-semibold mb-4">Pedidos Recientes</h3>
                  <div className="space-y-3">
                    {recentOrders.slice(0, 4).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(order.status)}`} />
                          <div>
                            <p className="text-sm font-medium">{order.id}</p>
                            <p className="text-xs text-gray-500">{order.customer}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">${order.total}</p>
                          <p className="text-xs text-gray-500">{order.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="space-y-6">
              {/* Gráfico de ventas semanales */}
              <div className="bg-white p-6 rounded-lg shadow border">
                <h3 className="text-lg font-semibold mb-4">Ventas de la Semana</h3>
                <div className="space-y-4">
                  {weeklyData.map((day, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-12 text-sm font-medium">{day.day}</div>
                      <div className="flex-1">
                        <div className="flex justify-between text-sm mb-1">
                          <span>${day.revenue}</span>
                          <span>{day.orders} pedidos</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-orange-500 h-2 rounded-full"
                            style={{ width: `${(day.revenue / 4000) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Productos más vendidos */}
              <div className="bg-white p-6 rounded-lg shadow border">
                <h3 className="text-lg font-semibold mb-4">Productos Más Vendidos</h3>
                <div className="space-y-3">
                  {topProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-orange-600">#{index + 1}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.sales} vendidos</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">${product.revenue}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow border">
                <h3 className="text-lg font-semibold mb-4">Gestión de Pedidos</h3>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center space-x-4">
                        <div className={`w-4 h-4 rounded-full ${getStatusColor(order.status)}`} />
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-gray-500">{order.customer}</p>
                        </div>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(order.priority)}`}
                        >
                          {getPriorityText(order.priority)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-medium">${order.total}</p>
                          <p className="text-sm text-gray-500">{order.items} productos</p>
                        </div>
                        <span className="px-2 py-1 text-xs font-medium border rounded-full bg-gray-50">
                          {getStatusText(order.status)}
                        </span>
                        <div className="relative">
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "products" && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow border">
                <h3 className="text-lg font-semibold mb-4">Análisis de Productos</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Rendimiento por Categoría</h4>
                    {[
                      { category: "Pizzas", sales: 45, revenue: 2340 },
                      { category: "Hamburguesas", sales: 32, revenue: 1680 },
                      { category: "Pastas", sales: 28, revenue: 1540 },
                      { category: "Ensaladas", sales: 18, revenue: 720 },
                      { category: "Bebidas", sales: 67, revenue: 335 },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                        <div>
                          <p className="font-medium">{item.category}</p>
                          <p className="text-sm text-gray-500">{item.sales} vendidos</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${item.revenue}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Productos con Stock Bajo</h4>
                    {[
                      { name: "Queso Mozzarella", stock: 5, min: 20 },
                      { name: "Tomate Cherry", stock: 8, min: 15 },
                      { name: "Aceite de Oliva", stock: 3, min: 10 },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg bg-red-50 border border-red-200"
                      >
                        <div>
                          <p className="font-medium text-red-900">{item.name}</p>
                          <p className="text-sm text-red-600">
                            Stock: {item.stock} (Mín: {item.min})
                          </p>
                        </div>
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
