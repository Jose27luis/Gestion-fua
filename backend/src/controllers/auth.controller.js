const authService = require("../services/auth.service");
const ResponseUtil = require("../utils/response.utils");
const logger = require("../utils/logger");

class AuthController {
  // Iniciar sesión
  async login(req, res, next) {
    try {
      const { dni, password } = req.body;

      const result = await authService.login(dni, password);

      if (!result.success) {
        return ResponseUtil.error(res, result.message, 401);
      }

      // Log del login exitoso
      logger.info(`Login exitoso para DNI: ${dni}`, {
        userId: result.data.user.id,
        ip: req.ip,
      });

      ResponseUtil.success(res, result.data, "Login exitoso");
    } catch (error) {
      logger.error("Error en login:", error);
      next(error);
    }
  }

  // Registrar usuario
  async register(req, res, next) {
    try {
      const userData = req.body;

      const result = await authService.register(userData);

      if (!result.success) {
        return ResponseUtil.error(res, result.message, 400);
      }

      ResponseUtil.success(
        res,
        result.data,
        "Usuario registrado exitosamente",
        201
      );
    } catch (error) {
      logger.error("Error en registro:", error);
      next(error);
    }
  }

  // Refrescar token
  async refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.body;

      const result = await authService.refreshToken(refreshToken);

      if (!result.success) {
        return ResponseUtil.error(res, result.message, 401);
      }

      ResponseUtil.success(res, result.data, "Token refrescado");
    } catch (error) {
      logger.error("Error al refrescar token:", error);
      next(error);
    }
  }

  // Cerrar sesión
  async logout(req, res, next) {
    try {
      // Aquí podrías implementar lógica de blacklist de tokens si es necesario
      ResponseUtil.success(res, null, "Sesión cerrada exitosamente");
    } catch (error) {
      logger.error("Error en logout:", error);
      next(error);
    }
  }
}

module.exports = new AuthController();
