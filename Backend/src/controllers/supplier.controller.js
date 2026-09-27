import Proveedor from "../models/supplier.model.js";

// Obtener todos los proveedores
export const obtenerProveedores = async (req, res) => {
  try {
    const proveedores = await Proveedor.find();
    res.status(200).json(proveedores);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al obtener proveedores", error: error.message });
  }
};

// Obtener proveedor por ID
export const obtenerProveedorPorId = async (req, res) => {
  try {
    const proveedor = await Proveedor.findById(req.params.id);
    if (!proveedor)
      return res.status(404).json({ mensaje: "Proveedor no encontrado" });
    res.status(200).json(proveedor);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al buscar proveedor", error: error.message });
  }
};

// Crear proveedor
export const crearProveedor = async (req, res) => {
  try {
    const nuevoProveedor = new Proveedor(req.body);
    const proveedorGuardado = await nuevoProveedor.save();
    res.status(201).json({
      mensaje: "Proveedor creado correctamente",
      proveedor: proveedorGuardado,
    });
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: "Error al crear proveedor", error: error.message });
  }
};

// Actualizar proveedor
export const actualizarProveedor = async (req, res) => {
  try {
    const proveedorActualizado = await Proveedor.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!proveedorActualizado)
      return res.status(404).json({ mensaje: "Proveedor no encontrado" });
    res.status(200).json({
      mensaje: "Proveedor actualizado correctamente",
      proveedor: proveedorActualizado,
    });
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: "Error al actualizar proveedor", error: error.message });
  }
};

// Eliminar proveedor
export const eliminarProveedor = async (req, res) => {
  try {
    const proveedorEliminado = await Proveedor.findByIdAndDelete(req.params.id);
    if (!proveedorEliminado)
      return res.status(404).json({ mensaje: "Proveedor no encontrado" });
    res.status(200).json({ mensaje: "Proveedor eliminado correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al eliminar proveedor", error: error.message });
  }
};

// Obtener solo productos con cantidad y costo (incluye _id)
export const obtenerProductos = async (req, res) => {
  try {
    const productos = await Proveedor.find(
      {},
      "_id nombresProductos cantidadProductos costeProductos",
    );
    res.status(200).json(productos);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al obtener productos", error: error.message });
  }
};

// Buscar producto por nombre
export const buscarProductoPorNombre = async (req, res) => {
  try {
    const { nombre } = req.query;
    if (!nombre)
      return res.status(400).json({ mensaje: "Debes proporcionar un nombre" });

    const productos = await Proveedor.find(
      { nombresProductos: { $regex: nombre, $options: "i" } },
      "_id nombresProductos cantidadProductos costeProductos",
    );

    if (productos.length === 0)
      return res.status(404).json({ mensaje: "No se encontraron productos" });

    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al buscar producto por nombre",
      error: error.message,
    });
  }
};
