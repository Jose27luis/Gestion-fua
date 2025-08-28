const { Usuario, Role, EstablecimientoSalud } = require("../models");
const logger = require("../utils/logger");

const usuariosSeeder = async () => {
  try {
    logger.info(" Iniciando seeder de usuarios...");

    // Obtener roles y establecimientos
    const adminRole = await Role.findOne({ where: { codigo: "admin" } });
    const personalSaludRole = await Role.findOne({
      where: { codigo: "personal_salud" },
    });
    const digitadorRole = await Role.findOne({
      where: { codigo: "digitador" },
    });

    const hospital = await EstablecimientoSalud.findOne({
      where: { codigo_renaes: "0001001" },
    });

    const usuarios = [
      {
        dni: "75318092",
        password: "75318092",
        nombres: "Jose",
        apellidos: "Teco",
        rol_id: adminRole.id,
        establecimiento_id: null, // Admin no está limitado a un establecimiento
      },
      {
        dni: "75318087",
        password: "75318087",
        nombres: "Nataly",
        apellidos: "Teco",
        rol_id: personalSaludRole.id,
        establecimiento_id: hospital.id,
      },
      {
        dni: "61345588",
        password: "65315588",
        nombres: "David",
        apellidos: "Teco",
        rol_id: digitadorRole.id,
        establecimiento_id: hospital.id,
      },
    ];

    for (const userData of usuarios) {
      const [usuario, created] = await Usuario.findOrCreate({
        where: { dni: userData.dni },
        defaults: userData,
      });

      if (created) {
        logger.info(
          `✅ Usuario creado: ${usuario.nombres} ${usuario.apellidos} (DNI: ${usuario.dni})`
        );
      } else {
        logger.info(
          `ℹ️  Usuario ya existe: ${usuario.nombres} ${usuario.apellidos} (DNI: ${usuario.dni})`
        );
      }
    }

    logger.info("✅ Seeder de usuarios completado");
  } catch (error) {
    logger.error("Error en seeder de usuarios:", error);
    throw error;
  }
};

module.exports = usuariosSeeder;
