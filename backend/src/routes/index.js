const express = require("express");
const router = express.Router();

// Importar rutas de módulos
const authRoutes = require("./auth.routes");
const personaRoutes = require("./persona.routes");
const aseguradoRoutes = require("./asegurado.routes");
const fuaRoutes = require("./fua.routes");
const hisRoutes = require("./his.routes");
const indicadoresRoutes = require("./indicadores.routes");
const produccionRoutes = require("./produccion.routes");
const importacionRoutes = require("./importacion.routes");

// Middlewares de autenticación
const { authenticateToken } = require("../middlewares/auth.middleware");
router.use("/auth", authRoutes);
router.use(authenticateToken); // Todas las rutas siguientes requieren autenticación
// Rutas de gestión de personas y asegurados
router.use("/personas", personaRoutes);
router.use("/asegurados", aseguradoRoutes);
// Rutas de atención médica
router.use("/fua", fuaRoutes);
router.use("/his", hisRoutes);
// Rutas de reportes y análisis
router.use("/indicadores", indicadoresRoutes);
router.use("/produccion", produccionRoutes);
// Rutas de administración
router.use("/importacion", importacionRoutes);
// Ruta de información de la API
router.get("/", (req, res) => {
  res.json({
    message: "API Sistema FUA v1.0",
    user: req.user
      ? {
          id: req.user.id,
          nombres: req.user.nombres,
          apellidos: req.user.apellidos,
          rol: req.user.rol.nombre,
          establecimiento: req.user.establecimiento?.nombre,
        }
      : null,
    endpoints: {
      auth: "/api/auth",
      personas: "/api/personas",
      asegurados: "/api/asegurados",
      fua: "/api/fua",
      his: "/api/his",
      indicadores: "/api/indicadores",
      produccion: "/api/produccion",
      importacion: "/api/importacion",
    },
  });
});

module.exports = router;
