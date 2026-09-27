import Venta from "../models/venta.model.js";
import Proveedor from "../models/supplier.model.js";

// 📌 Registrar nueva venta
export const registrarVenta = async (req, res) => {
  try {
    const { productos, metodoPago } = req.body;
    let totalCompra = 0;
    const detalle = [];

    for (const item of productos) {
      // 🔧 CORREGIDO: usar productoId
      const producto = await Proveedor.findById(item.productoId);
      if (!producto || producto.cantidadProductos < item.cantidad) {
        return res
          .status(400)
          .json({ OK: false, mensaje: "Stock insuficiente" });
      }

      // 🔄 Descontar inventario
      producto.cantidadProductos -= item.cantidad;
      if (producto.cantidadProductos <= 0) {
        await Proveedor.findByIdAndDelete(producto._id);
      } else {
        await producto.save();
      }

      // 📊 Calcular subtotal
      const subtotal = producto.costeProductos * item.cantidad;
      totalCompra += subtotal;

      detalle.push({
        productoId: producto._id,
        nombreProducto: producto.nombresProductos,
        cantidad: item.cantidad,
        costoUnitario: producto.costeProductos,
        subtotal,
      });
    }

    // 📌 Guardar venta
    const nuevaVenta = new Venta({
      productos: detalle,
      totalCompra,
      metodoPago,
    });
    await nuevaVenta.save();

    res.json({ OK: true, detalleVenta: nuevaVenta });
  } catch (error) {
    console.error("Error en registrarVenta:", error);
    res.status(500).json({ OK: false, mensaje: "Error al procesar venta" });
  }
};

// 📌 Últimas ventas
export const ultimasVentas = async (req, res) => {
  try {
    const ventas = await Venta.find().sort({ fecha: -1 }).limit(10);
    const respuesta = ventas.map((v) => ({
      productos: v.productos.map((p) => `${p.nombreProducto} x${p.cantidad}`),
      totalCompra: v.totalCompra,
      fecha: v.fecha,
    }));
    res.json(respuesta);
  } catch (error) {
    res
      .status(500)
      .json({ OK: false, mensaje: "Error al obtener últimas ventas" });
  }
};

// 📌 Productos más vendidos
export const productosMasVendidos = async (req, res) => {
  try {
    const ventas = await Venta.aggregate([
      { $unwind: "$productos" },
      {
        $group: {
          _id: "$productos.nombreProducto",
          cantidad: { $sum: "$productos.cantidad" },
        },
      },
      { $sort: { cantidad: -1 } },
      { $limit: 10 },
    ]);
    res.json(ventas.map((v) => ({ nombre: v._id, cantidad: v.cantidad })));
  } catch (error) {
    res
      .status(500)
      .json({ OK: false, mensaje: "Error al obtener productos más vendidos" });
  }
};
