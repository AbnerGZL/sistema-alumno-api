export default (sequelize, DataTypes) => {
  const NOTA_DETALLE = sequelize.define('NOTA_DETALLE', {
    ID_NOTA_DETALLE: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    ID_NOTA: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    PRACTICA: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    TEORIA: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    FECHA: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    ESTATUS: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  }, {
    tableName: 'NOTA_DETALLE',
    timestamps: true,
    createdAt: 'FECHA_CREACION',
    updatedAt: 'FECHA_ACTUALIZACION'
  });

  return NOTA_DETALLE;
}