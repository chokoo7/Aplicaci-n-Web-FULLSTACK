// roles.middleware.js
export const soloAdmin = (req, res, next) => {
  if (req.user.rol !== "Administrador") {
    return res
      .status(403)
      .json({ mensaje: "Acción permitida solo para Administrador" });
  }
  next();
};

export const soloGerente = (req, res, next) => {
  if (req.user.rol !== "Gerente") {
    return res
      .status(403)
      .json({ mensaje: "Acción permitida solo para Gerente" });
  }
  next();
};

export const soloLectura = (req, res, next) => {
  if (req.user.rol === "Cajero") {
    return res
      .status(403)
      .json({ mensaje: "Cajero solo puede visualizar, no modificar" });
  }
  next();
};
