export default (sequelize, DataTypes) => {
  const Matricula = sequelize.define('Matricula', {
    id_matricula: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_estudiante: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'estudiantes',
        key: 'id_estudiante'
      }
    },
    id_carrera: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'carreras',
        key: 'id_carrera'
      }
    },
    fecha_matricula: {
      type: DataTypes.DATE,
      allowNull: false
    },
    estado: {
      type: DataTypes.STRING(45),
      defaultValue: 'activo'
    },
    periodo: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    estatus: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'matriculas',
    timestamps: true,
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_actualizacion'
  });

  return Matricula;
};