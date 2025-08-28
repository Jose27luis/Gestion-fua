const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const path = require("path");

// Middlewares personalizados
const errorHandler = require("./src/middlewares/error.middleware");
const logger = require("./utils/logger");

// Rutas
const routes = require("./routes");

const app = express();

// Seguridad
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// Compresión
app.use(compression());

// Rate Limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutos
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: {
    error: "Demasiadas peticiones desde esta IP, intente nuevamente más tarde.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api/", limiter);

// Logging HTTP
if (process.env.NODE_ENV === "development") {
  app.use(
    morgan("combined", {
      stream: { write: (message) => logger.info(message.trim()) },
    })
  );
}

// Parsing
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Archivos estáticos
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    version: process.env.npm_package_version || "1.0.0",
  });
});

// API Routes
app.use("/api", routes);

// Ruta por defecto
app.get("/", (req, res) => {
  res.json({
    message: "API Sistema FUA - Formato Único de Atención",
    version: "1.0.0",
    documentation: "/api/docs",
    health: "/health",
  });
});

// Manejo de rutas no encontradas
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint no encontrado",
    path: req.originalUrl,
  });
});
app.use(errorHandler);

module.exports = app;
