const jwt = require("jsonwebtoken");
const { Usuario, Role, EstablecimientoSalud } = require("../models");
const DateUtil = require("../utils/date.utils");

class AuthService {
  // Generar tokens JWT
  generateTokens(user) {
    const payload = {
      id: user.id,
      dni: user.dni,
      rol: user.rol.codigo,
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "24h",
    });

    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
    });

    return { accessToken, refreshToken };
  }

  // Login
  async login(dni, password) {
    try {
      // Buscar usuario por DNI
      const user = await Usuario.findOne({
        where: { dni, activo: true },
        include: [
          {
            model: Role,
            as: "rol",
            attributes: ["id", "codigo", "nombre"],
          },
          {
            model: EstablecimientoSalud,
            as: "establecimiento",
            attributes: ["id", "nombre", "codigo_renaes"],
          },
        ],
      });

      if (!user) {
        return {
          success: false,
          message: "Credenciales incorrectas",
        };
      }

      // Verificar password
      const isValidPassword = await user.validatePassword(password);
      if (!isValidPassword) {
        return {
          success: false,
          message: "Credenciales incorrectas",
        };
      }

      // Actualizar último login
      await user.update({ ultimo_login: DateUtil.nowPeru() });

      // Generar tokens
      const tokens = this.generateTokens(user);

      // Respuesta exitosa
      return {
        success: true,
        data: {
          user: user.toSafeObject(),
          tokens,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  // Registro
  async register(userData) {
    try {
      // Verificar si ya existe el usuario
      const existingUser = await Usuario.findOne({
        where: { dni: userData.dni },
      });

      if (existingUser) {
        return {
          success: false,
          message: "Ya existe un usuario con este DNI",
        };
      }

      // Crear usuario
      const newUser = await Usuario.create(userData);

      // Obtener usuario con relaciones
      const user = await Usuario.findByPk(newUser.id, {
        include: [
          {
            model: Role,
            as: "rol",
            attributes: ["id", "codigo", "nombre"],
          },
          {
            model: EstablecimientoSalud,
            as: "establecimiento",
            attributes: ["id", "nombre", "codigo_renaes"],
          },
        ],
      });

      // Generar tokens
      const tokens = this.generateTokens(user);

      return {
        success: true,
        data: {
          user: user.toSafeObject(),
          tokens,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  // Refrescar token
  async refreshToken(refreshToken) {
    try {
      // Verificar refresh token
      const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

      // Buscar usuario
      const user = await Usuario.findByPk(decoded.id, {
        where: { activo: true },
        include: [
          {
            model: Role,
            as: "rol",
            attributes: ["id", "codigo", "nombre"],
          },
        ],
      });

      if (!user) {
        return {
          success: false,
          message: "Usuario no válido",
        };
      }

      // Generar nuevos tokens
      const tokens = this.generateTokens(user);

      return {
        success: true,
        data: { tokens },
      };
    } catch (error) {
      return {
        success: false,
        message: "Token de refresco inválido",
      };
    }
  }
}

module.exports = new AuthService();
