import { useState, useEffect } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
  TextField,
  InputAdornment,
  Fab,
  Chip,
  Drawer,
  Alert,
} from "@mui/material"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { ArrowLeft, Search, MapPin, Navigation, Home, Building, ChefHat, Plus, Phone } from "lucide-react"

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

interface Address {
  id: string
  title: string
  subtitle: string
  fullAddress: string
  coordinates: { lat: number; lng: number }
  type: "home" | "work" | "other"
}

interface LocationDetails {
  apartment: string
  floor: string
  references: string
  contactPhone: string
  addressType: "home" | "work" | "other"
  addressLabel: string
}

const mockSearchResults: Address[] = [
  {
    id: "1",
    title: "Av. Principal 123",
    subtitle: "Centro, Ciudad",
    fullAddress: "Av. Principal 123, Centro, Ciudad, CP 12345",
    coordinates: { lat: -34.6037, lng: -58.3816 },
    type: "home",
  },
  {
    id: "2",
    title: "Calle Secundaria 456",
    subtitle: "Zona Norte, Ciudad",
    fullAddress: "Calle Secundaria 456, Zona Norte, Ciudad, CP 12346",
    coordinates: { lat: -34.6047, lng: -58.3826 },
    type: "work",
  },
  {
    id: "3",
    title: "Plaza Central 789",
    subtitle: "Centro Histórico, Ciudad",
    fullAddress: "Plaza Central 789, Centro Histórico, Ciudad, CP 12347",
    coordinates: { lat: -34.6057, lng: -58.3836 },
    type: "other",
  },
]

const savedAddresses: Address[] = [
  {
    id: "saved-1",
    title: "Casa",
    subtitle: "Av. Libertador 1234",
    fullAddress: "Av. Libertador 1234, Palermo, Ciudad",
    coordinates: { lat: -34.5875, lng: -58.4205 },
    type: "home",
  },
  {
    id: "saved-2",
    title: "Trabajo",
    subtitle: "Av. Corrientes 5678",
    fullAddress: "Av. Corrientes 5678, Microcentro, Ciudad",
    coordinates: { lat: -34.6037, lng: -58.3816 },
    type: "work",
  },
]

