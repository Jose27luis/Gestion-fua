const personaService = require("../services/persona.service");
const ResponseUtil = require("../utils/response.utils");
const PaginationUtil = require("../utils/pagination.utils");
const logger = require("../utils/logger");

class PersonaController {
  // Obtener todas las personas
  async getAll(req, res, next) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const pagination = PaginationUtil.buildPaginationQuery(page, limit);

      const result = await personaService.getAll(pagination);
      const paginatedData = PaginationUtil.getPaginatedData(
        result,
        page,
        limit
      );

      ResponseUtil.paginated(res, paginatedData.items, paginatedData);
    } catch (error) {
      logger.error("Error al obtener personas:", error);
      next(error);
    }
  }

  // Obtener persona por ID
  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const persona = await personaService.getById(id);

      if (!persona) {
        return ResponseUtil.notFound(res, "Persona no encontrada");
      }

      ResponseUtil.success(res, persona);
    } catch (error) {
      logger.error("Error al obtener persona:", error);
      next(error);
    }
  }

  // Obtener persona por documento
  async getByDocument(req, res, next) {
    try {
      const { numero } = req.params;
      const persona = await personaService.getByDocument(numero);

      if (!persona) {
        return ResponseUtil.notFound(res, "Persona no encontrada");
      }

      ResponseUtil.success(res, persona);
    } catch (error) {
      logger.error("Error al obtener persona por documento:", error);
      next(error);
    }
  }

  // Crear persona
  async create(req, res, next) {
    try {
      const personaData = req.body;
      const result = await personaService.create(personaData);

      if (!result.success) {
        return ResponseUtil.error(res, result.message, 400);
      }

      ResponseUtil.success(
        res,
        result.data,
        "Persona creada exitosamente",
        201
      );
    } catch (error) {
      logger.error("Error al crear persona:", error);
      next(error);
    }
  }

  // Actualizar persona
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const personaData = req.body;

      const result = await personaService.update(id, personaData);

      if (!result.success) {
        return ResponseUtil.error(res, result.message, 400);
      }

      ResponseUtil.success(
        res,
        result.data,
        "Persona actualizada exitosamente"
      );
    } catch (error) {
      logger.error("Error al actualizar persona:", error);
      next(error);
    }
  }

  // Eliminar persona
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const result = await personaService.delete(id);

      if (!result.success) {
        return ResponseUtil.error(res, result.message, 400);
      }

      ResponseUtil.success(res, null, "Persona eliminada exitosamente");
    } catch (error) {
      logger.error("Error al eliminar persona:", error);
      next(error);
    }
  }

  // Buscar personas
  async search(req, res, next) {
    try {
      const { q, page = 1, limit = 10 } = req.query;

      if (!q) {
        return ResponseUtil.error(res, "Parámetro de búsqueda requerido", 400);
      }

      const pagination = PaginationUtil.buildPaginationQuery(page, limit);
      const result = await personaService.search(q, pagination);
      const paginatedData = PaginationUtil.getPaginatedData(
        result,
        page,
        limit
      );

      ResponseUtil.paginated(res, paginatedData.items, paginatedData);
    } catch (error) {
      logger.error("Error al buscar personas:", error);
      next(error);
    }
  }
}

module.exports = new PersonaController();
