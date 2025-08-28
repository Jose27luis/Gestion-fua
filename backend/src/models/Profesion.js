module.exports = (sequelize, DataTypes) => {
  const Profesion = sequelize.define(
    "Profesion",
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
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      requiere_colegiatura: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      tableName: "profesiones",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
      indexes: [{ fields: ["codigo"] }],
    }
  );

  return Profesion;
};
