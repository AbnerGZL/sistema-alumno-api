export default (sequelize, DataTypes) => {
  const Profesor = sequelize.define('Profesor', {
    id_profesor: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'id_usuario'
      }
    },
    nombre: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    apellidos: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    especialidad: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    estado: {
      type: DataTypes.STRING(45),
      defaultValue: 'activo'
    },
    correo: {
      type: DataTypes.STRING(100),
      validate: {
        isEmail: true
      }
    },
    estatus: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'profesores',
    timestamps: true,
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_actualizacion'
  });

  return Profesor;
};