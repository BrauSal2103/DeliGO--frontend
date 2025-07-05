"use client"

import { useState, useEffect } from "react"
import {
  BarChart3,
  Users,
  DollarSign,
  Package,
  Clock,
  Star,
  Calendar,
  Download,
  RefreshCw,
  Filter,
  Eye,
  ArrowUp,
  ArrowDown,
  Minus,
  PieChart,
  Activity,
  Target,
} from "lucide-react"

interface AnalyticsData {
  overview: {
    totalRevenue: number
    totalOrders: number
    totalUsers: number
    totalRestaurants: number
    totalDrivers: number
    avgOrderValue: number
    avgDeliveryTime: number
    customerSatisfaction: number
    revenueGrowth: number
    ordersGrowth: number
    usersGrowth: number
    restaurantsGrowth: number
  }
  revenueByPeriod: Array<{
    period: string
    revenue: number
    orders: number
    growth: number
  }>
  topRestaurants: Array<{
    id: string
    name: string
    revenue: number
    orders: number
    rating: number
    growth: number
  }>
  topCustomers: Array<{
    id: string
    name: string
    totalSpent: number
    orders: number
    avgOrderValue: number
  }>
  ordersByStatus: Array<{
    status: string
    count: number
    percentage: number
    color: string
  }>
  deliveryMetrics: {
    avgDeliveryTime: number
    onTimeDeliveries: number
    lateDeliveries: number
    cancelledOrders: number
    deliveryEfficiency: number
  }
  geographicData: Array<{
    region: string
    orders: number
    revenue: number
    customers: number
    growth: number
  }>
  hourlyActivity: Array<{
    hour: number
    orders: number
    revenue: number
  }>
  paymentMethods: Array<{
    method: string
    count: number
    percentage: number
    revenue: number
  }>
}

