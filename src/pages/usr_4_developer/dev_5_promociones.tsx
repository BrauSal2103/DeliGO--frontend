"use client"
import { useState } from "react"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Users,
  Star,
  Download,
  RefreshCw,
  MapPin,
  Clock,
  CreditCard,
} from "lucide-react"

interface AnalyticsData {
  totalRevenue: number
  totalOrders: number
  activeUsers: number
  averageOrderValue: number
  revenueGrowth: number
  ordersGrowth: number
  usersGrowth: number
  satisfaction: number
}

interface MonthlyData {
  month: string
  revenue: number
  orders: number
  growth: number
}

interface TopRestaurant {
  id: string
  name: string
  revenue: number
  orders: number
  rating: number
  growth: number
}

interface TopCustomer {
  id: string
  name: string
  totalSpent: number
  orders: number
  averageOrder: number
}

interface DeliveryMetrics {
  averageTime: number
  efficiency: number
  onTimeDeliveries: number
  lateDeliveries: number
}

interface GeographicData {
  city: string
  orders: number
  revenue: number
  growth: number
}

interface HourlyActivity {
  hour: string
  orders: number
  revenue: number
}

interface PaymentMethod {
  method: string
  count: number
  percentage: number
  revenue: number
}

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [selectedMetric, setSelectedMetric] = useState("revenue")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const [analyticsData] = useState<AnalyticsData>({
    totalRevenue: 2847563.45,
    totalOrders: 89432,
    activeUsers: 15847,
    averageOrderValue: 31.84,
    revenueGrowth: 23.4,
    ordersGrowth: 18.7,
    usersGrowth: 12.5,
    satisfaction: 4.7,
  })

  const [monthlyData] = useState<MonthlyData[]>([
    { month: "Ene", revenue: 234567, orders: 7234, growth: 15.2 },
    { month: "Feb", revenue: 267890, orders: 8123, growth: 14.2 },
    { month: "Mar", revenue: 298765, orders: 9456, growth: 11.5 },
    { month: "Abr", revenue: 312456, orders: 9876, growth: 4.6 },
    { month: "May", revenue: 345678, orders: 10987, growth: 10.6 },
    { month: "Jun", revenue: 389234, orders: 12234, growth: 12.6 },
  ])

  const [topRestaurants] = useState<TopRestaurant[]>([
    { id: "1", name: "Pizza Palace", revenue: 45678.9, orders: 1234, rating: 4.8, growth: 15.3 },
    { id: "2", name: "Burger House", revenue: 38765.43, orders: 987, rating: 4.6, growth: 12.7 },
    { id: "3", name: "Sushi Master", revenue: 34567.89, orders: 876, rating: 4.9, growth: 18.2 },
    { id: "4", name: "Taco Fiesta", revenue: 29876.54, orders: 765, rating: 4.5, growth: 8.9 },
    { id: "5", name: "Pasta Corner", revenue: 25432.1, orders: 654, rating: 4.7, growth: 14.1 },
  ])

  const [topCustomers] = useState<TopCustomer[]>([
    { id: "1", name: "María González", totalSpent: 1234.56, orders: 47, averageOrder: 26.27 },
    { id: "2", name: "Carlos Ruiz", totalSpent: 987.65, orders: 38, averageOrder: 25.99 },
    { id: "3", name: "Ana López", totalSpent: 876.54, orders: 32, averageOrder: 27.39 },
    { id: "4", name: "Luis Martínez", totalSpent: 765.43, orders: 29, averageOrder: 26.39 },
    { id: "5", name: "Carmen Díaz", totalSpent: 654.32, orders: 25, averageOrder: 26.17 },
  ])

  const [deliveryMetrics] = useState<DeliveryMetrics>({
    averageTime: 28.5,
    efficiency: 94.2,
    onTimeDeliveries: 8432,
    lateDeliveries: 543,
  })

  const [geographicData] = useState<GeographicData[]>([
    { city: "Ciudad de México", orders: 34567, revenue: 1234567.89, growth: 15.2 },
    { city: "Guadalajara", orders: 23456, revenue: 876543.21, growth: 12.8 },
    { city: "Monterrey", orders: 18765, revenue: 654321.09, growth: 18.5 },
    { city: "Puebla", orders: 12345, revenue: 432109.87, growth: 9.3 },
    { city: "Tijuana", orders: 9876, revenue: 321098.76, growth: 22.1 },
  ])

  const [hourlyActivity] = useState<HourlyActivity[]>([
    { hour: "00:00", orders: 45, revenue: 1234.56 },
    { hour: "01:00", orders: 23, revenue: 678.9 },
    { hour: "02:00", orders: 12, revenue: 345.67 },
    { hour: "03:00", orders: 8, revenue: 234.56 },
    { hour: "04:00", orders: 15, revenue: 456.78 },
    { hour: "05:00", orders: 34, revenue: 987.65 },
    { hour: "06:00", orders: 67, revenue: 1876.54 },
    { hour: "07:00", orders: 123, revenue: 3456.78 },
    { hour: "08:00", orders: 189, revenue: 5234.56 },
    { hour: "09:00", orders: 234, revenue: 6543.21 },
    { hour: "10:00", orders: 267, revenue: 7654.32 },
    { hour: "11:00", orders: 298, revenue: 8765.43 },
    { hour: "12:00", orders: 456, revenue: 12345.67 },
    { hour: "13:00", orders: 523, revenue: 14567.89 },
    { hour: "14:00", orders: 489, revenue: 13456.78 },
    { hour: "15:00", orders: 398, revenue: 10987.65 },
    { hour: "16:00", orders: 345, revenue: 9876.54 },
    { hour: "17:00", orders: 298, revenue: 8765.43 },
    { hour: "18:00", orders: 456, revenue: 12345.67 },
    { hour: "19:00", orders: 567, revenue: 15678.9 },
    { hour: "20:00", orders: 623, revenue: 17234.56 },
    { hour: "21:00", orders: 534, revenue: 14765.43 },
    { hour: "22:00", orders: 398, revenue: 10987.65 },
    { hour: "23:00", orders: 234, revenue: 6543.21 },
  ])

  const [paymentMethods] = useState<PaymentMethod[]>([
    { method: "Tarjeta de Crédito", count: 45678, percentage: 51.1, revenue: 1456789.12 },
    { method: "Tarjeta de Débito", count: 23456, percentage: 26.2, revenue: 789456.34 },
    { method: "PayPal", count: 12345, percentage: 13.8, revenue: 456123.78 },
    { method: "Efectivo", count: 7890, percentage: 8.8, revenue: 234567.89 },
    { method: "Otros", count: 123, percentage: 0.1, revenue: 12345.67 },
  ])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsRefreshing(false)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("es-MX").format(num)
  }

  const formatPercentage = (num: number) => {
    return `${num.toFixed(1)}%`
  }

  const getGrowthIcon = (growth: number) => {
    return growth >= 0 ? (
      <TrendingUp className="w-4 h-4 text-green-500" />
    ) : (
      <TrendingDown className="w-4 h-4 text-red-500" />
    )
  }

  const getGrowthColor = (growth: number) => {
    return growth >= 0 ? "text-green-600" : "text-red-600"
  }

  return (
    <div className="w-screen h-screen bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Análisis y Estadísticas</h1>
              <p className="text-gray-600">Panel de análisis completo de la plataforma</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="day">Hoy</option>
              <option value="week">Esta Semana</option>
              <option value="month">Este Mes</option>
              <option value="quarter">Este Trimestre</option>
              <option value="year">Este Año</option>
            </select>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center space-x-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
              <span>Actualizar</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <Download className="w-4 h-4" />
              <span>Exportar</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ingresos Totales</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(analyticsData.totalRevenue)}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {getGrowthIcon(analyticsData.revenueGrowth)}
              <span className={`text-sm font-medium ml-1 ${getGrowthColor(analyticsData.revenueGrowth)}`}>
                {formatPercentage(analyticsData.revenueGrowth)}
              </span>
              <span className="text-sm text-gray-500 ml-2">vs período anterior</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pedidos Totales</p>
                <p className="text-2xl font-bold text-gray-900">{formatNumber(analyticsData.totalOrders)}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {getGrowthIcon(analyticsData.ordersGrowth)}
              <span className={`text-sm font-medium ml-1 ${getGrowthColor(analyticsData.ordersGrowth)}`}>
                {formatPercentage(analyticsData.ordersGrowth)}
              </span>
              <span className="text-sm text-gray-500 ml-2">vs período anterior</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Usuarios Activos</p>
                <p className="text-2xl font-bold text-gray-900">{formatNumber(analyticsData.activeUsers)}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {getGrowthIcon(analyticsData.usersGrowth)}
              <span className={`text-sm font-medium ml-1 ${getGrowthColor(analyticsData.usersGrowth)}`}>
                {formatPercentage(analyticsData.usersGrowth)}
              </span>
              <span className="text-sm text-gray-500 ml-2">vs período anterior</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Valor Promedio</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(analyticsData.averageOrderValue)}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-900 ml-1">{analyticsData.satisfaction}</span>
              <span className="text-sm text-gray-500 ml-2">satisfacción</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Revenue Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Tendencia de Ingresos</h3>
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="revenue">Ingresos</option>
                <option value="orders">Pedidos</option>
                <option value="growth">Crecimiento</option>
              </select>
            </div>
            <div className="space-y-3">
              {monthlyData.map((data, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-600 w-8">{data.month}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full"
                        style={{
                          width: `${(data.revenue / Math.max(...monthlyData.map((d) => d.revenue))) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{formatCurrency(data.revenue)}</p>
                    <p className="text-xs text-gray-500">{formatNumber(data.orders)} pedidos</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Metrics */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Métricas de Entrega</h3>
              <Clock className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Tiempo promedio</span>
                <span className="text-sm font-medium text-gray-900">{deliveryMetrics.averageTime} min</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Eficiencia</span>
                <span className="text-sm font-medium text-green-600">{deliveryMetrics.efficiency}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Entregas a tiempo</span>
                <span className="text-sm font-medium text-gray-900">
                  {formatNumber(deliveryMetrics.onTimeDeliveries)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Entregas tardías</span>
                <span className="text-sm font-medium text-red-600">{formatNumber(deliveryMetrics.lateDeliveries)}</span>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>A tiempo</span>
                  <span>Tardías</span>
                </div>
                <div className="flex bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 rounded-l-full h-2"
                    style={{
                      width: `${(deliveryMetrics.onTimeDeliveries / (deliveryMetrics.onTimeDeliveries + deliveryMetrics.lateDeliveries)) * 100}%`,
                    }}
                  ></div>
                  <div
                    className="bg-red-500 rounded-r-full h-2"
                    style={{
                      width: `${(deliveryMetrics.lateDeliveries / (deliveryMetrics.onTimeDeliveries + deliveryMetrics.lateDeliveries)) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Top Restaurants */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Top Restaurantes</h3>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              {topRestaurants.map((restaurant, index) => (
                <div key={restaurant.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{restaurant.name}</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">{restaurant.orders} pedidos</span>
                        <div className="flex items-center">
                          <Star className="w-3 h-3 text-yellow-400" />
                          <span className="text-xs text-gray-500 ml-1">{restaurant.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{formatCurrency(restaurant.revenue)}</p>
                    <div className="flex items-center">
                      {getGrowthIcon(restaurant.growth)}
                      <span className={`text-xs ml-1 ${getGrowthColor(restaurant.growth)}`}>
                        {formatPercentage(restaurant.growth)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Customers */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Top Clientes</h3>
              <Users className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              {topCustomers.map((customer, index) => (
                <div key={customer.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{customer.name}</p>
                      <p className="text-xs text-gray-500">
                        {customer.orders} pedidos • {formatCurrency(customer.averageOrder)} promedio
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{formatCurrency(customer.totalSpent)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Métodos de Pago</h3>
              <CreditCard className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              {paymentMethods.map((method, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">{method.method}</span>
                    <span className="text-sm text-gray-500">{formatPercentage(method.percentage)}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{formatNumber(method.count)} transacciones</span>
                    <span>{formatCurrency(method.revenue)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <div className="bg-blue-600 h-1 rounded-full" style={{ width: `${method.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Geographic Distribution */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Distribución Geográfica</h3>
              <MapPin className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              {geographicData.map((location, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{location.city}</p>
                      <p className="text-xs text-gray-500">{formatNumber(location.orders)} pedidos</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{formatCurrency(location.revenue)}</p>
                    <div className="flex items-center">
                      {getGrowthIcon(location.growth)}
                      <span className={`text-xs ml-1 ${getGrowthColor(location.growth)}`}>
                        {formatPercentage(location.growth)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hourly Activity */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Actividad por Hora</h3>
              <Clock className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {hourlyActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-xs font-medium text-gray-600 w-12">{activity.hour}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-1">
                      <div
                        className="bg-indigo-600 h-1 rounded-full"
                        style={{
                          width: `${(activity.orders / Math.max(...hourlyActivity.map((a) => a.orders))) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-gray-900">{activity.orders}</p>
                    <p className="text-xs text-gray-500">{formatCurrency(activity.revenue)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
