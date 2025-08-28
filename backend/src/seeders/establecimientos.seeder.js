const { EstablecimientoSalud } = require("../models");
const logger = require("../utils/logger");

const establecimientos = [
  {
    codigo_renaes: "0001001",
    nombre: "HOSPITAL NACIONAL HONORIO DELGADO",
    categoria: "III-1",
    distrito: "AREQUIPA",
    direccion: "Av. Alcides Carrión s/n",
    telefono: "054-231818",
  },
  {
    codigo_renaes: "0001002",
    nombre: "HOSPITAL GOYENECHE",
    categoria: "III-1",
    distrito: "AREQUIPA",
    direccion: "Av. Goyeneche 402",
    telefono: "054-233991",
  },
  {
    codigo_renaes: "0001003",
    nombre: "CENTRO DE SALUD HUNTER",
    categoria: "I-3",
    distrito: "AREQUIPA",
    direccion: "Av. Hunter 150",
    telefono: "054-221456",
  },
  {
    codigo_renaes: "0001004",
    nombre: "CENTRO DE SALUD PAUCARPATA",
    categoria: "I-3",
    distrito: "PAUCARPATA",
    direccion: "Av. Ejercito 205",
    telefono: "054-445566",
  },
  {
    codigo_renaes: "0001005",
    nombre: "PUESTO DE SALUD MIRAFLORES",
    categoria: "I-1",
    distrito: "MIRAFLORES",
    direccion: "Calle Los Geranios 123",
    telefono: "054-778899",
  },
];

const establecimientosSeeder = async () => {
  try {
    logger.info("🌱 Iniciando seeder de establecimientos...");

    for (const establecimientoData of establecimientos) {
      const [establecimiento, created] =
        await EstablecimientoSalud.findOrCreate({
          where: { codigo_renaes: establecimientoData.codigo_renaes },
          defaults: establecimientoData,
        });

      if (created) {
        logger.info(`✅ Establecimiento creado: ${establecimiento.nombre}`);
      } else {
        logger.info(`ℹ️  Establecimiento ya existe: ${establecimiento.nombre}`);
      }
    }

    logger.info("✅ Seeder de establecimientos completado");
  } catch (error) {
    logger.error("❌ Error en seeder de establecimientos:", error);
    throw error;
  }
};

module.exports = establecimientosSeeder;
