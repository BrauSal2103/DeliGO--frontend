"use client"

import { useState } from "react"
import {
  BarChart3,
  Users,
  Store,
  Truck,
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  Activity,
  Shield,
  Settings,
  Bell,
  RefreshCw,
} from "lucide-react"

interface PlatformStats {
  totalUsers: number
  totalRestaurants: number
  totalDrivers: number
  totalOrders: number
  totalRevenue: number
  activeOrders: number
  completedToday: number
  averageDeliveryTime: number
  platformFee: number
  userGrowth: number
  restaurantGrowth: number
  driverGrowth: number
  revenueGrowth: number
}

interface SystemHealth {
  status: "healthy" | "warning" | "critical"
  uptime: number
  responseTime: number
  errorRate: number
  activeConnections: number
}

interface RecentActivity {
  id: string
  type: "user_registration" | "restaurant_signup" | "driver_signup" | "order_completed" | "payment_processed"
  description: string
  timestamp: string
  amount?: number
}

export default function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("today")
  const [showNotifications, setShowNotifications] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const platformStats: PlatformStats = {
    totalUsers: 15847,
    totalRestaurants: 342,
    totalDrivers: 1256,
    totalOrders: 89432,
    totalRevenue: 2847563.45,
    activeOrders: 127,
    completedToday: 1834,
    averageDeliveryTime: 28.5,
    platformFee: 142378.17,
    userGrowth: 12.5,
    restaurantGrowth: 8.3,
    driverGrowth: 15.7,
    revenueGrowth: 23.4,
  }

  const systemHealth: SystemHealth = {
    status: "healthy",
    uptime: 99.97,
    responseTime: 245,
    errorRate: 0.02,
    activeConnections: 3847,
  }

  const recentActivity: RecentActivity[] = [
    {
      id: "1",
      type: "user_registration",
      description: "Nuevo usuario registrado: María González",
      timestamp: "2024-01-15T14:30:00Z",
    },
    {
      id: "2",
      type: "restaurant_signup",
      description: "Nuevo restaurante: Pizza Palace",
      timestamp: "2024-01-15T14:25:00Z",
    },
    {
      id: "3",
      type: "order_completed",
      description: "Pedido #12345 completado exitosamente",
      timestamp: "2024-01-15T14:20:00Z",
      amount: 45.67,
    },
    {
      id: "4",
      type: "payment_processed",
      description: "Pago procesado para restaurante Don Mario",
      timestamp: "2024-01-15T14:15:00Z",
      amount: 1250.0,
    },
    {
      id: "5",
      type: "driver_signup",
      description: "Nuevo repartidor: Carlos Rodríguez",
      timestamp: "2024-01-15T14:10:00Z",
    },
  ]

  const topRestaurants = [
    { name: "Pizza Palace", orders: 234, revenue: 12450.0, rating: 4.8 },
    { name: "Burger King", orders: 198, revenue: 9876.0, rating: 4.6 },
    { name: "Sushi Zen", orders: 156, revenue: 15678.0, rating: 4.9 },
    { name: "Taco Loco", orders: 145, revenue: 7890.0, rating: 4.5 },
    { name: "Pasta House", orders: 132, revenue: 8765.0, rating: 4.7 },
  ]

  const alerts = [
    {
      id: "1",
      type: "warning",
      message: "Alto volumen de pedidos en zona centro",
      timestamp: "Hace 5 min",
    },
    {
      id: "2",
      type: "info",
      message: "Nuevo restaurante pendiente de aprobación",
      timestamp: "Hace 15 min",
    },
    {
      id: "3",
      type: "error",
      message: "Falla en el sistema de pagos reportada",
      timestamp: "Hace 30 min",
    },
  ]

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 2000)
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "user_registration":
        return <Users className="w-4 h-4 text-blue-600" />
      case "restaurant_signup":
        return <Store className="w-4 h-4 text-green-600" />
      case "driver_signup":
        return <Truck className="w-4 h-4 text-purple-600" />
      case "order_completed":
        return <CheckCircle className="w-4 h-4 text-emerald-600" />
      case "payment_processed":
        return <DollarSign className="w-4 h-4 text-yellow-600" />
      default:
        return <Activity className="w-4 h-4 text-gray-600" />
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("es-ES").format(num)
  }

  const getGrowthColor = (growth: number) => {
    return growth >= 0 ? "text-green-600" : "text-red-600"
  }

  const getGrowthIcon = (growth: number) => {
    return growth >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />
  }

  return (
    <div className="w-screen h-screen bg-gray-50 overflow-hidden">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Administrativo</h1>
                <p className="text-gray-600">Panel de control general de la plataforma</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="today">Hoy</option>
                <option value="week">Esta semana</option>
                <option value="month">Este mes</option>
                <option value="year">Este año</option>
              </select>
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Bell className="w-4 h-4" />
                  {alerts.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {alerts.length}
                    </span>
                  )}
                </button>
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="text-lg font-semibold">Alertas del Sistema</h3>
                    </div>
                    <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
                      {alerts.map((alert) => (
                        <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                          <AlertTriangle
                            className={`w-5 h-5 mt-0.5 ${
                              alert.type === "error"
                                ? "text-red-500"
                                : alert.type === "warning"
                                  ? "text-yellow-500"
                                  : "text-blue-500"
                            }`}
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                            <p className="text-xs text-gray-500">{alert.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Usuarios Totales</p>
                    <p className="text-2xl font-bold text-gray-900">{formatNumber(platformStats.totalUsers)}</p>
                    <p className={`text-xs flex items-center mt-1 ${getGrowthColor(platformStats.userGrowth)}`}>
                      {getGrowthIcon(platformStats.userGrowth)}
                      <span className="ml-1">+{platformStats.userGrowth}% vs mes anterior</span>
                    </p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Restaurantes</p>
                    <p className="text-2xl font-bold text-gray-900">{formatNumber(platformStats.totalRestaurants)}</p>
                    <p className={`text-xs flex items-center mt-1 ${getGrowthColor(platformStats.restaurantGrowth)}`}>
                      {getGrowthIcon(platformStats.restaurantGrowth)}
                      <span className="ml-1">+{platformStats.restaurantGrowth}% vs mes anterior</span>
                    </p>
                  </div>
                  <Store className="h-8 w-8 text-green-600" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Repartidores</p>
                    <p className="text-2xl font-bold text-gray-900">{formatNumber(platformStats.totalDrivers)}</p>
                    <p className={`text-xs flex items-center mt-1 ${getGrowthColor(platformStats.driverGrowth)}`}>
                      {getGrowthIcon(platformStats.driverGrowth)}
                      <span className="ml-1">+{platformStats.driverGrowth}% vs mes anterior</span>
                    </p>
                  </div>
                  <Truck className="h-8 w-8 text-purple-600" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Ingresos Totales</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(platformStats.totalRevenue)}</p>
                    <p className={`text-xs flex items-center mt-1 ${getGrowthColor(platformStats.revenueGrowth)}`}>
                      {getGrowthIcon(platformStats.revenueGrowth)}
                      <span className="ml-1">+{platformStats.revenueGrowth}% vs mes anterior</span>
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-yellow-600" />
                </div>
              </div>
            </div>

            {/* System Health & Real-time Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow border">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-green-600" />
                  Estado del Sistema
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Estado General</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        systemHealth.status === "healthy"
                          ? "bg-green-100 text-green-800"
                          : systemHealth.status === "warning"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {systemHealth.status === "healthy"
                        ? "Saludable"
                        : systemHealth.status === "warning"
                          ? "Advertencia"
                          : "Crítico"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Tiempo de Actividad</span>
                    <span className="font-medium">{systemHealth.uptime}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Tiempo de Respuesta</span>
                    <span className="font-medium">{systemHealth.responseTime}ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Tasa de Error</span>
                    <span className="font-medium">{systemHealth.errorRate}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Conexiones Activas</span>
                    <span className="font-medium">{formatNumber(systemHealth.activeConnections)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow border">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-blue-600" />
                  Estadísticas en Tiempo Real
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Pedidos Activos</span>
                    <span className="font-medium text-blue-600">{formatNumber(platformStats.activeOrders)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Completados Hoy</span>
                    <span className="font-medium text-green-600">{formatNumber(platformStats.completedToday)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Tiempo Promedio de Entrega</span>
                    <span className="font-medium">{platformStats.averageDeliveryTime} min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Comisión de Plataforma</span>
                    <span className="font-medium text-yellow-600">{formatCurrency(platformStats.platformFee)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Pedidos Totales</span>
                    <span className="font-medium">{formatNumber(platformStats.totalOrders)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Restaurants & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow border">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Store className="w-5 h-5 mr-2 text-green-600" />
                  Top Restaurantes
                </h3>
                <div className="space-y-3">
                  {topRestaurants.map((restaurant, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-green-600">#{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{restaurant.name}</p>
                          <p className="text-sm text-gray-500">{restaurant.orders} pedidos</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{formatCurrency(restaurant.revenue)}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <span className="mr-1">★</span>
                          <span>{restaurant.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow border">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-blue-600" />
                  Actividad Reciente
                </h3>
                <div className="space-y-3">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                      <div className="flex-shrink-0 mt-0.5">{getActivityIcon(activity.type)}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-xs text-gray-500">
                            {new Date(activity.timestamp).toLocaleString("es-ES")}
                          </p>
                          {activity.amount && (
                            <span className="text-xs font-medium text-green-600">
                              {formatCurrency(activity.amount)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-lg shadow border">
              <h3 className="text-lg font-semibold mb-4">Acciones Rápidas</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Users className="w-6 h-6 text-blue-600 mb-2" />
                  <span className="text-sm font-medium">Gestionar Usuarios</span>
                </button>
                <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Store className="w-6 h-6 text-green-600 mb-2" />
                  <span className="text-sm font-medium">Restaurantes</span>
                </button>
                <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Truck className="w-6 h-6 text-purple-600 mb-2" />
                  <span className="text-sm font-medium">Repartidores</span>
                </button>
                <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <BarChart3 className="w-6 h-6 text-yellow-600 mb-2" />
                  <span className="text-sm font-medium">Estadísticas</span>
                </button>
                <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <MapPin className="w-6 h-6 text-red-600 mb-2" />
                  <span className="text-sm font-medium">Mapa en Vivo</span>
                </button>
                <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Settings className="w-6 h-6 text-gray-600 mb-2" />
                  <span className="text-sm font-medium">Configuración</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
