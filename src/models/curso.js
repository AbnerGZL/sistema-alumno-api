export default (sequelize, DataTypes) => {
  const Curso = sequelize.define('CURSO', {
    ID_CURSO: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    ID_PROFESOR: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'PROFESORES',
        key: 'ID_PROFESOR'
      }
    },
    CODIGOU: {
      type: DataTypes.STRING(5),
      allowNull: false,
      unique: true
    },
    NOMBRE: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    DESCRIPCION: {
      type: DataTypes.STRING(45)
    },
    CREDITOS: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    DURACION: {
      type: DataTypes.STRING(45)
    },
    HORAS: {
      type: DataTypes.INTEGER
    },
    ESTATUS: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'CURSOS',
    timestamps: true,
    createdAt: 'FECHA_CREACION',
    updatedAt: 'FECHA_ACTUALIZACION'
  });

  return Curso;
};