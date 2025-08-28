module.exports = (sequelize, DataTypes) => {
  const AseguradoSis = sequelize.define(
    "AseguradoSis",
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
      numero_afiliacion: {
        type: DataTypes.STRING(30),
        allowNull: true,
        unique: true,
      },
      fecha_afiliacion: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      tipo_seguro: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      estado: {
        type: DataTypes.ENUM("ACTIVO", "INACTIVO", "SUSPENDIDO"),
        allowNull: false,
        defaultValue: "ACTIVO",
      },
      establecimiento_adscrito_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "establecimientos_salud",
          key: "id",
        },
      },
      fecha_vencimiento: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
    },
    {
      tableName: "asegurados_sis",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      indexes: [
        { fields: ["numero_afiliacion"] },
        { fields: ["persona_id"] },
        { fields: ["estado"] },
      ],
    }
  );

  // Método para verificar si está vigente
  AseguradoSis.prototype.isVigente = function () {
    if (this.estado !== "ACTIVO") return false;
    if (!this.fecha_vencimiento) return true;

    const today = new Date();
    const vencimiento = new Date(this.fecha_vencimiento);
    return vencimiento >= today;
  };

  return AseguradoSis;
};
