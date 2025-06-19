export default (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    id_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_tipo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tipoUsuario',
        key: 'id_tipo'
      }
    },
    codigou: {
      type: DataTypes.STRING(6),
      allowNull: false,
      unique: true
    },
    dni: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    contraseña: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estatus: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'usuarios',
    timestamps: true,
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_actualizacion'
  });

  return Usuario;
};