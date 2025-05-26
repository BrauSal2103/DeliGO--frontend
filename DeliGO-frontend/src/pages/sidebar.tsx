import * as React from 'react';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Button, ListItem } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import BadgeIcon from '@mui/icons-material/Badge';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { Link } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const drawerWidth = 240;

 {/*<Route path="/" element={<Bienvenida/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/registro" element={<Registro/>} />
        <Route path="/perfil" element={<Perfil/>} />
        /notificaciones*/}

const clienteRoutes = {
  "Catálogo": "/cliente/catalogo",
  "Menú": "/cliente/menu",
  "Carrito": "/cliente/carrito",
  "Mapa": "/cliente/mapa",
  "Método de Pago": "/cliente/pago",
  "Confirmar pedido": "/cliente/confirmar",
  "Tracking": "/cliente/tracking",
  "Historial de pedidos": "/cliente/historial"
};

const repartidorRoutes = {
  "Pedidos": "/repartidor/pedidos",
  "Detalles": "/repartidor/detalles",
  "Mapa": "/repartidor/mapa",
  "Estado": "/repartidor/estado",
  "Historial": "/repartidor/historial",
  "Ganancias": "/repartidor/ganancias",
};

const gerenteRoutes = {
  "Control": "/gerente/control",
  "CRUD": "/gerente/crud",
  "Pedidos": "/gerente/pedidos",
  "Horarios": "/gerente/horarios",
  "Promociones": "/gerente/promociones",
  "Tienda": "/gerente/tienda",
  "Opiniones": "/gerente/opiniones",
};

const developerRoutes = {
  "Dashboard": "/developer/dashboard",
  "Usuarios": "/developer/usuarios",
  "Pedidos": "/developer/pedidos",
  "Estadísticas": "/developer/estadisticas",
  "Promociones": "/developer/promociones",
  "Soporte": "/developer/soporte",
};

