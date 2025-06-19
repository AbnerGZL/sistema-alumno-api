export default (sequelize, DataTypes) => {
  const Matricula = sequelize.define('MATRICULA', {
    ID_MATRICULA: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    ID_ESTUDIANTE: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ESTUDIANTES',
        key: 'ID_ESTUDIANTE'
      }
    },
    ID_CARRERA: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CARRERAS',
        key: 'ID_CARRERA'
      }
    },
    FECHA_MATRICULA: {
      type: DataTypes.DATE,
      allowNull: false
    },
    ESTADO: {
      type: DataTypes.STRING(45),
      defaultValue: 'ACTIVO'
    },
    PERIODO: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    ESTATUS: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'MATRICULAS',
    timestamps: true,
    createdAt: 'FECHA_CREACION',
    updatedAt: 'FECHA_ACTUALIZACION'
  });

  return Matricula;
};