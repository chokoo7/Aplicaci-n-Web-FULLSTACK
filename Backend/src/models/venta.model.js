import mongoose from "mongoose";

const DetalleVentaSchema = new mongoose.Schema({
  productoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Proveedor",
    required: true,
  },
  nombreProducto: { type: String, required: true },
  cantidad: { type: Number, required: true },
  costoUnitario: { type: Number, required: true },
  subtotal: { type: Number, required: true },
});

const VentaSchema = new mongoose.Schema({
  productos: [DetalleVentaSchema],
  totalCompra: { type: Number, required: true },
  metodoPago: { type: String, enum: ["efectivo", "tarjeta"], required: true },
  fecha: { type: Date, default: Date.now }, // ✅ fecha automática
});

export default mongoose.model("Venta", VentaSchema);
