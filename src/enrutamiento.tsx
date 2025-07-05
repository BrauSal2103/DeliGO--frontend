import Cliente_catalog from './pages/usr_1_cliente/cli_1_catalog'
import Cliente_menu from './pages/usr_1_cliente/cli_2_menu'
import Cliente_carrito from './pages/usr_1_cliente/cli_3_carrito'
import Cliente_mapa from './pages/usr_1_cliente/cli_4_mapa'
import Cliente_pago from './pages/usr_1_cliente/cli_5_pago'
import Cliente_confirmar from './pages/usr_1_cliente/cli_6_confirmar'
import Cliente_tracking from './pages/usr_1_cliente/cli_7_tracking'
import Cliente_historial from './pages/usr_1_cliente/cli_8_historial'
import Repartidor_pedidos from './pages/usr_2_repartidor/rep_1_pedidos'
import Repartidor_detalles from './pages/usr_2_repartidor/rep_2_detalles'
import Repartidor_mapa from './pages/usr_2_repartidor/rep_3_mapa'
import Repartidor_estado from './pages/usr_2_repartidor/rep_4_estado'
import Repartidor_historial from './pages/usr_2_repartidor/rep_5_historial'
import Repartidor_ganancias from './pages/usr_2_repartidor/rep_6_ganancias'
import Gerente_control from './pages/usr_3_gerente/ger_1_control'
import Gerente_crud from './pages/usr_3_gerente/ger_2_crud'
import Gerente_pedidos from './pages/usr_3_gerente/ger_3_pedidos'
import Gerente_horarios from './pages/usr_3_gerente/ger_4_horarios'
import Gerente_promociones from './pages/usr_3_gerente/ger_5_promociones'
import Gerente_tienda from './pages/usr_3_gerente/ger_6_tienda'
import Gerente_opiniones from './pages/usr_3_gerente/ger_7_opiniones'
import Developer_dashboard from './pages/usr_4_developer/dev_1_dashboard'
import Developer_usuarios from './pages/usr_4_developer/dev_2_usuarios'
import Developer_pedidos from './pages/usr_4_developer/dev_3_pedidos'
import Developer_estadisticas from './pages/usr_4_developer/dev_4_estadisticas'
import Developer_promociones from './pages/usr_4_developer/dev_5_promociones'
import Developer_soporte from './pages/usr_4_developer/dev_6_soporte'
import Bienvenida from './pages/bienvenida'
import Login from './pages/login'
import Registro from './pages/registro'
import Notificationes from './pages/notificaciones'
import Perfil from './pages/perfil'
import { Route, Routes } from 'react-router-dom'

export const enrutamiento = () => {
    return (
        <Routes>
        <Route path="/" element={<Bienvenida/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/registro" element={<Registro/>} />
        <Route path="/perfil" element={<Perfil/>} />
        <Route path="/notificaciones" element={<Notificationes/>} />
        <Route path="/cliente/catalogo" element={<Cliente_catalog/>} />
        <Route path="/cliente/menu" element={<Cliente_menu/>} />
        <Route path="/cliente/carrito" element={<Cliente_carrito/>} />
        <Route path="/cliente/mapa" element={<Cliente_mapa/>} />
        <Route path="/cliente/pago" element={<Cliente_pago/>} />
        <Route path="/cliente/confirmar" element={<Cliente_confirmar/>} />
        <Route path="/cliente/tracking" element={<Cliente_tracking/>} />
        <Route path="/cliente/historial" element={<Cliente_historial/>} />
        <Route path="/repartidor/pedidos" element={<Repartidor_pedidos/>} />
        <Route path="/repartidor/detalles" element={<Repartidor_detalles/>} />
        <Route path="/repartidor/mapa" element={<Repartidor_mapa/>} />
        <Route path="/repartidor/estado" element={<Repartidor_estado/>} />
        <Route path="/repartidor/historial" element={<Repartidor_historial/>} />
        <Route path="/repartidor/ganancias" element={<Repartidor_ganancias/>} />
        <Route path="/gerente/control" element={<Gerente_control/>} />
        <Route path="/gerente/crud" element={<Gerente_crud/>} />
        <Route path="/gerente/pedidos" element={<Gerente_pedidos/>} />
        <Route path="/gerente/horarios" element={<Gerente_horarios/>} />
        <Route path="/gerente/promociones" element={<Gerente_promociones/>} />
        <Route path="/gerente/tienda" element={<Gerente_tienda/>} />
        <Route path="/gerente/opiniones" element={<Gerente_opiniones/>} />
        <Route path="/developer/dashboard" element={<Developer_dashboard/>} />
        <Route path="/developer/usuarios" element={<Developer_usuarios/>} />
        <Route path="/developer/pedidos" element={<Developer_pedidos/>} />
        <Route path="/developer/estadisticas" element={<Developer_estadisticas/>} />
        <Route path="/developer/promociones" element={<Developer_promociones/>} />
        <Route path="/developer/soporte" element={<Developer_soporte/>} />
      </Routes>
    )
}