export default function AdminAnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [selectedPeriod, setSelectedPeriod] = useState<"today" | "week" | "month" | "year">("month")
  const [selectedMetric, setSelectedMetric] = useState<"revenue" | "orders" | "users">("revenue")
  const [isLoading, setIsLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    loadAnalyticsData()
  }, [selectedPeriod])

  const loadAnalyticsData = async () => {
    setIsLoading(true)
    // Simular carga de datos
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const mockData: AnalyticsData = {
      overview: {
        totalRevenue: 284756.45,
        totalOrders: 8943,
        totalUsers: 15847,
        totalRestaurants: 342,
        totalDrivers: 1256,
        avgOrderValue: 31.84,
        avgDeliveryTime: 28.5,
        customerSatisfaction: 4.6,
        revenueGrowth: 23.4,
        ordersGrowth: 18.7,
        usersGrowth: 12.5,
        restaurantsGrowth: 8.3,
      },
      revenueByPeriod: [
        { period: "Enero", revenue: 45230.12, orders: 1420, growth: 15.2 },
        { period: "Febrero", revenue: 52340.89, orders: 1645, growth: 15.7 },
        { period: "Marzo", revenue: 48920.34, orders: 1538, growth: -6.5 },
        { period: "Abril", revenue: 61450.78, orders: 1932, growth: 25.6 },
        { period: "Mayo", revenue: 58760.23, orders: 1847, growth: -4.4 },
        { period: "Junio", revenue: 67890.45, orders: 2134, growth: 15.5 },
      ],
      topRestaurants: [
        {
          id: "1",
          name: "Pizza Palace",
          revenue: 23450.67,
          orders: 734,
          rating: 4.8,
          growth: 18.5,
        },
        {
          id: "2",
          name: "Burger House",
          revenue: 19876.23,
          orders: 623,
          rating: 4.6,
          growth: 12.3,
        },
        {
          id: "3",
          name: "Sushi Master",
          revenue: 18234.89,
          orders: 456,
          rating: 4.9,
          growth: 25.7,
        },
        {
          id: "4",
          name: "Taco Fiesta",
          revenue: 16543.21,
          orders: 589,
          rating: 4.5,
          growth: -3.2,
        },
        {
          id: "5",
          name: "Pasta Corner",
          revenue: 15678.9,
          orders: 492,
          rating: 4.7,
          growth: 8.9,
        },
      ],
      topCustomers: [
        {
          id: "1",
          name: "María González",
          totalSpent: 1245.67,
          orders: 47,
          avgOrderValue: 26.5,
        },
        {
          id: "2",
          name: "Carlos Ruiz",
          totalSpent: 987.34,
          orders: 32,
          avgOrderValue: 30.85,
        },
        {
          id: "3",
          name: "Ana López",
          totalSpent: 876.23,
          orders: 28,
          avgOrderValue: 31.29,
        },
        {
          id: "4",
          name: "Luis Martínez",
          totalSpent: 765.89,
          orders: 25,
          avgOrderValue: 30.64,
        },
        {
          id: "5",
          name: "Carmen Díaz",
          totalSpent: 654.12,
          orders: 21,
          avgOrderValue: 31.15,
        },
      ],
      ordersByStatus: [
        { status: "Entregados", count: 7234, percentage: 80.9, color: "bg-green-500" },
        { status: "Cancelados", count: 892, percentage: 10.0, color: "bg-red-500" },
        { status: "En Proceso", count: 567, percentage: 6.3, color: "bg-blue-500" },
        { status: "Pendientes", count: 250, percentage: 2.8, color: "bg-yellow-500" },
      ],
      deliveryMetrics: {
        avgDeliveryTime: 28.5,
        onTimeDeliveries: 7845,
        lateDeliveries: 892,
        cancelledOrders: 206,
        deliveryEfficiency: 89.8,
      },
      geographicData: [
        { region: "Ciudad de México", orders: 2847, revenue: 89234.56, customers: 5234, growth: 15.2 },
        { region: "Guadalajara", orders: 1923, revenue: 61789.23, customers: 3456, growth: 12.8 },
        { region: "Monterrey", orders: 1654, revenue: 52341.78, customers: 2987, growth: 18.5 },
        { region: "Puebla", orders: 1234, revenue: 38976.45, customers: 2145, growth: 9.3 },
        { region: "Tijuana", orders: 987, revenue: 31245.67, customers: 1789, growth: 22.1 },
      ],
      hourlyActivity: [
        { hour: 0, orders: 45, revenue: 1234.56 },
        { hour: 1, orders: 23, revenue: 678.9 },
        { hour: 2, orders: 12, revenue: 345.67 },
        { hour: 3, orders: 8, revenue: 234.56 },
        { hour: 4, orders: 15, revenue: 456.78 },
        { hour: 5, orders: 34, revenue: 987.65 },
        { hour: 6, orders: 67, revenue: 1876.54 },
        { hour: 7, orders: 123, revenue: 3456.78 },
        { hour: 8, orders: 189, revenue: 5234.67 },
        { hour: 9, orders: 234, revenue: 6789.12 },
        { hour: 10, orders: 267, revenue: 7654.32 },
        { hour: 11, orders: 298, revenue: 8765.43 },
        { hour: 12, orders: 345, revenue: 9876.54 },
        { hour: 13, orders: 378, revenue: 10987.65 },
        { hour: 14, orders: 298, revenue: 8765.43 },
        { hour: 15, orders: 267, revenue: 7654.32 },
        { hour: 16, orders: 234, revenue: 6789.12 },
        { hour: 17, orders: 189, revenue: 5234.67 },
        { hour: 18, orders: 298, revenue: 8765.43 },
        { hour: 19, orders: 345, revenue: 9876.54 },
        { hour: 20, orders: 378, revenue: 10987.65 },
        { hour: 21, orders: 298, revenue: 8765.43 },
        { hour: 22, orders: 189, revenue: 5234.67 },
        { hour: 23, orders: 123, revenue: 3456.78 },
      ],
      paymentMethods: [
        { method: "Tarjeta de Crédito", count: 4567, percentage: 51.1, revenue: 145678.9 },
        { method: "Efectivo", count: 2345, percentage: 26.2, revenue: 74567.89 },
        { method: "Tarjeta de Débito", count: 1234, percentage: 13.8, revenue: 39234.56 },
        { method: "PayPal", count: 567, percentage: 6.3, revenue: 18123.45 },
        { method: "Transferencia", count: 230, percentage: 2.6, revenue: 7151.65 },
      ],
    }

    setAnalyticsData(mockData)
    setIsLoading(false)
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

  const getGrowthIcon = (growth: number) => {
    if (growth > 0) return <ArrowUp className="w-4 h-4 text-green-600" />
    if (growth < 0) return <ArrowDown className="w-4 h-4 text-red-600" />
    return <Minus className="w-4 h-4 text-gray-600" />
  }

  const getGrowthColor = (growth: number) => {
    if (growth > 0) return "text-green-600"
    if (growth < 0) return "text-red-600"
    return "text-gray-600"
  }

  if (isLoading || !analyticsData) {
    return (
      <div className="w-screen h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando estadísticas...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-screen h-screen bg-gray-50 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-6 h-6 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Estadísticas Globales</h1>
            </div>
            <div className="text-sm text-gray-500">Análisis completo de la plataforma</div>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value as typeof selectedPeriod)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="today">Hoy</option>
              <option value="week">Esta Semana</option>
              <option value="month">Este Mes</option>
              <option value="year">Este Año</option>
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              <Filter className="w-4 h-4" />
              <span>Filtros</span>
            </button>
            <button
              onClick={loadAnalyticsData}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Actualizar</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              <Download className="w-4 h-4" />
              <span>Exportar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Ingresos Totales</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(analyticsData.overview.totalRevenue)}
                  </p>
                  <div className="flex items-center mt-2">
                    {getGrowthIcon(analyticsData.overview.revenueGrowth)}
                    <span
                      className={`text-sm font-medium ml-1 ${getGrowthColor(analyticsData.overview.revenueGrowth)}`}
                    >
                      {analyticsData.overview.revenueGrowth > 0 ? "+" : ""}
                      {analyticsData.overview.revenueGrowth}%
                    </span>
                    <span className="text-sm text-gray-500 ml-2">vs período anterior</span>
                  </div>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pedidos Totales</p>
                  <p className="text-2xl font-bold text-gray-900">{formatNumber(analyticsData.overview.totalOrders)}</p>
                  <div className="flex items-center mt-2">
                    {getGrowthIcon(analyticsData.overview.ordersGrowth)}
                    <span className={`text-sm font-medium ml-1 ${getGrowthColor(analyticsData.overview.ordersGrowth)}`}>
                      {analyticsData.overview.ordersGrowth > 0 ? "+" : ""}
                      {analyticsData.overview.ordersGrowth}%
                    </span>
                    <span className="text-sm text-gray-500 ml-2">vs período anterior</span>
                  </div>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Usuarios Activos</p>
                  <p className="text-2xl font-bold text-gray-900">{formatNumber(analyticsData.overview.totalUsers)}</p>
                  <div className="flex items-center mt-2">
                    {getGrowthIcon(analyticsData.overview.usersGrowth)}
                    <span className={`text-sm font-medium ml-1 ${getGrowthColor(analyticsData.overview.usersGrowth)}`}>
                      {analyticsData.overview.usersGrowth > 0 ? "+" : ""}
                      {analyticsData.overview.usersGrowth}%
                    </span>
                    <span className="text-sm text-gray-500 ml-2">vs período anterior</span>
                  </div>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Valor Promedio</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(analyticsData.overview.avgOrderValue)}
                  </p>
                  <div className="flex items-center mt-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium ml-1 text-gray-900">
                      {analyticsData.overview.customerSatisfaction}/5.0
                    </span>
                    <span className="text-sm text-gray-500 ml-2">satisfacción</span>
                  </div>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <Target className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Revenue Chart and Order Status */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow border">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Ingresos por Período</h3>
                <div className="flex items-center space-x-2">
                  <select
                    value={selectedMetric}
                    onChange={(e) => setSelectedMetric(e.target.value as typeof selectedMetric)}
                    className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="revenue">Ingresos</option>
                    <option value="orders">Pedidos</option>
                  </select>
                </div>
              </div>
              <div className="space-y-4">
                {analyticsData.revenueByPeriod.map((period, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{period.period}</p>
                        <p className="text-sm text-gray-500">{period.orders} pedidos</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{formatCurrency(period.revenue)}</p>
                      <div className="flex items-center justify-end">
                        {getGrowthIcon(period.growth)}
                        <span className={`text-sm font-medium ml-1 ${getGrowthColor(period.growth)}`}>
                          {period.growth > 0 ? "+" : ""}
                          {period.growth}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Estado de Pedidos</h3>
              <div className="space-y-4">
                {analyticsData.ordersByStatus.map((status, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">{status.status}</span>
                      <span className="text-sm font-semibold text-gray-900">{formatNumber(status.count)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${status.color}`}
                        style={{ width: `${status.percentage}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{status.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Restaurants and Customers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow border">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Top Restaurantes</h3>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  Ver todos
                </button>
              </div>
              <div className="space-y-4">
                {analyticsData.topRestaurants.map((restaurant, index) => (
                  <div key={restaurant.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-orange-600">#{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{restaurant.name}</p>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <span>{restaurant.orders} pedidos</span>
                          <span>•</span>
                          <div className="flex items-center">
                            <Star className="w-3 h-3 text-yellow-400 mr-1" />
                            <span>{restaurant.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{formatCurrency(restaurant.revenue)}</p>
                      <div className="flex items-center justify-end">
                        {getGrowthIcon(restaurant.growth)}
                        <span className={`text-sm font-medium ml-1 ${getGrowthColor(restaurant.growth)}`}>
                          {restaurant.growth > 0 ? "+" : ""}
                          {restaurant.growth}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Top Clientes</h3>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  Ver todos
                </button>
              </div>
              <div className="space-y-4">
                {analyticsData.topCustomers.map((customer, index) => (
                  <div key={customer.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{customer.name}</p>
                        <p className="text-sm text-gray-500">{customer.orders} pedidos</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{formatCurrency(customer.totalSpent)}</p>
                      <p className="text-sm text-gray-500">{formatCurrency(customer.avgOrderValue)} promedio</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Delivery Metrics and Geographic Data */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow border">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                Métricas de Entrega
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{analyticsData.deliveryMetrics.avgDeliveryTime}</p>
                  <p className="text-sm text-gray-600">min promedio</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">
                    {analyticsData.deliveryMetrics.deliveryEfficiency}%
                  </p>
                  <p className="text-sm text-gray-600">eficiencia</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600">
                    {formatNumber(analyticsData.deliveryMetrics.onTimeDeliveries)}
                  </p>
                  <p className="text-sm text-gray-600">a tiempo</p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <p className="text-2xl font-bold text-red-600">
                    {formatNumber(analyticsData.deliveryMetrics.lateDeliveries)}
                  </p>
                  <p className="text-sm text-gray-600">tardías</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Datos Geográficos</h3>
              <div className="space-y-3">
                {analyticsData.geographicData.map((region, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{region.region}</p>
                      <p className="text-sm text-gray-500">{formatNumber(region.customers)} clientes</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{formatCurrency(region.revenue)}</p>
                      <div className="flex items-center justify-end">
                        {getGrowthIcon(region.growth)}
                        <span className={`text-sm font-medium ml-1 ${getGrowthColor(region.growth)}`}>
                          {region.growth > 0 ? "+" : ""}
                          {region.growth}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hourly Activity and Payment Methods */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow border">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-purple-600" />
                Actividad por Hora
              </h3>
              <div className="space-y-2">
                {analyticsData.hourlyActivity
                  .filter((_, index) => index % 2 === 0) // Mostrar solo horas pares para mejor visualización
                  .map((hour) => (
                    <div key={hour.hour} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-gray-600 w-12">
                          {hour.hour.toString().padStart(2, "0")}:00
                        </span>
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-purple-500 h-2 rounded-full"
                            style={{ width: `${(hour.orders / 400) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{hour.orders} pedidos</p>
                        <p className="text-xs text-gray-500">{formatCurrency(hour.revenue)}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <PieChart className="w-5 h-5 mr-2 text-indigo-600" />
                Métodos de Pago
              </h3>
              <div className="space-y-4">
                {analyticsData.paymentMethods.map((method, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">{method.method}</span>
                      <div className="text-right">
                        <span className="text-sm font-semibold text-gray-900">{formatNumber(method.count)}</span>
                        <span className="text-xs text-gray-500 ml-2">({method.percentage}%)</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${method.percentage}%` }}></div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-500">{formatCurrency(method.revenue)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
