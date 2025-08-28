module.exports = (sequelize, DataTypes) => {
  const Fua = sequelize.define(
    "Fua",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      numero_fua: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      lote: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      pagina: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      registro: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      persona_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "personas",
          key: "id",
        },
      },
      asegurado_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "asegurados_sis",
          key: "id",
        },
      },
      fecha_atencion: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      hora_atencion: {
        type: DataTypes.TIME,
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
      servicio_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "servicios",
          key: "id",
        },
      },
      tipo_atencion: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      lugar_atencion: {
        type: DataTypes.ENUM("INTRAMURAL", "EXTRAMURAL"),
        allowNull: true,
      },
      destino: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      personal_atiende_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "personal_salud",
          key: "id",
        },
      },
      digitador_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "usuarios",
          key: "id",
        },
      },
      estado: {
        type: DataTypes.ENUM("DIGITADO", "ENVIADO", "OBSERVADO", "ANULADO"),
        allowNull: false,
        defaultValue: "DIGITADO",
      },
      fecha_digitacion: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      observaciones: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "fua",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      indexes: [
        { fields: ["numero_fua"] },
        { fields: ["fecha_atencion"] },
        { fields: ["persona_id"] },
        { fields: ["estado"] },
        { fields: ["establecimiento_id"] },
      ],
    }
  );

  // Método para generar número de FUA
  Fua.generateNumeroFua = function (establecimientoId, fecha) {
    const year = new Date(fecha).getFullYear();
    const month = String(new Date(fecha).getMonth() + 1).padStart(2, "0");
    const timestamp = Date.now().toString().slice(-6);
    return `FUA${establecimientoId}${year}${month}${timestamp}`;
  };

  // Método de instancia para verificar si puede ser editado
  Fua.prototype.canEdit = function () {
    return ["DIGITADO", "OBSERVADO"].includes(this.estado);
  };

  return Fua;
};
