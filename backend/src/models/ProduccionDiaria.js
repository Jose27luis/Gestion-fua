module.exports = (sequelize, DataTypes) => {
  const ProduccionDiaria = sequelize.define(
    "ProduccionDiaria",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      establecimiento_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "establecimientos_salud",
          key: "id",
        },
      },
      digitador_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "usuarios",
          key: "id",
        },
      },
      total_fuas: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      total_atenciones: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      tableName: "produccion_diaria",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
      indexes: [
        { fields: ["fecha"] },
        {
          unique: true,
          fields: ["fecha", "establecimiento_id", "digitador_id"],
        },
      ],
    }
  );

  return ProduccionDiaria;
};
