export default (sequelize, DataTypes) => {
  const TipoUsuario = sequelize.define('TIPOUSUARIO', {
    ID_TIPO: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    NOMBRE: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    ESTATUS: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'TIPOUSUARIO',
    timestamps: true,
    createdAt: 'FECHA_CREACION',
    updatedAt: 'FECHA_ACTUALIZACION',
    underscored: true
  });

  return TipoUsuario;
};