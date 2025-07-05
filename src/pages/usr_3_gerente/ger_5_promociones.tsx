"use client"

import type React from "react"
import { useState } from "react"
import {
  Tag,
  Plus,
  Search,
  Calendar,
  Percent,
  DollarSign,
  Eye,
  EyeOff,
  Edit,
  Trash2,
  Gift,
  Users,
  Target,
  X,
  Check,
} from "lucide-react"

interface Promotion {
  id: string
  name: string
  description: string
  type: "percentage" | "fixed" | "bogo" | "free_delivery"
  value: number
  minOrder: number
  startDate: string
  endDate: string
  isActive: boolean
  usageCount: number
  maxUsage: number
  code: string
  applicableProducts: string[]
}

export default function PromotionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [showModal, setShowModal] = useState(false)
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null)
  const [showConfirmMessage, setShowConfirmMessage] = useState(false)

  const [promotions, setPromotions] = useState<Promotion[]>([
    {
      id: "1",
      name: "Descuento de Bienvenida",
      description: "20% de descuento en tu primer pedido",
      type: "percentage",
      value: 20,
      minOrder: 25,
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      isActive: true,
      usageCount: 156,
      maxUsage: 500,
      code: "BIENVENIDA20",
      applicableProducts: ["all"],
    },
    {
      id: "2",
      name: "Pizza Gratis",
      description: "Compra 2 pizzas y llévate 1 gratis",
      type: "bogo",
      value: 1,
      minOrder: 0,
      startDate: "2024-06-01",
      endDate: "2024-06-30",
      isActive: true,
      usageCount: 89,
      maxUsage: 200,
      code: "PIZZA2X1",
      applicableProducts: ["pizzas"],
    },
    {
      id: "3",
      name: "Envío Gratis",
      description: "Envío gratuito en pedidos mayores a $30",
      type: "free_delivery",
      value: 0,
      minOrder: 30,
      startDate: "2024-06-15",
      endDate: "2024-07-15",
      isActive: false,
      usageCount: 234,
      maxUsage: 1000,
      code: "ENVIOGRATIS",
      applicableProducts: ["all"],
    },
    {
      id: "4",
      name: "Descuento Fin de Semana",
      description: "$5 de descuento los fines de semana",
      type: "fixed",
      value: 5,
      minOrder: 20,
      startDate: "2024-06-01",
      endDate: "2024-08-31",
      isActive: true,
      usageCount: 67,
      maxUsage: 300,
      code: "WEEKEND5",
      applicableProducts: ["all"],
    },
  ])

  const [formData, setFormData] = useState<{
    name: string
    description: string
    type: Promotion["type"]
    value: number
    minOrder: number
    startDate: string
    endDate: string
    code: string
    maxUsage: number
    applicableProducts: string[]
  }>({
    name: "",
    description: "",
    type: "percentage",
    value: 0,
    minOrder: 0,
    startDate: "",
    endDate: "",
    code: "",
    maxUsage: 100,
    applicableProducts: ["all"],
  })

  const filteredPromotions = promotions.filter((promotion) => {
    const matchesSearch =
      promotion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promotion.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promotion.code.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter =
      filterType === "all" ||
      (filterType === "active" && promotion.isActive) ||
      (filterType === "inactive" && !promotion.isActive) ||
      promotion.type === filterType

    return matchesSearch && matchesFilter
  })

  const handleToggleActive = (id: string) => {
    setPromotions((prev) =>
      prev.map((promotion) => (promotion.id === id ? { ...promotion, isActive: !promotion.isActive } : promotion)),
    )
  }

  const handleDelete = (id: string) => {
    setPromotions((prev) => prev.filter((promotion) => promotion.id !== id))
  }

  const handleEdit = (promotion: Promotion) => {
    setEditingPromotion(promotion)
    setFormData({
      name: promotion.name,
      description: promotion.description,
      type: promotion.type,
      value: promotion.value,
      minOrder: promotion.minOrder,
      startDate: promotion.startDate,
      endDate: promotion.endDate,
      code: promotion.code,
      maxUsage: promotion.maxUsage,
      applicableProducts: promotion.applicableProducts,
    })
    setShowModal(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingPromotion) {
      setPromotions((prev) =>
        prev.map((promotion) => (promotion.id === editingPromotion.id ? { ...promotion, ...formData } : promotion)),
      )
    } else {
      const newPromotion: Promotion = {
        id: Date.now().toString(),
        ...formData,
        isActive: true,
        usageCount: 0,
      }
      setPromotions((prev) => [...prev, newPromotion])
    }

    setShowModal(false)
    setEditingPromotion(null)
    setFormData({
      name: "",
      description: "",
      type: "percentage",
      value: 0,
      minOrder: 0,
      startDate: "",
      endDate: "",
      code: "",
      maxUsage: 100,
      applicableProducts: ["all"],
    })

    setShowConfirmMessage(true)
    setTimeout(() => setShowConfirmMessage(false), 3000)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "percentage":
        return <Percent className="w-4 h-4" />
      case "fixed":
        return <DollarSign className="w-4 h-4" />
      case "bogo":
        return <Gift className="w-4 h-4" />
      case "free_delivery":
        return <Target className="w-4 h-4" />
      default:
        return <Tag className="w-4 h-4" />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "percentage":
        return "Porcentaje"
      case "fixed":
        return "Monto Fijo"
      case "bogo":
        return "Compra y Lleva"
      case "free_delivery":
        return "Envío Gratis"
      default:
        return type
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "percentage":
        return "bg-blue-100 text-blue-800"
      case "fixed":
        return "bg-green-100 text-green-800"
      case "bogo":
        return "bg-purple-100 text-purple-800"
      case "free_delivery":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="w-screen h-screen bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Tag className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Promociones y Ofertas</h1>
              <p className="text-gray-600">Gestiona descuentos y promociones especiales</p>
            </div>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center space-x-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Nueva Promoción</span>
          </button>
        </div>
      </div>

      {/* Mensaje de confirmación */}
      {showConfirmMessage && (
        <div className="absolute top-20 right-6 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center space-x-2">
          <Check className="w-4 h-4" />
          <span>Promoción guardada exitosamente</span>
        </div>
      )}

      {/* Filtros y búsqueda */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar promociones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            {[
              { key: "all", label: "Todas", count: promotions.length },
              { key: "active", label: "Activas", count: promotions.filter((p) => p.isActive).length },
              { key: "inactive", label: "Inactivas", count: promotions.filter((p) => !p.isActive).length },
              {
                key: "percentage",
                label: "Porcentaje",
                count: promotions.filter((p) => p.type === "percentage").length,
              },
              { key: "fixed", label: "Monto Fijo", count: promotions.filter((p) => p.type === "fixed").length },
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setFilterType(filter.key)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterType === filter.key
                    ? "bg-orange-100 text-orange-700"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lista de promociones */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPromotions.map((promotion) => (
            <div key={promotion.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getTypeColor(promotion.type)}`}>{getTypeIcon(promotion.type)}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{promotion.name}</h3>
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(promotion.type)}`}
                    >
                      {getTypeLabel(promotion.type)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleToggleActive(promotion.id)}
                    className={`p-1 rounded ${promotion.isActive ? "text-green-600 hover:bg-green-50" : "text-gray-400 hover:bg-gray-50"}`}
                  >
                    {promotion.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <button onClick={() => handleEdit(promotion)} className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(promotion.id)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4">{promotion.description}</p>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Código:</span>
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">{promotion.code}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Valor:</span>
                  <span className="font-semibold">
                    {promotion.type === "percentage" && `${promotion.value}%`}
                    {promotion.type === "fixed" && `$${promotion.value}`}
                    {promotion.type === "bogo" && `${promotion.value} gratis`}
                    {promotion.type === "free_delivery" && "Envío gratis"}
                  </span>
                </div>

                {promotion.minOrder > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Pedido mínimo:</span>
                    <span>${promotion.minOrder}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    Vigencia:
                  </span>
                  <span>
                    {new Date(promotion.startDate).toLocaleDateString()} -{" "}
                    {new Date(promotion.endDate).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 flex items-center">
                    <Users className="w-3 h-3 mr-1" />
                    Uso:
                  </span>
                  <span>
                    {promotion.usageCount}/{promotion.maxUsage}
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(promotion.usageCount / promotion.maxUsage) * 100}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      promotion.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full mr-1 ${promotion.isActive ? "bg-green-400" : "bg-red-400"}`}
                    ></div>
                    {promotion.isActive ? "Activa" : "Inactiva"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPromotions.length === 0 && (
          <div className="text-center py-12">
            <Tag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron promociones</h3>
            <p className="text-gray-500">Intenta ajustar los filtros o crear una nueva promoción.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingPromotion ? "Editar Promoción" : "Nueva Promoción"}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false)
                  setEditingPromotion(null)
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de la promoción</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Ej: Descuento de Bienvenida"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Código promocional</label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData((prev) => ({ ...prev, code: e.target.value.toUpperCase() }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent font-mono"
                    placeholder="Ej: BIENVENIDA20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Describe los términos y condiciones de la promoción"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de promoción</label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        type: e.target.value as Promotion["type"],
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="percentage">Porcentaje</option>
                    <option value="fixed">Monto Fijo</option>
                    <option value="bogo">Compra y Lleva</option>
                    <option value="free_delivery">Envío Gratis</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Valor</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.value}
                    onChange={(e) => setFormData((prev) => ({ ...prev, value: Number(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder={formData.type === "percentage" ? "20" : "5"}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pedido mínimo ($)</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.minOrder}
                    onChange={(e) => setFormData((prev) => ({ ...prev, minOrder: Number(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de inicio</label>
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData((prev) => ({ ...prev, startDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de fin</label>
                  <input
                    type="date"
                    required
                    value={formData.endDate}
                    onChange={(e) => setFormData((prev) => ({ ...prev, endDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Uso máximo</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.maxUsage}
                    onChange={(e) => setFormData((prev) => ({ ...prev, maxUsage: Number(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="100"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false)
                    setEditingPromotion(null)
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  {editingPromotion ? "Actualizar" : "Crear"} Promoción
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
