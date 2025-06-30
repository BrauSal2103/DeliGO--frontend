"use client"

import { useState } from "react"
import { Store, MapPin, Phone, Mail, Clock, Camera, Save, Star, Users, DollarSign, Package } from "lucide-react"

interface RestaurantProfile {
  name: string
  description: string
  address: string
  phone: string
  email: string
  website: string
  cuisine: string
  priceRange: string
  capacity: number
  deliveryRadius: number
  minimumOrder: number
  deliveryFee: number
  estimatedDeliveryTime: string
}

interface RestaurantStats {
  rating: number
  totalReviews: number
  totalOrders: number
  monthlyRevenue: number
}

export default function RestaurantProfilePage() {
  const [profile, setProfile] = useState<RestaurantProfile>({
    name: "Pizzería Don Mario",
    description:
      "Auténtica pizzería italiana con más de 20 años de tradición. Especialistas en pizzas artesanales con ingredientes frescos y de la más alta calidad.",
    address: "Av. Principal 123, Centro, Ciudad",
    phone: "+1 (555) 123-4567",
    email: "info@pizzeriadonmario.com",
    website: "www.pizzeriadonmario.com",
    cuisine: "Italiana",
    priceRange: "$$",
    capacity: 80,
    deliveryRadius: 15,
    minimumOrder: 15,
    deliveryFee: 3.5,
    estimatedDeliveryTime: "25-35 min",
  })

  const [stats] = useState<RestaurantStats>({
    rating: 4.8,
    totalReviews: 1247,
    totalOrders: 8934,
    monthlyRevenue: 45670,
  })

  const [activeTab, setActiveTab] = useState("info")
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")

  const handleInputChange = (field: keyof RestaurantProfile, value: string | number) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simular guardado
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSaving(false)
    setSaveMessage("Perfil actualizado correctamente")
    setTimeout(() => setSaveMessage(""), 3000)
  }

  const cuisineOptions = [
    "Italiana",
    "Mexicana",
    "China",
    "Japonesa",
    "Americana",
    "Mediterránea",
    "India",
    "Tailandesa",
    "Francesa",
    "Árabe",
  ]

  const priceRangeOptions = [
    { value: "$", label: "$ - Económico" },
    { value: "$$", label: "$$ - Moderado" },
    { value: "$$$", label: "$$$ - Caro" },
    { value: "$$$$", label: "$$$$ - Muy Caro" },
  ]

  return (
    <div className="w-screen h-screen bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Store className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Perfil del Restaurante</h1>
              <p className="text-gray-600">Gestiona la información de tu restaurante</p>
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center space-x-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? "Guardando..." : "Guardar Cambios"}</span>
          </button>
        </div>

        {saveMessage && (
          <div className="mt-3 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded">
            {saveMessage}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Calificación</p>
                <div className="flex items-center space-x-1 mt-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-2xl font-bold text-gray-900">{stats.rating}</span>
                </div>
                <p className="text-xs text-gray-500">{stats.totalReviews} reseñas</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pedidos Totales</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalOrders.toLocaleString()}</p>
                <p className="text-xs text-gray-500">Histórico</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ingresos Mensuales</p>
                <p className="text-2xl font-bold text-gray-900">${stats.monthlyRevenue.toLocaleString()}</p>
                <p className="text-xs text-gray-500">Este mes</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Capacidad</p>
                <p className="text-2xl font-bold text-gray-900">{profile.capacity}</p>
                <p className="text-xs text-gray-500">Personas</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab("info")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "info"
                    ? "border-orange-500 text-orange-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Información General
              </button>
              <button
                onClick={() => setActiveTab("delivery")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "delivery"
                    ? "border-orange-500 text-orange-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Configuración de Entrega
              </button>
              <button
                onClick={() => setActiveTab("images")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "images"
                    ? "border-orange-500 text-orange-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Imágenes
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "info" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Restaurante</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Cocina</label>
                    <select
                      value={profile.cuisine}
                      onChange={(e) => handleInputChange("cuisine", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      {cuisineOptions.map((cuisine) => (
                        <option key={cuisine} value={cuisine}>
                          {cuisine}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                  <textarea
                    value={profile.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      Dirección
                    </label>
                    <input
                      type="text"
                      value={profile.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-1" />
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="w-4 h-4 inline mr-1" />
                      Email
                    </label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sitio Web</label>
                    <input
                      type="url"
                      value={profile.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rango de Precios</label>
                    <select
                      value={profile.priceRange}
                      onChange={(e) => handleInputChange("priceRange", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      {priceRangeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Users className="w-4 h-4 inline mr-1" />
                      Capacidad (personas)
                    </label>
                    <input
                      type="number"
                      value={profile.capacity}
                      onChange={(e) => handleInputChange("capacity", Number.parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "delivery" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Radio de Entrega (km)</label>
                    <input
                      type="number"
                      value={profile.deliveryRadius}
                      onChange={(e) => handleInputChange("deliveryRadius", Number.parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pedido Mínimo ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={profile.minimumOrder}
                      onChange={(e) => handleInputChange("minimumOrder", Number.parseFloat(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Costo de Envío ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={profile.deliveryFee}
                      onChange={(e) => handleInputChange("deliveryFee", Number.parseFloat(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Clock className="w-4 h-4 inline mr-1" />
                      Tiempo Estimado de Entrega
                    </label>
                    <input
                      type="text"
                      value={profile.estimatedDeliveryTime}
                      onChange={(e) => handleInputChange("estimatedDeliveryTime", e.target.value)}
                      placeholder="ej: 25-35 min"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-blue-800 mb-2">Información de Entrega</h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• El radio de entrega se calcula desde la ubicación del restaurante</li>
                    <li>• El pedido mínimo ayuda a cubrir los costos operativos</li>
                    <li>• El tiempo estimado debe incluir preparación y entrega</li>
                    <li>• Los costos de envío pueden variar según la distancia</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "images" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Imágenes del Restaurante</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Logo del Restaurante</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                        <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-sm text-gray-600 mb-2">Arrastra tu logo aquí o</p>
                        <button className="text-orange-600 hover:text-orange-700 font-medium">
                          selecciona un archivo
                        </button>
                        <p className="text-xs text-gray-500 mt-2">PNG, JPG hasta 2MB</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Imagen de Portada</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                        <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-sm text-gray-600 mb-2">Arrastra tu imagen aquí o</p>
                        <button className="text-orange-600 hover:text-orange-700 font-medium">
                          selecciona un archivo
                        </button>
                        <p className="text-xs text-gray-500 mt-2">PNG, JPG hasta 5MB</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Galería del Restaurante</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((index) => (
                      <div
                        key={index}
                        className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors"
                      >
                        <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <button className="text-xs text-orange-600 hover:text-orange-700">Agregar imagen</button>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Agrega hasta 8 imágenes de tu restaurante, comida y ambiente
                  </p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-yellow-800 mb-2">Consejos para mejores imágenes</h3>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Usa imágenes de alta calidad y bien iluminadas</li>
                    <li>• Muestra tus platos más populares y atractivos</li>
                    <li>• Incluye fotos del ambiente y decoración</li>
                    <li>• Las imágenes profesionales aumentan las ventas</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
