module.exports = (sequelize, DataTypes) => {
  const FuaSmi = sequelize.define(
    "FuaSmi",
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
      codigo: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      valor: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    },
    {
      tableName: "fua_smi",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
      indexes: [{ fields: ["fua_id"] }],
    }
  );

  return FuaSmi;
};
