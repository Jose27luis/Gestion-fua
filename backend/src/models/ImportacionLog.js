module.exports = (sequelize, DataTypes) => {
  const ImportacionLog = sequelize.define(
    "ImportacionLog",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      tipo_archivo: {
        type: DataTypes.ENUM(
          "FUA_CSV",
          "HIS_CSV",
          "NOMINAL_TRAMA",
          "MAESTRO_PACIENTE",
          "MAESTRO_PERSONAL"
        ),
        allowNull: false,
      },
      nombre_archivo: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      registros_totales: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      registros_exitosos: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      registros_fallidos: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "usuarios",
          key: "id",
        },
      },
      fecha_importacion: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      estado: {
        type: DataTypes.ENUM("EN_PROCESO", "COMPLETADO", "ERROR"),
        allowNull: false,
        defaultValue: "EN_PROCESO",
      },
      errores: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "importacion_logs",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
      indexes: [
        { fields: ["usuario_id"] },
        { fields: ["fecha_importacion"] },
        { fields: ["estado"] },
      ],
    }
  );

  // Método de instancia para marcar como completado
  ImportacionLog.prototype.markCompleted = function (exitosos, fallidos) {
    this.registros_exitosos = exitosos;
    this.registros_fallidos = fallidos;
    this.estado = "COMPLETADO";
    return this.save();
  };

  // Método de instancia para marcar como error
  ImportacionLog.prototype.markError = function (errorMessage) {
    this.estado = "ERROR";
    this.errores = errorMessage;
    return this.save();
  };

  return ImportacionLog;
};
