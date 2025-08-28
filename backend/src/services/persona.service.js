const { Persona, AseguradoSis } = require("../models");
const { Op } = require("sequelize");

class PersonaService {
  // Obtener todas las personas
  async getAll(pagination = {}) {
    try {
      const result = await Persona.findAndCountAll({
        ...pagination,
        include: [
          {
            model: AseguradoSis,
            as: "seguros",
            attributes: [
              "id",
              "numero_afiliacion",
              "estado",
              "fecha_afiliacion",
              "fecha_vencimiento",
            ],
          },
        ],
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  // Crear persona
  async create(personaData) {
    try {
      // Verificar si ya existe una persona con el mismo documento
      const existingPersona = await Persona.findOne({
        where: { numero_documento: personaData.numero_documento },
      });

      if (existingPersona) {
        return {
          success: false,
          message: "Ya existe una persona con este número de documento",
        };
      }

      const newPersona = await Persona.create(personaData);

      return {
        success: true,
        data: newPersona,
      };
    } catch (error) {
      throw error;
    }
  }

  // Actualizar persona
  async update(id, personaData) {
    try {
      const persona = await Persona.findByPk(id);

      if (!persona) {
        return {
          success: false,
          message: "Persona no encontrada",
        };
      }

      // Verificar si el documento ya existe en otra persona
      if (
        personaData.numero_documento &&
        personaData.numero_documento !== persona.numero_documento
      ) {
        const existingPersona = await Persona.findOne({
          where: {
            numero_documento: personaData.numero_documento,
            id: { [Op.ne]: id },
          },
        });

        if (existingPersona) {
          return {
            success: false,
            message: "Ya existe una persona con este número de documento",
          };
        }
      }

      await persona.update(personaData);

      return {
        success: true,
        data: persona,
      };
    } catch (error) {
      throw error;
    }
  }

  // Eliminar persona
  async delete(id) {
    try {
      const persona = await Persona.findByPk(id);

      if (!persona) {
        return {
          success: false,
          message: "Persona no encontrada",
        };
      }

      // Verificar si tiene registros relacionados (FUAs, etc.)
      const hasRelatedRecords = await this.hasRelatedRecords(id);

      if (hasRelatedRecords) {
        return {
          success: false,
          message:
            "No se puede eliminar la persona porque tiene registros asociados",
        };
      }

      await persona.destroy();

      return {
        success: true,
        message: "Persona eliminada exitosamente",
      };
    } catch (error) {
      throw error;
    }
  }

  // Buscar personas
  async search(searchTerm, pagination = {}) {
    try {
      const result = await Persona.findAndCountAll({
        where: {
          [Op.or]: [
            { numero_documento: { [Op.like]: `%${searchTerm}%` } },
            { nombres: { [Op.like]: `%${searchTerm}%` } },
            { apellido_paterno: { [Op.like]: `%${searchTerm}%` } },
            { apellido_materno: { [Op.like]: `%${searchTerm}%` } },
            { historia_clinica: { [Op.like]: `%${searchTerm}%` } },
          ],
        },
        ...pagination,
        include: [
          {
            model: AseguradoSis,
            as: "seguros",
            attributes: ["id", "numero_afiliacion", "estado"],
            required: false,
          },
        ],
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  // Verificar si tiene registros relacionados
  async hasRelatedRecords(personaId) {
    try {
      // Aquí verificarías si tiene FUAs, atenciones, etc.
      // Por ahora solo verificamos asegurados
      const seguros = await AseguradoSis.count({
        where: { persona_id: personaId },
      });

      return seguros > 0;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new PersonaService();