export default function LocationPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Address[]>([])
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null)
  // Removed unused currentLocation state
  const [isSearching, setIsSearching] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [locationDetails, setLocationDetails] = useState<LocationDetails>({
    apartment: "",
    floor: "",
    references: "",
    contactPhone: "",
    addressType: "home",
    addressLabel: "",
  })
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)

  useEffect(() => {
    if (searchQuery.length > 2) {
      setIsSearching(true)
      // Simular búsqueda con delay
      const timer = setTimeout(() => {
        setSearchResults(
          mockSearchResults.filter((addr) => addr.title.toLowerCase().includes(searchQuery.toLowerCase())),
        )
        setIsSearching(false)
      }, 500)
      return () => clearTimeout(timer)
    } else {
      setSearchResults([])
    }
  }, [searchQuery])

  const getCurrentLocation = () => {
    setIsLoadingLocation(true)
    // Simular obtención de ubicación GPS
    setTimeout(() => {
      // setCurrentLocation({ lat: -34.6037, lng: -58.3816 }) // Removed unused setter
      setSelectedAddress({
        id: "current",
        title: "Tu ubicación actual",
        subtitle: "Ubicación detectada por GPS",
        fullAddress: "Av. Corrientes 1234, Microcentro, Ciudad",
        coordinates: { lat: -34.6037, lng: -58.3816 },
        type: "other",
      })
      setIsLoadingLocation(false)
    }, 2000)
  }

  const handleAddressSelect = (address: Address) => {
    setSelectedAddress(address)
    setSearchQuery("")
    setSearchResults([])
  }

  const handleConfirmLocation = () => {
    if (selectedAddress) {
      setShowDetails(true)
    }
  }

  const handleSaveAddress = () => {
    // Aquí se guardaría la dirección con todos los detalles
    console.log("Guardando dirección:", { selectedAddress, locationDetails })
    // Redirigir de vuelta al carrito o checkout
    window.history.back()
  }

  const getAddressIcon = (type: string) => {
    switch (type) {
      case "home":
        return <Home size={20} />
      case "work":
        return <Building size={20} />
      default:
        return <MapPin size={20} />
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="min-h-screen bg-gray-50 flex flex-col relative">
        {/* Header */}
        <AppBar position="sticky" className="bg-white shadow-sm z-20">
          <Toolbar className="px-4">
            <IconButton onClick={() => window.history.back()} className="mr-2">
              <ArrowLeft size={24} />
            </IconButton>
            <ChefHat size={28} className="text-emerald-500 mr-2" />
            <Typography variant="h6" component="h1" className="font-bold text-emerald-600 flex-grow">
              Ubicación de Entrega
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Search Bar */}
        <div className="bg-white border-b p-4 z-10">
          <TextField
            fullWidth
            placeholder="Buscar dirección..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={20} className="text-gray-400" />
                </InputAdornment>
              ),
            }}
            className="mb-3"
          />

          {/* Saved Addresses */}
          {searchQuery === "" && (
            <div>
              <Typography variant="subtitle2" className="text-gray-600 mb-2 font-medium">
                Direcciones Guardadas
              </Typography>
              <div className="space-y-2">
                {savedAddresses.map((address) => (
                  <div
                    key={address.id}
                    onClick={() => handleAddressSelect(address)}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    <div className="text-emerald-600">{getAddressIcon(address.type)}</div>
                    <div className="flex-grow">
                      <Typography variant="subtitle2" className="font-medium">
                        {address.title}
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        {address.subtitle}
                      </Typography>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="space-y-2">
              <Typography variant="subtitle2" className="text-gray-600 mb-2 font-medium">
                Resultados de Búsqueda
              </Typography>
              {searchResults.map((address) => (
                <div
                  key={address.id}
                  onClick={() => handleAddressSelect(address)}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <MapPin size={20} className="text-gray-400" />
                  <div className="flex-grow">
                    <Typography variant="subtitle2" className="font-medium">
                      {address.title}
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      {address.subtitle}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          )}

          {isSearching && (
            <div className="text-center py-4">
              <Typography variant="body2" className="text-gray-500">
                Buscando direcciones...
              </Typography>
            </div>
          )}
        </div>

        {/* Map Area */}
        <div className="flex-grow relative bg-gradient-to-br from-emerald-100 to-teal-100">
          {/* Simulated Map */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full max-w-4xl mx-auto">
              {/* Grid pattern to simulate map */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: "50px 50px",
                }}
              />

              {/* Streets simulation */}
              <div className="absolute top-1/3 left-0 right-0 h-2 bg-gray-300 opacity-60"></div>
              <div className="absolute top-2/3 left-0 right-0 h-2 bg-gray-300 opacity-60"></div>
              <div className="absolute left-1/4 top-0 bottom-0 w-2 bg-gray-300 opacity-60"></div>
              <div className="absolute left-3/4 top-0 bottom-0 w-2 bg-gray-300 opacity-60"></div>

              {/* Location Pin */}
              {selectedAddress && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full">
                  <div className="relative">
                    <MapPin size={40} className="text-emerald-600 drop-shadow-lg" fill="currentColor" />
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-emerald-600 rounded-full opacity-30 animate-ping"></div>
                  </div>
                </div>
              )}

              {/* Map Controls */}
              <div className="absolute top-4 right-4 space-y-2">
                <Fab
                  size="small"
                  onClick={getCurrentLocation}
                  disabled={isLoadingLocation}
                  className="bg-white hover:bg-gray-50 shadow-lg"
                >
                  <Navigation size={20} className={isLoadingLocation ? "animate-spin" : ""} />
                </Fab>
              </div>

              {/* Zoom Controls */}
              <div className="absolute bottom-20 right-4 flex flex-col space-y-1">
                <Button
                  variant="contained"
                  size="small"
                  className="bg-white text-gray-700 hover:bg-gray-50 shadow-lg min-w-0 w-10 h-10"
                >
                  <Plus size={16} />
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  className="bg-white text-gray-700 hover:bg-gray-50 shadow-lg min-w-0 w-10 h-10"
                >
                  <span className="text-xl leading-none">−</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Current Location Loading */}
          {isLoadingLocation && (
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center z-10">
              <Card className="p-6 text-center">
                <Navigation size={32} className="text-emerald-600 mx-auto mb-2 animate-spin" />
                <Typography variant="body1" className="font-medium">
                  Obteniendo tu ubicación...
                </Typography>
              </Card>
            </div>
          )}
        </div>

        {/* Selected Address Card */}
        {selectedAddress && !showDetails && (
          <Card className="absolute bottom-4 left-4 right-4 z-10 shadow-xl">
            <CardContent className="p-4">
              <div className="flex items-start gap-3 mb-4">
                <MapPin size={24} className="text-emerald-600 mt-1" />
                <div className="flex-grow">
                  <Typography variant="h6" className="font-semibold text-gray-900">
                    {selectedAddress.title}
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    {selectedAddress.fullAddress}
                  </Typography>
                </div>
              </div>

              <Alert severity="info" className="mb-4">
                <Typography variant="body2">
                  Arrastra el pin en el mapa para ajustar la ubicación exacta si es necesario.
                </Typography>
              </Alert>

              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleConfirmLocation}
                className="bg-emerald-500 hover:bg-emerald-600"
              >
                Confirmar Ubicación
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Address Details Drawer */}
        <Drawer
          anchor="bottom"
          open={showDetails}
          onClose={() => setShowDetails(false)}
          PaperProps={{
            className: "rounded-t-2xl max-h-[80vh]",
          }}
        >
          <div className="p-6">
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6"></div>

            <Typography variant="h5" className="font-bold text-gray-900 mb-2">
              Detalles de Entrega
            </Typography>
            <Typography variant="body2" className="text-gray-600 mb-6">
              Completa la información para una entrega precisa
            </Typography>

            {/* Selected Address Summary */}
            <Card className="mb-6 bg-emerald-50 border border-emerald-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <MapPin size={20} className="text-emerald-600" />
                  <div>
                    <Typography variant="subtitle2" className="font-semibold text-emerald-800">
                      {selectedAddress?.title}
                    </Typography>
                    <Typography variant="body2" className="text-emerald-700">
                      {selectedAddress?.fullAddress}
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Address Type */}
            <div className="mb-4">
              <Typography variant="subtitle2" className="font-medium mb-2">
                Tipo de Dirección
              </Typography>
              <div className="flex gap-2">
                {[
                  { value: "home", label: "Casa", icon: <Home size={16} /> },
                  { value: "work", label: "Trabajo", icon: <Building size={16} /> },
                  { value: "other", label: "Otro", icon: <MapPin size={16} /> },
                ].map((type) => (
                  <Chip
                    key={type.value}
                    icon={type.icon}
                    label={type.label}
                    onClick={() => setLocationDetails({ ...locationDetails, addressType: type.value as "home" | "work" | "other" })}
                    color={locationDetails.addressType === type.value ? "primary" : "default"}
                    variant={locationDetails.addressType === type.value ? "filled" : "outlined"}
                    className="cursor-pointer"
                  />
                ))}
              </div>
            </div>

            {/* Address Details Form */}
            <div className="space-y-4 mb-6">
              {locationDetails.addressType === "other" && (
                <TextField
                  fullWidth
                  label="Nombre para esta dirección"
                  value={locationDetails.addressLabel}
                  onChange={(e) => setLocationDetails({ ...locationDetails, addressLabel: e.target.value })}
                  placeholder="Ej: Casa de María, Oficina Centro"
                />
              )}

              <div className="grid grid-cols-2 gap-4">
                <TextField
                  label="Apartamento/Depto"
                  value={locationDetails.apartment}
                  onChange={(e) => setLocationDetails({ ...locationDetails, apartment: e.target.value })}
                  placeholder="Ej: 4B"
                />
                <TextField
                  label="Piso"
                  value={locationDetails.floor}
                  onChange={(e) => setLocationDetails({ ...locationDetails, floor: e.target.value })}
                  placeholder="Ej: 3"
                />
              </div>

              <TextField
                fullWidth
                label="Teléfono de contacto"
                value={locationDetails.contactPhone}
                onChange={(e) => setLocationDetails({ ...locationDetails, contactPhone: e.target.value })}
                placeholder="Ej: +54 11 1234-5678"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone size={16} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Referencias adicionales"
                multiline
                rows={3}
                value={locationDetails.references}
                onChange={(e) => setLocationDetails({ ...locationDetails, references: e.target.value })}
                placeholder="Ej: Portón verde, al lado de la farmacia, timbre 3"
              />
            </div>

            <div className="flex gap-3">
              <Button variant="outlined" onClick={() => setShowDetails(false)} className="flex-1">
                Cancelar
              </Button>
              <Button
                variant="contained"
                onClick={handleSaveAddress}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600"
                disabled={!locationDetails.contactPhone}
              >
                Guardar Dirección
              </Button>
            </div>
          </div>
        </Drawer>
      </div>
    </ThemeProvider>
  )
}
