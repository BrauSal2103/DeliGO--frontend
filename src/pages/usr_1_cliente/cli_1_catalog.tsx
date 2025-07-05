import type React from "react"

import { useState } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Drawer,
  IconButton,
  Badge,
  Chip,
  TextField,
  Rating,
  Tabs,
  Tab,
  InputAdornment,
} from "@mui/material"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { Search, Heart, Clock, MapPin, Phone, Star, Truck, ChefHat, HeartOff } from "lucide-react"

const theme = createTheme({
  palette: {
    primary: {
      main: "#10b981", // emerald-500
      dark: "#059669", // emerald-600
    },
    secondary: {
      main: "#f59e0b", // amber-500
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
})

interface Restaurant {
  id: number
  name: string
  description: string
  category: string
  image: string
  rating: number
  deliveryTime: string
  deliveryFee: number
  minimumOrder: number
  isOpen: boolean
  featured?: boolean
  address: string
  phone: string
  cuisineTypes: string[]
}

const restaurants: Restaurant[] = [
  {
    id: 1,
    name: "Bella Italia",
    description: "Auténtica cocina italiana con ingredientes frescos importados directamente de Italia",
    category: "Italiana",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.8,
    deliveryTime: "25-35 min",
    deliveryFee: 2.99,
    minimumOrder: 15.0,
    isOpen: true,
    featured: true,
    address: "Av. Roma 456",
    phone: "(555) 234-5678",
    cuisineTypes: ["Italiana", "Pizza", "Pasta"],
  },
  {
    id: 2,
    name: "Taco Loco",
    description: "Los mejores tacos y comida mexicana tradicional de la ciudad",
    category: "Mexicana",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.6,
    deliveryTime: "20-30 min",
    deliveryFee: 1.99,
    minimumOrder: 12.0,
    isOpen: true,
    address: "Calle México 789",
    phone: "(555) 345-6789",
    cuisineTypes: ["Mexicana", "Tacos", "Antojitos"],
  },
  {
    id: 3,
    name: "Sushi Zen",
    description: "Sushi fresco y cocina japonesa contemporánea preparada por chefs expertos",
    category: "Japonesa",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.9,
    deliveryTime: "30-45 min",
    deliveryFee: 3.99,
    minimumOrder: 20.0,
    isOpen: true,
    featured: true,
    address: "Av. Japón 321",
    phone: "(555) 456-7890",
    cuisineTypes: ["Japonesa", "Sushi", "Asiática"],
  },
  {
    id: 4,
    name: "Burger House",
    description: "Hamburguesas gourmet con carne premium y ingredientes artesanales",
    category: "Americana",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.5,
    deliveryTime: "15-25 min",
    deliveryFee: 2.49,
    minimumOrder: 10.0,
    isOpen: true,
    address: "Av. América 654",
    phone: "(555) 567-8901",
    cuisineTypes: ["Americana", "Hamburguesas", "Comida Rápida"],
  },
  {
    id: 5,
    name: "Dragon Palace",
    description: "Cocina china auténtica con recetas tradicionales y sabores únicos",
    category: "China",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.4,
    deliveryTime: "25-40 min",
    deliveryFee: 2.99,
    minimumOrder: 18.0,
    isOpen: false,
    address: "Calle China 987",
    phone: "(555) 678-9012",
    cuisineTypes: ["China", "Asiática", "Dim Sum"],
  },
  {
    id: 6,
    name: "Green Garden",
    description: "Comida saludable, vegana y vegetariana con ingredientes orgánicos",
    category: "Saludable",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.7,
    deliveryTime: "20-30 min",
    deliveryFee: 1.99,
    minimumOrder: 14.0,
    isOpen: true,
    address: "Av. Verde 147",
    phone: "(555) 789-0123",
    cuisineTypes: ["Saludable", "Vegana", "Vegetariana"],
  },
  {
    id: 7,
    name: "Le Petit Bistro",
    description: "Elegante cocina francesa con platos refinados y ambiente romántico",
    category: "Francesa",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.8,
    deliveryTime: "35-50 min",
    deliveryFee: 4.99,
    minimumOrder: 25.0,
    isOpen: true,
    featured: true,
    address: "Av. París 258",
    phone: "(555) 890-1234",
    cuisineTypes: ["Francesa", "Gourmet", "Europea"],
  },
  {
    id: 8,
    name: "Spice Route",
    description: "Auténtica cocina india con especias tradicionales y curries aromáticos",
    category: "India",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.6,
    deliveryTime: "30-40 min",
    deliveryFee: 3.49,
    minimumOrder: 16.0,
    isOpen: true,
    address: "Calle India 369",
    phone: "(555) 901-2345",
    cuisineTypes: ["India", "Curry", "Especias"],
  },
]

const categories = ["Todos", "Italiana", "Mexicana", "Japonesa", "Americana", "China", "Saludable", "Francesa", "India"]

export default function DeliGORestaurants() {
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [favorites, setFavorites] = useState<number[]>([])
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesCategory = selectedCategory === "Todos" || restaurant.category === selectedCategory
    const matchesSearch =
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisineTypes.some((type) => type.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const toggleFavorite = (restaurantId: number) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(restaurantId)) {
        return prevFavorites.filter((id) => id !== restaurantId)
      } else {
        return [...prevFavorites, restaurantId]
      }
    })
  }

  const favoriteRestaurants = restaurants.filter((restaurant) => favorites.includes(restaurant.id))

  const handleCategoryChange = (_: React.SyntheticEvent, newValue: string) => {
    setSelectedCategory(newValue)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="w-screen h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <AppBar position="sticky" className="bg-white shadow-sm">
          <Toolbar className="px-4 lg:px-8">
            <div className="flex items-center flex-grow">
              <ChefHat size={32} className="text-emerald-500" />
              <Typography variant="h5" component="h1" className="ml-2 font-bold text-emerald-600">
                DeliGO
              </Typography>
              <div className="ml-8 hidden md:flex items-center gap-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={16} />
                  <Typography variant="body2">Entrega en toda la ciudad</Typography>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone size={16} />
                  <Typography variant="body2">(555) 000-DELI</Typography>
                </div>
              </div>
            </div>

            <IconButton
              onClick={() => setIsFavoritesOpen(true)}
              className="border border-emerald-500 text-emerald-600 hover:bg-emerald-50"
            >
              <Badge badgeContent={favorites.length} color="primary">
                <Heart size={20} />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center">
            <Typography variant="h2" component="h2" className="font-bold mb-4 text-4xl lg:text-6xl">
              ¡Descubre los mejores restaurantes!
            </Typography>
            <Typography variant="h5" className="mb-8 text-xl lg:text-2xl opacity-90">
              Explora una gran variedad de cocinas y sabores únicos cerca de ti
            </Typography>
            <div className="flex justify-center gap-8 flex-wrap text-lg">
              <div className="flex items-center gap-2">
                <Truck size={24} />
                <span>Entrega rápida</span>
              </div>
              <div className="flex items-center gap-2">
                <Star size={24} fill="currentColor" />
                <span>+500 restaurantes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white border-b py-4">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <TextField
              fullWidth
              placeholder="Buscar restaurantes, cocinas o platos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={20} className="text-gray-400" />
                  </InputAdornment>
                ),
              }}
              className="max-w-2xl mx-auto"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="sticky top-16 z-30 bg-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <Tabs
              value={selectedCategory}
              onChange={handleCategoryChange}
              variant="scrollable"
              scrollButtons="auto"
              className="py-2"
            >
              {categories.map((category) => (
                <Tab key={category} label={category} value={category} className="min-w-fit px-6" />
              ))}
            </Tabs>
          </div>
        </div>

        {/* Restaurant Cards */}
        <main className="flex-grow max-w-7xl mx-auto w-full px-4 lg:px-8 py-8">
          {filteredRestaurants.length === 0 ? (
            <div className="text-center py-16">
              <Search size={64} className="text-gray-300 mx-auto mb-4" />
              <Typography variant="h6" className="text-gray-500 mb-2">
                No se encontraron restaurantes
              </Typography>
              <Typography variant="body2" className="text-gray-400">
                Intenta con otros términos de búsqueda o categorías
              </Typography>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {filteredRestaurants.map((restaurant) => (
                <Card
                  key={restaurant.id}
                  className="h-full flex flex-col hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative">
                    <CardMedia
                      component="img"
                      height="200"
                      image={restaurant.image}
                      alt={restaurant.name}
                      className="h-48 object-cover"
                    />
                    {restaurant.featured && (
                      <Chip
                        label="Destacado"
                        color="secondary"
                        size="small"
                        className="absolute top-2 left-2 bg-amber-500 text-white"
                      />
                    )}
                    <IconButton
                      onClick={() => toggleFavorite(restaurant.id)}
                      className={`absolute top-2 right-2 ${
                        favorites.includes(restaurant.id)
                          ? "bg-red-500 text-white hover:bg-red-600"
                          : "bg-white text-gray-600 hover:bg-gray-100"
                      }`}
                      size="small"
                    >
                      <Heart size={16} fill={favorites.includes(restaurant.id) ? "currentColor" : "none"} />
                    </IconButton>
                    {!restaurant.isOpen && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <Chip label="Cerrado" className="bg-red-600 text-white" />
                      </div>
                    )}
                  </div>
                  <CardContent className="flex-grow p-4">
                    <div className="flex justify-between items-start mb-2">
                      <Typography variant="h6" component="h3" className="font-bold text-gray-900 flex-grow pr-2">
                        {restaurant.name}
                      </Typography>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Rating value={restaurant.rating} precision={0.1} size="small" readOnly />
                        <Typography variant="body2" className="text-gray-600 text-sm">
                          {restaurant.rating}
                        </Typography>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {restaurant.cuisineTypes.slice(0, 2).map((type) => (
                        <Chip key={type} label={type} size="small" variant="outlined" className="text-xs" />
                      ))}
                    </div>

                    <Typography variant="body2" className="text-gray-600 mb-3 line-clamp-2">
                      {restaurant.description}
                    </Typography>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-1 text-gray-500">
                          <Clock size={14} />
                          <span>{restaurant.deliveryTime}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <Truck size={14} />
                          <span>${restaurant.deliveryFee.toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">Pedido mínimo: ${restaurant.minimumOrder.toFixed(2)}</div>
                    </div>
                  </CardContent>
                  <CardActions className="p-4 pt-0">
                    <Button
                      variant="contained"
                      fullWidth
                      disabled={!restaurant.isOpen}
                      className={`py-2 font-medium ${
                        restaurant.isOpen ? "bg-emerald-500 hover:bg-emerald-600" : "bg-gray-300 text-gray-500"
                      }`}
                    >
                      {restaurant.isOpen ? "Ver Menú" : "Cerrado"}
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </div>
          )}
        </main>

        {/* Favorites Drawer */}
        <Drawer
          anchor="right"
          open={isFavoritesOpen}
          onClose={() => setIsFavoritesOpen(false)}
          className="z-50"
          PaperProps={{
            className: "w-full sm:w-96 lg:w-[28rem]",
          }}
        >
          <div className="h-full flex flex-col">
            <div className="p-6 border-b">
              <Typography variant="h5" className="font-bold text-gray-900 mb-1">
                Mis Favoritos
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                Tus restaurantes favoritos guardados
              </Typography>
            </div>

            <div className="flex-grow overflow-auto p-6">
              {favoriteRestaurants.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <HeartOff size={64} className="text-gray-300 mb-4" />
                  <Typography className="text-gray-500 text-lg">No tienes favoritos</Typography>
                  <Typography variant="body2" className="text-gray-400 mt-2">
                    Agrega restaurantes a tus favoritos tocando el corazón
                  </Typography>
                </div>
              ) : (
                <div className="space-y-4">
                  {favoriteRestaurants.map((restaurant) => (
                    <div key={restaurant.id} className="bg-gray-50 rounded-lg p-4 border">
                      <div className="flex items-start gap-3">
                        <img
                          src={restaurant.image || "/placeholder.svg"}
                          alt={restaurant.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-grow">
                          <Typography variant="subtitle1" className="font-semibold text-gray-900">
                            {restaurant.name}
                          </Typography>
                          <div className="flex items-center gap-1 mb-1">
                            <Rating value={restaurant.rating} precision={0.1} size="small" readOnly />
                            <Typography variant="body2" className="text-gray-600 text-sm">
                              {restaurant.rating}
                            </Typography>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock size={12} />
                              {restaurant.deliveryTime}
                            </span>
                            <span className="flex items-center gap-1">
                              <Truck size={12} />${restaurant.deliveryFee.toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <IconButton
                          onClick={() => toggleFavorite(restaurant.id)}
                          className="text-red-500 hover:bg-red-50"
                          size="small"
                        >
                          <Heart size={16} fill="currentColor" />
                        </IconButton>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Drawer>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 mt-auto">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center mb-4">
                  <ChefHat size={28} className="text-emerald-400" />
                  <Typography variant="h6" className="ml-2 font-bold">
                    DeliGO
                  </Typography>
                </div>
                <Typography variant="body2" className="text-gray-300 leading-relaxed">
                  Tu plataforma de delivery favorita. Conectamos los mejores restaurantes con tu mesa.
                </Typography>
              </div>
              <div>
                <Typography variant="h6" className="font-bold mb-4">
                  Para Restaurantes
                </Typography>
                <div className="space-y-2 text-gray-300 text-sm">
                  <p>Únete a DeliGO</p>
                  <p>Portal de Socios</p>
                  <p>Herramientas de Marketing</p>
                </div>
              </div>
              <div>
                <Typography variant="h6" className="font-bold mb-4">
                  Soporte
                </Typography>
                <div className="space-y-2 text-gray-300 text-sm">
                  <p>Centro de Ayuda</p>
                  <p>Contacto</p>
                  <p>Términos y Condiciones</p>
                </div>
              </div>
              <div>
                <Typography variant="h6" className="font-bold mb-4">
                  Contacto
                </Typography>
                <div className="space-y-2 text-gray-300 text-sm">
                  <p className="flex items-center gap-2">
                    <Phone size={14} />
                    (555) 000-DELI
                  </p>
                  <p>✉️ hola@deligo.com</p>
                  <p>🕒 24/7 Disponible</p>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center">
              <Typography variant="body2" className="text-gray-400">
                © 2024 DeliGO. Todos los derechos reservados.
              </Typography>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  )
}