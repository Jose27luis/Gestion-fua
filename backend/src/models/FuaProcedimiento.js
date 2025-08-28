module.exports = (sequelize, DataTypes) => {
  const FuaProcedimiento = sequelize.define(
    "FuaProcedimiento",
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
      procedimiento_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "procedimientos_cpms",
          key: "id",
        },
      },
      cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      tipo_diagnostico: {
        type: DataTypes.ENUM("D", "P", "R"),
        allowNull: true,
      },
      lab: {
        type: DataTypes.ENUM("S", "N"),
        allowNull: false,
        defaultValue: "N",
      },
    },
    {
      tableName: "fua_procedimientos",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
      indexes: [{ fields: ["fua_id"] }, { fields: ["procedimiento_id"] }],
    }
  );

  return FuaProcedimiento;
};
