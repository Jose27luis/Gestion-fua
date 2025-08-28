module.exports = (sequelize, DataTypes) => {
  const FuaMedicamento = sequelize.define(
    "FuaMedicamento",
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
      medicamento_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "medicamentos",
          key: "id",
        },
      },
      cantidad_prescrita: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      cantidad_entregada: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      dx: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "fua_medicamentos",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
      indexes: [{ fields: ["fua_id"] }, { fields: ["medicamento_id"] }],
    }
  );

  return FuaMedicamento;
};