export default function Sidebar() {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [openCliente, setOpenCliente] = React.useState(false);
  const [openRepartidor, setOpenRepartidor] = React.useState(false);
  const [openGerente, setOpenGerente] = React.useState(false);
  const [openDesarrollador, setOpenDesarrollador] = React.useState(false);

  React.useEffect(() => {
  if (!openDrawer) {
    setOpenCliente(false);
    setOpenRepartidor(false);
    setOpenGerente(false);
    setOpenDesarrollador(false);
  }}, [openDrawer]);

  const handleDrawerOpen = () => setOpenDrawer(true);
  const handleDrawerClose = () => setOpenDrawer(false);

  return (
    <Box sx={{ display: 'flex', width:'100%' }}>
      {/* AppBar */}
      <MuiAppBar
        position="fixed"
        sx={{
          backgroundColor: 'green', // Color azul personalizado
          color: 'white',
          zIndex: 1201,
          transition: 'width 225ms ease-out, margin 225ms ease-out',
          ...(openDrawer && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
          }),
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ marginRight: 5, ...(openDrawer && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Button variant="text"
            component={Link}
            to={"/"}
            style={{
              color: 'inherit',
              textTransform: 'none',
              font: 'roboto',
              fontWeight: 'bold',
              fontSize: 20
            }}>
              DeliGO
          </Button>
          <IconButton
            color="inherit"
            aria-label="notificaciones"
            size="large"
            component={Link}
            to="/notificaciones"
            sx={{ marginLeft: 'auto' }}
            >
            <NotificationsIcon />
          </IconButton>
        </Toolbar>
      </MuiAppBar>

      {/* Drawer */}
      <MuiDrawer
        variant="permanent"
        open={openDrawer}
        sx={{
          flexShrink: 0,
          whiteSpace: 'nowrap',
          boxSizing: 'border-box',
          ...(openDrawer
            ? {
                width: drawerWidth,
                '& .MuiDrawer-paper': {
                  width: drawerWidth,
                  transition: 'width 225ms ease-out',
                  overflowX: 'hidden',
                },
              }
            : {
                width: 56,
                '& .MuiDrawer-paper': {
                  width: 56,
                  transition: 'width 195ms ease-in',
                  overflowX: 'hidden',
                },
              }),
        }}
      >
        {/* Encabezado del Drawer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            height: 64,
            padding: '0 8px',
          }}
        >
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>

        <Divider />

        {/* Cliente */}
        <List>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton onClick={() => {
              if (!openDrawer) setOpenDrawer(true);
              setOpenCliente(!openCliente);
            }} sx={{minHeight: 48, px: 2.5, justifyContent: openDrawer ? 'initial' : 'center'}}>
              <ListItemIcon sx={{minWidth: 0, mr: openDrawer ? 3 : 'auto', justifyContent: 'center'}}>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText primary={"Cliente"} sx={{ opacity: openDrawer ? 1 : 0 }} />
              {openDrawer && (openCliente ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
            <Collapse in={openCliente} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {Object.entries(clienteRoutes).map(([text, path]) => (
                  <ListItemButton
                    key={text}
                    component={Link}
                    to={path}
                    sx={{ pl: 4 }}
                  >
                    <ListItemText primary={text} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </ListItem>
        </List>

        <Divider />

        {/* Repartidor */}
        <List>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton onClick={() => {
              if (!openDrawer) setOpenDrawer(true);
              setOpenRepartidor(!openRepartidor);
            }} sx={{minHeight: 48, px: 2.5, justifyContent: openDrawer ? 'initial' : 'center'}}>
              <ListItemIcon sx={{minWidth: 0, mr: openDrawer ? 3 : 'auto', justifyContent: 'center'}}>
                <DeliveryDiningIcon />
              </ListItemIcon>
              <ListItemText primary={"Repartidor"} sx={{ opacity: openDrawer ? 1 : 0 }} />
              {openDrawer && (openRepartidor ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
            <Collapse in={openRepartidor} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {Object.entries(repartidorRoutes).map(([text, path]) => (
                  <ListItemButton
                    key={text}
                    component={Link}
                    to={path}
                    sx={{ pl: 4 }}
                  >
                    <ListItemText primary={text} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </ListItem>
        </List>

        <Divider />

        {/* Gerente */}
        <List>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton onClick={() => {
              if (!openDrawer) setOpenDrawer(true);
              setOpenGerente(!openGerente);
            }} sx={{minHeight: 48, px: 2.5, justifyContent: openDrawer ? 'initial' : 'center'}}>
              <ListItemIcon sx={{minWidth: 0, mr: openDrawer ? 3 : 'auto', justifyContent: 'center'}}>
                <BadgeIcon />
              </ListItemIcon>
              <ListItemText primary={"Gerente"} sx={{ opacity: openDrawer ? 1 : 0 }} />
              {openDrawer && (openGerente ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
            <Collapse in={openGerente} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {Object.entries(gerenteRoutes).map(([text, path]) => (
                  <ListItemButton
                    key={text}
                    component={Link}
                    to={path}
                    sx={{ pl: 4 }}
                  >
                    <ListItemText primary={text} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </ListItem>
        </List>

        <Divider />

        {/* Desarrollador */}
        <List>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton onClick={() => {
              if (!openDrawer) setOpenDrawer(true);
              setOpenDesarrollador(!openDesarrollador);
            }} sx={{minHeight: 48, px: 2.5, justifyContent: openDrawer ? 'initial' : 'center'}}>
              <ListItemIcon sx={{minWidth: 0, mr: openDrawer ? 3 : 'auto', justifyContent: 'center'}}>
                <AdminPanelSettingsIcon />
              </ListItemIcon>
              <ListItemText primary={"Desarrollador"} sx={{ opacity: openDrawer ? 1 : 0 }} />
              {openDrawer && (openDesarrollador ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
            <Collapse in={openDesarrollador} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {Object.entries(developerRoutes).map(([text, path]) => (
                  <ListItemButton
                    key={text}
                    component={Link}
                    to={path}
                    sx={{ pl: 4 }}
                  >
                    <ListItemText primary={text} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton onClick={() => {
              if (!openDrawer) setOpenDrawer(true);}}
              component={Link} to={"/perfil"}
              sx={{minHeight: 48, px: 2.5, justifyContent: openDrawer ? 'initial' : 'center'}}>
              <ListItemIcon sx={{minWidth: 0, mr: openDrawer ? 3 : 'auto', justifyContent: 'center'}}>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary={"Perfil"} sx={{ opacity: openDrawer ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </MuiDrawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <div style={{ height: 64 }} />
        {/* Aquí va el contenido principal */}
      </Box>
    </Box>
  );
}