import { useState } from "react";
import "../styles/Usuario.css";
import { register } from "../services/auth.js";

export default function Usuario() {
  const [form, setForm] = useState({
    nombreUsuario: "",
    correo: "",
    contraseña: "",
    rol: "Administrador",
  });
  const [mensaje, setMensaje] = useState("");

  // 📌 Manejar cambios en formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  // 📌 Registrar usuario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register(
        form.nombreUsuario,
        form.correo,
        form.contraseña,
        form.rol
      );
      if (res.error) {
        setMensaje("❌ Error: " + res.error);
      } else {
        setMensaje("✅ Usuario registrado correctamente");
        setForm({
          nombreUsuario: "",
          correo: "",
          contraseña: "",
          rol: "Administrador",
        });
      }
    } catch (err) {
      setMensaje("❌ Error al conectar con el servidor");
    }
  };

  return (
    <div className="container">
      <h2>Crear Nuevo Usuario</h2>
      <form id="formUsuario" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombreUsuario">Nombre de Usuario</label>
          <input
            type="text"
            id="nombreUsuario"
            value={form.nombreUsuario}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="correo">Correo Electrónico</label>
          <input
            type="email"
            id="correo"
            value={form.correo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="contraseña">Contraseña</label>
          <input
            type="password"
            id="contraseña"
            value={form.contraseña}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="rol">Rol</label>
          <select id="rol" value={form.rol} onChange={handleChange} required>
            <option value="Administrador">Administrador</option>
            <option value="Cajero">Cajero</option>
            <option value="Gerente">Gerente</option>
          </select>
        </div>

        <button type="submit">Registrar Usuario</button>
        <p id="mensajeUsuario">{mensaje}</p>
      </form>

      {/* Botón para regresar */}
      <div className="back-section">
        <a href="/dashboard" className="back-btn">← Regresar al Dashboard</a>
      </div>
    </div>
  );
}
