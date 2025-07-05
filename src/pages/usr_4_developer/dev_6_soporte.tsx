import type React from "react"
import { useState } from "react"
import {
  Search,
  MoreVertical,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  User,
  Package,
  CreditCard,
  Truck,
  Star,
  FileText,
  Send,
  Eye,
  Edit3,
  UserCheck,
  Download,
  RefreshCw,
} from "lucide-react"

interface Claim {
  id: string
  userId: string
  userName: string
  userEmail: string
  type: "order" | "payment" | "delivery" | "quality"
  title: string
  description: string
  status: "pending" | "in-progress" | "resolved" | "closed"
  priority: "low" | "medium" | "high" | "urgent"
  assignedTo?: string
  orderNumber?: string
  createdAt: string
  updatedAt: string
  responseTime?: number
  rating?: number
  messages: Message[]
}

interface Message {
  id: string
  sender: "user" | "admin"
  senderName: string
  message: string
  timestamp: string
  attachments?: string[]
}

interface Agent {
  id: string
  name: string
  email: string
  status: "online" | "offline" | "busy"
  activeClaims: number
}

export default function AdminSupportDashboard() {
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null)
  const [showClaimDetail, setShowClaimDetail] = useState(false)
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterType, setFilterType] = useState<string>("all")
  const [filterPriority, setFilterPriority] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [newMessage, setNewMessage] = useState("")
  const [selectedAgent, setSelectedAgent] = useState<string>("")

  // Mock data
  const agents: Agent[] = [
    { id: "1", name: "Ana García", email: "ana@deligo.com", status: "online", activeClaims: 5 },
    { id: "2", name: "Carlos López", email: "carlos@deligo.com", status: "online", activeClaims: 3 },
    { id: "3", name: "María Rodríguez", email: "maria@deligo.com", status: "busy", activeClaims: 7 },
    { id: "4", name: "Juan Pérez", email: "juan@deligo.com", status: "offline", activeClaims: 0 },
  ]

  const claims: Claim[] = [
    {
      id: "CLM-001",
      userId: "USR-123",
      userName: "Pedro Martínez",
      userEmail: "pedro@email.com",
      type: "delivery",
      title: "Pedido no entregado",
      description: "Mi pedido #12345 nunca llegó a mi dirección. Han pasado 2 horas del tiempo estimado.",
      status: "pending",
      priority: "high",
      orderNumber: "12345",
      createdAt: "2024-01-15T14:30:00Z",
      updatedAt: "2024-01-15T14:30:00Z",
      messages: [
        {
          id: "1",
          sender: "user",
          senderName: "Pedro Martínez",
          message: "Mi pedido no ha llegado y ya pasó mucho tiempo",
          timestamp: "2024-01-15T14:30:00Z",
        },
      ],
    },
    {
      id: "CLM-002",
      userId: "USR-124",
      userName: "Laura Sánchez",
      userEmail: "laura@email.com",
      type: "quality",
      title: "Comida en mal estado",
      description: "La pizza llegó fría y con ingredientes faltantes. Muy mala experiencia.",
      status: "in-progress",
      priority: "medium",
      assignedTo: "Ana García",
      orderNumber: "12340",
      createdAt: "2024-01-14T16:20:00Z",
      updatedAt: "2024-01-15T09:15:00Z",
      responseTime: 45,
      messages: [
        {
          id: "1",
          sender: "user",
          senderName: "Laura Sánchez",
          message: "La pizza llegó fría y le faltaban ingredientes",
          timestamp: "2024-01-14T16:20:00Z",
        },
        {
          id: "2",
          sender: "admin",
          senderName: "Ana García",
          message: "Lamento mucho esta experiencia. Vamos a procesar un reembolso completo.",
          timestamp: "2024-01-15T09:15:00Z",
        },
      ],
    },
    {
      id: "CLM-003",
      userId: "USR-125",
      userName: "Roberto Silva",
      userEmail: "roberto@email.com",
      type: "payment",
      title: "Cobro duplicado",
      description: "Me cobraron dos veces el mismo pedido en mi tarjeta de crédito.",
      status: "resolved",
      priority: "high",
      assignedTo: "Carlos López",
      orderNumber: "12338",
      createdAt: "2024-01-13T11:45:00Z",
      updatedAt: "2024-01-14T10:30:00Z",
      responseTime: 120,
      rating: 5,
      messages: [
        {
          id: "1",
          sender: "user",
          senderName: "Roberto Silva",
          message: "Me aparecen dos cargos por el mismo pedido",
          timestamp: "2024-01-13T11:45:00Z",
        },
        {
          id: "2",
          sender: "admin",
          senderName: "Carlos López",
          message: "He verificado tu cuenta y procederé con el reembolso del cargo duplicado.",
          timestamp: "2024-01-14T10:30:00Z",
        },
      ],
    },
  ]

  const stats = {
    totalClaims: claims.length,
    pendingClaims: claims.filter((c) => c.status === "pending").length,
    inProgressClaims: claims.filter((c) => c.status === "in-progress").length,
    resolvedClaims: claims.filter((c) => c.status === "resolved").length,
    avgResponseTime: 85,
    satisfactionRate: 4.2,
  }

  const filteredClaims = claims.filter((claim) => {
    const matchesStatus = filterStatus === "all" || claim.status === filterStatus
    const matchesType = filterType === "all" || claim.type === filterType
    const matchesPriority = filterPriority === "all" || claim.priority === filterPriority
    const matchesSearch =
      searchTerm === "" ||
      claim.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (claim.orderNumber && claim.orderNumber.includes(searchTerm))

    return matchesStatus && matchesType && matchesPriority && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-yellow-700 bg-yellow-100 border-yellow-200"
      case "in-progress":
        return "text-blue-700 bg-blue-100 border-blue-200"
      case "resolved":
        return "text-green-700 bg-green-100 border-green-200"
      case "closed":
        return "text-gray-700 bg-gray-100 border-gray-200"
      default:
        return "text-gray-700 bg-gray-100 border-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "text-red-700 bg-red-100 border-red-200"
      case "high":
        return "text-orange-700 bg-orange-100 border-orange-200"
      case "medium":
        return "text-yellow-700 bg-yellow-100 border-yellow-200"
      case "low":
        return "text-green-700 bg-green-100 border-green-200"
      default:
        return "text-gray-700 bg-gray-100 border-gray-200"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "order":
        return <Package className="w-4 h-4" />
      case "payment":
        return <CreditCard className="w-4 h-4" />
      case "delivery":
        return <Truck className="w-4 h-4" />
      case "quality":
        return <Star className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const handleStatusChange = (claimId: string, newStatus: string) => {
    console.log(`Changing status of ${claimId} to ${newStatus}`)
    // Aquí iría la lógica para actualizar el estado
  }

  const handleAssignClaim = (claimId: string, agentId: string) => {
    console.log(`Assigning claim ${claimId} to agent ${agentId}`)
    // Aquí iría la lógica para asignar el reclamo
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() && selectedClaim) {
      console.log(`Sending message to claim ${selectedClaim.id}: ${newMessage}`)
      // Aquí iría la lógica para enviar el mensaje
      setNewMessage("")
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="w-screen h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">DeliGO Admin</h1>
              <p className="text-sm text-gray-500">Panel de Soporte</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="p-4 space-y-3">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-800">Total Reclamos</p>
                <p className="text-2xl font-bold text-orange-900">{stats.totalClaims}</p>
              </div>
              <FileText className="w-8 h-8 text-orange-500" />
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-800">Pendientes</p>
                <p className="text-2xl font-bold text-yellow-900">{stats.pendingClaims}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-800">En Proceso</p>
                <p className="text-2xl font-bold text-blue-900">{stats.inProgressClaims}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800">Resueltos</p>
                <p className="text-2xl font-bold text-green-900">{stats.resolvedClaims}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
        </div>

        {/* Agents Status */}
        <div className="p-4 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Agentes Activos</h3>
          <div className="space-y-2">
            {agents.map((agent) => (
              <div key={agent.id} className="flex items-center space-x-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    agent.status === "online"
                      ? "bg-green-500"
                      : agent.status === "busy"
                        ? "bg-yellow-500"
                        : "bg-gray-400"
                  }`}
                />
                <span className="text-xs text-gray-600 flex-1">{agent.name}</span>
                <span className="text-xs text-gray-500">({agent.activeClaims})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Gestión de Reclamos</h2>
              <p className="text-gray-600">Administra y resuelve los reclamos de los usuarios</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <Download className="w-4 h-4" />
                <span>Exportar</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                <RefreshCw className="w-4 h-4" />
                <span>Actualizar</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por ID, usuario, título..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="all">Todos los estados</option>
              <option value="pending">Pendientes</option>
              <option value="in-progress">En proceso</option>
              <option value="resolved">Resueltos</option>
              <option value="closed">Cerrados</option>
            </select>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="all">Todos los tipos</option>
              <option value="order">Pedido</option>
              <option value="delivery">Entrega</option>
              <option value="payment">Pago</option>
              <option value="quality">Calidad</option>
            </select>

            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="all">Todas las prioridades</option>
              <option value="urgent">Urgente</option>
              <option value="high">Alta</option>
              <option value="medium">Media</option>
              <option value="low">Baja</option>
            </select>
          </div>
        </div>

        {/* Claims Table */}
        <div className="flex-1 overflow-auto">
          <div className="bg-white">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Usuario</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Tipo</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Título</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Estado</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Prioridad</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Asignado</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Fecha</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredClaims.map((claim) => (
                  <tr key={claim.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <span className="font-mono text-sm text-gray-900">{claim.id}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{claim.userName}</p>
                        <p className="text-sm text-gray-500">{claim.userEmail}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="text-gray-500">{getTypeIcon(claim.type)}</div>
                        <span className="text-sm text-gray-900 capitalize">{claim.type}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-medium text-gray-900 truncate max-w-xs">{claim.title}</p>
                      {claim.orderNumber && <p className="text-sm text-gray-500">Pedido #{claim.orderNumber}</p>}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(claim.status)}`}
                      >
                        {claim.status === "pending"
                          ? "Pendiente"
                          : claim.status === "in-progress"
                            ? "En Proceso"
                            : claim.status === "resolved"
                              ? "Resuelto"
                              : "Cerrado"}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(claim.priority)}`}
                      >
                        {claim.priority === "urgent"
                          ? "Urgente"
                          : claim.priority === "high"
                            ? "Alta"
                            : claim.priority === "medium"
                              ? "Media"
                              : "Baja"}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      {claim.assignedTo ? (
                        <div className="flex items-center space-x-2">
                          <UserCheck className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-900">{claim.assignedTo}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">Sin asignar</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm text-gray-900">{formatDate(claim.createdAt)}</p>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedClaim(claim)
                            setShowClaimDetail(true)
                          }}
                          className="p-1 text-gray-500 hover:text-orange-600 transition-colors"
                          title="Ver detalles"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-500 hover:text-blue-600 transition-colors" title="Editar">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1 text-gray-500 hover:text-green-600 transition-colors"
                          title="Más opciones"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Claim Detail Modal */}
      {showClaimDetail && selectedClaim && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-5/6 flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Reclamo {selectedClaim.id}</h3>
                <p className="text-sm text-gray-500">Usuario: {selectedClaim.userName}</p>
              </div>
              <button
                onClick={() => setShowClaimDetail(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 flex">
              {/* Left Panel - Claim Details */}
              <div className="w-1/2 p-6 border-r border-gray-200">
                <div className="space-y-6">
                  {/* Status and Priority Controls */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                      <select
                        value={selectedClaim.status}
                        onChange={(e) => handleStatusChange(selectedClaim.id, e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      >
                        <option value="pending">Pendiente</option>
                        <option value="in-progress">En Proceso</option>
                        <option value="resolved">Resuelto</option>
                        <option value="closed">Cerrado</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Asignar a</label>
                      <select
                        value={selectedAgent}
                        onChange={(e) => {
                          setSelectedAgent(e.target.value)
                          handleAssignClaim(selectedClaim.id, e.target.value)
                        }}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      >
                        <option value="">Sin asignar</option>
                        {agents.map((agent) => (
                          <option key={agent.id} value={agent.name}>
                            {agent.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Claim Information */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Información del Reclamo</h4>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-500">Tipo:</span>
                        <div className="flex items-center space-x-2 mt-1">
                          {getTypeIcon(selectedClaim.type)}
                          <span className="capitalize">{selectedClaim.type}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Título:</span>
                        <p className="mt-1">{selectedClaim.title}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Descripción:</span>
                        <p className="mt-1 text-gray-700">{selectedClaim.description}</p>
                      </div>
                      {selectedClaim.orderNumber && (
                        <div>
                          <span className="text-sm font-medium text-gray-500">Número de Pedido:</span>
                          <p className="mt-1 font-mono">#{selectedClaim.orderNumber}</p>
                        </div>
                      )}
                      <div>
                        <span className="text-sm font-medium text-gray-500">Fecha de Creación:</span>
                        <p className="mt-1">{formatDate(selectedClaim.createdAt)}</p>
                      </div>
                    </div>
                  </div>

                  {/* User Information */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Información del Usuario</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span>{selectedClaim.userName}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-500">Email:</span>
                        <span>{selectedClaim.userEmail}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Panel - Chat */}
              <div className="w-1/2 flex flex-col">
                <div className="p-4 border-b border-gray-200">
                  <h4 className="font-medium text-gray-900">Conversación</h4>
                </div>

                <div className="flex-1 overflow-auto p-4 space-y-4">
                  {selectedClaim.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "admin" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-sm px-4 py-2 rounded-lg ${
                          message.sender === "admin" ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <p className="text-sm font-medium mb-1">{message.senderName}</p>
                        <p className="text-sm">{message.message}</p>
                        <p
                          className={`text-xs mt-1 ${message.sender === "admin" ? "text-orange-100" : "text-gray-500"}`}
                        >
                          {formatDate(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t border-gray-200">
                  <form onSubmit={handleSendMessage} className="flex space-x-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Escribe tu respuesta..."
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                    <button
                      type="submit"
                      className="bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
