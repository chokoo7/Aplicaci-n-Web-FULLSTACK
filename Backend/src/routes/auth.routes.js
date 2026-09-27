import express from "express";
import {
  registrarUsuario,
  loginUsuario,
  obtenerUsuario,
  logoutUsuario,
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js"; // 👈 importa el middleware

const router = express.Router();

router.post("/register", registrarUsuario);
router.post("/login", loginUsuario);
router.get("/usuario", authRequired, obtenerUsuario); // 👈 protege la ruta
router.post("/logout", logoutUsuario);

export default router;
