import express from "express";
import {
  registrarVenta,
  ultimasVentas,
  productosMasVendidos,
} from "../controllers/ventas.controller.js";

const router = express.Router();

router.post("/", registrarVenta);
router.get("/ultimas", ultimasVentas);
router.get("/productos-mas-vendidos", productosMasVendidos);

export default router;
