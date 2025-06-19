export default (sequelize, DataTypes) => {
  const Nota = sequelize.define('Nota', {
    id_nota: {
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
    id_curso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cursos',
        key: 'id_curso'
      }
    },
    practica: {
      type: DataTypes.DECIMAL(5, 2)
    },
    teoria: {
      type: DataTypes.DECIMAL(5, 2)
    },
    ponderacion: {
      type: DataTypes.DECIMAL(5, 2)
    },
    estado: {
      type: DataTypes.STRING(1)
    },
    estatus: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'notas',
    timestamps: true,
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_actualizacion'
  });

  return Nota;
};