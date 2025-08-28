module.exports = (sequelize, DataTypes) => {
  const Indicador = sequelize.define(
    "Indicador",
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
      nombre: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      formula: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      meta: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
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
      tableName: "indicadores",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
      indexes: [{ fields: ["codigo"] }, { fields: ["activo"] }],
    }
  );

  return Indicador;
};
