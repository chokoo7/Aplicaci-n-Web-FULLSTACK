import express from "express";
import {
  obtenerProveedores,
  obtenerProveedorPorId,
  crearProveedor,
  actualizarProveedor,
  eliminarProveedor,
  obtenerProductos,
  buscarProductoPorNombre,
} from "../controllers/supplier.controller.js";

const router = express.Router();

router.get("/", obtenerProveedores);
router.get("/:id", obtenerProveedorPorId);
router.post("/", crearProveedor);
router.put("/:id", actualizarProveedor);
router.delete("/:id", eliminarProveedor);
router.get("/productos/lista", obtenerProductos);
router.get("/productos/buscar", buscarProductoPorNombre);

export default router;
