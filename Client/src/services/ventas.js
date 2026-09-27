const API = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

// 📌 Registrar nueva venta
export async function registrarVenta(productos, metodoPago) {
  const res = await fetch(`${API}/ventas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ productos, metodoPago }),
  });
  return res.json();
}

// 📌 Últimas ventas
export async function ultimasVentas() {
  const res = await fetch(`${API}/ventas/ultimas`, {
    credentials: "include",
  });
  return res.json();
}

// 📌 Productos más vendidos
export async function productosMasVendidos() {
  const res = await fetch(`${API}/ventas/productos-mas-vendidos`, {
    credentials: "include",
  });
  return res.json();
}
