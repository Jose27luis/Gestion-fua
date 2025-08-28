module.exports = (sequelize, DataTypes) => {
  const FuaDiagnostico = sequelize.define(
    "FuaDiagnostico",
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
      diagnostico_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "diagnosticos_cie10",
          key: "id",
        },
      },
      tipo_diagnostico: {
        type: DataTypes.ENUM("DEFINITIVO", "PRESUNTIVO", "REPETITIVO"),
        allowNull: false,
      },
      orden: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      tableName: "fua_diagnosticos",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
      indexes: [{ fields: ["fua_id"] }, { fields: ["diagnostico_id"] }],
    }
  );

  return FuaDiagnostico;
};
