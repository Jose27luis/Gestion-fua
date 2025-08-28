const jwt = require("jsonwebtoken");
const { HTTP_STATUS } = require("../config/constants");
const { Usuario } = require("../models");
const logger = require("../utils/logger");

// Verificar token JWT
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: "Token de acceso requerido",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Buscar usuario en la base de datos
    const user = await Usuario.findByPk(decoded.id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          association: "rol",
          attributes: ["id", "codigo", "nombre"],
        },
        {
          association: "establecimiento",
          attributes: ["id", "nombre", "codigo_renaes"],
        },
      ],
    });

    if (!user || !user.activo) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: "Usuario no válido o inactivo",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    logger.error("Error en autenticación:", error);
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: "Token inválido",
    });
  }
};
// Verificar roles específicos
const requireRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: "Usuario no autenticado",
      });
    }

    if (!roles.includes(req.user.rol.codigo)) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({
        success: false,
        message: "No tiene permisos para esta acción",
      });
    }

    next();
  };
};

// Verificar que pertenece al mismo establecimiento
const requireSameEstablishment = (req, res, next) => {
  const userEstablishment = req.user.establecimiento_id;
  const requestedEstablishment =
    req.params.establishmentId || req.body.establecimiento_id;

  if (req.user.rol.codigo === "admin") {
    return next(); // Los admins pueden acceder a todo
  }

  if (userEstablishment !== parseInt(requestedEstablishment)) {
    return res.status(HTTP_STATUS.FORBIDDEN).json({
      success: false,
      message: "No puede acceder a datos de otro establecimiento",
    });
  }

  next();
};

module.exports = {
  authenticateToken,
  requireRoles,
  requireSameEstablishment,
};
