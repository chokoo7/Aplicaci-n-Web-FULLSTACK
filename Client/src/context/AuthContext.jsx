import { createContext, useContext, useState, useEffect } from "react";
import { getUsuario, login as loginApi, logout as logoutApi } from "../services/auth.js";


const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔎 Verificar sesión al cargar la app
  useEffect(() => {
    const checkSession = async () => {
      try {
        const data = await getUsuario(); // usa tu helper
        if (data.mensaje === "No autorizado") {
          setUser(null);
        } else {
          setUser(data);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  const login = async (correo, contraseña) => {
    const data = await loginApi(correo, contraseña);
    if (data.mensaje === "Login exitoso") {
      const usuario = await getUsuario();
      setUser(usuario);
    }
    return data;
  };

  const logout = async () => {
    await logoutApi();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
