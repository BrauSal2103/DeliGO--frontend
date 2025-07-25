
import type React from "react"

import { useState, useEffect } from "react"
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
  Divider,
  Rating,
  Tabs,
  Tab,
} from "@mui/material"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { ShoppingCart, Star, Clock, MapPin, Phone, Plus, Minus, Utensils } from "lucide-react"

const theme = createTheme({
  palette: {
    primary: {
      main: "#ea580c", // orange-600
      dark: "#c2410c", // orange-700
    },
    secondary: {
      main: "#dc2626", // red-600
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
})


// Tipo para productos de la API
interface Product {
  id_product: number;
  name: string;
  price: number;
}

interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  category: string
  image: string
  rating: number
  prepTime: string
  popular?: boolean
}

interface CartItem extends MenuItem {
  quantity: number
}



export default function RestaurantOrdering() {
  // Estado para productos
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Puedes cambiar la URL por la de tu API real
  useEffect(() => {
    fetch('http://localhost:8080/deligo/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoadingProducts(false);
      })
      .catch(() => setLoadingProducts(false));
  }, []);

  // Adaptar productos de la API al formato de MenuItem
  const menuItems: MenuItem[] = products.map((product) => ({
    id: product.id_product,
    name: product.name,
    description: '', // Puedes agregar descripción si tu API la provee
    price: product.price,
    category: getCategoryFromName(product.name), // Asigna categorías según el nombre
    image: '/placeholder.svg?height=200&width=300',
    rating: 4.5, // Valor por defecto o puedes agregarlo si tu API lo provee
    prepTime: '10-20 min', // Valor por defecto o puedes agregarlo si tu API lo provee
  }));

  const categories = ["Todos", "Pizzas", "Hamburguesas", "Ensaladas", "Pastas", "Mexicana", "Sushi", "Postres", "Bebidas"]
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [customerAddress, setCustomerAddress] = useState("")
  const [orderNotes, setOrderNotes] = useState("")


  const filteredItems =
    selectedCategory === "Todos" ? menuItems : menuItems.filter((item) => item.category === selectedCategory)

  const addToCart = (item: MenuItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        )
      } else {
        return [...prevCart, { ...item, quantity: 1 }]
      }
    })
  }

  function getCategoryFromName(name: string): string {
  const n = name.toLowerCase();
  if (n.includes("pizza")) return "Pizzas";
  if (n.includes("hamburguesa")) return "Hamburguesas";
  if (n.includes("ensalada")) return "Ensaladas";
  if (n.includes("pasta") || n.includes("tallarines")) return "Pastas";
  if (n.includes("taco") || n.includes("mexic")) return "Mexicana";
  if (n.includes("sushi")) return "Sushi";
  if (n.includes("postre") || n.includes("helado") || n.includes("tiramisú") || n.includes("mazamorra")) return "Postres";
  if (n.includes("bebida") || n.includes("jugo") || n.includes("coca") || n.includes("chicha") || n.includes("limonada") || n.includes("café")) return "Bebidas";
  return "Otros";
}

  const removeFromCart = (id: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === id)
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((cartItem) =>
          cartItem.id === id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem,
        )
      } else {
        return prevCart.filter((cartItem) => cartItem.id !== id)
      }
    })
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const handleCategoryChange = (_: React.SyntheticEvent, newValue: string) => {
    setSelectedCategory(newValue)
  }

  const handleConfirmOrder = () => {
    if (customerAddress.trim() === "") {
      alert("Por favor, ingresa una dirección de entrega.")
      return
    }
    // Aquí puedes agregar la lógica para enviar el pedido al backend
    alert(`Pedido confirmado! Total: $${getTotalPrice().toFixed(2)}\nDirección: ${customerAddress}\nNotas: ${orderNotes}`)
    setCart([])
    setIsCartOpen(false)
    setCustomerAddress("")
    setOrderNotes("")

    // add logic to send order to backend
    // fetch('http://localhost:8080/deligo/orders', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     items: cart,
    //     address: customerAddress,
    //     notes: orderNotes,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     alert(`Pedido confirmado! Total: $${getTotalPrice().toFixed(2)}\nDirección: ${customerAddress}\nNotas: ${orderNotes}`)
    //     setCart([])
    //     setIsCartOpen(false)
    //     setCustomerAddress("")
    //     setOrderNotes("")
    //   })
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="w-screen h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <AppBar position="sticky" className="bg-white shadow-sm">
          <Toolbar className="px-4 lg:px-8">
            <div className="flex items-center flex-grow">
              <Utensils size={32} className="text-orange-600" />
              <Typography variant="h5" component="h1" className="ml-2 font-bold text-orange-600">
                Sabor Express
              </Typography>
              <div className="ml-8 hidden md:flex items-center gap-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={16} />
                  <Typography variant="body2">Av. Principal 123</Typography>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone size={16} />
                  <Typography variant="body2">(555) 123-4567</Typography>
                </div>
              </div>
            </div>

            <IconButton
              onClick={() => setIsCartOpen(true)}
              className="border border-orange-600 text-orange-600 hover:bg-orange-50"
            >
              <Badge badgeContent={getTotalItems()} color="primary">
                <ShoppingCart size={20} />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center">
            <Typography variant="h2" component="h2" className="font-bold mb-4 text-4xl lg:text-6xl">
              ¡Deliciosa comida a domicilio!
            </Typography>
            <Typography variant="h5" className="mb-8 text-xl lg:text-2xl opacity-90">
              Ordena tus platillos favoritos desde la comodidad de tu hogar
            </Typography>
            <div className="flex justify-center gap-8 flex-wrap text-lg">
              <div className="flex items-center gap-2">
                <Clock size={24} />
                <span>Entrega en 30-45 min</span>
              </div>
              <div className="flex items-center gap-2">
                <Star size={24} fill="currentColor" />
                <span>4.8 estrellas</span>
              </div>
            </div>
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

        {/* Menu Items */}
        <main className="flex-grow max-w-7xl mx-auto w-full px-4 lg:px-8 py-8">
          {loadingProducts ? (
            <Typography>Cargando productos...</Typography>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-16">
              <Typography variant="h6" className="text-gray-500 mb-2">
                No se encontraron productos
              </Typography>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {filteredItems.map((item) => (
                <Card key={item.id} className="h-full flex flex-col hover:shadow-xl transition-shadow duration-300">
                  <div className="relative">
                    <CardMedia
                      component="img"
                      height="200"
                      image={item.image}
                      alt={item.name}
                      className="h-48 object-cover"
                    />
                    {item.popular && (
                      <Chip
                        label="Popular"
                        color="primary"
                        size="small"
                        className="absolute top-2 left-2 bg-orange-600 text-white"
                      />
                    )}
                  </div>
                  <CardContent className="flex-grow p-4">
                    <div className="flex justify-between items-start mb-2">
                      <Typography variant="h6" component="h3" className="font-bold text-gray-900 flex-grow pr-2">
                        {item.name}
                      </Typography>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Rating value={item.rating} precision={0.1} size="small" readOnly />
                        <Typography variant="body2" className="text-gray-600 text-sm">
                          {item.rating}
                        </Typography>
                      </div>
                    </div>
                    <Typography variant="body2" className="text-gray-600 mb-3 line-clamp-2">
                      {item.description}
                    </Typography>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1 text-gray-500">
                        <Clock size={14} />
                        <Typography variant="body2" className="text-sm">
                          {item.prepTime}
                        </Typography>
                      </div>
                      <Typography variant="h6" className="font-bold text-orange-600">
                        ${item.price.toFixed(2)}
                      </Typography>
                    </div>
                  </CardContent>
                  <CardActions className="p-4 pt-0">
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => addToCart(item)}
                      className="bg-orange-600 hover:bg-orange-700 py-2 font-medium"
                    >
                      Agregar al carrito
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </div>
          )}
        </main>

        {/* Cart Drawer */}
        <Drawer
          anchor="right"
          open={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          className="z-50"
          PaperProps={{
            className: "w-full sm:w-96 lg:w-[28rem]",
          }}
        >
          <div className="h-full flex flex-col">
            <div className="p-6 border-b">
              <Typography variant="h5" className="font-bold text-gray-900 mb-1">
                Tu Pedido
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                Revisa tu pedido antes de confirmar
              </Typography>
            </div>

            <div className="flex-grow overflow-auto p-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingCart size={64} className="text-gray-300 mb-4" />
                  <Typography className="text-gray-500 text-lg">Tu carrito está vacío</Typography>
                  <Typography variant="body2" className="text-gray-400 mt-2">
                    Agrega algunos productos deliciosos
                  </Typography>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="bg-gray-50 rounded-lg p-4 border">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-grow pr-4">
                          <Typography variant="subtitle1" className="font-semibold text-gray-900">
                            {item.name}
                          </Typography>
                          <Typography variant="body2" className="text-gray-600">
                            ${item.price.toFixed(2)} c/u
                          </Typography>
                        </div>
                        <div className="flex items-center gap-3 bg-white rounded-lg border p-1">
                          <IconButton
                            size="small"
                            onClick={() => removeFromCart(item.id)}
                            className="hover:bg-gray-100"
                          >
                            <Minus size={16} />
                          </IconButton>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <IconButton size="small" onClick={() => addToCart(item)} className="hover:bg-gray-100">
                            <Plus size={16} />
                          </IconButton>
                        </div>
                      </div>
                      <div className="text-right">
                        <Typography variant="body2" className="font-semibold text-orange-600">
                          Subtotal: ${(item.price * item.quantity).toFixed(2)}
                        </Typography>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t bg-white p-6">
                <div className="flex justify-between items-center mb-6 text-xl">
                  <Typography variant="h6" className="font-bold">
                    Total:
                  </Typography>
                  <Typography variant="h6" className="font-bold text-orange-600">
                    ${getTotalPrice().toFixed(2)}
                  </Typography>
                </div>

                <div className="space-y-4">
                  <TextField
                    fullWidth
                    label="Dirección de entrega"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    variant="outlined"
                    required
                  />
                  <TextField
                    fullWidth
                    label="Notas especiales (opcional)"
                    multiline
                    rows={3}
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    variant="outlined"
                  />
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    className="bg-orange-600 hover:bg-orange-700 py-3 text-lg font-semibold"
                    onClick={handleConfirmOrder}
                    disabled={!customerAddress.trim()}
                  >
                    Confirmar Pedido - ${getTotalPrice().toFixed(2)}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Drawer>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 mt-auto">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center mb-4">
                  <Utensils size={28} className="text-orange-500" />
                  <Typography variant="h6" className="ml-2 font-bold">
                    Sabor Express
                  </Typography>
                </div>
                <Typography variant="body2" className="text-gray-300 leading-relaxed">
                  La mejor comida a domicilio de la ciudad. Ingredientes frescos y sabores auténticos que llegan directo
                  a tu puerta.
                </Typography>
              </div>
              <div>
                <Typography variant="h6" className="font-bold mb-4">
                  Contacto
                </Typography>
                <div className="space-y-2 text-gray-300">
                  <p className="flex items-center gap-2">
                    <MapPin size={16} />
                    Av. Principal 123, Ciudad
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone size={16} />
                    (555) 123-4567
                  </p>
                  <p>✉️ info@saborexpress.com</p>
                </div>
              </div>
              <div>
                <Typography variant="h6" className="font-bold mb-4">
                  Horarios
                </Typography>
                <div className="space-y-2 text-gray-300">
                  <p>Lunes - Viernes: 11:00 - 23:00</p>
                  <p>Sábados: 12:00 - 24:00</p>
                  <p>Domingos: 12:00 - 22:00</p>
                </div>
              </div>
            </div>
            <Divider className="my-8 bg-gray-700" />
            <Typography variant="body2" className="text-center text-gray-400">
              © 2024 Sabor Express. Todos los derechos reservados.
            </Typography>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  )
}
