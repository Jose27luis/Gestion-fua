const winston = require("winston");
const path = require("path");

// Crear directorio de logs si no existe
const fs = require("fs");
const logDir = path.join(__dirname, "../../logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Configuración del logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: "sistema-fua" },
  transports: [
    // Escribir logs de error a archivo
    new winston.transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error",
    }),
    // Escribir todos los logs a archivo combinado
    new winston.transports.File({
      filename: path.join(logDir, "combined.log"),
    }),
  ],
});

// Si no estamos en producción, también loggear a consola
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  );
}

module.exports = logger;
