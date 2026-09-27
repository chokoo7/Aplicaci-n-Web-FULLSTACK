import { useEffect, useState } from "react";
import "../styles/Inventario.css";

export default function Inventario() {
  const [productos, setProductos] = useState([]);
  const [search, setSearch] = useState("");

  // 📌 Cargar inventario desde backend
  const cargarInventario = async () => {
    const res = await fetch("http://localhost:4000/api/proveedores/productos/lista", {
      credentials: "include",
    });
    if (res.ok) {
      const data = await res.json();
      setProductos(data);
    }
  };

  useEffect(() => {
    cargarInventario();
  }, []);

  // 📌 Métricas
  const valorInventario = productos.reduce(
    (acc, p) => acc + p.cantidadProductos * p.costeProductos,
    0
  );
  const totalProductos = productos.length;
  const bajoStock = productos.filter((p) => p.cantidadProductos <= 5).length;

  // 📌 Filtrar productos por búsqueda
  const productosFiltrados = productos.filter(
    (p) =>
      p.nombresProductos.toLowerCase().includes(search.toLowerCase()) ||
      p._id.toLowerCase().includes(search.toLowerCase())
  );

  // 📌 Eliminar producto
  const eliminarProducto = async (id) => {
    const res = await fetch(`http://localhost:4000/api/proveedores/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (res.ok) cargarInventario();
  };

  return (
    <div className="container">
      {/* Botón regresar */}
      <div className="back-section">
        <a href="/dashboard" className="back-btn">← Volver</a>
      </div>

      <h1 className="heading">Inventario</h1>

      {/* Métricas */}
      <div className="metrics">
        <div className="card">
          <h3>Valor del inventario</h3>
          <span id="valorInventario">${valorInventario.toLocaleString()}</span>
        </div>
        <div className="card">
          <h3>Productos en stock</h3>
          <span id="totalProductos">{totalProductos}</span>
        </div>
        <div className="card">
          <h3>Bajo stock</h3>
          <span id="bajoStock">{bajoStock}</span>
        </div>
      </div>

      {/* Barra de búsqueda */}
      <div className="search-section">
        <input
          type="text"
          placeholder="Buscar producto o código..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Tabla */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Costo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.map((p) => (
              <tr
                key={p._id}
                className={p.cantidadProductos <= 5 ? "low-stock" : ""}
              >
                <td>{p.nombresProductos}</td>
                <td>{p.cantidadProductos}</td>
                <td>${p.costeProductos}</td>
                <td>
                  <button
                    className="eliminar btn"
                    onClick={() => eliminarProducto(p._id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {productosFiltrados.length === 0 && (
              <tr>
                <td colSpan="4">No hay productos disponibles</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      
    </div>
    
  );
}
