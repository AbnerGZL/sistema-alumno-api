export default (sequelize, DataTypes) => {
  const Asistencia = sequelize.define('Asistencia', {
    id_asistencia: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_matricula: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'matriculas',
        key: 'id_matricula'
      }
    },
    id_profesor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'profesores',
        key: 'id_profesor'
      }
    },
    id_curso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cursos',
        key: 'id_curso'
      }
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false
    },
    estado: {
      type: DataTypes.STRING(1),
      allowNull: false
    },
    estatus: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'asistencias',
    timestamps: true,
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_actualizacion'
  });

  return Asistencia;
};