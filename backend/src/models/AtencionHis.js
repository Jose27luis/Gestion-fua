module.exports = (sequelize, DataTypes) => {
  const AtencionHis = sequelize.define(
    "AtencionHis",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      persona_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "personas",
          key: "id",
        },
      },
      fecha_atencion: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      lote: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      num_pag: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      num_reg: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      establecimiento_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "establecimientos_salud",
          key: "id",
        },
      },
      servicio: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      edad: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      tipo_edad: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      peso: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
      },
      talla: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
      },
      hemoglobina: {
        type: DataTypes.DECIMAL(4, 2),
        allowNull: true,
      },
      fecha_digitacion: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      digitador_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "usuarios",
          key: "id",
        },
      },
    },
    {
      tableName: "atenciones_his",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      indexes: [
        { fields: ["persona_id"] },
        { fields: ["fecha_atencion"] },
        { fields: ["establecimiento_id"] },
      ],
    }
  );

  return AtencionHis;
};
