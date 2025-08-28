require("dotenv").config();
const app = require("./app");
const { sequelize } = require("./models");
const logger = require("./utils/logger");

const PORT = process.env.PORT || 5000;

// aqui iniciamos  el servidor
const startServer = async () => {
  try {
    await sequelize.authenticate();
    logger.info("✅ Conexión a la base de datos establecida correctamente");

    if (process.env.NODE_ENV === "development") {
      await sequelize.sync({ alter: false });
      logger.info("✅ Modelos sincronizados con la base de datos");
    }

    // Iniciar servidor
    const server = app.listen(PORT, () => {
      logger.info(`🚀 Servidor corriendo en puerto ${PORT}`);
      logger.info(`🌐 Ambiente: ${process.env.NODE_ENV}`);
      logger.info(`📊 API disponible en: http://localhost:${PORT}/api`);
    });

    // Manejo graceful shutdown, osea que se termnine el proceso de manera ordenada
    process.on("SIGTERM", () => {
      logger.info("SIGTERM recibido. Cerrando servidor...");
      server.close(() => {
        logger.info("Servidor cerrado");
        sequelize.close();
        process.exit(0);
      });
    });

    process.on("SIGINT", () => {
      logger.info("SIGINT recibido. Cerrando servidor...");
      server.close(() => {
        logger.info("Servidor cerrado");
        sequelize.close();
        process.exit(0);
      });
    });
  } catch (error) {
    logger.error("❌ Error al iniciar el servidor:", error);
    process.exit(1);
  }
};

startServer();
