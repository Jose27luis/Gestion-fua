const { Servicio } = require("../models");
const logger = require("../utils/logger");

const servicios = [
  {
    codigo: "001",
    nombre: "MEDICINA GENERAL",
    tipo_servicio: "CONSULTA_EXTERNA",
  },
  {
    codigo: "002",
    nombre: "MEDICINA INTERNA",
    tipo_servicio: "CONSULTA_EXTERNA",
  },
  { codigo: "003", nombre: "PEDIATRÍA", tipo_servicio: "CONSULTA_EXTERNA" },
  {
    codigo: "004",
    nombre: "GINECO-OBSTETRICIA",
    tipo_servicio: "CONSULTA_EXTERNA",
  },
  {
    codigo: "005",
    nombre: "CIRUGÍA GENERAL",
    tipo_servicio: "CONSULTA_EXTERNA",
  },
  { codigo: "006", nombre: "TRAUMATOLOGÍA", tipo_servicio: "CONSULTA_EXTERNA" },
  { codigo: "007", nombre: "ODONTOLOGÍA", tipo_servicio: "CONSULTA_EXTERNA" },
  { codigo: "008", nombre: "PSICOLOGÍA", tipo_servicio: "CONSULTA_EXTERNA" },
  { codigo: "009", nombre: "NUTRICIÓN", tipo_servicio: "CONSULTA_EXTERNA" },
  { codigo: "010", nombre: "EMERGENCIA", tipo_servicio: "EMERGENCIA" },
  {
    codigo: "011",
    nombre: "HOSPITALIZACIÓN",
    tipo_servicio: "HOSPITALIZACION",
  },
  { codigo: "012", nombre: "LABORATORIO", tipo_servicio: "APOYO_DIAGNOSTICO" },
  { codigo: "013", nombre: "RAYOS X", tipo_servicio: "APOYO_DIAGNOSTICO" },
  { codigo: "014", nombre: "ECOGRAFÍA", tipo_servicio: "APOYO_DIAGNOSTICO" },
  { codigo: "015", nombre: "FARMACIA", tipo_servicio: "APOYO_TRATAMIENTO" },
  { codigo: "016", nombre: "INMUNIZACIONES", tipo_servicio: "PREVENCION" },
  {
    codigo: "017",
    nombre: "PLANIFICACIÓN FAMILIAR",
    tipo_servicio: "PREVENCION",
  },
  { codigo: "018", nombre: "CONTROL CRED", tipo_servicio: "PREVENCION" },
  { codigo: "019", nombre: "CONTROL PRENATAL", tipo_servicio: "PREVENCION" },
  { codigo: "020", nombre: "TÓPICO", tipo_servicio: "EMERGENCIA" },
];

const serviciosSeeder = async () => {
  try {
    logger.info("🌱 Iniciando seeder de servicios...");

    for (const servicioData of servicios) {
      const [servicio, created] = await Servicio.findOrCreate({
        where: { codigo: servicioData.codigo },
        defaults: servicioData,
      });

      if (created) {
        logger.info(`✅ Servicio creado: ${servicio.nombre}`);
      } else {
        logger.info(`ℹ️  Servicio ya existe: ${servicio.nombre}`);
      }
    }

    logger.info("✅ Seeder de servicios completado");
  } catch (error) {
    logger.error("❌ Error en seeder de servicios:", error);
    throw error;
  }
};

module.exports = serviciosSeeder;
