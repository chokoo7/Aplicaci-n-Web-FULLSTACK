const API = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

// 📌 Login
export async function login(correo, contraseña) {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ correo, contraseña }),
  });
  return res.json();
}

// 📌 Registrar usuario
export async function register(nombreUsuario, correo, contraseña, rol) {
  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombreUsuario, correo, contraseña, rol }),
  });
  return res.json();
}

// 📌 Obtener usuario autenticado
export async function getUsuario() {
  const res = await fetch(`${API}/auth/usuario`, {
    credentials: "include",
  });
  return res.json();
}

// 📌 Logout
export async function logout() {
  const res = await fetch(`${API}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  return res.json();
}
