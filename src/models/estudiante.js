export default (sequelize, DataTypes) => {
  const Estudiante = sequelize.define('ESTUDIANTE', {
    ID_ESTUDIANTE: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    ID_USUARIO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'USUARIOS',
        key: 'ID_USUARIO'
      }
    },
    CARRERA: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    ESTATUS: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'ESTUDIANTES',
    timestamps: true,
    createdAt: 'FECHA_CREACION',
    updatedAt: 'FECHA_ACTUALIZACION'
  });

  return Estudiante;
};
