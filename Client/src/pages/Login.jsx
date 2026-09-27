import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import "../styles/login.css";

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await login(correo, contraseña);

    if (data.mensaje === "Login exitoso") {
      window.location.href = "/dashboard";
    } else {
      setError(data.mensaje || "Error en login");
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
            placeholder="ejemplo@correo.com"
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
            placeholder="••••••••"
          />
        </div>

        <button type="submit" className="btn-submit">Ingresar</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}
