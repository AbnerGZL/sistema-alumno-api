export default (sequelize, DataTypes) => {
  const Curso = sequelize.define('Curso', {
    id_curso: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_profesor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'profesores',
        key: 'id_profesor'
      }
    },
    codigou: {
      type: DataTypes.STRING(5),
      allowNull: false,
      unique: true
    },
    nombre: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING(45)
    },
    creditos: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    duracion: {
      type: DataTypes.STRING(45)
    },
    horas: {
      type: DataTypes.INTEGER
    },
    estatus: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'cursos',
    timestamps: true,
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_actualizacion'
  });

  return Curso;
};