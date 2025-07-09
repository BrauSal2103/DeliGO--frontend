import { useState } from 'react';
import { Eye, EyeOff, User, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, TextField, InputAdornment, IconButton, Box } from '@mui/material';
import { api } from './services/api';


const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      const payload = {
        address: formData.username,
        password: formData.password
      };
      const response = await api.post('/login', payload);
      localStorage.setItem('token', response.data.token);
        
      navigate('/perfil');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
      // console.log(formData)
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-br from-orange-300 to-sky-300">
      <Box
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.25)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          padding: 4,
          width: { xs: '90%', sm: '70%', md: '50%', lg: '40%', xl: '30%' },
          maxWidth: '400px',
          maxHeight: '450px',
          aspectRatio: '1/1',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-black mb-2">Iniciar sesión</h2>
        </div>

        {/* Login Form */}
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: '300px' }}>
          {/* Username Field */}
          <TextField
            fullWidth
            label="Nombre de Usuario"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            variant="outlined"
            sx={{
              marginBottom: 3,
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                '& fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.3)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.8)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.8)',
                },
              },
              '& .MuiInputBase-input': {
                color: 'black',
                paddingLeft: '10px',
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(0, 0, 0, 0.5)',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'black',
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <User className="text-black/70" size={20} />
                </InputAdornment>
              ),
            }}
          />

          {/* Password Field */}
          <TextField
            fullWidth
            label="Contraseña"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleInputChange}
            variant="outlined"
            sx={{
              marginBottom: 4,
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                '& fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.3)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.8)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.8)',
                },
              },
              '& .MuiInputBase-input': {
                color: 'black',
                paddingLeft: '10px',
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(0, 0, 0, 0.5)',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'black',
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock className="text-black/70" size={20} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{ color: 'rgba(0, 0, 0, 0.7)' }}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Mensaje de error */}
          {error && (
            <div style={{ color: 'red', marginBottom: 12, textAlign: 'center' }}>{error}</div>
          )}
          {/* Login Button */}
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              textTransform: "none",
              backgroundColor: "#000000",
              width: "100%",
              marginBottom: "1rem",
              borderRadius: "12px",
              paddingY: '12px',
              '&:hover': {
                backgroundColor: '#333333',
              },
            }}>
            {loading ? 'Ingresando...' : 'Ingresar'}
          </Button>

          {/* Register Link */}
          <div className="text-center">
            <span className="text-black/70 text-sm">No tiene una cuenta? </span>
            <Button
              variant="contained"
              component={Link}
              to={"/registro"}
              sx={{
                textTransform: "none",
                backgroundColor: "#000000",
                borderRadius: "12px",
                paddingX: '15px',
                '&:hover': {
                  backgroundColor: '#333333',
                },
              }}>
              Registrarse
            </Button>
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default Login;