const { Role, Profesion, RolProfesion } = require("../models");
const logger = require("../utils/logger");

const roles = [
  {
    codigo: "admin",
    nombre: "Administrador",
    descripcion: "Administrador del sistema con acceso completo",
  },
  {
    codigo: "personal_salud",
    nombre: "Personal de Salud",
    descripcion: "Personal que trabaja en los establecimientos",
  },
  {
    codigo: "digitador",
    nombre: "Digitador",
    descripcion: "Personal encargado de digitación de datos",
  },
];

const profesiones = [
  { codigo: "medico", nombre: "Médico", requiere_colegiatura: true },
  { codigo: "enfermero", nombre: "Enfermero(a)", requiere_colegiatura: true },
  { codigo: "obstetra", nombre: "Obstetra", requiere_colegiatura: true },
  { codigo: "odontologo", nombre: "Odontólogo", requiere_colegiatura: true },
  { codigo: "psicologo", nombre: "Psicólogo", requiere_colegiatura: true },
  {
    codigo: "nutricionista",
    nombre: "Nutricionista",
    requiere_colegiatura: true,
  },
  {
    codigo: "tecnico_enfermeria",
    nombre: "Técnico en Enfermería",
    requiere_colegiatura: false,
  },
  { codigo: "biologo", nombre: "Biólogo", requiere_colegiatura: true },
  {
    codigo: "quimico_farmaceutico",
    nombre: "Químico Farmacéutico",
    requiere_colegiatura: true,
  },
  {
    codigo: "tecnico_farmacia",
    nombre: "Técnico en Farmacia",
    requiere_colegiatura: false,
  },
  {
    codigo: "administrativo",
    nombre: "Administrativo",
    requiere_colegiatura: false,
  },
  { codigo: "otros", nombre: "Otros", requiere_colegiatura: false },
];

const rolesSeeder = async () => {
  try {
    logger.info("🌱 Iniciando seeder de roles y profesiones...");

    // Insertar roles
    for (const roleData of roles) {
      const [role, created] = await Role.findOrCreate({
        where: { codigo: roleData.codigo },
        defaults: roleData,
      });

      if (created) {
        logger.info(`✅ Rol creado: ${role.nombre}`);
      } else {
        logger.info(`ℹ️  Rol ya existe: ${role.nombre}`);
      }
    }

    // Insertar profesiones
    for (const profesionData of profesiones) {
      const [profesion, created] = await Profesion.findOrCreate({
        where: { codigo: profesionData.codigo },
        defaults: profesionData,
      });

      if (created) {
        logger.info(`✅ Profesión creada: ${profesion.nombre}`);
      } else {
        logger.info(`ℹ️  Profesión ya existe: ${profesion.nombre}`);
      }
    }

    // Relacionar roles con profesiones
    const personalSaludRole = await Role.findOne({
      where: { codigo: "personal_salud" },
    });
    const digitadorRole = await Role.findOne({
      where: { codigo: "digitador" },
    });
    const adminRole = await Role.findOne({ where: { codigo: "admin" } });

    // Personal de salud con todas las profesiones de salud
    const profesionsSalud = await Profesion.findAll({
      where: {
        codigo: {
          [require("sequelize").Op.in]: [
            "medico",
            "enfermero",
            "obstetra",
            "odontologo",
            "psicologo",
            "nutricionista",
            "tecnico_enfermeria",
            "biologo",
            "quimico_farmaceutico",
            "tecnico_farmacia",
            "administrativo",
            "otros",
          ],
        },
      },
    });

    for (const profesion of profesionsSalud) {
      await RolProfesion.findOrCreate({
        where: {
          rol_id: personalSaludRole.id,
          profesion_id: profesion.id,
        },
      });
    }

    // Digitador con administrativo
    const adminProfesion = await Profesion.findOne({
      where: { codigo: "administrativo" },
    });
    await RolProfesion.findOrCreate({
      where: {
        rol_id: digitadorRole.id,
        profesion_id: adminProfesion.id,
      },
    });

    // Admin con administrativo
    await RolProfesion.findOrCreate({
      where: {
        rol_id: adminRole.id,
        profesion_id: adminProfesion.id,
      },
    });

    logger.info("✅ Seeder de roles y profesiones completado");
  } catch (error) {
    logger.error("❌ Error en seeder de roles:", error);
    throw error;
  }
};

module.exports = rolesSeeder;
