import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Inventario from "./pages/Inventario.jsx";
import Proveedores from "./pages/Proveedores.jsx";
import Ventas from "./pages/Ventas.jsx";
import EntradasSalidas from "./pages/EntradaSalidas.jsx";
import Usuario from "./pages/Usuario.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta inicial: redirige al login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Páginas principales */}
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inventario" element={<Inventario />} />
        <Route path="/proveedores" element={<Proveedores />} />
        <Route path="/ventas" element={<Ventas />} />
        <Route path="/entradas-salidas" element={<EntradasSalidas />} />
        <Route path="/usuario" element={<Usuario />} />

        {/* Ruta por defecto si no existe */}
        <Route path="*" element={<h2>Página no encontrada</h2>} />
      </Routes>
    </BrowserRouter>
  );
}
