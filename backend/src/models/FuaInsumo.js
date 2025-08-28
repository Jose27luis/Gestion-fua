module.exports = (sequelize, DataTypes) => {
  const FuaInsumo = sequelize.define(
    "FuaInsumo",
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
      insumo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "insumos",
          key: "id",
        },
      },
      cantidad: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      dx: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "fua_insumos",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
      indexes: [{ fields: ["fua_id"] }, { fields: ["insumo_id"] }],
    }
  );

  return FuaInsumo;
};
