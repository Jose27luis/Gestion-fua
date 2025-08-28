const logger = require("../utils/logger");
const { HTTP_STATUS, MESSAGES } = require("../config/constants");

const errorHandler = (error, req, res, next) => {
  let statusCode = error.statusCode || HTTP_STATUS.INTERNAL_ERROR;
  let message = error.message || MESSAGES.ERROR;

  // Log del error
  logger.error("Error capturado:", {
    error: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get("User-Agent"),
  });

  // Errores de Sequelize
  if (error.name === "SequelizeValidationError") {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    message = error.errors.map((err) => err.message).join(", ");
  }

  if (error.name === "SequelizeUniqueConstraintError") {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    message = "Ya existe un registro con estos datos";
  }

  if (error.name === "SequelizeForeignKeyConstraintError") {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    message = "Error de referencia en los datos";
  }

  // Error de JWT
  if (error.name === "JsonWebTokenError") {
    statusCode = HTTP_STATUS.UNAUTHORIZED;
    message = "Token inválido";
  }

  if (error.name === "TokenExpiredError") {
    statusCode = HTTP_STATUS.UNAUTHORIZED;
    message = "Token expirado";
  }

  // Error de validación de express-validator
  if (error.type === "validation") {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    message = error.errors;
  }

  // Respuesta de error
  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && {
      stack: error.stack,
      error: error,
    }),
  });
};

module.exports = errorHandler;
