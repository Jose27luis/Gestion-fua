const { sequelize } = require("../models");
const logger = require("../utils/logger");

// Importar seeders
const rolesSeeder = require("./roles.seeder");
const establecimientosSeeder = require("./establecimientos.seeder");
const usuariosSeeder = require("./usuarios.seeder");
const serviciosSeeder = require("./servicios.seeder");

const runSeeders = async () => {
  try {
    logger.info("🚀 Iniciando proceso de seeders...");

    // Verificar conexión a la base de datos
    await sequelize.authenticate();
    logger.info("✅ Conexión a la base de datos establecida");

    // Ejecutar seeders en orden de dependencias
    logger.info("1/4 Ejecutando seeder de roles y profesiones...");
    await rolesSeeder();

    logger.info("2/4 Ejecutando seeder de establecimientos...");
    await establecimientosSeeder();

    logger.info("3/4 Ejecutando seeder de usuarios...");
    await usuariosSeeder();

    logger.info("4/4 Ejecutando seeder de servicios...");
    await serviciosSeeder();

    logger.info("🎉 Todos los seeders completados exitosamente");

    // Mostrar resumen final
    await showSummary();
  } catch (error) {
    logger.error("❌ Error ejecutando seeders:", error);
    process.exit(1);
  } finally {
    await sequelize.close();
    logger.info("🔌 Conexión a la base de datos cerrada");
    process.exit(0);
  }
};

// Función para mostrar resumen de datos insertados
const showSummary = async () => {
  try {
    const {
      Usuario,
      Role,
      EstablecimientoSalud,
      Servicio,
      Profesion,
    } = require("../models");

    const totalUsuarios = await Usuario.count();
    const totalRoles = await Role.count();
    const totalEstablecimientos = await EstablecimientoSalud.count();
    const totalServicios = await Servicio.count();
    const totalProfesiones = await Profesion.count();

    logger.info("");
    logger.info("📊 RESUMEN FINAL:");
    logger.info("================");
    logger.info(`   👥 Usuarios: ${totalUsuarios}`);
    logger.info(`   🎭 Roles: ${totalRoles}`);
    logger.info(`   👨‍⚕️ Profesiones: ${totalProfesiones}`);
    logger.info(`   🏥 Establecimientos: ${totalEstablecimientos}`);
    logger.info(`   🩺 Servicios: ${totalServicios}`);
    logger.info("");

    // Mostrar usuarios creados para login
    logger.info("👤 USUARIOS PARA LOGIN:");
    logger.info("=======================");
    logger.info("   Admin:     DNI: 12345678, Password: admin123");
    logger.info("   Médico:    DNI: 87654321, Password: medico123");
    logger.info("   Digitador: DNI: 11223344, Password: digitador123");
    logger.info("");
  } catch (error) {
    logger.error("Error mostrando resumen:", error);
  }
};

// Función para limpiar todas las tablas (útil para desarrollo)
const cleanDatabase = async () => {
  try {
    logger.info("🧹 Limpiando base de datos...");

    // Obtener todos los modelos
    const models = Object.keys(sequelize.models);

    // Desactivar restricciones de foreign key temporalmente
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");

    // Truncar todas las tablas
    for (const modelName of models) {
      await sequelize.models[modelName].destroy({
        where: {},
        force: true,
        truncate: true,
      });
      logger.info(`   🗑️  Tabla ${modelName} limpiada`);
    }

    // Reactivar restricciones de foreign key
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");

    logger.info("✅ Base de datos limpiada exitosamente");
  } catch (error) {
    logger.error("❌ Error limpiando base de datos:", error);
    throw error;
  }
};

// Función para ejecutar seeders con opción de limpiar primero
const runSeedersWithOptions = async (options = {}) => {
  const { clean = false } = options;

  try {
    // Verificar conexión
    await sequelize.authenticate();
    logger.info("✅ Conexión a la base de datos establecida");

    // Limpiar base de datos si se solicita
    if (clean) {
      await cleanDatabase();
    }

    // Ejecutar seeders normalmente
    await runSeeders();
  } catch (error) {
    logger.error("❌ Error en proceso de seeders:", error);
    throw error;
  }
};

// Ejecutar solo si el archivo se llama directamente
if (require.main === module) {
  // Verificar argumentos de línea de comandos
  const args = process.argv.slice(2);
  const shouldClean = args.includes("--clean") || args.includes("-c");

  if (shouldClean) {
    logger.info("🔄 Modo: Limpiar y ejecutar seeders");
    runSeedersWithOptions({ clean: true });
  } else {
    logger.info("🌱 Modo: Solo ejecutar seeders");
    runSeeders();
  }
}

module.exports = {
  runSeeders,
  cleanDatabase,
  runSeedersWithOptions,
  showSummary,
};
