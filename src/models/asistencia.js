export default (sequelize, DataTypes) => {
  const ASISTENCIA = sequelize.define('ASISTENCIA', {
    ID_ASISTENCIA: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    ID_MATRICULA: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ID_PROFESOR: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ID_CURSO: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    FECHA: {
      type: DataTypes.DATE,
      allowNull: false
    },
    ESTADO: {
      type: DataTypes.STRING(1),
      allowNull: false
    },
    ESTATUS: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'ASISTENCIAS',
    timestamps: true,
    createdAt: 'FECHA_CREACION',
    updatedAt: 'FECHA_ACTUALIZACION'
  });

  return ASISTENCIA;
};