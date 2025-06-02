import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  InputAdornment,
  IconButton
} from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'; // Icono para Nombre de Usuario
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'; // Icono para Contraseña
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'; // Icono para Email

const Registro: React.FC = () => {
  const [formData, setFormData] = useState({
    nombreUsuario: '',
    email: '',
    contrasena: '',
    confirmarContrasena: ''
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de validación y envío al backend
    if (formData.contrasena !== formData.confirmarContrasena) {
      alert('Las contraseñas no coinciden.');
      return;
    }
    console.log('Datos de registro:', formData);
    alert('Usuario registrado con éxito (simulado)!');
    // Redirigir al usuario o mostrar un mensaje de éxito
  };

  return (
    <Box
      className="flex items-center justify-center min-h-screen"
      sx={{
        background: 'linear-gradient(to bottom right, #e0baff, #c2a7f5)', // Degradado púrpura claro
      }}
    >
      <Paper className="p-8 rounded-lg shadow-lg max-w-sm w-full" elevation={8}>
        <Typography variant="h5" className="font-bold text-center mb-6">
          Registrarse
        </Typography>

        <form onSubmit={handleRegister}>
          {/* Nombre de Usuario */}
          <TextField
            fullWidth
            margin="normal"
            label="Nombre de Usuario"
            name="nombreUsuario"
            value={formData.nombreUsuario}
            onChange={handleInputChange}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineIcon />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }} // Más espaciado entre campos
          />

          {/* Email */}
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlinedIcon />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />

          {/* Contraseña */}
          <TextField
            fullWidth
            margin="normal"
            label="Contraseña"
            name="contrasena"
            type={showPassword ? 'text' : 'password'}
            value={formData.contrasena}
            onChange={handleInputChange}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />

          {/* Confirmar Contraseña */}
          <TextField
            fullWidth
            margin="normal"
            label="Confirmar Contraseña"
            name="confirmarContrasena"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmarContrasena}
            onChange={handleInputChange}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirm password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 4 }}
          />

          {/* Botón Registrar */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-4 rounded" // Tailwind classes
            sx={{ textTransform: 'none', mb: 2 }} // Material-UI styles
          >
            Registrarse
          </Button>
        </form>

        {/* Enlace para Iniciar Sesión si ya tiene cuenta */}
        <Box className="flex justify-center items-center text-sm mt-4">
          <Typography variant="body2" className="mr-1">
            ¿Ya tienes una cuenta?
          </Typography>
          <Button
            variant="text"
            className="text-black hover:underline" // Tailwind classes
            sx={{ textTransform: 'none', fontWeight: 'bold' }} // Material-UI styles
            onClick={() => console.log('Navegar a Iniciar Sesión')}
            // Aquí puedes usar Link de react-router-dom: component={Link} to="/login"
          >
            Iniciar Sesión
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Registro;