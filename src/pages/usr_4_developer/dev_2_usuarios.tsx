"use client"

import { useState } from "react"
import {
  Users,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star,
  Truck,
  Store,
  Plus,
  Download,
  Upload,
  RefreshCw,
  X,
} from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  phone: string
  type: "customer" | "driver" | "restaurant"
  status: "active" | "inactive" | "suspended"
  registrationDate: string
  lastActivity: string
  location: string
  avatar: string
  stats: {
    orders?: number
    deliveries?: number
    rating?: number
    revenue?: number
  }
}

interface UserFilters {
  type: "all" | "customer" | "driver" | "restaurant"
  status: "all" | "active" | "inactive" | "suspended"
  dateRange: "all" | "today" | "week" | "month"
}

export default function UsersManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState<UserFilters>({
    type: "all",
    status: "all",
    dateRange: "all",
  })
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showUserModal, setShowUserModal] = useState(false)

  const users: User[] = [
    {
      id: "1",
      name: "María González",
      email: "maria.gonzalez@email.com",
      phone: "+52 55 1234 5678",
      type: "customer",
      status: "active",
      registrationDate: "2024-01-15",
      lastActivity: "2024-01-30 14:30",
      location: "Ciudad de México, CDMX",
      avatar: "/placeholder.svg?height=40&width=40",
      stats: { orders: 47, rating: 4.8 },
    },
    {
      id: "2",
      name: "Carlos Ruiz",
      email: "carlos.ruiz@email.com",
      phone: "+52 55 2345 6789",
      type: "driver",
      status: "active",
      registrationDate: "2024-01-10",
      lastActivity: "2024-01-30 16:45",
      location: "Guadalajara, JAL",
      avatar: "/placeholder.svg?height=40&width=40",
      stats: { deliveries: 234, rating: 4.9, revenue: 15420 },
    },
    {
      id: "3",
      name: "Pizza Palace",
      email: "info@pizzapalace.com",
      phone: "+52 55 3456 7890",
      type: "restaurant",
      status: "active",
      registrationDate: "2023-12-05",
      lastActivity: "2024-01-30 18:20",
      location: "Monterrey, NL",
      avatar: "/placeholder.svg?height=40&width=40",
      stats: { orders: 1247, rating: 4.6, revenue: 89340 },
    },
    {
      id: "4",
      name: "Ana López",
      email: "ana.lopez@email.com",
      phone: "+52 55 4567 8901",
      type: "customer",
      status: "inactive",
      registrationDate: "2024-01-20",
      lastActivity: "2024-01-25 10:15",
      location: "Puebla, PUE",
      avatar: "/placeholder.svg?height=40&width=40",
      stats: { orders: 12, rating: 4.5 },
    },
    {
      id: "5",
      name: "Roberto Martínez",
      email: "roberto.martinez@email.com",
      phone: "+52 55 5678 9012",
      type: "driver",
      status: "suspended",
      registrationDate: "2024-01-08",
      lastActivity: "2024-01-28 12:30",
      location: "Tijuana, BC",
      avatar: "/placeholder.svg?height=40&width=40",
      stats: { deliveries: 89, rating: 3.8, revenue: 4560 },
    },
    {
      id: "6",
      name: "Burger House",
      email: "contact@burgerhouse.com",
      phone: "+52 55 6789 0123",
      type: "restaurant",
      status: "active",
      registrationDate: "2023-11-20",
      lastActivity: "2024-01-30 19:45",
      location: "Cancún, QR",
      avatar: "/placeholder.svg?height=40&width=40",
      stats: { orders: 892, rating: 4.4, revenue: 67890 },
    },
  ]

  const userStats = {
    total: users.length,
    customers: users.filter((u) => u.type === "customer").length,
    drivers: users.filter((u) => u.type === "driver").length,
    restaurants: users.filter((u) => u.type === "restaurant").length,
    active: users.filter((u) => u.status === "active").length,
    inactive: users.filter((u) => u.status === "inactive").length,
    suspended: users.filter((u) => u.status === "suspended").length,
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)

    const matchesType = filters.type === "all" || user.type === filters.type
    const matchesStatus = filters.status === "all" || user.status === filters.status

    return matchesSearch && matchesType && matchesStatus
  })

  const handleSelectUser = (userId: string) => {
    setSelectedUsers((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
  }

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(filteredUsers.map((user) => user.id))
    }
  }

  const getTypeIcon = (type: User["type"]) => {
    switch (type) {
      case "customer":
        return <Users className="w-4 h-4" />
      case "driver":
        return <Truck className="w-4 h-4" />
      case "restaurant":
        return <Store className="w-4 h-4" />
      default:
        return <Users className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: User["type"]) => {
    switch (type) {
      case "customer":
        return "bg-blue-100 text-blue-800"
      case "driver":
        return "bg-green-100 text-green-800"
      case "restaurant":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: User["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      case "suspended":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-MX", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const handleViewUser = (user: User) => {
    setSelectedUser(user)
    setShowUserModal(true)
    setActiveDropdown(null)
  }

  return (
    <div className="w-screen h-screen bg-gray-50 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Users className="w-6 h-6 text-blue-600" />
              <h1 className="text-xl font-semibold text-gray-900">Gestión de Usuarios</h1>
            </div>
            <div className="text-sm text-gray-500">
              {filteredUsers.length} de {users.length} usuarios
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Exportar</span>
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center space-x-2">
              <Upload className="w-4 h-4" />
              <span>Importar</span>
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Nuevo Usuario</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mt-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-900">{userStats.total}</div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600">{userStats.customers}</div>
            <div className="text-sm text-blue-600">Clientes</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600">{userStats.drivers}</div>
            <div className="text-sm text-green-600">Repartidores</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-orange-600">{userStats.restaurants}</div>
            <div className="text-sm text-orange-600">Restaurantes</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600">{userStats.active}</div>
            <div className="text-sm text-green-600">Activos</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-600">{userStats.inactive}</div>
            <div className="text-sm text-gray-600">Inactivos</div>
          </div>
          <div className="bg-red-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-red-600">{userStats.suspended}</div>
            <div className="text-sm text-red-600">Suspendidos</div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar usuarios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-80"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center space-x-2"
            >
              <Filter className="w-4 h-4" />
              <span>Filtros</span>
            </button>

            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {selectedUsers.length > 0 && (
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600">{selectedUsers.length} seleccionados</span>
              <button className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">
                Eliminar
              </button>
              <button className="px-3 py-1 text-sm font-medium text-white bg-yellow-600 rounded-md hover:bg-yellow-700">
                Suspender
              </button>
              <button className="px-3 py-1 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700">
                Activar
              </button>
            </div>
          )}
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Usuario</label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters((prev) => ({ ...prev, type: e.target.value as UserFilters["type"] }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Todos</option>
                  <option value="customer">Clientes</option>
                  <option value="driver">Repartidores</option>
                  <option value="restaurant">Restaurantes</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value as UserFilters["status"] }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Todos</option>
                  <option value="active">Activos</option>
                  <option value="inactive">Inactivos</option>
                  <option value="suspended">Suspendidos</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Período</label>
                <select
                  value={filters.dateRange}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, dateRange: e.target.value as UserFilters["dateRange"] }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Todos</option>
                  <option value="today">Hoy</option>
                  <option value="week">Esta Semana</option>
                  <option value="month">Este Mes</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Users Table */}
      <div className="flex-1 overflow-y-auto">
        <div className="bg-white">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estadísticas
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ubicación
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Registro
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Última Actividad
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.name}
                        className="w-10 h-10 rounded-full bg-gray-200"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                        <div className="text-xs text-gray-400">{user.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(user.type)}`}
                    >
                      {getTypeIcon(user.type)}
                      <span className="ml-1 capitalize">
                        {user.type === "customer" ? "Cliente" : user.type === "driver" ? "Repartidor" : "Restaurante"}
                      </span>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}
                    >
                      {user.status === "active" ? "Activo" : user.status === "inactive" ? "Inactivo" : "Suspendido"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {user.type === "customer" && (
                        <div>
                          <div>{user.stats.orders} pedidos</div>
                          <div className="flex items-center">
                            <Star className="w-3 h-3 text-yellow-400 mr-1" />
                            <span>{user.stats.rating}</span>
                          </div>
                        </div>
                      )}
                      {user.type === "driver" && (
                        <div>
                          <div>{user.stats.deliveries} entregas</div>
                          <div className="flex items-center">
                            <Star className="w-3 h-3 text-yellow-400 mr-1" />
                            <span>{user.stats.rating}</span>
                          </div>
                          <div className="text-xs text-green-600">{formatCurrency(user.stats.revenue || 0)}</div>
                        </div>
                      )}
                      {user.type === "restaurant" && (
                        <div>
                          <div>{user.stats.orders} pedidos</div>
                          <div className="flex items-center">
                            <Star className="w-3 h-3 text-yellow-400 mr-1" />
                            <span>{user.stats.rating}</span>
                          </div>
                          <div className="text-xs text-green-600">{formatCurrency(user.stats.revenue || 0)}</div>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {user.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(user.registrationDate)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{user.lastActivity}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="relative">
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === user.id ? null : user.id)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {activeDropdown === user.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-50">
                          <div className="py-1">
                            <button
                              onClick={() => handleViewUser(user)}
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
                              <Mail className="w-4 h-4 mr-2" />
                              Enviar Email
                            </button>
                            {user.status === "active" ? (
                              <button className="flex items-center px-4 py-2 text-sm text-yellow-700 hover:bg-yellow-50 w-full text-left">
                                <UserX className="w-4 h-4 mr-2" />
                                Suspender
                              </button>
                            ) : (
                              <button className="flex items-center px-4 py-2 text-sm text-green-700 hover:bg-green-50 w-full text-left">
                                <UserCheck className="w-4 h-4 mr-2" />
                                Activar
                              </button>
                            )}
                            <hr className="my-1" />
                            <button className="flex items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50 w-full text-left">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Eliminar
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

      {/* User Details Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Detalles del Usuario</h2>
              <button
                onClick={() => setShowUserModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex items-center space-x-4">
                <img
                  src={selectedUser.avatar || "/placeholder.svg"}
                  alt={selectedUser.name}
                  className="w-16 h-16 rounded-full bg-gray-200"
                />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{selectedUser.name}</h3>
                  <p className="text-sm text-gray-500">{selectedUser.email}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(selectedUser.type)}`}
                    >
                      {getTypeIcon(selectedUser.type)}
                      <span className="ml-1 capitalize">
                        {selectedUser.type === "customer"
                          ? "Cliente"
                          : selectedUser.type === "driver"
                            ? "Repartidor"
                            : "Restaurante"}
                      </span>
                    </span>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedUser.status)}`}
                    >
                      {selectedUser.status === "active"
                        ? "Activo"
                        : selectedUser.status === "inactive"
                          ? "Inactivo"
                          : "Suspendido"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Información de Contacto</h4>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="w-4 h-4 mr-2" />
                      {selectedUser.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="w-4 h-4 mr-2" />
                      {selectedUser.phone}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {selectedUser.location}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Estadísticas</h4>
                  <div className="space-y-2">
                    {selectedUser.type === "customer" && (
                      <>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Pedidos realizados:</span>
                          <span className="font-medium">{selectedUser.stats.orders}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Calificación promedio:</span>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                            <span className="font-medium">{selectedUser.stats.rating}</span>
                          </div>
                        </div>
                      </>
                    )}
                    {selectedUser.type === "driver" && (
                      <>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Entregas realizadas:</span>
                          <span className="font-medium">{selectedUser.stats.deliveries}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Calificación promedio:</span>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                            <span className="font-medium">{selectedUser.stats.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Ingresos totales:</span>
                          <span className="font-medium text-green-600">
                            {formatCurrency(selectedUser.stats.revenue || 0)}
                          </span>
                        </div>
                      </>
                    )}
                    {selectedUser.type === "restaurant" && (
                      <>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Pedidos recibidos:</span>
                          <span className="font-medium">{selectedUser.stats.orders}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Calificación promedio:</span>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                            <span className="font-medium">{selectedUser.stats.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Ingresos totales:</span>
                          <span className="font-medium text-green-600">
                            {formatCurrency(selectedUser.stats.revenue || 0)}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Información Adicional</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-600">Fecha de registro:</span>
                    <p className="text-sm font-medium text-gray-900">{formatDate(selectedUser.registrationDate)}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Última actividad:</span>
                    <p className="text-sm font-medium text-gray-900">{selectedUser.lastActivity}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 p-6 border-t bg-gray-50">
              <button
                onClick={() => setShowUserModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cerrar
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                Editar Usuario
              </button>
              {selectedUser.status === "active" ? (
                <button className="px-4 py-2 text-sm font-medium text-white bg-yellow-600 rounded-md hover:bg-yellow-700">
                  Suspender
                </button>
              ) : (
                <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700">
                  Activar
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close dropdown */}
      {activeDropdown && <div className="fixed inset-0 z-40" onClick={() => setActiveDropdown(null)} />}
    </div>
  )
}
