import Usuario from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

// 📌 Registrar usuario
export const registrarUsuario = async (req, res) => {
  try {
    const { nombreUsuario, correo, contraseña, rol } = req.body;
    const existe = await Usuario.findOne({ correo });
    if (existe)
      return res.status(400).json({ mensaje: "El correo ya está registrado" });

    const hash = await bcrypt.hash(contraseña, 10);
    const nuevoUsuario = new Usuario({
      nombreUsuario,
      correo,
      contraseña: hash,
      rol,
    });
    await nuevoUsuario.save();

    res.status(201).json({ mensaje: "Usuario registrado correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al registrar usuario", error: error.message });
  }
};

// 📌 Login usuario
export const loginUsuario = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;
    const usuario = await Usuario.findOne({ correo });
    if (!usuario)
      return res.status(404).json({ mensaje: "Usuario no encontrado" });

    const valido = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!valido)
      return res.status(401).json({ mensaje: "Contraseña incorrecta" });

    const token = await createAccessToken({
      id: usuario._id,
      nombreUsuario: usuario.nombreUsuario,
      rol: usuario.rol,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // en producción debe ser true con HTTPS
      sameSite: "none", // permite compartir cookie entre frontend y backend
    });

    res.status(200).json({
      mensaje: "Login exitoso",
      token,
      usuario: {
        nombreUsuario: usuario.nombreUsuario,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error en login", error: error.message });
  }
};

// 📌 Obtener usuario autenticado
export const obtenerUsuario = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ mensaje: "No autorizado" });

    const decoded = jwt.verify(token, TOKEN_SECRET);
    const usuario = await Usuario.findById(decoded.id).select(
      "nombreUsuario rol correo",
    );
    res.status(200).json(usuario);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al obtener usuario", error: error.message });
  }
};

// 📌 Logout usuario
export const logoutUsuario = (req, res) => {
  try {
    res.clearCookie("token"); // ✅ elimina la cookie
    res.status(200).json({ mensaje: "Sesión cerrada correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al cerrar sesión" });
  }
};
