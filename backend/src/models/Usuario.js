const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define(
    "Usuario",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      dni: {
        type: DataTypes.STRING(8),
        allowNull: false,
        unique: true,
        validate: {
          len: [8, 8],
          isNumeric: true,
        },
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      nombres: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      apellidos: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      rol_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "roles",
          key: "id",
        },
      },
      establecimiento_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "establecimientos_salud",
          key: "id",
        },
      },
      activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      ultimo_login: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "usuarios",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      indexes: [{ fields: ["dni"] }, { fields: ["rol_id"] }],
      hooks: {
        beforeCreate: async (usuario) => {
          if (usuario.password) {
            const salt = await bcrypt.genSalt(12);
            usuario.password = await bcrypt.hash(usuario.password, salt);
          }
        },
        beforeUpdate: async (usuario) => {
          if (usuario.changed("password")) {
            const salt = await bcrypt.genSalt(12);
            usuario.password = await bcrypt.hash(usuario.password, salt);
          }
        },
      },
    }
  );

  // Método de instancia para verificar password
  Usuario.prototype.validatePassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

  // Método para obtener datos sin password
  Usuario.prototype.toSafeObject = function () {
    const { password, ...safeUser } = this.toJSON();
    return safeUser;
  };

  return Usuario;
};
