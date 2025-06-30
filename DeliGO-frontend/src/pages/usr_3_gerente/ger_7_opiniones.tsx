"use client"

import { useState } from "react"
import {
  Star,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Filter,
  Search,
  Send,
  MoreVertical,
  Flag,
  Trash2,
} from "lucide-react"

interface Review {
  id: string
  customerName: string
  customerAvatar: string
  rating: number
  date: string
  orderNumber: string
  comment: string
  response?: string
  responseDate?: string
  helpful: number
  notHelpful: number
  category: "food" | "service" | "delivery" | "general"
  status: "pending" | "responded" | "flagged"
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      customerName: "María González",
      customerAvatar: "MG",
      rating: 5,
      date: "2024-01-15",
      orderNumber: "#12345",
      comment:
        "Excelente pizza! La masa estaba perfecta y los ingredientes muy frescos. El tiempo de entrega fue exacto como prometieron. Definitivamente volveré a pedir.",
      response:
        "Muchas gracias María por tu comentario. Nos alegra saber que disfrutaste tu pizza. ¡Te esperamos pronto!",
      responseDate: "2024-01-15",
      helpful: 12,
      notHelpful: 0,
      category: "food",
      status: "responded",
    },
    {
      id: "2",
      customerName: "Carlos Rodríguez",
      customerAvatar: "CR",
      rating: 4,
      date: "2024-01-14",
      orderNumber: "#12344",
      comment:
        "Muy buena comida, aunque el tiempo de entrega fue un poco más largo de lo esperado. La hamburguesa estaba deliciosa y las papas crujientes.",
      helpful: 8,
      notHelpful: 1,
      category: "delivery",
      status: "pending",
    },
    {
      id: "3",
      customerName: "Ana Martínez",
      customerAvatar: "AM",
      rating: 5,
      date: "2024-01-13",
      orderNumber: "#12343",
      comment:
        "Servicio excepcional! El repartidor fue muy amable y la comida llegó caliente. Los precios son muy justos para la calidad que ofrecen.",
      response: "Gracias Ana! Nos esforzamos por brindar el mejor servicio. Tu opinión es muy valiosa para nosotros.",
      responseDate: "2024-01-13",
      helpful: 15,
      notHelpful: 0,
      category: "service",
      status: "responded",
    },
    {
      id: "4",
      customerName: "Luis Fernández",
      customerAvatar: "LF",
      rating: 2,
      date: "2024-01-12",
      orderNumber: "#12342",
      comment:
        "La pasta estaba fría cuando llegó y el sabor no era el esperado. Además, faltaba uno de los ingredientes que pedí. Muy decepcionante.",
      helpful: 3,
      notHelpful: 8,
      category: "food",
      status: "flagged",
    },
    {
      id: "5",
      customerName: "Sofia López",
      customerAvatar: "SL",
      rating: 4,
      date: "2024-01-11",
      orderNumber: "#12341",
      comment:
        "En general muy buena experiencia. La pizza estaba rica y el precio accesible. Solo sugiero mejorar el empaque para que mantenga mejor la temperatura.",
      helpful: 6,
      notHelpful: 1,
      category: "general",
      status: "pending",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterRating, setFilterRating] = useState<number | null>(null)
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [showFilters, setShowFilters] = useState(false)
  const [responseText, setResponseText] = useState("")
  const [respondingTo, setRespondingTo] = useState<string | null>(null)
  const [showMenu, setShowMenu] = useState<string | null>(null)

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRating = filterRating === null || review.rating === filterRating
    const matchesCategory = filterCategory === "all" || review.category === filterCategory
    const matchesStatus = filterStatus === "all" || review.status === filterStatus

    return matchesSearch && matchesRating && matchesCategory && matchesStatus
  })

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
  const totalReviews = reviews.length
  const pendingResponses = reviews.filter((r) => r.status === "pending").length
  const flaggedReviews = reviews.filter((r) => r.status === "flagged").length

  const handleResponse = (reviewId: string) => {
    if (responseText.trim()) {
      setReviews((prev) =>
        prev.map((review) =>
          review.id === reviewId
            ? {
                ...review,
                response: responseText,
                responseDate: new Date().toISOString().split("T")[0],
                status: "responded" as const,
              }
            : review,
        ),
      )
      setResponseText("")
      setRespondingTo(null)
    }
  }

  const handleFlag = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((review) => (review.id === reviewId ? { ...review, status: "flagged" as const } : review)),
    )
    setShowMenu(null)
  }

  const handleDelete = (reviewId: string) => {
    setReviews((prev) => prev.filter((review) => review.id !== reviewId))
    setShowMenu(null)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "food":
        return "bg-orange-100 text-orange-800"
      case "service":
        return "bg-blue-100 text-blue-800"
      case "delivery":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "responded":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "flagged":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="w-screen h-screen bg-gray-50 overflow-hidden">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MessageSquare className="w-8 h-8 text-orange-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Opiniones de Clientes</h1>
                <p className="text-gray-600">Gestiona y responde a las reseñas de tus clientes</p>
              </div>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>Filtros</span>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 rounded-lg text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Calificación Promedio</p>
                  <p className="text-2xl font-bold">{averageRating.toFixed(1)}</p>
                </div>
                <Star className="w-8 h-8 text-orange-200" />
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Total Reseñas</p>
                  <p className="text-2xl font-bold text-gray-900">{totalReviews}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Pendientes</p>
                  <p className="text-2xl font-bold text-yellow-600">{pendingResponses}</p>
                </div>
                <ThumbsUp className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Reportadas</p>
                  <p className="text-2xl font-bold text-red-600">{flaggedReviews}</p>
                </div>
                <Flag className="w-8 h-8 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar reseñas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <select
                value={filterRating || ""}
                onChange={(e) => setFilterRating(e.target.value ? Number(e.target.value) : null)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Todas las calificaciones</option>
                <option value="5">5 estrellas</option>
                <option value="4">4 estrellas</option>
                <option value="3">3 estrellas</option>
                <option value="2">2 estrellas</option>
                <option value="1">1 estrella</option>
              </select>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="all">Todas las categorías</option>
                <option value="food">Comida</option>
                <option value="service">Servicio</option>
                <option value="delivery">Entrega</option>
                <option value="general">General</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="all">Todos los estados</option>
                <option value="pending">Pendientes</option>
                <option value="responded">Respondidas</option>
                <option value="flagged">Reportadas</option>
              </select>
            </div>
          </div>
        )}

        {/* Reviews List */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {filteredReviews.map((review) => (
              <div key={review.id} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-orange-600 font-semibold">{review.customerAvatar}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{review.customerName}</h3>
                        <div className="flex items-center space-x-1">{renderStars(review.rating)}</div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(review.category)}`}
                        >
                          {review.category === "food"
                            ? "Comida"
                            : review.category === "service"
                              ? "Servicio"
                              : review.category === "delivery"
                                ? "Entrega"
                                : "General"}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(review.status)}`}>
                          {review.status === "pending"
                            ? "Pendiente"
                            : review.status === "responded"
                              ? "Respondida"
                              : "Reportada"}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <span>{review.date}</span>
                        <span>Pedido {review.orderNumber}</span>
                      </div>
                      <p className="text-gray-700 mb-4">{review.comment}</p>

                      {/* Response */}
                      {review.response && (
                        <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-sm font-medium text-orange-800">Respuesta del restaurante</span>
                            <span className="text-xs text-orange-600">{review.responseDate}</span>
                          </div>
                          <p className="text-orange-700">{review.response}</p>
                        </div>
                      )}

                      {/* Response Form */}
                      {respondingTo === review.id && (
                        <div className="border-t pt-4">
                          <textarea
                            value={responseText}
                            onChange={(e) => setResponseText(e.target.value)}
                            placeholder="Escribe tu respuesta..."
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                            rows={3}
                          />
                          <div className="flex items-center justify-end space-x-2 mt-2">
                            <button
                              onClick={() => setRespondingTo(null)}
                              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                            >
                              Cancelar
                            </button>
                            <button
                              onClick={() => handleResponse(review.id)}
                              className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                            >
                              <Send className="w-4 h-4" />
                              <span>Enviar</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <ThumbsUp className="w-4 h-4" />
                            <span>{review.helpful}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <ThumbsDown className="w-4 h-4" />
                            <span>{review.notHelpful}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {!review.response && review.status !== "flagged" && (
                            <button
                              onClick={() => setRespondingTo(review.id)}
                              className="px-4 py-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                            >
                              Responder
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => setShowMenu(showMenu === review.id ? null : review.id)}
                      className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    {showMenu === review.id && (
                      <div className="absolute right-0 top-10 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-10 min-w-[150px]">
                        <button
                          onClick={() => handleFlag(review.id)}
                          className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center space-x-2"
                        >
                          <Flag className="w-4 h-4" />
                          <span>Reportar</span>
                        </button>
                        <button
                          onClick={() => handleDelete(review.id)}
                          className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center space-x-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Eliminar</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
