import { useEffect, useState } from "react";
import "../styles/ventas.css";
import { registrarVenta } from "../services/ventas.js";

export default function Ventas() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [metodoPago, setMetodoPago] = useState("");
  const [ticket, setTicket] = useState(null);

  // 📌 Cargar productos desde backend
  const cargarProductos = async () => {
    const res = await fetch("http://localhost:4000/api/proveedores/productos/lista", {
      credentials: "include",
    });
    if (res.ok) {
      const data = await res.json();
      setProductos(data);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  // 📌 Agregar producto al carrito
  const agregarCarrito = (productoId, cantidad) => {
    const producto = productos.find((p) => p._id === productoId);
    if (!producto) return;

    const subtotal = producto.costeProductos * cantidad;
    setCarrito([...carrito, { ...producto, cantidad, subtotal }]);
  };

  // 📌 Procesar venta
  const pagar = async (e) => {
    e.preventDefault();
    if (carrito.length === 0 || !metodoPago) return;

    const productosVenta = carrito.map((p) => ({
      productoId: p._id,
      cantidad: p.cantidad,
    }));

    const data = await registrarVenta(productosVenta, metodoPago);
    setTicket(data);
    setCarrito([]);
    setMetodoPago("");
  };

  // 📌 Calcular total
  const totalCompra = carrito.reduce((acc, p) => acc + p.subtotal, 0);

  return (
    <div className="container">
      <h2>Registrar Nueva Venta</h2>

      <form onSubmit={pagar}>
        <div className="form-group">
          <label htmlFor="productoId">Seleccionar Producto</label>
          <select id="productoId">
            <option value="">-- Selecciona un artículo --</option>
            {productos.map((p) => (
              <option key={p._id} value={p._id}>
                {p.nombresProductos}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="cantidad">Cantidad</label>
          <input type="number" id="cantidad" min="1" defaultValue="1" />
        </div>

        <div className="form-group">
          <label htmlFor="metodoPago">Método de Pago</label>
          <select
            id="metodoPago"
            value={metodoPago}
            onChange={(e) => setMetodoPago(e.target.value)}
            required
          >
            <option value="">-- Selecciona método --</option>
            <option value="efectivo">Efectivo</option>
            <option value="tarjeta">Tarjeta</option>
          </select>
        </div>

        <button
          type="button"
          id="agregarBtn"
          onClick={() => {
            const productoId = document.getElementById("productoId").value;
            const cantidad = parseInt(document.getElementById("cantidad").value);
            if (productoId && cantidad > 0) agregarCarrito(productoId, cantidad);
          }}
        >
          Agregar al carrito
        </button>
        <button type="submit">Pagar</button>
      </form>

      <h3>Carrito</h3>
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Costo Unitario</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {carrito.map((p, i) => (
            <tr key={i}>
              <td>{p.nombresProductos}</td>
              <td>{p.cantidad}</td>
              <td>${p.costeProductos}</td>
              <td>${p.subtotal}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="total-box">
        Total a pagar: <span id="totalCompra">${totalCompra.toFixed(2)}</span>
      </div>

      {ticket && (
        <div id="ticket" className="ticket-box success">
          <div id="ticketTitle" className="ticket-title">✅ Venta registrada</div>
          <div id="ticketBody">
            Total: ${ticket.totalCompra} <br />
            Fecha: {new Date(ticket.fecha).toLocaleString("es-MX")}
          </div>
        </div>
      )}
    </div>
  );
}
