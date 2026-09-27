import { useEffect, useState } from "react";
import "../styles/Proveedores.css";

export default function Proveedores() {
  const [proveedores, setProveedores] = useState([]);
  const [form, setForm] = useState({
    nombreProveedor: "",
    nombresProductos: "",
    cantidadProductos: "",
    costeProductos: "",
  });

  // 📌 Cargar lista de proveedores
  const cargarProveedores = async () => {
    const res = await fetch("http://localhost:4000/api/proveedores", {
      credentials: "include",
    });
    if (res.ok) {
      const data = await res.json();
      setProveedores(data);
    }
  };

  // 📌 Manejar cambios en formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  // 📌 Insertar nuevo proveedor
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/api/proveedores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setForm({
        nombreProveedor: "",
        nombresProductos: "",
        cantidadProductos: "",
        costeProductos: "",
      });
      cargarProveedores();
    }
  };

  // 📌 Eliminar proveedor
  const eliminarProveedor = async (id) => {
    const res = await fetch(`http://localhost:4000/api/proveedores/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (res.ok) cargarProveedores();
  };

  useEffect(() => {
    cargarProveedores();
  }, []);

  return (
    <div className="proveedores-page">
      <h1>Gestión de Proveedores e Inventario</h1>

      {/* Botón regresar */}
      <div className="back-section">
        <a href="/dashboard" className="back-btn">← Regresar al Dashboard</a>
      </div>

      {/* Formulario */}
      <form id="form-proveedor" onSubmit={handleSubmit}>
        <h3>Insertar Nuevo Proveedor</h3>

        <label htmlFor="nombreProveedor">Nombre del Proveedor:</label>
        <input
          type="text"
          id="nombreProveedor"
          value={form.nombreProveedor}
          onChange={handleChange}
          required
        />

        <label htmlFor="nombresProductos">Productos a Ofrecer:</label>
        <input
          type="text"
          id="nombresProductos"
          value={form.nombresProductos}
          onChange={handleChange}
          required
        />

        <label htmlFor="cantidadProductos">Cantidad del Producto Disponible:</label>
        <input
          type="number"
          id="cantidadProductos"
          value={form.cantidadProductos}
          onChange={handleChange}
          required
        />

        <label htmlFor="costeProductos">Costo de Producto:</label>
        <input
          type="number"
          id="costeProductos"
          value={form.costeProductos}
          onChange={handleChange}
          required
        />

        <button type="submit">Insertar Proveedor</button>
      </form>

      <hr />

      {/* Tabla de proveedores */}
      <h3>Lista de Proveedores</h3>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID Proveedor</th>
              <th>Nombre</th>
              <th>Productos a Ofrecer</th>
              <th>Cantidad Disponible</th>
              <th>Costo de Producto</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {proveedores.map((p) => (
              <tr key={p._id}>
                <td>{p._id}</td>
                <td>{p.nombreProveedor}</td>
                <td>{p.nombresProductos}</td>
                <td>{p.cantidadProductos}</td>
                <td>{p.costeProductos}</td>
                <td>
                  <button
                    className="btn-eliminar"
                    onClick={() => eliminarProveedor(p._id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {proveedores.length === 0 && (
              <tr>
                <td colSpan="6">No hay proveedores registrados</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
