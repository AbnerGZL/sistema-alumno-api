export default (sequelize, DataTypes) => {
  const Nota = sequelize.define('NOTA', {
  ID_NOTA: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ID_ESTUDIANTE: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ID_CURSO: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  PROMEDIOP: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
  },
  PROMEDIOT: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
  },
  CONDICION: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  ESTATUS: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
    tableName: 'NOTAS',
    timestamps: true,
    createdAt: 'FECHA_CREACION',
    updatedAt: 'FECHA_ACTUALIZACION'
  });

  return Nota;
};