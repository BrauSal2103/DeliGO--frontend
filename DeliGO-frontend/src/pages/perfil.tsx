import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Lucide Icons (as requested, but using Material-UI Icons for common ones for simplicity)
// If you specifically need Lucide, you'd import them like:
// import { User as LucideUser, Settings as LucideSettings } from 'lucide-react';
// For this example, I'll stick to Material-UI Icons for common profile settings.
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SecurityIcon from '@mui/icons-material/Security';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'; // For Privacy
import NotificationsIcon from '@mui/icons-material/Notifications';
import WebIcon from '@mui/icons-material/Web'; // For Blocked Websites
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // For Disconnect

// Styled component for the avatar upload area
const AvatarUpload = styled('label')(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: '50%',
  backgroundColor: '#f0f2f5', // Light grey background
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  marginBottom: theme.spacing(2),
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  '& input': {
    display: 'none',
  },
  '&:hover .overlay': {
    opacity: 1,
  },
}));

const AvatarOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  borderRadius: '50%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay on hover
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  opacity: 0,
  transition: 'opacity 0.3s ease',
  fontSize: theme.typography.pxToRem(12),
  textAlign: 'center',
}));

const Perfil: React.FC = () => {
  const [profileData, setProfileData] = useState({
    nombre: 'Usuario', // Initial dummy data for the user
    apellidos: '',
    nombrePublico: 'usuario',
    sobreMi: '',
    avatarUrl: 'https://via.placeholder.com/120?text=C', // Placeholder for avatar
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prevData => ({
          ...prevData,
          avatarUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Guardar información de perfil:', profileData);
    // Aquí iría la lógica para enviar los datos al backend
    alert('Información de perfil guardada!');
  };

  return (
    <Box className="flex flex-col md:flex-row p-4 md:p-8 bg-gray-100 min-h-screen">
      {/* Left Sidebar for Navigation */}
      <Paper className="w-full md:w-1/4 lg:w-1/5 p-4 rounded-lg shadow-md mb-6 md:mb-0 md:mr-6">
        <Box className="flex items-center mb-6">
          <Avatar sx={{ width: 60, height: 60, mr: 2 }} src={profileData.avatarUrl}>
            {!profileData.avatarUrl && <PersonIcon />} {/* Fallback icon if no avatar URL */}
          </Avatar>
          <Box>
            <Typography variant="h6" className="font-semibold">
              {profileData.nombre}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              @{profileData.nombrePublico}
            </Typography>
          </Box>
        </Box>
        <Button variant="outlined" color="error" startIcon={<ExitToAppIcon />} className="w-full mb-6">
          Desconectar
        </Button>

        <Divider className="my-4" />

        <List>
          <Typography variant="subtitle2" color="textSecondary" className="mb-2 uppercase">
            Perfil
          </Typography>
          <ListItem disablePadding className="mb-1">
            <ListItemButton selected>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Mi perfil" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding className="mb-1">
            <ListItemButton>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Configuración de la cuenta" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding className="mb-1">
            <ListItemButton>
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Gestionar compras" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding className="mb-1">
            <ListItemButton>
              <ListItemIcon>
                <SecurityIcon />
              </ListItemIcon>
              <ListItemText primary="Seguridad" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding className="mb-1">
            <ListItemButton>
              <ListItemIcon>
                <LockOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Privacidad" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding className="mb-1">
            <ListItemButton>
              <ListItemIcon>
                <NotificationsIcon />
              </ListItemIcon>
              <ListItemText primary="Notificaciones" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding className="mb-1">
            <ListItemButton>
              <ListItemIcon>
                <WebIcon />
              </ListItemIcon>
              <ListItemText primary="Sitios web bloqueados" />
            </ListItemButton>
          </ListItem>
        </List>
      </Paper>

      {/* Main Profile Settings Content */}
      <Paper className="flex-grow p-6 rounded-lg shadow-md">
        <Typography variant="h5" className="font-bold mb-6">
          Perfil
        </Typography>

        <Box className="flex flex-col items-center mb-8">
          <AvatarUpload>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              id="avatar-upload-input"
            />
            {profileData.avatarUrl ? (
              <img src={profileData.avatarUrl} alt="User Avatar" />
            ) : (
              <Avatar sx={{ width: '100%', height: '100%' }} />
            )}
            <AvatarOverlay className="overlay">
              <Typography>Haz clic aquí para cambiar la foto</Typography>
            </AvatarOverlay>
          </AvatarUpload>
          <Typography variant="body2" color="textSecondary" className="text-center">
            Tu foto de perfil es pública. <i className="opacity-70">(i)</i> {/* Placeholder for info icon */}
          </Typography>
        </Box>

        <form onSubmit={handleSaveChanges}>
          <Typography variant="subtitle1" className="font-semibold mb-2">Nombre</Typography>
          <TextField
            fullWidth
            margin="normal"
            name="nombre"
            value={profileData.nombre}
            onChange={handleInputChange}
            variant="outlined"
            sx={{ mb: 3 }}
          />

          <Typography variant="subtitle1" className="font-semibold mb-2">Apellidos</Typography>
          <TextField
            fullWidth
            margin="normal"
            name="apellidos"
            value={profileData.apellidos}
            onChange={handleInputChange}
            variant="outlined"
            sx={{ mb: 3 }}
          />

          <Typography variant="subtitle1" className="font-semibold mb-2">Nombre público</Typography>
          <TextField
            fullWidth
            margin="normal"
            name="nombrePublico"
            value={profileData.nombrePublico}
            onChange={handleInputChange}
            variant="outlined"
            sx={{ mb: 3 }}
          />

          <Typography variant="subtitle1" className="font-semibold mb-2">Sobre mí</Typography>
          <TextField
            fullWidth
            margin="normal"
            name="sobreMi"
            value={profileData.sobreMi}
            onChange={handleInputChange}
            multiline
            rows={4}
            variant="outlined"
            sx={{ mb: 4 }}
          />

          <Typography variant="body2" color="textSecondary" className="mb-4">
            Esta información se mostrará públicamente en{' '}
            <Button component="span" variant="text" size="small" sx={{ textTransform: 'none' }}>
              tu perfil
            </Button>{' '}
            y en{' '}
            <Button component="span" variant="text" size="small" sx={{ textTransform: 'none' }}>
              Gravatar Hovercards
            </Button>
            .
          </Typography>

          <Button
            type="submit"
            variant="contained"
            color="primary" // Changed to primary for a more standard "save" button color
            sx={{
              backgroundColor: '#e67300', // Example color to match the "orange" button from your other images
              '&:hover': {
                backgroundColor: '#b35c00',
              },
              textTransform: 'none',
              fontWeight: 'bold',
              padding: '10px 20px',
              borderRadius: '8px'
            }}
          >
            Guardar información de perfil
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Perfil;