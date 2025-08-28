module.exports = (sequelize, DataTypes) => {
  const EstablecimientoSalud = sequelize.define(
    "EstablecimientoSalud",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      codigo_renaes: {
        type: DataTypes.STRING(20),
        allowNull: true,
        unique: true,
      },
      nombre: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      categoria: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      distrito: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      direccion: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      telefono: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      fecha_ultima_bd: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "establecimientos_salud",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      indexes: [{ fields: ["codigo_renaes"] }, { fields: ["nombre"] }],
    }
  );

  return EstablecimientoSalud;
};
