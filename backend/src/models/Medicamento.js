module.exports = (sequelize, DataTypes) => {
  const Medicamento = sequelize.define('Medicamento', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    codigo: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    nombre: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    concentracion: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    forma_farmaceutica: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    presentacion: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    tableName: 'medicamentos',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    indexes: [
      { fields: ['codigo'] },
      { fields: ['nombre'] },
      { fields: ['activo'] }
    ]
  });

  // Método para obtener descripción completa
  Medicamento.prototype.getDescripcionCompleta = function() {
    let descripcion = this.nombre;
    if (this.concentracion) descripcion += ` ${this.concentracion}`;
    if (this.forma_farmaceutica) descripcion += ` - ${this.forma_farmaceutica}`;
    if (this.presentacion) descripcion += ` (${this.presentacion})`;
    return descripcion;
  };

  return Medicamento;
};