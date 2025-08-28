module.exports = (sequelize, DataTypes) => {
  const Servicio = sequelize.define(
    "Servicio",
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
      nombre: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      tipo_servicio: {
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
      tableName: "servicios",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
      indexes: [{ fields: ["codigo"] }],
    }
  );

  return Servicio;
};
