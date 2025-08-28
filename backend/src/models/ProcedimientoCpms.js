module.exports = (sequelize, DataTypes) => {
  const ProcedimientoCpms = sequelize.define(
    "ProcedimientoCpms",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      codigo: {
        type: DataTypes.STRING(20),
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
      tableName: "procedimientos_cpms",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
      indexes: [{ fields: ["codigo"] }, { fields: ["activo"] }],
    }
  );

  return ProcedimientoCpms;
};
