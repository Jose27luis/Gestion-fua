module.exports = (sequelize, DataTypes) => {
  const DiagnosticoCie10 = sequelize.define(
    "DiagnosticoCie10",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      codigo: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      tipo: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      tableName: "diagnosticos_cie10",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
      indexes: [{ fields: ["codigo"] }, { fields: ["activo"] }],
    }
  );

  return DiagnosticoCie10;
};
