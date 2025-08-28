module.exports = (sequelize, DataTypes) => {
  const RolProfesion = sequelize.define(
    "RolProfesion",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      rol_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "roles",
          key: "id",
        },
      },
      profesion_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "profesiones",
          key: "id",
        },
      },
    },
    {
      tableName: "rol_profesion",
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ["rol_id", "profesion_id"],
        },
      ],
    }
  );

  return RolProfesion;
};
