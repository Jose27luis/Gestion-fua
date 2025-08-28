module.exports = (sequelize, DataTypes) => {
  const PersonalSalud = sequelize.define(
    "PersonalSalud",
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
      nombres: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      apellidos: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      profesion_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "profesiones",
          key: "id",
        },
      },
      codigo_colegiatura: {
        type: DataTypes.STRING(20),
        allowNull: true,
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
    },
    {
      tableName: "personal_salud",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      indexes: [{ fields: ["dni"] }, { fields: ["profesion_id"] }],
    }
  );

  // Método para obtener nombre completo
  PersonalSalud.prototype.getNombreCompleto = function () {
    return `${this.apellidos}, ${this.nombres}`;
  };

  return PersonalSalud;
};
