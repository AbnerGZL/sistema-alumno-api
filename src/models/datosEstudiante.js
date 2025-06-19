export default (sequelize, DataTypes) => {
  const DATOS_ESTUDIANTE = sequelize.define('DATOS_ESTUDIANTE', {
    ID_DATOS_ESTUDIANTE: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ID_ESTUDIANTE: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    DNI: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    FECHA_NAC: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    SEXO: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    DIRECCION: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    TELEFONO: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    EMAIL: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  }, {
    tablename: 'DATOS_ESTUDIANTE',
    timestamps: false,
  });

  return DATOS_ESTUDIANTE;
}