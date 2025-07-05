"use client"

import { useState } from "react"
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  MoreVertical,
  X,
  Save,
  Upload,
  DollarSign,
  Package,
  ImageIcon,
  Star,
  Clock,
  Users,
} from "lucide-react"

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  available: boolean
  preparationTime: number
  rating: number
  orders: number
}

export default function MenuManagement() {
  //const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [showProductModal, setShowProductModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", name: "Todos", count: 24 },
    { id: "pizzas", name: "Pizzas", count: 8 },
    { id: "burgers", name: "Hamburguesas", count: 6 },
    { id: "pasta", name: "Pastas", count: 5 },
    { id: "drinks", name: "Bebidas", count: 3 },
    { id: "desserts", name: "Postres", count: 2 },
  ]

  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Pizza Margherita",
      description: "Pizza clásica con tomate, mozzarella y albahaca fresca",
      price: 18.99,
      category: "pizzas",
      image: "/placeholder.svg?height=100&width=100",
      available: true,
      preparationTime: 15,
      rating: 4.8,
      orders: 156,
    },
    {
      id: "2",
      name: "Hamburguesa Clásica",
      description: "Carne de res, lechuga, tomate, cebolla y salsa especial",
      price: 14.5,
      category: "burgers",
      image: "/placeholder.svg?height=100&width=100",
      available: true,
      preparationTime: 12,
      rating: 4.6,
      orders: 203,
    },
    {
      id: "3",
      name: "Pasta Carbonara",
      description: "Pasta con salsa cremosa, panceta y queso parmesano",
      price: 16.75,
      category: "pasta",
      image: "/placeholder.svg?height=100&width=100",
      available: false,
      preparationTime: 18,
      rating: 4.7,
      orders: 89,
    },
    {
      id: "4",
      name: "Coca Cola",
      description: "Bebida gaseosa 500ml",
      price: 3.5,
      category: "drinks",
      image: "/placeholder.svg?height=100&width=100",
      available: true,
      preparationTime: 1,
      rating: 4.2,
      orders: 312,
    },
    {
      id: "5",
      name: "Tiramisu",
      description: "Postre italiano con café y mascarpone",
      price: 8.99,
      category: "desserts",
      image: "/placeholder.svg?height=100&width=100",
      available: true,
      preparationTime: 5,
      rating: 4.9,
      orders: 67,
    },
    {
      id: "6",
      name: "Pizza Pepperoni",
      description: "Pizza con pepperoni y queso mozzarella",
      price: 21.99,
      category: "pizzas",
      image: "/placeholder.svg?height=100&width=100",
      available: true,
      preparationTime: 15,
      rating: 4.5,
      orders: 134,
    },
  ])

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "pizzas",
    preparationTime: "",
    image: "",
  })

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleToggleAvailability = (productId: string) => {
    setProducts(
      products.map((product) => (product.id === productId ? { ...product, available: !product.available } : product)),
    )
  }

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter((product) => product.id !== productId))
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setNewProduct({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      preparationTime: product.preparationTime.toString(),
      image: product.image,
    })
    setShowProductModal(true)
  }

  const handleSaveProduct = () => {
    if (editingProduct) {
      // Editar producto existente
      setProducts(
        products.map((product) =>
          product.id === editingProduct.id
            ? {
                ...product,
                name: newProduct.name,
                description: newProduct.description,
                price: Number.parseFloat(newProduct.price),
                category: newProduct.category,
                preparationTime: Number.parseInt(newProduct.preparationTime),
                image: newProduct.image,
              }
            : product,
        ),
      )
    } else {
      // Crear nuevo producto
      const product: Product = {
        id: Date.now().toString(),
        name: newProduct.name,
        description: newProduct.description,
        price: Number.parseFloat(newProduct.price),
        category: newProduct.category,
        image: newProduct.image || "/placeholder.svg?height=100&width=100",
        available: true,
        preparationTime: Number.parseInt(newProduct.preparationTime),
        rating: 0,
        orders: 0,
      }
      setProducts([...products, product])
    }

    setShowProductModal(false)
    setEditingProduct(null)
    setNewProduct({
      name: "",
      description: "",
      price: "",
      category: "pizzas",
      preparationTime: "",
      image: "",
    })
  }

  const handleCloseModal = () => {
    setShowProductModal(false)
    setEditingProduct(null)
    setNewProduct({
      name: "",
      description: "",
      price: "",
      category: "pizzas",
      preparationTime: "",
      image: "",
    })
  }

  return (
    <div className="w-screen h-screen bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <Package className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gestión del Menú</h1>
              <p className="text-sm text-gray-500">Administra los productos de tu restaurante</p>
            </div>
          </div>
          <button
            onClick={() => setShowProductModal(true)}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Producto</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
          >
            <Filter className="w-4 h-4" />
            <span>Filtros</span>
          </button>
        </div>

        {/* Categories Filter */}
        <div className="mt-4 flex space-x-2 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap flex items-center space-x-2 ${
                selectedCategory === category.id
                  ? "bg-orange-100 text-orange-700 border border-orange-200"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <span>{category.name}</span>
              <span className="bg-white px-2 py-0.5 rounded-full text-xs">{category.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Product Image */}
              <div className="relative h-48 bg-gray-100">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 flex space-x-1">
                  <button
                    onClick={() => handleToggleAvailability(product.id)}
                    className={`p-1.5 rounded-full ${
                      product.available ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                    }`}
                  >
                    {product.available ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <div className="relative">
                    <button className="p-1.5 bg-white rounded-full shadow-sm">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div
                  className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium ${
                    product.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
                >
                  {product.available ? "Disponible" : "No disponible"}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-lg">{product.name}</h3>
                  <span className="text-lg font-bold text-orange-600">${product.price}</span>
                </div>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{product.preparationTime} min</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{product.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{product.orders}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="flex-1 bg-blue-50 text-blue-600 py-2 px-3 rounded-lg hover:bg-blue-100 flex items-center justify-center space-x-1"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Editar</span>
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="flex-1 bg-red-50 text-red-600 py-2 px-3 rounded-lg hover:bg-red-100 flex items-center justify-center space-x-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Eliminar</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron productos</h3>
            <p className="text-gray-500">Intenta cambiar los filtros o crear un nuevo producto</p>
          </div>
        )}
      </div>

      {/* Product Modal */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingProduct ? "Editar Producto" : "Nuevo Producto"}
              </h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Product Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Imagen del producto</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <div className="space-y-2">
                    <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 flex items-center space-x-2 mx-auto">
                      <Upload className="w-4 h-4" />
                      <span>Subir imagen</span>
                    </button>
                    <p className="text-sm text-gray-500">PNG, JPG hasta 10MB</p>
                  </div>
                </div>
              </div>

              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del producto *</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Ej: Pizza Margherita"
                />
              </div>

              {/* Product Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descripción *</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Describe los ingredientes y características del producto"
                />
              </div>

              {/* Price and Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Precio *</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="number"
                      step="0.01"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Categoría *</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="pizzas">Pizzas</option>
                    <option value="burgers">Hamburguesas</option>
                    <option value="pasta">Pastas</option>
                    <option value="drinks">Bebidas</option>
                    <option value="desserts">Postres</option>
                  </select>
                </div>
              </div>

              {/* Preparation Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tiempo de preparación (minutos) *
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="number"
                    value={newProduct.preparationTime}
                    onChange={(e) => setNewProduct({ ...newProduct, preparationTime: e.target.value })}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="15"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveProduct}
                disabled={
                  !newProduct.name || !newProduct.description || !newProduct.price || !newProduct.preparationTime
                }
                className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>{editingProduct ? "Guardar Cambios" : "Crear Producto"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
