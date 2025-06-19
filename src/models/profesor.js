export default (sequelize, DataTypes) => {
  const Profesor = sequelize.define('PROFESOR', {
    ID_PROFESOR: {
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
    NOMBRE: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    APELLIDOS: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    ESPECIALIDAD: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    ESTADO: {
      type: DataTypes.STRING(45),
      defaultValue: 'activo'
    },
    CORREO: {
      type: DataTypes.STRING(100),
      validate: {
        isEmail: true
      }
    },
    ESTATUS: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'PROFESORES',
    timestamps: true,
    createdAt: 'FECHA_CREACION',
    updatedAt: 'FECHA_ACTUALIZACION'
  });

  return Profesor;
};