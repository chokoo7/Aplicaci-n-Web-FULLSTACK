import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema({
  nombreUsuario: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  correo: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  contraseña: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    default: "Cajero", // 👈 valor por defecto
    enum: ["Administrador", "Cajero", "Gerente"],
  },
});

export default mongoose.model("Usuario", UsuarioSchema);
