module.exports = (sequelize, DataTypes) => {
  const IndicadorValor = sequelize.define(
    "IndicadorValor",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      indicador_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "indicadores",
          key: "id",
        },
      },
      establecimiento_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "establecimientos_salud",
          key: "id",
        },
      },
      periodo: {
        type: DataTypes.STRING(7), // 'YYYY-MM'
        allowNull: true,
      },
      numerador: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      denominador: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      valor: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      porcentaje: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
      },
      fecha_calculo: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "indicadores_valores",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
      indexes: [
        { fields: ["periodo"] },
        { fields: ["indicador_id"] },
        { fields: ["establecimiento_id"] },
      ],
    }
  );

  return IndicadorValor;
};
