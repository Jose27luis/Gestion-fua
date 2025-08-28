module.exports = (sequelize, DataTypes) => {
  const Persona = sequelize.define(
    "Persona",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      tipo_documento: {
        type: DataTypes.ENUM("DNI", "CE", "PASAPORTE", "RUC", "OTROS"),
        allowNull: false,
        defaultValue: "DNI",
      },
      numero_documento: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      apellido_paterno: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      apellido_materno: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      nombres: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      fecha_nacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      sexo: {
        type: DataTypes.ENUM("M", "F"),
        allowNull: false,
      },
      direccion: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      telefono: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      ubigeo: {
        type: DataTypes.STRING(6),
        allowNull: true,
      },
      historia_clinica: {
        type: DataTypes.STRING(20),
        allowNull: true,
        unique: true,
      },
    },
    {
      tableName: "personas",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      indexes: [
        { fields: ["numero_documento"] },
        { fields: ["apellido_paterno", "apellido_materno"] },
        { fields: ["historia_clinica"] },
      ],
    }
  );

  // Método de instancia para obtener nombre completo
  Persona.prototype.getNombreCompleto = function () {
    return `${this.apellido_paterno} ${this.apellido_materno}, ${this.nombres}`;
  };

  // Método de instancia para calcular edad
  Persona.prototype.getEdad = function () {
    const today = new Date();
    const birthDate = new Date(this.fecha_nacimiento);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  return Persona;
};
