export default (sequelize, DataTypes) => {
  const Carrera = sequelize.define('Carrera', {
    id_carrera: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    codigou: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true
    },
    descripcion: {
      type: DataTypes.STRING(200)
    },
    duracion: {
      type: DataTypes.STRING(45)
    },
    total_creditos: {
      type: DataTypes.INTEGER
    },
    titulo: {
      type: DataTypes.STRING(50)
    },
    grado: {
      type: DataTypes.STRING(45)
    },
    departamento: {
      type: DataTypes.STRING(45)
    },
    modalidad: {
      type: DataTypes.STRING(45)
    },
    estatus: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'carreras',
    timestamps: true,
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_actualizacion'
  });

  return Carrera;
};