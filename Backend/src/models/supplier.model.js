import mongoose from "mongoose";

const ProveedorSchema = new mongoose.Schema({
  nombreProveedor: {
    type: String,
    required: true,
    trim: true,
  },
  nombresProductos: {
    type: String,
    required: true,
    trim: true,
  },
  cantidadProductos: {
    type: Number,
    required: true,
  },
  costeProductos: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Proveedor", ProveedorSchema);
