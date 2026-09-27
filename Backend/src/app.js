import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRutas from "./routes/auth.routes.js";
import proveedorRutas from "./routes/supplier.routes.js";
import ventaRutas from "./routes/ventas.routes.js";
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5500"],
    credentials: true,
  }),
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// Rutas
app.use("/api/auth", authRutas);
app.use("/api/proveedores", proveedorRutas);
app.use("/api/ventas", ventaRutas);
export default app;
