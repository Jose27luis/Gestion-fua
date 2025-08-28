module.exports = (sequelize, DataTypes) => {
  const FuaRecienNacido = sequelize.define(
    "FuaRecienNacido",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fua_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "fua",
          key: "id",
        },
      },
      tipo_documento: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      numero_documento: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      apellidos_nombres: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      fecha_nacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      sexo: {
        type: DataTypes.ENUM("M", "F"),
        allowNull: true,
      },
      peso_nacimiento: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
      },
    },
    {
      tableName: "fua_recien_nacidos",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
      indexes: [{ fields: ["fua_id"] }],
    }
  );

  return FuaRecienNacido;
};
