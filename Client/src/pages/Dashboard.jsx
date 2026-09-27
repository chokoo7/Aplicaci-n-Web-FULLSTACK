import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Chart from "chart.js/auto";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const [usuario, setUsuario] = useState(null);
  const [valorInventario, setValorInventario] = useState(0);
  const [totalProductos, setTotalProductos] = useState(0);
  const [bajoStock, setBajoStock] = useState(0);
  const [ventas, setVentas] = useState([]);
  const chartRef = useRef(null);

  // 📌 Cargar usuario
  const cargarUsuario = async () => {
    const res = await fetch("http://localhost:4000/api/auth/usuario", {
      credentials: "include",
    });
    if (res.ok) {
      const data = await res.json();
      setUsuario(data);
    }
  };

  // 📌 Cargar métricas inventario
  const cargarMetricasInventario = async () => {
    const res = await fetch(
      "http://localhost:4000/api/proveedores/productos/lista",
      { credentials: "include" }
    );
    const productos = await res.json();

    const valorTotal = productos.reduce(
      (acc, p) => acc + p.cantidadProductos * p.costeProductos,
      0
    );
    setValorInventario(valorTotal);
    setTotalProductos(productos.length);
    setBajoStock(productos.filter((p) => p.cantidadProductos <= 5).length);
  };

  // 📌 Cargar ventas
  const cargarVentas = async () => {
    const res = await fetch(
      "http://localhost:4000/api/ventas/productos-mas-vendidos",
      { credentials: "include" }
    );
    const data = await res.json();

    // Renderizar gráfico
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    const ctx = document.getElementById("productosVendidos").getContext("2d");
    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: data.map((p) => p.nombre),
        datasets: [
          {
            label: "Cantidad vendida",
            data: data.map((p) => p.cantidad),
            backgroundColor: "#1089d3",
          },
        ],
      },
    });

    // Últimas ventas
    const res2 = await fetch("http://localhost:4000/api/ventas/ultimas", {
      credentials: "include",
    });
    const ultimas = await res2.json();
    setVentas(ultimas);
  };

  // 📌 Logout
  const logout = async () => {
    const res = await fetch("http://localhost:4000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    if (res.ok) window.location.href = "/login";
  };

  // 📌 useEffect para cargar datos
  useEffect(() => {
    cargarUsuario();
    cargarVentas();
    cargarMetricasInventario();

    const interval = setInterval(() => {
      cargarVentas();
      cargarMetricasInventario();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="user-info">
          <div className="user-details">
            <h4>{usuario?.nombreUsuario || "Usuario"}</h4>
            <p>({usuario?.rol || "Rol"})</p>
          </div>
        </div>

        <nav className="menu">
          <Link to="/inventario"><i className="fas fa-box"></i> Inventario</Link>
          <Link to="/proveedores"><i className="fas fa-truck"></i> Proveedores</Link>
          <Link to="/ventas"><i className="fas fa-cash-register"></i> Ventas</Link>
          
        </nav>

        <button className="logout-btn" onClick={logout}>
          <i className="fas fa-sign-out-alt"></i> Cerrar sesión
        </button>
      </aside>

      {/* Main */}
      <main className="main-content">
        <header className="top-bar">
          <div className="welcome-message">
            <p>Bienvenido a La Esquinita</p>
          </div>
        </header>

        {/* KPIs */}
        <section className="metrics">
          <div className="card kpi azul">
            <h3>Valor inventario</h3>
            <span>${valorInventario.toLocaleString()}</span>
          </div>
          <div className="card kpi verde">
            <h3>Productos en stock</h3>
            <span>{totalProductos}</span>
          </div>
          <div className="card kpi rojo">
            <h3>Bajo stock</h3>
            <span>{bajoStock}</span>
          </div>
        </section>

        {/* Ventas */}
        <section className="ventas-section">
          <div className="ventas-grafica">
            <h3>Productos más vendidos</h3>
            <canvas id="productosVendidos"></canvas>
          </div>
          <div className="ventas-lista">
            <h3>
              Últimas ventas <Link to="/ventas" className="ver-todas">Ver todas</Link>
            </h3>
            <ul>
              {ventas.map((v, i) => (
                <li key={i}>
                  Productos: {v.productos.join(", ")} — ${v.totalCompra} —{" "}
                  {new Date(v.fecha).toLocaleString("es-MX")}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Gestión de usuarios */}
        {usuario?.rol?.toLowerCase() !== "gerente" && (
          <section className="usuarios-section">
            <h3>Gestión de Usuarios</h3>
            <Link to="/usuario" className="btn-usuarios">➕ Crear Nuevo Usuario</Link>
          </section>
        )}
      </main>
    </div>
  );
}
